import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <a
      href="#top"
      className={cn(
        "flex h-11 items-center gap-2.5 rounded-md pr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-sm",
          inverted ? "bg-hero-foreground text-hero" : "bg-foreground text-background",
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
          <path d="M12 2.2c1.7 0 5.6 4.6 5.6 10.2 0 4.2-2.4 7.4-5.6 7.4S6.4 16.6 6.4 12.4C6.4 6.8 10.3 2.2 12 2.2Z" />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-lg tracking-tight sm:text-xl",
          inverted ? "text-hero-foreground" : "text-foreground",
        )}
      >
        {SITE.name}
      </span>
    </a>
  );
}
