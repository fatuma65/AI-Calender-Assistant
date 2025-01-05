"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../utilis/auth"));
const createLocation_1 = __importDefault(require("../controllers/LocationController/createLocation"));
const getLocation_1 = __importDefault(require("../controllers/LocationController/getLocation"));
const deleteLocation_1 = __importDefault(require("../controllers/LocationController/deleteLocation"));
const updateLocation_1 = __importDefault(require("../controllers/LocationController/updateLocation"));
const route = (0, express_1.Router)();
route.post("/user/location/:id", auth_1.default, createLocation_1.default);
route.put("/user/update/location/:id", auth_1.default, updateLocation_1.default);
route.delete("/user/delete/location/:id", auth_1.default, deleteLocation_1.default);
route.get("/user/location", auth_1.default, getLocation_1.default);
exports.default = route;
