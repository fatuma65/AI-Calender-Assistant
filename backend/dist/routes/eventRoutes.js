"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updateEvent_1 = __importDefault(require("../controllers/eventController/updateEvent"));
const DeleteEvent_1 = __importDefault(require("../controllers/eventController/DeleteEvent"));
const createEvent_1 = __importDefault(require("../controllers/eventController/createEvent"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const retrieveEvents_1 = __importDefault(require("../controllers/eventController/retrieveEvents"));
const route = require('express').Router();
route.post('/', auth_1.default, createEvent_1.default);
route.get('/events', auth_1.default, retrieveEvents_1.default);
route.delete('/events/:id', auth_1.default, DeleteEvent_1.default);
route.put('/events/:id', auth_1.default, updateEvent_1.default);
exports.default = route;
