import { Express } from "express";
const route: Express = require("express").Router();

import { loginUser } from "../controllers/userController/login";
import deleteUser from "../controllers/userController/deleteUser";
import { googleUser, scopes } from "../services/googleCalendar";

route.get("/auth", (req, res) => {
  const url = googleUser.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(url);
});
route.post("/user", loginUser);
route.delete("/:id", deleteUser);

export default route;