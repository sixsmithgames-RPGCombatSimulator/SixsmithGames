type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

interface LegalDocumentProps {
  eyebrow: string;
  title: string;
  summary: string;
  effectiveDate: string;
  notice?: string;
  sections: LegalSection[];
}

const pageStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #eef4ff 0%, #ffffff 22%, #f8fafc 100%)',
  minHeight: '100vh',
};

const heroStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 52%, #0ea5e9 100%)',
  color: '#ffffff',
  padding: '5.5rem 2rem 4rem',
};

const contentWrapStyle: React.CSSProperties = {
  maxWidth: '980px',
  margin: '0 auto',
  padding: '0 2rem 4rem',
};

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '24px',
  border: '1px solid rgba(15, 23, 42, 0.08)',
  boxShadow: '0 24px 80px rgba(15, 23, 42, 0.08)',
  marginTop: '-2rem',
  overflow: 'hidden',
};

const sectionStyle: React.CSSProperties = {
  padding: '1.75rem 2rem',
  borderTop: '1px solid #e5e7eb',
};

export default function LegalDocument({
  eyebrow,
  title,
  summary,
  effectiveDate,
  notice,
  sections,
}: LegalDocumentProps) {
  return (
    <main style={pageStyle}>
      <section style={heroStyle}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <p style={{
            margin: '0 0 0.9rem',
            color: 'rgba(255,255,255,0.72)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.8rem',
            fontWeight: 800,
          }}>
            {eyebrow}
          </p>
          <h1 style={{
            margin: '0 0 1rem',
            fontSize: 'clamp(2.25rem, 6vw, 3.8rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            maxWidth: '12ch',
          }}>
            {title}
          </h1>
          <p style={{
            margin: 0,
            maxWidth: '52rem',
            fontSize: '1.08rem',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.9)',
          }}>
            {summary}
          </p>
        </div>
      </section>

      <div style={contentWrapStyle}>
        <div style={cardStyle}>
          <div style={{ padding: '2rem', background: '#f8fafc' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.45rem 0.85rem',
                borderRadius: '999px',
                background: '#dbeafe',
                color: '#1d4ed8',
                fontSize: '0.82rem',
                fontWeight: 800,
              }}>
                Effective {effectiveDate}
              </span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.45rem 0.85rem',
                borderRadius: '999px',
                background: '#e2e8f0',
                color: '#334155',
                fontSize: '0.82rem',
                fontWeight: 700,
              }}>
                Current version
              </span>
            </div>
            {notice && (
              <div style={{
                marginTop: '1.25rem',
                padding: '1rem 1.1rem',
                borderRadius: '16px',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                color: '#1e3a8a',
                fontSize: '0.96rem',
                lineHeight: 1.7,
              }}>
                {notice}
              </div>
            )}
          </div>

          {sections.map((section) => (
            <section key={section.title} style={sectionStyle}>
              <h2 style={{
                margin: '0 0 0.9rem',
                fontSize: '1.3rem',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.02em',
              }}>
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  style={{
                    margin: '0 0 0.9rem',
                    color: '#334155',
                    fontSize: '0.98rem',
                    lineHeight: 1.8,
                  }}
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul style={{ margin: '0.35rem 0 0', paddingLeft: '1.25rem', color: '#334155' }}>
                  {section.bullets.map((bullet) => (
                    <li key={bullet} style={{ marginBottom: '0.65rem', lineHeight: 1.75 }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
