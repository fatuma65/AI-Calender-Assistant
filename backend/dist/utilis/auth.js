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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../src/client"));
const secretKey = process.env.SECRET_KEY || "a861582a-c445-4462-94c9";
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("Authorization header is missing");
        res.status(401).json({ error: "You are not authorized" });
        return;
    }
    try {
        const token = authHeader.replace("Bearer ", "");
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        const user = yield client_1.default.user.findUnique({ where: { id: decodedToken.id } });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        req.user = {
            id: user.id,
            email: user.email,
            iat: decodedToken.iat,
            exp: decodedToken.exp,
        };
        // req.user = user
        next();
    }
    catch (error) {
        console.log("Invalid token");
        res.status(401).json({ error: "Invalid token provided" });
    }
});
exports.default = authenticateUser;
