import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import path from 'path'

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
  collections: [],
  globals: [],
  secret: process.env.PAYLOAD_SECRET!,
})
