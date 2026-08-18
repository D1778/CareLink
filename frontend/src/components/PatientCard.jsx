import { useNavigate } from 'react-router-dom'

export default function PatientCard({ patient, onClick }) {
  const { id, name, age, condition, heartRate, bloodPressure, status = 'stable' } = patient

  const statusConfig = {
    stable:   { class:'cl-badge-success', label:'✓ Stable',   color:'var(--cl-green)' },
    critical: { class:'cl-badge-danger',  label:'⚠ Critical', color:'var(--cl-red)' },
    warning:  { class:'cl-badge-warning', label:'! Warning',  color:'var(--cl-amber)' },
  }
  const cfg = statusConfig[status] || statusConfig.stable

  return (
    <div className="cl-card" style={{ cursor:'pointer' }} onClick={() => onClick?.(id)}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.875rem', marginBottom:'1rem' }}>
        <div style={{
          width:44, height:44, borderRadius:'50%',
          background:'var(--cl-surface-3)',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', flexShrink:0
        }}>👤</div>
        <div style={{ flex:1, minWidth:0 }}>
          <h4 style={{ color:'var(--cl-white)', margin:'0 0 0.2rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{name}</h4>
          <p style={{ fontSize:'0.75rem', margin:0 }}>{age} yrs • {condition}</p>
        </div>
        <span className={`cl-badge ${cfg.class}`}>{cfg.label}</span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.75rem' }}>
        <div style={{ background:'var(--cl-surface-2)', borderRadius:'var(--cl-radius-sm)', padding:'0.5rem 0.75rem' }}>
          <div style={{ fontSize:'0.65rem', color:'var(--cl-text-dim)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.2rem' }}>Heart Rate</div>
          <div style={{ color:'var(--cl-red)', fontWeight:700, fontSize:'0.9rem' }}>❤️ {heartRate} bpm</div>
        </div>
        <div style={{ background:'var(--cl-surface-2)', borderRadius:'var(--cl-radius-sm)', padding:'0.5rem 0.75rem' }}>
          <div style={{ fontSize:'0.65rem', color:'var(--cl-text-dim)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.2rem' }}>Blood Pressure</div>
          <div style={{ color:'var(--cl-primary-light)', fontWeight:700, fontSize:'0.9rem' }}>💙 {bloodPressure}</div>
        </div>
      </div>
    </div>
  )
}
