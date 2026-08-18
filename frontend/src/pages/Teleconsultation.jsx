import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer  from '../components/Footer'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Teleconsultation() {
  const { user } = useAuth()
  const [muted, setMuted]   = useState(false)
  const [camOff, setCamOff] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [inCall, setInCall]  = useState(false)
  const [chat, setChat]     = useState([
    { sender:'System', msg:'Secure Amazon Chime SDK session initialized. Waiting for participants…', time:'Now' }
  ])
  const [chatInput, setChatInput] = useState('')

  useEffect(() => {
    if (!inCall) return
    const id = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(id)
  }, [inCall])

  const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`

  const sendChat = () => {
    if (!chatInput.trim()) return
    setChat(c => [...c, { sender: user?.name || 'You', msg: chatInput, time: new Date().toLocaleTimeString('en',{hour:'2-digit',minute:'2-digit'}) }])
    setChatInput('')
  }

  return (
    <div className="cl-layout">
      <Sidebar />
      <div className="cl-main">
        <Navbar title="Teleconsultation" />
        <div className="cl-page">
          <div className="cl-page-header">
            <h1 style={{ fontSize:'1.75rem' }}>📹 Teleconsultation</h1>
            <p>Powered by Amazon Chime SDK — End-to-end encrypted HD video</p>
          </div>

          {/* AWS banner */}
          <div className="cl-alert cl-alert-info" style={{ marginBottom:'1.5rem' }}>
            🔐 Session is encrypted using Amazon Chime SDK. All recordings stored securely on Amazon S3.
            {inCall && <span style={{ marginLeft:'1rem', color:'var(--cl-green)', fontWeight:700 }}>● LIVE — {fmt(elapsed)}</span>}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:'1.5rem' }}>
            {/* Video area */}
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {/* Main video */}
              <div style={{
                background: camOff ? 'var(--cl-surface-2)' : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                borderRadius:'var(--cl-radius-xl)', border:'1px solid var(--cl-border)',
                aspectRatio:'16/9', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                position:'relative', overflow:'hidden', minHeight:380
              }}>
                {!inCall ? (
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontSize:'4rem', marginBottom:'1rem', animation:'float 3s ease-in-out infinite' }}>📹</div>
                    <h3 style={{ marginBottom:'0.5rem' }}>Ready to Connect</h3>
                    <p style={{ maxWidth:300, margin:'0 auto 1.5rem', fontSize:'0.875rem' }}>
                      Join the secure Amazon Chime SDK session to begin your consultation
                    </p>
                    <button className="cl-btn cl-btn-primary cl-btn-lg" onClick={() => { setInCall(true); setElapsed(0) }}>
                      📹 Join Session
                    </button>
                  </div>
                ) : camOff ? (
                  <div style={{ textAlign:'center' }}>
                    <div style={{ width:80, height:80, borderRadius:'50%', background:'var(--cl-surface-3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.5rem', margin:'0 auto 1rem' }}>
                      {user?.avatar}
                    </div>
                    <p style={{ color:'var(--cl-text-muted)', fontSize:'0.875rem' }}>Camera is off</p>
                  </div>
                ) : (
                  <div style={{ width:'100%', height:'100%', position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {/* Simulated video */}
                    <div style={{
                      background:'linear-gradient(135deg, #1e3a5f 0%, #0f2340 100%)',
                      width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center',
                      position:'absolute', inset:0
                    }}>
                      <div style={{ textAlign:'center', opacity:0.6 }}>
                        <div style={{ fontSize:'5rem' }}>{user?.role === 'PATIENT' ? '👨‍⚕️' : '👤'}</div>
                        <p style={{ fontSize:'0.875rem', color:'rgba(255,255,255,0.5)' }}>
                          {user?.role === 'PATIENT' ? 'Dr. Sarah Chen' : 'Alex Johnson'}
                        </p>
                      </div>
                    </div>
                    {/* Self-view pip */}
                    <div style={{
                      position:'absolute', bottom:12, right:12, width:140, height:90,
                      background:'var(--cl-surface-3)', borderRadius:'var(--cl-radius-md)',
                      border:'2px solid var(--cl-border-bright)', display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'2rem'
                    }}>{user?.avatar}</div>
                    {/* Status bar */}
                    <div style={{ position:'absolute', top:12, left:12, display:'flex', alignItems:'center', gap:'0.5rem' }}>
                      <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--cl-red)', animation:'pulse-ring 2s infinite' }} />
                      <span style={{ fontSize:'0.75rem', background:'rgba(0,0,0,0.6)', color:'#fff', padding:'2px 8px', borderRadius:4, fontWeight:600 }}>LIVE {fmt(elapsed)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              {inCall && (
                <div style={{
                  display:'flex', alignItems:'center', justifyContent:'center', gap:'1rem',
                  background:'var(--cl-surface)', border:'1px solid var(--cl-border)', borderRadius:'var(--cl-radius-xl)',
                  padding:'1rem 2rem', flexWrap:'wrap'
                }}>
                  <button className={`cl-btn ${muted ? 'cl-btn-danger' : 'cl-btn-secondary'} cl-btn-icon`} onClick={() => setMuted(m => !m)} title={muted ? 'Unmute' : 'Mute'} style={{ borderRadius:'50%', width:48, height:48, fontSize:'1.25rem' }}>
                    {muted ? '🔇' : '🎤'}
                  </button>
                  <button className={`cl-btn ${camOff ? 'cl-btn-danger' : 'cl-btn-secondary'} cl-btn-icon`} onClick={() => setCamOff(c => !c)} title={camOff ? 'Turn on camera' : 'Turn off camera'} style={{ borderRadius:'50%', width:48, height:48, fontSize:'1.25rem' }}>
                    {camOff ? '📷' : '📹'}
                  </button>
                  <button className="cl-btn cl-btn-secondary cl-btn-icon" title="Share screen" style={{ borderRadius:'50%', width:48, height:48, fontSize:'1.25rem' }}>🖥️</button>
                  <button className="cl-btn cl-btn-secondary cl-btn-icon" title="Record" style={{ borderRadius:'50%', width:48, height:48, fontSize:'1.25rem' }}>⏺</button>
                  <button className="cl-btn cl-btn-danger" style={{ borderRadius:'var(--cl-radius-full)', padding:'0.75rem 2rem', fontSize:'0.875rem', fontWeight:700 }} onClick={() => { setInCall(false); setElapsed(0) }}>
                    📞 End Call
                  </button>
                </div>
              )}
            </div>

            {/* Chat panel */}
            <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              <div className="cl-card" style={{ flex:1, display:'flex', flexDirection:'column' }}>
                <h4 style={{ marginBottom:'0.75rem' }}>💬 Session Chat</h4>
                <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:'0.625rem', minHeight:300, maxHeight:380 }}>
                  {chat.map((c, i) => (
                    <div key={i} style={{ background:'var(--cl-surface-2)', borderRadius:'var(--cl-radius-md)', padding:'0.625rem 0.875rem' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.2rem' }}>
                        <span style={{ fontSize:'0.72rem', fontWeight:700, color:'var(--cl-primary-light)' }}>{c.sender}</span>
                        <span style={{ fontSize:'0.65rem', color:'var(--cl-text-dim)' }}>{c.time}</span>
                      </div>
                      <p style={{ margin:0, fontSize:'0.8rem', color:'var(--cl-text)' }}>{c.msg}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display:'flex', gap:'0.5rem', marginTop:'0.75rem' }}>
                  <input className="cl-input" type="text" placeholder="Type message…" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key==='Enter' && sendChat()} style={{ fontSize:'0.8rem' }} />
                  <button className="cl-btn cl-btn-primary cl-btn-sm" onClick={sendChat}>↑</button>
                </div>
              </div>

              {/* Session info */}
              <div className="cl-card">
                <h4 style={{ marginBottom:'0.75rem', fontSize:'0.9rem' }}>📋 Session Info</h4>
                {[
                  ['👤','Patient', user?.role === 'PATIENT' ? user.name : 'Alex Johnson'],
                  ['👨‍⚕️','Doctor', user?.role === 'DOCTOR'  ? user.name : 'Dr. Sarah Chen'],
                  ['🔐','Encryption','AES-256 E2E'],
                  ['☁️','Platform','Amazon Chime SDK'],
                ].map(([icon,label,value]) => (
                  <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'0.375rem 0', borderBottom:'1px solid var(--cl-border)', fontSize:'0.78rem' }}>
                    <span style={{ color:'var(--cl-text-muted)' }}>{icon} {label}</span>
                    <span style={{ color:'var(--cl-text)', fontWeight:500 }}>{value}</span>
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
