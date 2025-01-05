import { Response, Request } from "express";
import prisma from "../../src/client";

const updateUserInformation = async (req: Request, res: Response) => {
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    console.log(updateUser);
    res
      .status(200)
      .json({ message: "User updated successfully", data: updateUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default updateUserInformation;
