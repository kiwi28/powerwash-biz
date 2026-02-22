# Powerwashing Service Website - Development Guidelines

## Project Overview

This is a multilingual powerwashing service website built with modern web technologies.

**Tech Stack:**
- **Frontend Framework:** Next.js 16 (App Router) + TypeScript
- **CMS/Database:** Payload CMS 3 + MongoDB (via @payloadcms/db-mongodb)
- **UI Components:** Tailwind CSS + shadcn/ui
- **Internationalization:** next-intl (Romanian default, English)
- **Email Service:** Resend
- **Form Validation:** React Hook Form + Zod

**Primary Languages:**
- **Default:** Romanian (`/`)
- **Secondary:** English (`/en`)

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Next.js 16 App Router Conventions](#nextjs-16-app-router-conventions)
3. [Payload CMS 3 Guidelines](#payload-cms-3-guidelines)
4. [shadcn/ui Component Usage](#shadcnui-component-usage)
5. [Internationalization (next-intl)](#internationalization-next-intl)
6. [Tailwind CSS Conventions](#tailwind-css-conventions)
7. [Form Handling & Validation](#form-handling--validation)
8. [Email Notifications (Resend)](#email-notifications-resend)
9. [Code Style & Formatting](#code-style--formatting)
10. [Testing Guidelines](#testing-guidelines)
11. [Performance Best Practices](#performance-best-practices)
12. [Security Guidelines](#security-guidelines)
13. [Git Workflow](#git-workflow)

---

## Project Structure

```
agentic-next-payloadcms/
├── app/                          # Next.js App Router directory
│   ├── [locale]/                 # i18n route segment
│   │   ├── (main)/               # Route groups for logical organization
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── services/        # Services pages
│   │   │   ├── about/           # About page
│   │   │   └── contact/         # Contact page
│   │   ├── (cms)/               # CMS-related routes
│   │   │   └── [...slug]/       # Dynamic CMS pages
│   │   ├── layout.tsx           # Root layout with i18n
│   │   └── not-found.tsx        # 404 page
│   ├── api/                      # API routes
│   │   ├── contact/             # Contact form endpoint
│   │   └── webhook/             # Resend webhooks
│   ├── globals.css              # Global styles
│   └── layout.tsx                # Root layout
├── cms/                          # Payload CMS configuration
│   ├── collections/             # Collection definitions
│   │   ├── services.ts          # Services collection
│   │   ├── projects.ts          # Projects/Portfolio collection
│   │   ├── testimonials.ts      # Testimonials collection
│   │   ├── faq.ts               # FAQ collection
│   │   └── settings.ts          # Site-wide settings
│   ├── globals/                 # Global configurations
│   │   ├── blocks.ts            # Custom blocks
│   │   └── globals.ts           # Globals definition
│   ├── access.ts                # Access control
│   ├── config.ts                # Main Payload config
│   └── types.ts                 # TypeScript types
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/                # Page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   └── Contact.tsx
│   └── forms/                   # Form components
│       ├── ContactForm.tsx
│       └── QuoteForm.tsx
├── lib/                         # Utility functions
│   ├── payload-client.ts       # Payload client config
│   ├── payload-server.ts       # Payload server config
│   ├── utils.ts                # General utilities
│   ├── validations.ts          # Zod schemas
│   └── email.ts                # Email functions
├── messages/                    # i18n messages
│   ├── ro.json                  # Romanian translations
│   └── en.json                  # English translations
├── public/                     # Static assets
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── tailwind.config.ts          # Tailwind configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── i18n.ts                     # next-intl configuration
└── package.json
```

---

## Next.js 16 App Router Conventions

### File Organization

- **Use Server Components by default** - Only mark components as `'use client'` when interactivity is needed
- **Route groups `(...)`** - Organize related routes without affecting URL structure
- **Parallel routes** - Use for complex layouts (e.g., header, sidebar, main content)
- **Intercepting routes** - Use for modals and overlays

### Component Patterns

```typescript
// ✅ GOOD: Server Component (default)
export default async function ServicesPage() {
  const services = await getServices()
  return <ServiceList services={services} />
}

// ✅ GOOD: Client Component (when needed)
'use client'

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContact, initialState)
  // Interactive logic here
}
```

### Data Fetching

```typescript
// ✅ GOOD: Async Server Components for data fetching
import { payload } from '@/lib/payload-server'

export default async function Page({ params }: { params: { locale: string } }) {
  const { docs: services } = await payload.find({
    collection: 'services',
    locale: params.locale,
  })

  return <ServicesGrid services={services} />
}

// ✅ GOOD: Route handlers for API endpoints
// app/api/contact/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  // Process and respond
}
```

### Caching Strategy

```typescript
// ✅ GOOD: Use revalidate for dynamic content
export const revalidate = 3600 // Revalidate every hour

// ✅ GOOD: Use unstable_cache for expensive operations
import { unstable_cache } from 'next/cache'

const getCachedServices = unstable_cache(
  async (locale: string) => {
    return await payload.find({ collection: 'services', locale })
  },
  ['services'],
  { revalidate: 3600, tags: ['services'] }
)
```

### Metadata

```typescript
// ✅ GOOD: Use generateMetadata for dynamic metadata
export async function generateMetadata({ params }: PageProps) {
  const t = await getTranslations({ locale: params.locale, namespace: 'metadata' })

  return {
    title: t('services.title'),
    description: t('services.description'),
    openGraph: {
      title: t('services.title'),
      description: t('services.description'),
      locale: params.locale,
    },
  }
}
```

### Anti-patterns to Avoid

```typescript
// ❌ BAD: Unnecessary client components
'use client'
export default function StaticHeader() {
  return <header><Logo /></header> // No interactivity needed
}

// ❌ BAD: Fetching in useEffect
useEffect(() => {
  fetch('/api/services').then(res => res.json())
}, []) // Use Server Components instead

// ❌ BAD: Manual URL building
const href = `/ro/services/${slug}` // Use next/link and built-in i18n
```

---

## Payload CMS 3 Guidelines

### Collection Structure

```typescript
// ✅ GOOD: Collection definition with TypeScript
import { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price'],
  },
  access: {
    read: () => true, // Public read access
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true, // Enable i18n
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'price',
      type: 'number',
      admin: {
        description: 'Starting price (RON)',
      },
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
  ],
  i18n: true, // Enable localization
}
```

### Best Practices

1. **Always type collections** - Use TypeScript interfaces for your collections
2. **Use `localized: true`** for content that needs translation
3. **Define access control** - Be explicit about who can read/write
4. **Use hooks for automation** - `beforeChange`, `afterChange`, `beforeValidate`

```typescript
// ✅ GOOD: Using hooks
hooks: {
  beforeChange: [
    async ({ data, req }) => {
      // Auto-generate slug from title
      if (!data.slug && data.title) {
        data.slug = data.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      }
      return data
    },
  ],
  afterChange: [
    async ({ doc, req }) => {
      // Invalidate Next.js cache
      await revalidateTag('services')
    },
  ],
},
```

### Custom Blocks

```typescript
// ✅ GOOD: Reusable blocks for rich content
export const BlockTypes = [
  {
    slug: 'service-features',
    interfaceName: 'ServiceFeaturesBlock',
    fields: [
      {
        name: 'heading',
        type: 'text',
      },
      {
        name: 'features',
        type: 'array',
        fields: [
          {
            name: 'icon',
            type: 'text',
            admin: {
              description: 'Lucide icon name',
            },
          },
          {
            name: 'title',
            type: 'text',
            localized: true,
          },
          {
            name: 'description',
            type: 'textarea',
            localized: true,
          },
        ],
      },
    ],
  },
]
```

### Access Control

```typescript
// ✅ GOOD: Granular access control
import { Access } from 'payload/types'

const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (user?.role === 'admin') return true
  return {
    id: {
      equals: user?.id,
    },
  }
}
```

### Anti-patterns to Avoid

```typescript
// ❌ BAD: No TypeScript types
export const BadCollection = {
  slug: 'services',
  fields: [...],
}

// ❌ BAD: Overly complex field groups (keep it simple)
fields: [
  {
    name: 'everything',
    type: 'group',
    fields: [/* 50 fields */], // Split into multiple collections or tabs
  },
]

// ❌ BAD: Missing access control
access: {}, // Always define access explicitly
```

---

## shadcn/ui Component Usage

### Installation & Usage

```typescript
// ✅ GOOD: Import from @/components/ui
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
```

### Component Patterns

```typescript
// ✅ GOOD: Combining shadcn components with custom styling
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="relative h-48 overflow-hidden rounded-lg">
          <Image
            src={service.image.url}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-xl font-bold mt-4">{service.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{service.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/${service.slug}`}>
            Get Quote
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
```

### Form Integration

```typescript
// ✅ GOOD: shadcn Form with React Hook Form + Zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { contactSchema } from '@/lib/validations'

export function ContactForm() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    await submitContact(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* More fields */}
        <Button type="submit">Send Message</Button>
      </form>
    </Form>
  )
}
```

### Customization

```typescript
// ✅ GOOD: Extend shadcn components with variants
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        service: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
  }
)
```

### Anti-patterns to Avoid

```typescript
// ❌ BAD: Directly modifying component files
// Instead, wrap or compose components

// ❌ BAD: Inline styles on shadcn components
<Button style={{ backgroundColor: 'red' }}>
  Use variants instead
</Button>

// ❌ BAD: Not using built-in form components
<form>
  <input /> {/* Use Input component */}
</form>
```

---

## Internationalization (next-intl)

### Configuration

```typescript
// ✅ GOOD: i18n.ts configuration
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
```

### File Structure

```
messages/
├── ro.json              # Romanian (default)
├── en.json              # English
└── common.json          # Shared translations (optional)
```

### Translation File Format

```json
{
  "nav": {
    "home": "Acasă",
    "services": "Servicii",
    "about": "Despre Noi",
    "contact": "Contact"
  },
  "services": {
    "title": "Serviciile Noastre",
    "description": "Oferim servicii profesionale de spălare sub presiune",
    "pressure": "Spălare sub presiune",
    "roof": "Spălare acoperișuri",
    "driveway": "Curățare alei și trotuare"
  },
  "contact": {
    "title": "Contactează-ne",
    "form": {
      "name": "Numele tău",
      "email": "Email",
      "phone": "Telefon",
      "message": "Mesaj",
      "submit": "Trimite Mesaj"
    }
  }
}
```

### Usage in Components

```typescript
// ✅ GOOD: Using useTranslations (client components)
'use client'

import { useTranslations } from 'next-intl'

export default function ContactForm() {
  const t = useTranslations('contact.form')

  return (
    <form>
      <label>{t('name')}</label>
      {/* ... */}
    </form>
  )
}

// ✅ GOOD: Using getTranslations (server components)
import { getTranslations } from 'next-intl/server'

export default async function Page({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'services' })

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}

// ✅ GOOD: Using Link with i18n
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav>
      <Link href="/services">{/* Automatically handles locale */}Services</Link>
      <Link href="/about">About</Link>
    </nav>
  )
}
```

### Number/Date Formatting

```typescript
// ✅ GOOD: Localized formatting
import { useFormatter } from 'next-intl'

export function PriceDisplay({ price }: { price: number }) {
  const format = useFormatter()

  return (
    <span>{format.number(price, { style: 'currency', currency: 'RON' })}</span>
  )
}

export function DateDisplay({ date }: { date: Date }) {
  const format = useFormatter()

  return <time dateTime={date.toISOString()}>{format.dateTime(date, { dateStyle: 'long' })}</time>
}
```

### Best Practices

1. **Use namespaces** - Organize translations by component/section
2. **Avoid nested keys** - Keep it flat for better performance
3. **Share common translations** - Use a common namespace for repeated text
4. **Type-safe translations** - Use TypeScript to validate translation keys

```typescript
// ✅ GOOD: Type-safe translations
type TranslationKeys = keyof typeof messages['ro']

function t(key: TranslationKeys) {
  return messages[key]
}
```

### Anti-patterns to Avoid

```typescript
// ❌ BAD: Hardcoded text
export default function Header() {
  return <h1>Services</h1> // Always use translations
}

// ❌ BAD: Conditional translations in code
export default function Button() {
  return <button>{locale === 'ro' ? 'Trimite' : 'Send'}</button>
}

// ❌ BAD: Inline translations
<h1>{messages.ro.services.title}</h1>
```

---

## Tailwind CSS Conventions

### Utility Classes Order

```typescript
// ✅ GOOD: Logical order of utilities
// 1. Layout (display, overflow)
// 2. Flex/Grid
// 3. Spacing (margin, padding)
// 4. Sizing (width, height)
// 5. Typography (font, text)
// 6. Colors (bg, text, border)
// 7. Effects (shadow, transform)
// 8. Transitions

<div className="
  flex flex-col gap-4
  p-6
  w-full max-w-md
  text-lg font-semibold
  bg-white text-gray-900
  shadow-lg
  hover:shadow-xl
  transition-shadow duration-300
">
```

### Component Composition

```typescript
// ✅ GOOD: Creating reusable utility combinations
// tailwind.config.ts
export const container = 'container mx-auto px-4 sm:px-6 lg:px-8'
export const section = 'py-16 sm:py-24'
export const heading = 'text-3xl sm:text-4xl font-bold mb-4'
export const subheading = 'text-lg text-muted-foreground mb-8'

// Usage
<section className={section}>
  <div className={container}>
    <h2 className={heading}>Our Services</h2>
    <p className={subheading}>Professional powerwashing for your property</p>
  </div>
</section>
```

### Responsive Design

```typescript
// ✅ GOOD: Mobile-first approach
<div className="
  p-4           /* Base: mobile */
  sm:p-6        /* Small screens */
  md:p-8        /* Medium screens */
  lg:p-12       /* Large screens */
">
```

### Custom Colors (Powerwashing Theme)

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: '#0284c7', // Sky blue (water/cleaning)
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#0369a1', // Deep blue
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#38bdf8', // Light blue
          foreground: '#0f172a',
        },
        // Service-specific colors
        water: '#0ea5e9',
        foam: '#f0f9ff',
        clean: '#ecfdf5',
      },
    },
  },
}
```

### Anti-patterns to Avoid

```typescript
// ❌ BAD: Arbitrary values when standard classes exist
<div className="mt-[32px]"> {/* Use mt-8 */}
<div className="p-[1.5rem]"> {/* Use p-6 */}

// ❌ BAD: Overly specific utility strings
<div className="flex items-center justify-center p-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  {/* Extract to component */}
</div>

// ❌ BAD: !important equivalents
<div className="!text-red-500"> {/* Avoid !important */}
```

---

## Form Handling & Validation

### Zod Schemas

```typescript
// ✅ GOOD: Centralized validation schemas
// lib/validations.ts
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^07\d{8}$/, 'Invalid Romanian phone number'),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const quoteRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^07\d{8}$/),
  serviceType: z.enum(['pressure', 'roof', 'driveway', 'deck', 'other']),
  propertySize: z.string().min(1, 'Property size is required'),
  address: z.string().min(10, 'Please provide your full address'),
  additionalInfo: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
export type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>
```

### Server Actions

```typescript
// ✅ GOOD: Server actions with validation
'use server'

import { revalidatePath } from 'next/cache'
import { contactSchema } from '@/lib/validations'
import { sendContactEmail } from '@/lib/email'

export async function submitContactForm(formData: FormData) {
  // Parse and validate
  const data = Object.fromEntries(formData)
  const result = contactSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    }
  }

  // Send email
  await sendContactEmail(result.data)

  // Revalidate if needed
  revalidatePath('/contact')

  return {
    success: true,
    message: 'Message sent successfully!',
  }
}
```

### Client Form with Validation

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { submitContactForm } from '@/app/actions/contact'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message?: string } | null>(null)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true)
    setResult(null)

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value)
    })

    const response = await submitContactForm(formData)
    setResult(response)

    if (response.success) {
      form.reset()
    }

    setIsSubmitting(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Form fields */}
        {result && (
          <div className={result.success ? 'text-green-600' : 'text-red-600'}>
            {result.message}
          </div>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  )
}
```

### Anti-patterns to Avoid

```typescript
// ❌ BAD: Client-side only validation
function onSubmit() {
  if (!email.includes('@')) { // Always validate on server
    setError('Invalid email')
  }
}

// ❌ BAD: Not handling validation errors
await submitContactForm(formData) // No error handling

// ❌ BAD: Manual form submission
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // Use React Hook Form
}
```

---

## Email Notifications (Resend)

### Configuration

```typescript
// lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Email templates
export async function sendContactEmail(data: ContactFormData) {
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'noreply@example.com',
    to: process.env.CONTACT_TO_EMAIL || 'contact@example.com',
    subject: `New Contact from ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  })

  if (error) {
    console.error('Failed to send email:', error)
    throw new Error('Failed to send email')
  }
}

export async function sendQuoteRequestEmail(data: QuoteRequestFormData) {
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL,
    to: process.env.CONTACT_TO_EMAIL,
    subject: `Quote Request - ${data.serviceType}`,
    html: QuoteTemplate(data),
  })

  if (error) {
    throw new Error('Failed to send quote email')
  }
}
```

### Template Function

```typescript
// lib/templates.ts
export function QuoteTemplate(data: QuoteRequestFormData) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
        <div style="background: #0284c7; color: white; padding: 20px;">
          <h1>New Quote Request</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Customer Details</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>

          <h2>Service Details</h2>
          <p><strong>Service Type:</strong> ${data.serviceType}</p>
          <p><strong>Property Size:</strong> ${data.propertySize}</p>
          <p><strong>Address:</strong> ${data.address}</p>

          ${data.additionalInfo ? `
            <h2>Additional Information</h2>
            <p>${data.additionalInfo}</p>
          ` : ''}
        </div>
      </body>
    </html>
  `
}
```

### Anti-patterns to Avoid

```typescript
// ❌ BAD: Exposing API key in client code
const resend = new Resend('re_123456789') // Use environment variables

// ❌ BAD: Not handling errors
await resend.emails.send({...}) // No error handling

// ❌ BAD: Inline HTML templates
await resend.emails.send({
  html: '<div>' + name + '</div>', // Use template functions
})
```

---

## Code Style & Formatting

### TypeScript

```typescript
// ✅ GOOD: Type definitions
interface Service {
  id: string
  slug: string
  title: string
  description: string
  price: number
  image: Media
}

type ServiceType = 'pressure' | 'roof' | 'driveway' | 'deck' | 'other'

interface Props {
  services: Service[]
  locale: string
}

// ✅ GOOD: Component typing
export default function ServiceList({ services, locale }: Props) {
  // ...
}

// ✅ GOOD: Async component typing
export default async function Page({ params }: { params: { locale: string } }) {
  // ...
}
```

### Naming Conventions

- **Components:** PascalCase (`ServiceCard`, `ContactForm`)
- **Functions:** camelCase (`getServices`, `submitContact`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_UPLOAD_SIZE`)
- **Types/Interfaces:** PascalCase (`Service`, `ContactFormData`)
- **Files:** kebab-case for components (`service-card.tsx`), camelCase for utilities (`utils.ts`)

### Imports Order

```typescript
// ✅ GOOD: Organized imports
// 1. React/Next.js
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// 2. Third-party libraries
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// 3. Internal components (absolute imports)
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// 4. Internal utilities
import { cn } from '@/lib/utils'
import { contactSchema } from '@/lib/validations'

// 5. Types
import type { Service } from '@/cms/types'
```

### Comments and Documentation

```typescript
// ✅ GOOD: JSDoc for complex functions
/**
 * Fetches services from Payload CMS with caching
 * @param locale - The locale to fetch services for (ro/en)
 * @param includeDrafts - Whether to include draft documents (admin only)
 * @returns Promise<Service[]> Array of services
 */
export async function getServices(locale: string, includeDrafts = false): Promise<Service[]> {
  // ...
}

// ✅ GOOD: Brief comments for complex logic
// Generate slug from Romanian title, removing special characters
const slug = title
  .toLowerCase()
  .replace(/[âăîșț]/g, match => ({
    'â': 'a', 'ă': 'a', 'î': 'i', 'ș': 's', 'ț': 't'
  }[match] || match))
  .replace(/[^a-z0-9]+/g, '-')
```

### ESLint Configuration

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "error",
    "prefer-const": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

### Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always"
}
```

---

## Testing Guidelines

### Testing Tools

- **Unit Tests:** Vitest
- **Component Tests:** React Testing Library
- **E2E Tests:** Playwright

### Test Structure

```
tests/
├── unit/
│   ├── utils.test.ts
│   └── validations.test.ts
├── components/
│   ├── ServiceCard.test.tsx
│   └── ContactForm.test.tsx
└── e2e/
    ├── contact.spec.ts
    └── services.spec.ts
```

### Unit Test Example

```typescript
// tests/unit/utils.test.ts
import { describe, it, expect } from 'vitest'
import { generateSlug, formatPrice } from '@/lib/utils'

describe('generateSlug', () => {
  it('generates slug from Romanian text', () => {
    expect(generateSlug('Spălare sub presiune')).toBe('spalare-sub-presiune')
  })

  it('handles special characters', () => {
    expect(generateSlug('Acoperiș & Trotuare')).toBe('acoperis-trotuare')
  })
})
```

### Component Test Example

```typescript
// tests/components/ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ContactForm } from '@/components/forms/ContactForm'

describe('ContactForm', () => {
  it('renders form fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<ContactForm />)
    const submitButton = screen.getByRole('button', { name: /send/i })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    })
  })
})
```

### E2E Test Example

```typescript
// tests/e2e/contact.spec.ts
import { test, expect } from '@playwright/test'

test('contact form submission', async ({ page }) => {
  await page.goto('/contact')

  await page.fill('input[name="name"]', 'John Doe')
  await page.fill('input[name="email"]', 'john@example.com')
  await page.fill('input[name="phone"]', '0712345678')
  await page.fill('textarea[name="message"]', 'I need powerwashing services')

  await page.click('button[type="submit"]')

  await expect(page.locator('text=Message sent successfully')).toBeVisible()
})
```

### Testing Guidelines

1. **Test what matters** - Focus on business logic and user interactions
2. **Use test IDs sparingly** - Prefer user-facing text and accessible selectors
3. **Mock external dependencies** - API calls, databases, email services
4. **Keep tests independent** - Each test should be able to run alone
5. **Aim for 80% coverage** - Focus on critical paths and complex logic

---

## Performance Best Practices

### Image Optimization

```typescript
// ✅ GOOD: Next.js Image component
import Image from 'next/image'

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Image
      src={service.image.url}
      alt={service.image.alt || service.title}
      width={400}
      height={300}
      className="rounded-lg"
      priority={false} // Only for above-fold images
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
```

### Data Fetching

```typescript
// ✅ GOOD: Parallel data fetching
export default async function Page() {
  const [services, testimonials, settings] = await Promise.all([
    getServices(),
    getTestimonials(),
    getSettings(),
  ])

  return (
    <div>
      <Services services={services} />
      <Testimonials testimonials={testimonials} />
    </div>
  )
}

// ✅ GOOD: Streaming with Suspense
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<ServicesSkeleton />}>
        <Services />
      </Suspense>
    </div>
  )
}
```

### Code Splitting

```typescript
// ✅ GOOD: Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const ContactMap = dynamic(() => import('@/components/ContactMap'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
})

export default function ContactPage() {
  return (
    <div>
      <ContactForm />
      <ContactMap />
    </div>
  )
}
```

### Caching Strategy

```typescript
// ✅ GOOD: Appropriate cache headers
export const revalidate = 3600 // Revalidate every hour for services

// ✅ GOOD: Cache tags for selective invalidation
import { unstable_cache } from 'next/cache'

const getServices = unstable_cache(
  async () => {
    return await payload.find({ collection: 'services' })
  },
  ['services'],
  { revalidate: 3600, tags: ['services'] }
)

// Invalidate on update
export async function updateService(id: string) {
  await payload.update({ collection: 'services', id, data: {...} })
  revalidateTag('services')
}
```

---

## Security Guidelines

### Environment Variables

```bash
# .env.local (never commit)
MONGODB_URI=mongodb://...
PAYLOAD_SECRET=your-secret-key-here
RESEND_API_KEY=re_...
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Input Validation

```typescript
// ✅ GOOD: Always validate and sanitize input
import { contactSchema } from '@/lib/validations'
import DOMPurify from 'isomorphic-dompurify'

export async function submitContactForm(formData: FormData) {
  const data = Object.fromEntries(formData)
  const result = contactSchema.safeParse(data)

  if (!result.success) {
    throw new Error('Invalid input')
  }

  // Sanitize user input
  const sanitized = {
    ...result.data,
    message: DOMPurify.sanitize(result.data.message),
  }

  // Process sanitized data
}
```

### CSRF Protection

```typescript
// ✅ GOOD: Use CSRF tokens for state-changing operations
import { csrfToken } from '@/lib/csrf'

export default function ContactForm() {
  const token = csrfToken()

  return (
    <form action="/api/contact" method="POST">
      <input type="hidden" name="csrf_token" value={token} />
      {/* form fields */}
    </form>
  )
}
```

### Rate Limiting

```typescript
// ✅ GOOD: Implement rate limiting for API endpoints
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 requests per minute
})

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return new Response('Too many requests', { status: 429 })
  }

  // Process request
}
```

---

## Git Workflow

### Branch Naming

```
feature/         - New features
  feature/add-booking-system
  feature/integrate-resend
bugfix/          - Bug fixes
  bugfix/contact-form-validation
hotfix/          - Urgent production fixes
  hotfix/critical-email-error
refactor/        - Code refactoring
  refactor/optimise-image-loading
docs/            - Documentation
  docs/update-api-docs
```

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**

```
feat(contact): add phone number field to contact form

Added phone number field to contact form to allow customers
to be contacted via phone. Updated Zod schema and Payload collection.

Closes #123
```

```
fix(i18n): correct Romanian translation for services

Fixed typo in services.json where "Servicii" was misspelled.
Also added missing translations for sub-services.
```

---

## Quick Reference

### Common Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Code quality
npm run lint            # Run ESLint
npm run format          # Format with Prettier
npm run type-check      # TypeScript type checking

# Testing
npm run test            # Run all tests
npm run test:unit       # Run unit tests
npm run test:e2e        # Run E2E tests

# Payload CMS
npm run generate:types  # Generate Payload TypeScript types
npm run seed            # Seed database with initial data
```

### File Naming

```
Components:     PascalCase.tsx     (ServiceCard.tsx)
Utilities:      camelCase.ts      (formatPrice.ts)
Types:          types.ts          (cms/types.ts)
Hooks:          use*.ts           (useServices.ts)
API routes:     route.ts          (app/api/contact/route.ts)
```

### Import Aliases

```
@/components/    - Components directory
@/lib/           - Utilities and helpers
@/cms/           - Payload CMS configuration
@/app/           - App directory
@/public/        - Public directory
```

---

## Additional Resources

### Official Documentation
- Next.js: https://nextjs.org/docs
- Payload CMS: https://payloadcms.com/docs
- shadcn/ui: https://ui.shadcn.com
- next-intl: https://next-intl-docs.vercel.app
- Tailwind CSS: https://tailwindcss.com/docs

### Best Practice Articles
- Next.js App Router Best Practices
- Payload CMS Production Guide
- Building Accessible React Components
- TypeScript Best Practices

---

**Last Updated:** February 2026
**Version:** 1.0.0
