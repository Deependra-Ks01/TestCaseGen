import { useState } from 'react'
import Card from './Card'
import Button from './Button'

const DEFAULT_FAILING_TEST =
  'def test_divide_by_zero():\n    assert divide(10, 0) == 0\n'
const DEFAULT_ERROR_MSG = 'ValueError: Cannot divide by zero'

export default function HealPanel({ onHeal, result }) {
  const [failingTest, setFailingTest] = useState(DEFAULT_FAILING_TEST)
  const [errorMsg, setErrorMsg] = useState(DEFAULT_ERROR_MSG)
  const [loading, setLoading] = useState(false)

  function handleFailingTestChange(value) {
    setFailingTest(value)
    if (errorMsg === DEFAULT_ERROR_MSG) {
      setErrorMsg('')
    }
  }

  async function submit() {
    setLoading(true)
    try {
      await onHeal(failingTest, errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="🧪 Potion Lab" subtitle="Brew a fix for your broken test — the alchemist awaits.">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-[var(--neon-pink)]" style={{ textShadow: '0 0 6px rgba(244,114,182,0.3)' }}>
            💀 Failing Specimen
          </div>
          <textarea
            className="panel-textarea"
            value={failingTest}
            onChange={(e) => handleFailingTestChange(e.target.value)}
            placeholder="Paste the failing test code…"
          />
          <div className="text-xs font-semibold uppercase tracking-widest text-[var(--neon-pink)]" style={{ textShadow: '0 0 6px rgba(244,114,182,0.3)' }}>
            ⚠️ Error Curse
          </div>
          <textarea
            className="panel-textarea panel-textarea--short"
            value={errorMsg}
            onChange={(e) => setErrorMsg(e.target.value)}
            placeholder="Error message / stack trace…"
          />
          <Button variant="soft" type="button" onClick={submit} disabled={loading}>
            {loading ? '⏳ Brewing…' : '🧪 Brew Potion'}
          </Button>
        </div>

        <div className="rounded-2xl border border-[var(--border)] p-4" style={{ background: 'rgba(10,10,10,0.5)' }}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-[var(--neon-green)]" style={{ textShadow: '0 0 6px rgba(16,185,129,0.3)' }}>
              ✨ Healed Result
            </div>
            <button
              type="button"
              className="text-sm font-medium text-[var(--neon-cyan)] hover:text-[var(--accent-strong)] transition-colors"
              onClick={() => navigator.clipboard.writeText(result || '')}
              disabled={!result}
            >
              📋 Copy
            </button>
          </div>
          <pre className="m-0 max-h-[280px] overflow-auto rounded-xl border border-[var(--border)] p-3 text-xs leading-6 text-[var(--text-strong)]"
               style={{ background: 'rgba(10,10,10,0.5)' }}>
            <code>{result || '⏳ Healed output will materialize here…'}</code>
          </pre>
        </div>
      </div>
    </Card>
  )
}
