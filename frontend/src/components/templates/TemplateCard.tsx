"use client";

import { useRouter } from "next/navigation";
import { TemplateConfig } from "@/types/paper";
import { Columns2, FileText, BookOpen, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  template: TemplateConfig;
  selected: boolean;
  onSelect: (id: string) => void;
}

const TEMPLATE_ICONS: Record<string, React.ReactNode> = {
  "ieee-conference": <Columns2 size={18} />,
  "ieee-journal": <Columns2 size={18} />,
  springer: <BookOpen size={18} />,
  acm: <Columns2 size={18} />,
  elsevier: <FileText size={18} />,
};

const TEMPLATE_COLORS: Record<string, string> = {
  "ieee-conference": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  "ieee-journal": "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800",
  springer: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  acm: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800",
  elsevier: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
};

export default function TemplateCard({ template, selected, onSelect }: TemplateCardProps) {
  return (
    <div
      onClick={() => onSelect(template.id)}
      className={cn(
        "relative cursor-pointer rounded-xl border-2 p-5 transition-all duration-200 hover:shadow-md",
        selected
          ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 shadow-md"
          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600"
      )}
    >
      {/* Selected check */}
      {selected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
          <Check size={12} className="text-white" />
        </div>
      )}

      {/* Icon + Name */}
      <div className="flex items-start gap-3 mb-4">
        <div className={cn("w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0", TEMPLATE_COLORS[template.id])}>
          {TEMPLATE_ICONS[template.id]}
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
            {template.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {template.columns === 2 ? "Two-column" : "Single-column"}
          </p>
        </div>
      </div>

      {/* Paper preview mockup */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 mb-4 aspect-[3/4] flex flex-col gap-1.5">
        {/* Title bar */}
        <div className="h-2 bg-slate-300 dark:bg-slate-600 rounded-full w-3/4 mx-auto" />
        <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2 mx-auto" />
        <div className="flex-1 mt-1 flex gap-1.5">
          {template.columns === 2 ? (
            <>
              <div className="flex-1 flex flex-col gap-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={cn("h-1 rounded-full bg-slate-200 dark:bg-slate-700", i % 5 === 4 ? "w-2/3" : "w-full")} />
                ))}
              </div>
              <div className="flex-1 flex flex-col gap-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={cn("h-1 rounded-full bg-slate-200 dark:bg-slate-700", i % 4 === 3 ? "w-3/4" : "w-full")} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col gap-1">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={cn("h-1 rounded-full bg-slate-200 dark:bg-slate-700", i % 6 === 5 ? "w-2/3" : "w-full")} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
        {template.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {template.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
