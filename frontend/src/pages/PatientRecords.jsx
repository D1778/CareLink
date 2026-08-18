import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer  from '../components/Footer'

const records = [
  { id:'REC001', type:'Lab Report',      title:'Complete Blood Count (CBC)',        doctor:'Dr. Sarah Chen', date:'Aug 15, 2025', size:'1.2 MB', icon:'🧪', tag:'lab' },
  { id:'REC002', type:'Medical History', title:'Hypertension Diagnosis & Treatment', doctor:'Dr. Sarah Chen', date:'Jul 20, 2025', size:'0.8 MB', icon:'📋', tag:'history' },
  { id:'REC003', type:'Lab Report',      title:'Lipid Panel Results',               doctor:'Dr. Mike Ross',  date:'Jul 10, 2025', size:'0.5 MB', icon:'🧪', tag:'lab' },
  { id:'REC004', type:'Doctor Notes',    title:'Cardiology Follow-up Notes',        doctor:'Dr. Sarah Chen', date:'Jun 28, 2025', size:'0.3 MB', icon:'📝', tag:'notes' },
  { id:'REC005', type:'Imaging',         title:'Chest X-Ray Report',                doctor:'Dr. James Park', date:'Jun 15, 2025', size:'8.4 MB', icon:'🩻', tag:'imaging' },
  { id:'REC006', type:'Lab Report',      title:'HbA1c Blood Sugar Level',           doctor:'Dr. Mike Ross',  date:'May 30, 2025', size:'0.4 MB', icon:'🧪', tag:'lab' },
]

const tagConfig = { lab:'cl-badge-teal', history:'cl-badge-purple', notes:'cl-badge-primary', imaging:'cl-badge-warning' }

export default function PatientRecords() {
  return (
    <div className="cl-layout">
      <Sidebar />
      <div className="cl-main">
        <Navbar title="Medical Records" />
        <div className="cl-page">
          <div className="cl-page-header" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
            <div>
              <h1 style={{ fontSize:'1.75rem' }}>📋 Medical Records</h1>
              <p>Securely stored on Amazon S3 with encrypted access</p>
            </div>
            <button className="cl-btn cl-btn-primary">⬆ Upload Document</button>
          </div>

          <div className="cl-alert cl-alert-info" style={{ marginBottom:'1.5rem' }}>
            ☁️ All documents are encrypted and stored on <strong>Amazon S3</strong> with granular IAM access control. Your data is HIPAA compliant.
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
            {records.map(r => (
              <div key={r.id} className="cl-card" style={{ display:'flex', alignItems:'center', gap:'1.25rem', flexWrap:'wrap' }}>
                <div style={{
                  width:52, height:52, borderRadius:'var(--cl-radius-md)', flexShrink:0,
                  background:'var(--cl-surface-3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem'
                }}>{r.icon}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.25rem', flexWrap:'wrap' }}>
                    <h4 style={{ margin:0, color:'var(--cl-white)', overflow:'hidden', textOverflow:'ellipsis' }}>{r.title}</h4>
                    <span className={`cl-badge ${tagConfig[r.tag] || 'cl-badge-primary'}`}>{r.type}</span>
                  </div>
                  <p style={{ fontSize:'0.78rem', margin:0 }}>👨‍⚕️ {r.doctor}  •  📅 {r.date}  •  📦 {r.size}</p>
                </div>
                <div style={{ display:'flex', gap:'0.5rem', flexShrink:0 }}>
                  <button className="cl-btn cl-btn-secondary cl-btn-sm">👁 View</button>
                  <button className="cl-btn cl-btn-ghost cl-btn-sm">⬇ Download</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
