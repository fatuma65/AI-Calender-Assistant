"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cookieParser = require("cookie-parser");
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const googleCalendar_1 = require("./services/googleCalendar");
const googleapis_1 = require("googleapis");
const createUser_1 = require("./controllers/userController/createUser");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(cookieParser());
app.use("/api", UserRoutes_1.default);
app.use("/api", eventRoutes_1.default);
app.get('/auth', (req, res) => {
    const url = googleCalendar_1.googleUser.generateAuthUrl({
        access_type: 'offline',
        scope: googleCalendar_1.scopes
    });
    res.redirect(url);
});
app.get('/auth/redirect', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    const { tokens } = yield googleCalendar_1.googleUser.getToken(code);
    googleCalendar_1.googleUser.setCredentials(tokens);
    const outh2 = googleapis_1.google.oauth2({
        auth: googleCalendar_1.googleUser,
        version: 'v2'
    });
    const userInfo = yield outh2.userinfo.get();
    const { email, name, given_name, family_name } = userInfo.data;
    yield (0, createUser_1.createUser)(userInfo.data);
    res.send(`Authentication successfull, please return to the console welcome, ${name}`);
    res.json({ email, name, given_name, family_name });
}));
app.listen(port, () => console.log(`Server running on port ${port}`));
// export default app;
