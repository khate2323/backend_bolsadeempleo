import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/envConfig.config.js";
import { forbiddenRes, unauthorizedRes } from "../handlers/response.handler.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return unauthorizedRes(res, ["Token no proporcionado"]);

  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.userId = payload.userId;
    req.userId = payload.userId;
    next();
  } catch (error) {
    console.log(error);

    if (error?.message === "invalid signature")
      return unauthorizedRes(res, ["Token inválido"]);

    if (error?.message === "jwt expired")
      return forbiddenRes(res, ["Sessión caducada"]);

    return unauthorizedRes(res, ["Token no proporcionado"]);
  }
}
