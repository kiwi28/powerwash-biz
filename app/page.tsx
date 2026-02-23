import { redirect } from 'next/navigation';

// Redirect root to default locale (Romanian)
export default function RootPage() {
  redirect('/ro');
}
