"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Challenge = {
  id: string;
  dayNumber: number;
  domain: string;
  category: string;
  difficulty: string;
  description: string;
  industryNote: string;
};

const DOMAINS = ["SE", "ML", "AI"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export default function AdminChallengesPage() {
  const router = useRouter();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dayNumber, setDayNumber] = useState("");
  const [domain, setDomain] = useState("SE");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [description, setDescription] = useState("");
  const [industryNote, setIndustryNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/challenges")
      .then(async (res) => {
        const d = await res.json();
        if (!res.ok) throw new Error(d.error || "Failed to load");
        setChallenges(d.challenges || []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const day = Number(dayNumber);
    if (!Number.isInteger(day) || day < 1 || day > 60) {
      setError("Day must be 1–60");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dayNumber: day,
          domain,
          category,
          difficulty,
          description,
          industryNote,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create");
      setDayNumber("");
      setDescription("");
      setIndustryNote("");
      setCategory("");
      setDifficulty("Easy");
      setDomain("SE");
      setChallenges((prev) => [...prev, data.challenge]);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create challenge");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this challenge?")) return;
    try {
      const res = await fetch(`/api/admin/challenges/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not delete");
      setChallenges((prev) => prev.filter((c) => c.id !== id));
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Could not delete");
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin – 60-Day Challenges</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Add or replace challenges for a specific day and domain.
          </p>
        </div>
        {error && (
          <p className="mb-4 text-sm text-destructive">{error}</p>
        )}
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Add challenge</CardTitle>
              <CardDescription>Day 1–60, one challenge per (day, domain).</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dayNumber">Day (1–60)</Label>
                    <Input
                      id="dayNumber"
                      type="number"
                      min={1}
                      max={60}
                      value={dayNumber}
                      onChange={(e) => setDayNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="domain">Domain</Label>
                    <select
                      id="domain"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {DOMAINS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <select
                      id="difficulty"
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {DIFFICULTIES.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
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
                  <Label htmlFor="industryNote">Industry note (optional)</Label>
                  <Textarea
                    id="industryNote"
                    value={industryNote}
                    onChange={(e) => setIndustryNote(e.target.value)}
                    rows={2}
                  />
                </div>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Creating…" : "Add challenge"}
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Existing challenges</CardTitle>
              <CardDescription>By domain and day.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : challenges.length === 0 ? (
                <p className="text-sm text-muted-foreground">None yet.</p>
              ) : (
                <ul className="max-h-[400px] space-y-2 overflow-y-auto">
                  {challenges.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center justify-between gap-2 rounded border px-3 py-2 text-sm"
                    >
                      <span>
                        Day {c.dayNumber} ({c.domain})
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(c.id)}
                      >
                        Delete
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
