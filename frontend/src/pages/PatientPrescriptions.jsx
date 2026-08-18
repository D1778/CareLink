import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer  from '../components/Footer'

const prescriptions = [
  { id:'RX001', medicine:'Lisinopril',   dosage:'10mg',  frequency:'Once daily (morning)',  doctor:'Dr. Sarah Chen', start:'Aug 1, 2025',  end:'Dec 31, 2025', status:'active',    instructions:'Take with water, avoid high-potassium foods' },
  { id:'RX002', medicine:'Aspirin',      dosage:'81mg',  frequency:'Once daily (morning)',  doctor:'Dr. Sarah Chen', start:'Aug 1, 2025',  end:'Dec 31, 2025', status:'active',    instructions:'Take with food to avoid stomach irritation' },
  { id:'RX003', medicine:'Atorvastatin', dosage:'20mg',  frequency:'Once daily (evening)',  doctor:'Dr. Mike Ross',  start:'Jul 15, 2025', end:'Jan 15, 2026', status:'active',    instructions:'Avoid grapefruit juice' },
  { id:'RX004', medicine:'Metformin',    dosage:'500mg', frequency:'Twice daily (meals)',   doctor:'Dr. Mike Ross',  start:'Jun 1, 2025',  end:'Sep 1, 2025',  status:'completed', instructions:'Take during meals' },
  { id:'RX005', medicine:'Amoxicillin',  dosage:'500mg', frequency:'3× daily for 7 days',  doctor:'Dr. James Park', start:'May 10, 2025', end:'May 17, 2025', status:'completed', instructions:'Complete the full course' },
]

export default function PatientPrescriptions() {
  return (
    <div className="cl-layout">
      <Sidebar />
      <div className="cl-main">
        <Navbar title="Prescriptions" />
        <div className="cl-page">
          <div className="cl-page-header">
            <h1 style={{ fontSize:'1.75rem' }}>💊 My Prescriptions</h1>
            <p>Digital prescriptions stored securely — always accessible</p>
          </div>

          <div style={{ display:'flex', gap:'1rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
            {[['💊','Active',3,'cl-badge-success'],['✔','Completed',2,'cl-badge-teal'],['📋','Total',5,'cl-badge-primary']].map(([icon,label,count,badge]) => (
              <div key={label} className="cl-card" style={{ flex:'1 1 160px', textAlign:'center' }}>
                <div style={{ fontSize:'1.75rem', marginBottom:'0.5rem' }}>{icon}</div>
                <div style={{ fontFamily:'var(--cl-font-heading)', fontSize:'1.75rem', fontWeight:800, color:'var(--cl-white)', marginBottom:'0.25rem' }}>{count}</div>
                <span className={`cl-badge ${badge}`}>{label}</span>
              </div>
            ))}
          </div>

          <div className="cl-card">
            <div className="cl-table-wrap">
              <table className="cl-table">
                <thead><tr><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Doctor</th><th>Start</th><th>End</th><th>Status</th></tr></thead>
                <tbody>
                  {prescriptions.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ fontWeight:700, color:'var(--cl-white)' }}>{p.medicine}</div>
                        <div style={{ fontSize:'0.72rem', color:'var(--cl-text-dim)', marginTop:2 }}>{p.instructions}</div>
                      </td>
                      <td><span style={{ fontWeight:600, color:'var(--cl-amber)' }}>{p.dosage}</span></td>
                      <td style={{ fontSize:'0.8rem' }}>{p.frequency}</td>
                      <td style={{ fontSize:'0.8rem', color:'var(--cl-teal)' }}>👨‍⚕️ {p.doctor}</td>
                      <td style={{ fontSize:'0.78rem', color:'var(--cl-text-muted)' }}>{p.start}</td>
                      <td style={{ fontSize:'0.78rem', color:'var(--cl-text-muted)' }}>{p.end}</td>
                      <td><span className={`cl-badge ${p.status === 'active' ? 'cl-badge-success' : 'cl-badge-teal'}`}>{p.status}</span></td>
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
