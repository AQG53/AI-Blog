export default function ModeSegment({ mode, setMode, onBuild }) {
    const modes = [
        { id: "business", label: "Business" },
        { id: "story", label: "Storytelling" },
        { id: "technical", label: "Technical" },
    ];

    return (
        <div className="flex flex-wrap items-center gap-3 w-full">
            <div className="flex gap-2">
                {modes.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => setMode(m.id)}
                        className={`px-4 py-1.5 rounded-lg border transition-all duration-150 ${mode === m.id
                            ? "bg-purple-600 border-purple-500 text-white shadow-md"
                            : "bg-transparent border-white/20 text-white/70 hover:border-white/50"
                            }`}
                    >
                        {m.label}
                    </button>
                ))}
            </div>

            <button
                className="btn ml-auto"
                onClick={onBuild}
            >
                Build Prompt
            </button>
        </div>
    );
}
