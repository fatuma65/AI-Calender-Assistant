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
exports.loginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = __importDefault(require("../../client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY || "123456";
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("Password and email is required");
        res.status(400).json({ error: "Please provide email and password" });
    }
    else {
        const user = yield client_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            const passwordIsValid = yield bcrypt_1.default.compare(password, '1234');
            if (passwordIsValid) {
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secretKey, {
                    expiresIn: "48h",
                });
                console.log(token);
                res
                    .cookie("authToken", token, {
                    httpOnly: true,
                    maxAge: 48 * 60 * 60 * 1000,
                    // secure: process.env.NODE_ENV === "production",
                })
                    .status(200)
                    .json({
                    Message: "User logged in successfully",
                    token: token,
                });
            }
            else {
                console.log("Password is wrong, Please provide the correct password");
                res.status(404).json({
                    error: "Password is wrong, Please provide the correct password",
                });
            }
        }
        else {
            console.log("User not found");
            res.status(404).json({ error: "User not found" });
            return;
        }
    }
});
exports.loginUser = loginUser;
