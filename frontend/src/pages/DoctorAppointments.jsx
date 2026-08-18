import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer  from '../components/Footer'
import { useState } from 'react'

const APPTS = [
  { id:1, patientName:'Alex Johnson', date:'Aug 22, 2025', time:'10:00 AM', status:'confirmed', type:'Cardiology Follow-up' },
  { id:2, patientName:'Maria Garcia', date:'Aug 22, 2025', time:'2:00 PM',  status:'pending',   type:'Diabetes Review' },
  { id:3, patientName:'Robert Smith', date:'Aug 23, 2025', time:'9:00 AM',  status:'confirmed', type:'Urgent Review' },
  { id:4, patientName:'Linda Chen',   date:'Aug 24, 2025', time:'11:00 AM', status:'pending',   type:'Arrhythmia Check' },
  { id:5, patientName:'James Wilson', date:'Aug 20, 2025', time:'3:00 PM',  status:'completed', type:'COPD Follow-up' },
]

const statusConfig = { confirmed:'cl-badge-success', pending:'cl-badge-warning', completed:'cl-badge-teal', cancelled:'cl-badge-danger' }

export default function DoctorAppointments() {
  const [appts, setAppts] = useState(APPTS)

  const accept = (id) => setAppts(a => a.map(x => x.id === id ? {...x, status:'confirmed'} : x))
  const reject = (id) => setAppts(a => a.map(x => x.id === id ? {...x, status:'cancelled'} : x))

  return (
    <div className="cl-layout">
      <Sidebar />
      <div className="cl-main">
        <Navbar title="Appointments" />
        <div className="cl-page">
          <div className="cl-page-header">
            <h1 style={{ fontSize:'1.75rem' }}>📆 Appointment Management</h1>
            <p>Review, accept, and manage patient consultation requests</p>
          </div>

          <div style={{ display:'flex', gap:'1rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
            {[['📅','Confirmed',appts.filter(a=>a.status==='confirmed').length,'cl-badge-success'],
              ['⏳','Pending',appts.filter(a=>a.status==='pending').length,'cl-badge-warning'],
              ['✔','Completed',appts.filter(a=>a.status==='completed').length,'cl-badge-teal']].map(([icon,label,count,badge]) => (
              <div key={label} className="cl-card" style={{ flex:'1 1 160px', textAlign:'center' }}>
                <div style={{ fontSize:'1.5rem', marginBottom:'0.5rem' }}>{icon}</div>
                <div style={{ fontFamily:'var(--cl-font-heading)', fontSize:'1.75rem', fontWeight:800, color:'var(--cl-white)', marginBottom:'0.25rem' }}>{count}</div>
                <span className={`cl-badge ${badge}`}>{label}</span>
              </div>
            ))}
          </div>

          <div className="cl-card">
            <div className="cl-table-wrap">
              <table className="cl-table">
                <thead><tr><th>Patient</th><th>Type</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {appts.map(a => (
                    <tr key={a.id}>
                      <td style={{ fontWeight:600, color:'var(--cl-white)' }}>👤 {a.patientName}</td>
                      <td>{a.type}</td>
                      <td>📅 {a.date}</td>
                      <td>🕐 {a.time}</td>
                      <td><span className={`cl-badge ${statusConfig[a.status]}`}>{a.status}</span></td>
                      <td>
                        <div style={{ display:'flex', gap:'0.5rem' }}>
                          {a.status === 'pending' && (<>
                            <button className="cl-btn cl-btn-success cl-btn-sm" onClick={() => accept(a.id)}>✓ Accept</button>
                            <button className="cl-btn cl-btn-danger  cl-btn-sm" onClick={() => reject(a.id)}>✕ Reject</button>
                          </>)}
                          {a.status === 'confirmed' && (
                            <button className="cl-btn cl-btn-primary cl-btn-sm">📹 Start</button>
                          )}
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
