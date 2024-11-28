"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const {route} = require('express').Router()
// import { Router } from "express";
const createUser_1 = require("../controllers/userController/createUser");
const login_1 = require("../controllers/userController/login");
const deleteUser_1 = __importDefault(require("../controllers/userController/deleteUser"));
const auth_1 = __importDefault(require("../utilis/auth"));
const updateUserAccount_1 = __importDefault(require("../controllers/userController/updateUserAccount"));
const validation_1 = __importDefault(require("../utilis/validation"));
const route = express_1.default.Router();
// const route: IRouter = express.Router();
route.post("/users", validation_1.default, createUser_1.createUser);
route.post("/login", (req, res, next) => {
    console.log(req.body);
    next();
}, login_1.loginUser);
route.delete("/delete/:id", auth_1.default, deleteUser_1.default);
route.put("/update/:id", auth_1.default, updateUserAccount_1.default);
route.get('/test', (res) => {
    res.send('Router worked');
});
exports.default = route;
