export default function ActionsBar({ loading, promptOk, onCopy, onGenerate }) {
    return (
        <div className="flex items-center gap-3 mt-3">
            <button className="btn disabled:opacity-50" onClick={onCopy}>
                Copy Prompt
            </button>
            <button className="btn disabled:opacity-50" onClick={onGenerate} disabled={loading || !promptOk}>
                {loading ? "Generating..." : "Generate"}
            </button>
        </div>
    );
}