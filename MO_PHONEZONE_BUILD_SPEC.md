# Mo PhoneZone: Website Build Specification

**For:** Antigravity (Gemini) as the implementing AI
**Project:** Demo website for Mo PhoneZone, a mobile phone shop in Semiliguda, Koraput, Odisha, India
**Built by:** Kalki Studio (freelance web developer, pitching this as a free demo to win the client)
**Scope of this task:** a working **public website + a demo admin panel**. Front-end only. No real backend yet.

---

## 0. How to read this document (instructions to the AI)

1. This file is the **single source of truth**. Read all of it before writing any code.
2. If two parts of this file seem to conflict, follow this priority order:
   **Fact Sheet (section 3) > Rules (section 1) > Design Tokens (section 5) > Component Specs (section 6) > Page Specs (section 8) > Copy Deck (section 10) > your own judgment.**
3. If something is **not specified here**, do not invent it. Pick the simplest option that follows the design rules, and list the decision in `DECISIONS.md` (see section 15).
4. Work in the milestones from section 15, in order. After each milestone, run the app and check it in the browser at **360 x 800** (phone) and **1280 x 800** (desktop) before moving on.
5. When finished, walk through the **Acceptance Checklist** (section 16) line by line and report what passes and what does not. Do not claim something passes without checking it.

---

## 1. Non-negotiable rules (anti-hallucination and anti-"AI look")

### 1.1 Facts

- **R1.** Use only facts from the **Fact Sheet (section 3)**. Anything else about the shop is unknown.
- **R2.** For anything unknown (prices, stock, warranty terms, owner name, years in business, reviews, exact map coordinates, holiday hours), use the placeholder mechanism in section 9 and mark it `TODO_CONFIRM`. **Never guess and present it as real.**
- **R3.** Never invent: testimonials, star ratings, review counts, customer names, staff names, the owner's name, awards, "years of experience", "trusted by X customers", "authorised dealer" or "official service centre" claims, EMI or finance offers, warranty periods, GPS coordinates, social media follower counts.
- **R4.** Do not show Instagram follower or post counts (they go stale).
- **R5.** No lorem ipsum anywhere, ever. Every visible string comes from the Copy Deck or the seed data in this file.

### 1.2 Assets

- **R6.** No stock photos, no hotlinked images (no Unsplash, Pexels, etc.), and **no AI-generated images**.
- **R7.** Do not redraw, recreate or "improve" the shop logo. Use the file Kalki supplies at `public/brand/logo.png`. If it is missing, show a plain text wordmark and log a warning.
- **R8.** Real photos are supplied by Kalki (section 18). If a photo file is missing, render the fallback described in section 6.9. Never substitute a different image.

### 1.3 Dependencies and code

- **R9.** Use only the dependencies listed in section 4.2. Do not add UI kits (no Material UI, Chakra, Bootstrap, shadcn/ui, DaisyUI, Ant Design) and no animation libraries (no Framer Motion, GSAP, AOS).
- **R10.** Before installing any package, verify it exists with `npm view <package> version`. Install current stable versions. Do not pin versions from memory. If a package name below does not exist, tell Kalki in `DECISIONS.md` and use the closest official alternative.
- **R11.** Do not build features outside section 2 and section 17. No cart, no online payment, no user accounts for customers, no blog, no chatbot.

### 1.4 Design

- **R12.** Follow the design tokens exactly. Do not introduce new colours, fonts or shadows.
- **R13.** The site must not look AI-generated. The forbidden patterns in section 5.8 are **hard fails**. Search the code for them at the end.

---

## 2. Project summary

**Goal:** a fast, mobile-first website that makes a local phone shop look real, trustworthy and easy to contact. Visitors should know within 5 seconds: what the shop sells, where it is, and whether it is open now.

**What is being built (Level B: public site + admin):**

| Part | Description |
|---|---|
| **Public site** | Home (long page with sections), Phones list, Phone detail, Repair page |
| **Admin panel** (`/admin`) | Private page where the shop owner adds and edits phones, offers and repair prices, marks phones as sold, and edits shop info |
| **Data layer** | A `DataProvider` interface with a **local demo implementation** (IndexedDB) so the admin really works without a server. A later phase will swap in a real backend. Do **not** build that backend now. |

**Design concept: "The Counter and the Price Tag."** The site should feel like standing at the shop's glass counter: price stickers, stamps, marker-written prices, phones on the shelf. It must feel like a real shop in Semiliguda, not a tech startup template.

**Primary visitor action:** tap **WhatsApp** or **Call**. Every page must make these one tap away.

**Audience:** local customers in Semiliguda and nearby Koraput towns, mostly on Android phones with average 4G. Languages: Odia, Hindi, English mixed.

---

## 3. Fact Sheet (verified from the shop's own WhatsApp Business profile, business card and Instagram)

Only these facts may be presented as true.

| Item | Value |
|---|---|
| Shop name | **Mo PhoneZone** (written "Mo PhoneZone"; the logo text reads "MOPHONE ZONE") |
| Tagline | **Choose Your World** |
| Category | Mobile Phone Shop; Shopping and retail |
| Phone / WhatsApp number 1 | **8093171718** (WhatsApp Business shows +91 80931 71718). International form: `918093171718` |
| Phone number 2 | **9090100880** (call; WhatsApp not confirmed) |
| Email | **mophonezone@gmail.com** |
| Address | **Main Road, Semiliguda, In front of Reliance Smart, Dist. Koraput, Odisha, PIN 764036** |
| Opening hours shown on WhatsApp | **10:00 AM to 9:30 PM** (which days: **not confirmed**) |
| Sells | All types of mobile phones, refurbished phones, 2nd-hand phones, smart watches, earbuds, back covers, screen guards, lamination |
| Services | Repair work on all types of mobile phones |
| Shop's own description (WhatsApp, truncated) | "All types of Mobile Phone, Smart Watch, Earbuds, Back cover, screen guard, lamination... available. Quick and clear Repair work done on all types of mobile phone. Great offers and ..." |
| Instagram handle | **@mo_phonezone_semiliguda** (profile URL: `https://www.instagram.com/mo_phonezone_semiliguda/`) |
| Instagram bio | "Mobile Phone Shop. Semiliguda (Koraput). All types of exclusive Mobile, refurbished phone, 2nd Phone & Repair work done. Best price and offers." |
| Instagram story highlights | Sale, Celebration, Diwali24 |
| Facebook | A page named "Mo PhoneZone" exists (URL not known; **do not link it**) |
| Brand colours seen in logo | Teal / cyan phone illustration, black round badge, some orange accents |

### 3.1 Unknowns (must be placeholders, never guessed)

Days open per week; holiday closures; real phone stock and prices; accessory prices; repair prices and times; warranty terms; whether exchange, EMI or home pickup exist; meaning of "lamination" (assume phone back-skin or screen lamination, **confirm**); owner and staff names; exact Google Maps pin; Google review link; years in business.

---

## 4. Tech stack

### 4.1 Decisions (do not change)

- **Vite + React + TypeScript**, single-page app, **React Router** for routes.
- **Plain CSS** with CSS variables (design tokens) and **one CSS file per component** (co-located). **Do not use Tailwind.** (Reason: full control of the look and no template feel.)
- **Mobile-first** CSS. Breakpoints: `min-width: 640px`, `900px`, `1200px`.
- Data persisted in the browser with **IndexedDB** via `idb-keyval` (demo mode).
- Static hosting later (Netlify or Vercel). Do not deploy in this task.

### 4.2 Allowed dependencies (verify each with `npm view`)

Runtime: `react`, `react-dom`, `react-router-dom`, `idb-keyval`, `react-icons` (**only** `react-icons/si` for WhatsApp, Instagram, Google Maps brand marks).
Fonts (self-hosted, no CDN): `@fontsource-variable/archivo` (use the width-axis CSS if it exists, else the normal file), `@fontsource/public-sans`, `@fontsource/kalam`, `@fontsource/noto-sans-oriya` (if this package name does not exist, look for `@fontsource/noto-sans-odia`).
Dev: `typescript`, `vite`, `@vitejs/plugin-react`, `vitest` (used only to test the shop-open logic in section 11.3).

Nothing else.

### 4.3 Folder structure

```
mo-phonezone/
  index.html
  package.json
  vite.config.ts
  DECISIONS.md                 (you create: every judgment call)
  CONFIRM_BEFORE_LAUNCH.md     (you create: every unconfirmed claim, see section 9.4)
  public/
    brand/logo.png             (Kalki supplies)
    photos/                    (Kalki supplies, slots in section 18)
    favicon.svg
  src/
    main.tsx
    App.tsx
    styles/
      tokens.css               (section 5 variables)
      base.css                 (reset, typography, focus, utilities)
    config/
      shop.ts                  (fact sheet as typed constants + TODO_CONFIRM flags)
    i18n/
      en.ts
      or.ts                    (Odia, see section 12)
      index.ts
    data/
      types.ts
      seed.ts                  (sample data from section 9)
      provider.ts              (DataProvider interface)
      localProvider.ts         (IndexedDB implementation)
      DataContext.tsx
    lib/
      whatsapp.ts
      shopStatus.ts
      shopStatus.test.ts
      format.ts                (rupee formatting)
    components/
      (one folder per component, each with .tsx and .css)
    pages/
      Home/ Phones/ PhoneDetail/ Repair/
      admin/ (Login, Layout, PhonesAdmin, OffersAdmin, RepairAdmin, ShopInfoAdmin, DataTools)
```

---

## 5. Design system

### 5.1 Tokens (put these in `src/styles/tokens.css` exactly)

```css
:root {
  /* colour */
  --paper:   #F3EDE2;  /* page background */
  --paper-2: #E8E0D1;  /* alternate band, image backgrounds */
  --ink:     #15171A;  /* text, borders, shadows */
  --teal:    #0E9C98;  /* brand accent: buttons, links, big shapes */
  --yellow:  #FFC93C;  /* price tags, offer stickers */
  --red:     #E5482D;  /* SOLD / sale stamps only */
  --grey:    #6B665E;  /* secondary text */
  --night:   #0B1F20;  /* dark band (repair) and footer */
  --wa:      #25D366;  /* WhatsApp button only */

  /* type */
  --font-display: "Archivo Variable", "Archivo", "Arial Narrow", Arial, sans-serif;
  --font-body:    "Public Sans", "Noto Sans Oriya", "Noto Sans Devanagari", Arial, sans-serif;
  --font-hand:    "Kalam", cursive;

  /* shape */
  --line: 2px solid var(--ink);
  --shadow-hard:    4px 4px 0 var(--ink);
  --shadow-hard-sm: 2px 2px 0 var(--ink);
  --r-1: 2px;
  --r-2: 4px;
  --r-3: 8px;

  /* space (4px base) */
  --s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 16px;
  --s-5: 24px; --s-6: 32px; --s-7: 48px; --s-8: 64px; --s-9: 96px;

  /* layout */
  --container: 1160px;
  --gutter: 20px;          /* 32px from 900px up */
}
```

### 5.2 Colour usage rules

| Colour | Allowed use | Not allowed |
|---|---|---|
| Paper | Main background | Pure white (`#fff`) anywhere |
| Paper-2 | Alternate section band, image backgrounds, table stripes | Text |
| Ink | All body text, headings, all borders, hard shadows | - |
| Teal | Primary buttons (with **ink** text on top), active filter chips, big colour blocks behind photos, links on dark | Small text on paper (contrast is too low) |
| Yellow | Price tags, offer stickers, "New" badge, form sheet | Text colour |
| Red | "SOLD" stamp, sale marks | Buttons, backgrounds of large areas |
| Grey | Captions, small print | Anything essential (fails contrast at small sizes) |
| Night | Repair band, footer. Text on it is **paper**. | - |
| WhatsApp green | The WhatsApp button only, with **ink** text | Any decoration |

**No gradients. No transparency tricks for style. Flat colours only.**

### 5.3 Typography

- **Display (headings):** Archivo, weight 800 to 900. If the width axis exists, use `font-stretch: 75%` to `90%` for a condensed signboard feel. Headings are **uppercase** for H1 and section titles, sentence case for card titles.
- **Body:** Public Sans 400/600/700. Body line-height **1.65** (Odia needs room).
- **Hand (Kalam 700):** used **only** for prices, offer stickers and stamps. Never for paragraphs or headings.
- **Never use** Inter, Poppins, Roboto, Space Grotesk or system-ui as a primary face.

| Style | Size | Notes |
|---|---|---|
| H1 (hero) | `clamp(2.5rem, 9vw, 5.5rem)` | weight 900, line-height 0.95, letter-spacing -0.01em, uppercase |
| H2 (section) | `clamp(1.75rem, 5vw, 3rem)` | weight 800, uppercase, left-aligned |
| H3 (card) | 1.25rem | weight 700, sentence case |
| Kicker | 0.75rem | uppercase, weight 700, letter-spacing 0.12em, grey |
| Body | 1rem | |
| Small | 0.875rem | |
| Price (hand) | 1.75rem to 2.25rem | Kalam 700 |

### 5.4 Shape, borders, shadows

- Everything that is a "thing" (button, chip, card, input, table) has a **2px ink border** (`var(--line)`).
- Shadows are **hard offset only** (`var(--shadow-hard)`, no blur). **No soft or blurred shadows anywhere.** Focus ring is the only exception (see 5.7).
- Corner radius: `--r-1` to `--r-3` only (2 to 8px). **No pill buttons, no big rounded corners.** Circles only for the tag hole and status dot.
- Buttons: on hover, translate by (2px, 2px) and shrink the shadow to `--shadow-hard-sm`. On active, translate (4px, 4px) and remove the shadow.

### 5.5 Icons

- No emoji anywhere in the UI or the code.
- No icons-inside-coloured-circles as decoration. No row of three icon cards.
- Functional icons (phone, watch, earbuds, case, screen guard, wrench, pin, clock, menu, close, chevron, check) are a **small set of self-authored inline SVGs** in `src/components/icons.tsx`: 24x24 viewBox, 2px stroke, `stroke-linecap: square`, `stroke-linejoin: miter`, `fill: none`, `currentColor`.
- Brand marks (WhatsApp, Instagram, Google Maps) come from `react-icons/si` only.

### 5.6 Imagery

- Photos are real, supplied by Kalki. Consistent treatment: no filters, no rounded corners; 2px ink border; `object-fit: cover` for shop photos, `object-fit: contain` on `--paper-2` for phone photos.
- A photo may overlap a colour block (teal) offset by 16px behind it, for the hero and about sections.

### 5.7 Motion and focus

- Motion is minimal: button press effect (5.4), tag card lifts 2px on hover (desktop only), mobile menu slides open. That's all.
- **No** scroll-triggered fade-ins or slide-ups, no parallax, no animated counters, no marquee, no typing effects.
- Respect `prefers-reduced-motion: reduce` (remove all transitions).
- Keyboard focus: `outline: 3px solid var(--teal); outline-offset: 2px;` on all interactive elements (on Night backgrounds use `var(--yellow)`).

### 5.8 FORBIDDEN patterns (hard fails; grep for these at the end)

| Pattern | Check |
|---|---|
| Any gradient | `linear-gradient`, `radial-gradient`, `conic-gradient` must not appear |
| Blur or glass | `backdrop-filter`, `blur(` must not appear |
| Soft shadows | any `box-shadow` or `drop-shadow` with a non-zero blur radius (except the focus ring, which uses `outline`, not shadow) |
| Big rounding | `border-radius` above `8px` (allowed only `50%` on the tag hole and status dot) |
| Wrong fonts | `Inter`, `Poppins`, `Roboto`, `Space Grotesk` in any `font-family` |
| Centred hero with gradient text | hero is left-aligned (see 8.1) |
| Three identical icon cards | not allowed in any section |
| Emoji | no emoji characters in source or UI |
| Placeholder text | `lorem`, `ipsum`, `Your Company`, `Acme` must not appear |
| Stock or hotlinked images | no `http(s)://` image URLs in `src` |
| Generic marketing phrases | "Welcome to", "trusted partner", "one-stop", "cutting-edge", "seamless", "elevate", "unlock", "best-in-class", "world-class" must not appear |
| Scroll-reveal animations | no IntersectionObserver-based fade-in effects |

---

## 6. Components

For every component: mobile-first, tap targets **at least 44 x 44px**, visible focus, accessible names.

### 6.1 Button

Variants: `primary` (teal background, ink text), `whatsapp` (green, ink text, WhatsApp mark), `outline` (paper background, ink text), `dark` (ink background, paper text). All: 2px ink border, `--r-2`, hard shadow, font-body 700, min-height 48px, padding 0 20px. Press effect per 5.4. Can render as `<a>` or `<button>`.

### 6.2 PriceTagCard (the signature component; used for phones)

- Shape: a rectangle with the **top-right corner cut diagonally (about 22px)** and a **round string hole** (about 12px circle, 2px ink border, paper fill) near that corner.
- Build it with two nested clipped elements (outer ink polygon, inner paper polygon inset 2px) inside a wrapper carrying a hard `drop-shadow(4px 4px 0 var(--ink))` filter. If that fails in a browser, fall back to a normal 2px-bordered card with hard shadow and a CSS-drawn hole, and note it in `DECISIONS.md`.
- Content, top to bottom:
  1. Photo area (aspect ratio 4:5, `--paper-2` background, phone photo `contain`). If sold, a rotated **SoldStamp** sits over the photo.
  2. Brand (kicker style), model (H3).
  3. Spec line: "8 GB / 256 GB" (only the parts that exist).
  4. Condition row: text "New", "Refurbished" or "2nd hand", plus **Grade** if present (see 6.4).
  5. Bottom row: **price** in Kalam on a **yellow sticker** (yellow background, 2px ink border, rotated **-2deg**, slightly overlapping the photo's bottom-right corner on desktop; simply left-aligned in the bottom row on mobile) and a small "Ask on WhatsApp" button.
- The whole card links to the phone detail page. The WhatsApp button must **not** trigger the card link (stop propagation).
- Sold phones: photo desaturated with `filter: grayscale(1)`, price sticker has a line through it, button label becomes "Ask for similar".

### 6.3 SoldStamp / NewBadge

- **SoldStamp:** text "SOLD", Kalam 700, 22px or larger, red text on paper, 3px red border, `--r-1`, rotated **-8deg**, letter-spacing 0.1em. Sits over the photo centre.
- **NewBadge:** text "NEW", yellow background, 2px ink border, rotated **3deg**, small. Only on phones with condition `new` and added within the last 14 days.
- Rotation is fixed per component, never random.

### 6.4 GradeMark

For refurbished and 2nd-hand phones only: a square ink-bordered box with the letter A, B or C. Tooltip and detail-page text use the grade help text from config (section 9.3, flagged `TODO_CONFIRM`).

### 6.5 OfferSticker

Yellow rectangle, 2px ink border, hard shadow, slight rotation (alternate -1.5deg and 1deg by index, deterministic). Contains: title (Archivo 800), one line of description, and "Ends 31 Oct" (formatted from `endsAt`, hidden if none). Min width 240px, used in a horizontally scrolling strip with `scroll-snap-type: x mandatory`. Expired offers (`endsAt` in the past) or `active: false` are never shown.

### 6.6 ShopStatusBadge

A small box with a **status dot** and text, driven by `getShopStatus` (section 11.3):
- Open: teal dot, "Open now. Closes 9:30 PM"
- Closing soon: yellow dot, "Closing soon. Closes 9:30 PM"
- Closed: red dot, "Closed. Opens today at 10:00 AM" or "Closed. Opens tomorrow at 10:00 AM"

### 6.7 FilterChips

Row of toggle chips (2px ink border, `--r-2`, paper background). Active chip: teal background, ink text, hard shadow. On mobile the row scrolls horizontally with no visible scrollbar. Marked up as buttons with `aria-pressed`.

### 6.8 RateCard (repair table)

Looks like a printed rate card on the Night band: paper-coloured text, and each row reads `Service ........ from ₹1,200` with a **dotted leader line** between the service name and the price. Draw the leader with `border-bottom: 2px dotted var(--paper)` on a flexible spacer element (no opacity tricks, no gradients). Under the service name, show the time note in small text. Use a semantic `<table>` or `<dl>`, not plain divs.

### 6.9 Img and fallback

`<Img src alt width height>`: lazy loading, explicit dimensions to prevent layout shift, `decoding="async"`. **Fallback when the file fails to load or is missing:** a box with `--paper-2` background, diagonal hatch lines drawn in CSS with a **repeating-linear-gradient is forbidden**, so use an inline SVG pattern instead, a simple phone outline, and a small label with the slot name (for example "photo: hero-shop"). In production builds hide the label text.

### 6.10 StickyMobileBar

Fixed to the bottom, mobile only (hidden from 900px up and hidden on `/admin`). Three equal buttons: **Call** (outline), **WhatsApp** (whatsapp), **Directions** (primary). Height 56px plus `env(safe-area-inset-bottom)`. Page content gets bottom padding so it is never hidden behind the bar.

### 6.11 Section heading

Left-aligned H2 (uppercase) with a 4px ink rule beneath that is **as wide as the text**, not full width. Optional handwritten note (Kalam, grey, rotated -2deg) beside the heading on desktop. **Never centred.**

### 6.12 LanguageToggle

Two text buttons "EN" and "ଓଡ଼ିଆ" in a bordered box; the active one has an ink background and paper text. Choice is saved to `localStorage` and sets `<html lang="en">` or `lang="or"`.

---

## 7. Global layout

### 7.1 Header

- Sticky top, paper background, bottom border `--line`. Height 64px mobile, 72px desktop.
- Left: **wordmark**. Text "Mo PhoneZone" in Archivo 900 ("Mo" in teal with ink text-stroke is not allowed; keep "Mo" in teal, "PhoneZone" in ink), preceded by a small inline SVG phone glyph. **Do not use the detailed logo here** (it is too detailed at small size).
- Desktop nav (text links): Phones, Accessories, Repair, Visit us. Right side: LanguageToggle and a **Call** button.
- Mobile: LanguageToggle and a text button "Menu" that opens a full-screen paper panel with the nav links as large Archivo text, plus Call and WhatsApp buttons at the bottom. Close with a text button "Close" and with the Escape key. Trap focus while open.

### 7.2 Footer (Night background)

Wordmark, address, both phone numbers (tap to call), email, Instagram link (icon + "@mo_phonezone_semiliguda"), opening hours, and the small line "Website by Kalki Studio" (plain text, no link). If demo mode is on (section 13.7), also show: "Demo website. Sample data shown." in small grey text.

---

## 8. Pages and sections

Routes: `/` (Home), `/phones`, `/phones/:id`, `/repair`, `/admin/*`, and a simple 404 in the same style.

### 8.1 Home `/` (sections in this exact order; vary their rhythm as specified)

**1. Hero (paper background)**
- Desktop: 12-column grid. Text spans columns 1 to 7, photo spans 7 to 12 (overlapping by one column with the text block's edge is fine). Mobile: text first, then photo.
- Text: kicker "Mo PhoneZone. Semiliguda, Koraput" ; H1 "Semiliguda's phone counter." with a second line "New. Refurbished. Repaired." (second line in teal-underlined ink, not teal text); one sentence of body from the Copy Deck; **ShopStatusBadge**; an address chip with pin icon: "Main Road, in front of Reliance Smart"; buttons: **WhatsApp us** (whatsapp) and **Get directions** (outline).
- Photo: `hero-shop.jpg` inside a 2px ink border with a **teal block offset 16px behind it**. A yellow **sticker** rotated 4deg on its corner reads "Choose Your World" (the verified tagline).
- If `hero-shop.jpg` is missing, show the **real logo** (`brand/logo.png`) large on the teal block instead of a placeholder. If the logo is also missing, use the Img fallback.

**2. Offers strip (yellow band, full width)**
- Small label "Today at the counter". Horizontal scroll-snap row of **OfferSticker**s from data. If there are no active offers, **hide the whole band**.

**3. Phones (paper)**
- Section heading "Phones on the shelf".
- FilterChips: All, New, Refurbished, 2nd hand.
- Grid of **PriceTagCard**: 2 columns on mobile, 3 from 900px, 4 from 1200px. Show the **8 most recently added** available phones (sold ones excluded on home), then a wide outline button "See all phones" linking to `/phones`.
- If there are zero phones: a single box "No phones listed right now. Message us on WhatsApp to ask what's in stock." with the WhatsApp button.

**4. Accessories (paper-2 band; "shelf list" layout, not cards)**
- Section heading "Covers, guards, buds and watches".
- Five full-width rows, one per category: **Smart watches, Earbuds, Back covers, Screen guards, Lamination**. Each row: category name in large Archivo (left), a short note and the "from ₹" price in Kalam (right), a bottom border `--line`. Hovering a row (desktop) shifts it 8px right and shows an arrow. Each row is a WhatsApp link with the pre-filled accessory message.
- Rows are separated by lines, **not** boxed into cards.

**5. Repair (Night band)**
- Section heading "Repair rate card" (paper text). RateCard with all repair items from data. Under it a small note from the Copy Deck (`repair.note`), and buttons: **Ask about a repair** (whatsapp, pre-filled repair message) and **Full repair page** (link to `/repair`).
- On this band the design uses paper text, teal buttons and yellow focus rings.

**6. Sell or exchange your old phone (paper; split layout)**
- Left: heading "Got an old phone?" and 2 lines of copy. Right: a **yellow sheet** (yellow background, 2px ink border, hard shadow, rotated 1deg on desktop) containing a tiny form: Phone model (text), Condition (select: Works fine, Small problems, Not working), Expected price (optional number), and a button **Send on WhatsApp**. Submitting opens WhatsApp with a message built from the fields (section 11.2). **Nothing is stored or sent anywhere else.**
- Show this section only if `config.features.sellExchange` is true (default true, flagged `TODO_CONFIRM` in `CONFIRM_BEFORE_LAUNCH.md`).

**7. About the shop (paper)**
- Left: `counter.jpg` and `owner-team.jpg` overlapping like two prints on a table (one rotated -2deg, one 2deg, both with ink borders). Right: heading "The counter" and the factual paragraph from the Copy Deck (`about.body`). No names, no years, no claims.
- If both photos are missing, show text only in a single column (no placeholders).
- If `config.googleReviewUrl` is set, show a "Review us on Google" outline button. If not set, show nothing.

**8. Instagram strip (paper)**
- Heading "From our Instagram". Six photos `insta-1.jpg` to `insta-6.jpg` in a row (2 columns x 3 on mobile, 6 across on desktop) with slightly different heights for a ragged look, each linking to the shop's Instagram profile. Button "Follow @mo_phonezone_semiliguda".
- **If fewer than 3 of the 6 photos exist, hide the entire section.** No follower counts (R4).

**9. Visit us (paper-2 band)**
- Left: Google Map embed (section 11.4), 2px ink border, height 320px mobile / 420px desktop, `loading="lazy"`, `title` attribute set. Right: address block, hours table (from config; show "Days open: to be confirmed" if `openDaysConfirmed` is false), phone numbers (tap to call, both), email, and buttons: **Get directions**, **WhatsApp**.

### 8.2 Phones page `/phones`

- H1 "All phones". Filters: condition chips (All, New, Refurbished, 2nd hand), brand chips (built from the data's brands, sorted A to Z), sort select (Newest, Price: low to high, Price: high to low), and a toggle "Hide sold" (default **off**; sold phones appear at the end of the list with the stamp).
- State is stored in URL query params (`?condition=refurbished&brand=Samsung&sort=price-asc&hideSold=1`), so links can be shared.
- Shows result count ("12 phones") and an empty state with the WhatsApp button.
- Grid of PriceTagCards as in Home.

### 8.3 Phone detail `/phones/:id`

- Breadcrumb "Phones / Brand Model".
- Left: photo gallery (main image plus up to 3 thumbnails; if no photos, the Img fallback). Right: brand kicker, H1 model, **price sticker** (large, Kalam), status (Available / Sold stamp), specs list (RAM, storage, condition, grade with help text, warranty text if present, notes if present), and buttons: **Ask on WhatsApp** (whatsapp, message includes the model, storage and price), **Call the shop** (outline).
- If the id does not exist: the 404 page.
- Below: "More phones" with up to 4 other available phones (same condition preferred).

### 8.4 Repair page `/repair`

- H1 "Repair". Intro from Copy Deck. Full RateCard (same data as Home, Night band). A 3-step strip ("Bring your phone", "Tell us the problem", "Collect it") **as plain numbered text, not icon cards**. A small form (Phone model, What's the problem) that opens WhatsApp with a pre-filled message. The note from the Copy Deck stating that prices are "from" prices.

---

## 9. Data model, placeholders and seed data

### 9.1 Types (`src/data/types.ts`)

```ts
export type Condition = "new" | "refurbished" | "second-hand";
export type Grade = "A" | "B" | "C";

export interface Phone {
  id: string;                 // slug, unique
  brand: string;
  model: string;
  ram?: string;               // "8 GB"
  storage?: string;           // "256 GB"
  condition: Condition;
  grade?: Grade;              // only for refurbished / second-hand
  price: number;              // INR, integer
  warranty?: string;          // free text
  notes?: string;
  photos: string[];           // paths under /photos/phones/ or data URLs from admin uploads
  status: "available" | "sold";
  addedAt: string;            // ISO date
  isSample?: boolean;         // true for seed data
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  endsAt?: string;            // ISO date; offer hidden after this date
  active: boolean;
  isSample?: boolean;
}

export interface RepairItem {
  id: string;
  service: string;
  priceFrom: number;          // INR
  timeNote?: string;
  isSample?: boolean;
}

export interface AccessoryCategory {
  id: "smart-watches" | "earbuds" | "back-covers" | "screen-guards" | "lamination";
  label: string;
  note: string;
  priceFrom?: number;
  isSample?: boolean;
}

export interface ShopInfo {
  openTime: string;           // "10:00"
  closeTime: string;          // "21:30"
  openDays: number[];         // 0 = Sunday ... 6 = Saturday
  openDaysConfirmed: boolean; // false until owner confirms
  notice?: string;            // optional banner text, e.g. holiday closure
}
```

### 9.2 Placeholder mechanism

- Every unknown value lives in `src/config/shop.ts` or in the seed data with `isSample: true` or a `TODO_CONFIRM` comment.
- Sample records are still **shown** in the demo so the site looks alive, but they must be replaceable from the admin or by editing `seed.ts`, and each one is listed in `CONFIRM_BEFORE_LAUNCH.md`.
- Format prices with `Intl.NumberFormat("en-IN")` and the rupee sign: `₹12,499`.

### 9.3 Config (`src/config/shop.ts`) values

```ts
export const SHOP = {
  name: "Mo PhoneZone",
  tagline: "Choose Your World",
  phones: { primary: "8093171718", secondary: "9090100880" },
  whatsappNumber: "918093171718",
  email: "mophonezone@gmail.com",
  address: {
    line1: "Main Road, in front of Reliance Smart",
    town: "Semiliguda",
    district: "Koraput",
    state: "Odisha",
    pin: "764036",
  },
  instagram: {
    handle: "mo_phonezone_semiliguda",
    url: "https://www.instagram.com/mo_phonezone_semiliguda/",
  },
  hours: { open: "10:00", close: "21:30", days: [0,1,2,3,4,5,6], daysConfirmed: false }, // TODO_CONFIRM
  googleReviewUrl: "",            // empty = hide the button. TODO_CONFIRM
  features: { sellExchange: true }, // TODO_CONFIRM
  studioCredit: "Website by Kalki Studio",
  demoMode: true,
} as const;

export const GRADE_HELP = {        // TODO_CONFIRM with owner before launch
  A: "Looks close to new.",
  B: "Light marks or scratches.",
  C: "Visible wear.",
};
```

### 9.4 `CONFIRM_BEFORE_LAUNCH.md`

Generate this file automatically at the end. It must list, as a checkbox list: every sample phone, offer, repair item and accessory price; the open days; grade definitions; whether exchange exists; the repair note claim; the meaning of "lamination"; the Google Maps exact pin; the Google review link; and the photo slots still missing.

### 9.5 Seed data (copy exactly; all are `isSample: true`)

**Phones** (no photos in seed; `photos: []`; `addedAt` values spread over the 30 days before 2026-09-30, newest first in this list):

| id | brand | model | ram | storage | condition | grade | price | status |
|---|---|---|---|---|---|---|---|---|
| oppo-reno16 | OPPO | Reno16 | 8 GB | 256 GB | new | - | 38999 | available |
| vivo-x300-fe | vivo | X300 FE | 12 GB | 256 GB | new | - | 54999 | available |
| samsung-galaxy-a15 | Samsung | Galaxy A15 | 6 GB | 128 GB | new | - | 13999 | available |
| redmi-note-12 | Redmi | Note 12 | 6 GB | 128 GB | refurbished | A | 9499 | available |
| realme-narzo-60 | realme | Narzo 60 | 8 GB | 128 GB | refurbished | A | 10999 | available |
| oneplus-nord-ce3-lite | OnePlus | Nord CE 3 Lite | 8 GB | 128 GB | second-hand | B | 11499 | available |
| iphone-12 | Apple | iPhone 12 | - | 64 GB | second-hand | B | 21999 | available |
| samsung-galaxy-m14 | Samsung | Galaxy M14 | 6 GB | 128 GB | refurbished | B | 8299 | sold |

(`warranty` and `notes` empty in seed.)

**Offers:**

| id | title | description | endsAt | active |
|---|---|---|---|---|
| combo-guard-lamination | Screen guard + lamination combo | Ask at the counter for today's combo price. | 2026-10-31 | true |
| old-phone-valuation | Old phone? Get it valued | Bring your old phone to the shop for a valuation. | (none) | true |

**Repair items:**

| id | service | priceFrom | timeNote |
|---|---|---|---|
| screen | Screen replacement | 1200 | Depends on model |
| battery | Battery replacement | 600 | Depends on model |
| charging-port | Charging port | 350 | Depends on model |
| software | Software / hanging problem | 250 | Depends on the issue |
| speaker-mic | Speaker or mic | 300 | Depends on model |
| water | Water damage check | 200 | Depends on the damage |

**Accessory categories:**

| id | label | note | priceFrom |
|---|---|---|---|
| smart-watches | Smart watches | Ask which are in stock | 999 |
| earbuds | Earbuds | Wireless and wired | 499 |
| back-covers | Back covers | For most popular models | 99 |
| screen-guards | Screen guards | Fitted at the counter | 99 |
| lamination | Lamination | Ask for details | 149 |

(Notes above are deliberately generic. Do not add more claims.)

---

## 10. Copy deck (English; use these strings exactly, stored in `src/i18n/en.ts`)

**Voice:** short, direct, plain, a little warm. Specific over generic. No hype.

| Key | English string |
|---|---|
| `nav.phones` | Phones |
| `nav.accessories` | Accessories |
| `nav.repair` | Repair |
| `nav.visit` | Visit us |
| `nav.menu` | Menu |
| `nav.close` | Close |
| `cta.call` | Call |
| `cta.callShop` | Call the shop |
| `cta.whatsapp` | WhatsApp us |
| `cta.askWhatsapp` | Ask on WhatsApp |
| `cta.askSimilar` | Ask for similar |
| `cta.directions` | Get directions |
| `cta.seeAllPhones` | See all phones |
| `cta.askRepair` | Ask about a repair |
| `cta.fullRepair` | Full repair page |
| `cta.sendWhatsapp` | Send on WhatsApp |
| `cta.followInstagram` | Follow @mo_phonezone_semiliguda |
| `cta.reviewGoogle` | Review us on Google |
| `hero.kicker` | Mo PhoneZone. Semiliguda, Koraput |
| `hero.h1a` | Semiliguda's phone counter. |
| `hero.h1b` | New. Refurbished. Repaired. |
| `hero.body` | New phones, refurbished phones, accessories and repair, all in one shop on Main Road. |
| `hero.address` | Main Road, in front of Reliance Smart |
| `hero.sticker` | Choose Your World |
| `status.open` | Open now. Closes {time} |
| `status.closingSoon` | Closing soon. Closes {time} |
| `status.closedToday` | Closed. Opens today at {time} |
| `status.closedTomorrow` | Closed. Opens tomorrow at {time} |
| `offers.label` | Today at the counter |
| `phones.title` | Phones on the shelf |
| `phones.all` | All |
| `phones.new` | New |
| `phones.refurbished` | Refurbished |
| `phones.secondHand` | 2nd hand |
| `phones.empty` | No phones listed right now. Message us on WhatsApp to ask what's in stock. |
| `phones.pageTitle` | All phones |
| `phones.hideSold` | Hide sold |
| `phones.count` | {n} phones |
| `phones.sold` | SOLD |
| `phones.new.badge` | NEW |
| `phones.moreLikeThis` | More phones |
| `acc.title` | Covers, guards, buds and watches |
| `acc.from` | from |
| `repair.title` | Repair rate card |
| `repair.pageTitle` | Repair |
| `repair.intro` | We repair all types of mobile phones. Tell us the model and the problem and we'll get back to you. |
| `repair.note` | Prices shown are starting prices. The final price depends on the phone and the problem. |
| `repair.step1` | Bring your phone |
| `repair.step2` | Tell us the problem |
| `repair.step3` | Collect it |
| `repair.modelLabel` | Phone model |
| `repair.problemLabel` | What's the problem? |
| `sell.title` | Got an old phone? |
| `sell.body` | Tell us the model and condition and we'll message you back with a price. |
| `sell.model` | Phone model |
| `sell.condition` | Condition |
| `sell.cond.works` | Works fine |
| `sell.cond.problems` | Small problems |
| `sell.cond.dead` | Not working |
| `sell.price` | Expected price (optional) |
| `about.title` | The counter |
| `about.body` | Mo PhoneZone is a mobile phone shop on Main Road in Semiliguda, in front of Reliance Smart. We sell new, refurbished and 2nd-hand phones, along with smart watches, earbuds, back covers and screen guards, and we repair mobile phones. |
| `insta.title` | From our Instagram |
| `visit.title` | Visit us |
| `visit.hours` | Opening hours |
| `visit.daysTbc` | Days open: to be confirmed |
| `footer.demo` | Demo website. Sample data shown. |
| `notfound.title` | Page not found |
| `notfound.body` | That page isn't here. Try the phones page or message us on WhatsApp. |

Any text not in this table (for example admin screens) uses plain functional labels ("Save", "Cancel", "Add phone", "Mark as sold"). Do not write marketing text for the admin.

---

## 11. Links and logic

### 11.1 Links

- Call: `tel:+918093171718` and `tel:+919090100880`.
- Email: `mailto:mophonezone@gmail.com`.
- Directions: `https://www.google.com/maps/search/?api=1&query=Mo+PhoneZone+Semiliguda+Koraput+Odisha`
- Instagram: from config.

### 11.2 WhatsApp messages (`src/lib/whatsapp.ts`)

Build with `https://wa.me/918093171718?text=` + `encodeURIComponent(message)`. Templates:

- General: `Hello Mo PhoneZone, I saw your website. I have a question.`
- Phone: `Hello Mo PhoneZone, I'm interested in {brand} {model}{ram/storage in brackets if present} ({price}). Is it available?`
- Similar (sold): `Hello Mo PhoneZone, I saw the {brand} {model} on your website. Do you have something similar?`
- Accessory: `Hello Mo PhoneZone, I'm looking for {category}. What do you have?`
- Repair: `Hello Mo PhoneZone, I need a repair. Phone: {model}. Problem: {problem}.`
- Sell: `Hello Mo PhoneZone, I want to sell my phone. Model: {model}. Condition: {condition}.{ Expected price: ₹X. if given}`

All WhatsApp links open in a new tab with `rel="noopener noreferrer"`.

### 11.3 Shop status (`src/lib/shopStatus.ts`)

- Always evaluate time in the **Asia/Kolkata** timezone (use `Intl.DateTimeFormat` with `timeZone: "Asia/Kolkata"`), **not** the visitor's device timezone.
- Input: current `Date`, hours config. Output: `{ state: "open" | "closingSoon" | "closedToday" | "closedTomorrow", closeLabel: "9:30 PM", openLabel: "10:00 AM" }`.
- Rules: open between open and close on an open day; `closingSoon` in the last 30 minutes; before opening on an open day is `closedToday`; after closing (or on a closed day) is `closedTomorrow` with the next open day computed from `days`.
- Write Vitest tests for at least: just before open, exactly at open, mid-day, 21:00 (closing soon), 21:30 (closed), and a closed-day case.

### 11.4 Map embed

`<iframe src="https://www.google.com/maps?q=Mo+PhoneZone+Semiliguda+Koraput+Odisha&output=embed" ...>`. **Do not invent coordinates.** Add to `CONFIRM_BEFORE_LAUNCH.md` that the owner's exact Google Maps share link should replace this.

---

## 12. Language toggle (English and Odia)

- All UI strings go through a `t(key)` function backed by `en.ts` and `or.ts`.
- **Do not machine-translate Odia.** Leave `or.ts` with all the keys and **empty strings**. Missing or empty Odia values **fall back to English**, and log a single console warning listing the missing keys in development only.
- The toggle is present and works, so Kalki can fill in `or.ts` himself (he speaks Odia).
- Odia text uses Noto Sans Oriya (or Odia) with line-height 1.7.
- Product names, prices and numbers are never translated.

---

## 13. Admin panel (demo mode)

### 13.1 Access

- Route `/admin`. Page has `<meta name="robots" content="noindex">`.
- Login screen: a single passcode field. Passcode comes from `VITE_ADMIN_PASSCODE` (default `demo123` if not set). On success store a flag in `sessionStorage`.
- Show a visible notice on the login and admin screens: **"Demo mode: this login is not secure and changes are saved only in this browser."**
- The public header, footer and StickyMobileBar are **not** shown on admin pages. Admin has its own top bar: "Owner desk", a "View site" link and "Log out".

### 13.2 Visual style

Same tokens as the public site, but denser and plainer: paper background, ink borders, teal primary buttons, no hero art, no stamps or rotation. Mobile-first; large tap targets, one column on phones.

### 13.3 Screens

1. **Phones** (`/admin/phones`)
   - List with search box. Each row: thumbnail, brand + model, price, condition, status, and buttons **Edit**, **Mark as sold / Mark as available**, **Delete** (with a confirm dialog).
   - **Add phone** button opens a form: Brand, Model, RAM, Storage, Condition (select), Grade (shown only for refurbished and 2nd hand), Price (number, INR), Warranty (text), Notes (text), Photos (up to 4), Status.
   - Photo upload: accept images only. **Resize in the browser to at most 900px on the long side, JPEG quality 0.8**, and store as data URLs in IndexedDB. Show a thumbnail preview with a remove button.
   - Validation: Brand, Model, Price required; price must be a positive integer. Show clear inline error messages.
2. **Offers** (`/admin/offers`): list, add, edit, delete; fields Title, Description, End date (optional), Active toggle.
3. **Repair prices** (`/admin/repair`): editable table of Service, Price from, Time note; add and delete rows.
4. **Accessories** (`/admin/accessories`): edit the five categories' note and "from" price.
5. **Shop info** (`/admin/shop`): opening time, closing time, days open (checkboxes), and a "Days confirmed" toggle, plus the optional notice text (shows as a slim banner at the top of the public site when filled in).
6. **Data tools** (`/admin/data`): **Export JSON** (downloads all data), **Import JSON** (validates before applying), **Reset to sample data** (with confirm).

### 13.4 Data provider

- Define `DataProvider` in `provider.ts` with async methods for each entity (list, get, create, update, delete for phones, offers, repair items; get/update for accessories and shop info; export, import, reset).
- Implement `localProvider.ts` with IndexedDB via `idb-keyval`. First load seeds from `seed.ts`.
- `DataContext` exposes the provider and the current data to both the public site and the admin. Public pages update when data changes.
- **Do not** implement any server, Supabase, Firebase or Google Sheets code now. Create no stub files for them either; a later phase adds `remoteProvider.ts` behind the same interface.

### 13.5 Behaviour rules

- Sold phones stay listed (with the stamp) so the shop looks busy; the admin's "Hide sold" filter is on the public phones page only.
- Deleting a phone is permanent (after confirm).
- All admin forms work by keyboard.

### 13.6 Not in the admin (this phase)

No analytics, no customer accounts, no order handling, no multi-user roles.

### 13.7 Demo mode flag

`SHOP.demoMode = true` shows the footer note in 7.2 and the admin notice in 13.1. Turning it to `false` hides both.

---

## 14. SEO, accessibility, performance

### 14.1 SEO (static, in `index.html`, using only verified facts)

- `<title>`: `Mo PhoneZone | Mobile phones and repair in Semiliguda, Koraput`
- Meta description: `Mo PhoneZone on Main Road, Semiliguda, in front of Reliance Smart. New, refurbished and 2nd-hand phones, smart watches, earbuds, covers, screen guards and mobile repair.`
- `lang="en"` on `<html>` (updated by the language toggle).
- JSON-LD `LocalBusiness` (subtype `MobilePhoneStore` if valid, else `Store`) with **only**: name, address (streetAddress, addressLocality, addressRegion, postalCode, addressCountry IN), telephone, email, url (leave out if there is no domain yet), sameAs (Instagram), openingHours only if `daysConfirmed` is true. **No** `geo`, `aggregateRating`, `priceRange` or `review` fields.
- Per-page `document.title` via a small `useDocumentTitle` hook (no extra library).
- Open Graph title, description and `og:image` pointing at `/photos/hero-shop.jpg` only if that file exists.

### 14.2 Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one H1 per page, logical heading order.
- All images have meaningful `alt` text (phone photos: "{brand} {model}"). Decorative shapes are `aria-hidden`.
- Colour contrast at least 4.5:1 for body text (ink on paper passes). Never put teal or grey text on paper at small sizes.
- Every interactive element is reachable and operable by keyboard; visible focus.
- Respect `prefers-reduced-motion`.

### 14.3 Performance

- Initial JS bundle (gzipped) under about 200 KB; lazy-load admin routes with `React.lazy`.
- Fonts: self-hosted, `font-display: swap`, load only the weights used.
- Images: explicit width and height, lazy loading below the fold, hero image `fetchpriority="high"`. Tell Kalki in `DECISIONS.md` to supply WebP or compressed JPEG under 200 KB each.
- Lighthouse mobile targets: Performance 90 or more, Accessibility 95 or more, Best Practices 95 or more, SEO 95 or more (report actual numbers).

---

## 15. Build order (milestones) and process

Work in this order. After each milestone: run `npm run dev`, look at it at 360 and 1280 widths, fix problems, then continue.

1. **Scaffold:** Vite + React + TS, folder structure, tokens, base CSS, fonts, config, i18n skeleton, routing with empty pages.
2. **Primitives:** Button, icons, Img with fallback, section heading, chips, ShopStatusBadge (+ `shopStatus` and its tests).
3. **Layout:** Header (with mobile menu), Footer, StickyMobileBar, LanguageToggle.
4. **Data layer:** types, seed, provider, local IndexedDB provider, context.
5. **Phones:** PriceTagCard, SoldStamp, NewBadge, GradeMark, Phones page with URL-param filters, Phone detail page.
6. **Home sections** 1 to 9 in order, using the exact layout rhythm in section 8.1.
7. **Repair:** RateCard, Repair page, repair and sell forms (WhatsApp builders).
8. **Admin:** login, layout, all screens in 13.3, photo resizing, export/import/reset.
9. **Polish and QA:** SEO tags, JSON-LD, accessibility pass, Lighthouse, forbidden-pattern grep (section 5.8), generate `CONFIRM_BEFORE_LAUNCH.md`, finish `DECISIONS.md`.

**`DECISIONS.md`** must list: every judgment call, every deviation from this spec (with the reason), every package that was not found or replaced, and any place the tag-shape fallback was used.

**Do not** ask Kalki questions mid-way for things covered here. If something truly cannot be decided from this file, choose the simplest option, record it in `DECISIONS.md`, and continue.

---

## 16. Acceptance checklist (verify each; report pass or fail)

**Facts and content**
- [ ] Every shop fact on the site appears in the Fact Sheet (section 3). No invented names, reviews, ratings, years, awards, coordinates or follower counts.
- [ ] All unconfirmed items are listed in `CONFIRM_BEFORE_LAUNCH.md`.
- [ ] No lorem ipsum, no stock or hotlinked images, no generic marketing phrases (section 5.8).

**Design**
- [ ] Only the colours in section 5.1 are used; no gradients, blur or soft shadows (grep confirms).
- [ ] Fonts are Archivo, Public Sans, Kalam (and Noto Sans Oriya for Odia). No Inter, Poppins, Roboto.
- [ ] Hero is left-aligned and asymmetric; section headings are left-aligned; no section uses three identical icon cards.
- [ ] Phones use the price-tag card; accessories use the ruled "shelf list"; repair uses the rate-card table on the Night band.
- [ ] Border radius never exceeds 8px (except the circle hole and status dot).
- [ ] No emoji in source or UI.

**Function**
- [ ] The open/closed badge uses Asia/Kolkata time and its tests pass.
- [ ] Every WhatsApp button opens the correct pre-filled message; Call and Directions links work.
- [ ] Phones page filters, sorting and "Hide sold" work and persist in the URL.
- [ ] Sold phones show the stamp and a struck-through price.
- [ ] Offers past their end date do not appear; with no offers the band is hidden.
- [ ] Sections with missing photos degrade as specified (hero uses the logo; Instagram strip hides; about goes text-only).
- [ ] Language toggle switches between EN and Odia, with English fallback for empty Odia values.
- [ ] Admin: login, add / edit / delete phone, mark sold, photo upload with resize, offers, repair prices, accessories, shop info, export, import, reset all work and changes show on the public site after reload.
- [ ] `/admin` is not linked from the public navigation and has `noindex`.

**Quality**
- [ ] Works at 360, 768 and 1280 widths with no horizontal scrolling.
- [ ] Keyboard navigation and visible focus work everywhere; mobile menu traps focus and closes on Escape.
- [ ] `prefers-reduced-motion` removes transitions.
- [ ] Lighthouse mobile scores reported (targets in 14.3).
- [ ] `npm run build` succeeds with no TypeScript errors.

---

## 17. Out of scope (do not build)

Online payment, cart or checkout; customer login; blog or news; chatbot; AI features; reviews or testimonial widgets; live chat widgets; analytics or tracking scripts; cookie banners; newsletter signup; any real backend; deployment; multi-language beyond English and Odia; dark mode toggle.

---

## 18. Files Kalki must supply (the site works without them, but looks best with them)

| Path | What | Notes |
|---|---|---|
| `public/brand/logo.png` | The shop's logo | Transparent or white background, at least 600px wide |
| `public/photos/hero-shop.jpg` | Shop front or counter, landscape | Real photo, ideally 1600px wide |
| `public/photos/counter.jpg` | Inside the shop or the counter | Real photo |
| `public/photos/owner-team.jpg` | Owner and staff at the counter | Only with their permission |
| `public/photos/insta-1.jpg` to `insta-6.jpg` | Six real photos from the shop's Instagram | Only with the owner's permission; hide the strip if fewer than 3 |
| `public/photos/phones/{phone-id}.jpg` | Phone photos named by the phone `id` (optional; the admin can upload photos too) | Compress to under 200 KB |
| `src/i18n/or.ts` | Odia translations | Kalki fills in himself |

---

## 19. Kickoff prompt (paste this into Antigravity together with this file)

> Read `MO_PHONEZONE_BUILD_SPEC.md` completely before doing anything. It is the single source of truth. Build the project in the milestone order in section 15. Do not invent any shop facts: use only the Fact Sheet, and put every unknown value behind a `TODO_CONFIRM` placeholder. Do not add dependencies beyond section 4.2 and verify every package with `npm view` before installing. Follow the design tokens and forbidden-pattern list exactly. After each milestone, run the app in the browser at 360 and 1280 pixel widths and fix issues before moving on. At the end, produce `DECISIONS.md` and `CONFIRM_BEFORE_LAUNCH.md`, run the acceptance checklist in section 16, and report each item as pass or fail with evidence.