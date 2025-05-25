import {
  DB_PORT,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
} from "./envConfig.config.js";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: DB_HOST,
  port: parseInt(DB_PORT),
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
});

async function getConnect() {
  try {
    const client = await pool.connect();
    return client;
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    throw error;
  }
}

export { getConnect };
