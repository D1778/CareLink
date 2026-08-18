import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ROLES = [
  { id:'PATIENT', icon:'👤', label:'Patient',  color:'var(--cl-primary)', hint:'patient@care.com' },
  { id:'DOCTOR',  icon:'👨‍⚕️', label:'Doctor',   color:'var(--cl-teal)',   hint:'doctor@care.com' },
  { id:'ADMIN',   icon:'🛡️', label:'Admin',    color:'var(--cl-purple)', hint:'admin@care.com' },
]

export default function Login() {
  const { login } = useAuth()
  const navigate   = useNavigate()
  const [role, setRole]     = useState('PATIENT')
  const [email, setEmail]   = useState('')
  const [pass, setPass]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  const selectedRole = ROLES.find(r => r.id === role)

  const autofill = (hint) => { setEmail(hint); setPass('demo123') }

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const user = await login(email, pass)
      const map = { PATIENT:'/patient/dashboard', DOCTOR:'/doctor/dashboard', ADMIN:'/admin/dashboard' }
      navigate(map[user.role] || '/')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--cl-bg)', padding:'1rem', position:'relative', overflow:'hidden' }}>
      {/* BG glows */}
      <div style={{ position:'fixed', top:'-20%', left:'-10%', width:'60%', height:'60%', borderRadius:'50%', background:'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'fixed', bottom:'-20%', right:'-10%', width:'60%', height:'60%', borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', pointerEvents:'none' }} />

      <div style={{ width:'100%', maxWidth:480, position:'relative', zIndex:1 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <Link to="/" style={{ textDecoration:'none' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'0.75rem' }}>
              <div style={{ width:44, height:44, borderRadius:10, background:'var(--cl-grad-primary)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', boxShadow:'var(--cl-shadow-glow)' }}>🏥</div>
              <span style={{ fontFamily:'var(--cl-font-heading)', fontWeight:800, fontSize:'1.5rem', color:'var(--cl-white)' }}>CareLink</span>
            </div>
          </Link>
          <p style={{ marginTop:'0.5rem', fontSize:'0.875rem' }}>Sign in to your healthcare portal</p>
        </div>

        {/* Card */}
        <div className="glass-bright" style={{ borderRadius:'var(--cl-radius-xl)', padding:'2rem', boxShadow:'var(--cl-shadow-lg)' }}>
          {/* Role tabs */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'0.5rem', marginBottom:'1.75rem' }}>
            {ROLES.map(r => (
              <button key={r.id} onClick={() => { setRole(r.id); setEmail(''); setPass('') }} style={{
                padding:'0.625rem 0.5rem', borderRadius:'var(--cl-radius-md)', border:'1px solid',
                cursor:'pointer', fontFamily:'var(--cl-font-body)', fontSize:'0.8rem', fontWeight:600,
                transition:'var(--cl-transition)', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.25rem',
                background: role === r.id ? `${r.color}18` : 'var(--cl-surface-2)',
                borderColor: role === r.id ? `${r.color}55` : 'var(--cl-border)',
                color: role === r.id ? r.color : 'var(--cl-text-muted)',
              }}>
                <span style={{ fontSize:'1.2rem' }}>{r.icon}</span>
                {r.label}
              </button>
            ))}
          </div>

          {/* Demo hint */}
          <div style={{ background:'rgba(59,130,246,0.08)', border:'1px solid rgba(59,130,246,0.2)', borderRadius:'var(--cl-radius-md)', padding:'0.75rem 1rem', marginBottom:'1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'0.5rem' }}>
            <div style={{ fontSize:'0.78rem', color:'var(--cl-text-muted)' }}>
              <span style={{ color:'var(--cl-primary-light)', fontWeight:600 }}>Demo:</span> {selectedRole.hint} / any password
            </div>
            <button className="cl-btn cl-btn-primary cl-btn-sm" onClick={() => autofill(selectedRole.hint)}>Autofill</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="cl-form-group">
              <label className="cl-label">Email Address</label>
              <div className="cl-input-icon">
                <span className="icon">📧</span>
                <input id="login-email" type="email" className="cl-input" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className="cl-form-group">
              <label className="cl-label">Password</label>
              <div className="cl-input-icon">
                <span className="icon">🔒</span>
                <input id="login-password" type="password" className="cl-input" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} required />
              </div>
            </div>

            {error && <div className="cl-alert cl-alert-danger" style={{ marginBottom:'1rem' }}>⚠ {error}</div>}

            <button id="login-submit" type="submit" className="cl-btn cl-btn-primary" disabled={loading} style={{ width:'100%', justifyContent:'center', padding:'0.875rem', fontSize:'1rem' }}>
              {loading ? <span style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}><span style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block', animation:'spin 1s linear infinite' }} />Signing in…</span> : `Sign in as ${selectedRole.label} →`}
            </button>
          </form>

          <div className="cl-divider" />
          <p style={{ textAlign:'center', fontSize:'0.85rem', margin:0 }}>
            Don't have an account? <Link to="/register" style={{ color:'var(--cl-primary-light)', fontWeight:600 }}>Create one →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
