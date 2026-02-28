import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "About – ABTalks",
  description: "About ABTalks 60-day industry coding challenge for SE, ML and AI.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12 text-foreground">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">About ABTalks</h1>
        <div className="prose prose-invert max-w-none space-y-4 text-sm">
          <p>
            ABTalks runs a structured 60-day coding challenge to help you build
            industry-ready skills in Software Engineering, Machine Learning,
            and Artificial Intelligence. Each day unlocks one challenge
            tailored to your chosen domain.
          </p>
          <p>
            The platform includes practice problems, events and webinars, and
            podcasts so you can learn from real engineers and hiring managers.
            Track your streak, completion and progress on your dashboard.
          </p>
          <p>
            Whether you&apos;re preparing for interviews or levelling up your
            skills, the 60-day engine is designed to keep you consistent and
            accountable.
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
