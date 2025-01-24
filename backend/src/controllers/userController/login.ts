import bcrypt from "bcrypt";
import { Request, Response, RequestHandler } from "express";
import prisma from "../../client";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
const secretKey: Secret = process.env.SECRET_KEY || "123456";
export const loginUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Password and email is required");
    res.status(400).json({ error: "Please provide email and password" });
  } else {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      const passwordIsValid = await bcrypt.compare(password, '1234');

      if (passwordIsValid) {
        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
          expiresIn: "48h",
        });
        console.log(token);
        res
          // .cookie("authToken", token, {
          //   httpOnly: true,
          //   maxAge: 48 * 60 * 60 * 1000,
          //   // secure: process.env.NODE_ENV === "production",
          // })
          .status(200)
          .json({
            Message: "User logged in successfully",
            token: token,
          });
      } else {
        console.log("Password is wrong, Please provide the correct password");
        res.status(404).json({
          error: "Password is wrong, Please provide the correct password",
        });
      }
    } else {
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
      return;
    }
  }
};
