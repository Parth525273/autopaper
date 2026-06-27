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
      case "ieee-conference": return <IEEEPreview paper={paper} variant="conference" />;
      case "ieee-journal":    return <IEEEPreview paper={paper} variant="journal" />;
      case "springer":        return <SpringerPreview paper={paper} />;
      case "acm":             return <ACMPreview paper={paper} />;
      case "elsevier":        return <ElsevierPreview paper={paper} />;
      default:                return <IEEEPreview paper={paper} />;
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-slate-300 dark:bg-slate-900">
      <div className="text-center py-2 sticky top-0 z-10 bg-slate-300 dark:bg-slate-900">
        <span className="text-xs text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-300 shadow-sm">
          Live Preview — scroll to see full paper
        </span>
      </div>
      {/* 
        scale(0.6) shrinks the visual but NOT the layout height.
        We wrap in overflow:visible so the full scaled content is scrollable.
      */}
      <div style={{ padding: "8px 0 200px 0", overflow: "visible" }}>
        {renderPreview()}
      </div>
    </div>
  );
}
