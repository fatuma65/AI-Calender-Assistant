// import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv'
import OpenAI from "openai";
import { EventType } from './googleCalenderService';
dotenv.config()
// const OpenAI = require('openai')

const token = process.env["GITHUB_TOKEN"]
// // Initialize OpenAI

const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token
})

const analyzeEventWithAi = async (eventDetails: EventType) => {
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

    try {
        const response:any = await client.chat.completions.create({
            messages: [{role: "user", content: prompt}],
            model: "gpt-4o",
            temperature: 1,
            top_p: 1,
            response_format: {type : "json_object"}
        })
    
        return JSON.parse(response.choices[0].message.content)
    } catch (error) {
        console.log('An error occurred', error)
    }

}

export default analyzeEventWithAi