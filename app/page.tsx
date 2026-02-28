import Link from "next/link";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [user, events, podcasts] = await Promise.all([
    getCurrentUser(),
    prisma.event.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
      orderBy: { date: "asc" },
      take: 3,
    }),
    prisma.podcast.findMany({
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Top nav */}
      <header className="border-b border-slate-800/60 bg-black/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-sky-400 text-sm font-bold">
              AB
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">
                ABTalks
              </span>
              <span className="text-xs text-slate-400">
                60-Day Industry Engine
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            {user ? (
              <>
                <span className="hidden text-slate-300 sm:inline">
                  Hi, {user.name}
                </span>
                <Button size="sm" asChild>
                  <Link href="/dashboard">Go to dashboard</Link>
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-medium text-slate-300 hover:text-white sm:text-sm"
                >
                  Sign in
                </Link>
                <Button size="sm" asChild>
                  <Link href="/register">Join 60-day challenge</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-12 md:py-16">
        {/* Hero */}
        <section className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-medium text-sky-300">
              60 days. Software + ML + AI. One engine.
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Master <span className="text-sky-400">industry-level skills</span>{" "}
              in 60 days.
            </h1>
            <p className="max-w-xl text-sm text-slate-300 md:text-base">
              ABTalks combines a structured 60-day coding challenge with live
              events and deep-dive podcasts so you don&apos;t just solve
              problems—you learn how real teams ship software, ML, and AI
              systems in production.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/challenge">Start 60-Day Challenge</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/events">Explore Events</Link>
              </Button>
              <Button size="lg" variant="ghost" className="text-sky-300" asChild>
                <Link href="/podcasts">Listen to Podcasts</Link>
              </Button>
            </div>
            <div className="grid gap-4 text-xs text-slate-300 sm:grid-cols-3 sm:text-sm">
              <div>
                <p className="font-semibold text-slate-100">60-day structure</p>
                <p className="text-slate-400">
                  Daily unlocks, streaks and progress tracking that keep you
                  moving forward, one challenge at a time.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-100">
                  Industry alignment
                </p>
                <p className="text-slate-400">
                  Challenges mirror the systems, patterns and interviews you&apos;ll
                  see in real product teams.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-100">
                  Consistency-first learning
                </p>
                <p className="text-slate-400">
                  Events, office hours and podcasts turn consistency into a
                  system—not a mood.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 shadow-xl shadow-sky-500/10">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              60-day coding engine
            </p>
            <div className="space-y-3 text-sm text-slate-200">
              <div className="flex items-center justify-between">
                <span>Software Engineering</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-300">
                  Core DSA & systems
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800">
                <div className="h-1.5 w-3/4 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Machine Learning</span>
                <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-xs text-sky-300">
                  From math to models
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800">
                <div className="h-1.5 w-2/3 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400" />
              </div>
              <div className="flex items-center justify-between">
                <span>Artificial Intelligence</span>
                <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs text-violet-300">
                  Deep learning & transformers
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800">
                <div className="h-1.5 w-1/2 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Track your streaks, unlock a new challenge every day, and connect
              it all with events and podcasts built for the same roadmap.
            </p>
          </div>
        </section>

        {/* Domains */}
        <section className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                Domains covered
              </h2>
              <p className="text-sm text-slate-400">
                One challenge engine, three tracks that map directly to real
                roles.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-slate-800/80 bg-slate-900/40">
              <CardHeader>
                <CardTitle className="text-base">Software Engineering</CardTitle>
                <CardDescription>
                  Data structures, algorithms, systems thinking and production
                  patterns.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-slate-300">
                Backend-heavy challenges, architecture discussions and
                event-driven problem sets that mirror real product work.
              </CardContent>
            </Card>
            <Card className="border-slate-800/80 bg-slate-900/40">
              <CardHeader>
                <CardTitle className="text-base">Machine Learning</CardTitle>
                <CardDescription>
                  From regression and trees to model evaluation and deployment.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-slate-300">
                Build intuition around data, features and metrics so you can
                talk about ML work like an engineer, not just a student.
              </CardContent>
            </Card>
            <Card className="border-slate-800/80 bg-slate-900/40">
              <CardHeader>
                <CardTitle className="text-base">Artificial Intelligence</CardTitle>
                <CardDescription>
                  Deep learning, sequence models and modern transformer-based
                  systems.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-slate-300">
                Translate challenge concepts into how modern AI products are
                actually built and shipped.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Events preview */}
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                Upcoming events
              </h2>
              <p className="text-sm text-slate-400">
                Live sessions, breakdowns and Q&amp;A aligned with the 60-day
                roadmap.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/events">View all events</Link>
            </Button>
          </div>
          {events.length === 0 ? (
            <p className="text-sm text-slate-400">
              No upcoming events yet. Check back soon for the next live session.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="flex flex-col border-slate-800/80 bg-slate-900/40"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="line-clamp-2 text-base">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="flex items-center justify-between text-xs">
                      <span>
                        {new Date(event.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-slate-400">{event.time}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between space-y-3">
                    <p className="line-clamp-3 text-xs text-slate-300">
                      {event.description}
                    </p>
                    <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
                      <span>{event.guestName}</span>
                      <span className="rounded-full border border-slate-700 px-2 py-0.5">
                        {event.location}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 w-full"
                      asChild
                    >
                      <Link href={`/events/${event.id}`}>View details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Podcasts preview */}
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                Latest podcast episodes
              </h2>
              <p className="text-sm text-slate-400">
                Conversations with engineers, hiring managers and builders who
                live this work every day.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/podcasts">Browse all episodes</Link>
            </Button>
          </div>
          {podcasts.length === 0 ? (
            <p className="text-sm text-slate-400">
              No episodes published yet. Episodes will appear here as soon as
              they go live.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {podcasts.map((episode) => (
                <Card
                  key={episode.id}
                  className="flex flex-col border-slate-800/80 bg-slate-900/40"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Ep {episode.episodeNumber}: {episode.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-slate-400">
                      {episode.guestName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between space-y-3">
                    <p className="line-clamp-3 text-xs text-slate-300">
                      {episode.description}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(episode.publishedAt).toLocaleDateString(
                        undefined,
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 w-full"
                      asChild
                    >
                      <Link href={`/podcasts/${episode.id}`}>View episode</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 bg-black/40 py-6 text-xs text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="font-medium text-slate-200">ABTalks</p>
            <p className="text-[11px] text-slate-500">
              Built for learners who want industry-ready skills, not just
              certificates.
            </p>
            <p className="text-[11px]">
              © {new Date().getFullYear()} ABTalks. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div className="flex gap-4 text-xs">
              <Link
                href="https://www.youtube.com/@abtalks"
                className="hover:text-slate-200"
              >
                YouTube
              </Link>
              <Link
                href="https://www.linkedin.com/company/abtalks"
                className="hover:text-slate-200"
              >
                LinkedIn
              </Link>
              <Link
                href="https://twitter.com"
                className="hover:text-slate-200"
              >
                X (Twitter)
              </Link>
            </div>
            <p className="text-[11px]">
              Contact:{" "}
              <a
                href="mailto:hello@abtalks.com"
                className="font-medium text-slate-200 hover:underline"
              >
                hello@abtalks.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
