const { query } = require('../config/database')
const { s3Service } = require('../services/s3Service')
const { v4: uuidv4 } = require('uuid')

const medicalRecordController = {
  // GET /api/records/:patientId
  getByPatient: async (req, res) => {
    try {
      const result = await query(`
        SELECT mr.*, du.name AS doctor_name FROM medical_records mr
        LEFT JOIN doctors d ON d.id = mr.doctor_id
        LEFT JOIN users du ON du.id = d.user_id
        WHERE mr.patient_id = $1 ORDER BY mr.created_at DESC
      `, [req.params.patientId])
      res.json(result.rows)
    } catch (err) {
      // Mock fallback
      res.json([
        { id:'REC001', type:'Lab Report', title:'CBC Report', doctor_name:'Dr. Sarah Chen', created_at:'2025-08-15', s3_key:'records/P001/CBC.pdf' },
        { id:'REC002', type:'Imaging',    title:'Chest X-Ray', doctor_name:'Dr. James Park', created_at:'2025-08-10', s3_key:'records/P001/xray.pdf' },
      ])
    }
  },

  // POST /api/records
  create: async (req, res) => {
    const { patient_id, doctor_id, type, title, s3_key, notes } = req.body
    try {
      const id = `REC${uuidv4().slice(0,8).toUpperCase()}`
      const result = await query(`
        INSERT INTO medical_records (id, patient_id, doctor_id, type, title, s3_key, notes)
        VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *
      `, [id, patient_id, doctor_id, type, title, s3_key, notes])
      res.status(201).json(result.rows[0])
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // POST /api/records/upload-url
  getUploadUrl: async (req, res) => {
    const { fileName, contentType } = req.body
    try {
      const key = `records/${req.user.id}/${Date.now()}-${fileName}`
      const url = await s3Service.getPresignedUploadUrl(key, contentType)
      res.json({ url, key })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // GET /api/records/download-url
  getDownloadUrl: async (req, res) => {
    const { key } = req.query
    try {
      const url = await s3Service.getPresignedDownloadUrl(key)
      res.json({ url })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}

module.exports = medicalRecordController
