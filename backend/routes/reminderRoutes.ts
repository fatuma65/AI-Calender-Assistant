import { IRouter } from "express";
import { Router } from "express";
import authenticateUser from "../utilis/auth";
import getReminders from "../controllers/ReminderController/getReminder";
import deleteReminder from "../controllers/ReminderController/deleteReminder";
import updateReminder from "../controllers/ReminderController/updateReminder";
import createReminder from "../controllers/ReminderController/createReminder";
const route: IRouter = Router();

route.put("/user/update/reminder/:id", authenticateUser, updateReminder);
route.delete("/user/delete/reminder/:id", authenticateUser, deleteReminder);
route.get("/user/reminders", authenticateUser, getReminders);
route.post("/user/reminder/:id", authenticateUser, createReminder);

export default route;
