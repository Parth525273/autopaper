"use client";

import { Paper } from "@/types/paper";

interface SpringerPreviewProps {
  paper: Paper;
}

export default function SpringerPreview({ paper }: SpringerPreviewProps) {
  const stripHtml = (html: string) =>
    html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  const sections = [
    { key: "introduction", label: "1 Introduction" },
    { key: "literatureReview", label: "2 Literature Review" },
    { key: "methodology", label: "3 Methodology" },
    { key: "systemDesign", label: "4 System Design" },
    { key: "implementation", label: "5 Implementation" },
    { key: "results", label: "6 Results and Discussion" },
    { key: "conclusion", label: "7 Conclusion" },
    { key: "futureScope", label: "8 Future Scope" },
    { key: "acknowledgement", label: "Acknowledgements" },
    { key: "references", label: "References" },
  ];

  return (
    <div
      className="bg-white text-black mx-auto shadow-lg"
      style={{
        width: "595px",
        minHeight: "842px",
        padding: "79px 94px",
        fontFamily: "Times New Roman, Times, serif",
        fontSize: "10pt",
        lineHeight: "1.2",
        transform: "scale(0.65)",
        transformOrigin: "top center",
      }}
    >
      {/* Title */}
      <h1 style={{ fontSize: "14pt", fontWeight: "bold", marginBottom: "12px", lineHeight: "1.3" }}>
        {paper.title || "Paper Title"}
      </h1>

      {/* Authors */}
      <div style={{ fontSize: "12pt", marginBottom: "8px" }}>
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
          <div key={i} style={{ fontSize: "10pt", marginBottom: "2px" }}>
            {a.department ? `${a.department}, ` : ""}{a.affiliation}
            {a.email ? ` — ${a.email}` : ""}
          </div>
        ) : null
      ))}

      <hr style={{ borderTop: "1px solid black", margin: "10px 0" }} />

      {/* Abstract */}
      {paper.sections.abstract && (
        <div style={{ marginBottom: "12px" }}>
          <h3 style={{ fontSize: "10pt", fontWeight: "bold", marginBottom: "4px" }}>Abstract</h3>
          <p style={{ fontSize: "10pt", textAlign: "justify" }}>
            {stripHtml(paper.sections.abstract)}
          </p>
          {paper.keywords.length > 0 && (
            <p style={{ fontSize: "10pt", marginTop: "6px" }}>
              <strong>Keywords:</strong> {paper.keywords.join(" · ")}
            </p>
          )}
        </div>
      )}

      {/* Sections */}
      {sections.map(({ key, label }) => {
        const content = paper.sections[key as keyof typeof paper.sections];
        if (!content) return null;
        return (
          <div key={key} style={{ marginBottom: "10px" }}>
            <h2 style={{ fontSize: "12pt", fontWeight: "bold", marginBottom: "4px" }}>
              {label}
            </h2>
            <p style={{ textAlign: "justify", fontSize: "10pt" }}>
              {stripHtml(content)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
