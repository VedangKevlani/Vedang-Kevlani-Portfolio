import type { awards } from '../data/content'

export function AwardChapter({ award, accent }: { award: (typeof awards)[number]; accent: string }) {
  return (
    <div style={{ maxWidth: '40rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
          color: 'rgba(245,239,227,0.55)', letterSpacing: '0.1em',
        }}>
          {award.year}
        </span>
        {award.project && (
          <>
            <span style={{ width: '1.25rem', height: '1px', background: 'rgba(245,239,227,0.25)' }} />
            <span style={{
              fontFamily: 'var(--font-label)', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: accent,
            }}>
              {award.project}
            </span>
          </>
        )}
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 'clamp(2.25rem, 4.4vw, 3.75rem)', color: '#F5EFE3',
        letterSpacing: '-0.025em', lineHeight: 1.08, marginBottom: '1rem',
        textShadow: '0 2px 24px rgba(0,0,0,0.5)',
      }}>
        {award.title}
      </h3>

      <div style={{
        fontFamily: 'var(--font-label)', fontSize: '1.1rem', fontWeight: 400,
        color: '#C9BFAD', letterSpacing: '0.01em', marginBottom: award.note ? '1.5rem' : 0,
      }}>
        {award.body}
      </div>

      {award.note && (
        <div style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500,
          fontSize: 'clamp(1.15rem, 1.6vw, 1.35rem)', color: 'rgba(245,239,227,0.8)',
          lineHeight: 1.5, maxWidth: '30rem',
          borderLeft: `2px solid ${accent}`, paddingLeft: '1.15rem',
        }}>
          {award.note}
        </div>
      )}
    </div>
  )
}
