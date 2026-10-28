import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "light" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 hover:-translate-y-0.5";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-gold-500 text-forest-950 hover:bg-gold-400 hover:shadow-[0_20px_40px_-20px_rgba(200,137,58,0.9)]",
  outline:
    "border border-forest-700/40 text-forest-900 hover:bg-forest-900 hover:text-sand-50 hover:border-forest-900",
  light: "bg-white text-forest-900 hover:bg-sand-100 hover:shadow-[0_20px_40px_-20px_rgba(16,26,19,0.4)]",
  ghost: "text-current hover:bg-current/10",
};

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  target,
  rel,
  ...props
}: CommonProps & { href: string; target?: string; rel?: string } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
>) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      <span className="relative z-10 inline-flex overflow-hidden leading-none">
        <span className="relative flex flex-col">
          <span className="transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:-translate-y-full">
            {children}
          </span>
          <span
            aria-hidden="true"
            className="absolute left-0 top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:-translate-y-full"
          >
            {children}
          </span>
        </span>
      </span>
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </button>
  );
}
