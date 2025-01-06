// import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv'

dotenv.config()
const OpenAI = require('openai')

// // Initialize OpenAI

const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const analyzeEventWithAi = async (eventDetails) => {
    const prompt = `Analyse this event and suggest the best time slot considering the following:
    1. Event title: ${eventDetails.title}
    2. Event description: ${eventDetails.description}
    3. location: ${eventDetails.location}
    4. tensityLevel: ${eventDetails.tensityLevel}
    5. isRecurring: ${eventDetails.isRecurring}
    6. category: ${eventDetails.category}

    Based on these factors, suggest
    1. Best time slot
    2. Required preparation time
    3. Optimal duration
    `


    const completion = await openAi.chat.completions.create({
        messages: [{role: "user", content: "prompt"}],
        model: "gpt-3.5-turbo",
        responseFormat: {type : "json_object"}
    })

    return JSON.parse(completion.choices[0].message.content)