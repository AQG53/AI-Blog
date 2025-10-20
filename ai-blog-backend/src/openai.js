import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateContent(messages, options = {}) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.max_tokens || 2000,
    });

    const content = response.choices?.[0]?.message?.content || "";
    return { markdown: content };
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate blog content.");
  }
}
