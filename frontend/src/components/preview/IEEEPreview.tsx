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

  // Always 3 columns per row, pad with null
  const authors = paper.authors;
  const rows: (typeof authors[0] | null)[][] = [];
  for (let i = 0; i < authors.length; i += 3) {
    const row = authors.slice(i, i + 3) as (typeof authors[0] | null)[];
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

  const isTwoColumn = template?.columns === 2;

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
        color: "#000",
        transform: "scale(0.6)",
        transformOrigin: "top center",
      }}
    >
      {/* ── FULL WIDTH: Title + Authors only ── */}
      <div style={{ textAlign: "center", marginBottom: "14px" }}>
        <h1 style={{ fontSize: "24pt", fontWeight: "bold", lineHeight: "1.2", marginBottom: "14px", color: "#000" }}>
          {paper.title || "Paper Title"}
        </h1>

        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: "12px" }}
          >
            {row.map((author, colIdx) => (
              <AuthorCell key={colIdx} author={author} />
            ))}
          </div>
        ))}
      </div>

      <hr style={{ borderTop: "1px solid black", margin: "8px 0 10px 0" }} />

      {/* ── TWO COLUMNS: Abstract + Keywords + All sections ── */}
      <div style={{
        columnCount: isTwoColumn ? 2 : 1,
        columnGap: "18pt",
        columnFill: "auto",
      }}>

        {/* Abstract */}
        {paper.sections.abstract && (
          <div style={{ marginBottom: "8px", breakInside: "avoid" }}>
            <p style={{
              fontSize: "9pt",
              textAlign: "justify",
              fontWeight: "bold",
              color: "#000",
              lineHeight: "1.35",
              margin: "0 0 6px 0",
            }}>
              <span style={{ fontStyle: "italic" }}>Abstract</span>
              {"—"}
              {" "}{stripHtml(paper.sections.abstract)}
            </p>
          </div>
        )}

        {/* Keywords */}
        {paper.keywords.length > 0 && (
          <div style={{ marginBottom: "10px", breakInside: "avoid" }}>
            <p style={{
              fontSize: "9pt",
              fontWeight: "bold",
              fontStyle: "italic",
              color: "#000",
              margin: "0",
              lineHeight: "1.35",
            }}>
              {"Keywords—"}{" "}{paper.keywords.join(", ")}
            </p>
          </div>
        )}

        {/* Body sections */}
        {sections.map(({ key, label }) => {
          const content = paper.sections[key as keyof typeof paper.sections];
          if (!content) return null;
          return (
            <div key={key} style={{ marginBottom: "10px" }}>
              <h2 style={{
                fontSize: "10pt",
                fontWeight: "bold",
                textTransform: "uppercase",
                textAlign: "center",
                marginBottom: "4px",
                color: "#000",
                letterSpacing: "0.03em",
              }}>
                {label}
              </h2>
              <p style={{
                textAlign: "justify",
                textIndent: "12pt",
                fontSize: "10pt",
                color: "#000",
                lineHeight: "1.3",
                margin: 0,
              }}>
                {stripHtml(content)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
