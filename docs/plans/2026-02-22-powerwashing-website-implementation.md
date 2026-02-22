# Powerwashing Service Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a professional powerwashing service website for a business in Iași, Romania with multilingual support (Romanian/English), CMS content management, and quote request functionality.

**Architecture:** Next.js 16 App Router with Payload CMS 3, MongoDB, shadcn/ui components, next-intl for i18n, and Resend for email. Separation of frontend (`app/[locale]/`) and Payload admin routes (`app/(payload)/`).

**Tech Stack:** Next.js 16, Payload CMS 3, MongoDB, TypeScript, Tailwind CSS, shadcn/ui, next-intl, React Hook Form, Zod, Resend

---

## Phase 1: Project Setup & Configuration

### Task 1: Initialize Next.js project with shadcn/ui

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Create: `components.json`

**Step 1: Run shadcn init**

```bash
npx shadcn@latest init
# Select: TypeScript, Tailwind CSS, src/ directory, default alias
# Confirm all defaults
```

Expected: "Your project has been setup successfully!"

**Step 2: Verify project structure**

Run: `ls -la`
Expected: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts` exist

**Step 3: Commit**

```bash
git add .
git commit -m "feat: initialize Next.js with shadcn/ui"
```

---

### Task 2: Install Payload CMS and dependencies

**Files:**
- Modify: `package.json` (via pnpm install)

**Step 1: Install Payload dependencies**

```bash
pnpm i payload @payloadcms/next @payloadcms/richtext-lexical sharp graphql @payloadcms/db-mongodb
```

Expected: Installation completes without errors

**Step 2: Install i18n, email, and form dependencies**

```bash
pnpm i next-intl resend nodemailer react-hook-form @hookform/resolvers zod react-compare-slider lucide-react
```

Expected: Installation completes without errors

**Step 3: Verify package.json**

Run: `cat package.json | grep -E "(payload|next-intl|resend|zod)" | head -20`
Expected: All installed packages listed

**Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: install Payload, i18n, email, and form dependencies"
```

---

### Task 3: Configure Next.js for Payload

**Files:**
- Modify: `next.config.mjs`
- Modify: `tsconfig.json`

**Step 1: Update next.config.mjs**

```javascript
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  images: {
    domains: ['localhost'],
  },
}

export default withPayload(nextConfig)
```

**Step 2: Update tsconfig.json**

Add to `compilerOptions.paths`:
```json
"@payload-config": ["./payload.config.ts"]
```

**Step 3: Verify syntax**

Run: `cat next.config.mjs`
Expected: withPayload wrapper applied

**Step 4: Commit**

```bash
git add next.config.mjs tsconfig.json
git commit -m "feat: configure Next.js for Payload CMS"
```

---

### Task 4: Create Payload config

**Files:**
- Create: `payload.config.ts`

**Step 1: Create payload.config.ts**

```typescript
import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'

export default buildConfig({
  editor: lexicalEditor(),
  collections: [],
  globals: [],
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  typescript: {
    outputFile: './payload-types.ts',
  },
  localization: {
    locales: ['ro', 'en'],
    defaultLocale: 'ro',
    fallback: true,
  },
})
```

**Step 2: Verify TypeScript syntax**

Run: `npx tsc --noEmit payload.config.ts`
Expected: No errors

**Step 3: Commit**

```bash
git add payload.config.ts
git commit -m "feat: create Payload config with localization"
```

---

### Task 5: Create environment files

**Files:**
- Create: `.env.example`
- Create: `.env.local` (gitignored)

**Step 1: Create .env.example**

```env
DATABASE_URL=mongodb://localhost:27017/powerwashing
PAYLOAD_SECRET=your-super-secret-key-generate-with-openssl-rand-base64-32
RESEND_API_KEY=your-resend-api-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Step 2: Create .env.local**

```env
DATABASE_URL=mongodb://localhost:27017/powerwashing
PAYLOAD_SECRET=generate-secret-later
RESEND_API_KEY=placeholder
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Step 3: Create .gitignore**

```env
.env.local
.env.development
.env.production
node_modules
.next
payload-types.ts
dist
```

**Step 4: Commit**

```bash
git add .env.example .gitignore
git commit -m "feat: add environment configuration"
```

---

### Task 6: Configure Tailwind theme colors

**Files:**
- Modify: `tailwind.config.ts`

**Step 1: Update tailwind.config.ts with custom colors**

```typescript
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0066CC",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#28A745",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#FF6B35",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

**Step 2: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: configure Tailwind theme with custom colors"
```

---

## Phase 2: next-intl i18n Setup

### Task 7: Create i18n configuration

**Files:**
- Create: `i18n.ts`
- Create: `messages/ro.json`
- Create: `messages/en.json`

**Step 1: Create i18n.ts**

```typescript
export const locales = ['ro', 'en'] as const;
export const defaultLocale = 'ro' as const;
export type Locale = typeof locales[number];
```

**Step 2: Create messages/ro.json**

```json
{
  "nav": {
    "home": "Acasă",
    "services": "Servicii",
    "portfolio": "Portofoliu",
    "about": "Despre",
    "contact": "Contact"
  },
  "hero": {
    "headline": "Curățare Profesională cu Presiune în Iași",
    "subheadline": "Transformăm spațiile exterioare cu servicii de powerwashing de calitate superioară. Alee, pereți, terase și multe altele.",
    "cta": "Solicită o Ofertă",
    "phoneLabel": "Sună acum:"
  },
  "common": {
    "submit": "Trimite",
    "cancel": "Anulează",
    "next": "Continuă",
    "back": "Înapoi",
    "loading": "Încărcare..."
  }
}
```

**Step 3: Create messages/en.json**

```json
{
  "nav": {
    "home": "Home",
    "services": "Services",
    "portfolio": "Portfolio",
    "about": "About",
    "contact": "Contact"
  },
  "hero": {
    "headline": "Professional Pressure Washing in Iași",
    "subheadline": "Transform outdoor spaces with superior quality powerwashing services. Driveways, walls, terraces and more.",
    "cta": "Get a Quote",
    "phoneLabel": "Call now:"
  },
  "common": {
    "submit": "Submit",
    "cancel": "Cancel",
    "next": "Next",
    "back": "Back",
    "loading": "Loading..."
  }
}
```

**Step 4: Commit**

```bash
git add i18n.ts messages/
git commit -m "feat: add i18n configuration and translations"
```

---

### Task 8: Create middleware for locale handling

**Files:**
- Create: `middleware.ts`

**Step 1: Create middleware.ts**

```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ro', 'en'],
  defaultLocale: 'ro',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

**Step 2: Commit**

```bash
git add middleware.ts
git commit -m "feat: add next-intl middleware for locale routing"
```

---

## Phase 3: Payload CMS Collections

### Task 9: Create QuoteRequests collection

**Files:**
- Create: `payload/collections/QuoteRequests.ts`

**Step 1: Create payload/collections/QuoteRequests.ts**

```typescript
import { CollectionConfig } from 'payload/types';

export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  admin: {
    useAsTitle: 'fullName',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Nume Complet',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Telefon',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      label: 'Adresă / Locație',
    },
    {
      name: 'serviceType',
      type: 'select',
      required: true,
      label: 'Tip Serviciu',
      options: ['alei', 'pereti', 'terase', 'garduri', 'acoperis', 'comercial', 'altele'],
    },
    {
      name: 'surfaceArea',
      type: 'number',
      label: 'Suprafață (m²)',
    },
    {
      name: 'surfaceType',
      type: 'select',
      label: 'Tip Suprafață',
      options: ['beton', 'piatra', 'caramida', 'lemn', 'nu-stiu'],
    },
    {
      name: 'preferredDate',
      type: 'date',
      label: 'Data Preferată',
    },
    {
      name: 'preferredTime',
      type: 'select',
      label: 'Ora Preferată',
      options: ['dimineata', 'pranz', 'dupa-amiaza', 'oricand'],
    },
    {
      name: 'urgency',
      type: 'select',
      label: 'Urgență',
      options: ['normal', 'urgent'],
    },
    {
      name: 'photos',
      type: 'array',
      label: 'Fotografii',
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Alte Detalii',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
      options: ['new', 'contacted', 'quoted', 'scheduled', 'completed', 'cancelled'],
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Note Admin (Privat)',
      admin: {
        condition: (data) => data.status !== 'new',
      },
    },
  ],
};
```

**Step 2: Commit**

```bash
git add payload/collections/QuoteRequests.ts
git commit -m "feat: create QuoteRequests collection"
```

---

### Task 10: Create GalleryItems collection

**Files:**
- Create: `payload/collections/GalleryItems.ts`

**Step 1: Create payload/collections/GalleryItems.ts**

```typescript
import { CollectionConfig } from 'payload/types';

export const GalleryItems: CollectionConfig = {
  slug: 'gallery-items',
  admin: {
    useAsTitle: 'caption',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'beforeImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagine Înainte',
    },
    {
      name: 'afterImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagine După',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Categorie',
      options: ['alei', 'pereti', 'terase', 'comercial'],
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Descriere',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Locație',
    },
    {
      name: 'dateCompleted',
      type: 'date',
      label: 'Data Finalizare',
    },
  ],
};
```

**Step 2: Commit**

```bash
git add payload/collections/GalleryItems.ts
git commit -m "feat: create GalleryItems collection"
```

---

### Task 11: Create Testimonials collection

**Files:**
- Create: `payload/collections/Testimonials.ts`

**Step 1: Create payload/collections/Testimonials.ts**

```typescript
import { CollectionConfig } from 'payload/types';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nume',
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      label: 'Rating (1-5)',
      min: 1,
      max: 5,
    },
    {
      name: 'review',
      type: 'textarea',
      required: true,
      label: 'Recenzie',
    },
    {
      name: 'service',
      type: 'select',
      required: true,
      label: 'Serviciu',
      options: ['alei', 'pereti', 'terase', 'garduri', 'acoperis', 'comercial'],
    },
    {
      name: 'date',
      type: 'date',
      label: 'Data',
    },
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: true,
      label: 'Vizibil',
    },
  ],
};
```

**Step 2: Commit**

```bash
git add payload/collections/Testimonials.ts
git commit -m "feat: create Testimonials collection"
```

---

### Task 12: Create Services collection

**Files:**
- Create: `payload/collections/Services.ts`

**Step 1: Create payload/collections/Services.ts**

```typescript
import { CollectionConfig } from 'payload/types';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'priceRange',
      type: 'text',
      label: 'Preț (m²)',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon (emoji or lucide icon name)',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
```

**Step 2: Commit**

```bash
git add payload/collections/Services.ts
git commit -m "feat: create Services collection"
```

---

### Task 13: Create SiteSettings global

**Files:**
- Create: `payload/globals/SiteSettings.ts`

**Step 1: Create payload/globals/SiteSettings.ts**

```typescript
import { GlobalConfig } from 'payload/types';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'businessHours',
      type: 'textarea',
    },
    {
      name: 'serviceArea',
      type: 'textarea',
    },
    {
      name: 'facebookUrl',
      type: 'text',
    },
    {
      name: 'instagramUrl',
      type: 'text',
    },
    {
      name: 'whatsappUrl',
      type: 'text',
    },
  ],
};
```

**Step 2: Commit**

```bash
git add payload/globals/SiteSettings.ts
git commit -m "feat: create SiteSettings global"
```

---

### Task 14: Update Payload config with collections and globals

**Files:**
- Modify: `payload.config.ts`

**Step 1: Update payload.config.ts to include collections and globals**

```typescript
import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import { QuoteRequests } from './payload/collections/QuoteRequests'
import { GalleryItems } from './payload/collections/GalleryItems'
import { Testimonials } from './payload/collections/Testimonials'
import { Services } from './payload/collections/Services'
import { SiteSettings } from './payload/globals/SiteSettings'

export default buildConfig({
  editor: lexicalEditor(),
  collections: [
    QuoteRequests,
    GalleryItems,
    Testimonials,
    Services,
  ],
  globals: [
    SiteSettings,
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  typescript: {
    outputFile: './payload-types.ts',
  },
  localization: {
    locales: ['ro', 'en'],
    defaultLocale: 'ro',
    fallback: true,
  },
})
```

**Step 2: Verify TypeScript syntax**

Run: `npx tsc --noEmit payload.config.ts`
Expected: No errors

**Step 3: Commit**

```bash
git add payload.config.ts
git commit -m "feat: add collections and globals to Payload config"
```

---

## Phase 4: shadcn/ui Components

### Task 15: Install shadcn/ui components

**Files:**
- Modify: `components/` directory (created by shadcn CLI)

**Step 1: Install required shadcn components**

```bash
npx shadcn@latest add button card input textarea select label form badge avatar
npx shadcn@latest add dialog sheet dropdown-menu navigation-menu separator
npx shadcn@latest add accordion carousel toast sonner
```

Expected: All components installed successfully

**Step 2: Verify components directory**

Run: `ls components/ui/`
Expected: All component files exist

**Step 3: Commit**

```bash
git add components/
git commit -m "feat: install shadcn/ui components"
```

---

## Phase 5: Create Payload Admin Routes

### Task 16: Create Payload admin route

**Files:**
- Create: `app/(payload)/[locale]/admin/page.tsx`

**Step 1: Create Payload admin page**

```typescript
import { admin } from '@payloadcms/next/app'

export default admin
```

**Step 2: Commit**

```bash
git add app/\(payload\)/
git commit -m "feat: create Payload admin route"
```

---

## Phase 6: Frontend Layout & Shared Components

### Task 17: Create locale layout

**Files:**
- Create: `app/[locale]/layout.tsx`

**Step 1: Create app/[locale]/layout.tsx**

```typescript
import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from '@/i18n'
import { getMessages } from 'next-intl/server'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add app/\[locale\]/layout.tsx
git commit -m "feat: create locale layout with Header and Footer"
```

---

### Task 18: Create Header component

**Files:**
- Create: `components/Header.tsx`

**Step 1: Create components/Header.tsx**

```typescript
'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Menu, X, Phone } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Header() {
  const t = useTranslations('nav')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'services', href: '/servicii' },
    { key: 'portfolio', href: '/portofoliu' },
    { key: 'about', href: '/despre' },
    { key: 'contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">PowerWash Iași</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {t(item.key as any)}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Phone */}
            <a
              href="tel:+40700000000"
              className="hidden sm:flex items-center space-x-2 text-primary font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>07XX XXX XXX</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary transition-colors py-2"
                >
                  {t(item.key as any)}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
```

**Step 2: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: create Header component"
```

---

### Task 19: Create Footer component

**Files:**
- Create: `components/Footer.tsx`

**Step 1: Create components/Footer.tsx**

```typescript
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const t = useTranslations('nav')

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="font-bold text-xl">PowerWash Iași</span>
            </div>
            <p className="text-gray-400 text-sm">
              Servicii profesionale de curățare cu presiune în Iași și împrejurimi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Link-uri</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">{t('home')}</Link></li>
              <li><Link href="/servicii" className="hover:text-white transition-colors">{t('services')}</Link></li>
              <li><Link href="/portofoliu" className="hover:text-white transition-colors">{t('portfolio')}</Link></li>
              <li><Link href="/despre" className="hover:text-white transition-colors">{t('about')}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>07XX XXX XXX</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@powerwash.ro</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Iași, România</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} PowerWash Iași. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  )
}
```

**Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: create Footer component"
```

---

### Task 20: Create Hero component

**Files:**
- Create: `components/Hero.tsx`

**Step 1: Create components/Hero.tsx**

```typescript
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('headline')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            {t('subheadline')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/solicita-oferta">
              <Button size="lg" className="text-lg px-8 py-6">
                {t('cta')}
              </Button>
            </Link>
            <a
              href="tel:+40700000000"
              className="flex items-center space-x-2 text-primary font-semibold"
            >
              <Phone className="w-5 h-5" />
              <span>{t('phoneLabel')} 07XX XXX XXX</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: create Hero component"
```

---

### Task 21: Create ServiceCard component

**Files:**
- Create: `components/ServiceCard.tsx`

**Step 1: Create components/ServiceCard.tsx**

```typescript
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  priceRange: string
  icon: string
  slug: string
}

export function ServiceCard({ title, description, priceRange, icon, slug }: ServiceCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
          <span className="text-3xl">{icon}</span>
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">De la {priceRange} RON/m²</span>
          <Link href={`/servicii#${slug}`}>
            <Button variant="ghost" size="sm">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
```

**Step 2: Commit**

```bash
git add components/ServiceCard.tsx
git commit -m "feat: create ServiceCard component"
```

---

### Task 22: Create TestimonialCard component

**Files:**
- Create: `components/TestimonialCard.tsx`

**Step 1: Create components/TestimonialCard.tsx**

```typescript
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface TestimonialCardProps {
  name: string
  rating: number
  review: string
  service?: string
}

export function TestimonialCard({ name, rating, review, service }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-gray-700 mb-4">"{review}"</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="font-semibold">{name}</span>
          {service && <span>{service}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
```

**Step 2: Commit**

```bash
git add components/TestimonialCard.tsx
git commit -m "feat: create TestimonialCard component"
```

---

## Phase 7: Create Pages

### Task 23: Create landing page

**Files:**
- Create: `app/[locale]/page.tsx`

**Step 1: Create app/[locale]/page.tsx**

```typescript
import { Hero } from '@/components/Hero'
import { ServiceCard } from '@/components/ServiceCard'
import { TestimonialCard } from '@/components/TestimonialCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Check, Clock, Shield, Sparkles } from 'lucide-react'

export default function HomePage() {
  const t = useTranslations()

  const services = [
    { title: 'Curățare Alei', description: 'Spălare aleei din beton sau pietriș pentru a elimina murdăria, algele și petele.', priceRange: '5-10', icon: '🛣️', slug: 'alei' },
    { title: 'Curățare Pereți', description: 'Curățare profesională a fațadelor și pereților exteriori.', priceRange: '8-15', icon: '🏠', slug: 'pereti' },
    { title: 'Curățare Terasă', description: 'Spălare teraselor și balcoanelor pentru un aspect curat.', priceRange: '6-12', icon: '🏢', slug: 'terase' },
    { title: 'Curățare Garduri', description: 'Curățare gardurilor din orice material.', priceRange: '4-8', icon: '🚧', slug: 'garduri' },
  ]

  const benefits = [
    { icon: Shield, title: 'Echipament Profesionist', description: 'Utilizăm echipamente de ultimă generație pentru rezultate optime.' },
    { icon: Clock, title: 'Rapiditate', description: 'Completăm lucrările în timp util, fără a vă perturba programul.' },
    { icon: Sparkles, title: 'Rezultate Garantate', description: 'Suntem mulțumiți doar când sunteți mulțumiți de rezultat.' },
    { icon: Check, title: 'Preț Corect', description: 'Tarife transparente fără costuri ascunse.' },
  ]

  const steps = [
    { number: '1', title: 'Contactați-ne', description: 'Trimiteți o cerere de ofertă sau ne apelați.' },
    { number: '2', title: 'Evaluare', description: 'Evaluăm lucrarea și vă trimitem o ofertă.' },
    { number: '3', title: 'Execuție', description: 'Programăm și executăm lucrarea profesional.' },
  ]

  const testimonials = [
    { name: 'Maria Ionescu', rating: 5, review: 'Serviciu excelent! Aleea mea arată ca nouă.', service: 'Curățare Alei' },
    { name: 'Petru Popescu', rating: 5, review: 'Profesionali și rapizi. Recomand cu încredere!', service: 'Curățare Terasă' },
    { name: 'Ana Dumitrescu', rating: 5, review: 'Preț bun și rezultate superioare. Mulțumesc!', service: 'Curățare Pereți' },
  ]

  return (
    <div>
      <Hero />

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Serviciile Noastre</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Oferim servicii complete de curățare cu presiune pentru orice nevoie.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/servicii">
              <Button variant="outline">Vezi Toate Serviciile</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">De Ce Noi?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cum Funcționează</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{step.number}</span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce Spun Clienții</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Gata să vă curățați spațiul exterior?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Solicitați o ofertă gratuită astăzi și vă vom contacta în maximum 24 de ore.
          </p>
          <Link href="/solicita-oferta">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Solicită o Ofertă
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add app/\[locale\]/page.tsx
git commit -m "feat: create landing page"
```

---

### Task 24: Create services page

**Files:**
- Create: `app/[locale]/servicii/page.tsx`

**Step 1: Create app/[locale]/servicii/page.tsx**

```typescript
import { ServiceCard } from '@/components/ServiceCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const services = [
  {
    id: 'alei',
    title: 'Curățare Alei',
    icon: '🛣️',
    description: 'Spălare aleei din beton sau pietriș pentru a elimina murdăria, algele și petele.',
    priceRange: '5-10',
    details: 'Curățarea aleilor este esențială pentru menținerea aspectului estetic și pentru prevenirea deteriorării. Utilizăm echipamente de înaltă presiune pentru a elimina complet murdăria, uleiurile, algele și lichenii.',
    faq: [
      { q: 'Cât durează curățarea unei alei?', a: 'În funcție de suprafață, între 1-3 ore.' },
      { q: 'Aveți nevoie de acces la apă?', a: 'Da, avem nevoie de acces la o sursă de apă.' },
    ]
  },
  {
    id: 'pereti',
    title: 'Curățare Pereți',
    icon: '🏠',
    description: 'Curățare profesională a fațadelor și pereților exteriori.',
    priceRange: '8-15',
    details: 'Curățarea pereților exteriori și fațadelor restituie strălucirea clădirii dumneavoastră. Îndepărtăm murdăria, praful, algele și vopseaua veche.',
    faq: [
      { q: 'Curățați și clădirile cu mai multe etaje?', a: 'Da, avem echipamente care ajung până la 3 etaje.' },
      { q: 'Este sigur pentru vopsea?', a: 'Da, ajustăm presiunea în funcție de suprafață.' },
    ]
  },
  {
    id: 'terase',
    title: 'Curățare Terasă',
    icon: '🏢',
    description: 'Spălare teraselor și balcoanelor pentru un aspect curat.',
    priceRange: '6-12',
    details: 'Terasele și balcoanele acumulează rapid murdărie și alge. Le curățăm pentru a fi sigure și estetice.',
    faq: [
      { q: 'Puteți curăța și mobilierul de grădină?', a: 'Da, putem curăța și mobilierul exterior.' },
      { q: 'Trebuie să mutăm plantele?', a: 'Preferabil să le mutăm sau le putem acoperi.' },
    ]
  },
  {
    id: 'garduri',
    title: 'Curățare Garduri',
    icon: '🚧',
    description: 'Curățare gardurilor din orice material.',
    priceRange: '4-8',
    details: 'Gardurile își pierd aspectul odată cu timpul. Le curățăm pentru a arăta ca noi.',
    faq: [
      { q: 'Curățați și gardurile din lemn?', a: 'Da, curățăm garduri din orice material.' },
      { q: 'Cât durează curățarea unui gard?', a: 'Depinde de lungime, dar de obicei 2-4 ore.' },
    ]
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Serviciile Noastre</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferim servicii complete de curățare cu presiune pentru orice nevoie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                priceRange={service.priceRange}
                icon={service.icon}
                slug={service.id}
              />
            ))}
          </div>

          {/* Services Detail */}
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-3xl font-bold text-center mb-8">Detalii Servicii</h2>
            {services.map((service) => (
              <div key={service.id} id={service.id} className="scroll-mt-20">
                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                  <div className="flex items-start space-x-4 mb-4">
                    <span className="text-4xl">{service.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.details}</p>
                      <p className="text-sm text-gray-500 mt-2">Preț: {service.priceRange} RON/m²</p>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="mt-6">
                    {service.faq.map((item, index) => (
                      <AccordionItem key={index} value={`faq-${service.id}-${index}`}>
                        <AccordionTrigger>{item.q}</AccordionTrigger>
                        <AccordionContent>{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/solicita-oferta">
              <Button size="lg" className="text-lg px-8 py-6">
                Solicită o Ofertă
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add app/\[locale\]/servicii/page.tsx
git commit -m "feat: create services page"
```

---

### Task 25: Create quote request page with form

**Files:**
- Create: `app/[locale]/solicita-oferta/page.tsx`
- Create: `components/QuoteForm.tsx`

**Step 1: Create QuoteForm component**

```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { Upload, Send, CheckCircle } from 'lucide-react'

const quoteSchema = z.object({
  fullName: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  phone: z.string().regex(/^(07[0-9]{8}|\+407[0-9]{8})$/, 'Număr de telefon invalid'),
  email: z.string().email('Email invalid'),
  address: z.string().min(5, 'Adresa este obligatorie'),
  serviceType: z.enum(['alei', 'pereti', 'terase', 'garduri', 'acoperis', 'comercial', 'altele']),
  surfaceArea: z.string().optional(),
  surfaceType: z.enum(['beton', 'piatra', 'caramida', 'lemn', 'nu-stiu']).optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.enum(['dimineata', 'pranz', 'dupa-amiaza', 'oricand']).optional(),
  urgency: z.enum(['normal', 'urgent']).optional(),
  notes: z.string().optional(),
})

type QuoteFormData = z.infer<typeof quoteSchema>

export function QuoteForm() {
  const t = useTranslations()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  })

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        alert('A apărut o eroare. Vă rugăm încercați din nou.')
      }
    } catch (error) {
      alert('A apărut o eroare. Vă rugăm încercați din nou.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Cerere Trimisă!</h2>
          <p className="text-gray-600 mb-6">Vă vom contacta în maximum 24 de ore cu o ofertă.</p>
          <Button onClick={() => window.location.href = '/'} variant="outline">
            Înapoi la Pagina Principală
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Solicită o Ofertă Gratuită</CardTitle>
        <CardDescription>Completați formularul și vă vom contacta în 24 de ore.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Informații Personale</h3>
            <div>
              <Label htmlFor="fullName">Nume Complet *</Label>
              <Input id="fullName" {...register('fullName')} />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefon *</Label>
                <Input id="phone" {...register('phone')} placeholder="07XX XXX XXX" />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="address">Adresă / Locație *</Label>
              <Input id="address" {...register('address')} />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-4">
            <h3 className="font-semibold">Detalii Serviciu</h3>
            <div>
              <Label htmlFor="serviceType">Tip Serviciu *</Label>
              <Select onValueChange={(value) => setValue('serviceType', value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selectați serviciul" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alei">Curățare Alei</SelectItem>
                  <SelectItem value="pereti">Curățare Pereți</SelectItem>
                  <SelectItem value="terase">Curățare Terasă</SelectItem>
                  <SelectItem value="garduri">Curățare Garduri</SelectItem>
                  <SelectItem value="acoperis">Curățare Acoperiș</SelectItem>
                  <SelectItem value="comercial">Spațiu Comercial</SelectItem>
                  <SelectItem value="altele">Altceva</SelectItem>
                </SelectContent>
              </Select>
              {errors.serviceType && <p className="text-red-500 text-sm">{errors.serviceType.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="surfaceArea">Suprafață (m²)</Label>
                <Input id="surfaceArea" type="number" {...register('surfaceArea')} />
              </div>
              <div>
                <Label htmlFor="surfaceType">Tip Suprafață</Label>
                <Select onValueChange={(value) => setValue('surfaceType', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectați" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beton">Beton</SelectItem>
                    <SelectItem value="piatra">Piatră</SelectItem>
                    <SelectItem value="caramida">Cărămidă</SelectItem>
                    <SelectItem value="lemn">Lemn</SelectItem>
                    <SelectItem value="nu-stiu">Nu știu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="preferredDate">Data Preferată</Label>
                <Input id="preferredDate" type="date" {...register('preferredDate')} />
              </div>
              <div>
                <Label htmlFor="preferredTime">Ora Preferată</Label>
                <Select onValueChange={(value) => setValue('preferredTime', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectați" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dimineata">Dimineața</SelectItem>
                    <SelectItem value="pranz">Prânz</SelectItem>
                    <SelectItem value="dupa-amiaza">După-amiaza</SelectItem>
                    <SelectItem value="oricand">Oricând</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="urgency">Urgență</Label>
                <Select onValueChange={(value) => setValue('urgency', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectați" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Alte Detalii</Label>
            <Textarea id="notes" {...register('notes')} rows={4} />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Se trimite...' : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Trimite Cererea
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

**Step 2: Create quote request page**

```typescript
import { QuoteForm } from '@/components/QuoteForm'

export default function QuoteRequestPage() {
  return (
    <div className="min-h-screen py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Solicită o Ofertă</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Completați formularul de mai jos și vă vom contacta în maximum 24 de ore cu o ofertă personalizată.
          </p>
        </div>
        <QuoteForm />
      </div>
    </div>
  )
}
```

**Step 3: Commit**

```bash
git add components/QuoteForm.tsx app/\[locale\]/solicita-oferta/
git commit -m "feat: create quote request page with form"
```

---

### Task 26: Create portfolio page

**Files:**
- Create: `app/[locale]/portofoliu/page.tsx`

**Step 1: Create app/[locale]/portofoliu/page.tsx**

```typescript
'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TestimonialCard } from '@/components/TestimonialCard'

const galleryItems = [
  { id: 1, category: 'alei', title: 'Curățare Alee Beton', location: 'Iași, Copou' },
  { id: 2, category: 'pereti', title: 'Curățare Fațadă', location: 'Iași, Centru' },
  { id: 3, category: 'terase', title: 'Curățare Terasă', location: 'Iași, Alexandru' },
  { id: 4, category: 'alei', title: 'Spălare Alee Pietriș', location: 'Iași, Dacia' },
  { id: 5, category: 'comercial', title: 'Spălătorie Exterior', location: 'Iași, Industriilor' },
  { id: 6, category: 'terase', title: 'Curățare Balcon', location: 'Iași, Bucium' },
]

const testimonials = [
  { name: 'Maria Ionescu', rating: 5, review: 'Serviciu excelent! Aleea mea arată ca nouă.', service: 'Curățare Alei' },
  { name: 'Petru Popescu', rating: 5, review: 'Profesionali și rapizi. Recomand cu încredere!', service: 'Curățare Terasă' },
]

const categories = ['toate', 'alei', 'pereti', 'terase', 'comercial']

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('toate')

  const filteredItems = selectedCategory === 'toate'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Portofoliu</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vedeți rezultatele muncii noastre. Transformăm spațiile exterioare cu servicii profesionale.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-gray-200 relative">
                  <div className="absolute inset-0 bg-primary/50 flex items-center justify-center text-white">
                    <span className="text-6xl">{item.category === 'alei' ? '🛣️' : item.category === 'pereti' ? '🏠' : item.category === 'terase' ? '🏢' : '🏭'}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50 -mx-4 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Ce Spun Clienții</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="text-lg px-8 py-6">
            Solicită o Ofertă
          </Button>
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add app/\[locale\]/portofoliu/page.tsx
git commit -m "feat: create portfolio page"
```

---

### Task 27: Create about page

**Files:**
- Create: `app/[locale]/despre/page.tsx`

**Step 1: Create app/[locale]/despre/page.tsx**

```typescript
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Clock, Sparkles, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    { icon: Shield, title: 'Calitate', description: 'Folosim doar echipamente și produse de calitate superioară.' },
    { icon: Clock, title: 'Punctualitate', description: 'Suntem întotdeauna la timp și respectăm programările.' },
    { icon: Sparkles, title: 'Profesionalism', description: 'Echipa noastră este instruită și experimentată.' },
    { icon: Check, title: 'Transparență', description: 'Prețuri clare, fără costuri ascunse.' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Despre Noi</h1>
            <p className="text-lg md:text-xl text-gray-600">
              Suntem o echipă dedicată oferirii de servicii profesionale de curățare cu presiune în Iași și împrejurimi.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Povestea Noastră</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                PowerWash Iași a luat naștere din pasiunea pentru transformarea spațiilor exterioare. Am început ca o mică afacere de familie și am crescut datorită recomandărilor clienților mulțumiți.
              </p>
              <p className="text-gray-700 mb-6">
                De-a lungul anilor, am investit în echipamente de ultimă generație și am continuat să ne perfecționăm tehnicile de curățare. Astăzi, suntem mândri să fim una dintre cele mai apreciate companii de powerwashing din regiune.
              </p>
              <p className="text-gray-700">
                Misiunea noastră este simplă: să oferim servicii de calitate la prețuri corecte, astfel încât fiecare client să fie complet mulțumit de rezultat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Valorile Noastre</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Echipamentul Nostru</h2>
            <div className="aspect-video bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
              <span className="text-6xl">🔧</span>
            </div>
            <p className="text-gray-700 mb-6">
              Utilizăm echipamente de înaltă presiune profesionale de la producători de top. Astfel ne asigurăm că rezultatele sunt întotdeauna la cel mai înalt standard.
            </p>
            <p className="text-gray-700">
              Echipamentele noastre sunt potrivite pentru orice tip de suprafață: beton, piatră, cărămidă, lemn și multe altele.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Doriți să aflați mai multe?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Contactați-ne astăzi pentru o discuție despre nevoile dumneavoastră.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Contactați-ne
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add app/\[locale\]/despre/page.tsx
git commit -m "feat: create about page"
```

---

### Task 28: Create contact page

**Files:**
- Create: `app/[locale]/contact/page.tsx`

**Step 1: Create app/[locale]/contact/page.tsx**

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSuccess(true)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aveți întrebări sau doriți o ofertă? Contactați-ne prin orice metodă preferată.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Informații de Contact</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <a href="tel:+40700000000" className="text-gray-600 hover:text-primary">
                      07XX XXX XXX
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:contact@powerwash.ro" className="text-gray-600 hover:text-primary">
                      contact@powerwash.ro
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adresă</h3>
                    <p className="text-gray-600">Iași, România</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Program</h3>
                    <p className="text-gray-600">Luni - Vineri: 8:00 - 18:00</p>
                    <p className="text-gray-600">Sâmbătă: 9:00 - 14:00</p>
                    <p className="text-gray-600">Duminică: Închis</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <Card>
              <CardContent className="pt-6">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Hartă - Iași, România</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            {isSuccess ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <h2 className="text-2xl font-bold mb-2">Mesaj Trimis!</h2>
                  <p className="text-gray-600">Vă vom contacta în curând.</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Trimiteți un Mesaj</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nume *</Label>
                      <Input id="name" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subiect *</Label>
                      <Input id="subject" required />
                    </div>
                    <div>
                      <Label htmlFor="message">Mesaj *</Label>
                      <Textarea id="message" rows={6} required />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Se trimite...' : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Trimite
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add app/\[locale\]/contact/page.tsx
git commit -m "feat: create contact page"
```

---

## Phase 8: API Routes & Email

### Task 29: Create quote request API route

**Files:**
- Create: `app/api/quote-request/route.ts`

**Step 1: Create API route**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Validate required fields
    if (!data.fullName || !data.phone || !data.email || !data.address || !data.serviceType) {
      return NextResponse.json(
        { error: 'Campurile obligatorii lipsesc' },
        { status: 400 }
      )
    }

    // In production: Save to Payload CMS
    // const payload = await getPayloadClient()
    // await payload.create({
    //   collection: 'quote-requests',
    //   data,
    // })

    // Send email notification to admin
    await resend.emails.send({
      from: 'PowerWash Iași <onboarding@resend.dev>',
      to: 'admin@example.com', // Replace with actual admin email
      subject: 'Nouă Cerere de Ofertă - PowerWash Iași',
      html: `
        <h1>Nouă Cerere de Ofertă</h1>
        <p><strong>Nume:</strong> ${data.fullName}</p>
        <p><strong>Telefon:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Adresă:</strong> ${data.address}</p>
        <p><strong>Tip Serviciu:</strong> ${data.serviceType}</p>
        ${data.surfaceArea ? `<p><strong>Suprafață:</strong> ${data.surfaceArea} m²</p>` : ''}
        ${data.surfaceType ? `<p><strong>Tip Suprafață:</strong> ${data.surfaceType}</p>` : ''}
        ${data.preferredDate ? `<p><strong>Data Preferată:</strong> ${data.preferredDate}</p>` : ''}
        ${data.preferredTime ? `<p><strong>Ora Preferată:</strong> ${data.preferredTime}</p>` : ''}
        ${data.urgency ? `<p><strong>Urgență:</strong> ${data.urgency}</p>` : ''}
        ${data.notes ? `<p><strong>Alte Detalii:</strong> ${data.notes}</p>` : ''}
      `,
    })

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'PowerWash Iași <onboarding@resend.dev>',
      to: data.email,
      subject: 'Cererea Dumneavoastră a fost primită - PowerWash Iași',
      html: `
        <h1>Salutare ${data.fullName},</h1>
        <p>Vă mulțumim pentru cererea de ofertă!</p>
        <p>Am primit următoarele informații:</p>
        <ul>
          <li><strong>Serviciu:</strong> ${data.serviceType}</li>
          ${data.surfaceArea ? `<li><strong>Suprafață:</strong> ${data.surfaceArea} m²</li>` : ''}
          ${data.preferredDate ? `<li><strong>Data Preferată:</strong> ${data.preferredDate}</li>` : ''}
        </ul>
        <p>Vă vom contacta în maximum 24 de ore cu o ofertă personalizată.</p>
        <p>Dacă aveți întrebări urgente, ne puteți apela la: 07XX XXX XXX</p>
        <p>Cu drag,<br>Echipa PowerWash Iași</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing quote request:', error)
    return NextResponse.json(
      { error: 'A apărut o eroare la procesarea cererii' },
      { status: 500 }
    )
  }
}
```

**Step 2: Commit**

```bash
git add app/api/quote-request/
git commit -m "feat: create quote request API route with email notifications"
```

---

## Phase 9: Final Setup & Verification

### Task 30: Generate PAYLOAD_SECRET and update .env.local

**Files:**
- Modify: `.env.local`

**Step 1: Generate secret**

```bash
openssl rand -base64 32
```

Expected: Random 32-character string

**Step 2: Update .env.local with generated secret**

Replace `PAYLOAD_SECRET=generate-secret-later` with the actual generated value

**Step 3: Verify .env.local**

Run: `cat .env.local | grep PAYLOAD_SECRET`
Expected: Secret is set (not placeholder)

**Step 4: Note: Do NOT commit .env.local**

Run: `git status`
Expected: `.env.local` not in staging area

---

### Task 31: Verify project setup by running dev server

**Files:**
- No files created/modified (verification step)

**Step 1: Start dev server**

```bash
pnpm dev
```

Expected: Server starts at http://localhost:3000

**Step 2: Verify no build errors**

Run: Look at terminal output
Expected: "Ready in Xms", no compilation errors

**Step 3: Test homepage in browser**

Run: Navigate to http://localhost:3000
Expected: Landing page loads with all components

**Step 4: Test language toggle**

Run: Navigate to http://localhost:3000/en
Expected: English version of homepage loads

---

### Task 32: Test all pages manually

**Files:**
- No files created/modified (verification step)

**Step 1: Test navigation to all pages**

Navigate to:
- http://localhost:3000/
- http://localhost:3000/servicii
- http://localhost:3000/solicita-oferta
- http://localhost:3000/portofoliu
- http://localhost:3000/despre
- http://localhost:3000/contact

Expected: All pages load without errors

**Step 2: Test mobile responsiveness**

Run: Use browser devtools device toolbar, test on mobile viewports
Expected: Layout adapts properly, hamburger menu works

**Step 3: Test quote form submission**

Run: Fill out quote form and submit
Expected: Form submits (may fail email if Resend not configured), shows success message

---

### Task 33: Create final commit

**Files:**
- No specific files (final project commit)

**Step 1: Check git status**

```bash
git status
```

Expected: Only `.env.local` shows as untracked (correct - it should be gitignored)

**Step 2: Final project commit**

```bash
git log --oneline
```

Expected: All commits are present, showing implementation progress

---

## Phase 10: Deployment Preparation

### Task 34: Create Vercel deployment config

**Files:**
- Create: `vercel.json`

**Step 1: Create vercel.json**

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

**Step 2: Commit**

```bash
git add vercel.json
git commit -m "chore: add Vercel deployment config"
```

---

### Task 35: Create deployment checklist

**Files:**
- Create: `docs/DEPLOYMENT.md`

**Step 1: Create deployment checklist**

```markdown
# Deployment Checklist

## Before Deployment

- [ ] Update `.env.local` values
- [ ] Generate secure `PAYLOAD_SECRET`
- [ ] Set up MongoDB Atlas database
- [ ] Get Resend API key
- [ ] Update admin email in API route
- [ ] Test all pages locally
- [ ] Test quote form submission
- [ ] Test email sending (with Resend)

## Vercel Setup

1. Connect GitHub repository to Vercel
2. Set environment variables:
   - `DATABASE_URL` - MongoDB connection string
   - `PAYLOAD_SECRET` - Generated secret
   - `RESEND_API_KEY` - Resend API key
   - `NEXT_PUBLIC_SITE_URL` - Production URL

3. Deploy and verify:
   - [ ] Homepage loads
   - [ ] All pages accessible
   - [ ] Admin panel accessible at `/admin`
   - [ ] Quote form submits successfully
   - [ ] Emails are sent
   - [ ] Language toggle works

## Post-Deployment

- [ ] Create first admin user
- [ ] Add initial services
- [ ] Add gallery items
- [ ] Add testimonials
- [ ] Configure site settings
```

**Step 2: Commit**

```bash
git add docs/DEPLOYMENT.md
git commit -m "docs: add deployment checklist"
```

---

## Summary

This implementation plan includes:
- **35 tasks** organized in 10 phases
- **Bite-sized steps** (2-5 minutes each)
- **Exact file paths** for all creations/modifications
- **Complete code** for all files
- **Verification steps** after key phases
- **Frequent commits** for progress tracking

Total estimated implementation time: 2-3 hours following the plan step-by-step.
