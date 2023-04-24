const UserServices = require("../services/users.js");
const { validateMexicoPhoneNumber } = require("../helpers/phoneUtils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { poolPromise } = require("../config/db.js");

module.exports = {

  getUserMail: async(req, res, next) => {

    user = await UserServices.getUserMail(req.body.email)

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
      // 1. Verify if the user exists
      const user = await UserServices.getUserMail(email);
      console.log("------ Login Triggered: ", user, "\nUser length:", user.length)
      
      if (user.length === 0) {
        console.log("¡Response empty!")
        return res
          .status(404)
          .json({
            message: "user not found",
            success: false,
            found: false,
          });
      }
  
      try {
        console.log("Entra en segundo query")
        const session = await UserServices.loginUser(email, clientPassword);
        console.log("Se hizo el segundo query")
        console.log(session[0].contrasena)
        
        if (clientPassword == session[0].contrasena) {
          
        }
        return res
          .status(200)
          .json({ success: true, message: "Login successful", session });
      } catch (error) {
        return res
          .status(401)
          .json({ message: "Invalid password", success: false });
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
