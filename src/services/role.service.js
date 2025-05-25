import { getConnect } from "../config/connectionDB.config.js";

export async function getAllRoles() {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      "SELECT * FROM tbl_roles WHERE is_active = 1"
    );
    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function createRole(roleData) {
  const client = await getConnect();
  try {
    const { name, description } = roleData;
    const resClient = await client.query(
      `INSERT INTO tbl_roles (name, description, is_active) VALUES ($1, $2, $3) RETURNING *`,
      [name, description, 1]
    );
    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function getRoleById(roleId) {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      `SELECT * FROM tbl_roles WHERE id = $1 AND is_active = 1`,
      [roleId]
    );

    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function updateRole(roleData) {
  const client = await getConnect();
  try {
    const { id, name, description } = roleData;
    const resClient = await client.query(
      `UPDATE tbl_roles set name = $2, description = $3 WHERE id = $1 RETURNING *`,
      [id, name, description]
    );

    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}

export async function deleteRole(id) {
  const client = await getConnect();
  try {
    const resClient = await client.query(
      `UPDATE tbl_roles SET is_active = 0 WHERE id = $1 RETURNING *`,
      [id]
    );

    return resClient.rows;
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
}
