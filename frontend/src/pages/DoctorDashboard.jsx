import Navbar  from '../components/Navbar'
import Sidebar  from '../components/Sidebar'
import Footer   from '../components/Footer'
import PatientCard from '../components/PatientCard'
import AlertCard from '../components/AlertCard'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

const patients = [
  { id:'P001', name:'Alex Johnson',   age:34, condition:'Hypertension',    heartRate:78,  bloodPressure:'120/80', status:'stable' },
  { id:'P002', name:'Maria Garcia',   age:58, condition:'Diabetes Type 2', heartRate:92,  bloodPressure:'145/95', status:'warning' },
  { id:'P003', name:'Robert Smith',   age:67, condition:'Heart Failure',   heartRate:108, bloodPressure:'160/105',status:'critical' },
  { id:'P004', name:'Linda Chen',     age:45, condition:'Arrhythmia',      heartRate:85,  bloodPressure:'128/82', status:'stable' },
]

const recentAlerts = [
  { id:1, severity:'critical', title:'Critical: High Heart Rate', message:'Robert Smith — HR reached 108 BPM. Immediate attention required.', timestamp:'5 mins ago' },
  { id:2, severity:'warning',  title:'Warning: BP Elevated',     message:'Maria Garcia — BP at 145/95 mmHg, above normal range.',          timestamp:'20 mins ago' },
]

const stats = [
  { icon:'👥', label:'Total Patients',        value:4,  color:'var(--cl-primary)', gradient:'var(--cl-grad-primary)' },
  { icon:'📅', label:"Today's Appointments",  value:3,  color:'var(--cl-teal)',   gradient:'var(--cl-grad-green)' },
  { icon:'🚨', label:'Critical Alerts',       value:1,  color:'var(--cl-red)',    gradient:'var(--cl-grad-amber)' },
  { icon:'📹', label:'Pending Consultations', value:2,  color:'var(--cl-purple)', gradient:'var(--cl-grad-purple)' },
]

export default function DoctorDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [alerts, setAlerts] = useState(recentAlerts)

  return (
    <div className="cl-layout">
      <Sidebar />
      <div className="cl-main">
        <Navbar title="Doctor Dashboard" />
        <div className="cl-page">

          {/* Welcome */}
          <div style={{
            background:'linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(59,130,246,0.08) 100%)',
            border:'1px solid rgba(6,182,212,0.25)', borderRadius:'var(--cl-radius-xl)',
            padding:'1.75rem 2rem', marginBottom:'2rem',
            display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem'
          }}>
            <div>
              <h2 style={{ margin:'0 0 0.25rem' }}>Good morning, {user?.name} 👋</h2>
              <p style={{ margin:0, fontSize:'0.875rem' }}>You have <strong style={{ color:'var(--cl-amber)' }}>1 critical alert</strong> and <strong style={{ color:'var(--cl-teal)' }}>3 appointments</strong> today</p>
            </div>
            <button className="cl-btn cl-btn-primary" onClick={() => navigate('/doctor/patients')}>View All Patients →</button>
          </div>

          {/* Stats */}
          <div className="cl-stats-grid" style={{ marginBottom:'2rem' }}>
            {stats.map((s, i) => (
              <div key={i} className="cl-stat-card animate-fadeInUp" style={{ animationDelay:`${i*0.1}s` }}>
                <div className="accent-bar" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                <div className="stat-icon" style={{ background:`${s.color}18`, border:`1px solid ${s.color}33` }}>{s.icon}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:'1.5rem' }}>
            {/* Alerts */}
            <div>
              <h3 style={{ marginBottom:'1rem' }}>🚨 Critical Alerts</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {alerts.map(a => <AlertCard key={a.id} alert={a} onDismiss={id => setAlerts(al => al.filter(x => x.id !== id))} />)}
              </div>
            </div>

            {/* Patient list */}
            <div>
              <h3 style={{ marginBottom:'1rem' }}>👥 My Patients</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {patients.map(p => <PatientCard key={p.id} patient={p} onClick={id => navigate(`/doctor/patients/${id}`)} />)}
              </div>
            </div>
          </div>

        </div>
        <Footer />
      </div>
    </div>
  )
}
