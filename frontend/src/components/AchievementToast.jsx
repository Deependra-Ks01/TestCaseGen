import { useEffect, useState } from 'react'

export default function AchievementToast({ achievement, onDone }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!achievement) return
    // slight delay then enter
    const showTimer = setTimeout(() => setVisible(true), 50)
    const hideTimer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDone?.(), 500)
    }, 3500)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [achievement, onDone])

  if (!achievement) return null

  return (
    <div className={`achievement-toast ${visible ? 'achievement-toast--visible' : ''}`}>
      <div className="achievement-toast__icon">{achievement.icon}</div>
      <div className="achievement-toast__body">
        <div className="achievement-toast__label">Achievement Unlocked!</div>
        <div className="achievement-toast__name">{achievement.name}</div>
        <div className="achievement-toast__desc">{achievement.desc}</div>
        <div className="achievement-toast__xp">+{achievement.xp} XP</div>
      </div>
    </div>
  )
}
