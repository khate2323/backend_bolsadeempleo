import { getConnect } from "../config/connectionDB.config.js";

export async function saveRefreshToken(userId, token, expiresAt) {
  const client = await getConnect();
  try {
    await client.query(
      `INSERT INTO tbl_refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)`,
      [userId, token, expiresAt]
    );
  } finally {
    client.release();
  }
}

export async function isRefreshTokenValid(userId, token) {
  const client = await getConnect();
  try {
    const res = await client.query(
      `SELECT * FROM tbl_refresh_tokens WHERE user_id = $1 AND token = $2 AND expires_at > NOW()`,
      [userId, token]
    );
    return res.rows.length > 0;
  } finally {
    client.release();
  }
}

export async function deleteRefreshToken(userId, token) {
  const client = await getConnect();
  try {
    await client.query(
      `DELETE FROM tbl_refresh_tokens WHERE user_id = $1 AND token = $2`,
      [userId, token]
    );
  } finally {
    client.release();
  }
}
