import { useGame } from '../lib/GameContext'
import { ACHIEVEMENTS } from '../lib/gameState'

export default function TrophiesPage() {
  const { gameState } = useGame()
  const totalUnlocked = gameState.achievements.length
  const total = Object.keys(ACHIEVEMENTS).length

  return (
    <>
      <div className="mb-6 border-b border-[var(--border)] pb-5">
        <div className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          Quest Log
        </div>
        <h2 className="mt-2 font-heading text-3xl tracking-wide text-[var(--text-strong)]">
          🏆 Trophy Room
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Your collection of earned badges — {totalUnlocked} / {total} unlocked.
        </p>
      </div>

      {/* Progress summary */}
      <div className="glass-card mb-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
               style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}>
            🏆
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--text-strong)]">
              {totalUnlocked} <span className="text-base font-normal text-[var(--muted)]">/ {total} achievements</span>
            </div>
            <div className="text-sm text-[var(--muted)]">
              {totalUnlocked === total
                ? '🎉 All achievements unlocked! You are a legendary tester!'
                : `${total - totalUnlocked} more to unlock — keep questing!`}
            </div>
          </div>
          {/* completion bar */}
          <div className="ml-auto hidden sm:block" style={{ width: 120 }}>
            <div className="h-2 w-full rounded-full" style={{ background: 'rgba(6,182,212,0.1)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(totalUnlocked / total) * 100}%`,
                  background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))',
                  transition: 'width 0.6s ease',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Badges grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Object.values(ACHIEVEMENTS).map((ach) => {
          const unlocked = gameState.achievements.includes(ach.id)
          return (
            <div
              key={ach.id}
              className={`glass-card flex flex-col items-center text-center transition-all duration-300 ${
                unlocked ? '' : 'opacity-30 grayscale'
              }`}
              style={
                unlocked
                  ? { borderColor: 'rgba(6,182,212,0.3)', boxShadow: '0 0 20px rgba(6,182,212,0.08)' }
                  : {}
              }
            >
              <div className="text-4xl mb-3">{ach.icon}</div>
              <div className="text-sm font-bold text-[var(--text-strong)]">{ach.name}</div>
              <div className="mt-1 text-xs text-[var(--muted)] leading-relaxed">{ach.desc}</div>
              <div
                className="mt-3 rounded-lg px-3 py-1 text-xs font-bold"
                style={
                  unlocked
                    ? { background: 'rgba(16,185,129,0.1)', color: 'var(--neon-green)', border: '1px solid rgba(16,185,129,0.2)' }
                    : { background: 'rgba(100,116,139,0.1)', color: 'var(--muted)', border: '1px solid rgba(100,116,139,0.15)' }
                }
              >
                {unlocked ? `✅ +${ach.xp} XP earned` : `🔒 +${ach.xp} XP`}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
