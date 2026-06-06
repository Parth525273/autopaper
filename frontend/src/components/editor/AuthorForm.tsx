"use client";

import { Author } from "@/types/paper";
import { Plus, Trash2, User } from "lucide-react";

interface AuthorFormProps {
  authors: Author[];
  onChange: (authors: Author[]) => void;
}

const emptyAuthor = (): Author => ({
  name: "",
  affiliation: "",
  department: "",
  email: "",
});

export default function AuthorForm({ authors, onChange }: AuthorFormProps) {
  const updateAuthor = (index: number, field: keyof Author, value: string) => {
    const updated = authors.map((a, i) =>
      i === index ? { ...a, [field]: value } : a
    );
    onChange(updated);
  };

  const addAuthor = () => {
    if (authors.length < 6) onChange([...authors, emptyAuthor()]);
  };

  const removeAuthor = (index: number) => {
    if (authors.length > 1) onChange(authors.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {authors.map((author, index) => (
        <div
          key={index}
          className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-800/50"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <User size={14} />
              Author {index + 1}
            </div>
            {authors.length > 1 && (
              <button
                onClick={() => removeAuthor(index)}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2">
            <input
              type="text"
              placeholder="Full Name"
              value={author.name}
              onChange={(e) => updateAuthor(index, "name", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Institution / University"
              value={author.affiliation}
              onChange={(e) => updateAuthor(index, "affiliation", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Department"
              value={author.department}
              onChange={(e) => updateAuthor(index, "department", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Email"
              value={author.email}
              onChange={(e) => updateAuthor(index, "email", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      ))}

      {authors.length < 6 && (
        <button
          onClick={addAuthor}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-blue-600 dark:text-blue-400 border border-dashed border-blue-300 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
        >
          <Plus size={14} />
          Add Author
        </button>
      )}
    </div>
  );
}
