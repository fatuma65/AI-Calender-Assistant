import { Router } from "express";
import express from "express";
import { createUser } from "../controllers/userController/createUser";
import { loginUser } from "../controllers/userController/login";
import deleteUser from "../controllers/userController/deleteUser";
import authenticateUser from "../utilis/auth";
import updateUserInformation from "../controllers/userController/updateUserAccount";

import validateUser from "../utilis/validation";

const route: Router = express.Router();
route.post("/users", validateUser, createUser);
route.post("/login", loginUser);
route.delete("/delete/:id", authenticateUser, deleteUser);
route.put("/update/:id", authenticateUser, updateUserInformation);
export default route;
