const dbService = require("../config/db");

module.exports = {

  getUser: async()=>{
    const pool = await dbService.poolPromise;

    sql = `SELECT id_usuario, contrasena, rol
            FROM ingreso 
            WHERE email='${email}' 
            AND contrasena='${clientPassword}'`;

    const result = await pool.request().query(sql);
    return result.recordset;
  },

  getAllUsersQuery:  async () => {
    const pool = await dbService.poolPromise;
    const sql = `SELECT * FROM chofer`
    const result = await pool.request().query(sql);
    console.log("", result)
    return result.recordset;
  },

  loginUser: async (email, clientPassword) => {
    const pool = await dbService.poolPromise;
    
    sql = `SELECT id_usuario, contrasena, rol
            FROM ingreso 
            WHERE email='${email}' 
            AND contrasena='${clientPassword}'`;

    const result = await pool.request().query(sql);
    return result.recordset;
  },
  
  getUserMail: async (email) => {
    const pool = await dbService.poolPromise;
    sql = `SELECT id_usuario
            FROM ingreso
            WHERE email = '${email}'`;
    const result = await pool.request().query(sql);
    return result.recordset;
  },

};
