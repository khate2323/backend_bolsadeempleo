import { getConnect } from "../config/connectionDB.config.js";

export async function getAllUsers() {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      `SELECT us.*, rl.name AS role_name
       FROM tbl_users AS us
       LEFT JOIN tbl_roles AS rl ON us.role_id = rl.id
       WHERE us.is_active = 1`
    );
    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function getUserById(userId) {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      `SELECT us.*, rl.name AS role_name
       FROM tbl_users AS us
       LEFT JOIN tbl_roles AS rl ON us.role_id = rl.id
       WHERE us.id = $1 AND us.is_active = 1`,
      [userId]
    );

    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function createUser(userData) {
  const client = await getConnect();
  try {
    const {
      full_name,
      identification,
      red_id,
      role_id,
      email,
      login,
      password,
    } = userData;
    const resClient = await client.query(
      `INSERT INTO tbl_users (full_name, identification, red_id, role_id, email, login, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [full_name, identification, red_id, role_id, email, login, password]
    );
    return resClient.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function updateUser(id, userData) {
  const client = await getConnect();
  try {
    const { full_name, identification } = userData;
    const resClient = await client.query(
      `UPDATE tbl_users set full_name = $2, identification = $3 WHERE id = $1 RETURNING *`,
      [id, full_name, identification]
    );

    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function changeRoleToUser(id, role_id) {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      `UPDATE tbl_users set role_id = $2 WHERE id = $1 RETURNING *`,
      [id, role_id]
    );

    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function deleteUser(id) {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      `UPDATE tbl_users SET status = 0 WHERE id = $1 RETURNING *`,
      [id]
    );

    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function getUserByLogin(login) {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      `SELECT * FROM tbl_users WHERE login = $1`,
      [login]
    );

    return resClient.rows[0];
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}
