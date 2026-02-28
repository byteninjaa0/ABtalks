"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { getDifficultyBgColor } from "@/lib/utils";

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
  const searchParams = useSearchParams();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

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
      <h1 className="mb-2 text-3xl font-bold">Problems</h1>
      <p className="mb-6 text-muted-foreground">
        Practice by category and difficulty. Separate from the 60-day track.
      </p>
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
                {p.solved && <Check className="h-5 w-5 text-green-500" />}
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
