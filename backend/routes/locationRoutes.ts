import { IRouter } from "express";
import { Router } from "express";
import authenticateUser from "../utilis/auth";
import createLocationData from "../controllers/LocationController/createLocation";
import getLocation from "../controllers/LocationController/getLocation";
import deleteLocation from "../controllers/LocationController/deleteLocation";
import updateLocation from "../controllers/LocationController/updateLocation";
const route: IRouter = Router();

route.post("/user/location/:id", authenticateUser, createLocationData);
route.put("/user/update/location/:id", authenticateUser, updateLocation);
route.delete("/user/delete/location/:id", authenticateUser, deleteLocation);
route.get("/user/location", authenticateUser, getLocation);

export default route;
