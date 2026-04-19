import Link from 'next/link';

import { pageGutter } from '@/lib/responsive';

export default function NotFoundPage() {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: `0 ${pageGutter}`, width: '100%' }}>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '28px', padding: '2rem', boxShadow: '0 18px 48px rgba(15,23,42,0.06)' }}>
          <p style={{ margin: '0 0 0.65rem', color: '#6366f1', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            404
          </p>
          <h1 style={{ margin: '0 0 0.9rem', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.08 }}>
            The page you asked for is not here.
          </h1>
          <p style={{ margin: '0 0 1.25rem', color: '#475569', lineHeight: 1.85 }}>
            Try the homepage, the product lineup, the pricing page, or the Sixsmith Games facts page for the most current details.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            <Link href="/" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>Home</Link>
            <Link href="/tools" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>Products</Link>
            <Link href="/pricing" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>Pricing</Link>
            <Link href="/about/facts" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>Facts</Link>
            <Link href="/support" style={{ color: '#1d4ed8', fontWeight: 800, textDecoration: 'none' }}>Support</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
