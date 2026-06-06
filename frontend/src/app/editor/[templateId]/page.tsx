"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { usePaperStore } from "@/store/paperStore";
import { TEMPLATE_MAP, SECTIONS } from "@/lib/templates";
import { SectionKey } from "@/types/paper";
import SectionList from "@/components/editor/SectionList";
import SectionEditor from "@/components/editor/SectionEditor";
import AuthorForm from "@/components/editor/AuthorForm";
import KeywordsInput from "@/components/editor/KeywordsInput";
import PaperPreview from "@/components/preview/PaperPreview";
import { FileText, Eye, EyeOff, ChevronLeft, Save } from "lucide-react";

interface EditorPageProps {
  params: Promise<{ templateId: string }>;
}

export default function EditorPage({ params }: EditorPageProps) {
  const { templateId } = use(params);
  const router = useRouter();
  const { paper, setTitle, setAuthors, setKeywords, setSectionContent } = usePaperStore();
  const [activeSection, setActiveSection] = useState("title");
  const [showPreview, setShowPreview] = useState(true);
  const [saved, setSaved] = useState(false);

  const template = TEMPLATE_MAP[templateId];

  useEffect(() => {
    if (!template) router.push("/templates");
  }, [template, router]);

  if (!template) return null;

  const completedSections: SectionKey[] = (Object.keys(paper.sections) as SectionKey[]).filter(
    (key) => paper.sections[key]?.trim().length > 0
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "title":
        return (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Paper Title</label>
            <input
              type="text"
              value={paper.title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your paper title..."
              className="w-full px-4 py-3 text-lg border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-2 text-xs text-slate-400">Use title case. Keep it concise and descriptive.</p>
          </div>
        );
      case "authors":
        return (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Author Details</label>
            <AuthorForm authors={paper.authors} onChange={setAuthors} />
          </div>
        );
      case "keywords":
        return (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Keywords</label>
            <KeywordsInput keywords={paper.keywords} onChange={setKeywords} />
            <p className="mt-2 text-xs text-slate-400">Add 5–10 relevant keywords. Press Enter or comma after each.</p>
          </div>
        );
      default:
        const section = SECTIONS.find((s) => s.key === activeSection);
        if (!section) return null;
        return (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{section.label}</label>
            <SectionEditor
              content={paper.sections[activeSection as SectionKey]}
              placeholder={`Write your ${section.label.toLowerCase()} here...`}
              onChange={(content) => setSectionContent(activeSection as SectionKey, content)}
              minHeight="300px"
            />
          </div>
        );
    }
  };

  const allSectionKeys = ["title", "authors", "keywords", ...SECTIONS.map((s) => s.key)];
  const currentIndex = allSectionKeys.indexOf(activeSection);
  const nextSection = allSectionKeys[currentIndex + 1];
  const prevSection = allSectionKeys[currentIndex - 1];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-14 flex flex-col">
      {/* Top bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/templates")}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            Templates
          </button>
          <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-medium">
              {template.name}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">
              {paper.title || "Untitled Paper"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 text-sm px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 text-sm px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save size={14} />
            {saved ? "Saved!" : "Save"}
          </button>
          <button className="flex items-center gap-2 text-sm px-3 py-1.5 bg-slate-900 dark:bg-white hover:bg-slate-700 dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg transition-colors">
            <FileText size={14} />
            Generate
          </button>
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-56 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto p-3">
          <SectionList
            activeSection={activeSection}
            completedSections={completedSections}
            onSelect={setActiveSection}
          />
        </div>

        {/* Center editor */}
        <div className={`${showPreview ? "w-[40%]" : "flex-1"} overflow-y-auto p-8 transition-all`}>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 mb-4">
              {renderActiveSection()}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => prevSection && setActiveSection(prevSection)}
                disabled={!prevSection}
                className="text-sm px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={() => nextSection && setActiveSection(nextSection)}
                disabled={!nextSection}
                className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next Section →
              </button>
            </div>
          </div>
        </div>

        {/* Right preview */}
        {showPreview && (
          <div className="flex-1 border-l border-slate-200 dark:border-slate-800 overflow-hidden">
            <PaperPreview paper={paper} />
          </div>
        )}
      </div>
    </div>
  );
}
