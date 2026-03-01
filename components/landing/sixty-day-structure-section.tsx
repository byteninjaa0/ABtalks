"use client";

import { motion } from "framer-motion";
import type { TimelinePhase } from "@/lib/landing-content";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const phaseItem = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0 },
};

export function SixtyDayStructureSection({
  phases,
}: {
  phases: TimelinePhase[];
}) {
  return (
    <section
      id="structure"
      className="border-t border-slate-800/60 px-4 py-20 md:py-24"
      aria-labelledby="structure-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="structure-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl"
        >
          Consistency Creates Industry Confidence.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-center text-slate-400"
        >
          A clear 60-day path from foundations to readiness.
        </motion.p>

        {/* Horizontal timeline */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16"
        >
          <div className="flex flex-col gap-0 sm:flex-row sm:items-stretch sm:gap-0">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.id}
                variants={phaseItem}
                className="relative flex flex-1 flex-col items-center text-center sm:border-l sm:border-slate-800 first:sm:border-l-0"
              >
                {/* Connector line on mobile */}
                {index < phases.length - 1 && (
                  <div className="absolute left-1/2 top-12 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-violet-500/40 to-transparent sm:hidden" />
                )}

                <div className="relative z-10 flex flex-col items-center rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 transition-colors hover:border-slate-700/80 hover:bg-slate-900/70 sm:mx-2 sm:min-h-[180px]">
                  <span className="text-2xl font-bold text-violet-400">
                    Day {phase.day}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-slate-100">
                    {phase.label}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
