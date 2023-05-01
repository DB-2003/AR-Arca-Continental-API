const UserServices = require("../services/desarrollador");

module.exports = {
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
        result: data[0]

        // id_solicitud,
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
