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

// app.get('/auth/redirect', async (req, res) => {
//     const code = req.query.code as string
//     const {tokens} = await googleUser.getToken(code )
//     googleUser.setCredentials(tokens)

//     const outh2 = google.oauth2({
//         auth: googleUser,
//         version: 'v2'
//     })
//     const userInfo = await outh2.userinfo.get()
//     const {email, name, given_name, family_name} = userInfo.data

//     // await createUser(userInfo.data)

//     res.send(`Authentication successfull, please return to the console welcome, ${name}`)
//     res.json({email, name, given_name, family_name})
// })
app.listen(port, () => console.log(`Server running on port ${port}`));

// export default app;