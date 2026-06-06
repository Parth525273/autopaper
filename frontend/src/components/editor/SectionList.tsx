"use client";

import { SECTIONS } from "@/lib/templates";
import { SectionKey } from "@/types/paper";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";

interface SectionListProps {
  activeSection: string;
  completedSections: SectionKey[];
  onSelect: (key: string) => void;
}

const SPECIAL_SECTIONS = ["title", "authors", "keywords"];

export default function SectionList({
  activeSection,
  completedSections,
  onSelect,
}: SectionListProps) {
  const allSections = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "keywords", label: "Keywords" },
    ...SECTIONS,
  ];

  return (
    <nav className="space-y-0.5">
      <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">
        Sections
      </p>
      {allSections.map((section, index) => {
        const isActive = activeSection === section.key;
        const isCompleted = completedSections.includes(section.key as SectionKey);
        const isSpecial = SPECIAL_SECTIONS.includes(section.key);

        return (
          <button
            key={section.key}
            onClick={() => onSelect(section.key)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all text-left",
              isActive
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-medium"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <span className="flex-shrink-0">
              {isCompleted ? (
                <CheckCircle2 size={14} className="text-green-500" />
              ) : (
                <Circle size={14} className="text-slate-300 dark:text-slate-600" />
              )}
            </span>
            <span className="flex-1">{section.label}</span>
            {!isSpecial && (
              <span className="text-xs text-slate-400 dark:text-slate-600">
                {index - 2}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
