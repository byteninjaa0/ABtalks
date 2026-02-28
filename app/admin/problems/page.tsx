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

type Problem = {
  id: string;
  title: string;
  description: string;
  domain: string;
  category: string;
  difficulty: string;
};

const DOMAINS = ["SE", "ML", "AI"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export default function AdminProblemsPage() {
  const router = useRouter();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("SE");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/problems")
      .then(async (res) => {
        const d = await res.json();
        if (!res.ok) throw new Error(d.error || "Failed to load");
        setProblems(d.problems || []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/problems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          domain,
          category,
          difficulty,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create");
      setTitle("");
      setDescription("");
      setCategory("");
      setDifficulty("Easy");
      setDomain("SE");
      setProblems((prev) => [...prev, data.problem]);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create problem");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this problem?")) return;
    try {
      const res = await fetch(`/api/admin/problems/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not delete");
      setProblems((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Could not delete");
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin – Problems</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create and manage problems. Assign domain, category and difficulty.
          </p>
        </div>
        {error && (
          <p className="mb-4 text-sm text-destructive">{error}</p>
        )}
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Create problem</CardTitle>
              <CardDescription>All fields are required.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
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
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Software Engineering"
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
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Creating…" : "Create problem"}
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Existing problems</CardTitle>
              <CardDescription>Edit/delete from the Problems page when logged in as admin.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : problems.length === 0 ? (
                <p className="text-sm text-muted-foreground">No problems yet.</p>
              ) : (
                <ul className="space-y-2">
                  {problems.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center justify-between gap-2 rounded border px-3 py-2 text-sm"
                    >
                      <span className="truncate">{p.title}</span>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(p.id)}
                        >
                          Delete
                        </Button>
                      </div>
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
