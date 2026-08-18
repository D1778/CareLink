export default function VitalCard({ icon, label, value, unit, status = 'normal', trend }) {
  const isNormal   = status === 'normal'
  const isWarning  = status === 'warning'
  const isCritical = status === 'critical'

  const statusColor = isCritical ? 'var(--cl-red)' : isWarning ? 'var(--cl-amber)' : 'var(--cl-green)'
  const statusGlow  = isCritical ? 'var(--cl-red-glow)' : isWarning ? 'var(--cl-amber-glow)' : 'var(--cl-green-glow)'
  const statusLabel = isCritical ? '⚠ Critical' : isWarning ? '⚡ Warning' : '✓ Normal'
  const badgeClass  = isCritical ? 'cl-badge-danger' : isWarning ? 'cl-badge-warning' : 'cl-badge-success'

  return (
    <div className="cl-card animate-fadeInUp" style={{ position:'relative', overflow:'hidden' }}>
      {/* Glow accent */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, height:3,
        background: isCritical ? 'var(--cl-grad-amber)' : isWarning ? 'var(--cl-grad-amber)' : 'var(--cl-grad-green)',
        borderRadius:'var(--cl-radius-lg) var(--cl-radius-lg) 0 0'
      }} />

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
        <div style={{
          width:48, height:48, borderRadius:'var(--cl-radius-md)',
          background: `linear-gradient(135deg, ${statusColor}22, ${statusColor}11)`,
          border: `1px solid ${statusColor}33`,
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem',
          boxShadow: `0 0 16px ${statusGlow}`
        }}>{icon}</div>
        <span className={`cl-badge ${badgeClass}`}>{statusLabel}</span>
      </div>

      <div style={{ marginBottom:'0.25rem' }}>
        <span style={{ fontFamily:'var(--cl-font-heading)', fontSize:'2rem', fontWeight:800, color:'var(--cl-white)' }}>
          {value}
        </span>
        <span style={{ color:'var(--cl-text-muted)', marginLeft:'0.25rem', fontSize:'0.875rem' }}>{unit}</span>
      </div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span style={{ fontSize:'0.8rem', fontWeight:600, color:'var(--cl-text-muted)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{label}</span>
        {trend && <span style={{ fontSize:'0.8rem', color: trend === 'up' ? 'var(--cl-red)' : trend === 'down' ? 'var(--cl-green)' : 'var(--cl-text-muted)' }}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trend}
        </span>}
      </div>
    </div>
  )
}
