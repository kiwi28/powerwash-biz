import { RootPage } from '@payloadcms/next/views'
import config from '@payload-config'

export default async function AdminPage() {
  return <RootPage
    config={Promise.resolve(config)}
    importMap={{}}
    params={Promise.resolve({ segments: [] })}
    searchParams={Promise.resolve({})}
  />
}
