"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route = require('express').Router();
const createUser_1 = require("../controllers/userController/createUser");
const login_1 = require("../controllers/userController/login");
const validation_1 = __importDefault(require("../middlewares/validation"));
route.post('/register', validation_1.default, createUser_1.createUser);
route.post('/login', login_1.loginUser);
exports.default = route;
