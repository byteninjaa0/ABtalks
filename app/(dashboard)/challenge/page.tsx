"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Check, ChevronRight, Pencil, Trash2, Plus } from "lucide-react";
import { getDifficultyBgColor } from "@/lib/utils";
import { AddChallengeButton } from "@/components/admin-add-buttons";
import { useUser } from "@/lib/user-context";

const DOMAIN_OPTIONS = [
  { value: "SE", label: "Software Engineering (SE)" },
  { value: "ML", label: "Machine Learning (ML)" },
  { value: "AI", label: "Artificial Intelligence (AI)" },
] as const;

type ChallengeSlot = {
  id: string | null;
  dayNumber: number;
  category: string | null;
  difficulty: string | null;
  description: string | null;
  industryNote: string | null;
  solved: boolean;
  unlocked: boolean;
  configured: boolean;
};

type ChallengeResponse = {
  challenges: ChallengeSlot[];
  domain: string;
  currentDay: number;
  currentStreak: number;
  longestStreak: number;
  defaultDomain: string;
};

export default function ChallengePage() {
  const user = useUser();
  const defaultDomain = (user?.selectedDomain ?? "SE") as "SE" | "ML" | "AI";
  const [domain, setDomain] = useState<"SE" | "ML" | "AI">(defaultDomain);
  const [data, setData] = useState<ChallengeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/challenge?domain=${domain}`)
      .then((res) => res.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setData(d);
      })
      .catch((e) => {
        setError(e.message);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [domain]);


  async function handleDelete(challengeId: string) {
    if (!confirm("Delete this challenge?")) return;
    try {
      const res = await fetch(`/api/admin/challenges/${challengeId}`, { method: "DELETE" });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Could not delete");
      setData((prev) =>
        prev
          ? {
              ...prev,
              challenges: prev.challenges.map((c) =>
                c.id === challengeId ? { ...c, id: null, configured: false, category: null, difficulty: null, description: null, industryNote: null } : c
              ),
            }
          : null
      );
    } catch (e) {
      alert(e instanceof Error ? e.message : "Could not delete");
    }
  }

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-muted-foreground">Loading challenges…</p>
      </div>
    );
  }

  const isAdmin = user?.role === "ADMIN";
  const challenges = data?.challenges ?? [];
  const currentDay = data?.currentDay ?? 1;
  const currentStreak = data?.currentStreak ?? 0;
  const longestStreak = data?.longestStreak ?? 0;

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold">60-Day Challenge</h1>
          <p className="text-muted-foreground">
            Day {currentDay} of 60 · Streak: {currentStreak} · Longest: {longestStreak}
          </p>
        </div>
        <AddChallengeButton />
      </div>

      {/* Domain filter */}
      <div className="mb-6">
        <p className="mb-2 text-sm font-medium text-muted-foreground">Domain</p>
        <div className="flex flex-wrap gap-2">
          {DOMAIN_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              variant={domain === opt.value ? "default" : "outline"}
              size="sm"
              onClick={() => setDomain(opt.value)}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {error && (
        <p className="mb-4 text-sm text-destructive">{error}</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {challenges.map((c) => (
          <Card
            key={c.dayNumber}
            className={
              c.unlocked && c.configured
                ? "border-primary/30"
                : "opacity-90"
            }
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Day {c.dayNumber}</CardTitle>
              <div className="flex items-center gap-1">
                {c.configured ? (
                  c.unlocked ? (
                    c.solved ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )
                  ) : (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  )
                ) : null}
                {isAdmin && c.id && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      asChild
                    >
                      <Link href={`/admin/challenges?edit=${c.id}`} onClick={(e) => e.stopPropagation()}>
                        <Pencil className="h-4 w-4" aria-label="Edit" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDelete(c.id!)}
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
                {isAdmin && !c.configured && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <Link href={`/admin/challenges?day=${c.dayNumber}&domain=${domain}`}>
                      <Plus className="h-4 w-4" aria-label="Add" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {c.configured ? (
                <>
                  <p className="mb-2 text-sm text-muted-foreground">{c.category ?? ""}</p>
                  <span
                    className={`inline-block rounded border px-2 py-0.5 text-xs ${getDifficultyBgColor(c.difficulty ?? "Easy")}`}
                  >
                    {c.difficulty ?? "—"}
                  </span>
                  {c.unlocked ? (
                    <Button asChild className="mt-4 w-full">
                      <Link href={`/challenge/${c.id}`}>
                        {c.solved ? "View" : "Solve"}
                      </Link>
                    </Button>
                  ) : (
                    <Button disabled className="mt-4 w-full">
                      Locked
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <p className="mb-2 text-sm text-muted-foreground">Not configured yet</p>
                  {isAdmin && (
                    <Button asChild className="mt-4 w-full" size="sm">
                      <Link href={`/admin/challenges?day=${c.dayNumber}&domain=${domain}`}>
                        Add challenge
                      </Link>
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
