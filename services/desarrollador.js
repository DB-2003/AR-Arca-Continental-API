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
                  comentarios_admin,
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
    return result.recordset;
  },

  updateRefrigeradores: async(id_solicitud, refrigeradores) => {
    const pool = await dbService.poolPromise;
  
    let refrigeradoresList;
    if (refrigeradores && refrigeradores.length > 0) {
      refrigeradoresList = refrigeradores.join(",");
    } else {
      const error = new Error("Invalid 'refrigeradores' parameter");
      error.status = 400; // Set status code to 400 Bad Request
      throw error; // Throw error to be caught by the calling function
    }
  
    const sql = ` DECLARE @id_refrigerador_list VARCHAR(MAX) = '${refrigeradoresList}';
                    UPDATE refrigerador
                    SET id_solicitud = ${id_solicitud}
                    WHERE id_refrigerador IN (
                        SELECT CAST(value AS INT)
                        FROM STRING_SPLIT(@id_refrigerador_list, ',')
                    );
                    
                    INSERT INTO checkListRefrigerador (id_refrigerador, entrada, posicion, movimientos, equipo, horario)
                    SELECT CAST(value AS INT), NULL, NULL, NULL, NULL, NULL
                    FROM STRING_SPLIT(@id_refrigerador_list, ',');

                    SELECT *
                    FROM refrigerador
                    WHERE id_refrigerador IN (
                        SELECT CAST(value AS INT)
                        FROM STRING_SPLIT(@id_refrigerador_list, ',')
                    ) AND id_solicitud = ${id_solicitud};`;
    const result = await pool.request().query(sql);
    return result.recordset;
  },

  getCheckList: async(refrigeradores) => {
    const pool = await dbService.poolPromise;

    let refrigeradoresList;
    if (refrigeradores && refrigeradores.length > 0) {
      refrigeradoresList = refrigeradores.join(",");
    } else {
      const error = new Error("Invalid 'refrigeradores' parameter");
      error.status = 400; // Set status code to 400 Bad Request
      throw error; // Throw error to be caught by the calling function
    }
  
    const sql = ` DECLARE @id_refrigerador_list VARCHAR(MAX) = '${refrigeradoresList}';
                    SELECT cr.id_checkListRefrigerador, cr.entrada, cr.movimientos, cr.equipo, r.modelo, r.codigo_serie, r.id_refrigerador
                    FROM checkListRefrigerador cr
                    JOIN refrigerador r ON cr.id_refrigerador = r.id_refrigerador
                    WHERE cr.id_refrigerador IN (
                        SELECT CAST(value AS INT)
                        FROM STRING_SPLIT(@id_refrigerador_list, ',')
                    );`;
    const result = await pool.request().query(sql);
    return result.recordset;
  },

  updateCheckList: async(id_checkListRefrigerador, entrada, movimientos, equipo)=> {
    const pool = await dbService.poolPromise;
    const request = pool.request();
  
    const result = await request.input('id', id_checkListRefrigerador)
      .input('entrada', entrada)
      .input('movimientos', movimientos)
      .input('equipo', equipo)
      .query(`UPDATE checkListRefrigerador
                SET entrada = @entrada,
                movimientos = @movimientos,
                equipo = @equipo
                WHERE id_checkListRefrigerador = @id`);
    return result.recordset;
  },

  getRecentRequests: async(id_desarrollador)=>{
    const pool = await dbService.poolPromise;
    sql = `SELECT s.id_solicitud, s.id_desarrollador, s.id_supervisor, s.id_chofer, s.id_negocio, s.imagen_evidencia, s.estatus, s.es_aprobado, s.fecha_generada, s.fecha_instalacion, s.fecha_aprobado, s.cedi,
            n.id_cliente, n.nombre_tienda, n.tamano, n.cantidad_refrigeradores, n.cantidad_total_puertas, n.calle, n.num_externo, n.colonia
            FROM solicitud s
            JOIN negocio n ON s.id_negocio = n.id_negocio
            WHERE s.fecha_generada > DATEADD(day, -1, GETDATE()) AND s.id_desarrollador = ${id_desarrollador}`;

    const result = await pool.request().query(sql);
    return result.recordset;
  },

  getRecentRequestsRefris: async(id_solicitud)=>{
    const pool = await dbService.poolPromise;
    sql = `SELECT * FROM refrigerador WHERE id_solicitud = ${id_solicitud}`;
    const result = await pool.request().query(sql);
    return result.recordset;
  },
  
};
