# Powerwashing Service Website - Design Document

**Date:** 2026-02-22
**Project:** Professional powerwashing service website for Iași, Romania
**Status:** Approved

---

## 1. Architecture Overview

### Project Structure
```
/home/alexkiwi/projects/personal/agentic-next-payloadcms/
├── app/
│   ├── (payload)/          # Payload admin routes
│   ├── (frontend)/
│   │   └── [locale]/        # i18n routing (ro, en)
│   │       ├── layout.tsx
│   │       ├── page.tsx             # Landing page
│   │       ├── servicii/page.tsx    # Services
│   │       ├── solicita-oferta/page.tsx  # Quote request
│   │       ├── portofoliu/page.tsx  # Gallery
│   │       ├── despre/page.tsx      # About
│   │       └── contact/page.tsx     # Contact
│   └── api/
│       └── quote-request/route.ts
├── payload/
│   ├── collections/         # QuoteRequests, GalleryItems, Testimonials, Services
│   └── globals/             # SiteSettings
├── components/             # Shared UI components
├── messages/               # i18n translations (ro.json, en.json)
└── payload.config.ts
```

### Tech Stack
- **Frontend:** Next.js 16 App Router with TypeScript
- **Backend:** Payload CMS 3 with MongoDB
- **UI:** Tailwind CSS + shadcn/ui
- **i18n:** next-intl (Romanian primary, English secondary)
- **Email:** Resend for notifications
- **Forms:** React Hook Form + Zod validation

### Data Flow
1. User submits quote form → API route → Payload CMS (MongoDB) + Resend emails
2. Admin manages content → Payload admin panel → MongoDB
3. Frontend queries → Payload API → Renders pages

---

## 2. Payload CMS Collections & Data Models

### Collections

#### QuoteRequests
Lead collection for quote requests
- Personal info: fullName, phone, email, address
- Service details: serviceType, surfaceArea, surfaceType, preferredDate, preferredTime, urgency
- Photos array (with media uploads)
- Notes, status (new/contacted/quoted/scheduled/completed/cancelled), adminNotes

#### GalleryItems
Before/after work showcase
- beforeImage, afterImage (required uploads)
- category (alei/pereti/terase/comercial)
- caption, location, dateCompleted

#### Testimonials
Customer reviews
- name, rating (1-5), review, service, date, visible flag

#### Services
Service catalog
- title (localized), slug, description (localized)
- priceRange, icon, order

#### Media
Built-in Payload media collection for uploads

### Globals

#### SiteSettings
Contact info, business hours, social links, service area

### Localization
- Services: localized title and description fields
- Frontend: next-intl for all UI text
- Default locale: 'ro' (Romanian)
- Fallback: enabled

---

## 3. Shared Components

### Core Components

1. **Header.tsx**
   - Logo
   - Navigation menu (responsive hamburger on mobile)
   - Language toggle (RO/EN)
   - Phone number (click-to-call)

2. **Footer.tsx**
   - Contact info
   - Quick links
   - Social media links
   - Language toggle
   - Copyright

3. **Hero.tsx**
   - Headline and subheadline
   - Primary CTA button
   - Background image/video placeholder
   - Phone number display

4. **ServiceCard.tsx**
   - Icon, title, description
   - Starting price
   - Link to services page

5. **GalleryComparison.tsx**
   - Before/after slider component (using react-compare-slider)
   - Category filter tabs

6. **TestimonialCard.tsx**
   - Star rating display
   - Customer review
   - Date and service info

7. **QuoteForm.tsx**
   - Multi-step form with validation (React Hook Form + Zod)
   - Photo upload with preview
   - Success modal

### shadcn/ui Components
button, card, input, textarea, select, label, form, badge, avatar
dialog, sheet, dropdown-menu, navigation-menu, separator
accordion, carousel, toast, sonner

---

## 4. Page Designs

### Landing Page (`app/[locale]/page.tsx`)
1. Hero with CTA
2. Services overview (4-6 cards)
3. Why Choose Us (3-4 benefits)
4. How It Works (3 steps timeline)
5. Testimonials preview
6. Before/After preview gallery
7. Service area section
8. Final CTA section

### Services Page (`app/[locale]/servicii/page.tsx`)
- Page intro
- Each service as expandable section with accordion
- FAQ per service
- CTA button

### Quote Request Page (`app/[locale]/solicita-oferta/page.tsx`)
- QuoteForm component
- Form validation with Zod
- Submit to API route
- Success page/message

### Gallery Page (`app/[locale]/portofoliu/page.tsx`)
- Category filter tabs
- Masonry or grid layout of before/after pairs
- Lightbox for full-size view
- Testimonials section at bottom

### About Page (`app/[locale]/despre/page.tsx`)
- Personal story section
- Why choose us
- Values section
- Team/equipment photo

### Contact Page (`app/[locale]/contact/page.tsx`)
- Contact form (simplified)
- Phone, email, hours
- Service area map placeholder
- Social media links

---

## 5. API Routes & Email Handling

### Quote Request API (`app/api/quote-request/route.ts`)
Handles POST requests:
1. Validate form data with Zod schema
2. Save to Payload CMS `QuoteRequests` collection
3. Send email notification to admin
4. Send confirmation email to customer (24h response promise)

### Email Templates (Resend)

#### Admin Notification
- Customer details (name, phone, email, address)
- Service preferences (type, area, surface type, date, time, urgency)
- Photo links
- Notes
- Direct link to admin panel

#### Customer Confirmation
- Thank you message
- Summary of request
- 24-hour response promise
- Contact info for urgent inquiries

---

## 6. SEO & Meta Tags

### Global Metadata (`app/[locale]/layout.tsx`)
- Favicon
- Open Graph tags
- Twitter card tags
- Canonical URLs

### Per-Page Metadata
- Homepage: "Curățare cu presiune Iași | Servicii profesionale powerwashing"
- Services: Target service-specific keywords
- Gallery: Alt tags on all images, ImageObject schema

### Schema Markup
LocalBusiness schema with:
- Name, address, phone, email
- Opening hours
- Service area (Iași, Romania)
- Price range
- Social media links

---

## 7. Environment Variables & Deployment

### Environment Variables
| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | MongoDB connection string |
| `PAYLOAD_SECRET` | Payload CMS secret |
| `RESEND_API_KEY` | Resend API key for emails |
| `NEXT_PUBLIC_SITE_URL` | Site URL |

### Deployment (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Build command: `pnpm build`
4. MongoDB Atlas for production database

---

## 8. Testing & Verification

### Verification Steps
1. Project Setup - dev server, admin panel, create admin user
2. CMS Collections - test service, gallery item, testimonial
3. Pages - all routes, language toggle, mobile responsiveness
4. Form - quote submission, admin panel, email notifications
5. Database - MongoDB verification
6. Deployment - Vercel deployment, environment variables

### Testing Tools
- Vitest for unit tests
- React Testing Library for component tests
- Playwright for manual frontend debugging (visual testing, responsive design, interactive elements) - NOT for automated E2E tests

---

## Appendix: Tech Stack Guardrails

Additional development guidelines are documented in `/claude.md` including:
- Next.js 16 App Router best practices
- Payload CMS 3 conventions
- shadcn/ui patterns
- next-intl i18n setup
- Tailwind CSS conventions
- Form handling (React Hook Form + Zod)
- Resend email setup
- Code style & formatting
- Security practices
- Git workflow
