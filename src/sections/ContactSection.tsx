import { contact } from '../data/content'
import { useViewport } from '../lib/useViewport'

const links = [
  { label: 'Email',      value: contact.email,     href: `mailto:${contact.email}` },
  { label: 'GitHub',     value: contact.github,    href: `https://${contact.github}` },
  { label: 'LinkedIn',   value: contact.linkedin,  href: `https://${contact.linkedin}` },
  { label: 'CTRL Learn', value: contact.ctrllearn, href: `https://${contact.ctrllearn}` },
]

export function ContactContent({ accent }: { accent: string }) {
  const { isMobile } = useViewport()
  return (
    <div style={{ maxWidth: '46rem' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 300,
        fontSize: isMobile ? 'clamp(2rem, 12vw, 3.25rem)' : 'clamp(2.75rem, 5.2vw, 4.75rem)', color: '#F5EFE3',
        letterSpacing: '-0.03em', lineHeight: 1.02, marginBottom: isMobile ? '1rem' : '1.4rem',
        textShadow: '0 2px 24px rgba(0,0,0,0.5)',
      }}>
        You&apos;ve seen<br />
        <em style={{ color: '#C9BFAD', fontStyle: 'italic' }}>the mind.</em>
      </h2>

      <p style={{
        fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: isMobile ? '1rem' : '1.25rem', color: '#C9BFAD', lineHeight: 1.5,
        marginBottom: isMobile ? '1.75rem' : '2.5rem', maxWidth: '28rem',
      }}>
        Now let&apos;s build something together.
      </p>

      <div>
        {links.map(l => (
          <a
            key={l.label}
            href={l.href}
            target={l.label !== 'Email' ? '_blank' : undefined}
            rel="noreferrer"
            style={{
              display: isMobile ? 'flex' : 'grid',
              flexDirection: isMobile ? 'column' : undefined,
              gap: isMobile ? '0.3rem' : '2rem',
              gridTemplateColumns: isMobile ? undefined : '6.5rem 1fr',
              alignItems: isMobile ? 'flex-start' : 'center', padding: isMobile ? '0.7rem 0' : '0.85rem 0',
              borderBottom: '1px solid rgba(255,255,255,0.14)',
              textDecoration: 'none', color: 'inherit', minWidth: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderBottomColor = accent }}
            onMouseLeave={e => { e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.14)' }}
          >
            <span style={{
              fontFamily: 'var(--font-label)', fontSize: isMobile ? '0.62rem' : '0.68rem', fontWeight: 500,
              color: 'rgba(245,239,227,0.55)', letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>
              {l.label}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-label)', fontSize: isMobile ? '0.85rem' : '0.95rem',
                color: '#F5EFE3', letterSpacing: '0.02em', transition: 'color 0.25s ease',
                overflowWrap: 'anywhere', minWidth: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = accent }}
              onMouseLeave={e => { e.currentTarget.style.color = '#F5EFE3' }}
            >
              {l.value}
            </span>
          </a>
        ))}
      </div>

      <div style={{
        marginTop: isMobile ? '1.5rem' : '2.25rem', fontFamily: 'var(--font-label)', fontSize: isMobile ? '0.6rem' : '0.68rem',
        color: 'rgba(245,239,227,0.4)', letterSpacing: '0.1em',
      }}>
        Vedang Kevlani · Kingston, Jamaica · {new Date().getFullYear()}
      </div>
    </div>
  )
}
