import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [step, setStep]   = useState(1)
  const [form, setForm]   = useState({ role:'PATIENT', name:'', email:'', password:'', confirm:'', phone:'', dob:'', specialty:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    setError(''); setLoading(true)
    try {
      const user = await register(form)
      const map = { PATIENT:'/patient/dashboard', DOCTOR:'/doctor/dashboard' }
      navigate(map[user.role] || '/')
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--cl-bg)', padding:'1rem', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'fixed', top:'-20%', right:'-10%', width:'50%', height:'50%', borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />

      <div style={{ width:'100%', maxWidth:520, position:'relative', zIndex:1 }}>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <Link to="/" style={{ textDecoration:'none' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'0.75rem' }}>
              <div style={{ width:44, height:44, borderRadius:10, background:'var(--cl-grad-primary)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', boxShadow:'var(--cl-shadow-glow)' }}>🏥</div>
              <span style={{ fontFamily:'var(--cl-font-heading)', fontWeight:800, fontSize:'1.5rem', color:'var(--cl-white)' }}>CareLink</span>
            </div>
          </Link>
          <p style={{ marginTop:'0.5rem', fontSize:'0.875rem' }}>Create your healthcare account</p>
        </div>

        <div className="glass-bright" style={{ borderRadius:'var(--cl-radius-xl)', padding:'2rem', boxShadow:'var(--cl-shadow-lg)' }}>
          {/* Progress */}
          <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'2rem' }}>
            {[1,2].map(s => (<>
              <div key={s} style={{ flex:1, height:4, borderRadius:2, background: step >= s ? 'var(--cl-grad-primary)' : 'var(--cl-surface-3)', transition:'background 0.3s' }} />
            </>))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="animate-fadeIn">
                <h3 style={{ marginBottom:'1.5rem', color:'var(--cl-white)' }}>Account Type & Info</h3>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem', marginBottom:'1.25rem' }}>
                  {[['PATIENT','👤','Patient'],['DOCTOR','👨‍⚕️','Doctor']].map(([r,icon,label]) => (
                    <button type="button" key={r} onClick={() => set('role', r)} style={{
                      padding:'1rem', borderRadius:'var(--cl-radius-md)', border:'1px solid',
                      cursor:'pointer', background: form.role===r ? 'rgba(59,130,246,0.15)' : 'var(--cl-surface-2)',
                      borderColor: form.role===r ? 'rgba(59,130,246,0.5)' : 'var(--cl-border)',
                      color: form.role===r ? 'var(--cl-primary-light)' : 'var(--cl-text-muted)',
                      fontFamily:'var(--cl-font-body)', fontWeight:600, fontSize:'0.9rem',
                      display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem'
                    }}>
                      <span style={{ fontSize:'1.75rem' }}>{icon}</span>{label}
                    </button>
                  ))}
                </div>
                <div className="cl-form-group">
                  <label className="cl-label">Full Name</label>
                  <input className="cl-input" type="text" placeholder="John Smith" value={form.name} onChange={e => set('name', e.target.value)} required />
                </div>
                <div className="cl-form-group">
                  <label className="cl-label">Email Address</label>
                  <input className="cl-input" type="email" placeholder="john@example.com" value={form.email} onChange={e => set('email', e.target.value)} required />
                </div>
                <div className="cl-form-group">
                  <label className="cl-label">Phone Number</label>
                  <input className="cl-input" type="tel" placeholder="+1 234 567 8900" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
                <button type="button" className="cl-btn cl-btn-primary" style={{ width:'100%', justifyContent:'center', padding:'0.875rem' }} onClick={() => { if(form.name && form.email) setStep(2); else setError('Please fill name and email') }}>
                  Continue →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fadeIn">
                <h3 style={{ marginBottom:'1.5rem', color:'var(--cl-white)' }}>Security & Details</h3>
                {form.role === 'PATIENT' && (
                  <div className="cl-form-group">
                    <label className="cl-label">Date of Birth</label>
                    <input className="cl-input" type="date" value={form.dob} onChange={e => set('dob', e.target.value)} />
                  </div>
                )}
                {form.role === 'DOCTOR' && (
                  <div className="cl-form-group">
                    <label className="cl-label">Specialty</label>
                    <select className="cl-select" value={form.specialty} onChange={e => set('specialty', e.target.value)}>
                      <option value="">Select specialty</option>
                      {['Cardiology','Neurology','Oncology','Pediatrics','General Practice','Orthopedics','Dermatology'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                )}
                <div className="cl-form-group">
                  <label className="cl-label">Password</label>
                  <input className="cl-input" type="password" placeholder="Min 8 characters" value={form.password} onChange={e => set('password', e.target.value)} required minLength={6} />
                </div>
                <div className="cl-form-group">
                  <label className="cl-label">Confirm Password</label>
                  <input className="cl-input" type="password" placeholder="Re-enter password" value={form.confirm} onChange={e => set('confirm', e.target.value)} required />
                </div>
                {error && <div className="cl-alert cl-alert-danger" style={{ marginBottom:'1rem' }}>⚠ {error}</div>}
                <div style={{ display:'flex', gap:'0.75rem' }}>
                  <button type="button" className="cl-btn cl-btn-secondary" onClick={() => setStep(1)}>← Back</button>
                  <button type="submit" className="cl-btn cl-btn-primary" disabled={loading} style={{ flex:1, justifyContent:'center' }}>
                    {loading ? 'Creating account…' : 'Create Account →'}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="cl-divider" />
          <p style={{ textAlign:'center', fontSize:'0.85rem', margin:0 }}>
            Already have an account? <Link to="/login" style={{ color:'var(--cl-primary-light)', fontWeight:600 }}>Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
