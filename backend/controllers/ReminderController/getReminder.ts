import { Request, Response } from "express";
import prisma from "../../src/client";

const getReminders = async (req: Request, res: Response): Promise<any> => {
  try {
    const reminders = await prisma.reminder.findMany({
      where: {
        id: req.params.id,
      },
    });
    if (!reminders || reminders.length === 0) {
      return (
        console.log("reminders not found"),
        res.status(404).json({ error: "reminders not found" })
      );
    } else {
      return res
        .status(200)
        .json({ Message: "reminders retrieved successfully", data: reminders });
    }
  } catch (error) {
    console.log("An error has occured");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getReminders;
