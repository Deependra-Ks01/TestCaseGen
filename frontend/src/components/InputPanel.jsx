import { useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import Card from './Card'
import Button from './Button'

const typeOptions = [
  { id: 'code', label: '⚔️ Code', desc: 'Battle source code bugs' },
  { id: 'api', label: '🌐 API', desc: 'Scan API endpoints' },
  { id: 'story', label: '📜 Story', desc: 'Quest from user stories' },
]

const PLACEHOLDERS = {
  code: '# Paste your code here or upload a file\ndef example():\n    pass\n',
  api: 'GET https://api.example.com/users/{id}',
  story:
    'As a user, I want to reset my password so I can regain access to my account.',
}

const codeLanguages = [
  { id: 'python', label: 'Python' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'java', label: 'Java' },
  { id: 'c', label: 'C' },
  { id: 'cpp', label: 'C++' },
  { id: 'go', label: 'Go' },
  { id: 'rust', label: 'Rust' },
]

const testLevels = [
  { id: 'unit', label: '🗡️ Unit', desc: 'Single strikes' },
  { id: 'integration', label: '⚔️ Integration', desc: 'Combo attacks' },
  { id: 'acceptance', label: '🛡️ Acceptance', desc: 'Boss validation' },
  { id: 'system', label: '🏰 System', desc: 'Siege warfare' },
]

export default function InputPanel({ onGenerate, loading, onFileUpload }) {
  const [type, setType] = useState('code')
  const [mode, setMode] = useState('black_box')
  const [testLevel, setTestLevel] = useState('unit')
  const [language, setLanguage] = useState('python')
  const [code, setCode] = useState('')
  const fileInputRef = useRef(null)

  function handleTypeChange(newType) {
    setType(newType)
    setCode('')
  }

  function handleFileUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      setCode(evt.target.result || '')
    }
    reader.readAsText(file)
    e.target.value = ''
    onFileUpload?.()
  }

  function handleClear() {
    setCode('')
  }

  function buildRequestInput() {
    if (type !== 'code') return code
    const label = codeLanguages.find((item) => item.id === language)?.label || language
    return `Language: ${label}\n\n${code}`
  }

  const editorLang =
    type === 'code' ? language : type === 'api' ? 'markdown' : 'markdown'

  return (
    <Card
      title="⚔️ Battle Setup"
      subtitle="Choose your weapon, target, and attack mode — then unleash."
      right={
        <div className="inline-flex rounded-xl border border-[var(--border)] bg-[var(--panel-muted)] p-1">
          <button
            className={`menu-chip ${mode === 'black_box' ? 'menu-chip--active' : ''}`}
            onClick={() => setMode('black_box')}
            type="button"
          >
            🌑 Black Box
          </button>
          <button
            className={`menu-chip ${mode === 'white_box' ? 'menu-chip--active' : ''}`}
            onClick={() => setMode('white_box')}
            type="button"
          >
            ⚪ White Box
          </button>
        </div>
      }
    >
      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--neon-purple)]" style={{ textShadow: '0 0 6px rgba(168,85,247,0.3)' }}>
        Target Type
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {typeOptions.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => handleTypeChange(t.id)}
            className={`menu-choice ${type === t.id ? 'menu-choice--active' : ''}`}
          >
            <div>{t.label}</div>
            <div className="text-xs mt-0.5 opacity-60">{t.desc}</div>
          </button>
        ))}
      </div>

      <div className="mt-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--neon-purple)]" style={{ textShadow: '0 0 6px rgba(168,85,247,0.3)' }}>
          Attack Level
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {testLevels.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTestLevel(item.id)}
              className={`menu-choice ${testLevel === item.id ? 'menu-choice--active' : ''}`}
            >
              <div>{item.label}</div>
              <div className="text-xs mt-0.5 opacity-60">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {type === 'code' ? (
          <label className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--text)]">
            <span className="font-medium text-[var(--muted)]">🔧 Lang</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-lg border border-[var(--border)] bg-[var(--panel-solid)] px-2 py-1 text-sm text-[var(--text-strong)] outline-none"
            >
              {codeLanguages.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <input
          ref={fileInputRef}
          type="file"
          accept=".py,.js,.ts,.jsx,.tsx,.java,.c,.cpp,.go,.rs,.rb,.txt,.json,.yaml,.yml,.md"
          onChange={handleFileUpload}
          className="hidden"
        />
        <Button variant="soft" type="button" onClick={() => fileInputRef.current?.click()}>
          📁 Upload file
        </Button>
        <Button variant="ghost" type="button" onClick={handleClear}>
          🗑️ Clear
        </Button>
        <span className="ml-auto text-xs text-[var(--muted)]">
          {code.length > 0 ? `${code.split('\n').length} lines loaded` : '⏳ Editor empty'}
        </span>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)]" style={{ background: 'rgba(10,10,10,0.5)' }}>
        <Editor
          height="360px"
          language={editorLang}
          value={code}
          onChange={(v) => setCode(v ?? '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            placeholder: PLACEHOLDERS[type],
          }}
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-[var(--border)] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-[var(--muted)]">
          Loot targets: <span className="font-medium text-[var(--neon-cyan)]">Pytest</span>,{' '}
          <span className="font-medium text-[var(--neon-purple)]">JUnit</span>,{' '}
          <span className="font-medium text-[var(--neon-pink)]">Jest</span>
        </div>
        <Button
          onClick={() => onGenerate(buildRequestInput(), type, mode, testLevel)}
          disabled={loading || code.trim().length === 0}
        >
          {loading ? '⏳ Generating…' : '⚡ Generate Tests'}
        </Button>
      </div>
    </Card>
  )
}
