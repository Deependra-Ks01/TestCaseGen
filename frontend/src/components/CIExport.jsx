import { useState } from 'react'
import Card from './Card'
import Button from './Button'

export default function CIExport({ onExport, yaml }) {
  const [framework, setFramework] = useState('pytest')
  const [loading, setLoading] = useState(false)

  async function submit() {
    setLoading(true)
    try {
      await onExport(framework)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title="Workflow Export" subtitle="Generate a CI workflow from the current test output.">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {['pytest', 'junit', 'jest'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFramework(f)}
              className={`menu-choice menu-choice--compact ${framework === f ? 'menu-choice--active' : ''}`}
            >
              {f.toUpperCase()}
            </button>
          ))}
          <div className="flex-1" />
          <Button variant="soft" type="button" onClick={submit} disabled={loading}>
            {loading ? 'Packing workflow...' : 'Create workflow'}
          </Button>
        </div>

        <div className="rounded-[1.4rem] border border-[var(--border)] p-4" style={{ background: 'rgba(255,255,255,0.78)' }}>
          <pre className="m-0 max-h-[320px] overflow-auto text-xs leading-6 text-[var(--text-strong)]">
            <code>{yaml || 'A CI workflow draft will appear here once you choose a framework and create the pack.'}</code>
          </pre>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm font-medium text-[var(--neon-cyan)] hover:text-[var(--accent-strong)] transition-colors"
            onClick={() => navigator.clipboard.writeText(yaml || '')}
            disabled={!yaml}
          >
            Copy YAML
          </button>
        </div>
      </div>
    </Card>
  )
}
