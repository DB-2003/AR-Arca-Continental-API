const dbService = require("../config/db");

module.exports = {
  getRefrigeradores: async ()=>{
    const pool = await dbService.poolPromise;
    sql = `SELECT *
            FROM refrigerador
            WHERE id_solicitud IS NULL;`;
    const result = await pool.request().query(sql);
    return result.recordset;
  },

  getUser: async (clientId) => {
    const pool = await dbService.poolPromise;
    sql = `SELECT *
            FROM desarrollador 
            WHERE id_desarrollador=${clientId}`;

    const result = await pool.request().query(sql);
    return result.recordset[0];
  },

  getDatosSupervisor: async () => {
    const pool = await dbService.poolPromise;
    sql = `SELECT id_supervisor, nombre, apellido_paterno
            FROM supervisor`;

    const result = await pool.request().query(sql);
    return result.recordset;
  },

  getDatosNegocios: async () => {
    const pool = await dbService.poolPromise;
    sql = `SELECT id_negocio, nombre_tienda, colonia
            FROM negocio;`;

    const result = await pool.request().query(sql);
    return result.recordset;
  },

  insertSolicitud: async (body) => {
    const pool = await dbService.poolPromise;
    const comentario = body.comentario ? `'${body.comentario}'` : 'NULL';
    const imagen_evidencia = body.imagen_evidencia ? `'${body.imagen_evidencia}'` : 'NULL';
  
    const sql = `INSERT INTO solicitud (
            id_desarrollador, 
            id_supervisor, 
            id_negocio, 
            imagen_evidencia,
            comentarios,
            estatus, 
            fecha_generada, 
            cedi)
          VALUES (${body.id_desarrollador}, 
            ${body.id_supervisor}, 
            ${body.id_negocio},
            ${imagen_evidencia},
            ${comentario},
            '${body.estatus}', 
            '${body.fecha_generada}', 
            '${body.cedi}')
          SELECT SCOPE_IDENTITY() AS id_solicitud;`;
  
    const result = await pool.request().query(sql);
    console.log("QUERY RESULT: ", result.recordset)
    return result.recordset;
  }
};
