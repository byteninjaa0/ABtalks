"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section
      id="cta"
      className="relative border-t border-slate-800/60 px-4 py-24 md:py-32"
      aria-labelledby="cta-heading"
    >
      {/* Subtle background shift */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(99,102,241,0.08),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl md:text-5xl"
        >
          If You&apos;re Serious About Entering the Industry — Start With
          Structure.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6 text-lg text-slate-400"
        >
          Join a community built for discipline, clarity, and growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10"
        >
          <Button
            size="lg"
            className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-10 text-base shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/30"
            asChild
          >
            <Link href="/register">Start Your Journey</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
