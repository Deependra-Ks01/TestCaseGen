export default function Card({ title, subtitle, right, children }) {
  return (
    <section className="glass-card">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="font-heading text-lg tracking-wide text-[var(--neon-cyan)]" style={{ textShadow: '0 0 8px rgba(6,182,212,0.3)' }}>
            {title}
          </div>
          {subtitle ? <div className="mt-1 text-sm text-[var(--muted)]">{subtitle}</div> : null}
        </div>
        {right}
      </header>
      <div className="mt-5">{children}</div>
    </section>
  )
}
