import dotenv from "dotenv";
import OpenAI from "openai";
import { parseISO } from "date-fns";
dotenv.config();

const token = process.env["GITHUB_TOKEN"];

// Initialize OpenAI
const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: token,
});

interface ParsedEvent {
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  tensityLevel?: "HIGH" | "MEDIUM" | "LOW";
  category?: "WORK" | "PERSONAL" | "SCHOOL" | "BUSINESS" | "CHURCH";
}

export async function parseNaturalLanguageCommand(input: string): Promise<{
  action: "create" | "update" | "delete" | "get";
  eventDetails?: ParsedEvent;
  queryParams?: any;
}> {
  try {
    const prompt = `
        Analyze the following calendar command and determine the intended action.
        Possible actions are: create, update, delete, or get.
        Also come up with the title and description of the user event when creating according to the action requested.
        Format the response as a JSON object with these fields:
        - title: the event title
        - description: any additional details about the event
        - startTime: ISO date string for when the event starts
        - endTime: ISO date string for when the event ends
        - location: where the event takes place (if mentioned)
        - tensityLevel: HIGH, MEDIUM, or LOW based on urgency/importance
        - category: WORK, PERSONAL, SCHOOL, BUSINESS, or CHURCH
        Those are the details required in the database
        Inform the user if you are able to create this event in their calendar
        if you are to get events, inform the user you are able to get their events

        User command: "${input}"

        Current time: ${new Date().toISOString()}

        Response format:
        {
            "action": "create|update|delete|get",
            "eventDetails": {event details if applicable},
            "queryParams": {search parameters if applicable}
        }`;

    const completion = await openai.chat.completions.create({
      temperature: 0.1, 
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        { role: "user", content: prompt },
      ],
    });

    const response = completion.choices[0].message.content || "";
    console.log(response);
    const parsedResponse = JSON.parse(response);

    // Convert dates if they exist
    if (parsedResponse.eventDetails?.startTime) {
      parsedResponse.eventDetails.startTime = parseISO(
        parsedResponse.eventDetails.startTime
      );
    }
    if (parsedResponse.eventDetails?.endTime) {
      parsedResponse.eventDetails.endTime = parseISO(
        parsedResponse.eventDetails.endTime
      );
    }

    return parsedResponse;
  } catch (error) {
    console.error("Error parsing command:", error);
    throw new Error("Failed to parse natural language command");
  }
}
