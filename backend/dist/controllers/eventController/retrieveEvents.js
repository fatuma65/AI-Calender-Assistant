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
const googleCalendar_1 = __importDefault(require("../../services/googleCalendar"));
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = (req as CustomRequest).user.id;
    try {
        // const userEvents = await prisma.event.findMany({
        //   where: { userId: id },
        //   include: {
        //     reminders: true,
        //     locationData: true,
        //   },
        // });
        // if (!userEvents || userEvents.length === 0) {
        //   console.log("Event not found");
        //   res.status(404).json({ error: "Event not found" });
        //   return;
        // } else {
        //   console.log(userEvents);
        //   res
        //     .status(200)
        //     .json({ message: "Event retrieved successfully", data: userEvents });
        // }
        googleCalendar_1.default.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime'
        }, (error, result) => {
            var _a;
            if (error) {
                res.send(JSON.stringify({ error: error }));
            }
            else {
                if ((_a = result === null || result === void 0 ? void 0 : result.data.items) === null || _a === void 0 ? void 0 : _a.length) {
                    res.send(JSON.stringify({ message: 'No upcoming events found' }));
                }
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = getEvent;
