import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Paper, Author, SectionKey, TemplateId } from "@/types/paper";

interface PaperState {
  paper: Paper;
  isDirty: boolean;

  // Actions
  setTitle: (title: string) => void;
  setAuthors: (authors: Author[]) => void;
  setKeywords: (keywords: string[]) => void;
  setTemplateId: (templateId: TemplateId) => void;
  setSectionContent: (key: SectionKey, content: string) => void;
  resetPaper: () => void;
  loadPaper: (paper: Paper) => void;
}

const defaultPaper: Paper = {
  title: "",
  authors: [{ name: "", affiliation: "", department: "", email: "" }],
  keywords: [],
  templateId: "ieee-conference",
  sections: {
    abstract: "",
    introduction: "",
    literatureReview: "",
    methodology: "",
    systemDesign: "",
    implementation: "",
    results: "",
    conclusion: "",
    futureScope: "",
    acknowledgement: "",
    references: "",
  },
};

export const usePaperStore = create<PaperState>()(
  persist(
    (set) => ({
      paper: defaultPaper,
      isDirty: false,

      setTitle: (title) =>
        set((state) => ({
          paper: { ...state.paper, title },
          isDirty: true,
        })),

      setAuthors: (authors) =>
        set((state) => ({
          paper: { ...state.paper, authors },
          isDirty: true,
        })),

      setKeywords: (keywords) =>
        set((state) => ({
          paper: { ...state.paper, keywords },
          isDirty: true,
        })),

      setTemplateId: (templateId) =>
        set((state) => ({
          paper: { ...state.paper, templateId },
          isDirty: true,
        })),

      setSectionContent: (key, content) =>
        set((state) => ({
          paper: {
            ...state.paper,
            sections: { ...state.paper.sections, [key]: content },
          },
          isDirty: true,
        })),

      resetPaper: () =>
        set({ paper: defaultPaper, isDirty: false }),

      loadPaper: (paper) =>
        set({ paper, isDirty: false }),
    }),
    {
      name: "autopaper-draft",
    }
  )
);
