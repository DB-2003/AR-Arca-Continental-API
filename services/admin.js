const dbService = require("../config/db");

module.exports = {

  getUser: async(clientId)=>{
    const pool = await dbService.poolPromise;
    sql = `SELECT *
            FROM supervisor 
            WHERE id_supervisor=${clientId}`;

    const result = await pool.request().query(sql);
    return result.recordset[0];
  },
};