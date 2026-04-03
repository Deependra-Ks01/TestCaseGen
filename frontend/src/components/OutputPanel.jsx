import { useMemo, useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'

const tabs = [
  { id: 'pytest', label: 'Pytest', color: 'var(--neon-cyan)' },
  { id: 'junit', label: 'JUnit', color: 'var(--neon-purple)' },
  { id: 'jest', label: 'Jest', color: 'var(--neon-pink)' },
]

const DOWNLOAD_META = {
  pytest: {
    filename: 'generated_test_suite.py',
    title: 'Pytest Generated Test Suite',
    comment: '#',
  },
  junit: {
    filename: 'GeneratedTestSuite.java',
    title: 'JUnit Generated Test Suite',
    comment: '//',
  },
  jest: {
    filename: 'generated.test.js',
    title: 'Jest Generated Test Suite',
    comment: '//',
  },
}

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

function formatDownloadedTest(tab, text) {
  const meta = DOWNLOAD_META[tab] || {
    filename: 'generated_test_suite.txt',
    title: 'Generated Test Suite',
    comment: '//',
  }
  const cleaned = (text || '').trim()
  const header = [
    `${meta.comment} ${meta.title}`,
    `${meta.comment} Exported from TestGen`,
    '',
  ].join('\n')

  return {
    filename: meta.filename,
    content: cleaned ? `${header}${cleaned}\n` : '',
  }
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
      title="Generated Output"
      subtitle="Preview the result, switch frameworks, and export the generated files."
      right={
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            type="button"
            onClick={() => navigator.clipboard.writeText(code)}
            disabled={!code}
          >
            Copy
          </Button>
          <Button
            variant="soft"
            type="button"
            onClick={() => {
              const formatted = formatDownloadedTest(tab, code)
              downloadText(formatted.filename, formatted.content)
            }}
            disabled={!code}
          >
            Download
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

      <div className={`rounded-[1.4rem] border border-[var(--border)] overflow-hidden ${showLoot ? 'loot-enter' : ''}`}
           style={{ background: 'rgba(255,250,244,0.78)' }}>
        <pre className="m-0 max-h-[520px] overflow-auto p-4 text-xs leading-6 text-[var(--text-strong)]">
          <code>{code || 'Generate a mission pack to see the resulting test artifacts here.'}</code>
        </pre>
      </div>
    </Card>
  )
}
