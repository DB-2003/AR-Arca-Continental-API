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
};
