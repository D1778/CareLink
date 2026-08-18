import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer  from '../components/Footer'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ALL = [
  { id:'P001', name:'Alex Johnson',   age:34, condition:'Hypertension',    heartRate:78,  bp:'120/80',  spo2:98, status:'stable',   lastVisit:'Aug 15, 2025' },
  { id:'P002', name:'Maria Garcia',   age:58, condition:'Diabetes Type 2', heartRate:92,  bp:'145/95',  spo2:96, status:'warning',  lastVisit:'Aug 18, 2025' },
  { id:'P003', name:'Robert Smith',   age:67, condition:'Heart Failure',   heartRate:108, bp:'160/105', spo2:91, status:'critical', lastVisit:'Aug 18, 2025' },
  { id:'P004', name:'Linda Chen',     age:45, condition:'Arrhythmia',      heartRate:85,  bp:'128/82',  spo2:97, status:'stable',   lastVisit:'Aug 12, 2025' },
  { id:'P005', name:'James Wilson',   age:52, condition:'COPD',            heartRate:88,  bp:'132/88',  spo2:93, status:'warning',  lastVisit:'Aug 17, 2025' },
]

const statusBadge = { stable:'cl-badge-success', warning:'cl-badge-warning', critical:'cl-badge-danger' }

export default function DoctorPatients() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()

  const filtered = ALL.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.condition.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="cl-layout">
      <Sidebar />
      <div className="cl-main">
        <Navbar title="My Patients" />
        <div className="cl-page">
          <div className="cl-page-header">
            <h1 style={{ fontSize:'1.75rem' }}>👥 Patient Roster</h1>
            <p>Monitor all assigned patients and their real-time health status</p>
          </div>

          {/* Filters */}
          <div style={{ display:'flex', gap:'0.75rem', marginBottom:'1.5rem', flexWrap:'wrap', alignItems:'center' }}>
            <div className="cl-input-icon" style={{ flex:'1 1 260px' }}>
              <span className="icon">🔍</span>
              <input className="cl-input" type="text" placeholder="Search by name or condition…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {['all','stable','warning','critical'].map(f => (
              <button key={f} className={`cl-btn ${filter === f ? 'cl-btn-primary' : 'cl-btn-secondary'} cl-btn-sm`} onClick={() => setFilter(f)} style={{ textTransform:'capitalize' }}>
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>

          <div className="cl-card">
            <div className="cl-table-wrap">
              <table className="cl-table">
                <thead><tr><th>Patient</th><th>Age</th><th>Condition</th><th>Heart Rate</th><th>BP</th><th>SpO₂</th><th>Status</th><th>Last Visit</th><th>Action</th></tr></thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id} style={{ cursor:'pointer' }} onClick={() => navigate(`/doctor/patients/${p.id}`)}>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:'0.625rem' }}>
                          <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--cl-surface-3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.9rem' }}>👤</div>
                          <span style={{ fontWeight:600, color:'var(--cl-white)' }}>{p.name}</span>
                        </div>
                      </td>
                      <td>{p.age} yrs</td>
                      <td><span className="cl-badge cl-badge-purple">{p.condition}</span></td>
                      <td style={{ color: p.heartRate > 100 ? 'var(--cl-red)' : 'var(--cl-white)', fontWeight:600 }}>❤️ {p.heartRate}</td>
                      <td>💙 {p.bp}</td>
                      <td style={{ color: p.spo2 < 95 ? 'var(--cl-amber)' : 'var(--cl-teal)' }}>🫁 {p.spo2}%</td>
                      <td><span className={`cl-badge ${statusBadge[p.status]}`}>{p.status}</span></td>
                      <td style={{ fontSize:'0.78rem', color:'var(--cl-text-muted)' }}>{p.lastVisit}</td>
                      <td onClick={e => e.stopPropagation()}>
                        <button className="cl-btn cl-btn-secondary cl-btn-sm" onClick={() => navigate(`/doctor/patients/${p.id}`)}>View →</button>
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
