import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import Card from './Card'

export default function QualityScore({ scores }) {
  const data = [
    { metric: '⚔️ Coverage', value: scores?.coverage ?? 0 },
    { metric: '🔮 Edge Cases', value: scores?.edge_cases ?? 0 },
    { metric: '🛡️ Security', value: scores?.security ?? 0 },
    { metric: '📖 Readability', value: scores?.readability ?? 0 },
  ]

  const overall = scores?.overall ?? 0
  const rankColor = overall >= 90 ? 'var(--neon-green)' : overall >= 70 ? 'var(--neon-cyan)' : overall >= 50 ? 'var(--neon-purple)' : 'var(--neon-pink)'
  const rankLabel = overall >= 90 ? 'S' : overall >= 70 ? 'A' : overall >= 50 ? 'B' : overall > 0 ? 'C' : '—'

  return (
    <Card
      title="📊 Character Stats"
      subtitle="Your test suite power levels across four combat attributes."
      right={
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm" style={{ background: 'var(--panel)' }}>
            Overall <span className="font-bold" style={{ color: rankColor, textShadow: `0 0 8px ${rankColor}` }}>{scores?.overall ?? '—'}</span>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black"
               style={{ background: `${rankColor}22`, border: `1px solid ${rankColor}44`, color: rankColor, textShadow: `0 0 8px ${rankColor}` }}>
            {rankLabel}
          </div>
        </div>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)]">
        <div className="h-[260px] min-w-0 rounded-2xl border border-[var(--border)] p-3" style={{ background: 'rgba(10,10,10,0.5)' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="rgba(6, 182, 212, 0.12)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                dataKey="value"
                stroke="#06b6d4"
                fill="rgba(6, 182, 212, 0.2)"
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-[var(--border)] p-4" style={{ background: 'rgba(10,10,10,0.5)' }}>
          <div className="text-sm font-semibold text-[var(--neon-cyan)]" style={{ textShadow: '0 0 6px rgba(6,182,212,0.3)' }}>
            🧙 Sage Advice
          </div>
          <ul className="mt-3 space-y-3 text-sm leading-6 text-[var(--muted)]">
            {(scores?.suggestions || ['Generate tests to receive wisdom from the QA Oracle.'])
              .slice(0, 4)
              .map((s, i) => (
                <li key={i} className="rounded-xl border border-[var(--border)] px-3 py-3" style={{ background: 'rgba(6,182,212,0.04)' }}>
                  {s}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
