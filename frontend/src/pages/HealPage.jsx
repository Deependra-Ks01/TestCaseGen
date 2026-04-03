import { useState } from 'react'
import { healFailingTest } from '../lib/api'
import { useGame } from '../lib/GameContext'
import { XP_REWARDS } from '../lib/gameState'
import HealPanel from '../components/HealPanel'

export default function HealPage({ provider }) {
  const [healResult, setHealResult] = useState('')
  const { grantXP, tryUnlock } = useGame()

  async function onHeal(failing_test, error_msg) {
    const data = await healFailingTest({ failing_test, error_msg, provider })
    setHealResult(data.fixed_test || '')
    grantXP(XP_REWARDS.heal)
    tryUnlock('bug_healer')
  }

  return (
    <>
      <div className="mb-6 border-b border-[var(--border)] pb-5">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
          Test Repair
        </div>
        <h2 className="mt-2 font-heading text-3xl tracking-wide text-[var(--text-strong)]">
          Fix failing tests.
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Paste a failing test and the related error output to generate a repaired version.
        </p>
      </div>

      <HealPanel onHeal={onHeal} result={healResult} />
    </>
  )
}
