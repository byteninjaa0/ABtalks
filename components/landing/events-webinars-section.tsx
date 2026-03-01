"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export interface EventPreview {
  id: string;
  title: string;
  description: string;
  /** Pre-formatted date string (e.g. "Mar 22, 2025") to avoid server/client locale mismatch */
  dateFormatted: string;
  time: string;
  location: string;
  guestName: string;
  guestBio: string;
  guestImage: string;
  outcomes: string[];
}

export function EventsWebinarsSection({
  events,
}: {
  events: EventPreview[];
}) {
  return (
    <section
      id="events"
      className="border-t border-slate-800/60 px-4 py-20 md:py-24"
      aria-labelledby="events-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="events-heading"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="text-center text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl"
        >
          Learn From People Who&apos;ve Walked the Path.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mx-auto mt-4 max-w-2xl text-center text-slate-400"
        >
          Webinars and live sessions with industry professionals.
        </motion.p>

        <div className="mt-14">
          {events.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/40 px-6 py-12 text-center"
            >
              <p className="text-slate-400">
                No upcoming events yet. Check back soon for the next live
                session.
              </p>
              <Button variant="outline" className="mt-4 rounded-xl" asChild>
                <Link href="/events">View events</Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                >
                  <Card className="flex h-full flex-col overflow-hidden border-slate-800/80 bg-slate-900/40 transition-all duration-300 rounded-2xl hover:border-slate-700/80 hover:bg-slate-900/60 hover:shadow-xl">
                    <div className="relative h-40 w-full bg-slate-800">
                      {event.guestImage ? (
                        <img
                          src={event.guestImage}
                          alt={event.guestName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-500">
                          <span className="text-4xl font-bold text-slate-600">
                            {event.guestName.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    </div>
                    <CardHeader className="pb-2">
                      <h3 className="line-clamp-2 text-lg font-semibold text-slate-100">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{event.dateFormatted}</span>
                        <span>·</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{event.location}</span>
                      </div>
                      <p className="text-sm text-slate-400">{event.guestBio}</p>
                    </CardHeader>
                    <CardContent className="mt-auto space-y-3 pt-0">
                      {event.outcomes.length > 0 && (
                        <ul className="space-y-1 text-xs text-slate-500">
                          {event.outcomes.slice(0, 3).map((outcome) => (
                            <li key={outcome} className="flex items-start gap-2">
                              <span className="text-violet-400">→</span>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Button
                        size="sm"
                        className="w-full rounded-xl"
                        asChild
                      >
                        <Link href={`/events/${event.id}`}>Register</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {events.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Button variant="outline" className="rounded-xl" asChild>
              <Link href="/events">View all events</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
