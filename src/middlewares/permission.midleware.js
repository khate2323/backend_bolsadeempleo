import { forbiddenRes } from "../handlers/response.handler.js";
import { getUserById } from "../services/user.service.js";

export function verifyRolesAccept(roles = []) {
  return async function (req, res, next) {
    const { userId } = req;

    const user = await getUserById(userId);

    if (user.length === 0) return forbiddenRes(res, "No autorizado");

    if (!roles.includes(user[0].role_name))
      return forbiddenRes(res, "No autorizado");

    req.user = user[0];
    next();
  };
}
