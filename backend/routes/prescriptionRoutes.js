const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const role = require('../middleware/roleMiddleware')
const c = require('../controllers/prescriptionController')

router.get('/:patientId', auth, c.getByPatient)
router.post('/',          auth, role('DOCTOR'), c.create)

module.exports = router
