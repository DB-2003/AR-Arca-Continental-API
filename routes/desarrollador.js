const express = require('express')
const router = express.Router()
const UserControllers = require('../controllers/desarrollador.js')

router.get('/', UserControllers.getAllUsers)
router.get('/datos/:id', UserControllers.getInfoDesarrollador)
router.get('/datosSupervisores', UserControllers.getDatosSupervisor)
router.get('/datosNegocios', UserControllers.getDatosNegocios)
router.post('/crearSolicitud', UserControllers.insertSolicitud)

module.exports = router; 