import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateContent } from "./openai.js"

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
})

app.post("/api/blog/generate", async (req, res) => {
  try {
    const { rawPrompt } = req.body;
    if (!rawPrompt || typeof rawPrompt !== "string" || !rawPrompt.trim()) {
      return res.status(400).json({ error: "Prompt text is required." });
    }

    const system = "You are a precise, factual blog writer. Return Markdown only.";
    const user = rawPrompt.trim();

    const result = await generateContent(
      [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      { temperature: 0.7, max_tokens: 2000 }
    );

    res.json(result);
  } catch (error) {
    console.error("Blog generation failed:", error);
    res.status(500).json({ error: "Failed to generate blog content." });
  }
});

const startServer = async () => {
  try {
    if (process.env.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log("Server is running on port: ", ENV.PORT)
      });
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();

export default app;
