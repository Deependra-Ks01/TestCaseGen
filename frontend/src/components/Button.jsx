export default function Button({ variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'

  const styles =
    variant === 'ghost'
      ? 'border border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-[rgba(6,182,212,0.06)] hover:border-[var(--border-glow)]'
      : variant === 'soft'
        ? 'border border-[var(--border)] bg-[var(--panel-muted)] text-[var(--text)] hover:bg-[rgba(6,182,212,0.08)] hover:border-[var(--border-glow)]'
        : 'border-0 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] text-[#0a0e17] font-bold hover:shadow-[0_0_24px_rgba(6,182,212,0.3),0_0_60px_rgba(168,85,247,0.15)] hover:translate-y-[-1px] glow-pulse'

  return <button className={`${base} ${styles} ${className}`} {...props} />
}
