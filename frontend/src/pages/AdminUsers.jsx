import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer  from '../components/Footer'
import { useState } from 'react'

const USERS = [
  { id:'U001', name:'Alex Johnson',   email:'alex@example.com',   role:'PATIENT', status:'active',   joined:'Aug 1, 2025',  lastLogin:'Today' },
  { id:'U002', name:'Maria Garcia',   email:'maria@example.com',  role:'PATIENT', status:'active',   joined:'Jul 15, 2025', lastLogin:'Today' },
  { id:'U003', name:'Robert Smith',   email:'robert@example.com', role:'PATIENT', status:'active',   joined:'Jun 20, 2025', lastLogin:'2h ago' },
  { id:'U004', name:'Dr. Sarah Chen', email:'sarah@care.com',     role:'DOCTOR',  status:'active',   joined:'Jan 5, 2025',  lastLogin:'Today' },
  { id:'U005', name:'Dr. Mike Ross',  email:'mike@care.com',      role:'DOCTOR',  status:'active',   joined:'Feb 10, 2025', lastLogin:'1h ago' },
  { id:'U006', name:'Linda Chen',     email:'linda@example.com',  role:'PATIENT', status:'inactive', joined:'May 1, 2025',  lastLogin:'3d ago' },
  { id:'U007', name:'Admin User',     email:'admin@care.com',     role:'ADMIN',   status:'active',   joined:'Jan 1, 2025',  lastLogin:'Today' },
]

const roleBadge  = { PATIENT:'cl-badge-primary', DOCTOR:'cl-badge-teal', ADMIN:'cl-badge-purple' }
const statusBadge = { active:'cl-badge-success', inactive:'cl-badge-danger' }

export default function AdminUsers() {
  const [users, setUsers] = useState(USERS)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const filtered = users.filter(u => {
    const s = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const r = roleFilter === 'all' || u.role === roleFilter
    return s && r
  })

  const toggle = (id) => setUsers(u => u.map(x => x.id === id ? {...x, status: x.status === 'active' ? 'inactive' : 'active'} : x))

  return (
    <div className="cl-layout">
      <Sidebar />
      <div className="cl-main">
        <Navbar title="User Management" />
        <div className="cl-page">
          <div className="cl-page-header">
            <h1 style={{ fontSize:'1.75rem' }}>👥 User Management</h1>
            <p>Manage all platform accounts — patients, doctors, and administrators</p>
          </div>

          <div style={{ display:'flex', gap:'1rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
            {[['all','All'],['PATIENT','Patients'],['DOCTOR','Doctors'],['ADMIN','Admins']].map(([v,l]) => (
              <button key={v} className={`cl-btn ${roleFilter===v ? 'cl-btn-primary' : 'cl-btn-secondary'} cl-btn-sm`} onClick={() => setRoleFilter(v)}>{l}</button>
            ))}
            <div className="cl-input-icon" style={{ flex:'1 1 240px', marginLeft:'auto' }}>
              <span className="icon">🔍</span>
              <input className="cl-input" type="text" placeholder="Search by name or email…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          <div className="cl-card">
            <div className="cl-table-wrap">
              <table className="cl-table">
                <thead><tr><th>User</th><th>Role</th><th>Status</th><th>Joined</th><th>Last Login</th><th>Actions</th></tr></thead>
                <tbody>
                  {filtered.map(u => (
                    <tr key={u.id}>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:'0.625rem' }}>
                          <div style={{ width:34, height:34, borderRadius:'50%', background:'var(--cl-surface-3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.9rem' }}>
                            {u.role === 'DOCTOR' ? '👨‍⚕️' : u.role === 'ADMIN' ? '🛡️' : '👤'}
                          </div>
                          <div>
                            <div style={{ fontWeight:600, color:'var(--cl-white)', fontSize:'0.875rem' }}>{u.name}</div>
                            <div style={{ fontSize:'0.72rem', color:'var(--cl-text-dim)' }}>{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className={`cl-badge ${roleBadge[u.role]}`}>{u.role}</span></td>
                      <td><span className={`cl-badge ${statusBadge[u.status]}`}>{u.status}</span></td>
                      <td style={{ fontSize:'0.78rem', color:'var(--cl-text-muted)' }}>{u.joined}</td>
                      <td style={{ fontSize:'0.78rem', color:'var(--cl-text-muted)' }}>{u.lastLogin}</td>
                      <td>
                        <div style={{ display:'flex', gap:'0.5rem' }}>
                          <button className={`cl-btn cl-btn-sm ${u.status==='active' ? 'cl-btn-danger' : 'cl-btn-success'}`} onClick={() => toggle(u.id)}>
                            {u.status === 'active' ? '🔒 Disable' : '✓ Enable'}
                          </button>
                          <button className="cl-btn cl-btn-ghost cl-btn-sm">View</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
