---
name: Warm Editorial Civic
colors:
  surface: '#fcf9f3'
  surface-dim: '#dcdad4'
  surface-bright: '#fcf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ed'
  surface-container: '#f0eee8'
  surface-container-high: '#ebe8e2'
  surface-container-highest: '#e5e2dc'
  on-surface: '#1c1c18'
  on-surface-variant: '#4f4541'
  inverse-surface: '#31312d'
  inverse-on-surface: '#f3f0ea'
  outline: '#817470'
  outline-variant: '#d2c3be'
  surface-tint: '#6e5a52'
  primary: '#140804'
  on-primary: '#ffffff'
  primary-container: '#2d1e18'
  on-primary-container: '#9b847b'
  inverse-primary: '#dbc1b7'
  secondary: '#775746'
  on-secondary: '#ffffff'
  secondary-container: '#ffd4bd'
  on-secondary-container: '#7a5a48'
  tertiary: '#130900'
  on-tertiary: '#ffffff'
  tertiary-container: '#321d00'
  on-tertiary-container: '#b0803f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f8ddd3'
  primary-fixed-dim: '#dbc1b7'
  on-primary-fixed: '#271812'
  on-primary-fixed-variant: '#55433c'
  secondary-fixed: '#ffdbc9'
  secondary-fixed-dim: '#e7bea8'
  on-secondary-fixed: '#2c1608'
  on-secondary-fixed-variant: '#5d4030'
  tertiary-fixed: '#ffddb6'
  tertiary-fixed-dim: '#f4bc75'
  on-tertiary-fixed: '#2a1800'
  on-tertiary-fixed-variant: '#643f00'
  background: '#fcf9f3'
  on-background: '#1c1c18'
  surface-variant: '#e5e2dc'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  mono-receipt:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers an authoritative yet welcoming civic reporting interface that builds trust and eliminates bureaucracy fatigue. It bridges public utility with editorial sophistication, replacing cold administrative sterility with warmth, clarity, and deliberate tactile restraint.

### Brand Personality & Emotional Impact
- **Trustworthy & Civic-Minded:** Establishes institutional credibility through clean hierarchy, structured step transitions, and transparent disclosure notices.
- **Warm & Reassuring:** Uses warm parchment, creamy sands, and rich espresso browns instead of harsh stark whites and synthetic institutional blues, making citizen reporting feel conversational and dignified.
- **Deliberate & Grounded:** Every element serves clarity—from crisp multi-stage progress indicators to neatly framed official letters and receipt summaries.

### Design Movement
The system merges **Editorial Minimalism** with **Warm Neoclassical Utilitarianism**. It relies on creamy layered paper tones, deep espresso typography and key accents, fine hairline borders, and subtle tinted surface shifts to establish order and calm across complex civic flows.

## Colors

The palette is anchored by deep espresso brown and layered tones of warm sand, beige, and natural linen, creating a high-contrast yet soft visual experience.

### Palette Architecture
- **Primary (`#2D1E18`):** Deep espresso brown. Utilized for high-priority primary actions (Submit, Report Issue, Generate Letter), prominent headers, active stepper discs, and selected state outlines.
- **Secondary (`#7A5A48`):** Warm roasted umber. Applied to secondary icons, subtext, subtle borders, and contextual labels that support primary content without visual clamor.
- **Tertiary / Accent (`#C89552`):** Warm burnished ochre / terracotta amber. Used for contextual focus states, inline status markers, and selective attention cues.
- **Neutral Canvas (`#F7F4EE`):** Warm creamy parchment. Serves as the global backdrop, avoiding clinical pure white and reducing visual glare.
- **Surface & Card Base (`#FFFFFF` & `#EFECE4`):** Cards, input backgrounds, and complaint letter paper containers toggle between pure card white and warm tinted sand for crisp layered depth.
- **Semantic Statuses:**
  - *Success / Resolved (`#3D5A40`):* Deep forest herb green used for verified checks, completed receipt confirmations, and validation flags.
  - *Subdued Alert / Pending (`#8C5832`):* Muted sienna for drafts, review notes, and sample disclaimers.
  - *Border Line (`#E5DFD5`):* Hairline sand border providing soft separation across form groups and step lines.

## Typography

The type system is powered by **Plus Jakarta Sans**, providing modern legibility, balanced geometry, and friendly curves that retain sharp institutional authority across mobile screens.

### Type Roles & Treatment
- **Headlines (`headline-xl`, `headline-lg`):** Rendered in dark espresso (`#2D1E18`) with tight negative tracking (`-0.02em` to `-0.015em`) for punchy, decisive titles like "What needs fixing?" and "Review your letter".
- **Eyebrows & Section Markers (`label-sm`):** Rendered in uppercase, semibold or bold, with subtle letter spacing (`0.04em`) in secondary umber (`#7A5A48`) to cleanly label multi-step flows without competing with primary headings.
- **Body & Editorial Letter Text (`body-md`, `body-lg`):** Set at a comfortable `1.4` to `1.5` line-height ratio. In generated letter previews, paragraph separation and indented formal greetings follow classic editorial formatting.
- **Badges & Monospaced Identifiers (`mono-receipt`):** Used for reference codes (e.g., `CR-DEMO-20261107-024`) and metadata badges to convey precision.

## Layout & Spacing

Layouts are designed for single-handed mobile efficiency with comfortable touch targets and clear vertical sequencing.

### Layout Principles
- **Screen Margins:** Fixed `1.25rem` (20px) horizontal padding across mobile views, ensuring interactive elements have full breathability away from display bezels.
- **Form Stacking & Flow Gaps:** Input controls, selectable choice cards, and letter containers follow an `8px` baseline grid rhythm, grouped using `space-md` (16px) internally and `space-xl` (32px) between macro-sections.
- **Sticky Actions & Safe Areas:** Primary flow actions ("Log in", "Generate complaint letter", "Send complaint") are anchored to the bottom using `margin` bounds and responsive safe-area insets, backed by a soft fading sand scrim.

## Elevation & Depth

Visual hierarchy avoids heavy artificial drop shadows, relying instead on **tactile tonal layering** and **warm parchment tinting**.

### Hierarchy Levels
- **Level 0 (Background Canvas):** Base screen background tinted in `#F7F4EE`.
- **Level 1 (Surface Cards & Panels):** Form cards, issue selection items, and recipient cards use pure white (`#FFFFFF`) or tinted ivory (`#EFECE4`) with a fine hairline border (`1px solid #E5DFD5`) and a diffused warm shadow (`0 2px 8px rgba(45, 30, 24, 0.04)`).
- **Level 2 (Interactive Floating States & Modals):** Pinned bottom action bars, bottom sheets, and active upload thumbnails use `0 8px 24px rgba(45, 30, 24, 0.08)` for intentional lift.
- **Layered Sheet Preview (Generated Letters):** Formal civic letter containers utilize an authentic parchment fill (`#FFFFFF` with `#EFECE4` borders) to visually distinguish the formal correspondence document from standard app inputs.

## Shapes

The design system employs a refined medium-rounded geometric language (`roundedness: 2`).

### Geometry Conventions
- **Action Buttons & Inputs:** `0.75rem` (12px) to `1rem` (16px) corner radius, providing accessible, touch-friendly softness while remaining structured.
- **Cards & Letter Documents:** `1rem` (16px) radius for grouping issue categories, authority summaries, and document previews.
- **Step Indicators & Icon Discs:** Fully circular (`rounded-full`) for step sequence badges (1, 2, 3, 4), back navigation buttons, and status check icons.
- **Pills & Status Badges:** `9999px` capsule radius for language toggles (English / اردو), ward counters, and simulated status tags.

## Components

### Buttons & CTAs
- **Primary Button:** Background in deep espresso (`#2D1E18`), crisp text in pure white/sand (`#F7F4EE`), full-width, `48px` minimum height, `rounded-xl` corners with smooth forward arrows or contextual icons.
- **Secondary / Ghost Button:** Transparent background, `1px solid #7A5A48`, label in `#2D1E18`.
- **Disabled State:** Warm oatmeal background (`#E5DFD5`), muted text (`#A19588`), zero elevation.

### Step Indicator (Progress Bar)
- **Container:** Horizontally spaced sequence spanning steps 1 to 4 (Location, Issue, Letter, Send).
- **Active / Completed Node:** 28px circular disc filled with deep espresso (`#2D1E18`) or forest green (`#3D5A40`), displaying step numbers or a clean checkmark.
- **Pending Node:** Muted beige circle with subtle hairline border (`#E5DFD5`) and muted body text (`#A19588`).
- **Connecting Tracks:** 2px stroke in `#2D1E18` when completed, fading into `#E5DFD5` for pending segments.

### Issue Selection Cards (Grid Choice)
- **Unselected State:** White surface background (`#FFFFFF`), `1px solid #E5DFD5`, dark espresso label, subtle secondary brown icon.
- **Selected State:** Warm parchment tint (`#EFECE4`), framed by a prominent `2px solid #2D1E18` outline, featuring a small top-right circular check icon.

### Form Inputs & Dropdowns
- **Field Surfaces:** White background (`#FFFFFF`), `1px solid #D9D2C7` border, `12px` rounded corners, with `16px` internal padding.
- **Placeholder & Value Text:** Placeholder in soft brown (`#968579`); active user input in deep espresso (`#2D1E18`).
- **Icons & Affordances:** Right-aligned chevrons, trailing email/lock icons rendered in `#7A5A48`.

### Civic Complaint Letter Container
- **Document Card:** Distinct white paper container styled with a warm interior border (`#E5DFD5`), generous `20px` internal padding, and structured letter formatting (Header metadata, formal address block, reference date, bold subject line, justified narrative body, and resident sign-off).
- **Draft Status Ribbon:** Top-right soft chip labeled "Draft · English" set in muted warm beige.

### Receipt & Confirmation Component
- **Confirmation Seal:** Centered circular badge (`64px`) in dark espresso (`#2D1E18`) or forest green (`#3D5A40`) with an inset checkmark.
- **Receipt Panel:** White container bordered in `#E5DFD5` displaying structured key-value pairings (Reference number, Timestamp, Category, Local Ward, and Authority routing details).