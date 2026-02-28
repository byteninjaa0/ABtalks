import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Contact – ABTalks",
  description: "Contact ABTalks for support and inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12 text-foreground">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Contact</h1>
        <div className="prose prose-invert max-w-none space-y-4 text-sm">
          <p>
            For support, partnership or general inquiries about the ABTalks
            60-day challenge, please reach out via the email or contact method
            listed on the main site or in your account area.
          </p>
          <p>
            If you have questions about your account, progress or events, log in
            and check the dashboard and profile sections first.
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
