# SantecHouse Design System

## Product Context

Uzbek pharmacy/healthcare e-commerce storefront. Primary user: mobile shopper buying medical supplies or wellness products. Trust and clarity are the core requirements — clinical enough to feel reliable, warm enough to not feel sterile.

## Direction & Feel

**Modern apothecary.** Clean whites, teal brand accent, minimal shadows. Not bold, not playful — measured confidence. The kind of app where your loyalty balance feels valuable, not like a footnote.

---

## Palette

**Brand:** `#39aaaa` (teal, light) / `#00ffff` (cyan, dark) — healthcare trust without cold hospital blue.

**Surfaces (light):**
- Page: `oklch(1 0 0)` — white
- Secondary/group rows: `bg-muted/50` or `bg-secondary`
- Loyalty/accent surface: `bg-primary/5` with `border border-primary/20`
- Muted: `oklch(0.97 0 0)`

**Surfaces (dark):**
- Page: `oklch(0.2003 0.0259 263.72)` — deep blue-gray
- Secondary: `#282e39` — dark slate
- Brand: `#00ffff`

**Text hierarchy:**
- Primary: `text-foreground`
- Secondary: `text-muted-foreground`
- Labels/section headers: `text-xs font-medium uppercase tracking-wider text-muted-foreground`
- Danger: `text-rose-500`

**Semantic:** Destructive = `oklch(0.577 0.245 27.325)` (red). Success/cashback = teal primary.

---

## Depth Strategy

**Borders only** — no box shadows on interactive elements. `shadow-sm` permitted on floating surfaces (cards, dropdowns).

- Standard border: `border border-border`
- Section group: `rounded-2xl border border-border overflow-hidden divide-y divide-border`
- Accent surface: `bg-primary/5 border border-primary/20`
- Focus rings: `ring-ring/50 ring-[3px]`

---

## Spacing

Base unit: **4px (Tailwind 1)**. Scale: `gap-3` micro, `gap-4` component, `gap-5/6` section, `gap-8/12` major.

Row padding: `px-4 py-3.5` for all settings/list rows.
Section label margin: `pt-5 pb-1.5` above each group.
Card inner: `px-5 py-4`.

---

## Border Radius

- `rounded-md` (8px) — inputs, small buttons
- `rounded-xl` (14px) — cards, dropdowns, badges
- `rounded-2xl` (18px) — section groups, loyalty card
- `rounded-full` — avatar circles, pill badges

---

## Typography

Font: **Geist Sans** (system: `var(--font-geist-sans)`).

- Avatar initial: `text-2xl font-bold text-primary`
- Page heading / name: `text-lg font-semibold`
- Section label: `text-xs font-medium uppercase tracking-wider text-muted-foreground`
- Row label: `text-sm font-medium`
- Metadata / phone / secondary: `text-sm text-muted-foreground`
- Balance / data: `text-2xl font-bold tabular-nums`
- Tight headings (checkout, forms): `tracking-[-0.033em]`

---

## Component Patterns

### Avatar Circle
```tsx
<div className="size-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
  <span className="text-2xl font-bold text-primary leading-none">{initials}</span>
</div>
```

### Loyalty / Accent Card
```tsx
<div className="rounded-2xl bg-primary/5 border border-primary/20 px-5 py-4 flex items-center justify-between">
  <div className="flex flex-col gap-0.5">
    <span className="text-xs font-medium uppercase tracking-wider text-primary/70">{label}</span>
    <span className="text-2xl font-bold tabular-nums text-foreground">{value}</span>
  </div>
  {/* icon container */}
  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
    {icon}
  </div>
</div>
```

### Section Group (settings list)
```tsx
<div className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
  {/* rows */}
</div>
```

### Section Label
```tsx
<div className="px-4 pt-5 pb-1.5">
  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
</div>
```

### Settings Row
```tsx
<div
  onClick={onClick}
  className="flex items-center justify-between px-4 py-3.5 cursor-pointer active:bg-muted/60 transition-colors"
>
  <div className="flex items-center gap-3">
    <span className="opacity-70">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </div>
  <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 opacity-40" />
</div>
```

### Danger Row
Add `text-rose-500` to the row container. On active: `active:bg-rose-50 dark:active:bg-rose-950/20`.

---

## Icons

Two sets in use:
- **HugeIcons** (`@hugeicons/react`) — primary set for UI icons
- **Lucide React** — secondary/legacy

Always wrap standalone icons with `opacity-70` in rows. Icon size: `size-5` in rows, `size-4` for trailing chevrons.

---

## Interaction States

- Tap/click: `active:bg-muted/60 transition-colors`
- Focus: `focus-visible:border-ring focus-visible:ring-ring/50 ring-[3px]`
- Disabled: `opacity-50 pointer-events-none`
- Danger hover: `active:bg-rose-50 dark:active:bg-rose-950/20`

---

## Dark Mode Notes

Dark background is blue-gray (`oklch(0.2003 0.0259 263.72)`), not pure black. Primary shifts to `#00ffff` (full-saturation cyan). Borders are `oklch(1 0 0 / 10%)` — semi-transparent white. Use `dark:` variants for danger states.
