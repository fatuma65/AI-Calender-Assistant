import bcrypt from "bcrypt";
import { Request, Response, RequestHandler } from "express";
import prisma from "../../src/client";
import jwt, { Secret } from "jsonwebtoken";
const secretKey: Secret = process.env.SECRET_KEY || "a861582a-c445-4462-94c9";
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
    if(user) {
      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (passwordIsValid) {
        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
          expiresIn: "48h",
        });
        console.log(token);
        res
          .cookie("authToken", token, {
            httpOnly: true,
            maxAge: 48 * 60 * 60 * 1000,
            // secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .json({
            Message: "User logged in successfully",
            user: user,
          });
      } else {
        console.log("Password is wrong, Please provide the correct password");
        res.status(404).json({
          error: "Password is wrong, Please provide the correct password",
        });
      }
    }
  }
};
