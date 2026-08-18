const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const c = require('../controllers/medicalRecordController')

router.get('/:patientId',   auth, c.getByPatient)
router.post('/',            auth, c.create)
router.post('/upload-url',  auth, c.getUploadUrl)
router.get('/download-url', auth, c.getDownloadUrl)

module.exports = router
