"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavRollingLinkProps {
  href: string;
  label: string;
  className?: string;
  isActive?: boolean;
}

export function NavRollingLink({
  href,
  label,
  className,
  isActive = false,
}: NavRollingLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn("group/nav-rolling relative inline-flex overflow-hidden leading-none", className)}
    >
      <span className="relative flex flex-col">
        <span
          className={cn(
            "transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover/nav-rolling:-translate-y-full",
          )}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-0 top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover/nav-rolling:-translate-y-full",
          )}
        >
          {label}
        </span>
      </span>
    </Link>
  );
}
