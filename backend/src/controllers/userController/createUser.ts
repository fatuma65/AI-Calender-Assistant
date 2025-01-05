import { RequestHandler } from "express";
import prisma from "../../client";
import bcrypt from "bcrypt";
export const createUser: RequestHandler = async (req, res): Promise<any> => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
      },
    });

    return res
      .status(201)
      .json({ Message: "User created successfully", data: newUser });
  } catch (error) {
    console.log(error),
      res.status(500).json({ error: "Failed to create user" });
  }
};
