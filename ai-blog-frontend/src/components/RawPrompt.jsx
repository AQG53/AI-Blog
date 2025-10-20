export default function RawPromptForm({ rawPrompt, setRawPrompt }) {
    return (
        <div>
            <label className="block text-sm text-white/70 mb-1">Your prompt (free-form)</label>
            <textarea
                className="textarea"
                placeholder={"Write your prompt here"}
                value={rawPrompt}
                onChange={(e) => setRawPrompt(e.target.value)}
            />
        </div>
    );
}