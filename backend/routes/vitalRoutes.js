const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const c = require('../controllers/vitalController')

router.get('/:patientId', auth, c.getByPatient)
router.post('/',          auth, c.create)

module.exports = router
