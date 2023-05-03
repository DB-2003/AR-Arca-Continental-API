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

  getSolicitud: async(clientId)=>{
    const pool = await dbService.poolPromise;
    sql = `SELECT S.id_solicitud, N.nombre_tienda, N.colonia, N.calle, N.num_externo, D.nombre, D.apellido_paterno, S.fecha_generada
            FROM solicitud S
            JOIN supervisor SU ON SU.id_supervisor = S.id_supervisor 
            JOIN negocio N ON N.id_negocio = S.id_negocio
            JOIN desarrollador D ON D.id_desarrollador = S.id_desarrollador
            WHERE S.id_supervisor = ${clientId} AND estatus = 'Pendiente'`;

    const result = await pool.request().query(sql);
    return result.recordset;
  },

  getRefrigeradores: async(clientId, id_solicitud)=>{
    const pool = await dbService.poolPromise;
    sql = `SELECT modelo, codigo_serie, COUNT(modelo) AS cantidad
      FROM refrigerador R
      JOIN solicitud S ON R.id_solicitud = S.id_solicitud
      JOIN supervisor SU ON SU.id_supervisor = S.id_supervisor
      WHERE S.id_supervisor = ${clientId} AND estatus = 'Pendiente' AND R.id_solicitud = ${id_solicitud}
      GROUP BY modelo, codigo_serie`;

    const result = await pool.request().query(sql);
    return result.recordset;
  },

  getChofer: async()=>{
    const pool = await dbService.poolPromise;
    sql = `SELECT id_chofer, nombre, apellido_paterno
      FROM chofer`;

    const result = await pool.request().query(sql);
    return result.recordset;
  },

};