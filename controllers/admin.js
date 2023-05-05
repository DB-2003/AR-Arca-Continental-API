const UserServices = require("../services/admin.js");

module.exports = {
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

  getInfoAdmin: async (req, res, next) => {
    try {
      var userId = req.params.id;
      userId = parseInt(userId, 10);
      user = await UserServices.getUser(userId);

      if (!user) {
        return res
          .status(404)
          .json({
            message: "Supervisor por id no encontrado",
            success: false,
            found: false,
          });
        }

      return res.status(200).json(user);

      } catch (error) {
        return res
            .status(500)
            .json({ message: `Error al obtener la informacion. Err:, ${error}` });
        }
      },
      }
    }catch(error){
        return res
        .status(500)
        .json({ message: `Error al obtener la solicitud. Err:, ${error}` });
    }
    },

    getInfoSolicitud: async(req, res, next) => {
      try {
          var userId = req.params.id;
          userId = parseInt(userId, 10)
          user = await UserServices.getSolicitud(userId)
          
          return res.status(200).json(user);
      } catch (error) {
      return res
          .status(500)
          .json({ message: `Error al obtener la solicitud. Err:, ${error}` });
      }
    },

    getInfoRefrigerador: async(req, res, next) => {
      try {
          var userId = req.params.id;
          userId = parseInt(userId, 10)
          var id_solicitud = req.params.id_solicitud
          id_solicitud = parseInt(id_solicitud, 10)
          user = await UserServices.getRefrigeradores(userId, id_solicitud)
          
          return res.status(200).json(user);
      } catch (error) {
      return res
          .status(500)
          .json({ message: `Error al obtener el refrigerador. Err:, ${error}` });
      }
    },

    getInfoChofer: async(req, res, next) => {
      try {
          user = await UserServices.getChofer()
          
          return res.status(200).json(user);
      } catch (error) {
      return res
          .status(500)
          .json({ message: `Error al obtener la informacion del chofer. Err:, ${error}` });
      }
    },

    getInfoSolicitudAceptada: async(req, res, next) => {
      try {
          var userId = req.params.id;
          userId = parseInt(userId, 10)
          var id_solicitud = req.params.id_solicitud
          id_solicitud = parseInt(id_solicitud, 10)
          user = await UserServices.getSolicitudAceptada(userId, id_solicitud)
          
          return res.status(200).json(user);
      } catch (error) {
      return res
          .status(500)
          .json({ message: `Error al obtener el refrigerador. Err:, ${error}` });
      }
    },

    insertRelleno: async(req,res,next)=>{
      let {
        id_chofer,
        comentario,
        id_solicitud
      } = req.body;
  
      try {  
        const data = await UserServices.insertAdminSolicitud(
          id_chofer,
          comentario,
          id_solicitud);
  
        if (data < 1) {
          // return an error response if insertSolicitud() returns falsy value
          return res.status(400).json({
            success: false,
            message: 'Failed to insert datos solicitud por admin'
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

    getKPIAdmin: async(req, res, next) => {
      try {
          var userId = req.params.id;
          userId = parseInt(userId, 10)
          user = await UserServices.getKPIAdminService(userId)
          
          return res.status(200).json(user);
      } catch (error) {
      return res
          .status(500)
          .json({ message: `Error al obtener la solicitud. Err:, ${error}` });
      }
    },

    deleteSolicitud: async(req,res,next)=>{
      let {
        id_solicitud
      } = req.body;
  
      try {  
        const data = await UserServices.delete(id_solicitud);
  
        if (data < 1) {
          // return an error response if insertSolicitud() returns falsy value
          return res.status(400).json({
            success: false,
            message: 'Failed to insert datos solicitud por admin'
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

    getHeaderChofer: async (req, res, next) => {
      try {
        var userId = req.params.id;
        userId = parseInt(userId, 10);
        user = await UserServices.getHeadChofer(userId);
  
        if (!user) {
          return res
            .status(404)
            .json({
              message: "Supervisor por id no encontrado",
              success: false,
              found: false,
            });
          }
  
        return res.status(200).json(user);
  
        } catch (error) {
          return res
              .status(500)
              .json({ message: `Error al obtener la informacion. Err:, ${error}` });
          }
        },

        getInfoRefriChof: async(req, res, next) => {
          try {
              var userId = req.params.id;
              userId = parseInt(userId, 10)
              var id_solicitud = req.params.id_solicitud
              id_solicitud = parseInt(id_solicitud, 10)
              user = await UserServices.getRefriChof(userId, id_solicitud)
              
              return res.status(200).json(user);
          } catch (error) {
          return res
              .status(500)
              .json({ message: `Error al obtener el refrigerador. Err:, ${error}` });
          }
        },

        getSoli: async(req, res, next) => {
          try {
              var userId = req.params.id;
              userId = parseInt(userId, 10)
              user = await UserServices.getSol(userId)
              
              return res.status(200).json(user);
          } catch (error) {
          return res
              .status(500)
              .json({ message: `Error al obtener la solicitud. Err:, ${error}` });
          }
        },
};
