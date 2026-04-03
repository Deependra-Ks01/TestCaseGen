import { useState } from 'react'
import { generateTests } from '../lib/api'
import { useGame } from '../lib/GameContext'
import { XP_REWARDS, recordGenerationActivity } from '../lib/gameState'
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
      mutateGame((s) => {
        const withActivity = recordGenerationActivity(s)
        return { ...withActivity, genCount: (withActivity.genCount || 0) + 1 }
      })
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
      <section className="glass-card mb-6 overflow-hidden !p-0">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.25fr)_21rem]">
          <div className="px-6 py-6 sm:px-8 sm:py-9" style={{ background: 'linear-gradient(135deg, rgba(236,244,255,0.94), rgba(247,249,255,0.78))' }}>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Test Generation
            </div>
            <h2 className="mt-3 max-w-3xl font-heading text-4xl leading-tight text-[var(--text-strong)] sm:text-5xl">
              Turn product inputs into production-ready test suites.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
              Start with code, API contracts, or user stories. Generate framework-specific tests, inspect the result immediately, and move into quality review or CI export without context switching.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <div className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-[var(--text-strong)]">Fast iteration</div>
              <div className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-[var(--text-strong)]">Multi-framework output</div>
              <div className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-[var(--text-strong)]">Download-ready artifacts</div>
            </div>
          </div>
          <div className="border-t border-[var(--border)] bg-[rgba(22,99,214,0.04)] px-6 py-6 lg:border-t-0 lg:border-l">
            <div className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
              At A Glance
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-[var(--border)] bg-white/85 px-4 py-4">
                <div className="text-2xl font-semibold text-[var(--text-strong)]">3</div>
                <div className="mt-1 text-sm text-[var(--muted)]">Output targets: Pytest, JUnit, Jest</div>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-white/85 px-4 py-4">
                <div className="text-2xl font-semibold text-[var(--text-strong)]">4</div>
                <div className="mt-1 text-sm text-[var(--muted)]">Depth modes from unit to system coverage</div>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-white/85 px-4 py-4">
                <div className="text-2xl font-semibold text-[var(--text-strong)]">1</div>
                <div className="mt-1 text-sm text-[var(--muted)]">Connected workspace from generation to export</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 pb-2 md:grid-cols-3">
        <div className="glass-card">
          <div className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">Code Input</div>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Paste source files when you want implementation-aware tests with framework-specific coverage.</p>
        </div>
        <div className="glass-card">
          <div className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">API Input</div>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Use route definitions and request patterns to generate practical integration and edge-case coverage.</p>
        </div>
        <div className="glass-card">
          <div className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">Story Input</div>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Translate user-facing requirements into acceptance-oriented tests the team can review quickly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <InputPanel onGenerate={onGenerate} loading={loading} onFileUpload={onFileUpload} />
        <OutputPanel tests={tests} />
      </div>
    </>
  )
}
