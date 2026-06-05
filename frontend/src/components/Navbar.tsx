"use client";

import Link from "next/link";
import { FileText } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
            <FileText size={14} className="text-white" />
          </div>
          AutoPaper
        </Link>
        <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/templates" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Templates
          </Link>
          <Link
            href="/templates"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition-colors"
          >
            New Paper
          </Link>
        </div>
      </div>
    </nav>
  );
}
