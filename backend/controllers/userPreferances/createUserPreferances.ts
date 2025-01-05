import { Request, Response } from "express";
import prisma from "../../src/client";
import { CustomRequest } from "../../utilis/auth";
const createUserPerfreances = async (req: Request, res: Response):Promise<any> => {
  const id = (req as CustomRequest).user.id;
  const {
    colorCodingPreferences,
    defaultEventDuration,
    notificationPreference,
    recurrencePatternSummary
  } = req.body;
  try {
    const preferances = await prisma.userPreferences.create({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default createUserPerfreances;
