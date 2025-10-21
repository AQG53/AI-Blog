import { useState } from "react";
import { axiosInstance } from "../lib/axios";

export function usePrompt() {
  const [rawPrompt, setRawPrompt] = useState("");
  const [finalPrompt, setFinalPrompt] = useState("");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("business");
  const [err, setErr] = useState("");

  function build() {
    const styleText = mode === "story"
      ? "Use narrative tone with personal examples."
      : mode === "technical"
        ? "Focus on clarity, technical tone, and step-by-step explanations."
        : "Use concise, authoritative business tone.";

    const text = rawPrompt.trim();
    if (!text) {
      setErr("Please enter a prompt before building.");
      return;
    }
    const enriched = `
        You are an expert SEO blog writer with 10+ years of experience writing for founders and professionals.
        Your task is to write a detailed, structured, and factual blog post in Markdown only.

        Blog Requirements:
        - Use engaging subheadings (H2, H3) and short paragraphs.
        - Include practical examples and insights.
        - Use keywords to keep users engaged.
        - Add 5 FAQs at the end with concise answers.
        - If sources are mentioned, cite them in-text using IEEE notations and add a References list.
        - Include a short SEO meta description at the top (less than 160 characters).
        - End with a strong conclusion.

        Input Topic:
        ${text}

        Tone:
        ${styleText} 

        ### Output Format
        Markdown only — include proper heading levels and bullet formatting.`;

    setFinalPrompt(enriched);
    setErr("");
  }


  async function generate() {
    setErr("");
    setGenerated("");

    if (!finalPrompt) build();

    try {
      setRawPrompt(finalPrompt)
      setLoading(true);
      const res = await axiosInstance.post("/blog/generate", { rawPrompt });
      setGenerated(res.data?.markdown || "");
    } catch (e) {
      const msg =
        e.response?.data?.error || e.message || "Error generating the blog.";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  return {
    rawPrompt,
    setRawPrompt,
    finalPrompt,
    generated,
    loading,
    err,
    build,
    generate,
    mode,
    setMode
  };
}
