"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899"];

type DashboardData = {
  currentDay: number;
  totalProblemsSolved: number;
  currentStreak: number;
  longestStreak: number;
  completionPercentage: number;
  recentActivity: Array<{
    id: string;
    dayNumber?: number;
    problemTitle?: string;
    result: string;
    createdAt: string;
  }>;
  categoryProgress: Array<{ name: string; value: number }>;
  difficultyBreakdown: Array<{ name: string; value: number }>;
  weeklySubmissions: Array<{ day: string; submissions: number }>;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setData(d);
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-muted-foreground">Loading dashboard…</p>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-destructive">Failed to load dashboard.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Day</CardDescription>
            <CardTitle className="text-3xl">
              Day {data.currentDay}/60
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Problems Solved</CardDescription>
            <CardTitle className="text-3xl">{data.totalProblemsSolved}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Streak</CardDescription>
            <CardTitle className="text-3xl">{data.currentStreak} days</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Longest Streak</CardDescription>
            <CardTitle className="text-3xl">{data.longestStreak} days</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Completion</CardTitle>
            <CardDescription>60-day challenge progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={data.completionPercentage} className="h-3" />
            <p className="mt-2 text-sm text-muted-foreground">
              {data.completionPercentage}% complete
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Category Progress</CardTitle>
            <CardDescription>Challenges solved by category</CardDescription>
          </CardHeader>
          <CardContent>
            {data.categoryProgress.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={data.categoryProgress}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {data.categoryProgress.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground">No data yet. Solve challenges to see progress.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Difficulty Breakdown</CardTitle>
            <CardDescription>Challenges solved by difficulty</CardDescription>
          </CardHeader>
          <CardContent>
            {data.difficultyBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={data.difficultyBreakdown}
                  layout="vertical"
                  margin={{ left: 60 }}
                >
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="name" width={55} />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="hsl(var(--primary))"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground">No data yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Submissions</CardTitle>
            <CardDescription>Submissions in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            {data.weeklySubmissions.some((d) => d.submissions > 0) ? (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data.weeklySubmissions}>
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="submissions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground">No submissions this week.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Last 10 submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentActivity.length > 0 ? (
              <ScrollArea className="h-[240px]">
                <ul className="space-y-3">
                  {data.recentActivity.map((a) => (
                    <li
                      key={a.id}
                      className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm"
                    >
                      <span>
                        {a.dayNumber != null
                          ? `Day ${a.dayNumber} challenge`
                          : a.problemTitle || "Problem"}
                      </span>
                      <span
                        className={
                          a.result === "Passed"
                            ? "text-green-500"
                            : "text-destructive"
                        }
                      >
                        {a.result}
                      </span>
                      <span className="text-muted-foreground">
                        {new Date(a.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            ) : (
              <p className="text-sm text-muted-foreground">No submissions yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
