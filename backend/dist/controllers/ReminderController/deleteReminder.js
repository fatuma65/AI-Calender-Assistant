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
const deleteReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reminder = yield client_1.default.reminder.delete({
            where: {
                id: req.params.id
            }
        });
        if (!reminder) {
            console.log('Reminder not found');
            res.status(404).json({ error: 'Reminder not found' });
        }
        return (console.log(reminder),
            res.status(200).json({ Message: 'Reminder deleted successfully' }));
    }
    catch (error) {
        console.log('An error has occured');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = deleteReminder;
