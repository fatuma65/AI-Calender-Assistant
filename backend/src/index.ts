import dotenv from "dotenv";
import express, { Express } from "express";
import cookieParser = require("cookie-parser");
import userRoutes from "./routes/UserRoutes";
import eventRoutes from "./routes/eventRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/events", eventRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
