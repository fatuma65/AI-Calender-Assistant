import dotenv from "dotenv";
import OpenAI from "openai";
import { EventType } from "../controllers/eventController/createEvent";
dotenv.config();

const token = process.env["GITHUB_TOKEN"];

//  Initialize OpenAI
const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: token,
});

const analyzeEventWithAi = async (eventDetails: EventType) => {
  const prompt = `Analyze this event and suggest the best time slot considering the following:
  1. Event title: ${eventDetails.title}
  2. Event description: ${eventDetails.description}
  3. Location: ${eventDetails.location}
  4. Tensity Level: ${eventDetails.tensityLevel}
  5. Is Recurring: ${eventDetails.isRecurring}
  6. Category: ${eventDetails.category}

  Based on these factors, Please ensure the response is structured as JSON:
  {
    "bestTimeSlot": "Suggested time slot",
    "requiredPreparationTime": "Suggested preparation time",
    "optimalDuration": "Suggested duration"
  }`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      // temperature: 1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",
        },
        { role: "user", content: prompt },
      ],

      top_p: 1,
    });

    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (error) {
    console.log("An error occurred:", error);
    throw error;
  }
};

export default analyzeEventWithAi;
