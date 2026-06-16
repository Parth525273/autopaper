import { Paper } from "@/types/paper";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function downloadDocx(paper: Paper): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/generate/docx`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paper, format: "docx" }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Generation failed");
  }

  // Trigger browser download
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${paper.title || "paper"}.docx`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
