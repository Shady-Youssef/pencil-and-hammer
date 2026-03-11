# MBM Designs Studio

Next.js 16 application for the MBM Designs studio site and upcoming client/dashboard workflows.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Supabase

## Local development

```sh
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create `.env.local` from `.env.example` and provide the required values:

```sh
cp .env.example .env.local
```

Current app integrations expect:

- `NEXT_PUBLIC_SITE_URL`
- `SUPABASE_PROJECT_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run test`

## Notes

- Production build currently runs through `next build --webpack` because the local sandbox environment here crashes on Turbopack production builds.
- Supabase browser/server clients and middleware are already wired in for future auth and data work.
