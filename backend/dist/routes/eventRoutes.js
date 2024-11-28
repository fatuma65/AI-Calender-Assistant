"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../utilis/auth"));
const createEvent_1 = __importDefault(require("../controllers/eventController/createEvent"));
const retrieveEvents_1 = __importDefault(require("../controllers/eventController/retrieveEvents"));
const updateEvent_1 = __importDefault(require("../controllers/eventController/updateEvent"));
const DeleteEvent_1 = __importDefault(require("../controllers/eventController/DeleteEvent"));
const route = (0, express_1.Router)();
route.post("/events", auth_1.default, createEvent_1.default);
route.get("/event/user/:id", auth_1.default, retrieveEvents_1.default);
route.put("/event/:id", auth_1.default, updateEvent_1.default);
route.delete("/delete/event/:id", auth_1.default, DeleteEvent_1.default);
exports.default = route;
