export default function AppointmentCard({ appointment, onAccept, onReject, onStart, role }) {
  const { id, patientName, doctorName, date, time, status, type = 'Consultation' } = appointment

  const statusConfig = {
    scheduled:  { class: 'cl-badge-primary',  label: '📅 Scheduled' },
    confirmed:  { class: 'cl-badge-success',  label: '✓ Confirmed' },
    pending:    { class: 'cl-badge-warning',  label: '⏳ Pending' },
    cancelled:  { class: 'cl-badge-danger',   label: '✕ Cancelled' },
    completed:  { class: 'cl-badge-teal',     label: '✔ Completed' },
  }
  const cfg = statusConfig[status] || statusConfig.scheduled

  return (
    <div className="cl-card" style={{ display:'flex', flexDirection:'column', gap:'0.875rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <div>
          <h4 style={{ color:'var(--cl-white)', marginBottom:'0.25rem' }}>{type}</h4>
          <p style={{ fontSize:'0.8rem', margin:0 }}>
            {role === 'DOCTOR' ? `👤 ${patientName}` : `👨‍⚕️ ${doctorName}`}
          </p>
        </div>
        <span className={`cl-badge ${cfg.class}`}>{cfg.label}</span>
      </div>

      <div style={{ display:'flex', gap:'1rem', fontSize:'0.8rem', color:'var(--cl-text-muted)' }}>
        <span>📅 {date}</span>
        <span>🕐 {time}</span>
      </div>

      {status !== 'cancelled' && status !== 'completed' && (
        <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
          {role === 'DOCTOR' && status === 'pending' && (<>
            <button className="cl-btn cl-btn-success cl-btn-sm" onClick={() => onAccept?.(id)}>✓ Accept</button>
            <button className="cl-btn cl-btn-danger  cl-btn-sm" onClick={() => onReject?.(id)}>✕ Reject</button>
          </>)}
          {role === 'DOCTOR' && status === 'confirmed' && (
            <button className="cl-btn cl-btn-primary cl-btn-sm" onClick={() => onStart?.(id)}>📹 Start</button>
          )}
          {role === 'PATIENT' && status === 'scheduled' && (
            <button className="cl-btn cl-btn-danger cl-btn-sm" onClick={() => onReject?.(id)}>Cancel</button>
          )}
        </div>
      )}
    </div>
  )
}
