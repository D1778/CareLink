import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer  from '../components/Footer'
import VitalCard from '../components/VitalCard'
import AlertCard from '../components/AlertCard'
import { useParams, Link } from 'react-router-dom'

const PATIENTS = {
  P001: { id:'P001', name:'Alex Johnson',   age:34, gender:'Male',   condition:'Hypertension',    bloodType:'A+', phone:'+1 555-0101', email:'alex@example.com', lastVisit:'Aug 15, 2025' },
  P002: { id:'P002', name:'Maria Garcia',   age:58, gender:'Female', condition:'Diabetes Type 2', bloodType:'B-', phone:'+1 555-0102', email:'maria@example.com', lastVisit:'Aug 18, 2025' },
  P003: { id:'P003', name:'Robert Smith',   age:67, gender:'Male',   condition:'Heart Failure',   bloodType:'O+', phone:'+1 555-0103', email:'robert@example.com', lastVisit:'Aug 18, 2025' },
  P004: { id:'P004', name:'Linda Chen',     age:45, gender:'Female', condition:'Arrhythmia',      bloodType:'AB+',phone:'+1 555-0104', email:'linda@example.com', lastVisit:'Aug 12, 2025' },
  P005: { id:'P005', name:'James Wilson',   age:52, gender:'Male',   condition:'COPD',            bloodType:'A-', phone:'+1 555-0105', email:'james@example.com', lastVisit:'Aug 17, 2025' },
}

const vitals = [
  { icon:'❤️',  label:'Heart Rate',     value:108,     unit:'BPM',  status:'critical', trend:'up' },
  { icon:'💙',  label:'Blood Pressure', value:'160/105',unit:'mmHg', status:'critical', trend:'up' },
  { icon:'🫁',  label:'SpO₂',           value:'91',    unit:'%',    status:'critical', trend:'down' },
]

const alerts = [
  { id:1, severity:'critical', title:'Heart Rate Critical', message:'HR exceeded 105 BPM for >10 minutes. Immediate review needed.', timestamp:'5 mins ago' },
  { id:2, severity:'warning',  title:'SpO₂ Below Threshold', message:'Oxygen saturation dropped to 91%. Monitor closely.', timestamp:'12 mins ago' },
]

const history = [
  { date:'Aug 15, 2025', type:'Cardiology Follow-up', notes:'Patient stable. Continue current medications. Schedule ECG.' },
  { date:'Jul 28, 2025', type:'Emergency Visit', notes:'Acute hypertensive episode. BP 185/120. IV labetalol administered.' },
  { date:'Jun 30, 2025', type:'Routine Check',   notes:'All vitals within acceptable range. Adjusted Lisinopril dosage.' },
]

export default function DoctorPatientDetails() {
  const { id } = useParams()
  const patient = PATIENTS[id] || PATIENTS['P003']

  return (
    <div className="cl-layout">
      <Sidebar />
      <div className="cl-main">
        <Navbar title="Patient Details" />
        <div className="cl-page">

          {/* Back + Actions */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.5rem', flexWrap:'wrap', gap:'0.75rem' }}>
            <Link to="/doctor/patients" className="cl-btn cl-btn-ghost cl-btn-sm">← Back to Patients</Link>
            <div style={{ display:'flex', gap:'0.75rem' }}>
              <button className="cl-btn cl-btn-secondary cl-btn-sm">💊 Write Prescription</button>
              <button className="cl-btn cl-btn-primary cl-btn-sm">📹 Start Consultation</button>
            </div>
          </div>

          {/* Profile */}
          <div className="cl-card" style={{ marginBottom:'1.5rem', display:'flex', alignItems:'center', gap:'1.5rem', flexWrap:'wrap' }}>
            <div style={{ width:72, height:72, borderRadius:'50%', background:'var(--cl-surface-3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', flexShrink:0 }}>👤</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', flexWrap:'wrap', marginBottom:'0.5rem' }}>
                <h2 style={{ margin:0 }}>{patient.name}</h2>
                <span className="cl-badge cl-badge-danger">⚠ Critical</span>
              </div>
              <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap', fontSize:'0.875rem', color:'var(--cl-text-muted)' }}>
                <span>🎂 Age: {patient.age}</span>
                <span>⚧ {patient.gender}</span>
                <span>🩸 Blood Type: {patient.bloodType}</span>
                <span>📞 {patient.phone}</span>
                <span>📧 {patient.email}</span>
                <span>🏥 {patient.condition}</span>
              </div>
            </div>
          </div>

          {/* Vitals */}
          <h3 style={{ marginBottom:'1rem' }}>Current Vitals</h3>
          <div className="cl-stats-grid" style={{ marginBottom:'2rem' }}>
            {vitals.map((v, i) => <VitalCard key={i} {...v} />)}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', marginBottom:'1.5rem' }}>
            {/* Alerts */}
            <div>
              <h3 style={{ marginBottom:'1rem' }}>🚨 Active Alerts</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {alerts.map(a => <AlertCard key={a.id} alert={a} />)}
              </div>
            </div>

            {/* Prescriptions */}
            <div>
              <h3 style={{ marginBottom:'1rem' }}>💊 Current Prescriptions</h3>
              <div className="cl-card">
                {[
                  { name:'Lisinopril', dosage:'10mg', frequency:'Once daily' },
                  { name:'Furosemide', dosage:'40mg', frequency:'Twice daily' },
                  { name:'Carvedilol', dosage:'12.5mg', frequency:'Twice daily' },
                ].map((p, i) => (
                  <div key={i} style={{ padding:'0.75rem 0', borderBottom: i < 2 ? '1px solid var(--cl-border)' : 'none', display:'flex', justifyContent:'space-between' }}>
                    <div>
                      <span style={{ fontWeight:600, color:'var(--cl-white)' }}>{p.name}</span>
                      <span style={{ color:'var(--cl-text-muted)', fontSize:'0.8rem', marginLeft:'0.5rem' }}>{p.dosage}</span>
                    </div>
                    <span style={{ fontSize:'0.78rem', color:'var(--cl-text-muted)' }}>{p.frequency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* History */}
          <div className="cl-card">
            <h3 style={{ marginBottom:'1rem' }}>📋 Medical History</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {history.map((h, i) => (
                <div key={i} style={{ padding:'0.875rem', background:'var(--cl-surface-2)', borderRadius:'var(--cl-radius-md)', borderLeft:`3px solid var(--cl-primary)` }}>
                  <div style={{ display:'flex', gap:'0.75rem', marginBottom:'0.375rem', flexWrap:'wrap' }}>
                    <span style={{ fontSize:'0.75rem', color:'var(--cl-text-dim)' }}>📅 {h.date}</span>
                    <span className="cl-badge cl-badge-primary" style={{ fontSize:'0.65rem' }}>{h.type}</span>
                  </div>
                  <p style={{ margin:0, fontSize:'0.875rem', color:'var(--cl-text)' }}>{h.notes}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
        <Footer />
      </div>
    </div>
  )
}
