"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";
import { getDifficultyBgColor } from "@/lib/utils";
import { useIsAdmin } from "@/lib/user-context";

type Problem = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  solved: boolean;
};

const CATEGORIES = [
  "Software Engineering",
  "Machine Learning",
  "Artificial Intelligence",
];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export default function ProblemsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAdmin = useIsAdmin();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  async function handleDelete(id: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Delete this problem?")) return;
    try {
      const res = await fetch(`/api/admin/problems/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Could not delete");
      }
      setProblems((prev) => prev.filter((p) => p.id !== id));
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not delete");
    }
  }

  useEffect(() => {
    const params = new URLSearchParams();
    if (difficulty) params.set("difficulty", difficulty);
    if (category) params.set("category", category);
    fetch(`/api/problems?${params}`)
      .then((res) => res.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setProblems(d.problems || []);
      })
      .catch(() => setProblems([]))
      .finally(() => setLoading(false));
  }, [difficulty, category]);

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Problems</h1>
          <p className="text-muted-foreground">
            Practice by category and difficulty. Separate from the 60-day track.
          </p>
        </div>
        {isAdmin && (
          <Button asChild>
            <Link href="/admin/problems">Add Problem</Link>
          </Button>
        )}
      </div>
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Difficulty:</span>
          {DIFFICULTIES.map((d) => (
            <Button
              key={d}
              variant={difficulty === d ? "default" : "outline"}
              size="sm"
              onClick={() => setDifficulty(difficulty === d ? "" : d)}
            >
              {d}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Category:</span>
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              variant={category === c ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(category === c ? "" : c)}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {problems.map((p) => (
            <Card key={p.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">{p.title}</CardTitle>
                <div className="flex items-center gap-2">
                  {p.solved && <Check className="h-5 w-5 text-green-500" />}
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDelete(p.id, e)}
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
                  {p.description}
                </p>
                <div className="mb-3 flex gap-2">
                  <span
                    className={`rounded border px-2 py-0.5 text-xs ${getDifficultyBgColor(p.difficulty)}`}
                  >
                    {p.difficulty}
                  </span>
                  <span className="rounded border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground">
                    {p.category}
                  </span>
                </div>
                <Button asChild>
                  <Link href={`/problems/${p.id}`}>
                    {p.solved ? "View" : "Solve"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {!loading && problems.length === 0 && (
        <p className="text-muted-foreground">No problems match the filters.</p>
      )}
    </div>
  );
}
