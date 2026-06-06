"use client";

import { Paper } from "@/types/paper";
import { TEMPLATE_MAP } from "@/lib/templates";

interface IEEEPreviewProps {
  paper: Paper;
  variant?: "conference" | "journal";
}

export default function IEEEPreview({ paper, variant = "conference" }: IEEEPreviewProps) {
  const template = TEMPLATE_MAP[paper.templateId];

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  };

  const sections = [
    { key: "introduction", label: "I. Introduction" },
    { key: "literatureReview", label: "II. Literature Review" },
    { key: "methodology", label: "III. Methodology" },
    { key: "systemDesign", label: "IV. System Design" },
    { key: "implementation", label: "V. Implementation" },
    { key: "results", label: "VI. Results & Discussion" },
    { key: "conclusion", label: "VII. Conclusion" },
    { key: "futureScope", label: "VIII. Future Scope" },
    { key: "acknowledgement", label: "Acknowledgement" },
    { key: "references", label: "References" },
  ];

  return (
    <div
      className="bg-white text-black mx-auto shadow-lg"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "54px 45px",
        fontFamily: "Times New Roman, Times, serif",
        fontSize: "10pt",
        lineHeight: "1.2",
        transform: "scale(0.6)",
        transformOrigin: "top center",
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "12px" }}>
        <h1 style={{ fontSize: "24pt", fontWeight: "bold", lineHeight: "1.2", marginBottom: "8px" }}>
          {paper.title || "Paper Title"}
        </h1>

        {/* Authors */}
        <div style={{ fontSize: "11pt", marginBottom: "4px" }}>
          {paper.authors.map((a, i) => (
            <span key={i}>
              {a.name || "Author Name"}
              {i < paper.authors.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>

        {/* Affiliations */}
        {paper.authors.map((a, i) => (
          a.affiliation ? (
            <div key={i} style={{ fontSize: "10pt", fontStyle: "italic" }}>
              {a.department ? `${a.department}, ` : ""}{a.affiliation}
            </div>
          ) : null
        ))}

        {/* Emails */}
        <div style={{ fontSize: "10pt", marginTop: "4px" }}>
          {paper.authors.map((a, i) => (
            a.email ? (
              <span key={i}>
                {a.email}{i < paper.authors.length - 1 ? "; " : ""}
              </span>
            ) : null
          ))}
        </div>
      </div>

      {/* Abstract + Keywords — full width */}
      {paper.sections.abstract && (
        <div style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", gap: "4px" }}>
            <span style={{ fontStyle: "italic", fontWeight: "bold", fontSize: "9pt" }}>Abstract—</span>
            <span style={{ fontSize: "9pt" }}>{stripHtml(paper.sections.abstract)}</span>
          </div>
          {paper.keywords.length > 0 && (
            <div style={{ marginTop: "4px", fontSize: "9pt" }}>
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>Keywords—</span>
              <span>{paper.keywords.join(", ")}</span>
            </div>
          )}
        </div>
      )}

      {/* Divider */}
      <hr style={{ borderTop: "1px solid black", marginBottom: "10px" }} />

      {/* Two-column body */}
      <div style={{ columnCount: template?.columns === 2 ? 2 : 1, columnGap: "18pt" }}>
        {sections.map(({ key, label }) => {
          const content = paper.sections[key as keyof typeof paper.sections];
          if (!content) return null;
          return (
            <div key={key} style={{ marginBottom: "10px", breakInside: "avoid" }}>
              <h2 style={{
                fontSize: "10pt",
                fontWeight: "bold",
                textTransform: "uppercase",
                textAlign: "center",
                marginBottom: "4px",
              }}>
                {label}
              </h2>
              <p style={{ textAlign: "justify", textIndent: "12pt", fontSize: "10pt" }}>
                {stripHtml(content)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
