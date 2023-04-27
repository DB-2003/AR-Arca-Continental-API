const express = require('express')
const router = express.Router()
const UserControllers = require('../controllers/admin.js')

router.get('/', UserControllers.getAllUsers)
router.get('/datos/:id', UserControllers.getInfoAdmin)

module.exports = router;