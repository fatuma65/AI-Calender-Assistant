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
const client_1 = __importDefault(require("../../src/client"));
const createUserPerfreances = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const { colorCodingPreferences, defaultEventDuration, notificationPreference, recurrencePatternSummary } = req.body;
    try {
        const preferances = yield client_1.default.userPreferences.create({
            data: {
                userId: id,
                date: new Date(),
                colorCodingPreferences: colorCodingPreferences,
                defaultEventDuration: defaultEventDuration,
                notificationPreference: notificationPreference,
                recurrencePatternSummary: recurrencePatternSummary
            },
        });
        console.log(preferances);
        return res
            .status(201)
            .json({
            message: "Your preferance has been created successfully",
            data: preferances,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = createUserPerfreances;
