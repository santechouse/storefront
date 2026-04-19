# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

No test runner is configured.

## Environment Variables

Copy `.env` and set:
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` — Medusa API base URL
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` — Medusa storefront key
- `NEXT_PUBLIC_PAYLOAD_URL` — Payload CMS API URL
- `NEXT_PUBLIC_PAYLOAD_API_KEY` — Payload CMS API key
- `NEXT_PUBLIC_MEDUSA_DEFAULT_COUNTRY` — Default country code (`uz`)
- `REVALIDATE_SECRET` — Secret for ISR revalidation endpoint

## Architecture

**Stack**: Next.js 16 App Router · Medusa 2 (e-commerce backend) · Payload CMS (content) · shadcn/ui + Tailwind 4 · next-intl

### File Layout

- `src/app/[locale]/` — Route segments; locale is always first param
- `src/modules/` — Feature modules (account, cart, checkout, products, etc.), each with `components/` and `templates/`
- `src/lib/data/` — Server-side data functions and server actions (Medusa SDK calls)
- `src/lib/util/` — Pure utility functions (money formatting, price helpers, etc.)
- `src/components/ui/` — shadcn/ui primitives (generated; edit carefully)
- `src/i18n/` — next-intl routing and request config

### Path Aliases

- `@/*` → `src/*`
- `@lib/*` → `src/lib/*`
- `@modules/*` → `src/modules/*`

### Server vs. Client Components

Default to server components. Add `"use client"` only for interactivity (state, event handlers, browser APIs). All data fetching and mutations live in `src/lib/data/` as async server functions / server actions (`"use server"`).

### Data Fetching & Caching

All API calls go through the Medusa JS SDK (configured in `src/lib/config.ts`). Typical pattern:

```ts
const headers = {
  ...(await getAuthHeaders()),
  "x-medusa-locale": getLocale(locale),
};
const next = { ...(await getCacheOptions("products")) };
return sdk.client.fetch<T>("/store/products", { headers, next, cache: "force-cache" });
```

- Static data uses `cache: "force-cache"` with ISR tags; dynamic data (cart, customer) uses `cache: "no-cache"`.
- Cache is invalidated via `revalidateTag()` on mutations, and via the `/api/revalidate?tags=...&secret=...` endpoint for external webhooks.
- Each logged-in user has a unique `_medusa_cache_id` cookie used to namespace cache tags so their personalized data doesn't bleed across sessions.

### Authentication

Phone + password auth (`phonepass` strategy). JWT stored in `_medusa_jwt` httpOnly cookie. Helper functions in `src/lib/data/cookies.ts`: `getAuthHeaders()`, `setAuthToken()`, `removeAuthToken()`. On login, call `transferCart()` to merge the guest cart.

### Internationalization

Routes are prefixed with `[locale]`. Access locale via `const { locale } = await params` in server components. Use `getTranslations()` in server components and `useTranslations()` in client components (next-intl).

### Mutations

All writes (add to cart, update address, login, checkout) are Next.js server actions in `src/lib/data/`. They receive typed params, call the SDK, and call `revalidateTag()` to bust the relevant cache.

### Styling

Tailwind 4 with CSS variables (defined in `src/app/globals.css`). Use the `cn()` utility from `src/lib/utils.ts` to merge class names. Component variants use `class-variance-authority` (CVA). Dark mode is managed by `next-themes`.

### Payload CMS

Content (banners, featured brands) is fetched from Payload using a separate SDK client. Uses Bearer token from `NEXT_PUBLIC_PAYLOAD_API_KEY`. Types generated in `src/types/payload.ts`.
