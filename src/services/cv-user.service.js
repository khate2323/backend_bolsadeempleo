import { getConnect } from "../config/connectionDB.config.js";

/* ------------------------ HOJA DE VIDA ------------------------ */

export async function getCVByEgresadoId(id) {
  const client = await getConnect();
  try {
    const res = await client.query(`SELECT * FROM tbl_cvs WHERE user_id = $1`, [
      id,
    ]);
    return res.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function createCV(data) {
  const client = await getConnect();
  const {
    user_id,
    titulo,
    descripcion,
    foto_url,
    correo,
    telefono,
    sitio_web,
    estado_documento = "Pendiente",
  } = data;

  try {
    const res = await client.query(
      `INSERT INTO tbl_cvs 
        (user_id, titulo, descripcion, foto_url, correo, telefono, sitio_web, estado_documento) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        user_id,
        titulo,
        descripcion,
        foto_url,
        correo,
        telefono,
        sitio_web,
        estado_documento,
      ]
    );
    return res.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function updateCVById(id, data) {
  const client = await getConnect();
  const {
    titulo,
    direccion,
    descripcion,
    foto_url,
    correo,
    telefono,
    sitio_web,
    estado_documento,
  } = data;

  try {
    const res = await client.query(
      `UPDATE tbl_cvs SET 
        titulo = $1,
        direccion = $2,
        descripcion = $3,
        foto_url = $4,
        correo = $5,
        telefono = $6,
        sitio_web = $7,
        estado_documento = $8,
        fecha_actualizacion = CURRENT_TIMESTAMP
       WHERE id = $9 RETURNING *`,
      [
        titulo,
        direccion,
        descripcion,
        foto_url,
        correo,
        telefono,
        sitio_web,
        estado_documento,
        id,
      ]
    );
    return res.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

/* -------------------- EXPERIENCIA LABORAL --------------------- */

export async function getExperienciasByCV(cvId) {
  const client = await getConnect();
  try {
    const res = await client.query(
      `SELECT * FROM tbl_user_experiences WHERE cv_id = $1`,
      [cvId]
    );
    return res.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function addExperiencia(data) {
  const client = await getConnect();
  const { cv_id, cargo, empresa, descripcion, fecha_inicio, fecha_fin } =
    data;

  try {
    const res = await client.query(
      `INSERT INTO tbl_user_experiences 
        (cv_id, cargo, empresa, descripcion, fecha_inicio, fecha_fin)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [cv_id, cargo, empresa, descripcion, fecha_inicio, fecha_fin]
    );
    return res.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

/* ------------------------- EDUCACIÓN -------------------------- */

export async function getEducacionByCV(cvId) {
  const client = await getConnect();
  try {
    const res = await client.query(
      `SELECT * FROM tbl_educations WHERE cv_id = $1`,
      [cvId]
    );
    return res.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function addEducacion(data) {
  const client = await getConnect();
  const {
    cv_id,
    titulo,
    institucion,
    descripcion,
    fecha_inicio,
    fecha_fin,
  } = data;

  try {
    const res = await client.query(
      `INSERT INTO tbl_educations 
        (cv_id, titulo, institucion, descripcion, fecha_inicio, fecha_fin)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [cv_id, titulo, institucion, descripcion, fecha_inicio, fecha_fin]
    );
    return res.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

/* --------------------------- IDIOMAS -------------------------- */

export async function getIdiomasByCV(cvId) {
  const client = await getConnect();
  try {
    const res = await client.query(
      `SELECT * FROM tbl_languages WHERE cv_id = $1`,
      [cvId]
    );
    return res.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function addIdioma(data) {
  const client = await getConnect();
  const { cv_id, idioma, nivel } = data;

  try {
    const res = await client.query(
      `INSERT INTO tbl_languages 
        (cv_id, idioma, nivel)
       VALUES ($1, $2, $3) RETURNING *`,
      [cv_id, idioma, nivel]
    );
    return res.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}
