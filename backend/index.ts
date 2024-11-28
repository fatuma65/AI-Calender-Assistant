import dotenv from "dotenv";
import express, { Express } from "express";
import cookieParser = require("cookie-parser");

import userRoutes from "./routes/UserRoutes";
import eventRoutes from "./routes/eventRoutes";
import preferenceRoutes from "./routes/preferanceRoutes";
import reminderRoutes from "./routes/reminderRoutes";
import locationRoutes from "./routes/locationRoutes";
dotenv.config();

const app: Express = express()
const port = process.env.PORT || 4000;
app.use(express.json());
app.use("/api", userRoutes);
app.use("/events", eventRoutes);
app.use("/users", preferenceRoutes);
app.use("/reminders", reminderRoutes);
app.use("/locations", locationRoutes);
app.use(cookieParser());



app.listen(port, () => console.log(`Server running on port ${port}`));
