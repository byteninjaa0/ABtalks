import Link from "next/link";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function PodcastsPage() {
  const episodes = await prisma.podcast.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              ABTalks Podcast
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
              Deep, honest conversations with engineers, hiring managers and
              builders on how real careers grow in software, ML and AI.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">Back to landing</Link>
          </Button>
        </div>

        {episodes.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No episodes have been published yet. New episodes will appear here
            as soon as they are live.
          </p>
        ) : (
          <div className="space-y-4">
            {episodes.map((episode) => (
              <Card key={episode.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      Ep {episode.episodeNumber}
                    </span>
                    <span>{episode.title}</span>
                  </CardTitle>
                  <CardDescription className="mt-1 text-xs md:text-sm">
                    {episode.guestName}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                  <p className="line-clamp-2 md:max-w-xl">
                    {episode.description}
                  </p>
                  <Button size="sm" asChild>
                    <Link href={`/podcasts/${episode.id}`}>View details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

