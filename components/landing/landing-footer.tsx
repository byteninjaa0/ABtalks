"use client";

import Link from "next/link";

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@abtalks" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/abtalks" },
  { label: "X (Twitter)", href: "https://twitter.com/abtalks" },
];

export function LandingFooter() {
  return (
    <footer
      className="border-t border-slate-800/60 bg-slate-950/80 px-4 py-12 md:py-16"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & mission */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 text-sm font-bold text-white">
                AB
              </div>
              <span className="font-semibold text-slate-100">ABTalks</span>
            </Link>
            <p className="mt-3 max-w-md text-sm text-slate-400">
              A community of like-minded developers. We prepare students for
              real industry roles through structured training, webinars,
              podcasts, and a 60-day challenge—focused on discipline, clarity,
              and growth.
            </p>
          </div>

          {/* About & contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200">About</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="transition hover:text-slate-200">
                  About ABTalks
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-slate-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition hover:text-slate-200">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition hover:text-slate-200">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Connect</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-slate-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              Contact:{" "}
              <a
                href="mailto:hello@abtalks.com"
                className="font-medium text-slate-400 hover:underline"
              >
                hello@abtalks.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800/60 pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} ABTalks. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
