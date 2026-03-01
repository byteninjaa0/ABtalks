import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABTalks – From Learner to Industry-Ready",
  description:
    "A community of like-minded developers. Structured 60-day challenge, webinars, podcasts, and mentorship to prepare you for real industry roles in Software Engineering, ML & AI.",
  openGraph: {
    title: "ABTalks – From Learner to Industry-Ready",
    description:
      "A focused community for ambitious developers preparing for real-world roles through structured challenges, mentorship, and live sessions.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`min-h-screen bg-background font-sans antialiased ${GeistSans.className}`}>
        {children}
      </body>
    </html>
  );
}
