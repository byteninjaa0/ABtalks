import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";

type Props = {
  params: { id: string };
};

export const dynamic = "force-dynamic";

function getYouTubeEmbedUrl(youtubeUrl: string): string | null {
  try {
    const url = new URL(youtubeUrl);
    let id = "";
    if (url.hostname.includes("youtu.be")) {
      id = url.pathname.replace("/", "");
    } else if (url.searchParams.get("v")) {
      id = url.searchParams.get("v") ?? "";
    }
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return null;
  }
}

export default async function PodcastDetailPage({ params }: Props) {
  const { id } = params;
  const episode = await prisma.podcast.findUnique({
    where: { id },
  });

  if (!episode) {
    return notFound();
  }

  const embedUrl = getYouTubeEmbedUrl(episode.youtubeUrl);

  return (
    <div className="p-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Podcast episode
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ep {episode.episodeNumber}: {episode.title}
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Published{" "}
            {new Date(episode.publishedAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-[2fr,1.4fr] md:items-start">
          <div className="space-y-6">
            <div className="aspect-video overflow-hidden rounded-lg border bg-black">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={episode.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  Unable to embed this video.{" "}
                  <Link
                    href={episode.youtubeUrl}
                    className="ml-1 underline"
                    target="_blank"
                  >
                    Watch on YouTube
                  </Link>
                  .
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-semibold md:text-base">
                Episode overview
              </h2>
              <p className="whitespace-pre-line text-sm text-muted-foreground md:text-base">
                {episode.description}
              </p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-muted">
                <Image
                  src={episode.guestImage}
                  alt={episode.guestName}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold">{episode.guestName}</p>
                <p className="text-xs text-muted-foreground">
                  {episode.guestBio}
                </p>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4 text-sm">
              <h2 className="mb-3 text-sm font-semibold md:text-base">
                Listen on your favourite platform
              </h2>
              <div className="flex flex-col gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={episode.youtubeUrl} target="_blank">
                    Open on YouTube
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={episode.spotifyUrl} target="_blank">
                    Listen on Spotify
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4 text-xs text-muted-foreground">
              <p>
                This episode is part of the ABTalks 60-day engine. Use it to
                connect the daily problems you&apos;re solving to how real
                teams build and ship software, ML and AI systems.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
