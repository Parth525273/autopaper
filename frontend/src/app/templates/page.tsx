"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TEMPLATES } from "@/lib/templates";
import { usePaperStore } from "@/store/paperStore";
import TemplateCard from "@/components/templates/TemplateCard";
import { TemplateId } from "@/types/paper";
import { ArrowRight, Sparkles } from "lucide-react";

export default function TemplatesPage() {
  const router = useRouter();
  const { paper, setTemplateId } = usePaperStore();
  const [selected, setSelected] = useState<string>(paper.templateId);

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  const handleContinue = () => {
    setTemplateId(selected as TemplateId);
    router.push(`/editor/${selected}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-14">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-full px-3 py-1 mb-4">
            <Sparkles size={12} />
            Step 1 of 2
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Choose a Template
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Select the format for your paper. Each template applies the correct
            margins, fonts, column layout, and heading styles automatically.
          </p>
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
          {TEMPLATES.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              selected={selected === template.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Continue button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selected}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-8 py-3 rounded-xl transition-colors shadow-lg shadow-blue-600/20"
          >
            Continue with {TEMPLATES.find((t) => t.id === selected)?.name}
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
