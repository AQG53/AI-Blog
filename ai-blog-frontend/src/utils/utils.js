export const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
export const parseKeywords = (csv) =>
    csv.split(",").map(s => s.trim()).filter(Boolean).slice(0, 12);
export const parseSources = (txt) =>
    txt.split("\n").map(s => s.trim()).filter(Boolean).filter(u => { try { new URL(u); return true; } catch { return false; } });


export function buildPrompt(form, rawPrompt) {
    const system = "You are a precise, factual blog writer. Follow instructions exactly. Think silently; return only the final result. Output must be valid Markdown.";


    if (rawPrompt?.trim()) {
        const user = `Output strictly in Markdown (no HTML). Use GitHub-Flavored Markdown (tables, lists, checkboxes).
        ${rawPrompt.trim()}
        Reminders:
        - Keep structure with headings and short paragraphs.
        - If sources are mentioned, cite them in-text and add a References list.
        - If SEO is requested, add an SEO Pack (meta title/description, keywords, slug, JSON-LD in fenced block).
        `.trim();
        return { system, user };
    }

    const words = clamp(form.words || 1200, 600, 2000);
    const lines = [];
    lines.push("Output strictly in Markdown (no HTML). Use GitHub-Flavored Markdown (tables, lists, checklists).");
    lines.push(`Locale: ${form.locale || "en-PK"}`);
    lines.push(`Audience: ${form.audience || "general readers"}`);
    lines.push(`Tone: ${form.tone || "clear and practical"}`);
    lines.push(`Reading level: ${form.grade || "Grade 9"}`);
    lines.push(`Target length: ${words}±10% words`);
    lines.push(`Topic: ${form.topic}`);
    if (form.brief?.trim()) lines.push(`Brief: ${form.brief.trim()}`);
    if (form.keywords?.length) lines.push(`Keywords to include naturally: ${form.keywords.join(", ")}`);
    if (form.avoid?.trim()) lines.push(`Avoid: ${form.avoid.trim()}`);
    if (form.brand?.trim()) lines.push(`Brand/Product: ${form.brand.trim()}`);
    if (form.cta?.trim()) lines.push(`CTA goal: ${form.cta.trim()}`);
    if (form.includeRefs && form.sources?.length) {
        lines.push("Sources to cite:");
        form.sources.forEach(u => lines.push(`- ${u}`));
    }
    lines.push("");
    lines.push("Structure (strict):");
    lines.push("1) H1 title");
    lines.push("2) A short hook paragraph (2–3 sentences)");
    lines.push("3) Outline (H2 with optional H3)");
    lines.push("4) Body sections that follow the outline");
    lines.push("5) A short call-to-action at the end");
    lines.push("");
    lines.push("Rules:");
    lines.push("- Short paragraphs. Prefer concrete examples and numbers over vague claims.");
    lines.push('- If a claim is uncertain, label it briefly (e.g., "Likely:").');
    lines.push('- Cite provided sources in-text where relevant and include a "References" list with links.');
    lines.push("- Do not invent sources.");
    if (form.includeFAQs) lines.push('\nAdd a "## FAQs" section with 5 concise Q&A.');
    if (form.includeSEO) lines.push(`After the article, add:
                                    ## SEO Pack
                                    - Meta Title (≤60 chars)
                                    - Meta Description (≤160 chars)
                                    - 8–12 Keywords
                                    - URL Slug
                                    - 3 Internal Link Suggestions (anchor + slug)
                                    - Valid JSON-LD Article inside a fenced code block \`\`\`json-ld`);

    lines.push(`Self-check before sending:
                - Title present, outline present, body aligns with outline, length within band.
                - Markdown only, no HTML tags.
                - If SEO Pack requested, all fields present and JSON-LD is valid.`);
                
    return { system, user: lines.join("\n") };
}