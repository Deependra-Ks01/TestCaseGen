function BackgroundScene({ variant = 'dashboard' }) {
  const palette =
    variant === 'auth'
      ? {
          sky: 'linear-gradient(180deg, rgba(248,251,255,0.96) 0%, rgba(239,245,255,0.92) 100%)',
          glowA: 'rgba(76, 146, 255, 0.2)',
          glowB: 'rgba(103, 76, 255, 0.1)',
        }
      : {
          sky: 'linear-gradient(180deg, rgba(248,251,255,0.4) 0%, rgba(237,243,251,0.14) 100%)',
          glowA: 'rgba(76, 146, 255, 0.12)',
          glowB: 'rgba(103, 76, 255, 0.08)',
        }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: palette.sky,
        }}
      />
      <div
        className="float-orb absolute -left-[8%] top-[8%] h-[20rem] w-[20rem]"
        style={{ background: palette.glowA }}
      />
      <div
        className="float-orb float-orb--delay absolute right-[-10%] top-[18%] h-[18rem] w-[18rem]"
        style={{ background: palette.glowB }}
      />
      <div className="ambient-grid" />
      <div
        className="absolute inset-x-0 bottom-0 h-[26%]"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(22, 99, 214, 0.03) 52%, rgba(12, 40, 80, 0.1) 100%)',
          clipPath: 'polygon(0 48%, 16% 44%, 34% 54%, 49% 40%, 65% 56%, 83% 38%, 100% 46%, 100% 100%, 0 100%)',
        }}
      />
    </div>
  )
}

export function DashboardBackground() {
  return <BackgroundScene variant="dashboard" />
}

export function AuthBackground() {
  return <BackgroundScene variant="auth" />
}
