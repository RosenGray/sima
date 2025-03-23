"use client";
import { useMemo, useRef } from "react";
import JoditEditor from "jodit-react";
import "jodit-react/examples/app.css";

interface TextEditorProps {
  content: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
  className?: string;
}

const TextEditor = ({
  content,
  onChange,
  placeholder = "Start writing...",
  height = 300,
  className = "",
}: TextEditorProps) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      height,
      placeholder,
      colors: ["red", "green", "blue"],
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
      },
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "table",
        "link",
        "|",
        "left",
        "center",
        "right",
        "justify",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "fullsize",
      ],
    }),
    [height, placeholder]
  );

  return (
    <div className={className}>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onChange={onChange}
      />
      <style>{`.jodit-wysiwyg{height:${height}px !important}`}</style>
    </div>
  );
};

export default TextEditor; 