import jwt, { Secret } from "jsonwebtoken";
import * as express from "express";
import prisma from "../src/client";

interface CustomRequest extends express.Request {
  user?: {
    id: string;
    email: string;
    iat: number;
    exp: number;
  };
}

const secretKey: Secret = process.env.SECRET_KEY || "a861582a-c445-4462-94c9";

const authenticateUser = async (
  req: CustomRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Authorization header is missing");
    res.status(401).json({ error: "You are not authorized" });
    return;
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, secretKey) as {
      id: string;
      email: string;
      iat: number;
      exp: number;
    };

    const user = await prisma.user.findUnique({ where: { id: decodedToken.id } });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      iat: decodedToken.iat,
      exp: decodedToken.exp,
    };

    next();
  } catch (error) {
    console.log("Invalid token");
    res.status(401).json({ error: "Invalid token provided" });
  }
};

export default authenticateUser;
