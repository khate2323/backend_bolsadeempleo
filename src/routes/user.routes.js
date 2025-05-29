import { Router } from "express";
import {
  changeRoleToUserCtrl,
  createUserCtrl,
  deleteUserCtrl,
  getAllUsersCtrl,
  getInfoSessionCtrl,
  getUserByIdCtrl,
  updateUserCtrl,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.midleware.js";
import { verifyRolesAccept } from "../middlewares/permission.midleware.js";

const routesUser = Router();

routesUser.get(
  "/get-all-users",
  authMiddleware,
  verifyRolesAccept(["ADMINISTRADOR"]),
  getAllUsersCtrl
);
routesUser.get(
  "/get-user/:id",
  authMiddleware,
  verifyRolesAccept(["EMPRESA", "ADMINISTRADOR", "EGRESADO"]),
  getUserByIdCtrl
);

routesUser.get(
  "/get-info-session",
  authMiddleware,
  verifyRolesAccept(["EMPRESA", "ADMINISTRADOR", "EGRESADO"]),
  getInfoSessionCtrl
);
routesUser.post(
  "/create-user",
  authMiddleware,
  verifyRolesAccept(["ADMINISTRADOR"]),
  createUserCtrl
);
routesUser.put(
  "/update-user/:id",
  authMiddleware,
  verifyRolesAccept(["ADMINISTRADOR", "EGRESADO"]),
  updateUserCtrl
);
routesUser.put(
  "/update-role-user/:id",
  authMiddleware,
  verifyRolesAccept(["ADMINISTRADOR"]),
  changeRoleToUserCtrl
);
routesUser.delete(
  "/delete-user/:id",
  authMiddleware,
  verifyRolesAccept(["ADMINISTRADOR"]),
  deleteUserCtrl
);

export { routesUser };
