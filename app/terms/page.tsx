import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Terms of Service – ABTalks",
  description: "Terms of Service for ABTalks 60-day coding challenge platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12 text-foreground">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Terms of Service</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="prose prose-invert max-w-none space-y-4 text-sm">
          <p>
            Welcome to ABTalks. By using this platform you agree to these terms.
            Use the 60-day challenge, problems, events and podcasts in line with
            our policies and for learning purposes only.
          </p>
          <p>
            Do not share account credentials, attempt to circumvent access
            controls, or use the service for any illegal or abusive purpose.
            We reserve the right to suspend or terminate accounts that violate
            these terms.
          </p>
          <p>
            Content you submit (e.g. code) may be stored for evaluation and
            progress tracking. We do not claim ownership of your code.
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
