import { getConnect } from "../config/connectionDB.config.js";

export async function getAllOfferts() {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      "SELECT * FROM tbl_offerts WHERE is_active = 1"
    );
    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function getAllOffertsByCompanyId(company_id, is_active = 1) {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      "SELECT * FROM tbl_offerts WHERE company_id = $1 and is_active = $2",
      [company_id, is_active]
    );
    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function getOffertById(id) {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      `SELECT * FROM tbl_offerts WHERE id = $1 AND is_active = 1`,
      [id]
    );

    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function createOffert(offertData) {
  const client = await getConnect();
  try {
    const {
      company_id,
      title,
      description,
      location,
      modality,
      employment_type,
      salary_min,
      salary_max,
      currency,
      vacancies,
      requirements,
      responsibilities,
      is_external,
      external_source,
      expires_at,
    } = offertData;
    const resClient = await client.query(
      `INSERT INTO tbl_offerts 
        (
            company_id, title,
            description, location,
            modality, employment_type,
            salary_min, salary_max,
            currency, vacancies,
            requirements, responsibilities,
            is_external, external_source,
            expires_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [
        company_id,
        title,
        description,
        location,
        modality,
        employment_type,
        salary_min,
        salary_max,
        currency,
        vacancies,
        requirements,
        responsibilities,
        is_external,
        external_source,
        expires_at,
      ]
    );
    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function updateOffert(id, offertData) {
  const client = await getConnect();
  try {
    const {
      title,
      description,
      location,
      modality,
      employment_type,
      salary_min,
      salary_max,
      currency,
      vacancies,
      requirements,
      responsibilities,
      is_external,
      external_source,
      expires_at,
    } = offertData;

    const resClient = await client.query(
      `UPDATE tbl_offerts SET
        title = $2,
        description = $3,
        location = $4,
        modality = $5,
        employment_type = $6,
        salary_min = $7,
        salary_max = $8,
        currency = $9,
        vacancies = $10,
        requirements = $11,
        responsibilities = $12,
        is_external = $13,
        external_source = $14,
        expires_at = $15,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $16
      RETURNING *`,
      [
        title,
        description,
        location,
        modality,
        employment_type,
        salary_min,
        salary_max,
        currency,
        vacancies,
        requirements,
        responsibilities,
        is_external,
        external_source,
        expires_at,
        id,
      ]
    );

    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function deleteOffert(id) {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      `UPDATE tbl_offerts SET is_active = 0 WHERE id = $1 RETURNING *`,
      [id]
    );

    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

//! Applications to offerts

export async function isOffertValidForApplication(id) {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      `SELECT id FROM tbl_offerts 
       WHERE id = $1 
         AND is_active = 1 
         AND (expires_at IS NULL OR expires_at > NOW())`,
      [id]
    );

    return resClient.rowCount > 0;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function hasUserApplied(userId, offertId) {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      `SELECT id FROM tbl_applications WHERE user_id = $1 AND offert_id = $2`,
      [userId, offertId]
    );

    return resClient.rowCount > 0;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function applyToOffert(userId, offertId) {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      `INSERT INTO tbl_applications (user_id, offert_id) VALUES ($1, $2) RETURNING *`,
      [userId, offertId]
    );

    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function changeStatusToApplicationOffert(id, newStatus) {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      `UPDATE tbl_applications SET status = $1 WHERE id = $2 RETURNING *`,
      [newStatus, id]
    );

    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}
