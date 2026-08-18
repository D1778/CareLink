const { query } = require('../config/database')
const { v4: uuidv4 } = require('uuid')

const appointmentController = {
  // GET /api/appointments
  getAll: async (req, res) => {
    const { patient_id, doctor_id, status } = req.query
    try {
      let sql = `
        SELECT a.*, pu.name AS patient_name, du.name AS doctor_name
        FROM appointments a
        JOIN patients p ON p.id = a.patient_id
        JOIN users pu ON pu.id = p.user_id
        JOIN doctors d ON d.id = a.doctor_id
        JOIN users du ON du.id = d.user_id
        WHERE 1=1
      `
      const params = []
      if (patient_id) { params.push(patient_id); sql += ` AND a.patient_id = $${params.length}` }
      if (doctor_id)  { params.push(doctor_id);  sql += ` AND a.doctor_id  = $${params.length}` }
      if (status)     { params.push(status);      sql += ` AND a.status     = $${params.length}` }
      sql += ' ORDER BY a.scheduled_at DESC'
      const result = await query(sql, params)
      res.json(result.rows)
    } catch (err) {
      // Mock fallback
      res.json([
        { id:'A001', patient_name:'Alex Johnson', doctor_name:'Dr. Sarah Chen', scheduled_at:'2025-08-22T10:00:00', status:'confirmed', type:'Cardiology Follow-up' },
        { id:'A002', patient_name:'Maria Garcia', doctor_name:'Dr. Mike Ross',  scheduled_at:'2025-08-25T14:00:00', status:'pending',   type:'Diabetes Review' },
      ])
    }
  },

  // POST /api/appointments
  create: async (req, res) => {
    const { patient_id, doctor_id, scheduled_at, type, notes } = req.body
    try {
      const id = `A${uuidv4().slice(0,8).toUpperCase()}`
      const result = await query(`
        INSERT INTO appointments (id, patient_id, doctor_id, scheduled_at, type, notes, status)
        VALUES ($1,$2,$3,$4,$5,$6,'pending') RETURNING *
      `, [id, patient_id, doctor_id, scheduled_at, type, notes])
      res.status(201).json(result.rows[0])
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // PUT /api/appointments/:id
  update: async (req, res) => {
    const { status, notes } = req.body
    try {
      const result = await query(`
        UPDATE appointments SET status=$1, notes=$2, updated_at=NOW() WHERE id=$3 RETURNING *
      `, [status, notes, req.params.id])
      if (!result.rows[0]) return res.status(404).json({ error: 'Appointment not found' })
      res.json(result.rows[0])
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // DELETE /api/appointments/:id
  cancel: async (req, res) => {
    try {
      const result = await query(`
        UPDATE appointments SET status='cancelled', updated_at=NOW() WHERE id=$1 RETURNING *
      `, [req.params.id])
      if (!result.rows[0]) return res.status(404).json({ error: 'Appointment not found' })
      res.json({ message: 'Appointment cancelled', appointment: result.rows[0] })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}

module.exports = appointmentController
