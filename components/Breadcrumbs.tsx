import Link from 'next/link';

export interface BreadcrumbLink {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbLink[];
  tone?: 'light' | 'dark';
}

export default function Breadcrumbs({ items, tone = 'light' }: BreadcrumbsProps) {
  const color = tone === 'dark' ? 'rgba(255,255,255,0.86)' : '#475569';
  const separator = tone === 'dark' ? 'rgba(255,255,255,0.45)' : '#94a3b8';

  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '1rem' }}>
      <ol
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.45rem',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          fontSize: '0.9rem',
        }}
      >
        {items.map((item, index) => (
          <li key={item.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
            {index > 0 ? <span style={{ color: separator }}>/</span> : null}
            <Link href={item.href} style={{ color, textDecoration: 'none', fontWeight: 600 }}>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
