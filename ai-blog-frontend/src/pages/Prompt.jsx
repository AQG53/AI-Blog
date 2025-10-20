import { usePrompt } from "../hooks/usePrompt.js";
import Header from "../components/Header.jsx";
import ModeSegment from "../components/ModeSegment.jsx"
import RawPrompt from "../components/RawPrompt.jsx";
import PromptPreview from "../components/PromptReview.jsx";
import ActionsBar from "../components/ActionsBar.jsx";
import MarkdownResult from "../components/MarkdownResult.jsx";
import MarkdownEditor from "../components/MarkdownEditor.jsx";
  
export default function Prompt() {
    const pb = usePrompt();

    return (
        <div className="bg-purple-grid">
            <div className="min-h-screen grid place-items-center p-6">
                <div className="card">
                    <div className="p-6 md:p-8">

                        <Header />

                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <ModeSegment mode={pb.mode} setMode={pb.setMode} onBuild={pb.build} />
                        </div>

                        <RawPrompt rawPrompt={pb.rawPrompt} setRawPrompt={pb.setRawPrompt} />

                        <hr className="my-4 border-white/10" />

                        <PromptPreview finalPrompt={pb.finalPrompt} />

                        <ActionsBar

                            loading={pb.loading}
                            promptOk={true}
                            onCopy={() => navigator.clipboard.writeText(pb.finalPrompt || "")}
                            onGenerate={pb.generate}
                        />

                        {pb.err ? (
                            <p className="mt-3 text-sm text-red-300">Error: {pb.err}</p>
                        ) : null}


                        {pb.generated && (
                            <>
                                <hr className="my-4 border-white/10" />
                                <MarkdownEditor
                                    value={pb.generated}
                                    onChange={(val) => console.log("Updated markdown:", val)}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}