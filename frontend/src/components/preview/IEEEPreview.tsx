"use client";

import { Paper } from "@/types/paper";
import { TEMPLATE_MAP } from "@/lib/templates";

interface IEEEPreviewProps {
  paper: Paper;
  variant?: "conference" | "journal";
}

export default function IEEEPreview({ paper, variant = "conference" }: IEEEPreviewProps) {
  const template = TEMPLATE_MAP[paper.templateId];

  const stripHtml = (html: string) =>
    html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

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

  // Always split into rows of 3, pad last row with nulls to maintain grid
  const authors = paper.authors;
  const rows: (typeof authors[0] | null)[][] = [];
  for (let i = 0; i < authors.length; i += 3) {
    const row = authors.slice(i, i + 3) as (typeof authors[0] | null)[];
    // Pad to always have 3 columns
    while (row.length < 3) row.push(null);
    rows.push(row);
  }

  const AuthorCell = ({ author }: { author: typeof authors[0] | null }) => {
    if (!author) return <div style={{ flex: 1 }} />;
    return (
      <div style={{ flex: 1, textAlign: "center", padding: "0 8px" }}>
        <div style={{ fontSize: "11pt", fontWeight: "normal", marginBottom: "2px" }}>
          {author.name || "Author Name"}
        </div>
        {author.department && (
          <div style={{ fontSize: "10pt", fontStyle: "italic", lineHeight: "1.3" }}>
            {author.department}
          </div>
        )}
        {author.affiliation && (
          <div style={{ fontSize: "10pt", fontStyle: "italic", lineHeight: "1.3" }}>
            {author.affiliation}
          </div>
        )}
        {author.email && (
          <div style={{ fontSize: "10pt", lineHeight: "1.3" }}>
            {author.email}
          </div>
        )}
      </div>
    );
  };

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
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <h1 style={{ fontSize: "24pt", fontWeight: "bold", lineHeight: "1.2", marginBottom: "16px" }}>
          {paper.title || "Paper Title"}
        </h1>

        {/* Authors — always 3 columns per row */}
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: "14px",
            }}
          >
            {row.map((author, colIdx) => (
              <AuthorCell key={colIdx} author={author} />
            ))}
          </div>
        ))}
      </div>

      {/* Abstract + Keywords */}
      {paper.sections.abstract && (
        <div style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            <span style={{ fontStyle: "italic", fontWeight: "bold", fontSize: "9pt" }}>Abstract—</span>
            <span style={{ fontSize: "9pt", textAlign: "justify", flex: 1 }}>
              {stripHtml(paper.sections.abstract)}
            </span>
          </div>
          {paper.keywords.length > 0 && (
            <div style={{ marginTop: "4px", fontSize: "9pt" }}>
              <span style={{ fontStyle: "italic", fontWeight: "bold" }}>Keywords—</span>
              <span> {paper.keywords.join(", ")}</span>
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
