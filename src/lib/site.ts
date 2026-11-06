export const SITE = {
  name: "Brian Nolan Guitar",
  title: "Brian Nolan Guitar — lessons and performance in New Haven County, CT",
  teacher: "Brian Nolan",
  region: "New Haven County, CT",
  towns: "North Haven and Wallingford",
  rooms: "Foolproof Brewing, Center Street Brewing, and Carcosa Lounge",
  url: "https://brian-nolan-guitar.vercel.app",
  description:
    "Guitar lessons at $60 an hour, weekly, plus solo gigs, a six-piece band, and a small jazz group in New Haven County, CT.",
  lessonRate: "$60",
  lessonCadence: "per hour, weekly",
  email: {
    address: "bnolancreative@gmail.com",
    href: "mailto:bnolancreative@gmail.com",
  },
  payment: {
    lessons: "Pay at each lesson. Cash, Zelle, or Venmo. I’ll send details when we set the time.",
    gigs: "I’ll send a quote first. A deposit holds the date. The rest is due the night of the gig. Cash, Zelle, or Venmo.",
  },
  travel: "I play within about 60 miles of Wallingford.",
  sound: "I bring my own PA.",
  cancel: {
    lessons:
      "Give me 24 hours if you need to move or cancel a lesson. Inside 24 hours, or if you miss the hour, I charge the $60.",
    gigs: "The deposit holds the date. Cancel 14 days or more ahead and I refund the deposit. Inside 14 days, I keep it. If I have to cancel, you get the deposit back.",
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
  jobTitle: "Guitarist and guitar teacher",
  description: SITE.description,
  address: {
    "@type": "AdministrativeArea",
    name: SITE.region,
  },
  makesOffer: {
    "@type": "Offer",
    name: "Weekly guitar lesson",
    price: "60",
    priceCurrency: "USD",
    description: "60-minute private guitar lesson, billed weekly.",
  },
  sameAs: [SITE.instagram.href, SITE.facebook.href, SITE.weekendUpdate.href],
};
