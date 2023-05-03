const express = require('express')
const router = express.Router()
const UserControllers = require('../controllers/admin.js')

router.get('/', UserControllers.getAllUsers)
router.get('/datos/:id', UserControllers.getInfoAdmin)
router.get('/solicitudes/:id', UserControllers.getInfoSolicitud)
router.get('/refrigeradores/solicitud/:id/:id_solicitud', UserControllers.getInfoRefrigerador)
router.get('/informacion/chofer', UserControllers.getInfoChofer)

module.exports = router;