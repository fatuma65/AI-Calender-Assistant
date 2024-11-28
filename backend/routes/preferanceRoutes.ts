import { IRouter } from "express";
import { Router } from "express";
import authenticateUser from "../utilis/auth";
import createUserPerfreances from "../controllers/userPreferances/createUserPreferances";
import updatePreferances from "../controllers/userPreferances/updatePreferances";
import deletePreferances from "../controllers/userPreferances/deletePreferances";
import getPreferance from "../controllers/userPreferances/getPreferances";
const route: IRouter = Router();

route.post("/user/preferance", authenticateUser, createUserPerfreances);
route.put("/user/update/preferance/:id", authenticateUser, updatePreferances);
route.delete(
  "/user/delete/preferance/:id",
  authenticateUser,
  deletePreferances
);
route.get("/preferances", authenticateUser, getPreferance);

export default route;
