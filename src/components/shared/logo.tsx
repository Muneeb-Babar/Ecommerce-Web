"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";

export function Logo({
  className,
  showBadge = true,
}: {
  className?: string;
  showBadge?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      aria-label={`${SITE_NAME} home`}
    >
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary via-accent to-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-500 group-hover:rotate-[8deg]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
          aria-hidden="true"
        >
          <path d="M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-4Z" />
          <path d="m8.5 12 2.5 2.5 4.5-5" />
        </svg>
      </span>
      <span className="text-xl font-bold tracking-tight text-foreground">
        {SITE_NAME}
        {showBadge && (
          <span className="ml-1.5 hidden rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:inline-block">
            Store
          </span>
        )}
      </span>
    </Link>
  );
}