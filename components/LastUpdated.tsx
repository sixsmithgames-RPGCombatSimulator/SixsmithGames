interface LastUpdatedProps {
  date: string;
  tone?: 'light' | 'dark';
}

export default function LastUpdated({ date, tone = 'light' }: LastUpdatedProps) {
  const palette =
    tone === 'dark'
      ? {
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.16)',
          color: 'rgba(255,255,255,0.88)',
        }
      : {
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          color: '#334155',
        };

  return (
    <p
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        margin: 0,
        padding: '0.45rem 0.8rem',
        borderRadius: '999px',
        fontSize: '0.85rem',
        fontWeight: 700,
        ...palette,
      }}
    >
      <span>Last updated:</span>
      <span>{date}</span>
    </p>
  );
}
