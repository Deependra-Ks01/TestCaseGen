import { useMemo, useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'

const tabs = [
  { id: 'pytest', label: '🐍 Pytest', color: 'var(--neon-cyan)' },
  { id: 'junit', label: '☕ JUnit', color: 'var(--neon-purple)' },
  { id: 'jest', label: '🃏 Jest', color: 'var(--neon-pink)' },
]

function downloadText(filename, text) {
  const blob = new Blob([text || ''], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function OutputPanel({ tests }) {
  const [tab, setTab] = useState('pytest')
  const code = useMemo(() => (tests && tests[tab]) || '', [tests, tab])
  const [showLoot, setShowLoot] = useState(false)

  // Trigger loot animation when code changes
  useEffect(() => {
    if (code) {
      setShowLoot(true)
      const timer = setTimeout(() => setShowLoot(false), 800)
      return () => clearTimeout(timer)
    }
  }, [code])

  return (
    <Card
      title="🎁 Loot Drop"
      subtitle="Your generated test artifacts — claim your reward."
      right={
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            type="button"
            onClick={() => navigator.clipboard.writeText(code)}
            disabled={!code}
          >
            📋 Copy
          </Button>
          <Button
            variant="soft"
            type="button"
            onClick={() =>
              downloadText(
                `test_generated.${tab === 'pytest' ? 'py' : tab === 'jest' ? 'test.js' : 'java'}`,
                code,
              )
            }
            disabled={!code}
          >
            💾 Download
          </Button>
        </div>
      }
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`menu-choice menu-choice--compact ${tab === t.id ? 'menu-choice--active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={`rounded-2xl border border-[var(--border)] overflow-hidden ${showLoot ? 'loot-enter' : ''}`}
           style={{ background: 'rgba(10,10,10,0.5)' }}>
        <pre className="m-0 max-h-[520px] overflow-auto p-4 text-xs leading-6 text-[var(--text-strong)]">
          <code>{code || '⏳ Generate tests to see your loot here…'}</code>
        </pre>
      </div>
    </Card>
  )
}
