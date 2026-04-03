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
    { metric: 'Coverage', value: scores?.coverage ?? 0 },
    { metric: 'Edge Cases', value: scores?.edge_cases ?? 0 },
    { metric: 'Security', value: scores?.security ?? 0 },
    { metric: 'Readability', value: scores?.readability ?? 0 },
  ]

  const overall = scores?.overall ?? 0
  const rankColor = overall >= 90 ? 'var(--neon-green)' : overall >= 70 ? 'var(--neon-cyan)' : overall >= 50 ? 'var(--neon-purple)' : 'var(--neon-pink)'
  const rankLabel = overall >= 90 ? 'S' : overall >= 70 ? 'A' : overall >= 50 ? 'B' : overall > 0 ? 'C' : '—'

  return (
    <Card
      title="Quality Summary"
      subtitle="Review the generated suite with a clear breakdown of core quality signals."
      right={
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-[var(--border)] px-3 py-2 text-sm" style={{ background: 'var(--panel)' }}>
            Overall <span className="font-bold" style={{ color: rankColor }}>{scores?.overall ?? '—'}</span>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black"
               style={{ background: `${rankColor}22`, border: `1px solid ${rankColor}44`, color: rankColor }}>
            {rankLabel}
          </div>
        </div>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)]">
        <div className="h-[260px] min-w-0 rounded-[1.4rem] border border-[var(--border)] p-3" style={{ background: 'rgba(255,255,255,0.78)' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="rgba(22, 99, 214, 0.1)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#62748b', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                dataKey="value"
                stroke="#1663d6"
                fill="rgba(22, 99, 214, 0.16)"
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-[1.4rem] border border-[var(--border)] p-4" style={{ background: 'rgba(255,255,255,0.78)' }}>
          <div className="text-sm font-semibold text-[var(--accent)]">
            Recommendations
          </div>
          <ul className="mt-3 space-y-3 text-sm leading-6 text-[var(--muted)]">
            {(scores?.suggestions || ['Generate tests first and this page will turn the output into practical review notes.'])
              .slice(0, 4)
              .map((s, i) => (
                <li key={i} className="rounded-2xl border border-[var(--border)] px-3 py-3" style={{ background: 'rgba(22,99,214,0.04)' }}>
                  {s}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
