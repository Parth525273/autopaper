"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

interface SectionEditorProps {
  content: string;
  placeholder?: string;
  onChange: (content: string) => void;
  minHeight?: string;
}

export default function SectionEditor({
  content,
  placeholder = "Start writing...",
  onChange,
  minHeight = "150px",
}: SectionEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none text-slate-900 dark:text-slate-100",
      },
    },
    immediatelyRender: false,
  });

  // Sync content when section changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="tiptap-editor border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${
            editor.isActive("bold") ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white" : ""
          }`}
          title="Bold"
        >
          <Bold size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${
            editor.isActive("italic") ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white" : ""
          }`}
          title="Italic"
        >
          <Italic size={14} />
        </button>
        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${
            editor.isActive("bulletList") ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white" : ""
          }`}
          title="Bullet List"
        >
          <List size={14} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${
            editor.isActive("orderedList") ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white" : ""
          }`}
          title="Numbered List"
        >
          <ListOrdered size={14} />
        </button>
      </div>

      {/* Editor content */}
      <div style={{ minHeight }} className="px-4 py-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
