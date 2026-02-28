"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type Episode = {
  id: string;
  title: string;
  episodeNumber: number;
  guestName: string;
  publishedAt: string;
};

export default function AdminPodcastsPage() {
  const router = useRouter();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestBio, setGuestBio] = useState("");
  const [guestImage, setGuestImage] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/podcasts");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Unable to load podcasts");
          return;
        }
        setEpisodes(
          data.episodes.map((e: any) => ({
            id: e.id,
            title: e.title,
            episodeNumber: e.episodeNumber,
            guestName: e.guestName,
            publishedAt: e.publishedAt,
          }))
        );
      } catch {
        setError("Unable to load podcasts");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/podcasts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          guestName,
          guestBio,
          guestImage,
          episodeNumber: Number(episodeNumber),
          youtubeUrl,
          spotifyUrl,
          publishedAt,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not create podcast");
        return;
      }
      setTitle("");
      setDescription("");
      setGuestName("");
      setGuestBio("");
      setGuestImage("");
      setEpisodeNumber("");
      setYoutubeUrl("");
      setSpotifyUrl("");
      setPublishedAt("");
      setEpisodes((prev) => [
        {
          id: data.episode.id,
          title: data.episode.title,
          episodeNumber: data.episode.episodeNumber,
          guestName: data.episode.guestName,
          publishedAt: data.episode.publishedAt,
        },
        ...prev,
      ]);
      router.refresh();
    } catch {
      setError("Could not create podcast");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this episode?")) return;
    try {
      const res = await fetch(`/api/admin/podcasts/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Could not delete episode");
        return;
      }
      setEpisodes((prev) => prev.filter((e) => e.id !== id));
      router.refresh();
    } catch {
      alert("Could not delete episode");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Admin – Podcasts
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create and manage ABTalks podcast episodes. Only admins can access
            this page.
          </p>
        </div>

        {error && (
          <p className="mb-4 text-sm text-destructive">
            {error} (make sure you are logged in as an admin)
          </p>
        )}

        <div className="grid gap-6 md:grid-cols-[3fr,2fr]">
          <Card>
            <CardHeader>
              <CardTitle>Create new episode</CardTitle>
              <CardDescription>
                All fields are required. Episodes are listed at{" "}
                <span className="font-mono text-xs">/podcasts</span>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4 text-sm">
                <div className="space-y-2">
                  <Label htmlFor="episodeNumber">Episode number</Label>
                  <Input
                    id="episodeNumber"
                    type="number"
                    min={1}
                    value={episodeNumber}
                    onChange={(e) => setEpisodeNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guestName">Guest name</Label>
                  <Input
                    id="guestName"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guestBio">Guest bio</Label>
                  <Textarea
                    id="guestBio"
                    value={guestBio}
                    onChange={(e) => setGuestBio(e.target.value)}
                    required
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guestImage">Guest image URL</Label>
                  <Input
                    id="guestImage"
                    value={guestImage}
                    onChange={(e) => setGuestImage(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtubeUrl">YouTube URL</Label>
                  <Input
                    id="youtubeUrl"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spotifyUrl">Spotify URL</Label>
                  <Input
                    id="spotifyUrl"
                    value={spotifyUrl}
                    onChange={(e) => setSpotifyUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publishedAt">Published date</Label>
                  <Input
                    id="publishedAt"
                    type="date"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Creating…" : "Create episode"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing episodes</CardTitle>
              <CardDescription>
                Episodes appear on the public podcast listing and detail pages.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {loading ? (
                <p className="text-muted-foreground">Loading episodes…</p>
              ) : episodes.length === 0 ? (
                <p className="text-muted-foreground">
                  No episodes created yet. Use the form to create one.
                </p>
              ) : (
                <ul className="space-y-3">
                  {episodes.map((ep) => (
                    <li
                      key={ep.id}
                      className="flex items-start justify-between gap-3 rounded-md border bg-card px-3 py-2"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          Ep {ep.episodeNumber}: {ep.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {ep.guestName} ·{" "}
                          {new Date(ep.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleDelete(ep.id)}
                      >
                        ×
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

