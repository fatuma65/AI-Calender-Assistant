import { Request, Response } from "express";
import prisma from "../../src/client";
import { CustomRequest } from "../../utilis/auth";
const createLocationData = async (req: Request, res: Response):Promise<any> => {
  const id = (req as CustomRequest).user.id;
  const {
    location,
  } = req.body;
  try {
    const locationData = await prisma.locationData.create({
      data: {
        userId: id,
        eventId: req.params.id,
        location: location
      },
    });

    return res
      .status(201)
      .json({
        message: "Your preferance has been created successfully",
        data: locationData,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default createLocationData;
