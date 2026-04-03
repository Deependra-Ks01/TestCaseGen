import { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../lib/api'
import { AuthBackground } from './ThreeBackground'

export default function LoginPage({ onAuth }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.username || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      const user = await login(form)
      onAuth(user)
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.detail ||
        'Login failed. Please try again.'
      setError(msg)
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
              Enter the Arena.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)]">
              Sign in to your cyberpunk testing workspace. Generate tests, heal bugs, forge pipelines — and level up your coding mastery.
            </p>
          </div>

          <div className="auth-card">
            <div className="auth-header">
              <h2 className="auth-title">⚔️ Sign In</h2>
              <p className="auth-subtitle">Access your testing arena.</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {error ? <div className="auth-error">{error}</div> : null}

              <div className="auth-field">
                <label className="auth-label" htmlFor="login-username">
                  Username
                </label>
                <input
                  id="login-username"
                  className="auth-input"
                  type="text"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={(e) => update('username', e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="login-password">
                  Password
                </label>
                <input
                  id="login-password"
                  className="auth-input"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <button className="auth-btn" type="submit" disabled={loading}>
                {loading ? '⏳ Entering arena…' : '⚡ Enter Arena'}
              </button>
            </form>

            <p className="auth-footer">
              New warrior?{' '}
              <Link to="/signup" className="auth-link">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
