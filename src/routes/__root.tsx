import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Toaster } from "sonner";
import { SITE, jsonLd } from "@/lib/site";
import appCss from "../styles.css?url";

const OG_IMAGE = `${SITE.url}/og.jpg`;
const OG_ALT = "Brian Nolan holding a butterscotch Telecaster — Brian Nolan Guitar, jazz lessons and live dates in New Haven County, CT";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE.name },
      { name: "description", content: SITE.description },
      { name: "theme-color", content: "#0e0d0c" },
      { name: "author", content: SITE.teacher },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:title", content: SITE.name },
      { property: "og:description", content: SITE.description },
      { property: "og:url", content: SITE.url },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:alt", content: OG_ALT },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE.name },
      { name: "twitter:description", content: SITE.description },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: OG_ALT },
    ],
    links: [
      { rel: "canonical", href: SITE.url },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preload", as: "image", href: "/images/brian-hero.jpg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh bg-background font-sans text-foreground">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Toaster
          theme="light"
          position="bottom-center"
          toastOptions={{
            className: "!bg-card !text-foreground !border-border font-sans",
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}
