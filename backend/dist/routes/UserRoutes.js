"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route = require('express').Router();
const createUser_1 = require("../controllers/userController/createUser");
const login_1 = require("../controllers/userController/login");
const validation_1 = __importDefault(require("../middlewares/validation"));
const updateUserAccount_1 = __importDefault(require("../controllers/userController/updateUserAccount"));
const deleteUser_1 = __importDefault(require("../controllers/userController/deleteUser"));
route.post('/users', validation_1.default, createUser_1.createUser);
route.post('/user', login_1.loginUser);
route.put('/:id', updateUserAccount_1.default);
route.delete('/:id', deleteUser_1.default);
exports.default = route;
