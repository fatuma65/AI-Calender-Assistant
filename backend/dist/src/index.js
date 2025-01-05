"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cookieParser = require("cookie-parser");
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(cookieParser());
app.use("/api/users", UserRoutes_1.default);
app.use("/events", eventRoutes_1.default);
app.listen(port, () => console.log(`Server running on port ${port}`));
