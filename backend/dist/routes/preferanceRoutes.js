"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../utilis/auth"));
const createUserPreferances_1 = __importDefault(require("../controllers/userPreferances/createUserPreferances"));
const updatePreferances_1 = __importDefault(require("../controllers/userPreferances/updatePreferances"));
const deletePreferances_1 = __importDefault(require("../controllers/userPreferances/deletePreferances"));
const getPreferances_1 = __importDefault(require("../controllers/userPreferances/getPreferances"));
const route = (0, express_1.Router)();
route.post("/user/preferance", auth_1.default, createUserPreferances_1.default);
route.put("/user/update/preferance/:id", auth_1.default, updatePreferances_1.default);
route.delete("/user/delete/preferance/:id", auth_1.default, deletePreferances_1.default);
route.get("/preferances", auth_1.default, getPreferances_1.default);
exports.default = route;
