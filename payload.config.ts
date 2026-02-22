import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import path from 'path'
import { QuoteRequests } from './payload/collections/QuoteRequests'
import { GalleryItems } from './payload/collections/GalleryItems'
import { Testimonials } from './payload/collections/Testimonials'
import { Services } from './payload/collections/Services'
import { SiteSettings } from './payload/globals/SiteSettings'

export default buildConfig({
  editor: lexicalEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URL!,
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(__dirname, './payload-types.ts'),
  },
  localization: {
    locales: ['ro', 'en'],
    defaultLocale: 'ro',
    fallback: true,
  },
  collections: [QuoteRequests, GalleryItems, Testimonials, Services],
  globals: [SiteSettings],
  secret: process.env.PAYLOAD_SECRET!,
})
