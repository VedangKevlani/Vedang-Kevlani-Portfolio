import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NAV, projects, roles, awards } from '../data/content'
import { useViewport } from '../lib/useViewport'
import { IntroContent } from '../sections/IntroSection'
import { ProjectChapter } from '../sections/MoviesSection'
import { RoleChapter } from '../sections/CastingSection'
import { AwardChapter } from '../sections/AwardsSection'
import { StalkingContent } from '../sections/StalkingSection'
import { ContactContent } from '../sections/ContactSection'
import FilmNav from './FilmNav'
import FrameCounter from './FrameCounter'
import SceneLabel from './SceneLabel'

interface SectionDef {
  id: string
  video: string
  accent: string
  actLabel: string
  heading: ReactNode
  chapterLabel: string
  chapters: ReactNode[]
}

const SECTIONS: SectionDef[] = [
  {
    id: 'intro', video: '/videos/scene-intro.mp4', accent: NAV[0].accent,
    actLabel: '', heading: null, chapterLabel: 'SCENE',
    chapters: [<IntroContent key="0" />],
  },
  {
    id: 'movies', video: '/videos/scene-calm.mp4', accent: NAV[1].accent,
    actLabel: '01 — Movies',
    heading: <>Every project tells <em style={{ color: '#C9BFAD', fontStyle: 'italic' }}>a story</em></>,
    chapterLabel: 'PROJECT',
    chapters: projects.map(p => <ProjectChapter key={p.id} project={p} />),
  },
  {
    id: 'casting', video: '/videos/scene-chaos.mp4', accent: NAV[2].accent,
    actLabel: '02 — Casting',
    heading: <>The roles that built <em style={{ color: '#C9BFAD', fontStyle: 'italic' }}>the person who builds</em></>,
    chapterLabel: 'ROLE',
    chapters: roles.map((r, i) => <RoleChapter key={i} role={r} accent={NAV[2].accent} />),
  },
  {
    id: 'awards', video: '/videos/scene-creativity.mp4', accent: NAV[3].accent,
    actLabel: '03 — Awards',
    heading: <>The ones that came <em style={{ color: '#C9BFAD', fontStyle: 'italic' }}>with a verdict</em></>,
    chapterLabel: 'AWARD',
    chapters: awards.map((a, i) => <AwardChapter key={i} award={a} accent={NAV[3].accent} />),
  },
  {
    id: 'stalking', video: '/videos/scene-inspiration.mp4', accent: NAV[4].accent,
    actLabel: '04 — Stalking',
    heading: <>Inspect <em style={{ color: '#C9BFAD', fontStyle: 'italic' }}>the craft</em></>,
    chapterLabel: 'SCENE',
    chapters: [<StalkingContent key="0" accent={NAV[4].accent} />],
  },
  {
    id: 'contact', video: '/videos/scene-creativity.mp4', accent: NAV[5].accent,
    actLabel: '05 — Contact', heading: null,
    chapterLabel: 'SCENE',
    chapters: [<ContactContent key="0" accent={NAV[5].accent} />],
  },
]

interface Slide {
  sectionIndex: number
  chapterIndex: number
  chapterCount: number
  video: string
  accent: string
  actLabel: string
  heading: ReactNode
  chapterLabel: string
  content: ReactNode
  isSectionStart: boolean
  sectionId: string
}

const SLIDES: Slide[] = SECTIONS.flatMap((sec, sectionIndex) =>
  sec.chapters.map((content, chapterIndex) => ({
    sectionIndex,
    chapterIndex,
    chapterCount: sec.chapters.length,
    video: sec.video,
    accent: sec.accent,
    actLabel: sec.actLabel,
    heading: sec.heading,
    chapterLabel: sec.chapterLabel,
    content,
    isSectionStart: chapterIndex === 0,
    sectionId: sec.id,
  }))
)

const SECTION_START_SLIDE = SECTIONS.map((_, i) => SLIDES.findIndex(s => s.sectionIndex === i))
const TRANSITION_MS = 750
const WHEEL_ADVANCE_THRESHOLD = 12

export default function SlideDeck() {
  const { isMobile, isTablet, isTouch } = useViewport()
  const trackRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const activeSlideRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const wheelLockUntil = useRef(0)
  const speedDecayTimer = useRef<number | undefined>(undefined)
  const touchStartY = useRef<number | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const uniqueVideos = useMemo(() => Array.from(new Set(SLIDES.map(s => s.video))), [])
  const videoEls = useRef<Record<string, HTMLVideoElement | null>>({})

  const slide = SLIDES[activeSlide]

  // The clip actually showing. Usually matches the active section's
  // assigned clip, but can drift ahead of it — see the "ended" effect below.
  const [displayVideo, setDisplayVideo] = useState(slide.video)
  const displayVideoRef = useRef(displayVideo)
  useEffect(() => { displayVideoRef.current = displayVideo }, [displayVideo])

  // Section changed — resync to its assigned clip and start it fresh,
  // overriding any drift from a previous section running long.
  useEffect(() => {
    setDisplayVideo(slide.video)
    const v = videoEls.current[slide.video]
    if (v) v.currentTime = 0
  }, [slide.video])

  // Play only the displayed clip; keep the rest paused. Never remounted,
  // so nothing restarts while chapters change over it.
  useEffect(() => {
    uniqueVideos.forEach(src => {
      const v = videoEls.current[src]
      if (!v) return
      if (src === displayVideo) {
        v.playbackRate = 1
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [displayVideo, uniqueVideos])

  // If the displayed clip runs out before the visitor moves to the next
  // section, advance to the next clip in rotation instead of restarting
  // it — a hard loop-back reads as sloppy, this keeps it feeling like one
  // continuous reel. The moment the section actually changes, the effect
  // above resyncs to the correct clip regardless of where this drifted to.
  useEffect(() => {
    const v = videoEls.current[displayVideo]
    if (!v) return
    const onEnded = () => {
      const idx = uniqueVideos.indexOf(displayVideo)
      setDisplayVideo(uniqueVideos[(idx + 1) % uniqueVideos.length])
    }
    v.addEventListener('ended', onEnded)
    return () => v.removeEventListener('ended', onEnded)
  }, [displayVideo, uniqueVideos])

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, idx))
    if (clamped === activeSlideRef.current) return
    const prevSection = SLIDES[activeSlideRef.current].sectionIndex
    isAnimatingRef.current = true
    activeSlideRef.current = clamped
    setActiveSlide(clamped)
    if (SLIDES[clamped].sectionIndex !== prevSection && flashRef.current) {
      flashRef.current.classList.remove('chapter-flash')
      void flashRef.current.offsetWidth
      flashRef.current.classList.add('chapter-flash')
    }
    window.setTimeout(() => { isAnimatingRef.current = false }, TRANSITION_MS)
  }, [])

  // Bumps the displayed clip's playback speed with scroll energy — the
  // film never gets cut short, it just runs faster while you're scrolling hard.
  const boostSpeed = useCallback((deltaY: number) => {
    const v = videoEls.current[displayVideoRef.current]
    if (!v) return
    const rate = Math.min(1 + Math.abs(deltaY) / 90, 3.5)
    v.playbackRate = Math.max(v.playbackRate, rate)
    window.clearTimeout(speedDecayTimer.current)
    speedDecayTimer.current = window.setTimeout(() => {
      const cur = videoEls.current[displayVideoRef.current]
      if (cur) cur.playbackRate = 1
    }, 450)
  }, [])

  // Wheel: every gesture advances exactly one chapter — never a long
  // scroll distance to cover, and it works identically in both directions.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      boostSpeed(e.deltaY)
      const now = performance.now()
      if (isAnimatingRef.current || now < wheelLockUntil.current) return
      if (Math.abs(e.deltaY) < WHEEL_ADVANCE_THRESHOLD) return
      wheelLockUntil.current = now + TRANSITION_MS
      goTo(activeSlideRef.current + (e.deltaY > 0 ? 1 : -1))
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [boostSpeed, goTo])

  // Touch: swipe up/down advances one chapter, same rule as wheel.
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchStartY.current = e.touches[0]?.clientY ?? null }
    const onEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return
      const endY = e.changedTouches[0]?.clientY ?? touchStartY.current
      const delta = touchStartY.current - endY
      touchStartY.current = null
      if (isAnimatingRef.current || Math.abs(delta) < 40) return
      goTo(activeSlideRef.current + (delta > 0 ? 1 : -1))
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [goTo])

  // Keyboard: arrow / page keys advance one chapter at a time.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        goTo(activeSlideRef.current + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        goTo(activeSlideRef.current - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        goTo(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goTo(SLIDES.length - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo])

  const jumpToSection = useCallback((sectionIdx: number) => {
    goTo(SECTION_START_SLIDE[sectionIdx] ?? 0)
  }, [goTo])

  const hasHeader = Boolean(slide.actLabel || slide.heading)
  const hasRail = slide.chapterCount > 1
  const isLastSlide = activeSlide === SLIDES.length - 1
  const progressPct = (activeSlide / Math.max(1, SLIDES.length - 1)) * 100

  // Desktop leans on vw so the cinematic proportions scale with the window;
  // phones/tablets get fixed rem gutters instead so side chrome (nav rail,
  // chapter rail) always has clearance and content never gets pinched.
  const gutterLeft = isMobile ? '4.75rem' : isTablet ? '6.5rem' : '12vw'
  const gutterRightFor = (railPresent: boolean) => isMobile
    ? (railPresent ? '3rem' : '1.5rem')
    : isTablet
      ? (railPresent ? '6rem' : '4rem')
      : (railPresent ? '11vw' : '8vw')
  const gutterRight = gutterRightFor(hasRail)
  const barPadding = isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2.25rem'
  const barFontSize = isMobile ? '0.6rem' : '0.75rem'
  const headerTop = isMobile ? 'calc(4.5vh + 1.25rem)' : isTablet ? 'calc(4.5vh + 2rem)' : 'calc(4.5vh + 2.75rem)'

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%', background: '#000', overflow: 'hidden' }}>
      {/* Video layers — one persistent element per clip, pinned to the viewport. */}
      {uniqueVideos.map(src => (
        <video
          key={src}
          ref={el => { videoEls.current[src] = el }}
          className="reel-video"
          src={src}
          muted
          playsInline
          preload="auto"
          style={{
            position: 'fixed', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 0,
            opacity: src === displayVideo ? 1 : 0,
            transition: 'opacity 0.7s ease',
          }}
        />
      ))}
      <div className="video-overlay" />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.1) 38%, transparent 58%)',
      }} />

      {/* Cut flash between scenes */}
      <div ref={flashRef} style={{ position: 'fixed', inset: 0, zIndex: 6, background: '#000', opacity: 0, pointerEvents: 'none' }} />

      {/* Letterbox bars */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '4.5vh',
        background: '#0A0A08', zIndex: 4, borderBottom: `1px solid ${slide.accent}33`,
        transition: 'border-color 0.6s ease',
      }} />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '4.5vh',
        background: '#0A0A08', zIndex: 4, borderTop: `1px solid ${slide.accent}33`,
        transition: 'border-color 0.6s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: barPadding,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: barFontSize, letterSpacing: '0.12em', color: 'rgba(245,239,227,0.55)', whiteSpace: 'nowrap' }}>
          {slide.chapterLabel} <span style={{ color: slide.accent, transition: 'color 0.6s ease' }}>{String(slide.chapterIndex + 1).padStart(2, '0')}</span>
          {' '}/ {String(slide.chapterCount).padStart(2, '0')}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: barFontSize, letterSpacing: '0.12em', color: 'rgba(245,239,227,0.55)', whiteSpace: 'nowrap' }}>
          {String(activeSlide + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </span>
      </div>

      {/* Overall progress line */}
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: '4.5vh', height: '2px', background: 'rgba(255,255,255,0.1)', zIndex: 4 }}>
        <div style={{ height: '100%', width: `${progressPct}%`, background: slide.accent, transition: 'width 0.5s ease, background 0.6s ease' }} />
      </div>

      {/* Persistent per-section header */}
      {hasHeader && (
        <div style={{
          position: 'fixed', top: headerTop, left: gutterLeft, zIndex: 3,
          maxWidth: `calc(100vw - ${gutterLeft} - ${gutterRight})`,
        }}>
          {slide.actLabel && (
            <div style={{
              fontFamily: 'var(--font-label)', fontSize: isMobile ? '0.68rem' : '0.85rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: slide.accent, marginBottom: '0.6rem', fontWeight: 600,
              transition: 'color 0.6s ease',
            }}>
              {slide.actLabel}
            </div>
          )}
          {slide.heading && (
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: isMobile ? 'clamp(1.05rem, 5.5vw, 1.4rem)' : 'clamp(1.5rem, 2.3vw, 2.1rem)',
              lineHeight: 1.2,
              color: '#F5EFE3', letterSpacing: '-0.02em',
              textShadow: '0 2px 16px rgba(0,0,0,0.5)',
            }}>
              {slide.heading}
            </h2>
          )}
        </div>
      )}

      {/* End of the reel — offer a way back to the top */}
      {isLastSlide && (
        <button
          onClick={() => goTo(0)}
          style={{
            all: 'unset', cursor: 'pointer',
            position: 'fixed', right: isMobile ? '1.5rem' : isTablet ? '4rem' : '12vw',
            bottom: isMobile ? 'calc(4.5vh + 2rem)' : 'calc(4.5vh + 3rem)', zIndex: 3,
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            fontFamily: 'var(--font-label)', fontSize: isMobile ? '0.68rem' : '0.78rem', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap',
            color: slide.accent, border: `1px solid ${slide.accent}66`,
            padding: isMobile ? '0.6rem 0.9rem' : '0.7rem 1.15rem', borderRadius: '999px',
            background: 'rgba(0,0,0,0.35)', transition: 'background 0.25s ease, border-color 0.25s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.55)'
            e.currentTarget.style.borderColor = slide.accent
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(0,0,0,0.35)'
            e.currentTarget.style.borderColor = `${slide.accent}66`
          }}
        >
          <span style={{ fontSize: '1rem', lineHeight: 1 }}>↺</span>
          Watch it again
        </button>
      )}

      {/* Chapter rail — click to jump within the active section */}
      {hasRail && (
        <div style={{
          position: 'fixed', right: isMobile ? '1rem' : isTablet ? '1.5rem' : '2.75rem', top: '50%',
          transform: 'translateY(-50%)', zIndex: 3,
          display: 'flex', flexDirection: 'column',
          gap: slide.chapterCount > 6 ? '0.65rem' : '1.05rem', alignItems: 'flex-end',
        }}>
          {Array.from({ length: slide.chapterCount }, (_, i) => (
            <button
              key={i}
              onClick={() => goTo(SECTION_START_SLIDE[slide.sectionIndex] + i)}
              aria-label={`${slide.chapterLabel} ${i + 1}`}
              style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
            >
              {!isTouch && (
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.08em',
                  color: i === slide.chapterIndex ? slide.accent : 'transparent',
                  transition: 'color 0.4s ease', whiteSpace: 'nowrap',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              )}
              <div style={{
                width: '1px', height: i === slide.chapterIndex ? '1.5rem' : '0.7rem',
                background: i === slide.chapterIndex ? slide.accent : 'rgba(245,239,227,0.3)',
                transition: 'all 0.5s cubic-bezier(0.25,0.1,0.25,1)',
              }} />
            </button>
          ))}
        </div>
      )}

      {/* Global chrome */}
      <FilmNav sections={NAV} active={slide.sectionIndex} onNavigate={jumpToSection} accent={slide.accent} isTouch={isTouch} compact={isMobile} />
      <FrameCounter current={slide.sectionIndex + 1} total={NAV.length} accent={slide.accent} compact={isMobile} />
      <SceneLabel label={NAV[slide.sectionIndex]?.scene ?? ''} compact={isMobile} />

      {/* Slide track — fully JS-driven so one gesture = one chapter, in
          either direction. Position is a transform, not native scroll. */}
      <div style={{ position: 'relative', zIndex: 2, height: '100vh', overflow: 'hidden' }}>
        <div
          ref={trackRef}
          style={{
            height: `${SLIDES.length * 100}vh`,
            transform: `translateY(-${activeSlide * 100}vh)`,
            transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
          }}
        >
          {SLIDES.map((s, i) => {
            // The Stalking chapter stacks into a single tall column on
            // touch layouts (stats + radar + tools no longer fit side by
            // side) — tall enough to reach the fixed header if centered
            // like every other slide, so it anchors to the top instead.
            const isTallOnTouch = isTouch && s.sectionId === 'stalking'
            return (
              <section
                key={i}
                id={s.isSectionStart ? s.sectionId : undefined}
                className="slide"
                style={isTallOnTouch ? { alignItems: 'flex-start' } : undefined}
              >
                <div style={{
                  width: '100%', maxWidth: '100%',
                  paddingLeft: gutterLeft,
                  paddingRight: gutterRightFor(s.chapterCount > 1),
                  paddingTop: isTallOnTouch ? (isMobile ? 'calc(4.5vh + 6.75rem)' : 'calc(4.5vh + 7rem)') : undefined,
                  opacity: i === activeSlide ? 1 : 0,
                  transform: i === activeSlide ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
                }}>
                  {s.content}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
