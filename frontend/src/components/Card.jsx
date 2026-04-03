export default function Card({ title, subtitle, right, children }) {
  return (
    <section className="glass-card">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="font-heading text-xl tracking-[0.01em] text-[var(--text-strong)]">
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
