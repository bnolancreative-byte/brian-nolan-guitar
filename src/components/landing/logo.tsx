import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <a
      href="#top"
      aria-label={`${SITE.name}, back to top`}
      className={cn(
        "flex min-h-11 items-center rounded-md pr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        inverted ? "focus-visible:ring-offset-hero" : "focus-visible:ring-offset-background",
        className,
      )}
    >
      <span className="flex flex-col">
        <span
          className={cn(
            "font-display text-xl leading-none tracking-tight",
            inverted ? "text-hero-foreground" : "text-foreground",
          )}
        >
          {SITE.teacher}
        </span>
        <span
          className={cn(
            "mt-1 hidden text-[0.68rem] font-medium uppercase tracking-[0.14em] sm:block",
            inverted ? "text-hero-muted" : "text-muted-foreground",
          )}
        >
          Guitar · {SITE.region}
        </span>
      </span>
    </a>
  );
}
