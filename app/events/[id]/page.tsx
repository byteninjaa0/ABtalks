import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { EventRegistrationForm } from "@/components/event-registration-form";
import { Button } from "@/components/ui/button";

type Props = {
  params: { id: string };
};

export const dynamic = "force-dynamic";

export default async function EventDetailPage({ params }: Props) {
  const [event, user] = await Promise.all([
    prisma.event.findUnique({
      where: { id: params.id },
    }),
    getCurrentUser(),
  ]);

  if (!event) {
    return notFound();
  }

  let alreadyRegistered = false;
  if (user) {
    const registration = await prisma.eventRegistration.findUnique({
      where: {
        eventId_userId: {
          eventId: event.id,
          userId: user.id,
        },
      },
    });
    alreadyRegistered = Boolean(registration);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-10 md:py-12">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            ABTalks event
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {event.title}
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            {event.description}
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-[2fr,1.4fr] md:items-start">
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-4 text-sm">
              <h2 className="mb-2 text-sm font-semibold">Session details</h2>
              <dl className="grid gap-3 text-xs md:text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Date</dt>
                  <dd>
                    {new Date(event.date).toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Time</dt>
                  <dd>{event.time}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Location</dt>
                  <dd>{event.location}</dd>
                </div>
              </dl>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-semibold md:text-base">
                What you&apos;ll walk away with
              </h2>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {event.outcomes.map((outcome, idx) => (
                  <li key={idx}>{outcome}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="flex items-center gap-4 rounded-lg border bg-card p-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-muted">
                <Image
                  src={event.guestImage}
                  alt={event.guestName}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold">{event.guestName}</p>
                <p className="text-xs text-muted-foreground">{event.guestBio}</p>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Register</h2>
                {!user && (
                  <Button variant="ghost" size="xs" asChild>
                    <a href="/login">Sign in</a>
                  </Button>
                )}
              </div>
              <EventRegistrationForm
                eventId={event.id}
                isLoggedIn={Boolean(user)}
                defaultName={user?.name ?? null}
                defaultEmail={user?.email ?? null}
                alreadyRegistered={alreadyRegistered}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

