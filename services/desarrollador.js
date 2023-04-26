const dbService = require("../config/db");

module.exports = {

  getUser: async(clientId)=>{
    const pool = await dbService.poolPromise;
    sql = `SELECT *
            FROM desarrollador 
            WHERE id_desarrollador=${clientId}`;

    const result = await pool.request().query(sql);
    return result.recordset[0];
  },
};
