import { google } from "googleapis";
import { configDotenv } from "dotenv";
import prisma from "../client";
import { $Enums } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export interface EventType {
    description: string | null;
    location: string | null;
    id: string;
    userId: string;
    title: string;
    startTime: Date;
    endTime: Date;
    tensityLevel: $Enums.TensityLevels | null;
    category: string | null;
    isRecurring: boolean;
    recurrencePattern: JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    calendarId: string
}
interface UserTypes { id: string; email: string; iat: number; exp: number }
configDotenv();

const googleUser = new google.auth.OAuth2(
  process.env.GOOGLE_API_KEY,
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

const calender = google.calendar({ version: "v3", auth: googleUser });

// Check the calender availability
export const checkAvailability = async (startTime: any, endTime: any) => {
  try {
    const response = await calender.freebusy.query({
      requestBody: {
        timeMin: startTime,
        timeMax: endTime,
        items: [{ id: "primary" }],
      },
    });

    if (response) {
      return response?.data?.calendars?.primary.busy;
    }
  } catch (error) {
    console.log("Error checking availability", error);
  }
};

// function to schedule the event
export const scheduleEvent = async (
  eventDetails: EventType,
  user: string
) => {
  try {
    const event = {
      summary: eventDetails.title,
      description: eventDetails.description,
      startTime: {
        dateTime: eventDetails.startTime,
        //   dateTime: aiSuggestions.suggestedStartTime,
        timeZone: "UTC",
      },
      end: {
        dateTime: eventDetails.endTime,
        timeZone: "UTC",
      },
      location: eventDetails.location,
    };

    //   if (eventDetails.isRecurring && eventDetails.recurrencePattern) {
    //    event.recurrence = [
    //     generateRecurrenceRule(event.recurrencePattern)
    //    ]
    //   }

    // const response = await calender.events.insert({
    //   calendarId: "primary",
    //   resource: event,
    // });

    const response = calender.events.insert({
        calendarId: "primary", // Ensure you pass the correct properties
        requestBody: event
    })
    //     requestBody: {
    //         summary: eventDetails.title,
    //         description: eventDetails.description,
    //         start: { dateTime: eventDetails.startTime, timeZone: "UTC" },
    //         end: { dateTime: eventDetails.endTime, timeZone: "UTC" },
    //         location: eventDetails.location,
    //     },
    // });

    // await prisma.event.update({
    //   where: { id: event.id },
    //   data: { googleCalendarEventId: response.data.id },
    // });

    return (await response).data;
  } catch (error) {
    console.log("Error adding event to google Calendar", error);
  }
};
