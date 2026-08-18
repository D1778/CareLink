import Navbar  from '../components/Navbar'
import Sidebar  from '../components/Sidebar'
import Footer   from '../components/Footer'
import VitalCard from '../components/VitalCard'
import AlertCard from '../components/AlertCard'
import AppointmentCard from '../components/AppointmentCard'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const vitals = [
  { icon:'❤️',  label:'Heart Rate',     value:78,      unit:'BPM',  status:'normal',   trend:'stable' },
  { icon:'💙',  label:'Blood Pressure', value:'120/80', unit:'mmHg', status:'normal',   trend:'stable' },
  { icon:'🫁',  label:'SpO₂',           value:'98',    unit:'%',    status:'normal',   trend:'stable' },
]

const alerts = [
  { id:1, severity:'warning',  title:'Elevated Heart Rate',   message:'Heart rate reached 102 BPM at 14:30. Consider resting and monitoring.', timestamp:'Today, 2:30 PM' },
  { id:2, severity:'info',     title:'Medication Reminder',   message:'Time to take Lisinopril 10mg with water.',                              timestamp:'Today, 9:00 AM' },
]

const appointments = [
  { id:1, doctorName:'Dr. Sarah Chen', date:'Aug 22, 2025', time:'10:00 AM', status:'confirmed', type:'Cardiology Follow-up' },
  { id:2, doctorName:'Dr. Mike Ross',  date:'Aug 25, 2025', time:'2:00 PM',  status:'scheduled', type:'General Check-up' },
]

const prescriptions = [
  { name:'Lisinopril', dosage:'10mg', frequency:'Once daily', status:'active' },
  { name:'Aspirin',    dosage:'81mg', frequency:'Once daily', status:'active' },
]

export default function PatientDashboard() {
  const { user } = useAuth()
  const [dismissedAlerts, setDismissedAlerts] = useState([])
  const visibleAlerts = alerts.filter(a => !dismissedAlerts.includes(a.id))

  return (
    <div className="cl-layout">
      <Sidebar />
      <div className="cl-main">
        <Navbar title="Patient Dashboard" />
        <div className="cl-page" style={{ paddingTop:'2rem' }}>

          {/* Welcome banner */}
          <div style={{
            background:'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(6,182,212,0.1) 100%)',
            border:'1px solid rgba(59,130,246,0.25)', borderRadius:'var(--cl-radius-xl)',
            padding:'1.75rem 2rem', marginBottom:'2rem',
            display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem'
          }}>
            <div>
              <h2 style={{ margin:'0 0 0.25rem', fontSize:'1.5rem' }}>Welcome back, {user?.name?.split(' ')[0]} 👋</h2>
              <p style={{ margin:0, fontSize:'0.875rem' }}>Here's your health overview for today</p>
            </div>
            <div style={{ display:'flex', gap:'0.75rem' }}>
              <Link to="/patient/vitals" className="cl-btn cl-btn-primary">📊 View Vitals</Link>
              <Link to="/patient/teleconsult" className="cl-btn cl-btn-secondary">📹 Start Consult</Link>
            </div>
          </div>

          {/* Vitals */}
          <div style={{ marginBottom:'2rem' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem' }}>
              <h3 style={{ margin:0 }}>Current Vitals</h3>
              <Link to="/patient/vitals" style={{ fontSize:'0.8rem', color:'var(--cl-primary-light)' }}>View all →</Link>
            </div>
            <div className="cl-stats-grid">
              {vitals.map((v, i) => <VitalCard key={i} {...v} />)}
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', marginBottom:'2rem' }}>
            {/* Alerts */}
            <div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem' }}>
                <h3 style={{ margin:0 }}>Recent Alerts</h3>
                <span className="cl-badge cl-badge-warning">{visibleAlerts.length} active</span>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {visibleAlerts.length ? visibleAlerts.map(a => (
                  <AlertCard key={a.id} alert={a} onDismiss={id => setDismissedAlerts(d => [...d, id])} />
                )) : <p style={{ color:'var(--cl-text-muted)', fontSize:'0.875rem' }}>✓ No active alerts</p>}
              </div>
            </div>

            {/* Appointments */}
            <div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem' }}>
                <h3 style={{ margin:0 }}>Upcoming Appointments</h3>
                <Link to="/patient/appointments" style={{ fontSize:'0.8rem', color:'var(--cl-primary-light)' }}>View all →</Link>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {appointments.map(a => <AppointmentCard key={a.id} appointment={a} role="PATIENT" />)}
              </div>
            </div>
          </div>

          {/* Prescriptions quick view */}
          <div className="cl-card">
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem' }}>
              <h3 style={{ margin:0 }}>💊 Active Prescriptions</h3>
              <Link to="/patient/prescriptions" style={{ fontSize:'0.8rem', color:'var(--cl-primary-light)' }}>View all →</Link>
            </div>
            <div className="cl-table-wrap">
              <table className="cl-table">
                <thead><tr><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Status</th></tr></thead>
                <tbody>
                  {prescriptions.map((p, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight:600, color:'var(--cl-white)' }}>{p.name}</td>
                      <td>{p.dosage}</td>
                      <td>{p.frequency}</td>
                      <td><span className="cl-badge cl-badge-success">{p.status}</span></td>
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
