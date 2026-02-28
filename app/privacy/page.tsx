import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Privacy Policy – ABTalks",
  description: "Privacy Policy for ABTalks 60-day coding challenge platform.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12 text-foreground">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="prose prose-invert max-w-none space-y-4 text-sm">
          <p>
            ABTalks collects information you provide when registering (name,
            email, password, selected domain) and when using the platform
            (progress, submissions, event registrations). We use this to run the
            60-day challenge, show your dashboard and streaks, and communicate
            about events.
          </p>
          <p>
            Passwords are hashed; we do not store plain-text passwords. We use
            secure, HTTP-only cookies for authentication. Data is stored on
            secure servers and we do not sell your personal information.
          </p>
          <p>
            You may request access to or deletion of your data by contacting
            us. For full details and contact information, see our contact page.
          </p>
        </div>
        <p className="mt-8">
          <Link href="/" className="text-primary hover:underline">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
