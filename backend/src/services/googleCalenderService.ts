// import { google } from "googleapis";
// import { configDotenv } from "dotenv";
// import prisma from "../client";
// import { $Enums } from "@prisma/client";
// import { JsonValue } from "@prisma/client/runtime/library";

// export interface EventType {
//     description: string | null;
//     location: string | null;
//     id: string;
//     userId: string;
//     title: string;
//     startTime: Date;
//     endTime: Date;
//     tensityLevel: $Enums.TensityLevels | null;
//     category: string | null;
//     isRecurring: boolean;
//     recurrencePattern: JsonValue | null;
//     createdAt: Date;
//     updatedAt: Date;
//     calendarId: string
// }
// interface UserTypes { id: string; email: string; iat: number; exp: number }
// configDotenv();

// const googleUser = new google.auth.OAuth2(
//   process.env.GOOGLE_API_KEY,
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET
// );

// const calender = google.calendar({ version: "v3", auth: googleUser });

// // Check the calender availability
// export const checkAvailability = async (startTime: any, endTime: any) => {
//   try {
//     const response = await calender.freebusy.query({
//       requestBody: {
//         timeMin: startTime,
//         timeMax: endTime,
//         items: [{ id: "primary" }],
//       },
//     });

//     if (response) {
//       return response?.data?.calendars?.primary.busy;
//     }
//   } catch (error) {
//     console.log("Error checking availability", error);
//   }
// };

// // function to schedule the event
// export const scheduleEvent = async (
//   eventDetails: EventType,
//   user: string
// ) => {
//   try {
//     const event = {
//       summary: eventDetails.title,
//       description: eventDetails.description,
//       startTime: {
//         dateTime: eventDetails.startTime,
//         //   dateTime: aiSuggestions.suggestedStartTime,
//         timeZone: "UTC",
//       },
//       end: {
//         dateTime: eventDetails.endTime,
//         timeZone: "UTC",
//       },
//       location: eventDetails.location,
//     };

//     //   if (eventDetails.isRecurring && eventDetails.recurrencePattern) {
//     //    event.recurrence = [
//     //     generateRecurrenceRule(event.recurrencePattern)
//     //    ]
//     //   }

//     // const response = await calender.events.insert({
//     //   calendarId: "primary",
//     //   resource: event,
//     // });

//     const response = calender.events.insert({
//         calendarId: "primary", // Ensure you pass the correct properties
//         requestBody: event
//     })
//     //     requestBody: {
//     //         summary: eventDetails.title,
//     //         description: eventDetails.description,
//     //         start: { dateTime: eventDetails.startTime, timeZone: "UTC" },
//     //         end: { dateTime: eventDetails.endTime, timeZone: "UTC" },
//     //         location: eventDetails.location,
//     //     },
//     // });

//     // await prisma.event.update({
//     //   where: { id: event.id },
//     //   data: { googleCalendarEventId: response.data.id },
//     // });

//     return (await response).data;
//   } catch (error) {
//     console.log("Error adding event to google Calendar", error);
//   }
// };













// import { Request, Response } from "express";
// import prisma from "../../client";
// import { Prisma } from "@prisma/client";
// import { CustomRequest } from "../../middlewares/auth";
// import analyzeEventWithAi from "../../services/chatService";
// // import {
// //   checkAvailability,
// //   scheduleEvent,
// // } from "../../services/googleCalenderService";
// // import getOptimalTimeSlot from "./retrieveEvents";
// // import { findOptimalTimeSlot, checkConflicts } from "../../utilis/scheduling";
// import { $Enums } from "@prisma/client";
// import { JsonValue } from "@prisma/client/runtime/library";

// export interface EventType {
//   description: string | null;
//   location: string | null;
//   id: string;
//   userId: string;
//   title: string;
//   startTime: Date;
//   endTime: Date;
//   tensityLevel: $Enums.TensityLevels | null;
//   category: string | null;
//   isRecurring: boolean;
//   recurrencePattern: JsonValue | null;
//   createdAt: Date;
//   updatedAt: Date;
//   calendarId: string
// }
// // Create a new user event
// const createEvent = async (req: Request, res: Response): Promise<void> => {
//   const user = (req as CustomRequest).user.id;

//   // if (user?.id === undefined) {
//   //   console.log(user?.id);
//   //   console.log("User is not defined");
//   // }
//   //   const {
//   //     title,
//   //     description,
//   //     startTime,
//   //     endTime,
//   //     location,
//   //     tensityLevel,
//   //     category,
//   //     isRecurring,
//   //     recurrencePattern
//   //   } = req.body;

//   //   if (isRecurring === true && !recurrencePattern) {
//   //     console.log('Recurrence pattern is required for recurring events');
//   //     res.status(400).json({ error: "Recurrence pattern is required for recurring events" });
//   //     return;
//   //   }
//   //   else {
//   //   try {
//   //     const newEvent = await prisma.event.create({
//   //       data: {
//   //         userId: user.id,
//   //         title: title,
//   //         description: description,
//   //         startTime: new Date(startTime),
//   //         endTime: new Date(endTime),
//   //         location: location,
//   //         category: category,
//   //         isRecurring: isRecurring,
//   //         tensityLevel: tensityLevel,
//   //         recurrencePattern: recurrencePattern || null
//   //         // recurrencePattern: recurrencePattern || {
//   //         //     frequency: "daily",
//   //         //     day: new Date().getDay()
//   //         // },
//   //       },
//   //     });
//   //     res
//   //       .status(201)
//   //       .json({ Message: "Event created successfully", event: newEvent });
//   //   } catch (error) {
//   //     res.status(500).json({ error: "Internal Server Error" });
//   //   }
//   // }

//   try {
//     const { eventDetails } = req.body;
//     // const aiSuggestions = await analyzeEventWithAi();
//     const aiSuggestions = await analyzeEventWithAi(eventDetails);
//     console.log("Ai suggestions ===========", aiSuggestions);

//     // const timeSlot = await findOptimalTimeSlot(eventDetails, user);

//     // const conflicts = await checkConflicts(timeSlot, user);
//     // if (conflicts.length > 0) {
//     //   console.log("There are conflicts with your dates");
//     // }

//       const newEvent = await prisma.event.create({
//         data: {
//           userId: user,
//           title: eventDetails.title,
//           description: eventDetails.description,
//           startTime: eventDetails.startTime,
//           endTime: eventDetails.endTime,
//           location: eventDetails.location,
//           category: eventDetails.category,
//           isRecurring: eventDetails.isRecurring,
//           tensityLevel: eventDetails.tensityLevel,
//           recurrencePattern: eventDetails.recurrencePattern || null,
//         },
//       });
    
//     console.log(newEvent);


//     // const busySlots = await checkAvailability(
//     //   aiSuggestions.suggestedStartTime,
//     //   aiSuggestions.suggestedEndTime
//     // );

//     // await scheduleEvent(newEvent, user);

//     res.json({
//       message: "Event created successfully",
//       AIResponse: aiSuggestions,
//       // conficts: conflicts.length > 0 ? { original: aiSuggestions } : null,
//     });
//   } catch (error) {
//     console.error("Error processing event:", error);
//     res.status(500).json({ error: error });
//   }
// };

// export default createEvent;
