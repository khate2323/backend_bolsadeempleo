import { Router } from "express";
import {
  loginCtrl,
  registerUserCtrl,
  verifyUserCtrl,
} from "../controllers/auth.controller.js";
import { refreshTokenCtrl } from "../controllers/refresh-token.controller.js";

const routesAuth = Router();
routesAuth.post("/login", loginCtrl);
routesAuth.post("/register-user", registerUserCtrl);
routesAuth.post("/verify-code-user", verifyUserCtrl);
routesAuth.post("/refresh-token", refreshTokenCtrl);

export { routesAuth };
