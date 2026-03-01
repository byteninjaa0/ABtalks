"use client";

import { motion } from "framer-motion";
import {
  Map,
  Mic2,
  Podcast,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import type { CommunityIdentityBlock } from "@/lib/landing-content";
import { cn } from "@/lib/utils";

const iconMap: Record<CommunityIdentityBlock["icon"], LucideIcon> = {
  roadmap: Map,
  mic: Mic2,
  podcast: Podcast,
  users: Users,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function CommunityIdentitySection({
  blocks,
}: {
  blocks: CommunityIdentityBlock[];
}) {
  return (
    <section
      id="identity"
      className="border-t border-slate-800/60 px-4 py-20 md:py-24"
      aria-labelledby="identity-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="identity-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl"
        >
          This Is Not Just Another Coding Platform.
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {blocks.map((block) => {
            const Icon = iconMap[block.icon];
            return (
              <motion.div key={block.id} variants={item}>
                <Card
                  className={cn(
                    "h-full border-slate-800/80 bg-slate-900/40 transition-all duration-300",
                    "rounded-2xl hover:border-slate-700/80 hover:bg-slate-900/60 hover:shadow-xl hover:shadow-slate-950/50"
                  )}
                >
                  <CardHeader>
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-violet-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100">
                      {block.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-slate-400">
                      {block.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
