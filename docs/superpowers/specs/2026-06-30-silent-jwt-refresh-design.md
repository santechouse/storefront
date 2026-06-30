# Silent JWT refresh to avoid forced re-login

## Problem

The fix in `2026-06-30-expired-jwt-discount-bug-design.md` stops the
storefront from sending a dead `Authorization` header once the `_medusa_jwt`
JWT expires, which correctly restores anonymous pricing instead of silently
losing the customer's discount. But its side effect is a hard logout: the
moment the token is detected as expired, the cookie is cleared and the
customer has to manually log back in to regain their discounted pricing,
even though they never explicitly logged out.

This supersedes that spec's "No silent token refresh" non-goal. We now want
sessions to renew themselves transparently whenever possible, so a customer
who is actively browsing never gets logged out just because their token's
`exp` passed while they were on the site.

## Constraint that shapes the design

Medusa's JS SDK exposes `sdk.auth.refresh()`, which calls
`POST /auth/token/refresh`. Per Medusa core's implementation, this endpoint
re-signs a **new** JWT using the Bearer token already present in the
request's Authorization header — it validates the existing token and issues
one with an extended `exp`. It is not a separate, longer-lived refresh
token grant.

This means refresh only works while the current token is **still valid**.
Once a token has actually expired, Medusa has nothing to validate and the
refresh call fails — there is no mechanism in this `phonepass` (phone +
password) auth setup to revive a fully expired session without the
customer's password, and the password is never persisted anywhere (confirmed
in `src/lib/data/customer.ts`: it's read transiently from `FormData` inside
the `login`/`signup` server actions and never written to a cookie or store).

So the design has two distinct cases:
- **Expiring soon, not yet expired** → refresh silently, no user impact.
- **Already expired** → cannot be silently recovered. Same fallback as the
  existing fix: clear the cookie, return anonymous/public pricing. No
  re-login prompt — same as today's already-implemented behavior.

## Design

Extend `src/lib/util/jwt.ts` and `getAuthHeaders()`
(`src/lib/data/cookies.ts`):

1. Add `isJwtExpiringSoon(token: string, thresholdSeconds: number): boolean`
   to `src/lib/util/jwt.ts`. Returns `true` if the token decodes cleanly,
   has a numeric `exp`, and `exp` is still in the future but within
   `thresholdSeconds` of now. Returns `false` if the token is already
   expired (that case is handled separately by the existing
   `isJwtExpired`), malformed, or not yet within the threshold.

2. In `getAuthHeaders()`:
   - If `isJwtExpired(token)` → unchanged: `removeAuthToken()`, return `{}`.
   - Else if `isJwtExpiringSoon(token, 5 * 60)` → call `sdk.auth.refresh()`
     with the current token as the Bearer header. On success, persist the
     new token via `setAuthToken()` and return
     `{ authorization: \`Bearer ${newToken}\` }`. On failure (network error,
     Medusa rejects the refresh), fall back exactly like the
     already-expired case: `removeAuthToken()`, return `{}`.
   - Else (valid, not expiring soon) → unchanged: return the existing
     `Authorization` header.

3. Threshold: 5 minutes. Large enough that a refresh reliably completes
   before the token actually expires given normal request latency, small
   enough that the refresh endpoint isn't called on every request for hours
   before expiry. Self-limiting: once refreshed, the new token's `exp` is
   pushed forward by Medusa's configured JWT lifetime, so subsequent
   requests fall outside the "expiring soon" window again until close to
   the new expiry.

4. No call-site changes. `getAuthHeaders()` keeps its existing signature and
   return shape (`Promise<{ authorization: string } | {}>`). Every consumer
   already branches only on the presence/absence of the `authorization` key,
   so the refresh is fully transparent to the rest of the app.

## Non-goals

- No change to Medusa's default JWT expiry (`1d`) or the storefront cookie's
  `maxAge` (7 days) — refreshing keeps the existing token lifetimes as the
  source of truth; this design works within them.
- No re-login prompt or banner on refresh failure. An already-expired token
  that can't be refreshed falls back to anonymous/public pricing exactly as
  the prior fix does today — consistent, no new UI surface.
- No new refresh-token cookie or storage. Medusa's `phonepass` setup has no
  separate refresh token; `sdk.auth.refresh()` operates on the existing
  access token in place.
- No middleware-based refresh on navigation. The check stays centralized
  inside `getAuthHeaders()`, matching the existing architecture and
  avoiding a second code path that could refresh independently (and
  possibly redundantly) of the data-fetching calls that actually need the
  header.

## Files touched

- `src/lib/util/jwt.ts` — add `isJwtExpiringSoon`.
- `src/lib/data/cookies.ts` — call `sdk.auth.refresh()` inside
  `getAuthHeaders()` when the token is expiring soon, persisting the
  refreshed token via the existing `setAuthToken()`.

## Testing

No test runner is configured for this project. Verification will be manual:

- Craft a token whose `exp` is within the 5-minute threshold (but still in
  the future) using the same manual JWT-construction approach as the prior
  fix's verification, set it as `_medusa_jwt`, and confirm a request
  triggers `sdk.auth.refresh()`, the cookie is replaced with a new token
  that has a later `exp`, and the response still carries discounted
  pricing.
- Confirm a token with `exp` far in the future (outside the threshold) does
  not trigger a refresh call (no unnecessary refresh traffic).
- Confirm an already-expired token still falls back to anonymous pricing
  with the cookie cleared, unchanged from the prior fix's behavior.
- Confirm a refresh call that fails (e.g. point at an invalid backend URL
  temporarily, or use a token Medusa rejects) falls back to the same
  cleared-cookie/anonymous behavior rather than throwing.
