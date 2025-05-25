import { Router } from "express";
import {
  changeRoleToUserCtrl,
  createUserCtrl,
  deleteUserCtrl,
  getAllUsersCtrl,
  getUserByIdCtrl,
  updateUserCtrl,
} from "../controllers/user.controller.js";

const routesUser = Router();

routesUser.get("/get-all-users", getAllUsersCtrl);
routesUser.get("/get-user/:id", getUserByIdCtrl);
routesUser.post("/create-user", createUserCtrl);
routesUser.put("/update-user/:id", updateUserCtrl);
routesUser.put("/update-role-user/:id", changeRoleToUserCtrl);
routesUser.delete("/delete-user/:id", deleteUserCtrl);

export { routesUser };
