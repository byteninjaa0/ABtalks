import Link from "next/link";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Events &amp; Webinars
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
              Live breakdowns, office hours and webinars that sit on top of the
              60-day challenge. Learn how real engineers think about the same
              problems you&apos;re solving.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">Back to landing</Link>
          </Button>
        </div>

        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No events have been scheduled yet. New webinars will appear here as
            soon as they go live.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {events.map((event) => (
              <Card key={event.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="mt-1 text-xs md:text-sm">
                    {new Date(event.date).toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {event.time}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between space-y-3">
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{event.guestName}</span>
                    <span className="rounded-full border border-border px-2 py-0.5">
                      {event.location}
                    </span>
                  </div>
                  <div className="mt-3">
                    <Button size="sm" asChild>
                      <Link href={`/events/${event.id}`}>View details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

