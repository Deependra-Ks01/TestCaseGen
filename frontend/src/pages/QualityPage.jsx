import QualityScore from '../components/QualityScore'

export default function QualityPage({ scores }) {
  return (
    <>
      <div className="mb-6 border-b border-[var(--border)] pb-5">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
          Quality Review
        </div>
        <h2 className="mt-2 font-heading text-3xl tracking-wide text-[var(--text-strong)]">
          Inspect test quality.
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Review the generated suite through coverage, security, edge cases, and readability.
        </p>
      </div>

      <QualityScore scores={scores} />

      <div className="mt-6 glass-card">
        <div className="text-sm text-[var(--muted)]">
          <span className="text-[var(--text-strong)] font-semibold">Tip:</span> Start from the{' '}
          <a href="/generate" className="text-[var(--accent)] hover:underline">generate</a> page first.
          After a generation run, these notes will fill in automatically.
        </div>
      </div>
    </>
  )
}
