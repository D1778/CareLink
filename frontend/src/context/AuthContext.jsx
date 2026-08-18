import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Mock user data for demo
const MOCK_USERS = {
  'patient@care.com':  { id: 'P001', name: 'Alex Johnson',    role: 'PATIENT', email: 'patient@care.com',  avatar: '👤', age: 34, condition: 'Hypertension' },
  'doctor@care.com':   { id: 'D001', name: 'Dr. Sarah Chen',   role: 'DOCTOR',  email: 'doctor@care.com',   avatar: '👩‍⚕️', specialty: 'Cardiology' },
  'admin@care.com':    { id: 'A001', name: 'Admin User',        role: 'ADMIN',   email: 'admin@care.com',    avatar: '🛡️' },
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('cl_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { localStorage.removeItem('cl_user') }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate async Cognito call
    await new Promise(r => setTimeout(r, 800))
    const found = MOCK_USERS[email.toLowerCase()]
    if (!found || password.length < 3) throw new Error('Invalid credentials')
    const tokenPayload = { id: found.id, role: found.role, email: found.email, exp: Date.now() + 86400000 }
    const token = btoa(unescape(encodeURIComponent(JSON.stringify(tokenPayload))))
    const sessionUser = { ...found, token }
    localStorage.setItem('cl_user', JSON.stringify(sessionUser))
    setUser(sessionUser)
    return sessionUser
  }

  const register = async (data) => {
    await new Promise(r => setTimeout(r, 1000))
    const newUser = {
      id: `U${Date.now()}`, name: data.name, role: data.role,
      email: data.email, avatar: data.role === 'DOCTOR' ? '👨‍⚕️' : '👤', token: 'mock-token'
    }
    localStorage.setItem('cl_user', JSON.stringify(newUser))
    setUser(newUser)
    return newUser
  }

  const logout = () => {
    localStorage.removeItem('cl_user')
    setUser(null)
  }

  const isAuthenticated = !!user
  const isPatient = user?.role === 'PATIENT'
  const isDoctor  = user?.role === 'DOCTOR'
  const isAdmin   = user?.role === 'ADMIN'

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated, isPatient, isDoctor, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthContext
