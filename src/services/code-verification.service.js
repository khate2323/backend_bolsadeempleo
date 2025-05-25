import { getConnect } from "../config/connectionDB.config.js";

export async function createCode(codeData) {
  const client = await getConnect();
  try {
    const { code, user_id, expires_at, type } = codeData;
    const resClient = await client.query(
      `INSERT INTO tbl_codes_verification (code, user_id, expires_at, type) VALUES ($1, $2, $3, $4) RETURNING *`,
      [code, user_id, expires_at, type]
    );
    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function getCodeByUserId(code, userId) {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      `SELECT * FROM tbl_codes_verification WHERE code = $1 AND user_id = $2 AND is_used = $3`,
      [code, userId, 0]
    );
    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function markCodeIsUsed(id) {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      `UPDATE tbl_codes_verification SET is_used = $2 WHERE id = $1 RETURNING *`,
      [id, 1]
    );
    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}
