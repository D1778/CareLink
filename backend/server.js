const express = require('express')
const cors    = require('cors')
require('dotenv').config()

const patientRoutes    = require('./routes/patientRoutes')
const doctorRoutes     = require('./routes/doctorRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')
const vitalRoutes      = require('./routes/vitalRoutes')
const prescriptionRoutes = require('./routes/prescriptionRoutes')
const medicalRecordRoutes = require('./routes/medicalRecordRoutes')

const app = express()

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// ── Request logger (dev) ──────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
    next()
  })
}

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'CareLink API', timestamp: new Date().toISOString() })
})

// ── Auth (mock Cognito integration) ──────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  const jwt = require('jsonwebtoken')
  const bcrypt = require('bcryptjs')

  const mockUsers = {
    'patient@care.com': { id:'P001', name:'Alex Johnson', role:'PATIENT', email:'patient@care.com', passwordHash: bcrypt.hashSync('demo123', 10) },
    'doctor@care.com':  { id:'D001', name:'Dr. Sarah Chen', role:'DOCTOR', email:'doctor@care.com',  passwordHash: bcrypt.hashSync('demo123', 10) },
    'admin@care.com':   { id:'A001', name:'Admin User', role:'ADMIN', email:'admin@care.com', passwordHash: bcrypt.hashSync('demo123', 10) },
  }

  const user = mockUsers[email?.toLowerCase()]
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })

  const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
  const { passwordHash, ...safeUser } = user
  res.json({ user: safeUser, token })
})

app.post('/api/auth/register', async (req, res) => {
  const jwt = require('jsonwebtoken')
  const { name, email, role, password } = req.body
  const id = `U${Date.now()}`
  const token = jwt.sign({ id, role, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
  res.status(201).json({ user: { id, name, email, role }, token })
})

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/patients',      patientRoutes)
app.use('/api/doctors',       doctorRoutes)
app.use('/api/appointments',  appointmentRoutes)
app.use('/api/vitals',        vitalRoutes)
app.use('/api/prescriptions', prescriptionRoutes)
app.use('/api/records',       medicalRecordRoutes)

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.message)
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' })
})

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🏥 CareLink API Server`)
  console.log(`   PORT:   ${PORT}`)
  console.log(`   ENV:    ${process.env.NODE_ENV}`)
  console.log(`   STATUS: Running ✓\n`)
})

module.exports = app
