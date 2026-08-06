interface Section { id: string; label: string; scene: string }
interface Props {
  sections: Section[]
  active: number
  onNavigate: (i: number) => void
  accent?: string
  /** Touch devices never hover, so the label text never reveals — skip
   * reserving its width and shrink the offset/gaps to save space. */
  isTouch?: boolean
  compact?: boolean
}

export default function FilmNav({ sections, active, onNavigate, accent = '#D4A853', isTouch = false, compact = false }: Props) {
  return (
    <nav style={{
      position: 'fixed', left: compact ? '0.85rem' : isTouch ? '1.25rem' : '2.25rem', top: '50%',
      transform: 'translateY(-50%)', zIndex: 1000,
      display: 'flex', flexDirection: 'column', gap: compact ? '1rem' : '1.5rem',
    }}>
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => onNavigate(i)}
          aria-label={s.label}
          style={{
            all: 'unset', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}
        >
          <div style={{
            width: i === active ? (compact ? '1.25rem' : '2rem') : '0.625rem',
            height: '1px',
            background: i === active ? accent : '#2A2A2A',
            transition: 'background 0.5s ease, width 0.5s cubic-bezier(0.25,0.1,0.25,1)',
          }} />
          {!isTouch && (
            <span style={{
              fontFamily: 'var(--font-label)',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: i === active ? accent : 'transparent',
              transition: 'color 0.4s ease',
              whiteSpace: 'nowrap',
            }}>
              {s.label}
            </span>
          )}
        </button>
      ))}
    </nav>
  )
}
