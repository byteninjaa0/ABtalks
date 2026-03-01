"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 py-20 sm:py-28 md:py-32"
      aria-labelledby="hero-heading"
    >
      {/* Soft animated gradient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(59,130,246,0.08),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          From Learner to{" "}
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Industry-Ready.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl"
        >
          ABTalks is a focused community for ambitious developers preparing for
          real-world roles through structured challenges, mentorship, and live
          sessions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            size="lg"
            className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/30"
            asChild
          >
            <Link href="/register">Join the Community</Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-xl border-slate-600" asChild>
            <Link href="/events">Explore Webinars</Link>
          </Button>
          <Button size="lg" variant="ghost" className="rounded-xl text-slate-300 hover:text-white" asChild>
            <Link href="/podcasts">Listen to Podcasts</Link>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-6 text-sm text-slate-500"
        >
          Built for serious learners preparing for the industry.
        </motion.p>
      </div>
    </section>
  );
}
