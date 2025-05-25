import { forbiddenRes } from "../handlers/response.handler.js";
import { getRoleById } from "../services/role.service.js";

export function verifyRolesAccept(roles = []) {
  return async function (req, res, next) {
    const { userId } = req;

    const role = await getRoleById(userId);
    if (role.length === 0) return forbiddenRes(res, "No autorizado");

    if (!roles.includes(role[0].name))
      return forbiddenRes(res, "No autorizado");

    next();
  };
}
