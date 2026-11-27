// TODO(brian): No phone number or street address is in the repo — do not invent either.
// TODO(brian): Confirm Lowlight Collective is still the name of the jazz trio/duo.
// TODO(brian): No acoustic performance photo is in the repo. The solo card uses an existing portrait.
// TODO(brian): Booking email delivery is unconfirmed. The form falls back to a mailto draft.

export const SITE = {
  name: "Brian Nolan Guitar",
  title: "North Haven & Wallingford Guitar Lessons | Brian Nolan",
  teacher: "Brian Nolan",
  region: "New Haven County, CT",
  regionLong: "New Haven County, Connecticut",
  towns: "North Haven and Wallingford",
  rooms: "Foolproof Brewing, Center Street Brewing, and Carcosa Lounge",
  school: "School of Rock North Haven",
  url: "https://brian-nolan-guitar.vercel.app",
  description:
    "Guitar lessons in North Haven and Wallingford, New Haven County, CT. $60 an hour, weekly, in person or online. Book Weekend Update, jazz, or solo acoustic.",
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

export const LIVE_ACTS = [
  {
    id: "weekend-update",
    title: "Weekend Update",
    kicker: "Pop cover band",
    formHint: "Trio to 6-piece",
    emailLabel: "Weekend Update — pop covers, trio to 6-piece",
    cta: "Book Weekend Update",
    body: "I lead this pop cover band. We can play as a trio or build up to a 6-piece. Breweries, halls, and private events.",
    points: ["Pop covers", "Trio up to a 6-piece", "Breweries, halls, and private events"],
    notesPlaceholder: "Brewery, hall, or private event",
    src: "/images/brian-outdoor.jpg",
    alt: "Brian Nolan playing electric guitar on an outdoor stage beside a speaker",
    follow: SITE.weekendUpdate,
  },
  {
    id: "lowlight",
    title: "Lowlight Collective",
    kicker: "Jazz trio or duo",
    formHint: "Guitar and vocals, or two guitars and vocals",
    emailLabel: "Lowlight Collective — jazz trio or duo",
    cta: "Book the jazz act",
    body: "I lead this jazz trio or duo. Guitar and vocals, or two guitars and vocals — jazz and blues. Cafes, speakeasies, and listening rooms.",
    points: ["Trio or duo", "Guitar and vocals", "Two guitars and vocals", "Jazz and blues"],
    notesPlaceholder: "Cafe, listening room, or private dinner",
    src: "/images/brian-jazz.jpg",
    alt: "Brian Nolan playing guitar beside a microphone in front of a gold curtain",
    follow: null,
  },
  {
    id: "solo",
    title: "Solo acoustic",
    kicker: "I sing and play",
    formHint: "Acoustic guitar and vocals",
    emailLabel: "Solo acoustic",
    cta: "Book solo acoustic",
    body: "I sing and play acoustic guitar. Jazz, popular songs, and requests. Good for dinners, receptions, and private events.",
    points: [
      "Acoustic guitar and vocals",
      "Jazz, popular songs, and requests",
      "Dinners, receptions, and private events",
    ],
    notesPlaceholder: "Dinner, reception, or private event",
    src: "/images/brian-portrait.jpg",
    alt: "Brian Nolan in a black blazer and checkered shirt, holding a dark electric guitar",
    follow: null,
  },
] as const;

export type LiveActId = (typeof LIVE_ACTS)[number]["id"];

export function bookLessonHref() {
  return "/?book=lesson#book-lesson";
}

export function bookGigHref(act?: LiveActId) {
  return act ? `/?book=gig&act=${act}#book-gig` : "/?book=gig#book-gig";
}

const lessonOfferDescription =
  "60-minute private guitar lesson, once a week. In person in North Haven or Wallingford, including School of Rock North Haven, or live online.";

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE.url}/#brian-nolan`,
      name: SITE.teacher,
      url: SITE.url,
      image: `${SITE.url}/og.jpg`,
      jobTitle: "Guitarist and guitar teacher",
      email: SITE.email.address,
      description: SITE.description,
      homeLocation: {
        "@type": "AdministrativeArea",
        name: SITE.regionLong,
      },
      sameAs: [SITE.instagram.href, SITE.facebook.href],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
      image: `${SITE.url}/og.jpg`,
      description:
        "Private guitar lessons in North Haven and Wallingford, New Haven County, Connecticut, including at School of Rock North Haven, and online. Lessons are $60 an hour, weekly. Live music: Weekend Update (a pop cover band from a trio to a 6-piece), a jazz trio or duo, and solo acoustic.",
      email: SITE.email.address,
      founder: { "@id": `${SITE.url}/#brian-nolan` },
      paymentAccepted: "Cash, Zelle, Venmo",
      areaServed: [
        { "@type": "AdministrativeArea", name: "New Haven County, Connecticut" },
        { "@type": "City", name: "North Haven, Connecticut" },
        { "@type": "City", name: "Wallingford, Connecticut" },
      ],
      address: {
        "@type": "PostalAddress",
        addressRegion: "CT",
        addressCountry: "US",
      },
      makesOffer: {
        "@type": "Offer",
        name: "Weekly private guitar lesson",
        price: "60",
        priceCurrency: "USD",
        description: lessonOfferDescription,
      },
      sameAs: [SITE.instagram.href, SITE.facebook.href, SITE.weekendUpdate.href],
    },
  ],
};
