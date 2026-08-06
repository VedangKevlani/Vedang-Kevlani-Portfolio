import type { Project } from '../data/content'
import { useViewport } from '../lib/useViewport'

export const TAG_COLOR: Record<string, string> = {
  'Hackathon Win': '#D4A853',
  'Hackathon':     '#52B788',
  'Award':         '#D4A853',
  'Venture':       '#4AA0D8',
  'Capstone':      '#C8B89A',
  'Client':        '#2A6EA8',
}

export function ProjectChapter({ project }: { project: Project }) {
  const { isMobile } = useViewport()
  return (
    <div style={{ maxWidth: '42rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: isMobile ? '0.85rem' : '1.25rem' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.72rem' : '0.85rem',
          color: 'rgba(245,239,227,0.55)', letterSpacing: '0.08em',
        }}>{project.year}</span>
        <span style={{ width: '1.25rem', height: '1px', background: 'rgba(245,239,227,0.25)' }} />
        <span style={{
          fontFamily: 'var(--font-label)', fontSize: isMobile ? '0.65rem' : '0.75rem', fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: TAG_COLOR[project.tag] || '#D4A853',
          border: `1px solid ${TAG_COLOR[project.tag] || '#D4A853'}66`,
          background: 'rgba(0,0,0,0.35)',
          padding: isMobile ? '0.28rem 0.6rem' : '0.32rem 0.75rem', borderRadius: '999px',
          whiteSpace: 'nowrap',
        }}>{project.tag}</span>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: isMobile ? 'clamp(1.75rem, 10vw, 2.75rem)' : 'clamp(2.5rem, 4.8vw, 4.25rem)',
        color: '#F5EFE3',
        letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '0.6rem',
        textShadow: '0 2px 24px rgba(0,0,0,0.5)',
      }}>{project.title}</h3>

      <div style={{
        fontFamily: 'var(--font-label)', fontSize: isMobile ? '0.9rem' : '1.1rem', fontWeight: 400,
        color: '#C9BFAD', letterSpacing: '0.01em', marginBottom: isMobile ? '1rem' : '1.5rem',
      }}>{project.subtitle}</div>

      <div style={{
        fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 500,
        fontSize: isMobile ? 'clamp(1.05rem, 4.5vw, 1.3rem)' : 'clamp(1.25rem, 1.8vw, 1.55rem)', color: '#F5EFE3',
        lineHeight: 1.45, maxWidth: '34rem', marginBottom: isMobile ? '1rem' : '1.25rem',
        borderLeft: '2px solid #D4A853', paddingLeft: isMobile ? '0.9rem' : '1.2rem',
      }}>&ldquo;{project.hook}&rdquo;</div>

      <p style={{
        fontFamily: 'var(--font-label)', fontWeight: 300, fontSize: isMobile ? '0.9rem' : '1.05rem',
        color: 'rgba(245,239,227,0.78)', lineHeight: 1.65, maxWidth: '32rem', marginBottom: isMobile ? '1.15rem' : '1.6rem',
      }}>{project.description}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: isMobile ? '0.75rem 1rem' : '1.25rem' }}>
        <span style={{
          fontFamily: 'var(--font-label)', fontSize: isMobile ? '0.75rem' : '0.85rem', fontWeight: 500,
          color: '#D4A853', letterSpacing: '0.02em',
        }}>{project.award}</span>
        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(245,239,227,0.3)' }} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: isMobile ? '0.68rem' : '0.78rem',
          color: 'rgba(245,239,227,0.5)', letterSpacing: '0.02em',
        }}>{project.stack}</span>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: 'var(--font-label)', fontSize: isMobile ? '0.72rem' : '0.8rem',
              fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#D4A853', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            }}
          >
            View Live ↗
          </a>
        )}
      </div>
    </div>
  )
}
