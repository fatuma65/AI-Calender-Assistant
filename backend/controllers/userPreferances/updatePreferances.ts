import { Request, Response } from "express";
import prisma from "../../src/client";
const updatePreferances = async (req: Request, res: Response): Promise<any> => {
  try {
    const prefrance = await prisma.userPreferences.update({
      where: { id: req.params.id },
      data: req.body,
    });

    if (prefrance) {
      console.log(prefrance);
      return res
        .status(200)
        .json({ message: "Preferance updated successfully", data: prefrance });
    } else {
      console.log("Preferance not found");
      res.status(404).json({ error: "Preferance not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default updatePreferances;
