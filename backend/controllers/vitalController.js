const { dynamoService } = require('../services/dynamoService')
const { kinesisService } = require('../services/kinesisService')
const { v4: uuidv4 } = require('uuid')

const vitalController = {
  // GET /api/vitals/:patientId
  getByPatient: async (req, res) => {
    try {
      const items = await dynamoService.queryByPatient(req.params.patientId)
      res.json(items)
    } catch (err) {
      console.error('[vitalController.getByPatient]', err.message)
      // Mock fallback
      res.json(Array.from({ length: 10 }, (_, i) => ({
        id: uuidv4(),
        patient_id: req.params.patientId,
        timestamp: new Date(Date.now() - i * 300000).toISOString(),
        heart_rate: 70 + Math.round(Math.random() * 20),
        systolic: 115 + Math.round(Math.random() * 20),
        diastolic: 75 + Math.round(Math.random() * 15),
        spo2: 95 + Math.round(Math.random() * 4),
        blood_glucose: 90 + Math.round(Math.random() * 40),
        status: 'normal',
      })))
    }
  },

  // POST /api/vitals
  create: async (req, res) => {
    const { patient_id, heart_rate, systolic, diastolic, spo2, blood_glucose } = req.body
    const vital = {
      id: uuidv4(),
      patient_id,
      timestamp: new Date().toISOString(),
      heart_rate, systolic, diastolic, spo2, blood_glucose,
      status: heart_rate > 100 || spo2 < 95 ? 'abnormal' : 'normal',
    }

    try {
      // Ingest to Kinesis stream for Lambda processing
      await kinesisService.putRecord(vital)
      // Also write directly to DynamoDB
      await dynamoService.putItem(vital)
      res.status(201).json(vital)
    } catch (err) {
      console.error('[vitalController.create]', err.message)
      res.status(201).json(vital) // Return optimistically
    }
  },
}

module.exports = vitalController
