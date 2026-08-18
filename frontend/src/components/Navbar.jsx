import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ title }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const roleColor = user?.role === 'DOCTOR' ? 'var(--cl-teal)' : user?.role === 'ADMIN' ? 'var(--cl-purple)' : 'var(--cl-primary-light)'

  return (
    <header style={{
      position:'fixed', top:0, right:0,
      left:'var(--cl-sidebar-w)',
      height:'var(--cl-navbar-h)', zIndex:99,
      background:'rgba(10,13,20,0.85)',
      backdropFilter:'blur(16px)',
      borderBottom:'1px solid var(--cl-border)',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 1.5rem',
      transition:'left 0.3s cubic-bezier(0.4,0,0.2,1)'
    }}>
      <div>
        <h2 style={{ fontSize:'1.1rem', fontWeight:700, color:'var(--cl-white)', margin:0 }}>{title || 'CareLink'}</h2>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
        {/* Notifications */}
        <button style={{
          position:'relative', background:'var(--cl-surface-2)', border:'1px solid var(--cl-border)',
          borderRadius:'var(--cl-radius-md)', padding:'0.5rem 0.625rem',
          cursor:'pointer', color:'var(--cl-text-muted)', fontSize:'1.1rem'
        }}>
          🔔
          <span style={{
            position:'absolute', top:-4, right:-4, width:16, height:16,
            background:'var(--cl-red)', borderRadius:'50%', fontSize:'0.6rem',
            display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700
          }}>3</span>
        </button>
        {/* User chip */}
        <div style={{
          display:'flex', alignItems:'center', gap:'0.625rem',
          background:'var(--cl-surface-2)', border:'1px solid var(--cl-border)',
          borderRadius:'var(--cl-radius-full)', padding:'0.375rem 0.875rem 0.375rem 0.375rem'
        }}>
          <div style={{
            width:30, height:30, borderRadius:'50%',
            background:'var(--cl-surface-3)', display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'1rem'
          }}>{user?.avatar}</div>
          <div>
            <div style={{ color:'var(--cl-white)', fontWeight:600, fontSize:'0.8rem', lineHeight:1.2 }}>{user?.name}</div>
            <div style={{ color: roleColor, fontSize:'0.65rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em' }}>{user?.role}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
