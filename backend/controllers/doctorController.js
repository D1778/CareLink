const { query } = require('../config/database')

const doctorController = {
  // GET /api/doctors
  getAll: async (req, res) => {
    try {
      const result = await query(`
        SELECT d.*, u.name, u.email FROM doctors d
        JOIN users u ON u.id = d.user_id
        ORDER BY u.name
      `)
      res.json(result.rows)
    } catch (err) {
      // Mock fallback
      res.json([
        { id:'D001', name:'Dr. Sarah Chen', specialty:'Cardiology',       available:true },
        { id:'D002', name:'Dr. Mike Ross',  specialty:'General Practice', available:true },
        { id:'D003', name:'Dr. James Park', specialty:'Radiology',        available:false },
      ])
    }
  },

  // GET /api/doctors/:id
  getById: async (req, res) => {
    try {
      const result = await query(`
        SELECT d.*, u.name, u.email, u.phone FROM doctors d
        JOIN users u ON u.id = d.user_id WHERE d.id=$1
      `, [req.params.id])
      if (!result.rows[0]) return res.status(404).json({ error: 'Doctor not found' })
      res.json(result.rows[0])
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // GET /api/doctors/:id/patients
  getPatients: async (req, res) => {
    try {
      const result = await query(`
        SELECT DISTINCT p.*, u.name, u.email FROM patients p
        JOIN users u ON u.id = p.user_id
        JOIN appointments a ON a.patient_id = p.id
        WHERE a.doctor_id = $1
        ORDER BY u.name
      `, [req.params.id])
      res.json(result.rows)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}

module.exports = doctorController
