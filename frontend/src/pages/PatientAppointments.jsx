import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer  from '../components/Footer'
import { useState } from 'react'

const doctors = ['Dr. Sarah Chen - Cardiology', 'Dr. Mike Ross - General Practice', 'Dr. James Park - Radiology']
const times = ['9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM','5:00 PM']

const MOCK = [
  { id:1, doctorName:'Dr. Sarah Chen', date:'Aug 22, 2025', time:'10:00 AM', status:'confirmed', type:'Cardiology Follow-up' },
  { id:2, doctorName:'Dr. Mike Ross',  date:'Aug 25, 2025', time:'2:00 PM',  status:'scheduled', type:'General Check-up' },
  { id:3, doctorName:'Dr. James Park', date:'Aug 10, 2025', time:'11:00 AM', status:'completed', type:'Radiology Review' },
  { id:4, doctorName:'Dr. Sarah Chen', date:'Jul 30, 2025', time:'3:00 PM',  status:'cancelled', type:'Cardiology' },
]

export default function PatientAppointments() {
  const [appts, setAppts] = useState(MOCK)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ doctor:'', date:'', time:'', type:'Consultation' })

  const book = () => {
    if (!form.doctor || !form.date || !form.time) return
    setAppts(a => [...a, { id: Date.now(), doctorName: form.doctor.split(' - ')[0], date: form.date, time: form.time, status:'pending', type: form.type }])
    setShowModal(false); setForm({ doctor:'', date:'', time:'', type:'Consultation' })
  }

  const cancel = (id) => setAppts(a => a.map(x => x.id === id ? { ...x, status:'cancelled' } : x))

  const statusColor = { confirmed:'cl-badge-success', scheduled:'cl-badge-primary', pending:'cl-badge-warning', cancelled:'cl-badge-danger', completed:'cl-badge-teal' }

  return (
    <div className="cl-layout">
      <Sidebar />
      <div className="cl-main">
        <Navbar title="Appointments" />
        <div className="cl-page">
          <div className="cl-page-header" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
            <div>
              <h1 style={{ fontSize:'1.75rem' }}>📅 My Appointments</h1>
              <p>Manage your doctor consultations via RDS PostgreSQL backend</p>
            </div>
            <button className="cl-btn cl-btn-primary" onClick={() => setShowModal(true)}>+ Book Appointment</button>
          </div>

          <div className="cl-card">
            <div className="cl-table-wrap">
              <table className="cl-table">
                <thead><tr><th>Type</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {appts.map(a => (
                    <tr key={a.id}>
                      <td style={{ fontWeight:600, color:'var(--cl-white)' }}>{a.type}</td>
                      <td style={{ color:'var(--cl-teal)' }}>👨‍⚕️ {a.doctorName}</td>
                      <td>📅 {a.date}</td>
                      <td>🕐 {a.time}</td>
                      <td><span className={`cl-badge ${statusColor[a.status]}`}>{a.status}</span></td>
                      <td>
                        {(a.status === 'scheduled' || a.status === 'pending') && (
                          <button className="cl-btn cl-btn-danger cl-btn-sm" onClick={() => cancel(a.id)}>Cancel</button>
                        )}
                        {a.status === 'confirmed' && (
                          <button className="cl-btn cl-btn-primary cl-btn-sm">📹 Join</button>
                        )}
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

      {/* Book Modal */}
      {showModal && (
        <div className="cl-modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="cl-modal">
            <div className="cl-modal-header">
              <h3 style={{ margin:0 }}>📅 Book Appointment</h3>
              <button className="cl-btn cl-btn-ghost cl-btn-sm" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="cl-form-group">
              <label className="cl-label">Select Doctor</label>
              <select className="cl-select" value={form.doctor} onChange={e => setForm(f => ({...f, doctor:e.target.value}))}>
                <option value="">Choose a doctor…</option>
                {doctors.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="cl-form-group">
              <label className="cl-label">Appointment Type</label>
              <input className="cl-input" type="text" placeholder="e.g. Cardiology Follow-up" value={form.type} onChange={e => setForm(f => ({...f, type:e.target.value}))} />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
              <div className="cl-form-group">
                <label className="cl-label">Date</label>
                <input className="cl-input" type="date" value={form.date} onChange={e => setForm(f => ({...f, date:e.target.value}))} />
              </div>
              <div className="cl-form-group">
                <label className="cl-label">Time</label>
                <select className="cl-select" value={form.time} onChange={e => setForm(f => ({...f, time:e.target.value}))}>
                  <option value="">Select time…</option>
                  {times.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display:'flex', gap:'0.75rem', justifyContent:'flex-end' }}>
              <button className="cl-btn cl-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="cl-btn cl-btn-primary" onClick={book}>Book Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
