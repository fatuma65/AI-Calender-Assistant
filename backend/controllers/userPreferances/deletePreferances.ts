import { Request, Response } from "express";
import prisma from "../../src/client";
const deletePreferances = async (req: Request, res: Response): Promise<any> => {
  try {
    const prefrance = await prisma.userPreferences.delete({
      where: { id: req.params.id },
    });

    if (prefrance) {
      return res
        .status(200)
        .json({ message: "Preferance deleted successfully" });
    } else {
      console.log("Preferance not found");
      res.status(404).json({ error: "Preferance not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default deletePreferances;
