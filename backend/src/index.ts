import dotenv from "dotenv";
import express, { Express } from "express";
import cookieParser = require("cookie-parser");
import userRoutes from "./routes/UserRoutes";
import eventRoutes from "./routes/eventRoutes";
import {googleUser, scopes} from './services/googleCalendar'
import { google } from "googleapis";
import { createUser } from "./controllers/userController/createLoginUser";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/event", eventRoutes);
app.get("/auth/redirect", createUser);
app.listen(port, () => console.log(`Server running on port ${port}`));