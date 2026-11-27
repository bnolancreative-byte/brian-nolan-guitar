import { Facebook, Instagram, Mail } from "lucide-react";
import { Logo } from "@/components/landing/logo";
import { SITE, bookLessonHref } from "@/lib/site";

const LINKS = [
  { href: "#lessons", label: "Lessons" },
  { href: "#gigs", label: "Live" },
  { href: "#pricing", label: "Pricing" },
  { href: "#questions", label: "Questions" },
  { href: "#contact", label: "Contact" },
  { href: bookLessonHref(), label: "Book lessons" },
];

const socialClass =
  "inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            I teach guitar and play around {SITE.region}. Lessons are {SITE.lessonRate} an hour,
            weekly.
          </p>
          <div className="mt-4 flex flex-col items-start gap-1">
            <a href={SITE.email.href} className={socialClass}>
              <Mail className="size-4" aria-hidden="true" />
              {SITE.email.address}
            </a>
            <a
              href={SITE.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SITE.instagram.ariaLabel}
              className={socialClass}
            >
              <Instagram className="size-4" aria-hidden="true" />
              {SITE.instagram.label}
            </a>
            <a
              href={SITE.facebook.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SITE.facebook.ariaLabel}
              className={socialClass}
            >
              <Facebook className="size-4" aria-hidden="true" />
              {SITE.facebook.label}
            </a>
          </div>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex h-11 items-center text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 pb-28 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 md:pb-6">
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <p>New Haven County, Connecticut · Lessons and gigs</p>
        </div>
      </div>
    </footer>
  );
}
