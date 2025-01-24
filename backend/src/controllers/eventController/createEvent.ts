import { Request, Response } from "express";
import prisma from "../../client";
import { CustomRequest } from "../../middlewares/auth";
import analyzeEventWithAi from "../../services/chatService";
import { $Enums } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { scheduleEvent } from "../../services/googleCalendar";

export interface EventType {
  description: string | null;
  location: string | null;
  id: string;
  userId: string;
  title: string;
  startTime: Date;
  endTime: Date;
  tensityLevel: $Enums.TensityLevels | null;
  category: string | null;
  isRecurring: boolean;
  recurrencePattern: JsonValue | null;
  createdAt: Date;
  updatedAt: Date;
  // calendarId: string
}
// Create a new user event
const createEvent = async (req: Request, res: Response): Promise<void> => {
  const user = (req as CustomRequest).user.id;

  try {
    const { eventDetails } = req.body;
    const aiSuggestions = await analyzeEventWithAi(eventDetails);
    console.log("Ai suggestions ===========", aiSuggestions);

    const newEvent = await prisma.event.create({
      data: {
        userId: user,
        title: eventDetails.title,
        description: eventDetails.description,
        startTime: eventDetails.startTime,
        endTime: eventDetails.endTime,
        location: eventDetails.location,
        category: eventDetails.category,
        isRecurring: eventDetails.isRecurring,
        tensityLevel: eventDetails.tensityLevel,
        recurrencePattern: eventDetails.recurrencePattern || null,
      },
    });

    // console.log(newEvent);
    await scheduleEvent(newEvent);
    res.json({
      message: "Event created successfully",
      AIResponse: aiSuggestions,
      event: newEvent,
    });
  } catch (error) {
    console.error("Error processing event:", error);
    res.status(500).json({ error: error });
  }
};

export default createEvent;
