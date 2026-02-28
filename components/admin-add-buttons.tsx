"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useIsAdmin } from "@/lib/user-context";

export function AddEventButton() {
  const isAdmin = useIsAdmin();
  if (!isAdmin) return null;
  return (
    <Button asChild>
      <Link href="/admin/events">Add Event</Link>
    </Button>
  );
}

export function AddPodcastButton() {
  const isAdmin = useIsAdmin();
  if (!isAdmin) return null;
  return (
    <Button asChild>
      <Link href="/admin/podcasts">Add Podcast</Link>
    </Button>
  );
}

export function AddChallengeButton() {
  const isAdmin = useIsAdmin();
  if (!isAdmin) return null;
  return (
    <Button asChild>
      <Link href="/admin/challenges">Add Challenge</Link>
    </Button>
  );
}
