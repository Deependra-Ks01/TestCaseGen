import { useGame } from '../lib/GameContext'
import QualityScore from '../components/QualityScore'

export default function QualityPage({ scores }) {
  return (
    <>
      <div className="mb-6 border-b border-[var(--border)] pb-5">
        <div className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          Quest Log
        </div>
        <h2 className="mt-2 font-heading text-3xl tracking-wide text-[var(--text-strong)]">
          📊 Character Stats
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Review your test suite power levels across four combat attributes.
        </p>
      </div>

      <QualityScore scores={scores} />

      <div className="mt-6 glass-card">
        <div className="text-sm text-[var(--muted)]">
          💡 <span className="text-[var(--text-strong)] font-semibold">Tip:</span> Generate tests from the{' '}
          <a href="/generate" className="text-[var(--neon-cyan)] hover:underline">⚔️ Generate</a> page first.
          Your quality scores will automatically appear here after generation.
        </div>
      </div>
    </>
  )
}
