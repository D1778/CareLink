import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

const features = [
  { icon: '❤️', title: 'Remote Patient Monitoring', desc: 'Continuous real-time vital tracking via IoT sensors and Kinesis data streams. Get instant anomaly alerts.' },
  { icon: '📹', title: 'Teleconsultation', desc: 'HD video consultations powered by Amazon Chime SDK. Connect with certified specialists from anywhere.' },
  { icon: '📋', title: 'Medical Records', desc: 'Secure, centralized Electronic Health Records stored on Amazon S3 with granular access control.' },
  { icon: '📅', title: 'Smart Appointments', desc: 'AI-assisted scheduling with automated reminders via Amazon SNS. Never miss a consultation.' },
  { icon: '💊', title: 'Digital Prescriptions', desc: 'Paperless e-prescriptions with drug interaction checks and pharmacy integration.' },
  { icon: '📊', title: 'Health Analytics', desc: 'Powered by AWS analytics stack — trend analysis, predictive alerts, and detailed health insights.' },
]

const portals = [
  { role: 'PATIENT', icon: '👤', label: 'Patient Portal', color: 'var(--cl-primary)', gradient: 'var(--cl-grad-primary)', path: '/login', hint: 'patient@care.com' },
  { role: 'DOCTOR',  icon: '👨‍⚕️', label: 'Doctor Portal',  color: 'var(--cl-teal)',   gradient: 'var(--cl-grad-green)',  path: '/login', hint: 'doctor@care.com' },
  { role: 'ADMIN',   icon: '🛡️', label: 'Admin Portal',   color: 'var(--cl-purple)', gradient: 'var(--cl-grad-purple)', path: '/login', hint: 'admin@care.com' },
]

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      const map = { PATIENT:'/patient/dashboard', DOCTOR:'/doctor/dashboard', ADMIN:'/admin/dashboard' }
      navigate(map[user.role] || '/')
    }
  }, [user])

  return (
    <div style={{ minHeight:'100vh', background:'var(--cl-bg)', overflowX:'hidden' }}>
      {/* Background mesh */}
      <div style={{
        position:'fixed', inset:0, zIndex:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(59,130,246,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6,182,212,0.08) 0%, transparent 60%)'
      }} />

      {/* Nav */}
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        background:'rgba(10,13,20,0.85)', backdropFilter:'blur(16px)',
        borderBottom:'1px solid var(--cl-border)',
        padding:'0 2rem', height:64, display:'flex', alignItems:'center', justifyContent:'space-between'
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
          <div style={{
            width:36, height:36, borderRadius:8, background:'var(--cl-grad-primary)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem',
            boxShadow:'var(--cl-shadow-glow)'
          }}>🏥</div>
          <span style={{ fontFamily:'var(--cl-font-heading)', fontWeight:800, fontSize:'1.25rem', color:'var(--cl-white)' }}>CareLink</span>
        </div>
        <div style={{ display:'flex', gap:'0.75rem' }}>
          <Link to="/login" className="cl-btn cl-btn-ghost">Sign In</Link>
          <Link to="/register" className="cl-btn cl-btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position:'relative', zIndex:1, paddingTop:'140px', paddingBottom:'100px', textAlign:'center', padding:'140px 2rem 100px' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.3)', borderRadius:'var(--cl-radius-full)', padding:'0.4rem 1rem', marginBottom:'2rem', fontSize:'0.8rem', color:'var(--cl-primary-light)', fontWeight:600 }}>
          🚀 Powered by AWS Cloud Infrastructure
        </div>
        <h1 style={{ maxWidth:800, margin:'0 auto 1.5rem', fontFamily:'var(--cl-font-heading)', background:'linear-gradient(135deg, #fff 0%, #60a5fa 50%, #06b6d4 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
          The Future of Remote Patient Monitoring
        </h1>
        <p style={{ maxWidth:600, margin:'0 auto 3rem', fontSize:'1.1rem', color:'var(--cl-text-muted)', lineHeight:1.7 }}>
          CareLink connects patients, doctors, and healthcare systems through intelligent cloud technology — delivering real-time vitals, instant alerts, and seamless teleconsultations.
        </p>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/register" className="cl-btn cl-btn-primary cl-btn-lg" style={{ fontSize:'1rem' }}>Start Monitoring →</Link>
          <Link to="/login" className="cl-btn cl-btn-secondary cl-btn-lg" style={{ fontSize:'1rem' }}>Sign In</Link>
        </div>

        {/* Stats row */}
        <div style={{ display:'flex', gap:'3rem', justifyContent:'center', marginTop:'4rem', flexWrap:'wrap' }}>
          {[['10K+','Patients Monitored'],['500+','Certified Doctors'],['99.9%','Platform Uptime'],['< 2s','Alert Response']].map(([val,lbl]) => (
            <div key={lbl} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'var(--cl-font-heading)', fontSize:'2rem', fontWeight:800, color:'var(--cl-white)' }}>{val}</div>
              <div style={{ fontSize:'0.8rem', color:'var(--cl-text-muted)' }}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ position:'relative', zIndex:1, padding:'4rem 2rem', maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <h2 style={{ marginBottom:'0.75rem' }}>Everything You Need for <span style={{ color:'var(--cl-primary-light)' }}>Connected Care</span></h2>
          <p style={{ maxWidth:500, margin:'0 auto' }}>End-to-end healthcare platform built on AWS serverless architecture</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'1.5rem' }}>
          {features.map((f, i) => (
            <div key={i} className="cl-card animate-fadeInUp" style={{ animationDelay:`${i*0.1}s` }}>
              <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>{f.icon}</div>
              <h3 style={{ marginBottom:'0.5rem', fontSize:'1.1rem' }}>{f.title}</h3>
              <p style={{ fontSize:'0.875rem', margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Login Portals */}
      <section style={{ position:'relative', zIndex:1, padding:'4rem 2rem', maxWidth:1000, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <h2 style={{ marginBottom:'0.75rem' }}>Choose Your <span style={{ color:'var(--cl-teal)' }}>Portal</span></h2>
          <p>Select your role to access the CareLink platform</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.5rem' }}>
          {portals.map((p, i) => (
            <Link key={i} to={p.path} style={{ textDecoration:'none' }}>
              <div className="cl-card animate-fadeInUp" style={{
                textAlign:'center', cursor:'pointer', padding:'2.5rem 2rem',
                animationDelay:`${i*0.15}s`, borderColor:'transparent',
                background:`linear-gradient(145deg, var(--cl-surface) 0%, ${p.color}11 100%)`,
                border:`1px solid ${p.color}22`
              }}
              onMouseEnter={e => { e.currentTarget.style.border=`1px solid ${p.color}66`; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 12px 32px ${p.color}22` }}
              onMouseLeave={e => { e.currentTarget.style.border=`1px solid ${p.color}22`; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
              >
                <div style={{
                  width:72, height:72, borderRadius:'50%', margin:'0 auto 1.25rem',
                  background:`linear-gradient(135deg, ${p.color}33, ${p.color}11)`,
                  border:`2px solid ${p.color}44`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem'
                }}>{p.icon}</div>
                <h3 style={{ marginBottom:'0.5rem', color:'var(--cl-white)' }}>{p.label}</h3>
                <p style={{ fontSize:'0.8rem', margin:'0 0 1rem', color:'var(--cl-text-muted)' }}>Demo: {p.hint}</p>
                <span style={{
                  display:'inline-block', padding:'0.4rem 1.25rem',
                  background:p.gradient, borderRadius:'var(--cl-radius-full)',
                  color:'#fff', fontSize:'0.8rem', fontWeight:700
                }}>Login →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AWS Architecture Banner */}
      <section style={{ position:'relative', zIndex:1, padding:'4rem 2rem', background:'var(--cl-surface)', borderTop:'1px solid var(--cl-border)', borderBottom:'1px solid var(--cl-border)' }}>
        <div style={{ maxWidth:1000, margin:'0 auto', textAlign:'center' }}>
          <p style={{ fontSize:'0.75rem', color:'var(--cl-text-dim)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'2rem', fontWeight:600 }}>Powered by AWS Cloud Services</p>
          <div style={{ display:'flex', gap:'1.5rem', justifyContent:'center', flexWrap:'wrap' }}>
            {[['☁️','Amazon ECS Fargate'],['🗃️','Amazon RDS PostgreSQL'],['⚡','AWS Lambda'],['📡','Amazon Kinesis'],['🔔','Amazon SNS'],['📦','Amazon S3'],['🔐','Amazon Cognito'],['📹','Amazon Chime SDK']].map(([icon,label]) => (
              <div key={label} style={{
                display:'flex', alignItems:'center', gap:'0.5rem',
                background:'var(--cl-surface-2)', border:'1px solid var(--cl-border)',
                borderRadius:'var(--cl-radius-full)', padding:'0.4rem 0.875rem',
                fontSize:'0.78rem', color:'var(--cl-text-muted)'
              }}>
                <span>{icon}</span><span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding:'2rem', textAlign:'center', color:'var(--cl-text-dim)', fontSize:'0.8rem', position:'relative', zIndex:1 }}>
        <p>© 2025 CareLink Health Systems. All rights reserved.</p>
      </footer>
    </div>
  )
}
