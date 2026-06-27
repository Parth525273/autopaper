"use client";

import { Paper } from "@/types/paper";
import { TEMPLATE_MAP } from "@/lib/templates";

interface IEEEPreviewProps {
  paper: Paper;
  variant?: "conference" | "journal";
}

function RenderContent({ html }: { html: string }) {
  if (!html) return null;
  const processed = html
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/<p>/g, '<p style="text-align:justify;text-indent:12pt;margin:0 0 4pt 0;font-size:10pt;line-height:1.3;color:#000;">')
    .replace(/<p /g, '<p style="text-align:justify;text-indent:12pt;margin:0 0 4pt 0;font-size:10pt;line-height:1.3;color:#000;" ')
    .replace(/<h[1-4][^>]*>/g, '<div style="font-size:10pt;font-weight:bold;font-style:italic;margin:6pt 0 2pt 0;color:#000;">')
    .replace(/<\/h[1-4]>/g, "</div>")
    .replace(/<ul>/g, '<ul style="margin:0 0 4pt 0;padding-left:16pt;font-size:10pt;line-height:1.3;color:#000;">')
    .replace(/<ol>/g, '<ol style="margin:0 0 4pt 0;padding-left:16pt;font-size:10pt;line-height:1.3;color:#000;">')
    .replace(/<li>/g, '<li style="margin-bottom:2pt;color:#000;">');
  return <div dangerouslySetInnerHTML={{ __html: processed }} />;
}

function RenderReferences({ html }: { html: string }) {
  if (!html) return null;
  // Parse each paragraph as one reference
  const paraPattern = /<p[^>]*>(.*?)<\/p>/gs;
  const refs: string[] = [];
  let match;
  while ((match = paraPattern.exec(html)) !== null) {
    const text = match[1]
      .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
      .replace(/<[^>]+>/g, "").trim();
    if (text) refs.push(text);
  }
  return (
    <div>
      {refs.map((ref, i) => (
        <p key={i} style={{
          fontSize: "8pt", color: "#000", margin: "0 0 4pt 0",
          lineHeight: "1.3", paddingLeft: "18pt", textIndent: "-18pt",
        }}>
          <span style={{ fontWeight: "normal" }}>[{i + 1}]{"  "}</span>
          {ref}
        </p>
      ))}
    </div>
  );
}

function stripHtml(html: string): string {
  return html.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default function IEEEPreview({ paper, variant = "conference" }: IEEEPreviewProps) {
  const template = TEMPLATE_MAP[paper.templateId];
  const isTwoColumn = template?.columns === 2;
  const SCALE = 0.6;
  const PAGE_W = 816;
  const PAGE_H = 1056;

  // ── FIXED: Future Scope before Conclusion ──
  const sections = [
    { key: "introduction",    label: "I. Introduction" },
    { key: "literatureReview",label: "II. Literature Review" },
    { key: "methodology",     label: "III. Methodology" },
    { key: "systemDesign",    label: "IV. System Design" },
    { key: "implementation",  label: "V. Implementation" },
    { key: "results",         label: "VI. Results & Discussion" },
    { key: "futureScope",     label: "VII. Future Scope" },
    { key: "conclusion",      label: "VIII. Conclusion" },
    { key: "acknowledgement", label: "Acknowledgement" },
    { key: "references",      label: "References" },
  ];

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
        <div style={{ fontSize: "11pt", fontWeight: "normal", marginBottom: "2px" }}>{author.name || "Author Name"}</div>
        {author.department && <div style={{ fontSize: "10pt", fontStyle: "italic", lineHeight: "1.3" }}>{author.department}</div>}
        {author.affiliation && <div style={{ fontSize: "10pt", fontStyle: "italic", lineHeight: "1.3" }}>{author.affiliation}</div>}
        {author.email && <div style={{ fontSize: "10pt", lineHeight: "1.3" }}>{author.email}</div>}
      </div>
    );
  };

  return (
    <div style={{ width: `${PAGE_W * SCALE}px`, overflow: "visible" }}>
      <div style={{ width: `${PAGE_W}px`, transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
        <div style={{
          width: `${PAGE_W}px`, minHeight: `${PAGE_H}px`,
          padding: "54px 45px",
          fontFamily: "Times New Roman, Times, serif",
          fontSize: "10pt", lineHeight: "1.2", color: "#000",
          background: "#fff", boxSizing: "border-box",
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          backgroundImage: `repeating-linear-gradient(to bottom, transparent 0px, transparent ${PAGE_H - 2}px, #94a3b8 ${PAGE_H - 2}px, #94a3b8 ${PAGE_H}px, #e2e8f0 ${PAGE_H}px, #e2e8f0 ${PAGE_H + 8}px)`,
        }}>
          {/* Title + Authors */}
          <div style={{ textAlign: "center", marginBottom: "14px" }}>
            <h1 style={{ fontSize: "24pt", fontWeight: "bold", lineHeight: "1.2", marginBottom: "14px", color: "#000" }}>
              {paper.title || "Paper Title"}
            </h1>
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: "12px" }}>
                {row.map((author, colIdx) => <AuthorCell key={colIdx} author={author} />)}
              </div>
            ))}
          </div>

          <hr style={{ borderTop: "1px solid black", margin: "8px 0 10px 0" }} />

          {/* Two-column body */}
          <div style={{ columnCount: isTwoColumn ? 2 : 1, columnGap: "18pt" }}>

            {paper.sections.abstract && (
              <div style={{ marginBottom: "8px" }}>
                <p style={{ fontSize: "9pt", textAlign: "justify", fontWeight: "bold", color: "#000", lineHeight: "1.35", margin: "0 0 6px 0" }}>
                  <span style={{ fontStyle: "italic" }}>Abstract</span>{"—"}
                  {" "}{stripHtml(paper.sections.abstract)}
                </p>
              </div>
            )}

            {paper.keywords.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                <p style={{ fontSize: "9pt", fontWeight: "bold", fontStyle: "italic", color: "#000", margin: "0", lineHeight: "1.35" }}>
                  {"Keywords—"}{" "}{paper.keywords.join(", ")}
                </p>
              </div>
            )}

            {sections.map(({ key, label }) => {
              const content = paper.sections[key as keyof typeof paper.sections];
              if (!content || !stripHtml(content)) return null;
              return (
                <div key={key} style={{ marginBottom: "8px" }}>
                  <h2 style={{ fontSize: "10pt", fontWeight: "bold", textTransform: "uppercase", textAlign: "center", marginBottom: "4px", color: "#000", letterSpacing: "0.03em" }}>
                    {label}
                  </h2>
                  {key === "references"
                    ? <RenderReferences html={content} />
                    : <RenderContent html={content} />
                  }
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
