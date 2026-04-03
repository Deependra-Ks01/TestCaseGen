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
        <div className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          Quest Log
        </div>
        <h2 className="mt-2 font-heading text-3xl tracking-wide text-[var(--text-strong)]">
          🧪 Potion Lab
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Brew a fix for your broken tests — paste the failing code and its error curseu2026 the alchemist awaits.
        </p>
      </div>

      <HealPanel onHeal={onHeal} result={healResult} />
    </>
  )
}
