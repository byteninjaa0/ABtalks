"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

type ChallengeDetail = {
  id: string;
  dayNumber: number;
  category: string;
  difficulty: string;
  description: string;
  industryNote: string;
  unlocked: boolean;
  solved: boolean;
};

export default function ChallengeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [challenge, setChallenge] = useState<ChallengeDetail | null>(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/challenge/${id}`)
      .then((res) => res.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setChallenge(d);
      })
      .catch(() => setChallenge(null))
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
        body: JSON.stringify({ challengeId: id, code: code.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(data.error || "Submission failed");
        return;
      }
      setResult(data.result || "Passed");
      setChallenge((c) => (c ? { ...c, solved: true } : c));
      router.refresh();
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
  if (!challenge) {
    return (
      <div className="p-8">
        <p className="text-destructive">Challenge not found.</p>
        <Button asChild className="mt-4">
          <Link href="/challenge">Back to Challenge</Link>
        </Button>
      </div>
    );
  }
  if (!challenge.unlocked) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">This challenge is locked. Complete the previous day first.</p>
        <Button asChild className="mt-4">
          <Link href="/challenge">Back to Challenge</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/challenge" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </Button>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Day {challenge.dayNumber}</CardTitle>
            <CardDescription>{challenge.category}</CardDescription>
            <span
              className={`inline-block w-fit rounded border px-2 py-0.5 text-sm ${getDifficultyBgColor(challenge.difficulty)}`}
            >
              {challenge.difficulty}
            </span>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-invert max-w-none text-sm">
              <pre className="whitespace-pre-wrap font-sans">{challenge.description}</pre>
            </div>
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm text-muted-foreground">
              <strong>Industry note:</strong> {challenge.industryNote}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Submit solution</CardTitle>
            <CardDescription>Paste your code and submit. Evaluation returns Passed for now.</CardDescription>
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
