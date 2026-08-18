import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer  from '../components/Footer'
import { useState } from 'react'

const PATIENTS = ['Alex Johnson (P001)', 'Maria Garcia (P002)', 'Robert Smith (P003)', 'Linda Chen (P004)', 'James Wilson (P005)']
const MEDICINES = ['Lisinopril', 'Aspirin', 'Atorvastatin', 'Metformin', 'Furosemide', 'Carvedilol', 'Amoxicillin', 'Amlodipine', 'Bisoprolol']

const EXISTING = [
  { id:'RX001', patient:'Alex Johnson', medicine:'Lisinopril', dosage:'10mg', frequency:'Once daily', start:'Aug 1, 2025', end:'Dec 31, 2025', status:'active' },
  { id:'RX002', patient:'Maria Garcia', medicine:'Metformin',  dosage:'500mg', frequency:'Twice daily', start:'Aug 10, 2025', end:'Nov 10, 2025', status:'active' },
  { id:'RX003', patient:'Robert Smith', medicine:'Furosemide', dosage:'40mg', frequency:'Twice daily', start:'Aug 18, 2025', end:'Sep 18, 2025', status:'active' },
]

export default function DoctorPrescriptions() {
  const [prescriptions, setPrescriptions] = useState(EXISTING)
  const [form, setForm] = useState({ patient:'', medicine:'', dosage:'', frequency:'Once daily', start:'', end:'', instructions:'' })
  const [saved, setSaved] = useState(false)
  const set = (k, v) => setForm(f => ({...f, [k]:v}))

  const handleSave = (e) => {
    e.preventDefault()
    const newRx = { id:`RX${Date.now()}`, patient:form.patient.split(' (')[0], ...form, status:'active' }
    setPrescriptions(p => [newRx, ...p])
    setSaved(true)
    setForm({ patient:'', medicine:'', dosage:'', frequency:'Once daily', start:'', end:'', instructions:'' })
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="cl-layout">
      <Sidebar />
      <div className="cl-main">
        <Navbar title="Prescriptions" />
        <div className="cl-page">
          <div className="cl-page-header">
            <h1 style={{ fontSize:'1.75rem' }}>💊 Prescription Management</h1>
            <p>Write digital prescriptions — stored in RDS PostgreSQL</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'1.5rem' }}>
            {/* Writer */}
            <div className="cl-card">
              <h3 style={{ marginBottom:'1.5rem' }}>✍ Write New Prescription</h3>
              {saved && <div className="cl-alert cl-alert-success" style={{ marginBottom:'1rem' }}>✅ Prescription saved successfully!</div>}
              <form onSubmit={handleSave}>
                <div className="cl-form-group">
                  <label className="cl-label">Patient</label>
                  <select className="cl-select" value={form.patient} onChange={e => set('patient', e.target.value)} required>
                    <option value="">Select patient…</option>
                    {PATIENTS.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div className="cl-form-group">
                  <label className="cl-label">Medicine</label>
                  <select className="cl-select" value={form.medicine} onChange={e => set('medicine', e.target.value)} required>
                    <option value="">Select medicine…</option>
                    {MEDICINES.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                  <div className="cl-form-group">
                    <label className="cl-label">Dosage</label>
                    <input className="cl-input" type="text" placeholder="e.g. 10mg" value={form.dosage} onChange={e => set('dosage', e.target.value)} required />
                  </div>
                  <div className="cl-form-group">
                    <label className="cl-label">Frequency</label>
                    <select className="cl-select" value={form.frequency} onChange={e => set('frequency', e.target.value)}>
                      {['Once daily','Twice daily','Three times daily','As needed','Every 8 hours'].map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                  <div className="cl-form-group">
                    <label className="cl-label">Start Date</label>
                    <input className="cl-input" type="date" value={form.start} onChange={e => set('start', e.target.value)} required />
                  </div>
                  <div className="cl-form-group">
                    <label className="cl-label">End Date</label>
                    <input className="cl-input" type="date" value={form.end} onChange={e => set('end', e.target.value)} required />
                  </div>
                </div>
                <div className="cl-form-group">
                  <label className="cl-label">Instructions</label>
                  <textarea className="cl-textarea" style={{ minHeight:80 }} placeholder="Special instructions for the patient…" value={form.instructions} onChange={e => set('instructions', e.target.value)} />
                </div>
                <button type="submit" className="cl-btn cl-btn-primary" style={{ width:'100%', justifyContent:'center' }}>💾 Save Prescription</button>
              </form>
            </div>

            {/* List */}
            <div>
              <h3 style={{ marginBottom:'1rem' }}>📋 Recent Prescriptions</h3>
              <div className="cl-table-wrap" style={{ borderRadius:'var(--cl-radius-lg)', border:'1px solid var(--cl-border)' }}>
                <table className="cl-table">
                  <thead><tr><th>Patient</th><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Status</th></tr></thead>
                  <tbody>
                    {prescriptions.map(p => (
                      <tr key={p.id}>
                        <td style={{ fontWeight:600, color:'var(--cl-white)' }}>👤 {p.patient}</td>
                        <td style={{ color:'var(--cl-amber)' }}>💊 {p.medicine}</td>
                        <td>{p.dosage}</td>
                        <td style={{ fontSize:'0.78rem' }}>{p.frequency}</td>
                        <td><span className="cl-badge cl-badge-success">{p.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
