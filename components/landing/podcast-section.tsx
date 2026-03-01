"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export interface PodcastPreview {
  id: string;
  title: string;
  description: string;
  guestName: string;
  episodeNumber: number;
  /** Pre-formatted date string to avoid server/client locale mismatch */
  publishedAtFormatted: string;
  youtubeUrl?: string | null;
  spotifyUrl?: string | null;
}

export function PodcastSection({
  podcasts,
}: {
  podcasts: PodcastPreview[];
}) {
  return (
    <section
      id="podcasts"
      className="border-t border-slate-800/60 px-4 py-20 md:py-24"
      aria-labelledby="podcasts-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="podcasts-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl"
        >
          Conversations With Builders.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mx-auto mt-4 max-w-2xl text-center text-slate-400"
        >
          Real talks with engineers, researchers, and leaders—no fluff.
        </motion.p>

        <div className="mt-14">
          {podcasts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-6 py-12 text-center"
            >
              <p className="text-slate-400">
                No episodes published yet. New episodes will appear here when
                they go live.
              </p>
              <Button variant="outline" className="mt-4 rounded-xl" asChild>
                <Link href="/podcasts">Browse podcasts</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {podcasts.map((episode, index) => (
                <motion.div
                  key={episode.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <Card className="flex h-full flex-col border-slate-800/80 bg-slate-900/40 transition-all duration-300 rounded-2xl hover:border-slate-700/80 hover:bg-slate-900/60 hover:shadow-xl">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-violet-400">
                        <span>Episode {episode.episodeNumber}</span>
                      </div>
                      <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-slate-100">
                        {episode.title}
                      </h3>
                      <p className="text-sm text-slate-400">{episode.guestName}</p>
                    </CardHeader>
                    <CardContent className="mt-auto space-y-4 pt-0">
                      <p className="line-clamp-3 text-sm text-slate-500">
                        {episode.description}
                      </p>
                      <p className="text-xs text-slate-500">
                        {episode.publishedAtFormatted}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full rounded-xl"
                        asChild
                      >
                        <Link href={`/podcasts/${episode.id}`}>
                          <Play className="mr-2 h-4 w-4" />
                          Listen
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {podcasts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Button variant="outline" className="rounded-xl" asChild>
              <Link href="/podcasts">Browse all episodes</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
