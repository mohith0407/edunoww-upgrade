import OpenAI from "openai"
import Course from "../models/course.model.js"
import getSystemPrompt from "../utils/chatbot.utils.js";
import { configDotenv } from 'dotenv';
configDotenv();
const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

const chatWithBot=async(req,res)=>{
    try {
        const { message } = req.body;
        const courses = await Course.find({}, 'title description category');
        const systemInstruction = getSystemPrompt(courses);
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemInstruction },
                { role: "user", content: message }
            ],
            model: "openai/gpt-oss-120b",
            temperature: 0.3,
        });

        const botReply = completion.choices[0].message.content;
        res.json({ reply: botReply });

    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ error: "Server error" });
    }
}

export {chatWithBot}