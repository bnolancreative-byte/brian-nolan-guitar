import { Facebook, Instagram, Mail } from "lucide-react";
import { Logo } from "@/components/landing/logo";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "#lessons", label: "Lessons" },
  { href: "#gigs", label: "Gigs" },
  { href: "#pricing", label: "Pricing" },
  { href: "/#book-lesson", label: "Book" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            {SITE.teacher} — guitarist, vocalist, and private instructor in{" "}
            {SITE.region}. Lessons at $60 per hour, weekly.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            <a
              href={SITE.email.href}
              className="inline-flex h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Mail className="size-4" aria-hidden="true" />
              Email me
            </a>
            <a
              href={SITE.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SITE.instagram.ariaLabel}
              className="inline-flex h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Instagram className="size-4" aria-hidden="true" />
              {SITE.instagram.label}
            </a>
            <a
              href={SITE.facebook.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SITE.facebook.ariaLabel}
              className="inline-flex h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <p>New Haven County · Lessons and live dates</p>
        </div>
      </div>
    </footer>
  );
}
