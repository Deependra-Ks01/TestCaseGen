import { useState } from 'react'
import { generateTests } from '../lib/api'
import { useGame } from '../lib/GameContext'
import { XP_REWARDS } from '../lib/gameState'
import InputPanel from '../components/InputPanel'
import OutputPanel from '../components/OutputPanel'

export default function GeneratePage({ provider, setLastSessionId, tests, setTests, setScores }) {
  const [loading, setLoading] = useState(false)
  const { grantXP, tryUnlock, mutateGame, gameState } = useGame()

  async function onGenerate(input, type, mode, testLevel) {
    setLoading(true)
    try {
      const data = await generateTests({
        input,
        type,
        mode,
        test_level: testLevel,
        provider,
      })
      setTests(data.tests)
      setScores(data.scores)
      setLastSessionId(data.id)

      // XP + achievements
      grantXP(XP_REWARDS.generate)
      mutateGame((s) => ({ ...s, genCount: (s.genCount || 0) + 1 }))
      tryUnlock('first_blood')
      if (mode === 'white_box') tryUnlock('white_hat')

      // Triple threat
      const updatedTests = data.tests || {}
      mutateGame((prev) => {
        const fws = { ...prev.frameworks }
        if (updatedTests.pytest) fws.pytest = true
        if (updatedTests.junit) fws.junit = true
        if (updatedTests.jest) fws.jest = true
        return { ...prev, frameworks: fws }
      })

      setTimeout(() => {
        // check triple threat
        const gs = gameState
        const fws = { ...gs.frameworks }
        if (updatedTests.pytest) fws.pytest = true
        if (updatedTests.junit) fws.junit = true
        if (updatedTests.jest) fws.jest = true
        if (fws.pytest && fws.junit && fws.jest) tryUnlock('triple_threat')
      }, 300)

      // Five gens
      setTimeout(() => {
        if ((gameState.genCount || 0) + 1 >= 5) tryUnlock('five_gens')
      }, 500)

      // Perfectionist
      if (data.scores?.overall >= 90) {
        setTimeout(() => tryUnlock('perfectionist'), 600)
      }
    } finally {
      setLoading(false)
    }
  }

  function onFileUpload() {
    tryUnlock('code_upload')
  }

  return (
    <>
      <div className="mb-6 border-b border-[var(--border)] pb-5">
        <div className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
          Quest Log
        </div>
        <h2 className="mt-2 font-heading text-3xl tracking-wide text-[var(--text-strong)]">
          ⚔️ Generate Tests
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Battle bugs by generating test suites from your code, APIs, or user stories.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <InputPanel onGenerate={onGenerate} loading={loading} onFileUpload={onFileUpload} />
        <OutputPanel tests={tests} />
      </div>
    </>
  )
}
