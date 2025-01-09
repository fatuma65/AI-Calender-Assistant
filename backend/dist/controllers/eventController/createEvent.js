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
const chatService_1 = __importDefault(require("../../services/chatService"));
const googleCalenderService_1 = require("../../services/googleCalenderService");
const scheduling_1 = require("../../utilis/scheduling");
// Create a new user event
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if ((user === null || user === void 0 ? void 0 : user.id) === undefined) {
        console.log(user === null || user === void 0 ? void 0 : user.id);
        console.log("User is not defined");
    }
    //   const {
    //     title,
    //     description,
    //     startTime,
    //     endTime,
    //     location,
    //     tensityLevel,
    //     category,
    //     isRecurring,
    //     recurrencePattern
    //   } = req.body;
    //   if (isRecurring === true && !recurrencePattern) {
    //     console.log('Recurrence pattern is required for recurring events');
    //     res.status(400).json({ error: "Recurrence pattern is required for recurring events" });
    //     return;
    //   }
    //   else {
    //   try {
    //     const newEvent = await prisma.event.create({
    //       data: {
    //         userId: user.id,
    //         title: title,
    //         description: description,
    //         startTime: new Date(startTime),
    //         endTime: new Date(endTime),
    //         location: location,
    //         category: category,
    //         isRecurring: isRecurring,
    //         tensityLevel: tensityLevel,
    //         recurrencePattern: recurrencePattern || null
    //         // recurrencePattern: recurrencePattern || {
    //         //     frequency: "daily",
    //         //     day: new Date().getDay()
    //         // },
    //       },
    //     });
    //     res
    //       .status(201)
    //       .json({ Message: "Event created successfully", event: newEvent });
    //   } catch (error) {
    //     res.status(500).json({ error: "Internal Server Error" });
    //   }
    // }
    try {
        const { eventDetails } = req.body;
        const aiSuggestions = yield (0, chatService_1.default)(eventDetails);
        const timeSlot = yield (0, scheduling_1.findOptimalTimeSlot)(eventDetails, user);
        const conflicts = yield (0, scheduling_1.checkConflicts)(timeSlot, user);
        if (conflicts.length > 0) {
            console.log("There are conflicts with your dates");
        }
        const newEvent = yield client_1.default.event.create({
            data: {
                userId: user.id,
                title: eventDetails.title,
                description: eventDetails.description,
                startTime: timeSlot.startTime,
                endTime: timeSlot.endTime,
                location: eventDetails.location,
                category: eventDetails.category,
                isRecurring: eventDetails.isRecurring,
                tensityLevel: eventDetails.tensityLevel,
                recurrencePattern: eventDetails.recurrencePattern || null,
                // recurrencePattern: recurrencePattern || {
                //     frequency: "daily",
                //     day: new Date().getDay()
                // },
            },
        });
        // const busySlots = await checkAvailability(
        //   aiSuggestions.suggestedStartTime,
        //   aiSuggestions.suggestedEndTime
        // );
        yield (0, googleCalenderService_1.scheduleEvent)(newEvent, user);
        return res.json({
            message: "Event created successfully",
            // scheduledTime: aiSuggestions.suggestedStartTime,
            conficts: conflicts.length > 0 ? { original: aiSuggestions } : null
        });
    }
    catch (error) {
        console.error("Error processing event:", error);
        res.status(500).json({ error: error });
    }
});
exports.default = createEvent;
