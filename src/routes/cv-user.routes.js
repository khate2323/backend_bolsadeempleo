import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.midleware.js";
import { verifyRolesAccept } from "../middlewares/permission.midleware.js";
import {
  addEducacionCtrl,
  addExperienciaCtrl,
  addIdiomaCtrl,
  createCVCtrl,
  getCVByEgresadoIdCtrl,
  getEducacionByCVCtrl,
  getExperienciasByCVCtrl,
  getIdiomasByCVCtrl,
  updateCVByIdCtrl,
} from "../controllers/cv-user.controller.js";
const routesCvUser = Router();

routesCvUser.get(
  "/get-cv-egresado/:idUser",
  authMiddleware,
  getCVByEgresadoIdCtrl
);
routesCvUser.post(
  "/create-cv-egresado",
  authMiddleware,
  verifyRolesAccept(["EGRESADO"]),
  createCVCtrl
);

routesCvUser.put(
  "/update-cv-egresado/:idCv",
  authMiddleware,
  verifyRolesAccept(["EGRESADO"]),
  updateCVByIdCtrl
);
routesCvUser.get(
  "/get-cv-experiences/:idCv",
  authMiddleware,
  getExperienciasByCVCtrl
);
routesCvUser.post(
  "/create-cv-experience",
  authMiddleware,
  verifyRolesAccept(["EGRESADO"]),
  addExperienciaCtrl
);
routesCvUser.get(
  "/get-cv-educations/:idCv",
  authMiddleware,
  getEducacionByCVCtrl
);
routesCvUser.post(
  "/create-cv-education",
  authMiddleware,
  verifyRolesAccept(["EGRESADO"]),
  addEducacionCtrl
);

routesCvUser.get(
  "/get-cv-languages/:idCv",
  authMiddleware,
  getIdiomasByCVCtrl
);
routesCvUser.post(
  "/create-cv-language",
  authMiddleware,
  verifyRolesAccept(["EGRESADO"]),
  addIdiomaCtrl
);

export { routesCvUser };
