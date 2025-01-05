import { Request, Response } from "express";
import prisma from "../../src/client";

const getLocation = async (req: Request, res: Response): Promise<any> => {
  try {
    const locations = await prisma.reminder.findMany({
      where: {
        id: req.params.id,
      },
    });
    if (!locations || locations.length === 0) {
      return (
        console.log("location not found"),
        res.status(404).json({ error: "location not found" })
      );
    } else {
      return (
        console.log(locations),
        res
          .status(200)
          .json({ Message: "location retrieved successfully", data: locations })
      );
    }
  } catch (error) {
    console.log("An error has occured");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getLocation;
