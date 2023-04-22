const express = require('express')
const router = express.Router()
const UserControllers = require('../controllers/users.js')

router.get('/', UserControllers.getAllUsers)
router.post('/logIn', UserControllers.loginUser)


module.exports = router;