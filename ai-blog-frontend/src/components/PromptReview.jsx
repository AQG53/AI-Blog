export default function PromptPreview({ finalPrompt }) {
    return (
        <div>
            <label className="block text-sm text-white/70 mb-1">Prompt preview (what we will send)</label>
            <div className="min-h-[120px] whitespace-pre-wrap wrap-break-word rounded-xl border border-white/10 bg-[#0f141b] text-white p-3">
                {finalPrompt || "Click “Build Prompt” to preview…"}
            </div>
        </div>
    );
}