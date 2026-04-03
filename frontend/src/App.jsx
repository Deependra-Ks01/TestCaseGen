import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GameProvider } from './lib/GameContext'

import Layout from './components/Layout'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'

import GeneratePage from './pages/GeneratePage'
import QualityPage from './pages/QualityPage'
import HealPage from './pages/HealPage'
import CIExportPage from './pages/CIExportPage'
import TrophiesPage from './pages/TrophiesPage'

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('testgen_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  // Shared state for the app (that needs to exist across pages)
  const [provider, setProvider] = useState('api')
  const [lastSessionId, setLastSessionId] = useState(null)
  
  // NOTE: In a full app, `tests` would probably be in an overarching context 
  // along with scores, so CIExport and QualityPage can access the latest ones.
  // For simplicity here, we'll lift state to App.
  const [tests, setTests] = useState({ pytest: '', junit: '', jest: '' })
  const [scores, setScores] = useState(null)

  const handleAuth = useCallback((userData) => {
    setUser(userData)
    localStorage.setItem('testgen_user', JSON.stringify(userData))
  }, [])

  const handleLogout = useCallback(() => {
    setUser(null)
    localStorage.setItem('testgen_user', '') // Clear out instead of remove to be safe
    localStorage.removeItem('testgen_user')
  }, [])

  return (
    <BrowserRouter>
      <GameProvider>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/generate" replace /> : <LoginPage onAuth={handleAuth} />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/generate" replace /> : <SignupPage onAuth={handleAuth} />}
          />
          
          <Route
            element={
              user ? (
                <Layout 
                  user={user} 
                  onLogout={handleLogout}
                  provider={provider}
                  setProvider={setProvider}
                  lastSessionId={lastSessionId}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route path="/" element={<Navigate to="/generate" replace />} />
            <Route 
              path="/generate" 
              element={
                <GeneratePage 
                  provider={provider} 
                  setLastSessionId={setLastSessionId} 
                  tests={tests}
                  setTests={setTests}
                  setScores={setScores}
                />
              } 
            />
            <Route path="/quality" element={<QualityPage scores={scores} />} />
            <Route path="/heal" element={<HealPage provider={provider} />} />
            <Route path="/ci-export" element={<CIExportPage tests={tests} />} />
            <Route path="/trophies" element={<TrophiesPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  )
}
