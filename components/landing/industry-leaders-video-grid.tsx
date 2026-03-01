"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { YouTubeVideo } from "@/lib/youtube";

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

export function IndustryLeadersVideoGrid({
  videos,
}: {
  videos: YouTubeVideo[];
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-14 grid gap-6 sm:grid-cols-2"
    >
      {videos.map((video) => (
        <motion.article
          key={video.id}
          variants={item}
          className="group overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 shadow-lg transition-all duration-300 hover:border-slate-700/80 hover:bg-slate-900/60 hover:shadow-xl hover:shadow-slate-950/30"
        >
          <a
            href={video.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
              {video.thumbnailUrl ? (
                <Image
                  src={video.thumbnailUrl}
                  alt=""
                  width={640}
                  height={360}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-slate-600">
                  <span className="text-4xl font-bold">▶</span>
                </div>
              )}
              <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-xs font-medium text-white">
                {video.duration || "—"}
              </div>
            </div>
            <div className="p-5">
              <h3 className="line-clamp-2 text-lg font-semibold text-slate-100 group-hover:text-violet-200">
                {video.title}
              </h3>
              {(video.guestName || video.companyMention) && (
                <p className="mt-2 text-sm text-slate-400">
                  {[video.guestName, video.companyMention].filter(Boolean).join(" · ")}
                </p>
              )}
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-violet-400 group-hover:text-violet-300">
                <ExternalLink className="h-4 w-4" />
                Watch on YouTube
              </span>
            </div>
          </a>
        </motion.article>
      ))}
    </motion.div>
  );
}
