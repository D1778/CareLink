export default function Footer() {
  return (
    <footer style={{
      background:'var(--cl-surface)',
      borderTop:'1px solid var(--cl-border)',
      padding:'1rem 2rem',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      flexWrap:'wrap', gap:'0.5rem',
      fontSize:'0.78rem', color:'var(--cl-text-dim)'
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
        <span>🏥</span>
        <span style={{ color:'var(--cl-text-muted)', fontWeight:600 }}>CareLink</span>
        <span>— Remote Patient Monitoring Platform</span>
      </div>
      <div style={{ display:'flex', gap:'1rem' }}>
        <span>Powered by AWS</span>
        <span>•</span>
        <span>© 2025 CareLink Health Systems</span>
      </div>
    </footer>
  )
}
