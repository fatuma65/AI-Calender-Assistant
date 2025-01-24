// import { $Enums, Prisma } from "@prisma/client";
// import {TensityLevels} from '@prisma/client'
// import { JsonValue } from "@prisma/client/runtime/library";
// import prisma from "../client";
// import { CustomRequest } from "../middlewares/auth";
// import { EventType } from "../services/googleCalenderService";

// interface TimeSlot {
//   startTime: Date | string;
//   endTime: Date | string;
// }
// interface UserPreferancesTypes {
//   id: string;
//   userId: string;
//   createdAt: Date;
//   updatedAt: Date;
//   date: Date;
//   notificationPreference: JsonValue | null;
//   workingHours: number | JsonValue | null;
//   defaultEventDuration: number;
//   preferredMeetingTimes: Array<{ start: string; end: string }>;
//   colorCodingPreferences: JsonValue | null;
//   recurrencePatternSummary: JsonValue | null;
// }
// interface ExistingEventsTypes {
//   startTime: Date;
//   endTime: Date;
//   location: string | null;
//   id: string;
//   userId: string;
//   title: string;
//   description: string | null;
//   tensityLevel: $Enums.TensityLevels | null;
//   category: string | null;
//   isRecurring: boolean;
//   recurrencePattern: JsonValue | null;
//   createdAt: Date;
//   updatedAt: Date;
// }
// export const findOptimalTimeSlot = async (
//   eventDetails: EventType,
//   userId: string
// ) => {
//   try {
//     const userPreferances = await prisma.userPreferences.findUnique({
//       where: { userId },
//     });

//     // get events for the next week
//     const startDate = new Date();
//     const endDate = new Date();
//     endDate.setDate(endDate.getDate() + 7);

//     // get existing events for next week
//     const existingEvents = await prisma.event.findMany({
//       where: {
//         userId,
//         startTime: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//     });

//     // find available slots based on users working hours
//     const availableSlots = generateAvailableTimeSlots(
//       startDate,
//       endDate,
//       userPreferances,
//       existingEvents
//     );

//     // Score each available slot based on various factors
//     const scoredSlots = availableSlots.map((slot: TimeSlot) => ({
//       ...slot,
//       score: calculateSlotScore(
//         slot,
//         eventDetails,
//         existingEvents,
//         userPreferances
//       ),
//     }));

//     // sort slots by score and return the best one
//     const bestSlot = scoredSlots.sort((a, b) => b.score - a.score)[0];

//     return {
//       startTime: bestSlot.startTime,
//       //   endTime: new Date(
//       endTime: bestSlot.endTime,
//       // bestSlot.startTime.getTime + parseDuration(eventDetails.duration)
//       //   ),
//     };
//   } catch (error) {
//     console.log("An error occured", error);
//   }
// };

// const generateAvailableTimeSlots = (
//   startDate: string | number | Date,
//   endDate: number | Date,
//   userPreferances: UserPreferancesTypes | null,
//   existingEvents: ExistingEventsTypes[]
// ) => {
//   const slots = [];
//   const currentDate = new Date(startDate);

//   while (currentDate <= endDate) {
//     const dayStart = JSON.stringify(userPreferances?.workingHours) || "09:00";
//     const dayEnd = JSON.stringify(userPreferances?.workingHours) || "17:00";

//     // generate 30-minute slots during working hours
//     const [startHour, startMinute] = dayStart.split(":").map(Number);
//     const [endHour, endMinute] = dayEnd.split(":").map(Number);

//     let slotTime = new Date(currentDate);
//     slotTime.setHours(startHour, startMinute, 0, 0);

//     const dayEndTime = new Date(currentDate);
//     dayEndTime.setHours(endHour, endMinute, 0, 0);

//     while (slotTime < dayEndTime) {
//       if (!isTimeSotOccupied(existingEvents, new Date(slotTime).getTime())) {
//         slots.push({
//           startTime: new Date(slotTime),
//           endTime: new Date(slotTime.getTime() + 30 * 60000),
//         });
//       }
//       slotTime = new Date(slotTime.getTime() + 30 * 60000);
//     }
//     currentDate.setDate(currentDate.getDate() + 1);
//   }
//   return slots;
// };

// const calculateSlotScore = (
//   slot: TimeSlot,
//   eventDetails: EventType,
//   existingEvents: any[],
//   userPreferances: UserPreferancesTypes
// ) => {
//   let score = 0;

//   // prefer slots closer to current Time
//   const timeFromNow = new Date(slot.startTime).getTime() - new Date().getTime();
//   score += 1000000 / (timeFromNow + 1);

//   if (userPreferances?.preferredMeetingTimes) {
//     if (
//       isPreferredTime(slot.startTime, userPreferances?.preferredMeetingTimes)
//     ) {
//       score += 500;
//     }
//   }

//   if (eventDetails.tensityLevel === "HIGH") {
//     const nearbyHightIntensityEvents = existingEvents.filter(
//       (event) =>
//         event.tensityLevel === "HIGH" &&
//         Math.abs(event.startTime - new Date(slot.startTime).getTime()) <
//           24 * 60 * 60 * 1000
//     );
//     score -= nearbyHightIntensityEvents.length * 200;
//   }

//   return score;
// };

// const isTimeSotOccupied = (
//   existingEvents: ExistingEventsTypes[],
//   time: any
// ) => {
//   return existingEvents.some(
//     (event) => time >= event.startTime && time < event.endTime
//   );
// };

// const isPreferredTime = (time: any, preferredTime: any[]) => {
//   const hour = time.getHours();
//   return preferredTime.some((pt) => hour >= pt.start && hour <= pt.end);
// };

// export const checkConflicts = async (
//   timeSlot:
//     | {
//         startTime: Date;
//         //   endTime: new Date(
//         endTime: Date;
//       }
//     | undefined,
//   userId: string
// ) => {
//   const conflicts = await prisma.event.findMany({
//     where: {
//       userId,
//       OR: [
//         {
//           startTime: {
//             lte: timeSlot?.endTime,
//             gte: timeSlot?.startTime,
//           },
//         },
//         {
//           endTime: {
//             gte: timeSlot?.startTime,
//             lte: timeSlot?.endTime,
//           },
//         },
//       ],
//     },
//   });
//   return conflicts;
// };
// // function parseDuration(duration: any) {
// //   throw new Error("Function not implemented.");
// // }
