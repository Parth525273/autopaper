"use client";

import { Paper } from "@/types/paper";

export default function ElsevierPreview({ paper }: { paper: Paper }) {
  const stripHtml = (html: string) =>
    html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  const sections = [
    { key: "introduction", label: "1. Introduction" },
    { key: "literatureReview", label: "2. Literature Review" },
    { key: "methodology", label: "3. Methodology" },
    { key: "systemDesign", label: "4. System Design" },
    { key: "implementation", label: "5. Implementation" },
    { key: "results", label: "6. Results and Discussion" },
    { key: "conclusion", label: "7. Conclusion" },
    { key: "futureScope", label: "8. Future Scope" },
    { key: "acknowledgement", label: "Acknowledgements" },
    { key: "references", label: "References" },
  ];

  return (
    <div
      className="bg-white text-black mx-auto shadow-lg"
      style={{
        width: "816px",
        minHeight: "1056px",
        padding: "72px 90px",
        fontFamily: "Times New Roman, Times, serif",
        fontSize: "11pt",
        lineHeight: "1.5",
        transform: "scale(0.6)",
        transformOrigin: "top center",
      }}
    >
      {/* Title */}
      <h1 style={{ fontSize: "16pt", fontWeight: "bold", marginBottom: "12px", lineHeight: "1.3" }}>
        {paper.title || "Paper Title"}
      </h1>

      {/* Authors */}
      <div style={{ fontSize: "12pt", marginBottom: "6px" }}>
        {paper.authors.map((a, i) => (
          <span key={i}>
            {a.name || "Author Name"}
            {i < paper.authors.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>

      {paper.authors.map((a, i) => (
        a.affiliation ? (
          <div key={i} style={{ fontSize: "11pt", fontStyle: "italic", marginBottom: "2px" }}>
            {a.department ? `${a.department}, ` : ""}{a.affiliation}
          </div>
        ) : null
      ))}

      <hr style={{ borderTop: "2px solid #1a6496", margin: "12px 0" }} />

      {/* Abstract box */}
      {paper.sections.abstract && (
        <div style={{ background: "#f5f5f5", padding: "10px 14px", marginBottom: "14px", borderLeft: "3px solid #1a6496" }}>
          <h3 style={{ fontSize: "11pt", fontWeight: "bold", fontStyle: "italic", marginBottom: "4px" }}>Abstract</h3>
          <p style={{ fontSize: "11pt", textAlign: "justify" }}>
            {stripHtml(paper.sections.abstract)}
          </p>
          {paper.keywords.length > 0 && (
            <p style={{ fontSize: "10pt", marginTop: "6px" }}>
              <em><strong>Keywords:</strong></em> {paper.keywords.join("; ")}
            </p>
          )}
        </div>
      )}

      {/* Sections */}
      {sections.map(({ key, label }) => {
        const content = paper.sections[key as keyof typeof paper.sections];
        if (!content) return null;
        return (
          <div key={key} style={{ marginBottom: "14px" }}>
            <h2 style={{ fontSize: "12pt", fontWeight: "bold", marginBottom: "6px", color: "#1a6496" }}>
              {label}
            </h2>
            <p style={{ textAlign: "justify", fontSize: "11pt", lineHeight: "1.5" }}>
              {stripHtml(content)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
