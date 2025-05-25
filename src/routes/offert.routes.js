import { Router } from "express";
import {
  createOffertCtrl,
  getAllOffertsCtrl,
} from "../controllers/offert.controller.js";
import { authMiddleware } from "../middlewares/auth.midleware.js";
import { verifyRolesAccept } from "../middlewares/permission.midleware.js";
const routesOffert = Router();

routesOffert.get("/get-all", authMiddleware, getAllOffertsCtrl);
routesOffert.post(
  "/create-offert",
  authMiddleware,
  verifyRolesAccept(["EMPRESA", 'ADMINISTRADOR']),
  createOffertCtrl
);

export { routesOffert };
