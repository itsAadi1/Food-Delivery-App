import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

const AdminAuthContext = createContext(null)
const SESSION_KEY = 'foodies_admin_session'
const ONE_DAY_MS = 24 * 60 * 60 * 1000

const readSessionFromStorage = () => {
  try {
    const stored = localStorage.getItem(SESSION_KEY)
    if (!stored) return null
    const parsed = JSON.parse(stored)
    if (!parsed?.expiry || parsed.expiry <= Date.now()) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return parsed
  } catch (error) {
    console.error('Failed to parse admin session', error)
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadSession = useCallback(() => {
    const session = readSessionFromStorage()
    setIsAuthenticated(Boolean(session))
    setLoading(false)
    return session
  }, [])

  useEffect(() => {
    loadSession()
  }, [loadSession])

  useEffect(() => {
    if (!isAuthenticated) return
    const session = readSessionFromStorage()
    if (!session) {
      setIsAuthenticated(false)
      return
    }
    const timeout = session.expiry - Date.now()
    if (timeout <= 0) {
      setIsAuthenticated(false)
      localStorage.removeItem(SESSION_KEY)
      return
    }
    const timer = setTimeout(() => {
      localStorage.removeItem(SESSION_KEY)
      setIsAuthenticated(false)
    }, timeout)
    return () => clearTimeout(timer)
  }, [isAuthenticated])

  const login = (username, password) => {
    const expectedUsername = import.meta.env.VITE_ADMIN_USERNAME
    const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD

    if (!expectedUsername || !expectedPassword) {
      throw new Error('Admin credentials are not configured. Please set VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD.')
    }

    if (username === expectedUsername && password === expectedPassword) {
      const sessionData = {
        createdAt: Date.now(),
        expiry: Date.now() + ONE_DAY_MS
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
      setIsAuthenticated(true)
      return
    }
    throw new Error('Invalid username or password')
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
  }

  const value = useMemo(() => ({
    isAuthenticated,
    loading,
    login,
    logout
  }), [isAuthenticated, loading])

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}
