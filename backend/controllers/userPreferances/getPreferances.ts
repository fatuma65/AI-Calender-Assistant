import prisma from "../../src/client";
import { Request, Response } from "express";
import { CustomRequest } from "../../utilis/auth";

const getPreferance = async (req: Request, res: Response) => {
  const id = (req as CustomRequest).user.id;
  try {
    const userPreferances = await prisma.userPreferences.findMany({
      where: { userId: id },
    });
    if(userPreferances.length === 0) {
      res.status(404).json({error:'You dont have preferances yet'})
      return
    }
    else {
      res
      .status(200)
      .json({
        message: "Your Preferances retrieved successfully",
        data: userPreferances,
      });
    }
  
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getPreferance;
