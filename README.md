# Brian Nolan Guitar

Personal booking site for jazz guitar lessons and live dates in New Haven County, CT.

- Lessons: **$60 per hour, weekly**
- Gigs: Weekend Update (pop covers, trio to 6-piece), Lowlight Collective (jazz trio or duo), solo acoustic

## Deploy on Vercel

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com/new), import the repo.
3. Framework: Vite. Build command: `npm run build`. Leave the output directory blank (Nitro writes `.vercel/output`).
4. Deploy. You get a `*.vercel.app` URL. Add `briannolanguitar.com` later under Project → Settings → Domains.

Booking requests save in the visitor’s browser. The form also tries to email them and, if that fails, opens a draft to bnolancreative@gmail.com. Confirm that messages arrive before relying on the form.
