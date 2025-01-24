import { google } from "googleapis";
import dotenv from "dotenv";
import { EventType } from "../controllers/eventController/createEvent";
dotenv.config();
export const scopes = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];
export const googleUser = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const calendar = google.calendar({ version: "v3", auth: googleUser });

export const scheduleEvent = async (eventDetails: EventType) => {
  try {
    const startTime = new Date(eventDetails.startTime).toISOString();
    const endTime = new Date(eventDetails.endTime).toISOString();
    const event = {
      summary: eventDetails.title,
      location: eventDetails.location,
      description: eventDetails.description,
      start: {
        dateTime: startTime,
        timeZone: "Africa/Nairobi",
      },
      end: {
        dateTime: endTime,
        timeZone: "Africa/Nairobi",
      },
    };

    const result = calendar.events.insert({
      calendarId: "primary",
      auth: googleUser,
      requestBody: event,
    });

    console.log(result);

    return (await result).data;
  } catch (error) {
    console.log(error);
  }
};


export const updateEvent = async (event: EventType) => {
try {
  const response = await calendar.events.update({
    calendarId: "primary",
    eventId: event.id,
    auth: googleUser,
    requestBody: event
  })

  console.log(response.data)

  return response.data
} catch (error) {
  console.log(error)
}
}
export const verifyGoogleToken = async (token: string) => {
  try {
    const ticket = await googleUser.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
  } catch (error) {
    console.log(error);
  }
};
export default calendar;
