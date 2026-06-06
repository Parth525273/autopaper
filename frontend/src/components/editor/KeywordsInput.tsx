"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

interface KeywordsInputProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
}

export default function KeywordsInput({ keywords, onChange }: KeywordsInputProps) {
  const [input, setInput] = useState("");

  const addKeyword = () => {
    const trimmed = input.trim();
    if (trimmed && !keywords.includes(trimmed) && keywords.length < 10) {
      onChange([...keywords, trimmed]);
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword();
    }
    if (e.key === "Backspace" && !input && keywords.length > 0) {
      onChange(keywords.slice(0, -1));
    }
  };

  const removeKeyword = (index: number) => {
    onChange(keywords.filter((_, i) => i !== index));
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-white dark:bg-slate-900 min-h-[80px]">
      <div className="flex flex-wrap gap-2 mb-2">
        {keywords.map((kw, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs rounded-md border border-blue-200 dark:border-blue-800"
          >
            {kw}
            <button onClick={() => removeKeyword(i)} className="hover:text-blue-900 dark:hover:text-blue-100">
              <X size={10} />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addKeyword}
        placeholder={keywords.length === 0 ? "Type a keyword and press Enter..." : "Add more..."}
        className="w-full text-sm text-slate-900 dark:text-white placeholder-slate-400 bg-transparent focus:outline-none"
      />
      <p className="text-xs text-slate-400 mt-1">{keywords.length}/10 keywords</p>
    </div>
  );
}
