import jwt, { Secret } from "jsonwebtoken";
import * as express from "express";
import prisma from "../client";
import getUserInfo from "../controllers/userController/getUserInfo";

// create a custom type that adds/inherits the Reuest type from express and adds the user property.
export interface CustomRequest extends express.Request {
  user: {
    googleAccessToken: string | null | undefined;
    id: string;
    email: string;
    iat: number;
    exp: number;
  };
}

const secretKey: Secret = process.env.SECRET_KEY || "123";

const authenticateUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const authHeader = req.header("Authorization");

    // check if the authorization header is present and if it starts with the word Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Authorization header is missing");
      res.status(401).json({ error: "You are not authorized" });
      return;
    }
    // extract the token from the header by creating an array of the string and getting the second element
    const token = req.cookies.authToken || authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(400)
        .json({ error: "Access Denied, No token provided" });
    }

    // verify the token
    const decodedToken = jwt.verify(token, secretKey) as CustomRequest["user"];

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
    });

    const userInfo = await getUserInfo(user?.googleAccessToken ?? "");
    if (!userInfo) {
      return res.status(403).json({ error: "Invalid token provided" });
    }

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    (req as CustomRequest).user = {
      id: user.id,
      email: user.email || "",
      iat: decodedToken.iat,
      exp: decodedToken.exp,
      googleAccessToken: user.googleAccessToken,
    };
    next();
  } catch (error) {
    console.log("Invalid token");
    res.status(403).json({ error: "Invalid token provided" });
  }
};

export default authenticateUser;
