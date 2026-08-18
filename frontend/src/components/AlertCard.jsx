import { useState } from 'react'

export default function AlertCard({ alert, onDismiss }) {
  const { id, severity = 'warning', title, message, timestamp } = alert
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const config = {
    critical: { color:'var(--cl-red)',   glow:'var(--cl-red-glow)',   icon:'🚨', class:'cl-badge-danger',  border:'rgba(239,68,68,0.3)',  bg:'rgba(239,68,68,0.08)' },
    warning:  { color:'var(--cl-amber)', glow:'var(--cl-amber-glow)', icon:'⚠️', class:'cl-badge-warning', border:'rgba(245,158,11,0.3)', bg:'rgba(245,158,11,0.08)' },
    info:     { color:'var(--cl-primary-light)', glow:'var(--cl-primary-glow)', icon:'ℹ️', class:'cl-badge-primary', border:'rgba(59,130,246,0.3)', bg:'rgba(59,130,246,0.08)' },
    success:  { color:'var(--cl-green)', glow:'var(--cl-green-glow)', icon:'✅', class:'cl-badge-success', border:'rgba(16,185,129,0.3)', bg:'rgba(16,185,129,0.08)' },
  }
  const c = config[severity] || config.warning

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.(id)
  }

  return (
    <div style={{
      background: c.bg, border:`1px solid ${c.border}`,
      borderRadius:'var(--cl-radius-md)', padding:'1rem 1.25rem',
      display:'flex', alignItems:'flex-start', gap:'0.875rem',
      animation:'fadeInUp 0.4s ease', boxShadow:`0 0 20px ${c.glow}`
    }}>
      <span style={{ fontSize:'1.25rem', flexShrink:0 }}>{c.icon}</span>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.25rem' }}>
          <span style={{ color:c.color, fontWeight:700, fontSize:'0.875rem' }}>{title}</span>
          <span className={`cl-badge ${c.class}`}>{severity}</span>
        </div>
        <p style={{ margin:0, fontSize:'0.8rem', color:'var(--cl-text-muted)', lineHeight:1.5 }}>{message}</p>
        {timestamp && <p style={{ margin:'0.25rem 0 0', fontSize:'0.72rem', color:'var(--cl-text-dim)' }}>🕐 {timestamp}</p>}
      </div>
      <button onClick={handleDismiss} style={{
        background:'none', border:'none', cursor:'pointer',
        color:'var(--cl-text-dim)', fontSize:'1rem', padding:2, borderRadius:4, flexShrink:0
      }} title="Dismiss">✕</button>
    </div>
  )
}
