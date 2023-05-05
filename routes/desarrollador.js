const express = require('express')
const router = express.Router()
const UserControllers = require('../controllers/desarrollador.js')

router.get('/', UserControllers.getAllUsers)
router.get('/datos/:id', UserControllers.getInfoDesarrollador)
router.get('/datosSupervisores', UserControllers.getDatosSupervisor)
router.get('/datosNegocios', UserControllers.getDatosNegocios)
router.post('/crearSolicitud', UserControllers.insertSolicitud)
router.get('/catalogoRefrigeradores', UserControllers.getRefrigeradores)
router.post('/updateRefrigeradores', UserControllers.updateRefrigeradores)
router.post('/getCheckList', UserControllers.getCheckList)
router.post('/updateCheckList', UserControllers.updateCheckList)
router.post('/getRecentRequests', UserControllers.getRecentRequests)
router.post('/getRecentRequestsRefris', UserControllers.getRecentRequestsRefris)

module.exports = router; 