import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

export default function MarkdownEditor({ value, onChange }) {
    const [content, setContent] = useState(value || "");

    return (
        <div data-color-mode="dark" className="mt-4">
            <MDEditor
                value={content}
                onChange={(val) => {
                    setContent(val);
                    onChange && onChange(val);
                }}
                height={500}
            />
        </div>
    );
}
