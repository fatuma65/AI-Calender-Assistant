import { Request, Response } from "express";
import prisma from "../../src/client";

const updateReminder = async (req: Request, res: Response): Promise<any> => {
  try {
    const reminder = await prisma.reminder.update({
      data: req.body,
      where: {
        id: req.params.id,
      },
    });
    if (!reminder) {
      console.log("reminder not found");
      res.status(404).json({ error: "reminder not found" });
    }
    return (
      console.log(reminder),
      res.status(200).json({ Message: "reminder updated successfully" })
    );
  } catch (error) {
    console.log("An error has occured");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default updateReminder;
