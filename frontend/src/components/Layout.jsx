import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { DashboardBackground } from './ThreeBackground'
import AchievementToast from './AchievementToast'
import XPBar from './XPBar'
import { useGame } from '../lib/GameContext'
import { getLevelInfo } from '../lib/gameState'

const navItems = [
  { to: '/generate',  label: '⚔️ Generate',   hint: 'Battle bugs — create tests from code.' },
  { to: '/quality',   label: '📊 Stats',       hint: 'Inspect your test suite power levels.' },
  { to: '/heal',      label: '🧪 Self-Heal',   hint: 'Brew a potion to fix failing tests.' },
  { to: '/ci-export', label: '🔨 CI Forge',    hint: 'Forge a CI workflow from your arsenal.' },
  { to: '/trophies',  label: '🏆 Trophies',    hint: 'View your unlocked achievements.' },
]

export default function Layout({ user, onLogout, provider, setProvider, lastSessionId }) {
  const navigate = useNavigate()
  const { gameState, currentToast, processToastQueue } = useGame()
  const levelInfo = getLevelInfo(gameState.xp)

  function handleLogout() {
    onLogout()
    navigate('/login')
  }

  return (
    <>
      <DashboardBackground />
      <AchievementToast achievement={currentToast} onDone={processToastQueue} />

      <div className="relative z-[1] min-h-screen text-[var(--text)]">
        <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col lg:flex-row">

          {/* ── SIDEBAR ── */}
          <aside
            className="border-b border-[var(--border)] px-5 py-6 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:overflow-y-auto"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(14px)' }}
          >
            <div className="space-y-5">
              {/* Branding */}
              <div className="space-y-2">
                <div
                  className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--neon-cyan)]"
                  style={{ textShadow: '0 0 10px rgba(6,182,212,0.4)' }}
                >
                  TestGen AI
                </div>
                <h1 className="font-heading text-4xl leading-none text-[var(--text-strong)]">
                  Code Quest
                </h1>
                <p className="text-sm leading-6 text-[var(--muted)]">
                  Your cyberpunk arena for test warfare, healing & forging.
                </p>
              </div>

              {/* XP Bar */}
              <XPBar xp={gameState.xp} />

              {/* User card */}
              <div className="glass-card !p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                  ⚔️ Warrior
                </div>
                <div className="mt-2 text-sm font-bold text-[var(--text-strong)]">
                  {user.username}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-[var(--neon-purple)]">{levelInfo.current.title}</span>
                  <span className="text-xs text-[var(--muted)]">•</span>
                  <span className="text-xs text-[var(--muted)]">
                    {lastSessionId ? `Session #${lastSessionId}` : 'No session yet'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--panel-muted)] px-3 py-2 text-sm font-semibold text-[var(--text)] transition hover:bg-[rgba(6,182,212,0.08)] hover:border-[var(--border-glow)] cursor-pointer"
                >
                  🚪 Logout
                </button>
              </div>

              {/* Provider toggle */}
              <div className="glass-card !p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                  🔧 Model Source
                </div>
                <div className="mt-3 inline-flex w-full rounded-xl border border-[var(--border)] bg-[var(--panel-muted)] p-1">
                  <button
                    type="button"
                    onClick={() => setProvider('api')}
                    className={`menu-chip flex-1 ${provider === 'api' ? 'menu-chip--active' : ''}`}
                  >
                    API
                  </button>
                  <button
                    type="button"
                    onClick={() => setProvider('local')}
                    className={`menu-chip flex-1 ${provider === 'local' ? 'menu-chip--active' : ''}`}
                  >
                    Custom Model
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1.5">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `menu-item ${isActive ? 'menu-item--active' : ''}`
                    }
                  >
                    <span className="menu-item__label">{item.label}</span>
                    <span className="menu-item__hint">{item.hint}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8 lg:ml-72">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
