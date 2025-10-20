export default function MarkdownResult({ value }) {
    return (
        <div>
            <label className="block text-sm text-white/70 mb-1">Markdown result</label>
            <textarea className="textarea" value={value} readOnly />
        </div>
    );
}
