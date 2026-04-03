export default function Button({ variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'

  const styles =
    variant === 'ghost'
      ? 'border border-[var(--border)] bg-transparent text-[var(--text)] hover:bg-[rgba(155,93,49,0.06)] hover:border-[var(--border-glow)]'
      : variant === 'soft'
        ? 'border border-[var(--border)] bg-[var(--panel-muted)] text-[var(--text)] hover:bg-[rgba(155,93,49,0.08)] hover:border-[var(--border-glow)]'
        : 'border border-[rgba(123,92,71,0.1)] bg-gradient-to-r from-[var(--accent-strong)] to-[var(--accent)] text-[#fffaf2] font-bold hover:shadow-[0_14px_28px_rgba(124,90,61,0.22)] hover:translate-y-[-1px]'

  return <button className={`${base} ${styles} ${className}`} {...props} />
}
