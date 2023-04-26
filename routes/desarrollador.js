const express = require('express')
const router = express.Router()
const UserControllers = require('../controllers/desarrollador.js')

router.get('/', UserControllers.getAllUsers)
router.get('/datos/:id', UserControllers.getInfoDesarrollador)

module.exports = router;