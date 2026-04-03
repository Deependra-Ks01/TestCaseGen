import {
  getActivityCalendar,
  getBestStreak,
  getCurrentStreak,
} from '../lib/gameState'

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const LEVEL_STYLES = [
  { background: '#e9eef5', borderColor: '#dde5ef' },
  { background: '#cdeed9', borderColor: '#bee4cd' },
  { background: '#8ad8a4', borderColor: '#79ca94' },
  { background: '#4fc66d', borderColor: '#43b75f' },
  { background: '#187b38', borderColor: '#166d32' },
]

function formatTooltip(date, count) {
  const label = date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  if (count === 0) return `${label}: no test generations`
  if (count === 1) return `${label}: 1 test generation`
  return `${label}: ${count} test generations`
}

export default function StreakHeatmap({ activity }) {
  const cells = getActivityCalendar(activity)
  const columns = []
  for (let i = 0; i < cells.length; i += 7) columns.push(cells.slice(i, i + 7))

  const currentStreak = getCurrentStreak(activity)
  const bestStreak = getBestStreak(activity)
  const totalDaysActive = Object.keys(activity || {}).length

  const monthMarkers = []
  let lastPlacedIndex = -10

  columns.forEach((column, index) => {
    const first = column.find((cell) => cell.inRange)
    if (!first) {
      monthMarkers.push('')
      return
    }

    const month = MONTH_LABELS[first.date.getMonth()]
    const previous = columns[index - 1]?.find((cell) => cell.inRange)
    const isNewMonth = !previous || previous.date.getMonth() !== first.date.getMonth()

    if (isNewMonth && index - lastPlacedIndex >= 3) {
      monthMarkers.push(month)
      lastPlacedIndex = index
      return
    }

    monthMarkers.push('')
  })

  return (
    <section className="glass-card">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
            Consistency
          </div>
          <h3 className="mt-2 font-heading text-3xl text-[var(--text-strong)]">
            Keep your generation streak alive.
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            Every day you generate tests adds to your activity history. Use this view to maintain momentum and build a consistent test-writing habit.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-left">
          <div className="rounded-2xl border border-[var(--border)] bg-white/75 px-4 py-3">
            <div className="text-xs uppercase tracking-widest text-[var(--muted)]">Current</div>
            <div className="mt-2 text-2xl font-bold text-[var(--text-strong)]">{currentStreak}</div>
            <div className="text-xs text-[var(--muted)]">day streak</div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-white/75 px-4 py-3">
            <div className="text-xs uppercase tracking-widest text-[var(--muted)]">Best</div>
            <div className="mt-2 text-2xl font-bold text-[var(--text-strong)]">{bestStreak}</div>
            <div className="text-xs text-[var(--muted)]">day streak</div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-white/75 px-4 py-3">
            <div className="text-xs uppercase tracking-widest text-[var(--muted)]">Active</div>
            <div className="mt-2 text-2xl font-bold text-[var(--text-strong)]">{totalDaysActive}</div>
            <div className="text-xs text-[var(--muted)]">days tracked</div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="w-full min-w-0">
          <div className="mb-3 grid items-end gap-1" style={{ gridTemplateColumns: `44px repeat(${columns.length}, minmax(0, 1fr))` }}>
            <div />
            {monthMarkers.map((month, index) => (
              <div
                key={`${month || 'gap'}-${index}`}
                className="min-w-0 text-[11px] leading-none text-[var(--muted)]"
              >
                {month}
              </div>
            ))}
          </div>

          <div className="grid gap-2" style={{ gridTemplateColumns: '44px minmax(0, 1fr)' }}>
            <div className="grid grid-rows-7 gap-1 text-xs text-[var(--muted)]">
              {WEEKDAY_LABELS.map((label, index) => (
                <div key={label} className="flex items-center">
                  {index % 2 === 1 ? label : ''}
                </div>
              ))}
            </div>

            <div className="grid min-w-0 gap-1" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
              {columns.map((column, columnIndex) => (
                <div key={columnIndex} className="grid grid-rows-7 gap-1 min-w-0">
                  {column.map((cell) => (
                    <div
                      key={cell.key}
                      className="aspect-square w-full rounded-[5px] border transition-transform duration-200 hover:scale-110"
                      style={LEVEL_STYLES[cell.inRange ? cell.level : 0]}
                      title={formatTooltip(cell.date, cell.count)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
            <div>Generate tests daily to build a stronger streak.</div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span>Less</span>
              {LEVEL_STYLES.map((style, index) => (
                <div key={index} className="h-4 w-4 rounded-[5px] border" style={style} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
