import { Request, Response } from "express";
import prisma from "../../src/client";

const updateLocation = async (req: Request, res: Response): Promise<any> => {
  try {
    const location = await prisma.locationData.update({
      data: req.body,
      where: {
        id: req.params.id,
      },
    });
    if (!location) {
      console.log("location not found");
      res.status(404).json({ error: "location not found" });
    }
    return (
      console.log(location),
      res.status(200).json({ Message: "location updated successfully" })
    );
  } catch (error) {
    console.log("An error has occured");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default updateLocation;
