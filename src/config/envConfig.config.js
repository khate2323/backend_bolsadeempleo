process.loadEnvFile();

export const {
  PORT = 100,
  DB_HOST = "localhost",
  DB_PORT = 5432,
  DB_NAME = "db_local",
  DB_USER = "postgres",
  DB_PASSWORD = "",
  JWT_SECRET = "scrtKeyJwtBolsaEmpleoUni",
  MAIL_PASS = "123",
  MAIL_USER = "example@gmail.com",
  MAIL_SERVER = "server",
  ACCESS_TOKEN_SECRET = "secret",
  REFRESH_TOKEN_SECRET = "secretRfs",
  ACCESS_TOKEN_EXPIRES_IN = "3600m",
  REFRESH_TOKEN_EXPIRES_IN = "30d",
} = process.env;
