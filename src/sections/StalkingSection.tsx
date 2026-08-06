import { skills } from '../data/content'
import { hexToRgb } from '../lib/color'

function RadarChart({ accent }: { accent: string }) {
  const cx = 170, cy = 170, r = 120
  const n = skills.radar.length
  const step = (Math.PI * 2) / n

  const pt = (i: number, v: number) => ({
    x: cx + r * v * Math.sin(i * step),
    y: cy - r * v * Math.cos(i * step),
  })

  const dataPath = skills.radar
    .map((s, i) => `${i === 0 ? 'M' : 'L'} ${pt(i, s.value).x} ${pt(i, s.value).y}`)
    .join(' ') + ' Z'

  return (
    <svg viewBox="0 0 340 340" width="300" height="300">
      {[0.25, 0.5, 0.75, 1].map((ring, ri) => {
        const path = skills.radar
          .map((_, i) => `${i === 0 ? 'M' : 'L'} ${pt(i, ring).x} ${pt(i, ring).y}`)
          .join(' ') + ' Z'
        return <path key={ri} d={path} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      })}

      {skills.radar.map((_, i) => {
        const end = pt(i, 1)
        return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      })}

      <path d={dataPath} fill={accent} fillOpacity={0.12} stroke={accent} strokeWidth={1.5} />

      {skills.radar.map((s, i) => {
        const p = pt(i, s.value)
        return <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={accent} />
      })}

      {skills.radar.map((s, i) => {
        const p = pt(i, 1.32)
        return (
          <text key={i} x={p.x} y={p.y}
            textAnchor="middle" dominantBaseline="middle"
            fill="#D8D0C2" fontSize="13"
            fontFamily="DM Sans, sans-serif" letterSpacing="0.06em"
          >
            {s.axis}
          </text>
        )
      })}
    </svg>
  )
}

export function StalkingContent({ accent }: { accent: string }) {
  const [r, g, b] = hexToRgb(accent)

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '3.25rem' }}>
      {/* Stats */}
      <div style={{ flex: '1 1 19rem', minWidth: '17rem', maxWidth: '25rem' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px',
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {skills.stats.map((s, i) => (
            <div key={i} style={{ background: 'rgba(8,8,7,0.6)', padding: '1.1rem 1.25rem' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '2.15rem', fontWeight: 700,
                color: accent, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '0.4rem',
                textShadow: '0 2px 16px rgba(0,0,0,0.5)',
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-label)', fontSize: '0.78rem', fontWeight: 500,
                color: '#C9BFAD', letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar */}
      <div style={{ flex: '0 0 auto', margin: '0 auto' }}>
        <RadarChart accent={accent} />
      </div>

      {/* Tools */}
      <div style={{ flex: '1 1 15rem', minWidth: '14rem', maxWidth: '21rem' }}>
        <div style={{
          fontFamily: 'var(--font-label)', fontSize: '0.82rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#C9BFAD', marginBottom: '1.2rem', fontWeight: 500,
        }}>
          Tools · by projects shipped
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
          {skills.tools.map(t => {
            const op = Math.min(0.55 + t.count * 0.08, 1)
            const fs = Math.min(0.8 + t.count * 0.03, 0.98)
            return (
              <div key={t.name} style={{
                fontFamily: 'var(--font-label)', fontSize: `${fs}rem`, fontWeight: 500,
                color: `rgba(${r},${g},${b},${op})`, letterSpacing: '0.03em',
                padding: '0.45rem 0.85rem', border: `1px solid rgba(${r},${g},${b},${op * 0.6})`,
                whiteSpace: 'nowrap',
              }}>
                {t.name}
                <span style={{ color: 'rgba(245,239,227,0.5)', marginLeft: '0.4rem', fontSize: '0.75rem' }}>×{t.count}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
