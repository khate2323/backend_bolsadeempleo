import jwt from "jsonwebtoken";
import {
  isRefreshTokenValid,
  saveRefreshToken,
  deleteRefreshToken,
} from "../services/refresh-token.service.js";
import {
  badRequestRes,
  successRes,
  unauthorizedRes,
} from "../handlers/response.handler.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../handlers/jwt.handler.js";
import { REFRESH_TOKEN_SECRET } from "../config/envConfig.config.js";

export async function refreshTokenCtrl(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return badRequestRes(res, ["Refresh token requerido"]);

  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    console.log(payload);

    const valid = await isRefreshTokenValid(payload.userId, refreshToken);
    if (!valid) return unauthorizedRes(res, "Refresh token inválido");

    const newAccessToken = generateAccessToken(payload.userId);
    const newRefreshToken = generateRefreshToken(payload.userId);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días

    await deleteRefreshToken(payload.userId, refreshToken);
    await saveRefreshToken(payload.userId, newRefreshToken, expiresAt);

    return successRes(res, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return unauthorizedRes(res, "Refresh token inválido o expirado");
  }
}
