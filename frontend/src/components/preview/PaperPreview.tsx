"use client";

import { Paper } from "@/types/paper";
import IEEEPreview from "./IEEEPreview";
import SpringerPreview from "./SpringerPreview";
import ElsevierPreview from "./ElsevierPreview";
import ACMPreview from "./ACMPreview";

interface PaperPreviewProps {
  paper: Paper;
}

export default function PaperPreview({ paper }: PaperPreviewProps) {
  const renderPreview = () => {
    switch (paper.templateId) {
      case "ieee-conference":
        return <IEEEPreview paper={paper} variant="conference" />;
      case "ieee-journal":
        return <IEEEPreview paper={paper} variant="journal" />;
      case "springer":
        return <SpringerPreview paper={paper} />;
      case "acm":
        return <ACMPreview paper={paper} />;
      case "elsevier":
        return <ElsevierPreview paper={paper} />;
      default:
        return <IEEEPreview paper={paper} />;
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-slate-200 dark:bg-slate-900 p-4">
      {/* Preview label */}
      <div className="text-center mb-3">
        <span className="text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
          Live Preview
        </span>
      </div>

      {/* Scaled paper */}
      <div className="overflow-hidden" style={{ minHeight: "600px" }}>
        {renderPreview()}
      </div>
    </div>
  );
}
