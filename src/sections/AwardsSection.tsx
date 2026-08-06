import type { awards } from '../data/content'
import { useViewport } from '../lib/useViewport'

export function AwardChapter({ award, accent }: { award: (typeof awards)[number]; accent: string }) {
  const { isMobile } = useViewport()
  return (
    <div style={{ maxWidth: '40rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: isMobile ? '1rem' : '1.5rem' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.78rem' : '0.9rem',
          color: 'rgba(245,239,227,0.55)', letterSpacing: '0.1em',
        }}>
          {award.year}
        </span>
        {award.project && (
          <>
            <span style={{ width: '1.25rem', height: '1px', background: 'rgba(245,239,227,0.25)' }} />
            <span style={{
              fontFamily: 'var(--font-label)', fontSize: isMobile ? '0.65rem' : '0.75rem', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: accent,
            }}>
              {award.project}
            </span>
          </>
        )}
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: isMobile ? 'clamp(1.55rem, 7.5vw, 2.35rem)' : 'clamp(2.25rem, 4.4vw, 3.75rem)', color: '#F5EFE3',
        letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1rem',
        textShadow: '0 2px 24px rgba(0,0,0,0.5)',
      }}>
        {award.title}
      </h3>

      <div style={{
        fontFamily: 'var(--font-label)', fontSize: isMobile ? '0.9rem' : '1.1rem', fontWeight: 400,
        color: '#C9BFAD', letterSpacing: '0.01em', marginBottom: award.note ? (isMobile ? '1rem' : '1.5rem') : 0,
      }}>
        {award.body}
      </div>

      {award.note && (
        <div style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500,
          fontSize: isMobile ? 'clamp(1rem, 4vw, 1.2rem)' : 'clamp(1.15rem, 1.6vw, 1.35rem)', color: 'rgba(245,239,227,0.8)',
          lineHeight: 1.5, maxWidth: '30rem',
          borderLeft: `2px solid ${accent}`, paddingLeft: isMobile ? '0.9rem' : '1.15rem',
        }}>
          {award.note}
        </div>
      )}
    </div>
  )
}
