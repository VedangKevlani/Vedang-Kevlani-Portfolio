import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Props { label: string; compact?: boolean }

export default function SceneLabel({ label, compact = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const prev = useRef('')

  useEffect(() => {
    if (!ref.current || label === prev.current) return
    prev.current = label
    gsap.fromTo(ref.current,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    )
  }, [label])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        bottom: compact ? '1rem' : '1.75rem',
        left: compact ? '1rem' : '2.25rem',
        zIndex: 1000,
        fontFamily: 'var(--font-label)',
        fontSize: '0.525rem',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: '#2A2A2A',
      }}
    >
      {label}
    </div>
  )
}
