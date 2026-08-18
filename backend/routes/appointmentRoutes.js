const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const c = require('../controllers/appointmentController')

router.get('/',    auth, c.getAll)
router.post('/',   auth, c.create)
router.put('/:id', auth, c.update)
router.delete('/:id', auth, c.cancel)

module.exports = router
