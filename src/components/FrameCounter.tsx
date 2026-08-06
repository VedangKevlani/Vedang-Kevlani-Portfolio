interface Props { current: number; total: number; accent?: string; compact?: boolean }

export default function FrameCounter({ current, total, accent = '#D4A853', compact = false }: Props) {
  const pad = (n: number) => String(n).padStart(3, '0')
  return (
    <div style={{
      position: 'fixed', top: compact ? '1rem' : '1.75rem', right: compact ? '1rem' : '2.25rem',
      zIndex: 1000,
      fontFamily: 'var(--font-mono)',
      fontSize: '0.575rem',
      letterSpacing: '0.22em',
      display: 'flex', alignItems: 'center', gap: '0.4rem',
    }}>
      <span style={{ color: accent, transition: 'color 0.6s ease' }}>{pad(current)}</span>
      <span style={{ color: '#2A2A2A' }}>/</span>
      <span style={{ color: '#2A2A2A' }}>{pad(total)}</span>
    </div>
  )
}
