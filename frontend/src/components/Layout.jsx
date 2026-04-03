import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { DashboardBackground } from './ThreeBackground'
import AchievementToast from './AchievementToast'
import XPBar from './XPBar'
import { useGame } from '../lib/GameContext'
import { getLevelInfo } from '../lib/gameState'

const navItems = [
  { to: '/generate',  label: 'Generate',  hint: 'Create tests from code, APIs, or product stories.' },
  { to: '/quality',   label: 'Quality',   hint: 'Inspect coverage, edge cases, and readability.' },
  { to: '/heal',      label: 'Repair',    hint: 'Fix failing tests from their current output.' },
  { to: '/ci-export', label: 'CI Export', hint: 'Package a workflow for your pipeline.' },
  { to: '/trophies',  label: 'Progress',  hint: 'Track achievements and recent activity.' },
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
          <aside
            className="border-b border-[rgba(255,255,255,0.08)] px-5 py-6 lg:min-h-screen lg:w-80 lg:border-b-0 lg:border-r lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:overflow-y-auto"
            style={{
              background:
                'linear-gradient(180deg, rgba(8,27,51,0.96) 0%, rgba(10,34,66,0.94) 100%)',
              backdropFilter: 'blur(18px)',
            }}
          >
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9bc1ff]">
                  TestGen Platform
                </div>
                <h1 className="font-heading text-4xl leading-none text-[#fff7eb]">
                  AI Test Studio
                </h1>
                <p className="text-sm leading-6 text-[rgba(247,236,218,0.72)]">
                  Generate, review, repair, and export test assets in a single interface designed for fast product teams.
                </p>
              </div>

              <XPBar xp={gameState.xp} />

              <div className="glass-card !p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                  Workspace
                </div>
                <div className="mt-2 text-base font-bold text-[var(--text-strong)]">
                  {user.username}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-[var(--accent)]">{levelInfo.current.title}</span>
                  <span className="text-xs text-[var(--muted)]">•</span>
                  <span className="text-xs text-[var(--muted)]">
                    {lastSessionId ? `Last run #${lastSessionId}` : 'No runs yet'}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
                  Use the latest run data to move between generation, quality review, repair, and CI export without losing context.
                </p>
                <button
                  onClick={handleLogout}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--panel-muted)] px-3 py-2 text-sm font-semibold text-[var(--text)] transition hover:bg-[rgba(22,99,214,0.08)] hover:border-[var(--border-glow)] cursor-pointer"
                >
                  Log Out
                </button>
              </div>

              <div className="glass-card !p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                  Model Source
                </div>
                <div className="mt-2 text-xs leading-5 text-[var(--muted)]">
                  Switch between the hosted API and your local model without changing the rest of the workflow.
                </div>
                <div className="mt-3 inline-flex w-full rounded-2xl border border-[var(--border)] bg-[var(--panel-muted)] p-1">
                  <button
                    type="button"
                    onClick={() => setProvider('api')}
                    className={`menu-chip flex-1 ${provider === 'api' ? 'menu-chip--active' : ''}`}
                  >
                    Hosted
                  </button>
                  <button
                    type="button"
                    onClick={() => setProvider('local')}
                    className={`menu-chip flex-1 ${provider === 'local' ? 'menu-chip--active' : ''}`}
                  >
                    Local
                  </button>
                </div>
              </div>

              <div className="glass-card !p-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--muted)]">
                  Workflow
                </div>
                <div className="mt-3 space-y-3 text-sm text-[var(--text)]">
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel-muted)] px-3 py-3">
                    1. Generate tests from code, APIs, or requirements.
                  </div>
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel-muted)] px-3 py-3">
                    2. Review quality signals and repair failing cases.
                  </div>
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel-muted)] px-3 py-3">
                    3. Export the workflow configuration to CI.
                  </div>
                </div>
              </div>

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

          <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8 lg:ml-80">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
