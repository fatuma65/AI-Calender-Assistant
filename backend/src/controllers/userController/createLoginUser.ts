import { Request, Response } from "express";
import prisma from "../../client";
import jwt, { Secret } from "jsonwebtoken";
import { googleUser } from "../../services/googleCalendar";
import { google } from "googleapis";

const secretKey: Secret = process.env.SECRET_KEY || "123";

export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    // extract code from the query provided by google
    const code = req.query.code as string;
    // destucture the tokens from the query provided by google
    const { tokens } = await googleUser.getToken(code);
    googleUser.setCredentials(tokens);

    let googleAccessToken = tokens.access_token
    console.log(googleAccessToken)
    
    const outh2 = google.oauth2({
      auth: googleUser,
      version: "v2",
    });
    // Get the user's personal information from google using oauth2
    const userInfo = await outh2.userinfo.get();
    const { email, name, given_name, family_name } = userInfo.data;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // check if the user already exists
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // if that user doesnt exist, we create a new one and store them in the database
      user = await prisma.user.create({
        data: {
          email: email,
          firstname: family_name,
          lastname: given_name,
          googleAccessToken: googleAccessToken
        },
      });
    } else {
      // if the user already exists, we update their google access token
      await prisma.user.update({
        where: {email},
        data: {googleAccessToken: googleAccessToken}
      })
    }
    console.log(user);
    // generate a token that authenticates the user
    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "48hrs",
    });
    if (token) {
      console.log(token)
      res
        .cookie("authToken", token, {
          httpOnly: true,
          maxAge: 48 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          message: "User authenticated successfully",
          token: token,
          user: user,
          access_token: googleAccessToken
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};
