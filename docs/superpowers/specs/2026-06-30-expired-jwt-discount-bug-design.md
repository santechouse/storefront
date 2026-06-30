# Fix: discounted prices silently disappear when JWT expires

## Problem

Customers in a discounted customer group sometimes see products without
their discount, even while still "logged in" in the UI. A hard refresh does
not fix it.

## Root cause

- `getAuthHeaders()` (`src/lib/data/cookies.ts`) only checks whether the
  `_medusa_jwt` cookie exists. It never checks whether the JWT inside it is
  still valid.
- The storefront sets `_medusa_jwt` with `maxAge: 60 * 60 * 24 * 7` (7 days),
  but Medusa issues JWTs with a 1-day expiry by default
  (`http.jwtExpiresIn = "1d"` in `@medusajs/framework/dist/config/config.js`).
  No override is set in `backend/medusa-config.ts`.
- Medusa's `/store/products` route allows unauthenticated access
  (`allowUnauthenticated: true`). Its auth middleware
  (`authenticate-middleware.js`) catches JWT verification failures
  (including `TokenExpiredError`) and silently returns `null` instead of
  rejecting the request — an expired token is indistinguishable from no
  token at all for this route.
- Medusa's pricing context only attaches the customer's groups
  `if (req.auth_context?.actor_id)`. With auth silently downgraded to
  anonymous, no customer groups are attached, so the discount price list
  never applies and Medusa returns default prices — with no error signal
  anywhere.
- The storefront's own `listProducts()` already does the right thing when it
  *knows* a request is authenticated (`cache: "no-store"` to bypass the
  Next.js Data Cache), so this is not a frontend caching bug. The stale
  cookie itself is the problem: it outlives the token it carries, and
  nothing in the storefront ever checks that.

## Fix

Detect client-side that the JWT has expired and treat the request as
logged out, rather than silently sending a dead token.

1. Add a small helper that decodes a JWT's payload (base64url decode only —
   no signature verification needed client-side, we only need the `exp`
   claim) and returns whether it's expired relative to the current time.
2. In `getAuthHeaders()` (`src/lib/data/cookies.ts`), after reading the
   `_medusa_jwt` cookie, check expiry before returning the `Authorization`
   header. If the token is missing, malformed, or expired, return `{}` (the
   existing "unauthenticated" shape).
3. When an expired token is detected, proactively clear it via the existing
   `removeAuthToken()` so the dead cookie doesn't linger and get rechecked
   on every request, and so the rest of the app's auth state (account menu,
   etc.) stays consistent with the user actually being logged out.
4. No changes needed at call sites. Every consumer of `getAuthHeaders()`
   (`listProducts`, `customer.ts`, cart/order/payment data functions, etc.)
   already branches on the presence/absence of the `authorization` key, so
   fixing the source of truth fixes all of them uniformly.

## Non-goals

- No silent token refresh (e.g. via Medusa's `/auth/token/refresh`
  endpoint). An expired session falls back to logged-out behavior (correct,
  non-discounted anonymous pricing) rather than transparently extending the
  session. Re-authenticating is the existing login flow — unchanged by this
  fix.
- No change to Medusa's default JWT expiry or to the storefront cookie's
  `maxAge`. The cookie can keep its 7-day lifetime; the new expiry check is
  what keeps behavior correct regardless of how long the cookie itself
  lives.

## Files touched

- `src/lib/data/cookies.ts` — add JWT expiry check inside `getAuthHeaders()`
  (and a small decode helper, inline or in a new `src/lib/util/jwt.ts`).

## Testing

No test runner is configured for this project. Verification will be manual:
log in, manually expire/replace the `_medusa_jwt` cookie with an
expired-but-valid-shaped JWT (or wait past the real 1-day expiry), and
confirm:
- `getAuthHeaders()` returns `{}` instead of a stale `Authorization` header.
- Product listings fall back to `force-cache` / anonymous pricing instead of
  silently sending a dead token.
- The stale cookie is cleared after the check runs.
