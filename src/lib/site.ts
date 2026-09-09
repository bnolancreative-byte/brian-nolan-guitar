export const SITE = {
  name: "Brian Nolan Guitar",
  title: "Brian Nolan Guitar — lessons and performance in New Haven County, CT",
  teacher: "Brian Nolan",
  region: "New Haven County, CT",
  towns: "North Haven and Wallingford",
  rooms: "Foolproof Brewing, Center Street Brewing, and Carcosa Lounge",
  url: "https://brian-nolan-guitar.vercel.app",
  description:
    "Private guitar lessons at $60 per hour, weekly, and live performance — solo voice and guitar, a six-piece band, or an intimate jazz group — in New Haven County, CT.",
  lessonRate: "$60",
  lessonCadence: "per hour, weekly",
  email: {
    address: "bnolancreative@gmail.com",
    href: "mailto:bnolancreative@gmail.com",
  },
  payment: {
    lessons: "Payment is due at each weekly lesson. Cash, Zelle, or Venmo — I send details when we confirm.",
    gigs: "I send a written quote first. A deposit reserves the date; the balance is due the night of the engagement. Cash, Zelle, or Venmo.",
  },
  instagram: {
    href: "https://www.instagram.com/bnolan.mp4/",
    label: "@bnolan.mp4",
    ariaLabel: "Follow Brian Nolan on Instagram (opens in a new tab)",
  },
  facebook: {
    href: "https://www.facebook.com/profile.php?id=61558041956278",
    label: "Brian Nolan Guitar",
    ariaLabel: "Follow Brian Nolan Guitar on Facebook (opens in a new tab)",
  },
  weekendUpdate: {
    href: "https://www.instagram.com/weekendupdatect/",
    label: "@weekendupdatect",
    ariaLabel: "Follow Weekend Update on Instagram (opens in a new tab)",
  },
} as const;

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.teacher,
  url: SITE.url,
  image: `${SITE.url}/og.jpg`,
  jobTitle: "Guitarist, vocalist, and guitar instructor",
  description: SITE.description,
  address: {
    "@type": "AdministrativeArea",
    name: SITE.region,
  },
  sameAs: [SITE.instagram.href, SITE.facebook.href, SITE.weekendUpdate.href],
};
