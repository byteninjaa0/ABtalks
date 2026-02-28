"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getDifficultyBgColor } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

type ProblemDetail = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  solved: boolean;
};

export default function ProblemDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/problems/${id}`)
      .then((res) => res.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setProblem(d);
      })
      .catch(() => setProblem(null))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId: id, code: code.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(data.error || "Submission failed");
        return;
      }
      setResult(data.result || "Passed");
      setProblem((p) => (p ? { ...p, solved: true } : p));
    } catch {
      setResult("Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }
  if (!problem) {
    return (
      <div className="p-8">
        <p className="text-destructive">Problem not found.</p>
        <Button asChild className="mt-4">
          <Link href="/problems">Back to Problems</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/problems" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </Button>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{problem.title}</CardTitle>
            <CardDescription>{problem.category}</CardDescription>
            <span
              className={`inline-block w-fit rounded border px-2 py-0.5 text-sm ${getDifficultyBgColor(problem.difficulty)}`}
            >
              {problem.difficulty}
            </span>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm">{problem.description}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Submit solution</CardTitle>
            <CardDescription>Paste your code and submit.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="// Your code here"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[280px] font-mono text-sm"
              />
              {result != null && (
                <p
                  className={
                    result === "Passed"
                      ? "text-green-500"
                      : "text-destructive"
                  }
                >
                  {result}
                </p>
              )}
              <Button type="submit" disabled={submitting}>
                {submitting ? "Submitting…" : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
