import { Request, Response } from "express";
import prisma from "../../client";
import { CustomRequest } from "../../middlewares/auth";
import { $Enums } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import {
  checkCalendarAvailability,
  scheduleEvent,
} from "../../services/googleCalendar";
import { parseNaturalLanguageCommand } from "../../services/chatService";

// import { scheduleReminders } from "../../services/reminderService";

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
  // calendarId: string
}

// Create a new user event
export const handleNaturalLanguageCommand = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = (req as CustomRequest).user.id;
    const { command } = req.body;

    // Parse the natural language command
    const parsedCommand = await parseNaturalLanguageCommand(command);
    console.log("Parsed Command==========", parsedCommand);

    let result;
    switch (parsedCommand.action) {
      case "create":
        if (!parsedCommand.eventDetails) {
          throw new Error("No event details provided");
        }

        const startTime = new Date(parsedCommand.eventDetails.startTime);
        const endTime = new Date(parsedCommand.eventDetails.endTime);
        const available = await checkCalendarAvailability(
          startTime.toISOString(),
          endTime.toISOString()
        );

        if (!available) {
          console.log("Not available");
        } else {
          // Create new event
          const newEvent = await prisma.event.create({
            data: {
              userId: user,
              ...parsedCommand.eventDetails,
            },
          });
          console.log("New event to be created by the AI=======", newEvent);

          // Schedule reminders and add to Google Calendar
          // await scheduleReminders(newEvent.id);
          await scheduleEvent(newEvent);

          result = {
            message: "Event created successfully",
            event: newEvent,
          };
          console.log(result);
        }
        break;

      case "update":
        if (!parsedCommand.eventDetails) {
          throw new Error("No event details provided");
        }

        // Find the most relevant event to update
        const eventToUpdate = await prisma.event.findFirst({
          where: {
            userId: user,
            title: {
              contains: parsedCommand.eventDetails.title,
              mode: "insensitive",
            },
          },
          orderBy: {
            startTime: "asc",
          },
        });

        if (!eventToUpdate) {
          throw new Error("Event not found");
        }

        // Update the event
        const updatedEvent = await prisma.event.update({
          where: { id: eventToUpdate.id },
          data: parsedCommand.eventDetails,
        });

        result = {
          message: "Event updated successfully",
          event: updatedEvent,
        };
        break;

      case "delete":
        // Find events matching the query
        const eventsToDelete = await prisma.event.findMany({
          where: {
            userId: user,
            title: {
              contains: parsedCommand.queryParams?.title || "",
              mode: "insensitive",
            },
          },
        });

        if (eventsToDelete.length === 0) {
          throw new Error("No matching events found");
        }

        // Delete the events
        await prisma.event.deleteMany({
          where: {
            id: {
              in: eventsToDelete.map((e) => e.id),
            },
          },
        });

        result = {
          message: `Successfully deleted ${eventsToDelete.length} events`,
        };
        break;

      case "query":
        // Search for events based on query parameters
        const events = await prisma.event.findMany({
          where: {
            userId: user,
            OR: [
              {
                title: {
                  contains: parsedCommand.queryParams?.title || "",
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: parsedCommand.queryParams?.description || "",
                  mode: "insensitive",
                },
              },
            ],
          },
          orderBy: {
            startTime: "asc",
          },
        });

        result = {
          message: `Found ${events.length} events`,
          events,
        };
        break;

      default:
        throw new Error("Invalid action");
    }

    res.json(result);
  } catch (error) {
    console.error("Error handling natural language command:", error);
    res.status(400).json({
      error:
        error instanceof Error ? error.message : "Failed to process command",
    });
  }
};
