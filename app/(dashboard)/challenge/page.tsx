"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Check, ChevronRight } from "lucide-react";
import { getDifficultyBgColor } from "@/lib/utils";

type Challenge = {
  id: string;
  dayNumber: number;
  category: string;
  difficulty: string;
  description: string;
  industryNote: string;
  solved: boolean;
  unlocked: boolean;
};

export default function ChallengePage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/challenge")
      .then((res) => res.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setChallenges(d.challenges || []);
        setCurrentDay(d.currentDay ?? 1);
      })
      .catch(() => setChallenges([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-muted-foreground">Loading challenges…</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-2 text-3xl font-bold">60-Day Challenge</h1>
      <p className="mb-8 text-muted-foreground">
        Complete each day to unlock the next. You are on Day {currentDay}.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((c) => (
          <Card
            key={c.id}
            className={
              c.unlocked
                ? "border-primary/30"
                : "opacity-75"
            }
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Day {c.dayNumber}</CardTitle>
              {c.unlocked ? (
                c.solved ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )
              ) : (
                <Lock className="h-5 w-5 text-muted-foreground" />
              )}
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-muted-foreground">{c.category}</p>
              <span
                className={`inline-block rounded border px-2 py-0.5 text-xs ${getDifficultyBgColor(c.difficulty)}`}
              >
                {c.difficulty}
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
