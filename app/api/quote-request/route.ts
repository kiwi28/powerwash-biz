import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { Resend } from 'resend'

// Lazy load config to avoid module resolution issues in API routes
const getConfig = async () => {
  const configModule = await import('../../../payload.config')
  return configModule.default
}

// Initialize Resend
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

// Admin email (you can configure this in environment or use a default)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@example.com'

// Validation schema
interface QuoteRequestData {
  fullName: string
  phone: string
  email: string
  address: string
  serviceType: string
  surfaceArea?: number
  surfaceType?: string
  preferredDate?: string
  preferredTime?: string
  urgency?: string
  notes?: string
}

const validateQuoteRequest = (data: any): data is QuoteRequestData => {
  return (
    data &&
    typeof data.fullName === 'string' &&
    data.fullName.trim().length > 0 &&
    typeof data.phone === 'string' &&
    data.phone.trim().length > 0 &&
    typeof data.email === 'string' &&
    data.email.trim().length > 0 &&
    typeof data.address === 'string' &&
    data.address.trim().length > 0 &&
    typeof data.serviceType === 'string' &&
    data.serviceType.trim().length > 0
  )
}

// Service type labels (Romanian)
const serviceLabels: Record<string, string> = {
  alei: 'Alei',
  pereti: 'Pereți',
  terase: 'Terase',
  garduri: 'Garduri',
  acoperis: 'Acoperiș',
  comercial: 'Spații Comerciale',
  altele: 'Altele',
}

// Surface type labels (Romanian)
const surfaceLabels: Record<string, string> = {
  beton: 'Beton',
  piatra: 'Piatră',
  caramida: 'Cărămidă',
  lemn: 'Lemn',
  'nu-stiu': 'Nu știu',
}

// Urgency labels (Romanian)
const urgencyLabels: Record<string, string> = {
  normal: 'Normal',
  urgent: 'Urgent',
}

// Time preference labels (Romanian)
const timeLabels: Record<string, string> = {
  dimineata: 'Dimineața',
  pranz: 'Prânz',
  'dupa-amiaza': 'După-amiaza',
  oricand: 'Oricând',
}

// Admin email template
const getAdminEmailHtml = (data: QuoteRequestData) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9fafb; }
    .section { margin-bottom: 15px; }
    .label { font-weight: bold; color: #1f2937; }
    .value { margin-top: 5px; color: #4b5563; }
    .urgent { color: #dc2626; font-weight: bold; }
    .footer { padding: 15px; text-align: center; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nouă Cerere de Ofertă</h1>
    </div>
    <div class="content">
      <div class="section">
        <div class="label">Nume Complet:</div>
        <div class="value">${data.fullName}</div>
      </div>
      <div class="section">
        <div class="label">Telefon:</div>
        <div class="value">${data.phone}</div>
      </div>
      <div class="section">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="section">
        <div class="label">Adresă / Locație:</div>
        <div class="value">${data.address}</div>
      </div>
      <div class="section">
        <div class="label">Tip Serviciu:</div>
        <div class="value">${serviceLabels[data.serviceType] || data.serviceType}</div>
      </div>
      ${data.surfaceArea ? `
      <div class="section">
        <div class="label">Suprafață:</div>
        <div class="value">${data.surfaceArea} m²</div>
      </div>
      ` : ''}
      ${data.surfaceType ? `
      <div class="section">
        <div class="label">Tip Suprafață:</div>
        <div class="value">${surfaceLabels[data.surfaceType] || data.surfaceType}</div>
      </div>
      ` : ''}
      ${data.preferredDate ? `
      <div class="section">
        <div class="label">Data Preferată:</div>
        <div class="value">${new Date(data.preferredDate).toLocaleDateString('ro-RO')}</div>
      </div>
      ` : ''}
      ${data.preferredTime ? `
      <div class="section">
        <div class="label">Ora Preferată:</div>
        <div class="value">${timeLabels[data.preferredTime] || data.preferredTime}</div>
      </div>
      ` : ''}
      ${data.urgency ? `
      <div class="section">
        <div class="label">Urgență:</div>
        <div class="value ${data.urgency === 'urgent' ? 'urgent' : ''}">${urgencyLabels[data.urgency] || data.urgency}</div>
      </div>
      ` : ''}
      ${data.notes ? `
      <div class="section">
        <div class="label">Alte Detalii:</div>
        <div class="value">${data.notes}</div>
      </div>
      ` : ''}
    </div>
    <div class="footer">
      <p>Vă rugăm să răspundeți clientului în termen de 24 de ore.</p>
    </div>
  </div>
</body>
</html>
  `
}

// Customer confirmation email template
const getCustomerEmailHtml = (data: QuoteRequestData) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9fafb; }
    .section { margin-bottom: 15px; }
    .label { font-weight: bold; color: #1f2937; }
    .value { margin-top: 5px; color: #4b5563; }
    .highlight { background: #dbeafe; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center; }
    .footer { padding: 15px; text-align: center; color: #6b7280; font-size: 12px; }
    .summary { background: white; padding: 15px; border-radius: 5px; border: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Cererea Dumneavoastră a fost primită!</h1>
    </div>
    <div class="content">
      <p>Bună ziua, ${data.fullName}!</p>

      <p>Vă mulțumim pentru interesul acordat serviciilor noastre. Am primit cererea dumneavoastră de ofertă și vă vom contacta în curând.</p>

      <div class="highlight">
        <p><strong>Răspunsul nostru în maximum 24 de ore!</strong></p>
      </div>

      <div class="summary">
        <h3>Rezumatul Cererii:</h3>
        <div class="section">
          <div class="label">Serviciu:</div>
          <div class="value">${serviceLabels[data.serviceType] || data.serviceType}</div>
        </div>
        ${data.surfaceArea ? `
        <div class="section">
          <div class="label">Suprafață:</div>
          <div class="value">${data.surfaceArea} m²</div>
        </div>
        ` : ''}
        ${data.preferredDate ? `
        <div class="section">
          <div class="label">Data Preferată:</div>
          <div class="value">${new Date(data.preferredDate).toLocaleDateString('ro-RO')}</div>
        </div>
        ` : ''}
      </div>

      <p>Dacă aveți întrebări, ne puteți contacta telefonic sau prin email.</p>

      <p>Vă mulțumim!</p>
    </div>
    <div class="footer">
      <p>Acesta este un email automat. Nu răspundeți la acest mesaj.</p>
    </div>
  </div>
</body>
</html>
  `
}

// Admin email subject
const getAdminEmailSubject = (data: QuoteRequestData) => {
  const urgencyText = data.urgency === 'urgent' ? '[URGENT] ' : ''
  return `${urgencyText}Nouă cerere de ofertă - ${data.fullName} (${serviceLabels[data.serviceType] || data.serviceType})`
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const data = body

    // Validate required fields
    if (!validateQuoteRequest(data)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Vă rugăm să completați toate câmpurile obligatorii.',
        },
        { status: 400 }
      )
    }

    const quoteRequestData: QuoteRequestData = data

    // Initialize Payload
    let payload
    try {
      const config = await getConfig()
      payload = await getPayload({ config })
    } catch (error) {
      console.error('Failed to initialize Payload:', error)
      // Continue without saving to database if Payload is not configured
    }

    // Save to QuoteRequests collection
    // Note: This is commented out initially as the database may not be configured yet
    // Once the database is set up, uncomment this section
    let savedQuoteRequest = null
    if (payload) {
      try {
        // savedQuoteRequest = await payload.create({
        //   collection: 'quote-requests',
        //   data: {
        //     fullName: quoteRequestData.fullName,
        //     phone: quoteRequestData.phone,
        //     email: quoteRequestData.email,
        //     address: quoteRequestData.address,
        //     serviceType: quoteRequestData.serviceType,
        //     surfaceArea: quoteRequestData.surfaceArea || null,
        //     surfaceType: quoteRequestData.surfaceType || null,
        //     preferredDate: quoteRequestData.preferredDate || null,
        //     preferredTime: quoteRequestData.preferredTime || null,
        //     urgency: quoteRequestData.urgency || 'normal',
        //     notes: quoteRequestData.notes || null,
        //   },
        // })
        console.log('Quote request would be saved to database:', quoteRequestData)
      } catch (dbError) {
        console.error('Failed to save quote request to database:', dbError)
        // Continue with email notifications even if database save fails
      }
    }

    // Send admin notification email
    let adminEmailSent = false
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: getAdminEmailSubject(quoteRequestData),
          html: getAdminEmailHtml(quoteRequestData),
        })
        adminEmailSent = true
        console.log('Admin notification email sent')
      } catch (emailError) {
        console.error('Failed to send admin notification email:', emailError)
      }
    } else {
      console.warn('Resend API key not configured, skipping admin email')
    }

    // Send customer confirmation email
    let customerEmailSent = false
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: quoteRequestData.email,
          subject: 'Cererea dumneavoastră de ofertă a fost primită',
          html: getCustomerEmailHtml(quoteRequestData),
        })
        customerEmailSent = true
        console.log('Customer confirmation email sent')
      } catch (emailError) {
        console.error('Failed to send customer confirmation email:', emailError)
      }
    } else {
      console.warn('Resend API key not configured, skipping customer email')
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Cererea a fost trimisă cu succes! Vă vom contacta în curând.',
        data: {
          fullName: quoteRequestData.fullName,
          email: quoteRequestData.email,
          serviceType: quoteRequestData.serviceType,
          adminEmailSent,
          customerEmailSent,
          savedToDatabase: !!savedQuoteRequest,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing quote request:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'A apărut o eroare la procesarea cererii. Vă rugăm să încercați din nou.',
      },
      { status: 500 }
    )
  }
}
