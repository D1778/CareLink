import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const patientLinks = [
  { to: '/patient/dashboard',     icon: '🏠', label: 'Dashboard' },
  { to: '/patient/vitals',        icon: '❤️', label: 'Vitals' },
  { to: '/patient/appointments',  icon: '📅', label: 'Appointments' },
  { to: '/patient/prescriptions', icon: '💊', label: 'Prescriptions' },
  { to: '/patient/records',       icon: '📋', label: 'Medical Records' },
  { to: '/patient/teleconsult',   icon: '📹', label: 'Teleconsultation' },
]
const doctorLinks = [
  { to: '/doctor/dashboard',     icon: '🏠', label: 'Dashboard' },
  { to: '/doctor/patients',      icon: '👥', label: 'My Patients' },
  { to: '/doctor/appointments',  icon: '📅', label: 'Appointments' },
  { to: '/doctor/prescriptions', icon: '💊', label: 'Prescriptions' },
  { to: '/doctor/teleconsult',   icon: '📹', label: 'Teleconsultation' },
]
const adminLinks = [
  { to: '/admin/dashboard', icon: '🏠', label: 'Dashboard' },
  { to: '/admin/users',     icon: '👥', label: 'User Management' },
  { to: '/admin/reports',   icon: '📊', label: 'Reports' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const links = user?.role === 'PATIENT' ? patientLinks
              : user?.role === 'DOCTOR'  ? doctorLinks
              : adminLinks

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <aside style={{
      position:'fixed', left:0, top:0, bottom:0, zIndex:100,
      width: collapsed ? 70 : 'var(--cl-sidebar-w)',
      background:'var(--cl-surface)',
      borderRight:'1px solid var(--cl-border)',
      display:'flex', flexDirection:'column',
      transition:'width 0.3s cubic-bezier(0.4,0,0.2,1)',
      overflow:'hidden'
    }}>
      {/* Logo */}
      <div style={{
        padding:'1.25rem 1rem', borderBottom:'1px solid var(--cl-border)',
        display:'flex', alignItems:'center', gap:'0.75rem',
        minHeight:'var(--cl-navbar-h)'
      }}>
        <div style={{
          width:36, height:36, borderRadius:'var(--cl-radius-md)', flexShrink:0,
          background:'var(--cl-grad-primary)', display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'1.2rem', boxShadow:'var(--cl-shadow-glow)'
        }}>🏥</div>
        {!collapsed && (
          <span style={{ fontFamily:'var(--cl-font-heading)', fontWeight:800, color:'var(--cl-white)', fontSize:'1.2rem', whiteSpace:'nowrap' }}>
            CareLink
          </span>
        )}
        <button onClick={() => setCollapsed(c => !c)} style={{
          marginLeft:'auto', background:'none', border:'none', cursor:'pointer',
          color:'var(--cl-text-muted)', fontSize:'1rem', padding:4, borderRadius:4,
          flexShrink:0
        }}>{collapsed ? '▶' : '◀'}</button>
      </div>

      {/* User info */}
      {!collapsed && user && (
        <div style={{ padding:'1rem', borderBottom:'1px solid var(--cl-border)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <div style={{
              width:38, height:38, borderRadius:'50%', background:'var(--cl-surface-3)',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', flexShrink:0
            }}>{user.avatar}</div>
            <div style={{ overflow:'hidden' }}>
              <div style={{ color:'var(--cl-white)', fontWeight:600, fontSize:'0.875rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user.name}</div>
              <span className="cl-badge cl-badge-primary" style={{ fontSize:'0.65rem' }}>{user.role}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex:1, padding:'0.75rem 0.5rem', overflowY:'auto' }}>
        {links.map(link => {
          const active = location.pathname === link.to
          return (
            <Link key={link.to} to={link.to} style={{
              display:'flex', alignItems:'center', gap:'0.75rem',
              padding: collapsed ? '0.75rem' : '0.7rem 0.875rem',
              borderRadius:'var(--cl-radius-md)', marginBottom:'0.25rem',
              textDecoration:'none', transition:'var(--cl-transition)',
              justifyContent: collapsed ? 'center' : 'flex-start',
              background: active ? 'rgba(59,130,246,0.15)' : 'transparent',
              border: active ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
              color: active ? 'var(--cl-primary-light)' : 'var(--cl-text-muted)',
            }}
            onMouseEnter={e => { if(!active) { e.currentTarget.style.background='var(--cl-surface-2)'; e.currentTarget.style.color='var(--cl-white)' }}}
            onMouseLeave={e => { if(!active) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--cl-text-muted)' }}}
            >
              <span style={{ fontSize:'1.1rem', flexShrink:0 }}>{link.icon}</span>
              {!collapsed && <span style={{ fontSize:'0.875rem', fontWeight:500, whiteSpace:'nowrap' }}>{link.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding:'0.75rem 0.5rem', borderTop:'1px solid var(--cl-border)' }}>
        <button onClick={handleLogout} style={{
          width:'100%', display:'flex', alignItems:'center', gap:'0.75rem',
          padding: collapsed ? '0.75rem' : '0.7rem 0.875rem',
          borderRadius:'var(--cl-radius-md)', background:'none', border:'none',
          cursor:'pointer', color:'var(--cl-text-muted)', transition:'var(--cl-transition)',
          justifyContent: collapsed ? 'center' : 'flex-start',
          fontFamily:'var(--cl-font-body)', fontSize:'0.875rem', fontWeight:500
        }}
        onMouseEnter={e => { e.currentTarget.style.background='rgba(239,68,68,0.1)'; e.currentTarget.style.color='var(--cl-red)' }}
        onMouseLeave={e => { e.currentTarget.style.background='none'; e.currentTarget.style.color='var(--cl-text-muted)' }}
        >
          <span style={{ fontSize:'1.1rem' }}>🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
