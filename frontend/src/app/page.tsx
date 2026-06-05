"use client";

import Link from "next/link";
import { ArrowRight, FileText, Zap, Download, Layout } from "lucide-react";

const FEATURES = [
  {
    icon: <Layout size={20} />,
    title: "5 Academic Templates",
    desc: "IEEE, Springer, ACM, Elsevier — all formatting applied automatically.",
  },
  {
    icon: <Zap size={20} />,
    title: "Live Preview",
    desc: "See your paper formatted in real time as you type.",
  },
  {
    icon: <Download size={20} />,
    title: "Download Ready",
    desc: "Export submission-ready DOCX and PDF with one click.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-14">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-full px-3 py-1 mb-6">
          <FileText size={12} />
          Research Paper Formatter
        </div>
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
          Format your research paper
          <br />
          <span className="text-blue-600">in minutes, not hours</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10">
          Select a template, write your content section by section, and
          download a perfectly formatted paper — no manual font, margin, or
          spacing adjustments ever.
        </p>
        <Link
          href="/templates"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-600/25"
        >
          Start Writing
          <ArrowRight size={16} />
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
