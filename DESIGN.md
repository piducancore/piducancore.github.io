---
name: piducancore
description: An expressive collection of software, sound, and experiments.
colors:
  blue: "#293ccb"
  lilac: "#d8d4e5"
  orange: "#c9a28b"
  green: "#d9dfcf"
  paper: "#f5f5f0"
  ink: "#22251f"
  muted: "#5b6058"
  line: "#c9ccc3"
  warm-ink: "#372019"
  white: "#ffffff"
  dark-ground: "#191b20"
  dark-ink: "#f0f0e9"
  dark-muted: "#b5b8b0"
  dark-line: "#42464d"
  dark-accent: "#b5a6ff"
  dark-about: "#302a43"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(38px, 4.8vw, 66px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "27px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  action:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.55
rounded:
  artwork: "3px"
  button: "4px"
  control: "30px"
  circle: "50%"
spacing:
  tight: "8px"
  compact: "12px"
  group: "24px"
  column: "32px"
  page: "56px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "13px 20px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-remix:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 17px"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "8px 17px"
  filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  row-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    width: "44px"
    height: "44px"
---

# Design System: piducancore

## Overview

**Creative North Star: "A personal software index"**

Regular-weight Archivo headlines and geometric signal art give this collection its own voice. Quiet paper supports legible project information; broad color fields give the expressive material room. The system is flat, direct, and playful without imitating the interfaces of the audio tools it presents.

Dense lists and spacious features share the same type, palette, and link language. The existing project sites retain independent identities; this system describes the personal hub, not a retroactive redesign of those products.

**Key Characteristics:**

- Restrained Archivo hierarchy with plain, readable body type.
- Lavender, green, and orange fields with crisp vector geometry.
- Flat surfaces, fine separators, and explicit text actions.
- Responsive reflow with visible keyboard focus and reduced-motion support.

## Colors

### Primary

**Signal blue** identifies interactive emphasis, focus, selected text, and cool linework. Primary download buttons use white text against blue; hover changes the background to ink.

### Secondary

**Lavender** carries large expressive surfaces. **Pale green** and **muted clay** distinguish project artwork. Green pairs with blue linework; orange pairs with warm ink. Their purpose is page-scale material, not a collection of small status badges.

### Neutral

**Paper** is the page ground. **Ink** carries headings and primary text. **Muted** carries secondary text on paper. **Line** separates list rows and outlines small controls. **White** is reserved for high-contrast action text.

**The Field Rule.** Give expressive color a complete surface; keep the surrounding project information on paper.

### Dark theme

Dark mode uses charcoal reading surfaces, pale text, muted secondary text, and a lavender interactive accent. The about section shares the page ground and uses a fine top rule. Artwork keeps its original colors and dark linework; primary buttons use dark text on lavender. System is the default and follows live operating-system changes. Explicit Light or Dark choices persist locally and apply before rendering. The native theme selector appears on every page, beside the wordmark on mobile.

## Typography

Archivo is the self-hosted face for headings, identity, reading, and actions. Arial and sans-serif remain fallbacks, not the intended display identity. Regular and bold weights are sufficient; there is no decorative monospace role.

The frontmatter records the desktop hierarchy. Project-list titles use 22px. The main headline uses 40px on mobile and 36px below 430px. Section headings use 25–26px. Body copy is generally 16–17px, with shorter list summaries at 14–15px. General paragraph measure is capped at 70ch; feature summaries are intentionally shorter.

**The Type Hierarchy Rule.** Use regular Archivo for the main headline and bold Archivo for identity, section headings, and project names.

## Layout

The centered page container has a maximum width of 1440px and desktop gutters of 56px. Gutters become 32px at 1100px and 22px at 760px. Related controls use compact gaps; major content sections receive substantially more separation.

Desktop feature pairs use equal columns with a 32px gap. The project index uses category, description, technical detail, and a circular link column. At 760px, features and explanatory sections stack; project rows retain the title and summary beside the link, move category above the title, and omit redundant technical detail. Navigation wraps without becoming a hidden menu; below 430px its links occupy a dedicated row.

Downloads pair a 330px artwork region with text on desktop, narrow it to 280px at tablet widths, then stack it above the description on mobile. Actions wrap naturally.

## Elevation & Depth

There are no shadows. Large flat color fields, white space, and fine rules supply separation. Circular link controls provide contrast against artwork without pretending to float above it.

**The Flat Surface Rule.** Use color and spacing for separation; do not add shadows to these existing patterns.

## Shapes

Artwork fields have almost square corners. Primary actions are lightly rounded; small filter and remix controls are pill-shaped. Project-row navigation uses circles. Icons are authored SVG strokes, normally 20px, with consistent 1.7px stroke weight for navigation and download arrows.

Geometric linework is abstract artwork, not a screenshot, measurement, or representation of a plugin's actual UI.

## Components

### Primary actions

Blue surfaces with white bold Archivo text, a trailing SVG, and compact rectangular corners. Hover changes blue to ink. Keyboard focus uses a 3px blue outline separated from the component by 5px. Disabled buttons reduce opacity to half and remove the pointer cursor.

### Text links

Bold inline text and a small trailing arrow carry exploration actions. Hover introduces an underline and blue text. Ordinary prose links retain visible underlines with a 4px offset.

### Filter controls

Outlined pills show a category and its count. Selected state reverses to ink with paper text and exposes `aria-pressed`. Counts are secondary. Controls wrap on small screens; they are hidden until JavaScript has enabled filtering, leaving the full collection available without it.

### Project features and rows

Feature artwork sits above an unboxed name, description, and explicit project/download links. Artwork hover enlarges the geometry by 2.5% over 650ms with exponential ease-out. Index rows use fine top separators and a circular 44px destination link; its hover changes to blue with paper-colored artwork. Link transitions take 200ms.

### Navigation

The header and footer identify the person as piducancore in bold Archivo. The domain is an address, not a brand. Navigation is small Archivo text with no resting underline; hover and the current page introduce an underline. It stays visible on mobile.

### Signal control

A paper-colored remix pill sits in a lavender field. Hover reverses it to ink and paper. The control changes the geometric composition without playing sound, with a live text announcement of the selected pattern. It does not start automatic animation. Reduced-motion preferences remove transitions and smooth scrolling throughout the site.

## Do's and Don'ts

### Do:

- Do use large color fields and precise vector geometry for expressive material.
- Do keep titles, descriptions, and destination links readable independently of artwork.
- Do preserve explicit keyboard focus and visible navigation at narrow widths.
- Do let layouts and action groups reflow instead of clipping content.

### Don't:

- Don't imply that abstract signal artwork is actual plugin output or interface imagery.
- Don't add shadows to the existing flat component patterns.
- Don't introduce brand slogans or promotional filler.
- Don't apply this hub's design to independently maintained project sites without a separate redesign brief.

## Voice
Write as a person sharing things they enjoyed making. Explain what a project does and, when known, what interested the owner about it. Avoid sales pitches, superlatives, claims of genius, and self-deprecation.
