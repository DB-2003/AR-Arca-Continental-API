const dbService = require("../config/db");

module.exports = {

  getAllUsersQuery:  async () => {
    const pool = await dbService.poolPromise;
    const sql = `SELECT * FROM chofer`
    const result = await pool.request().query(sql);
    console.log("", result)
    return result.recordset;
  },

  loginUser: async (email, clientPassword) => {
    const pool = await dbService.poolPromise;
    
    sql = `SELECT id_ingreso, contrasena, id_desarrollador, id_chofer, id_supervisor
                FROM ingreso 
                WHERE email='${email}' 
                AND contrasena='${clientPassword}'`;

    const result = await pool.request().query(sql);
    return result.recordset;
  },
  
  getUserMail: async (email) => {
    const pool = await dbService.poolPromise;
    sql = `SELECT id_ingreso, id_desarrollador, id_chofer, id_supervisor
            FROM ingreso
            WHERE email = '${email}'`;
    const result = await pool.request().query(sql);
    console.log("------ Query Response: ", result)
    return result.recordset;
  },

};
