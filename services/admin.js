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
            WHERE S.id_supervisor = ${clientId} AND estatus = 'Por Confirmar'`;

    const result = await pool.request().query(sql);
    return result.recordset;
  },

  getRefrigeradores: async(clientId, id_solicitud)=>{
    const pool = await dbService.poolPromise;
    sql = `SELECT modelo, codigo_serie, COUNT(modelo) AS cantidad
      FROM refrigerador R
      JOIN solicitud S ON R.id_solicitud = S.id_solicitud
      JOIN supervisor SU ON SU.id_supervisor = S.id_supervisor
      WHERE S.id_supervisor = ${clientId} AND estatus = 'Por Confirmar' AND R.id_solicitud = ${id_solicitud}
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
  
  getSolicitudAceptada: async(id, id_solicitud)=>{
    const pool = await dbService.poolPromise;
    sql = `SELECT nombre_tienda, id_solicitud
    FROM solicitud S
    JOIN supervisor SU ON SU.id_supervisor = S.id_supervisor
    JOIN negocio N ON N.id_negocio = S.id_negocio
    WHERE S.id_supervisor = ${id} AND estatus = 'Por Confirmar' AND S.id_solicitud = ${id_solicitud}`;

    const result = await pool.request().query(sql);
    return result.recordset;
  },

  getKPIAdminService: async(id)=>{
    const pool = await dbService.poolPromise;
    sql = `SELECT COUNT(id_solicitud) AS aprobados
    FROM solicitud S
    JOIN supervisor SU ON SU.id_supervisor = S.id_supervisor
    JOIN negocio N ON N.id_negocio = S.id_negocio
    WHERE S.id_supervisor = 1 AND estatus = 'Aprobado' AND MONTH(fecha_generada) = MONTH(GETDATE()) AND YEAR(fecha_generada) = YEAR(GETDATE())`;

    const result = await pool.request().query(sql);
    return result.recordset;
  },

  insertAdminSolicitud: async (id_chofer, comentario, id_solicitud) => {
    const pool = await dbService.poolPromise;

    const sql = `UPDATE solicitud
    SET
      id_chofer = ${id_chofer},
      comentarios_admin =  '${comentario}',
      es_aprobado = 'si',
      estatus = 'Aprobado',
      fecha_aprobado = CONVERT(varchar(10), GETDATE(), 23)
      WHERE id_solicitud = ${id_solicitud}`;
  
    const result = await pool.request().query(sql);
    return result.rowsAffected;
  },

  delete: async (id_solicitud) => {
    const pool = await dbService.poolPromise;

    const sql = `
    EXEC eliminar_solicitud @id_solicitud = ${id_solicitud};`;
  
    const result = await pool.request().query(sql);
    return result.rowsAffected;
  },

  getHeadChofer: async(clientId)=>{
    const pool = await dbService.poolPromise;
    sql = `SELECT *
            FROM chofer
            WHERE id_chofer=${clientId}`;

    const result = await pool.request().query(sql);
    return result.recordset[0];
  },

  getRefriChof: async(clientId, id_solicitud)=>{
    const pool = await dbService.poolPromise;
    sql = `SELECT modelo, codigo_serie, COUNT(modelo) AS cantidad
      FROM refrigerador R
      JOIN solicitud S ON R.id_solicitud = S.id_solicitud
      JOIN chofer C ON C.id_chofer = S.id_chofer
      WHERE C.id_chofer = ${clientId} AND estatus = 'Aprobado' AND R.id_solicitud = ${id_solicitud}
      GROUP BY modelo, codigo_serie`;

    const result = await pool.request().query(sql);
    return result.recordset;
  },

  getSol: async(clientId)=>{
    const pool = await dbService.poolPromise;
    sql = `SELECT S.id_solicitud, N.nombre_tienda, N.colonia, N.calle, N.num_externo, D.nombre, D.apellido_paterno, S.fecha_generada
            FROM solicitud S
            JOIN supervisor SU ON SU.id_supervisor = S.id_supervisor 
            JOIN negocio N ON N.id_negocio = S.id_negocio
            JOIN desarrollador D ON D.id_desarrollador = S.id_desarrollador
            WHERE S.id_chofer = ${clientId} AND estatus = 'Aprobado'`;

    const result = await pool.request().query(sql);
    return result.recordset;
  },

};