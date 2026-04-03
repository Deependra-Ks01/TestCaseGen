import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../lib/api'
import { AuthBackground } from './ThreeBackground'

export default function SignupPage({ onAuth }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.username || !form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      const user = await signup(form)
      onAuth(user)
    } catch (err) {
      const data = err?.response?.data
      if (data) {
        const messages = []
        for (const key of Object.keys(data)) {
          const val = data[key]
          if (Array.isArray(val)) messages.push(val.join(' '))
          else if (typeof val === 'string') messages.push(val)
        }
        setError(messages.join(' ') || 'Signup failed.')
      } else {
        setError('Signup failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AuthBackground />
      <div className="auth-shell">
        <div className="auth-layout">
          <div className="auth-copy">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--neon-cyan)]" style={{ textShadow: '0 0 10px rgba(6,182,212,0.4)' }}>
              TestGen AI — Code Quest
            </div>
            <h1 className="mt-4 font-heading text-6xl leading-none text-[var(--text-strong)]">
              Begin Your Quest.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)]">
              Forge a warrior identity. Level up by generating tests, healing bugs, and exporting CI pipelines.
            </p>
          </div>

          <div className="auth-card">
            <div className="auth-header">
              <h2 className="auth-title">🛡️ Create Account</h2>
              <p className="auth-subtitle">Begin your journey as a test warrior.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {error ? <div className="auth-error">{error}</div> : null}

              <div className="auth-field">
                <label className="auth-label" htmlFor="signup-username">
                  Warrior Name
                </label>
                <input
                  id="signup-username"
                  className="auth-input"
                  type="text"
                  placeholder="Choose your identity"
                  value={form.username}
                  onChange={(e) => update('username', e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="signup-email">
                  Sigil (Email)
                </label>
                <input
                  id="signup-email"
                  className="auth-input"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="signup-password">
                  Secret Rune (Password)
                </label>
                <input
                  id="signup-password"
                  className="auth-input"
                  type="password"
                  placeholder="Min 6 characters"
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  autoComplete="new-password"
                />
              </div>

              <button className="auth-btn" type="submit" disabled={loading}>
                {loading ? '⏳ Forging identity…' : '🛡️ Begin Quest'}
              </button>
            </form>

            <p className="auth-footer">
              Already a warrior?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
