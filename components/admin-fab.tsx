"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Plus, FileCode, Calendar, CalendarDays, Mic2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsAdmin } from "@/lib/user-context";

const links = [
  { href: "/admin/problems", label: "Add Problem", icon: FileCode },
  { href: "/admin/challenges", label: "Add Challenge", icon: Calendar },
  { href: "/admin/events", label: "Add Event", icon: CalendarDays },
  { href: "/admin/podcasts", label: "Add Podcast", icon: Mic2 },
];

export function AdminFab() {
  const isAdmin = useIsAdmin();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  if (!isAdmin) return null;

  return (
    <div className="fixed right-6 top-6 z-50" ref={ref}>
      <div className="relative">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={() => setOpen((o) => !o)}
          aria-label="Admin add menu"
        >
          <Plus className="h-6 w-6" />
        </Button>
        {open && (
          <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-border bg-card py-1 shadow-lg">
            {links.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
