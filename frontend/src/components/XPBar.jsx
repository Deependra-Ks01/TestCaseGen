import { getLevelInfo } from '../lib/gameState'

export default function XPBar({ xp }) {
  const { current, next, progress } = getLevelInfo(xp)

  return (
    <div className="xp-bar-wrapper">
      <div className="xp-bar-header">
        <span className="xp-rank-badge">LVL {current.rank}</span>
        <span className="xp-title">{current.title}</span>
        <span className="xp-amount">{xp} XP</span>
      </div>
      <div className="xp-bar-track">
        <div
          className="xp-bar-fill"
          style={{ width: `${progress}%` }}
        />
        <div className="xp-bar-glow" style={{ width: `${progress}%` }} />
      </div>
      {next && (
        <div className="xp-bar-footer">
          <span>Next: {next.title}</span>
          <span>{next.xp - xp} XP to go</span>
        </div>
      )}
    </div>
  )
}
