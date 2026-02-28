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

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  guestName: string;
};

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("Online");
  const [guestName, setGuestName] = useState("");
  const [guestBio, setGuestBio] = useState("");
  const [guestImage, setGuestImage] = useState("");
  const [outcomes, setOutcomes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/events");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Unable to load events");
          return;
        }
        setEvents(
          data.events.map((e: any) => ({
            id: e.id,
            title: e.title,
            description: e.description,
            date: e.date,
            time: e.time,
            location: e.location,
            guestName: e.guestName,
          }))
        );
      } catch {
        setError("Unable to load events");
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
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          date,
          time,
          location,
          guestName,
          guestBio,
          guestImage,
          outcomes: outcomes
            .split("\n")
            .map((o) => o.trim())
            .filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not create event");
        return;
      }
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setLocation("Online");
      setGuestName("");
      setGuestBio("");
      setGuestImage("");
      setOutcomes("");
      setEvents((prev) => [
        ...prev,
        {
          id: data.event.id,
          title: data.event.title,
          description: data.event.description,
          date: data.event.date,
          time: data.event.time,
          location: data.event.location,
          guestName: data.event.guestName,
        },
      ]);
      router.refresh();
    } catch {
      setError("Could not create event");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Could not delete event");
        return;
      }
      setEvents((prev) => prev.filter((e) => e.id !== id));
      router.refresh();
    } catch {
      alert("Could not delete event");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Admin – Events
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create and manage ABTalks events and webinars. Only admins can
            access this page.
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
              <CardTitle>Create new event</CardTitle>
              <CardDescription>
                All fields are required. Outcomes are shown as bullet points on
                the event page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4 text-sm">
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
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time (e.g. 7:00 PM IST)</Label>
                    <Input
                      id="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
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
                  <Label htmlFor="outcomes">
                    Outcomes (one per line, shown as bullets)
                  </Label>
                  <Textarea
                    id="outcomes"
                    value={outcomes}
                    onChange={(e) => setOutcomes(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Creating…" : "Create event"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing events</CardTitle>
              <CardDescription>
                Events are shown publicly on the landing page and{" "}
                <span className="font-mono text-xs">/events</span>.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {loading ? (
                <p className="text-muted-foreground">Loading events…</p>
              ) : events.length === 0 ? (
                <p className="text-muted-foreground">
                  No events created yet. Use the form to create one.
                </p>
              ) : (
                <ul className="space-y-3">
                  {events.map((event) => (
                    <li
                      key={event.id}
                      className="flex items-start justify-between gap-3 rounded-md border bg-card px-3 py-2"
                    >
                      <div>
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} ·{" "}
                          {event.time}
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleDelete(event.id)}
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

