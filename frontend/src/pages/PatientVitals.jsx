import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer  from '../components/Footer'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const generateVitals = () => {
  const now = new Date()
  return Array.from({ length: 12 }, (_, i) => {
    const t = new Date(now - (11 - i) * 5 * 60000)
    const hr = 70 + Math.round(Math.random() * 20)
    const spo2 = 95 + Math.round(Math.random() * 4)
    const bg = 90 + Math.round(Math.random() * 40)
    return {
      time: t.toLocaleTimeString('en', { hour:'2-digit', minute:'2-digit' }),
      heartRate: hr, spo2, bloodGlucose: bg,
      systolic: 115 + Math.round(Math.random() * 20),
      diastolic: 75 + Math.round(Math.random() * 15),
      status: hr > 100 ? 'abnormal' : 'normal'
    }
  })
}

export default function PatientVitals() {
  const [vitals, setVitals] = useState(generateVitals)
  const [live, setLive]     = useState(true)

  useEffect(() => {
    if (!live) return
    const id = setInterval(() => {
      const last = vitals[vitals.length - 1]
      const now = new Date()
      setVitals(prev => [...prev.slice(1), {
        time: now.toLocaleTimeString('en', { hour:'2-digit', minute:'2-digit' }),
        heartRate: 70 + Math.round(Math.random() * 25),
        spo2: 94 + Math.round(Math.random() * 5),
        bloodGlucose: 88 + Math.round(Math.random() * 45),
        systolic: 115 + Math.round(Math.random() * 20),
        diastolic: 75 + Math.round(Math.random() * 15),
        status: 'normal'
      }])
    }, 3000)
    return () => clearInterval(id)
  }, [live, vitals])

  const latest = vitals[vitals.length - 1]

  const cards = [
    { icon:'❤️', label:'Heart Rate', value:`${latest.heartRate}`, unit:'BPM', color:'var(--cl-red)', status: latest.heartRate > 100 ? 'abnormal' : 'normal' },
    { icon:'💙', label:'Blood Pressure', value:`${latest.systolic}/${latest.diastolic}`, unit:'mmHg', color:'var(--cl-primary-light)', status:'normal' },
    { icon:'🫁', label:'SpO₂', value:`${latest.spo2}`, unit:'%', color:'var(--cl-teal)', status: latest.spo2 < 95 ? 'abnormal' : 'normal' },
    { icon:'🩸', label:'Blood Glucose', value:`${latest.bloodGlucose}`, unit:'mg/dL', color:'var(--cl-amber)', status: latest.bloodGlucose > 120 ? 'abnormal' : 'normal' },
  ]

  return (
    <div className="cl-layout">
      <Sidebar />
      <div className="cl-main">
        <Navbar title="Patient Vitals" />
        <div className="cl-page">
          <div className="cl-page-header" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
            <div>
              <h1 style={{ fontSize:'1.75rem' }}>❤️ Vital Signs</h1>
              <p>Real-time monitoring via Kinesis → Lambda → DynamoDB pipeline</p>
            </div>
            <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.8rem' }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background: live ? 'var(--cl-green)' : 'var(--cl-text-dim)', display:'inline-block', animation: live ? 'pulse-ring 2s infinite' : 'none' }} />
                <span style={{ color: live ? 'var(--cl-green)' : 'var(--cl-text-dim)' }}>{live ? 'Live' : 'Paused'}</span>
              </div>
              <button className={`cl-btn ${live ? 'cl-btn-danger' : 'cl-btn-success'} cl-btn-sm`} onClick={() => setLive(l => !l)}>
                {live ? '⏸ Pause' : '▶ Resume'}
              </button>
            </div>
          </div>

          {/* Current readings */}
          <div className="cl-stats-grid" style={{ marginBottom:'2rem' }}>
            {cards.map((c, i) => (
              <div key={i} className="cl-stat-card animate-fadeInUp" style={{ animationDelay:`${i*0.1}s` }}>
                <div className="accent-bar" style={{ background: `linear-gradient(90deg, ${c.color}, transparent)` }} />
                <div className="stat-icon" style={{ background:`${c.color}18`, border:`1px solid ${c.color}33` }}>
                  {c.icon}
                </div>
                <div className="stat-value" style={{ color: c.status === 'abnormal' ? 'var(--cl-red)' : 'var(--cl-white)' }}>{c.value}</div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span className="stat-label">{c.label} ({c.unit})</span>
                  <span className={`cl-badge ${c.status === 'abnormal' ? 'cl-badge-danger' : 'cl-badge-success'}`} style={{ fontSize:'0.62rem' }}>
                    {c.status === 'abnormal' ? '⚠ Abnormal' : '✓ Normal'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', marginBottom:'2rem' }}>
            {[
              { title:'Heart Rate', key:'heartRate', color:'#ef4444', unit:'BPM', domain:[50,140] },
              { title:'SpO₂', key:'spo2', color:'#06b6d4', unit:'%', domain:[88,100] },
            ].map(chart => (
              <div key={chart.key} className="cl-card">
                <h4 style={{ marginBottom:'1rem' }}>{chart.title} Trend</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={vitals}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="time" tick={{ fill:'#64748b', fontSize:11 }} tickLine={false} />
                    <YAxis domain={chart.domain} tick={{ fill:'#64748b', fontSize:11 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background:'var(--cl-surface-2)', border:'1px solid var(--cl-border)', borderRadius:8, color:'#e2e8f0', fontSize:12 }} />
                    <Line type="monotone" dataKey={chart.key} stroke={chart.color} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>

          {/* Vitals history table */}
          <div className="cl-card">
            <h4 style={{ marginBottom:'1rem' }}>📋 Vitals History</h4>
            <div className="cl-table-wrap">
              <table className="cl-table">
                <thead><tr><th>Time</th><th>Heart Rate</th><th>Blood Pressure</th><th>SpO₂</th><th>Blood Glucose</th><th>Status</th></tr></thead>
                <tbody>
                  {[...vitals].reverse().map((v, i) => (
                    <tr key={i}>
                      <td style={{ color:'var(--cl-text-muted)', fontSize:'0.8rem' }}>{v.time}</td>
                      <td style={{ fontWeight:600, color: v.heartRate > 100 ? 'var(--cl-red)' : 'var(--cl-white)' }}>❤️ {v.heartRate} bpm</td>
                      <td>💙 {v.systolic}/{v.diastolic} mmHg</td>
                      <td style={{ color: v.spo2 < 95 ? 'var(--cl-amber)' : 'var(--cl-teal)' }}>🫁 {v.spo2}%</td>
                      <td>🩸 {v.bloodGlucose} mg/dL</td>
                      <td><span className={`cl-badge ${v.heartRate > 100 || v.spo2 < 95 ? 'cl-badge-danger' : 'cl-badge-success'}`}>{v.heartRate > 100 || v.spo2 < 95 ? '⚠ Abnormal' : '✓ Normal'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
