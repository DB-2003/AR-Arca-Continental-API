const UserServices = require("../services/users.js");

module.exports = {

  getUserInfo: async(req, res, next) => {
    const userId = req.params.id;
    user = await UserServices.getUser(userId);
    
    try {
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error al obtener el tema. Err: ${err}` });
    }
  },

  loginUser: async (req, res, next) => {

    const { email, clientPassword } = req.body;
    try {

      // Verificamos que hay cuerpo
      if (!email || !clientPassword) {
        return res
          .status(400)
          .json({ message: "Request incomplete", success: false });
      }

      // Llamamos el query para verificar que exista el usuarios y almacenamos respuesta en user
      const user = await UserServices.getUserMail(email);
      
      // Si la respuesta llega vacia entonces no se encontró el usuario
      if (user.length === 0) {
        return res
          .status(404)
          .json({
            message: "User not found",
            success: false,
            found: false,
          });
      }
      
      try {
        // Llamamos el query de login y almacenamos la respuesta en session
        const session = await UserServices.loginUser(email, clientPassword);
        
        // Comparamos la contraseña del usuario con la contraseña de bases de datos
        if (clientPassword == session[0].contrasena) {
          return res
          .status(200)
          .json({ message: "Login successful", success: true, found: true, session: session[0] });
        } else if(clientPassword != session[0]){
          return res
          .status(401)
          .json({ message: "Invalid password", success: false, found: true });
        }
        
      } catch (error) {
        // Manejo de errores externos
        return res
          .status(400)
          .json({ message: "Something went wrong", success: false });
      }
    } catch (err) {
      // 6. Handle any unexpected errors
      console.error(err);
      return res.status(500).json({
        message: "Error logging in",
        success: false,
        error: err.message,
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
};
