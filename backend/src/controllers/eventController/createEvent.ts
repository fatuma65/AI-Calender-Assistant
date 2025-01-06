import { Request, Response } from "express";
import prisma from "../../client";
import { Prisma } from "@prisma/client";
import { CustomRequest} from '../../middlewares/auth'

// Create a new user event
const createEvent = async (req:Request, res: Response) => {
  const user = (req as CustomRequest).user;

  if(user?.id === undefined) {
    console.log(user?.id)
    console.log('User is not defined')
  }
  const {
    title,
    description,
    startTime,
    endTime,
    location,
    tensityLevel,
    category,
    isRecurring,
    recurrencePattern
  } = req.body;

  if (isRecurring === true && !recurrencePattern) {
    console.log('Recurrence pattern is required for recurring events');
    res.status(400).json({ error: "Recurrence pattern is required for recurring events" });
    return;
  }
  else {
  try {
    const newEvent = await prisma.event.create({
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
    res
      .status(201)
      .json({ Message: "Event created successfully", event: newEvent });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
};

export default createEvent;
