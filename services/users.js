const dbService = require("../config/db");

module.exports = {

  getAllUsersQuery:  async () => {
    const pool = await dbService.poolPromise;
    const sql = `SELECT * FROM chofer`
    const result = await pool.request().query(sql);
    console.log("––––––––RESULT––––––––––––", result)
    return result.recordset;
  },

  loginUser: async (email, password) => {
    console.log("mail: ", email, "Contra: ", password)
    const pool = await dbService.poolPromise;
    
    sql = `SELECT id_desarrollador, contrasena
                FROM ingreso 
                WHERE email='${email}' 
                AND contrasena='${password}'`;

    const result = await pool.request().query(sql);
    console.log("––––––––RESULT––––––––––––", result[0].recordset)
    return result.recordset;
  },
  
  getDesarrollador: async (email) => {
    const pool = await dbService.poolPromise;
    sql = `SELECT id_desarrollador, nombre, apellido_paterno
            FROM desarrollador
            WHERE email = '${email}'`;

    const result = await pool.request().query(sql);
    console.log(result)
    return result.recordset;
  },

};
