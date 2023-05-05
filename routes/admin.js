const express = require('express')
const router = express.Router()
const UserControllers = require('../controllers/admin.js')

router.get('/', UserControllers.getAllUsers)
router.get('/datos/:id', UserControllers.getInfoAdmin)
router.get('/solicitudes/:id', UserControllers.getInfoSolicitud)
router.get('/refrigeradores/solicitud/:id/:id_solicitud', UserControllers.getInfoRefrigerador)
router.get('/informacion/chofer', UserControllers.getInfoChofer)
router.get('/general/:id/:id_solicitud', UserControllers.getInfoSolicitudAceptada)
router.post('/relleno/solicitud', UserControllers.insertRelleno)
router.get('/kpiadmin/:id', UserControllers.getKPIAdmin)
router.post('/delete', UserControllers.deleteSolicitud)
router.get('/headerchofer/:id', UserControllers.getHeaderChofer)
router.get('/refri/chof/:id/:id_solicitud', UserControllers.getInfoRefriChof)
router.get('/soli/:id', UserControllers.getSoli)


module.exports = router;