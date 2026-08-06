import type { roles } from '../data/content'

export function RoleChapter({ role, accent }: { role: (typeof roles)[number]; accent: string }) {
  return (
    <div style={{ maxWidth: '38rem' }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
        color: 'rgba(245,239,227,0.55)', letterSpacing: '0.1em', marginBottom: '1.5rem',
      }}>
        {role.year}
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 'clamp(2.5rem, 4.8vw, 4.25rem)', color: '#F5EFE3',
        letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '1rem',
        textShadow: '0 2px 24px rgba(0,0,0,0.5)',
      }}>
        {role.title}
      </h3>

      <div style={{
        fontFamily: 'var(--font-label)', fontSize: '1.15rem', fontWeight: 400,
        color: '#C9BFAD', letterSpacing: '0.01em', marginBottom: role.note ? '1.5rem' : 0,
      }}>
        {role.org}
      </div>

      {role.note && (
        <div style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500,
          fontSize: 'clamp(1.15rem, 1.6vw, 1.35rem)', color: 'rgba(245,239,227,0.8)',
          lineHeight: 1.5, maxWidth: '30rem',
          borderLeft: `2px solid ${accent}`, paddingLeft: '1.15rem',
        }}>
          {role.note}
        </div>
      )}
    </div>
  )
}
