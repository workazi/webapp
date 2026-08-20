import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const SESSION_KEY = '_wz_lg_session'

const readSession = () => {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY)
    if (saved) {
      return JSON.parse(atob(saved))
    }
  } catch (e) {
    console.error('Error reading login session: ', e)
  }
  return null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession())

  const login = useCallback((userData) => {
    sessionStorage.setItem(SESSION_KEY, btoa(JSON.stringify(userData)))
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
