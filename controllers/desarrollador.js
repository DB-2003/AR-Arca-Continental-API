const UserServices = require("../services/desarrollador");

module.exports = {

  getRecentRequestsRefris: async(req, res) =>{
    const {id_solicitud} = req.body;
    try {
      const refrigeradores = await UserServices.getRecentRequestsRefris(id_solicitud)
      res.status(200).json({refrigeradores});
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error getting recent checklist'
      });
    }
  },
  getRecentRequests: async(req, res) =>{
    const {id_desarrollador} = req.body;
    try {
      const solicitudes = await UserServices.getRecentRequests(id_desarrollador)
      res.status(200).json({solicitudes});
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error getting recent checklist'
      });
    }
  },
  updateCheckList: async(req, res, next)=>{
    try {
      const { refrigeradores } = req.body;
      const { length } = refrigeradores;
      
      console.log("REQUEST: ", refrigeradores)
      // Loop through each refrigerador and call UserServices.updateCheckList() for each
      for (let i = 0; i < length; i++) {
        const refrigerador = refrigeradores[i];
        const { id_checkListRefrigerador, entrada, movimientos, equipo } = refrigerador;
        
        await UserServices.updateCheckList(id_checkListRefrigerador, entrada, movimientos, equipo);
        console.log(`Object with id ${id_checkListRefrigerador} updated successfully`);
      }
      
      res.status(200).json({
        success: true,
        message: 'Checklist updated successfully'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error updating checklist'
      });
    }
  },
  

  getCheckList: async(req,res,next)=>{
    try {
      const {refrigeradores} = req.body;
      const checkLists = await UserServices.getCheckList(refrigeradores)
      res.status(200).json({checkLists});
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving freezers'
      });
    }
  },
  updateRefrigeradores: async(req,res,nex)=>{
    try {
      const { id_solicitud, refrigeradores } = req.body;
      let updatedRefrigeradores = await UserServices.updateRefrigeradores(id_solicitud ,refrigeradores)
      res.status(200).json({
        success: true,
        refrigeradores: updatedRefrigeradores})

    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving freezers'
      });
    }
  },
  getRefrigeradores: async(req, res, next)=>{
    try {
      const result = await UserServices.getRefrigeradores();
      res.status(200).json({
        success: true,
        refrigeradores: result})
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving freezers'
      });
    }
  },
  insertSolicitud: async(req,res,next)=>{
    let {
      id_desarrollador,
      id_supervisor,
      id_negocio,
      imagen_evidencia,
      comentario,
      estatus,
      fecha_generada,
      cedi,
    } = req.body;

    try {

      const data = await UserServices.insertSolicitud({
        id_desarrollador, 
        id_supervisor, 
        id_negocio, 
        imagen_evidencia,
        comentario,
        estatus, 
        fecha_generada, 
        cedi});

      if (!data) {
        // return an error response if insertSolicitud() returns falsy value
        return res.status(400).json({
          success: false,
          message: 'Failed to insert solicitud'
        });
      }

      res.status(200).json({
        success: true,
        id_solicitud: data[0].id_solicitud
      })
    } catch (error) {
      // handle any errors that occur during the try block
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  },

  getDatosSupervisor: async(req,res,next) => {
    try {
      const data = await UserServices.getDatosSupervisor();
      res.status(200).json({
        success: true,
        supervisores: data
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving supervisor data'
      });
    }
  },

  getDatosNegocios: async(req,res,next) => {
    try {
      const data = await UserServices.getDatosNegocios();
      res.status(200).json({
        success: true,
        negocios: data

      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error retrieving negocio data'
      });
    }
  },
  

  getAllUsers: async (req, res, next) => {
    try {
      users = await UserServices.getAllUsersQuery();
      return res.status(200).json(users);
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error al obtener el tema. Err: ${err}` });
    }
  },

  getInfoDesarrollador: async (req, res, next) => {
    try {
      var userId = req.params.id;
      userId = parseInt(userId, 10);
      user = await UserServices.getUser(userId);
      if (!user) {
        return res
          .status(404)
          .json({
            message: "Desarrollador por id no encontrado",
            success: false,
            found: false,
          });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error al obtener el tema. Err:, ${error}` });
    }
  },
};
