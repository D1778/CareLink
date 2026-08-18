const { query } = require('../config/database')
const { v4: uuidv4 } = require('uuid')

const patientController = {
  // GET /api/patients
  getAll: async (req, res) => {
    try {
      const result = await query(`
        SELECT p.*, u.name, u.email FROM patients p
        JOIN users u ON u.id = p.user_id
        ORDER BY u.name
      `)
      res.json(result.rows)
    } catch (err) {
      console.error('[patientController.getAll]', err.message)
      // Return mock data when DB not connected
      res.json([
        { id:'P001', name:'Alex Johnson',  age:34, condition:'Hypertension',    status:'stable' },
        { id:'P002', name:'Maria Garcia',  age:58, condition:'Diabetes Type 2', status:'warning' },
        { id:'P003', name:'Robert Smith',  age:67, condition:'Heart Failure',   status:'critical' },
      ])
    }
  },

  // GET /api/patients/:id
  getById: async (req, res) => {
    try {
      const result = await query(`
        SELECT p.*, u.name, u.email, u.phone FROM patients p
        JOIN users u ON u.id = p.user_id
        WHERE p.id = $1
      `, [req.params.id])
      if (!result.rows[0]) return res.status(404).json({ error: 'Patient not found' })
      res.json(result.rows[0])
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // POST /api/patients
  create: async (req, res) => {
    const { user_id, date_of_birth, blood_type, emergency_contact } = req.body
    try {
      const id = `P${uuidv4().slice(0,8).toUpperCase()}`
      const result = await query(`
        INSERT INTO patients (id, user_id, date_of_birth, blood_type, emergency_contact)
        VALUES ($1,$2,$3,$4,$5) RETURNING *
      `, [id, user_id, date_of_birth, blood_type, emergency_contact])
      res.status(201).json(result.rows[0])
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // PUT /api/patients/:id
  update: async (req, res) => {
    const { blood_type, emergency_contact, allergies } = req.body
    try {
      const result = await query(`
        UPDATE patients SET blood_type=$1, emergency_contact=$2, allergies=$3, updated_at=NOW()
        WHERE id=$4 RETURNING *
      `, [blood_type, emergency_contact, allergies, req.params.id])
      if (!result.rows[0]) return res.status(404).json({ error: 'Patient not found' })
      res.json(result.rows[0])
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}

module.exports = patientController
