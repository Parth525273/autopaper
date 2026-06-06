"use client";

import { Paper } from "@/types/paper";

export default function ACMPreview({ paper }: { paper: Paper }) {
  const stripHtml = (html: string) =>
    html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  const sections = [
    { key: "introduction", label: "1. INTRODUCTION" },
    { key: "literatureReview", label: "2. RELATED WORK" },
    { key: "methodology", label: "3. METHODOLOGY" },
    { key: "systemDesign", label: "4. SYSTEM DESIGN" },
    { key: "implementation", label: "5. IMPLEMENTATION" },
    { key: "results", label: "6. EVALUATION" },
    { key: "conclusion", label: "7. CONCLUSION" },
    { key: "futureScope", label: "8. FUTURE WORK" },
    { key: "acknowledgement", label: "ACKNOWLEDGMENTS" },
    { key: "references", label: "REFERENCES" },
  ];

  return (
    <div
      className="bg-white text-black mx-auto shadow-lg"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "72px 54px",
        fontFamily: "Times New Roman, Times, serif",
        fontSize: "9pt",
        lineHeight: "1.2",
        transform: "scale(0.6)",
        transformOrigin: "top center",
      }}
    >
      {/* Title */}
      <h1 style={{ fontSize: "14pt", fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>
        {paper.title || "Paper Title"}
      </h1>

      {/* Authors centered */}
      <div style={{ textAlign: "center", fontSize: "11pt", marginBottom: "4px" }}>
        {paper.authors.map((a, i) => (
          <span key={i}>
            {a.name || "Author Name"}
            {i < paper.authors.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: "9pt", marginBottom: "10px" }}>
        {paper.authors.map((a, i) => (
          a.affiliation ? (
            <div key={i}>{a.affiliation}{a.email ? ` — ${a.email}` : ""}</div>
          ) : null
        ))}
      </div>

      <hr style={{ borderTop: "1px solid black", marginBottom: "10px" }} />

      {/* Abstract */}
      {paper.sections.abstract && (
        <div style={{ marginBottom: "12px" }}>
          <h2 style={{ fontSize: "9pt", fontWeight: "bold", fontStyle: "italic", marginBottom: "4px" }}>
            ABSTRACT
          </h2>
          <p style={{ fontSize: "9pt", textAlign: "justify" }}>
            {stripHtml(paper.sections.abstract)}
          </p>
          {paper.keywords.length > 0 && (
            <p style={{ fontSize: "9pt", marginTop: "6px" }}>
              <strong>CCS Concepts:</strong> {paper.keywords.join("; ")}
            </p>
          )}
        </div>
      )}

      <hr style={{ borderTop: "1px solid black", marginBottom: "10px" }} />

      {/* Two column */}
      <div style={{ columnCount: 2, columnGap: "24pt" }}>
        {sections.map(({ key, label }) => {
          const content = paper.sections[key as keyof typeof paper.sections];
          if (!content) return null;
          return (
            <div key={key} style={{ marginBottom: "10px", breakInside: "avoid" }}>
              <h2 style={{ fontSize: "9pt", fontWeight: "bold", textTransform: "uppercase", marginBottom: "4px" }}>
                {label}
              </h2>
              <p style={{ textAlign: "justify", fontSize: "9pt" }}>
                {stripHtml(content)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
