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
const chatService_1 = __importDefault(require("../../services/chatService"));
// Create a new user event
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user.id;
    try {
        const { eventDetails } = req.body;
        const aiSuggestions = yield (0, chatService_1.default)(eventDetails);
        console.log("Ai suggestions ===========", aiSuggestions);
        //   const newEvent = await prisma.event.create({
        //     data: {
        //       userId: user,
        //       title: eventDetails.title,
        //       description: eventDetails.description,
        //       startTime: eventDetails.startTime,
        //       endTime: eventDetails.endTime,
        //       location: eventDetails.location,
        //       category: eventDetails.category,
        //       isRecurring: eventDetails.isRecurring,
        //       tensityLevel: eventDetails.tensityLevel,
        //       recurrencePattern: eventDetails.recurrencePattern || null,
        //     },
        //   });
        // console.log(newEvent);
        // res.json({
        //   message: "Event created successfully",
        //   AIResponse: aiSuggestions,
        // });
    }
    catch (error) {
        console.error("Error processing event:", error);
        res.status(500).json({ error: error });
    }
});
exports.default = createEvent;
