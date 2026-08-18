const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const role = require('../middleware/roleMiddleware')
const c = require('../controllers/patientController')

router.get('/',    auth, c.getAll)
router.get('/:id', auth, c.getById)
router.post('/',   auth, role('ADMIN','DOCTOR'), c.create)
router.put('/:id', auth, role('ADMIN','DOCTOR','PATIENT'), c.update)

module.exports = router
