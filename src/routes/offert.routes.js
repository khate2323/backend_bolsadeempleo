import { Router } from "express";
import {
  applyToOffertCtrl,
  createOffertCtrl,
  getAllOffertsByCompanyIdCtrl,
  getAllOffertsByIdCtrl,
  getAllOffertsCtrl,
} from "../controllers/offert.controller.js";
import { authMiddleware } from "../middlewares/auth.midleware.js";
import { verifyRolesAccept } from "../middlewares/permission.midleware.js";
const routesOffert = Router();

routesOffert.get("/get-all", authMiddleware, getAllOffertsCtrl);
routesOffert.get("/get-single/:id", authMiddleware, getAllOffertsByIdCtrl);
routesOffert.get(
  "/get-all-company",
  authMiddleware,
  getAllOffertsByCompanyIdCtrl
);
routesOffert.post(
  "/create-offert",
  authMiddleware,
  verifyRolesAccept(["EMPRESA"]),
  createOffertCtrl
);
routesOffert.post(
  "/apply-to-offert",
  authMiddleware,
  verifyRolesAccept(["EGRESADO"]),
  applyToOffertCtrl
);

export { routesOffert };
