"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  eventId: string;
  isLoggedIn: boolean;
  defaultName?: string | null;
  defaultEmail?: string | null;
  alreadyRegistered: boolean;
};

export function EventRegistrationForm({
  eventId,
  isLoggedIn,
  defaultName,
  defaultEmail,
  alreadyRegistered,
}: Props) {
  const router = useRouter();
  const [name, setName] = useState(defaultName ?? "");
  const [email, setEmail] = useState(defaultEmail ?? "");
  const [collegeOrCompany, setCollegeOrCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoggedIn) {
      setError("Please sign in to register for this event.");
      return;
    }
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, collegeOrCompany }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }
      setSuccess("You are registered for this event.");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="rounded-lg border border-dashed border-slate-700 bg-slate-900/40 p-4 text-sm text-slate-300">
        <p className="mb-2 font-medium text-slate-100">
          Sign in to register for this event
        </p>
        <p className="text-xs text-slate-400">
          You&apos;ll be able to use your ABTalks profile so we can send you
          calendar invites, reminders, and post-event resources.
        </p>
      </div>
    );
  }

  if (alreadyRegistered) {
    return (
      <div className="rounded-lg border border-emerald-600/60 bg-emerald-950/40 p-4 text-sm text-emerald-100">
        <p className="font-medium">You&apos;re already registered.</p>
        <p className="mt-1 text-xs text-emerald-200">
          Check your inbox for confirmation and event details. We&apos;ll also
          send reminders as the event gets closer.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-xs text-red-400">{error}</p>}
      {success && <p className="text-xs text-emerald-300">{success}</p>}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="collegeOrCompany">College / Company</Label>
        <Input
          id="collegeOrCompany"
          value={collegeOrCompany}
          onChange={(e) => setCollegeOrCompany(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Registering…" : "Register for event"}
      </Button>
    </form>
  );
}

