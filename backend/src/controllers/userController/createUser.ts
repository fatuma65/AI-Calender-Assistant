import { RequestHandler } from "express";
import prisma from "../../client";
import bcrypt from "bcrypt";
export const createUser: RequestHandler = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    const newUser = await prisma.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPassword,
        userPreferences: {
          create: {
            date: new Date(),
            notificationPreference: {},
            defaultEventDuration: 30,
            colorCodingPreferences: {},
            recurrencePatternSummary: {},
          },
        },
      },
    });

    console.log(newUser),
      res.status(201).json({ Message: "User created successfully" });
  } catch (error) {
    console.log(error),
      res.status(500).json({ error: "Failed to create user" });
  }
};
