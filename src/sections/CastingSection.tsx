import type { roles } from '../data/content'
import { useViewport } from '../lib/useViewport'

export function RoleChapter({ role, accent }: { role: (typeof roles)[number]; accent: string }) {
  const { isMobile } = useViewport()
  return (
    <div style={{ maxWidth: '38rem' }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.78rem' : '0.9rem',
        color: 'rgba(245,239,227,0.55)', letterSpacing: '0.1em', marginBottom: isMobile ? '1rem' : '1.5rem',
      }}>
        {role.year}
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: isMobile ? 'clamp(1.65rem, 8.5vw, 2.5rem)' : 'clamp(2.5rem, 4.8vw, 4.25rem)', color: '#F5EFE3',
        letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '1rem',
        textShadow: '0 2px 24px rgba(0,0,0,0.5)',
      }}>
        {role.title}
      </h3>

      <div style={{
        fontFamily: 'var(--font-label)', fontSize: isMobile ? '0.95rem' : '1.15rem', fontWeight: 400,
        color: '#C9BFAD', letterSpacing: '0.01em', marginBottom: role.note ? (isMobile ? '1rem' : '1.5rem') : 0,
      }}>
        {role.org}
      </div>

      {role.note && (
        <div style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500,
          fontSize: isMobile ? 'clamp(1rem, 4vw, 1.2rem)' : 'clamp(1.15rem, 1.6vw, 1.35rem)', color: 'rgba(245,239,227,0.8)',
          lineHeight: 1.5, maxWidth: '30rem',
          borderLeft: `2px solid ${accent}`, paddingLeft: isMobile ? '0.9rem' : '1.15rem',
        }}>
          {role.note}
        </div>
      )}
    </div>
  )
}
