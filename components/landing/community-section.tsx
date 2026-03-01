"use client";

import { motion } from "framer-motion";
import { Users, Target, MessageCircle, Share2 } from "lucide-react";
import type { CommunityStat } from "@/lib/landing-content";

const highlights = [
  {
    icon: Users,
    title: "Accountability",
    description: "Stay on track with peers who share the same goals and deadlines.",
  },
  {
    icon: Target,
    title: "Shared progress",
    description: "Celebrate wins and learn from others' approaches to the same challenges.",
  },
  {
    icon: MessageCircle,
    title: "Peer network",
    description: "Connect with developers at different stages—everyone has something to give.",
  },
  {
    icon: Share2,
    title: "Real discussions",
    description: "No generic advice; real code reviews, system design talks, and career insights.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const statItem = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1 },
};

export function CommunitySection({ stats }: { stats: CommunityStat[] }) {
  return (
    <section
      id="community"
      className="border-t border-slate-800/60 px-4 py-20 md:py-24"
      aria-labelledby="community-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="community-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl"
        >
          You Don&apos;t Grow Alone Here.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mx-auto mt-4 max-w-2xl text-center text-slate-400"
        >
          Accountability, shared progress, and a network that pushes you forward.
        </motion.p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 text-violet-400">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-3 font-semibold text-slate-100">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats grid - dynamic ready */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-16 grid grid-cols-3 gap-4 sm:gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={statItem}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-6 py-8 text-center transition-colors hover:border-slate-700/80 hover:bg-slate-900/60"
            >
              <p className="text-3xl font-bold text-violet-400 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
