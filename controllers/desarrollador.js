const UserServices = require("../services/desarrollador.js");

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

    getInfoDesarrollador: async(req, res, next) => {
        try {
            var userId = req.params.id;
            userId = parseInt(userId, 10)
            user = await UserServices.getUser(userId)
            
            return res.status(200).json(user);
        } catch (error) {
        return res
            .status(500)
            .json({ message: `Error al obtener el tema. Err:, ${error}` });
        }
    },

};
