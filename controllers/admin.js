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
        .json({ message: `Error al obtener el tema. Err:, ${error}` });
    }
  },
};
