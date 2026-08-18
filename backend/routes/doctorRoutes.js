const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const c = require('../controllers/doctorController')

router.get('/',          auth, c.getAll)
router.get('/:id',       auth, c.getById)
router.get('/:id/patients', auth, c.getPatients)

module.exports = router
