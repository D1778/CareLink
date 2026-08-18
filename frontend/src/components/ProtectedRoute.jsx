import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ role }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'var(--cl-bg)' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{
            width:48, height:48, border:'3px solid var(--cl-surface-3)',
            borderTopColor:'var(--cl-primary)', borderRadius:'50%',
            animation:'spin 1s linear infinite', margin:'0 auto 1rem'
          }} />
          <p style={{ color:'var(--cl-text-muted)' }}>Loading CareLink…</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) {
    const map = { PATIENT: '/patient/dashboard', DOCTOR: '/doctor/dashboard', ADMIN: '/admin/dashboard' }
    return <Navigate to={map[user.role] || '/login'} replace />
  }

  return <Outlet />
}
