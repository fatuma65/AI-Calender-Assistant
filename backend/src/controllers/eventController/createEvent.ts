import { Request, Response } from "express";
import prisma from "../../client";
import { Prisma } from "@prisma/client";
import { CustomRequest } from "../../middlewares/auth";
import analyzeEventWithAi from "../../services/chatService";
import {
  checkAvailability,
  scheduleEvent,
} from "../../services/googleCalenderService";
import getOptimalTimeSlot from "./retrieveEvents";
import { findOptimalTimeSlot, checkConflicts } from "../../utilis/scheduling";

// Create a new user event
const createEvent = async (req: Request, res: Response): Promise<void> => {
  const user = (req as CustomRequest).user.id;

  // if (user?.id === undefined) {
  //   console.log(user?.id);
  //   console.log("User is not defined");
  // }
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
    const aiSuggestions = await analyzeEventWithAi(eventDetails);

    const timeSlot = await findOptimalTimeSlot(eventDetails, user);

    const conflicts = await checkConflicts(timeSlot, user);
    if (conflicts.length > 0) {
      console.log("There are conflicts with your dates");
    }

    const newEvent = await prisma.event.create({
      data: {
        userId: user,
        title: eventDetails.title,
        description: eventDetails.description,
        startTime: timeSlot?.startTime,
        endTime: timeSlot?.endTime,
        location: eventDetails.location,
        category: eventDetails.category,
        isRecurring: eventDetails.isRecurring,
        tensityLevel: eventDetails.tensityLevel,
        recurrencePattern: eventDetails.recurrencePattern || null,
      },
    });

    // const busySlots = await checkAvailability(
    //   aiSuggestions.suggestedStartTime,
    //   aiSuggestions.suggestedEndTime
    // );

    await scheduleEvent(newEvent, user);

    res.json({
      message: "Event created successfully",
      // scheduledTime: aiSuggestions.suggestedStartTime,
      conficts: conflicts.length > 0 ? { original: aiSuggestions } : null,
    });
  } catch (error) {
    console.error("Error processing event:", error);
    res.status(500).json({ error: error });
  }
};

export default createEvent;
