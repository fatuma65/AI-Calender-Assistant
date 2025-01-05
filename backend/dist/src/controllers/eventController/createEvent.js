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
const client_1 = __importDefault(require("../../client"));
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if ((user === null || user === void 0 ? void 0 : user.id) === undefined) {
        console.log(user === null || user === void 0 ? void 0 : user.id);
        console.log('User is not defined');
    }
    const { title, description, startTime, endTime, location, tensityLevel, category, isRecurring, recurrencePattern } = req.body;
    if (isRecurring === true && !recurrencePattern) {
        console.log('Recurrence pattern is required for recurring events');
        res.status(400).json({ error: "Recurrence pattern is required for recurring events" });
        return;
    }
    else {
        try {
            const newEvent = yield client_1.default.event.create({
                data: {
                    userId: user.id,
                    title: title,
                    description: description,
                    startTime: new Date(startTime),
                    endTime: new Date(endTime),
                    location: location,
                    category: category,
                    isRecurring: isRecurring,
                    tensityLevel: tensityLevel,
                    recurrencePattern: recurrencePattern || null
                    // recurrencePattern: recurrencePattern || {
                    //     frequency: "daily",
                    //     day: new Date().getDay()
                    // },   
                },
            });
            console.log(newEvent);
            res
                .status(201)
                .json({ Message: "Event created successfully", event: newEvent });
        }
        catch (error) {
            console.log("Failed to create event", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});
exports.default = createEvent;
