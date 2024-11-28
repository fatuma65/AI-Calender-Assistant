"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../utilis/auth"));
const getReminder_1 = __importDefault(require("../controllers/ReminderController/getReminder"));
const deleteReminder_1 = __importDefault(require("../controllers/ReminderController/deleteReminder"));
const updateReminder_1 = __importDefault(require("../controllers/ReminderController/updateReminder"));
const createReminder_1 = __importDefault(require("../controllers/ReminderController/createReminder"));
const route = (0, express_1.Router)();
route.put("/user/update/reminder/:id", auth_1.default, updateReminder_1.default);
route.delete("/user/delete/reminder/:id", auth_1.default, deleteReminder_1.default);
route.get("/user/reminders", auth_1.default, getReminder_1.default);
route.post("/user/reminder/:id", auth_1.default, createReminder_1.default);
exports.default = route;
