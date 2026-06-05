// ─── Template Types ──────────────────────────────────────────

export type TemplateId =
  | "ieee-conference"
  | "ieee-journal"
  | "springer"
  | "acm"
  | "elsevier";

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  thumbnail: string;
  columns: 1 | 2;
  fontFamily: string;
  fontSize: {
    title: string;
    authors: string;
    sectionHeading: string;
    body: string;
    caption: string;
    references: string;
  };
  margins: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
  lineSpacing: number;
  sectionNumbering: boolean;
  tags: string[];
}

// ─── Paper Types ─────────────────────────────────────────────

export interface Author {
  name: string;
  affiliation: string;
  department: string;
  email: string;
}

export type SectionKey =
  | "abstract"
  | "introduction"
  | "literatureReview"
  | "methodology"
  | "systemDesign"
  | "implementation"
  | "results"
  | "conclusion"
  | "futureScope"
  | "acknowledgement"
  | "references";

export interface PaperSection {
  key: SectionKey;
  label: string;
  content: string;
  order: number;
}

export interface Paper {
  id?: string;
  title: string;
  authors: Author[];
  keywords: string[];
  templateId: TemplateId;
  sections: Record<SectionKey, string>;
  createdAt?: string;
  updatedAt?: string;
}
