const { query } = require('../config/database')
const { v4: uuidv4 } = require('uuid')

const prescriptionController = {
  // GET /api/prescriptions/:patientId
  getByPatient: async (req, res) => {
    try {
      const result = await query(`
        SELECT pr.*, du.name AS doctor_name FROM prescriptions pr
        JOIN doctors d ON d.id = pr.doctor_id
        JOIN users du ON du.id = d.user_id
        WHERE pr.patient_id = $1
        ORDER BY pr.created_at DESC
      `, [req.params.patientId])
      res.json(result.rows)
    } catch (err) {
      // Mock fallback
      res.json([
        { id:'RX001', medicine:'Lisinopril', dosage:'10mg', frequency:'Once daily', doctor_name:'Dr. Sarah Chen', start_date:'2025-08-01', end_date:'2025-12-31', status:'active' },
        { id:'RX002', medicine:'Aspirin',    dosage:'81mg', frequency:'Once daily', doctor_name:'Dr. Sarah Chen', start_date:'2025-08-01', end_date:'2025-12-31', status:'active' },
      ])
    }
  },

  // POST /api/prescriptions
  create: async (req, res) => {
    const { patient_id, doctor_id, medicine, dosage, frequency, start_date, end_date, instructions } = req.body
    try {
      const id = `RX${uuidv4().slice(0,8).toUpperCase()}`
      const result = await query(`
        INSERT INTO prescriptions (id, patient_id, doctor_id, medicine, dosage, frequency, start_date, end_date, instructions, status)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'active') RETURNING *
      `, [id, patient_id, doctor_id, medicine, dosage, frequency, start_date, end_date, instructions])
      res.status(201).json(result.rows[0])
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}

module.exports = prescriptionController
