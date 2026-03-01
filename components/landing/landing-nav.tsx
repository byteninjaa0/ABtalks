"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
interface LandingNavProps {
  user?: { name: string | null } | null;
}

export function LandingNav({ user }: LandingNavProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          aria-label="ABTalks home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 text-sm font-bold text-white shadow-lg shadow-violet-500/20">
            AB
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight text-slate-100">
              ABTalks
            </span>
            <span className="text-xs text-slate-400">Community · Challenge · Growth</span>
          </div>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/events"
            className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-white sm:inline-block"
          >
            Webinars
          </Link>
          <Link
            href="/podcasts"
            className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-white sm:inline-block"
          >
            Podcasts
          </Link>
          <Link
            href="/about"
            className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-white sm:inline-block"
          >
            About
          </Link>
          {user ? (
            <>
              <span className="hidden text-slate-300 sm:inline">Hi, {user.name}</span>
              <Button size="sm" variant="outline" className="rounded-xl" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
                Sign in
              </Link>
              <Button size="sm" className="rounded-xl" asChild>
                <Link href="/register">Join the Community</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
