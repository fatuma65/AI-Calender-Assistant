import { Response, Request } from "express";
import prisma from "../../client";
import { CustomRequest } from "../../middlewares/auth";
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = (req as CustomRequest).params.id;
    await prisma.userPreferences.deleteMany({
      where: { userId: id },
    });
    const userToDelete = await prisma.user.delete({
      where: { id },
      include: {
        userPreferences: true,
      },
    });
    if (!userToDelete) {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
      return;
    } else {
      console.log("User Deleted Successfully");
      res.status(204).json({ message: "User Deleted Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default deleteUser;
