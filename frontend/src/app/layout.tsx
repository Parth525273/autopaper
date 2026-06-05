import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AutoPaper — Research Paper Formatter",
  description:
    "Automatically format research papers according to IEEE, Springer, ACM, and Elsevier templates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
