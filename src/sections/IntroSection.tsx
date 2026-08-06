import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function IntroContent() {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const subRef  = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    if (nameRef.current) {
      tl.fromTo(nameRef.current,
        { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power4.out' }, 0
      )
    }
    if (subRef.current) {
      const spans = subRef.current.querySelectorAll('span')
      tl.fromTo(spans,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }, 0.9
      )
    }
    if (metaRef.current) {
      tl.fromTo(metaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }, 1.5
      )
    }
    if (lineRef.current) {
      tl.fromTo(lineRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 1.65
      )
    }
  }, [])

  return (
    <div style={{ maxWidth: '60rem' }}>
      {/* Eyebrow */}
      <div ref={metaRef} style={{
        fontFamily: 'var(--font-label)', fontSize: '0.85rem',
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: '#D4A853', marginBottom: '1.5rem', opacity: 0, fontWeight: 500,
      }}>
        A Portfolio in Six Acts
      </div>

      {/* Name */}
      <h1 ref={nameRef} style={{
        fontFamily: 'var(--font-display)', fontWeight: 300,
        fontSize: 'clamp(3.5rem, 7.5vw, 7rem)', lineHeight: 0.92,
        color: '#F5EFE3', letterSpacing: '-0.03em', marginBottom: '2rem',
        textShadow: '0 2px 24px rgba(0,0,0,0.5)',
      }}>
        Vedang<br />
        <em style={{ color: '#C9BFAD', fontStyle: 'italic' }}>Kevlani</em>
      </h1>

      {/* Disciplines */}
      <div ref={subRef} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {['Computer Scientist', 'Builder', 'Educator'].map((d, i) => (
          <span key={d} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {i > 0 && <span style={{ width: '1.25rem', height: '1px', background: 'rgba(245,239,227,0.25)', display: 'inline-block' }} />}
            <span style={{
              fontFamily: 'var(--font-label)', fontSize: '0.9rem',
              letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500,
              color: i === 0 ? '#F5EFE3' : 'rgba(245,239,227,0.55)',
            }}>
              {d}
            </span>
          </span>
        ))}
      </div>

      {/* Fragment */}
      <div ref={lineRef} style={{
        marginTop: '1.75rem', fontFamily: 'var(--font-display)', fontStyle: 'italic',
        fontSize: '1.2rem', color: '#C9BFAD', letterSpacing: '0.005em',
        lineHeight: 1.55, maxWidth: '30rem', opacity: 0,
      }}>
        Built to be used —<br />
        not just admired.
      </div>

      {/* Credential */}
      <div style={{
        marginTop: '2.5rem', fontFamily: 'var(--font-label)', fontSize: '0.8rem',
        letterSpacing: '0.06em', color: 'rgba(245,239,227,0.48)', lineHeight: 1.9,
      }}>
        B.Sc. Computer Science · Minor in Economics<br />
        University of the West Indies, Mona · First Class Honours · 2025
      </div>
    </div>
  )
}
