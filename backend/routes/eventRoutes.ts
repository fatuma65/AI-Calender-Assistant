import { IRouter } from "express";
import { Router } from "express";
import authenticateUser from "../utilis/auth";
import createEvent from "../controllers/eventController/createEvent";
import getEvent from "../controllers/eventController/retrieveEvents";
import updateUserEvent from "../controllers/eventController/updateEvent";
import deleteEvent from "../controllers/eventController/DeleteEvent";
const route: IRouter = Router();

route.post("/events", authenticateUser, createEvent);
route.get("/event/user/:id", authenticateUser, getEvent);
route.put("/event/:id", authenticateUser, updateUserEvent);
route.delete("/delete/event/:id", authenticateUser, deleteEvent);

export default route;
