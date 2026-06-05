import { TemplateConfig } from "@/types/paper";

export const TEMPLATES: TemplateConfig[] = [
  {
    id: "ieee-conference",
    name: "IEEE Conference",
    description:
      "Standard IEEE two-column format for conference paper submissions.",
    thumbnail: "/templates/ieee-conference.png",
    columns: 2,
    fontFamily: "Times New Roman",
    fontSize: {
      title: "24pt",
      authors: "11pt",
      sectionHeading: "10pt",
      body: "10pt",
      caption: "8pt",
      references: "8pt",
    },
    margins: {
      top: "0.75in",
      bottom: "1in",
      left: "0.625in",
      right: "0.625in",
    },
    lineSpacing: 1.0,
    sectionNumbering: true,
    tags: ["IEEE", "Conference", "Two-column"],
  },
  {
    id: "ieee-journal",
    name: "IEEE Journal",
    description:
      "IEEE journal format with two-column layout for journal article submissions.",
    thumbnail: "/templates/ieee-journal.png",
    columns: 2,
    fontFamily: "Times New Roman",
    fontSize: {
      title: "24pt",
      authors: "11pt",
      sectionHeading: "10pt",
      body: "10pt",
      caption: "8pt",
      references: "8pt",
    },
    margins: {
      top: "1in",
      bottom: "1in",
      left: "0.75in",
      right: "0.75in",
    },
    lineSpacing: 1.0,
    sectionNumbering: true,
    tags: ["IEEE", "Journal", "Two-column"],
  },
  {
    id: "springer",
    name: "Springer",
    description:
      "Springer LNCS single-column format for workshops and proceedings.",
    thumbnail: "/templates/springer.png",
    columns: 1,
    fontFamily: "Times New Roman",
    fontSize: {
      title: "14pt",
      authors: "12pt",
      sectionHeading: "12pt",
      body: "10pt",
      caption: "9pt",
      references: "9pt",
    },
    margins: {
      top: "1.1in",
      bottom: "1.1in",
      left: "1.3in",
      right: "1.3in",
    },
    lineSpacing: 1.0,
    sectionNumbering: true,
    tags: ["Springer", "LNCS", "Single-column"],
  },
  {
    id: "acm",
    name: "ACM",
    description:
      "ACM two-column format for computing research conference submissions.",
    thumbnail: "/templates/acm.png",
    columns: 2,
    fontFamily: "Linux Libertine",
    fontSize: {
      title: "14.4pt",
      authors: "11pt",
      sectionHeading: "9pt",
      body: "9pt",
      caption: "9pt",
      references: "8pt",
    },
    margins: {
      top: "1in",
      bottom: "1in",
      left: "0.75in",
      right: "0.75in",
    },
    lineSpacing: 1.0,
    sectionNumbering: false,
    tags: ["ACM", "Computing", "Two-column"],
  },
  {
    id: "elsevier",
    name: "Elsevier",
    description:
      "Elsevier single-column journal format for science and engineering.",
    thumbnail: "/templates/elsevier.png",
    columns: 1,
    fontFamily: "Times New Roman",
    fontSize: {
      title: "16pt",
      authors: "12pt",
      sectionHeading: "12pt",
      body: "11pt",
      caption: "10pt",
      references: "10pt",
    },
    margins: {
      top: "1in",
      bottom: "1in",
      left: "1.25in",
      right: "1.25in",
    },
    lineSpacing: 1.5,
    sectionNumbering: true,
    tags: ["Elsevier", "Journal", "Single-column"],
  },
];

export const TEMPLATE_MAP = Object.fromEntries(
  TEMPLATES.map((t) => [t.id, t])
) as Record<string, TemplateConfig>;

export const SECTIONS = [
  { key: "abstract", label: "Abstract" },
  { key: "introduction", label: "Introduction" },
  { key: "literatureReview", label: "Literature Review" },
  { key: "methodology", label: "Methodology" },
  { key: "systemDesign", label: "System Design" },
  { key: "implementation", label: "Implementation" },
  { key: "results", label: "Results & Discussion" },
  { key: "conclusion", label: "Conclusion" },
  { key: "futureScope", label: "Future Scope" },
  { key: "acknowledgement", label: "Acknowledgement" },
  { key: "references", label: "References" },
] as const;
