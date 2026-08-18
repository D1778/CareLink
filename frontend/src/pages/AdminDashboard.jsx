import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer  from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const stats = [
  { icon:'👥', label:'Total Patients',    value:'1,248', change:'+12%', color:'var(--cl-primary)', gradient:'var(--cl-grad-primary)' },
  { icon:'👨‍⚕️', label:'Total Doctors',     value:'48',    change:'+3%',  color:'var(--cl-teal)',   gradient:'var(--cl-grad-green)' },
  { icon:'📅', label:'Total Appointments', value:'5,832', change:'+8%',  color:'var(--cl-purple)', gradient:'var(--cl-grad-purple)' },
  { icon:'👤', label:'Active Users',       value:'892',   change:'+15%', color:'var(--cl-green)',  gradient:'var(--cl-grad-green)' },
  { icon:'🚨', label:'Critical Alerts',   value:'7',     change:'-2',   color:'var(--cl-red)',    gradient:'var(--cl-grad-amber)' },
  { icon:'📹', label:'Teleconsults Today', value:'23',    change:'+5',   color:'var(--cl-amber)',  gradient:'var(--cl-grad-amber)' },
]

const recentActivity = [
  { icon:'🚨', msg:'Critical alert: Robert Smith HR 108 BPM', time:'5m', type:'critical' },
  { icon:'👤', msg:'New patient registered: Emma Davis',       time:'12m', type:'info' },
  { icon:'📅', msg:'Appointment confirmed: Dr. Chen / Alex Johnson', time:'18m', type:'success' },
  { icon:'💊', msg:'Prescription issued: Metformin for Maria Garcia', time:'25m', type:'info' },
  { icon:'📹', msg:'Teleconsult completed: Dr. Ross / James Wilson', time:'1h', type:'success' },
  { icon:'⚠️', msg:'Warning: SpO₂ alert for James Wilson',    time:'1h', type:'warning' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  return (
    <div className="cl-layout">
      <Sidebar />
      <div className="cl-main">
        <Navbar title="Admin Dashboard" />
        <div className="cl-page">

          {/* Header */}
          <div style={{
            background:'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(59,130,246,0.08) 100%)',
            border:'1px solid rgba(139,92,246,0.25)', borderRadius:'var(--cl-radius-xl)',
            padding:'1.75rem 2rem', marginBottom:'2rem',
            display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem'
          }}>
            <div>
              <h2 style={{ margin:'0 0 0.25rem' }}>🛡️ Admin Control Center</h2>
              <p style={{ margin:0, fontSize:'0.875rem' }}>System overview — CareLink Platform v1.0 | AWS Region: us-east-1</p>
            </div>
            <button className="cl-btn cl-btn-primary" onClick={() => navigate('/admin/reports')}>📊 View Reports →</button>
          </div>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'1.25rem', marginBottom:'2rem' }}>
            {stats.map((s, i) => (
              <div key={i} className="cl-stat-card animate-fadeInUp" style={{ animationDelay:`${i*0.08}s` }}>
                <div className="accent-bar" style={{ background:`linear-gradient(90deg, ${s.color}, transparent)` }} />
                <div className="stat-icon" style={{ background:`${s.color}18`, border:`1px solid ${s.color}33` }}>{s.icon}</div>
                <div className="stat-value">{s.value}</div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span className="stat-label">{s.label}</span>
                  <span style={{ fontSize:'0.72rem', fontWeight:700, color: s.change.startsWith('+') ? 'var(--cl-green)' : 'var(--cl-red)' }}>{s.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
            {/* Activity */}
            <div className="cl-card">
              <h3 style={{ marginBottom:'1rem' }}>📡 Live Activity Feed</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.625rem' }}>
                {recentActivity.map((a, i) => {
                  const colors = { critical:'var(--cl-red)', info:'var(--cl-primary-light)', success:'var(--cl-green)', warning:'var(--cl-amber)' }
                  return (
                    <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'0.75rem', padding:'0.625rem', borderRadius:'var(--cl-radius-md)', background:'var(--cl-surface-2)' }}>
                      <span style={{ fontSize:'1.1rem' }}>{a.icon}</span>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ margin:0, fontSize:'0.8rem', color:'var(--cl-text)', lineHeight:1.4 }}>{a.msg}</p>
                      </div>
                      <span style={{ fontSize:'0.7rem', color:'var(--cl-text-dim)', flexShrink:0 }}>{a.time}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick actions */}
            <div className="cl-card">
              <h3 style={{ marginBottom:'1rem' }}>⚡ Quick Actions</h3>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
                {[
                  { icon:'👥', label:'Manage Users',    path:'/admin/users',   color:'var(--cl-primary)' },
                  { icon:'📊', label:'View Reports',    path:'/admin/reports', color:'var(--cl-teal)' },
                  { icon:'🚨', label:'Critical Alerts', path:'/admin/users',   color:'var(--cl-red)' },
                  { icon:'☁️', label:'AWS Console',     path:'#',              color:'var(--cl-amber)' },
                ].map((a, i) => (
                  <button key={i} className="cl-btn cl-btn-secondary" onClick={() => navigate(a.path)} style={{
                    flexDirection:'column', gap:'0.5rem', padding:'1rem',
                    height:'auto', border:`1px solid ${a.color}22`,
                    background:`${a.color}08`
                  }}>
                    <span style={{ fontSize:'1.5rem' }}>{a.icon}</span>
                    <span style={{ fontSize:'0.8rem', color:'var(--cl-text-muted)' }}>{a.label}</span>
                  </button>
                ))}
              </div>

              <div className="cl-divider" />
              <div style={{ padding:'0.75rem', background:'var(--cl-surface-2)', borderRadius:'var(--cl-radius-md)' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.5rem' }}>
                  <span style={{ fontSize:'0.78rem', color:'var(--cl-text-muted)' }}>System Health</span>
                  <span style={{ fontSize:'0.78rem', color:'var(--cl-green)', fontWeight:600 }}>✓ All systems operational</span>
                </div>
                {[['ECS Fargate','99.9%','green'],['RDS PostgreSQL','99.8%','green'],['Lambda Functions','100%','green'],['Kinesis Stream','98.5%','amber']].map(([svc,pct,color]) => (
                  <div key={svc} style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginTop:'0.5rem' }}>
                    <span style={{ fontSize:'0.72rem', color:'var(--cl-text-muted)', width:130, flexShrink:0 }}>☁️ {svc}</span>
                    <div style={{ flex:1, height:4, background:'var(--cl-surface-3)', borderRadius:2, overflow:'hidden' }}>
                      <div style={{ width:pct, height:'100%', background:`var(--cl-${color})`, borderRadius:2 }} />
                    </div>
                    <span style={{ fontSize:'0.72rem', color:`var(--cl-${color})`, fontWeight:600, width:40, textAlign:'right' }}>{pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
        <Footer />
      </div>
    </div>
  )
}
