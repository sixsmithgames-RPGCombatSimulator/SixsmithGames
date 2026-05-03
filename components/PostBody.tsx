import Link from 'next/link';

export function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);
    const italicMatch = remaining.match(/\*(?!\*)(.+?)\*(?!\*)/);

    const candidates: { index: number; length: number; node: React.ReactNode }[] = [];

    if (boldMatch && boldMatch.index !== undefined) {
      candidates.push({
        index: boldMatch.index,
        length: boldMatch[0].length,
        node: (
          <strong key={`b${key++}`} style={{ color: '#111827' }}>
            {boldMatch[1]}
          </strong>
        ),
      });
    }

    if (linkMatch && linkMatch.index !== undefined) {
      candidates.push({
        index: linkMatch.index,
        length: linkMatch[0].length,
        node: (
          <Link
            key={`l${key++}`}
            href={linkMatch[2]}
            style={{ color: '#6366f1', fontWeight: '600', textDecoration: 'underline', textUnderlineOffset: '2px' }}
          >
            {linkMatch[1]}
          </Link>
        ),
      });
    }

    if (italicMatch && italicMatch.index !== undefined) {
      candidates.push({
        index: italicMatch.index,
        length: italicMatch[0].length,
        node: (
          <em key={`i${key++}`} style={{ fontStyle: 'italic' }}>
            {italicMatch[1]}
          </em>
        ),
      });
    }

    candidates.sort((a, b) => a.index - b.index);
    const firstMatch = candidates[0] ?? null;

    if (firstMatch) {
      if (firstMatch.index > 0) {
        parts.push(remaining.slice(0, firstMatch.index));
      }
      parts.push(firstMatch.node);
      remaining = remaining.slice(firstMatch.index + firstMatch.length);
    } else {
      parts.push(remaining);
      break;
    }
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export default function PostBody({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('#### ')) {
      elements.push(
        <h4
          key={key++}
          style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827', margin: '1.75rem 0 0.75rem', lineHeight: 1.3 }}
        >
          {renderInline(line.slice(5))}
        </h4>,
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={key++}
          style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', margin: '2rem 0 0.75rem', lineHeight: 1.3 }}
        >
          {renderInline(line.slice(4))}
        </h3>,
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', margin: '2.5rem 0 1rem', lineHeight: 1.3 }}
        >
          {renderInline(line.slice(3))}
        </h2>,
      );
    } else if (line.startsWith('# ')) {
      elements.push(
        <h2
          key={key++}
          style={{ fontSize: '1.75rem', fontWeight: '900', color: '#111827', margin: '2.5rem 0 1rem', lineHeight: 1.2 }}
        >
          {renderInline(line.slice(2))}
        </h2>,
      );
    } else if (line.startsWith('---')) {
      elements.push(<hr key={key++} style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '2.5rem 0' }} />);
    } else if (line.startsWith('- **')) {
      const match = line.match(/^- \*\*(.+?)\*\*\s*(.*)$/);
      if (match) {
        elements.push(
          <li key={key++} style={{ marginBottom: '0.5rem', color: '#374151', lineHeight: 1.7, fontSize: '1.0625rem' }}>
            <strong style={{ color: '#111827' }}>{match[1]}</strong> {match[2]}
          </li>,
        );
      } else {
        elements.push(
          <li key={key++} style={{ marginBottom: '0.5rem', color: '#374151', lineHeight: 1.7, fontSize: '1.0625rem' }}>
            {renderInline(line.slice(2))}
          </li>,
        );
      }
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} style={{ marginBottom: '0.5rem', color: '#374151', lineHeight: 1.7, fontSize: '1.0625rem' }}>
          {renderInline(line.slice(2))}
        </li>,
      );
    } else if (line.match(/^\*\s+\*\*/)) {
      const match = line.match(/^\*\s+\*\*(.+?)\*\*\s*(.*)$/);
      if (match) {
        elements.push(
          <li key={key++} style={{ marginBottom: '0.5rem', color: '#374151', lineHeight: 1.7, fontSize: '1.0625rem' }}>
            <strong style={{ color: '#111827' }}>{match[1]}</strong>{match[2] ? ` ${match[2]}` : ''}
          </li>,
        );
      } else {
        elements.push(
          <li key={key++} style={{ marginBottom: '0.5rem', color: '#374151', lineHeight: 1.7, fontSize: '1.0625rem' }}>
            {renderInline(line.replace(/^\*\s+/, ''))}
          </li>,
        );
      }
    } else if (line.match(/^\*\s+/)) {
      elements.push(
        <li key={key++} style={{ marginBottom: '0.5rem', color: '#374151', lineHeight: 1.7, fontSize: '1.0625rem' }}>
          {renderInline(line.replace(/^\*\s+/, ''))}
        </li>,
      );
    } else if (line.match(/^\d+\.\s+\*\*/)) {
      const match = line.match(/^\d+\.\s+\*\*(.+?)\*\*\s*(.*)$/);
      if (match) {
        elements.push(
          <li
            key={key++}
            style={{ marginBottom: '0.5rem', color: '#374151', lineHeight: 1.7, fontSize: '1.0625rem', listStyleType: 'decimal' }}
          >
            <strong style={{ color: '#111827' }}>{match[1]}</strong> {renderInline(match[2])}
          </li>,
        );
      } else {
        const text = line.replace(/^\d+\.\s*/, '');
        elements.push(
          <li
            key={key++}
            style={{ marginBottom: '0.5rem', color: '#374151', lineHeight: 1.7, fontSize: '1.0625rem', listStyleType: 'decimal' }}
          >
            {renderInline(text)}
          </li>,
        );
      }
    } else if (line.match(/^\d+\. /)) {
      const text = line.replace(/^\d+\.\s*/, '');
      elements.push(
        <li
          key={key++}
          style={{ marginBottom: '0.5rem', color: '#374151', lineHeight: 1.7, fontSize: '1.0625rem', listStyleType: 'decimal' }}
        >
          {renderInline(text)}
        </li>,
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key++} style={{ height: '0.5rem' }} />);
    } else {
      elements.push(
        <p key={key++} style={{ color: '#374151', fontSize: '1.0625rem', lineHeight: 1.8, margin: '0 0 1rem' }}>
          {renderInline(line)}
        </p>,
      );
    }
  }

  return <>{elements}</>;
}
