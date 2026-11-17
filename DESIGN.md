---
name: piducancore
description: Graphite surfaces, drafting typography, and actual project interfaces.
colors:
  action-text: "#ffffff"
  chip-face: "#faf9f6"
  chip-edge: "#d8d7d0"
  dark-chip-face: "#30332e"
  dark-chip-edge: "#191b18"
  accent: "#444b42"
  paper: "#f4f3ef"
  ink: "#262823"
  muted: "#60625b"
  line: "#c7c9c1"
  dark-ground: "#1c1e1b"
  dark-ink: "#eeeee7"
  dark-muted: "#b6b9af"
  dark-line: "#454941"
  dark-accent: "#d4d8c9"
typography:
  display:
    fontFamily: "SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace"
    fontSize: "clamp(32px, 4.1vw, 57px)"
    fontWeight: 400
    lineHeight: 1.18
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.03em"
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  title:
    fontFamily: "SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace"
    fontSize: "23px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.035em"
  label:
    fontFamily: "SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  frame: "3px"
  action: "4px"
  theme: "8px"
  filter: "13px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.action-text}"
    rounded: "{rounded.action}"
    padding: "13px 20px"
  filter:
    backgroundColor: "{colors.chip-face}"
    textColor: "{colors.ink}"
    rounded: "{rounded.filter}"
    padding: "11px 18px"
  metadata:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
spacing:
  group: "24px"
  column: "32px"
  section: "80px"
---

# Graphite + Drafting

## Overview

**Creative North Star: "Graphite + Drafting"**

A personal project index, with technical headings and plain descriptions. Visible identity is **piducancore**. piducan.dev is the address. Avoid sales copy, claims of superiority, invented biography, and self-deprecation.

## Colors
Warm paper, graphite text and controls in light mode; charcoal, pale text and neutral controls in dark mode. Accent color is reserved for interaction and focus. Theme defaults to System, follows OS changes, and persists explicit Light/Dark choices. Screenshots retain their original colors.

## Typography
Use the native monospace stack above for headings, navigation, identity, filters, and metadata. Archivo is self-hosted for descriptions and actions. Section headings are uppercase with modest tracking; project names keep their authored capitalization. Category filters and badges share the same authored labels: Audio, Web, Words, Maps. Metadata preserves normal casing and acronyms. Main headings use tight tracking and regular weight. On mobile the home heading uses clamp(28px, 7vw, 40px) to preserve its two-line composition at 320px. Project titles are 23px, index titles 21px, and labels 12px.

## Layout
The centered container is at most 1440px, with fluid 22–56px gutters. The intro places a short note alongside the title on wide screens and stacks below 1000px. Major sections are separated by 80px, reduced to 56px on mobile. Related labels are 8px apart, descriptions follow at 12px, and feature titles sit 20px below screenshots (16px on mobile).

Features use equal columns with a 32px gap and stack below 760px. Titles, metadata, descriptions, and action rows align across features. The index uses category, description, technology, and a 90px destination-link column; mobile moves category above the title and omits redundant technology. Navigation stays visible, forming a deliberate two-column grid below 360px. Identity and its sound clue form one group; the theme controls occupy the other column, keeping both together above navigation. Downloads stack below 760px. All content reflows without horizontal scrolling.

### Screenshots
Use actual UI screenshots from the child sites. Preserve the complete interface in 8:5 frames with object-fit:contain, intrinsic dimensions, descriptive alt text, and no enlargement or rotation. Provenance is recorded in public/assets/projects/SOURCES.md. Never replace screenshots with invented abstract artwork or copy child project release binaries into the root site.

### Interaction and accessibility
Use explicit project, download, installation, and source links. Interactive targets generally have a minimum 44px height. Keyboard focus is a 3px accent outline with 5px offset. Filters expose aria-pressed and a visible live result count; all projects remain visible without JavaScript. The project list owns its bottom border so filtering does not leave it open. Respect reduced motion, preserve Light/Dark/System theme selection, and keep screenshots and controls usable in both themes.

## Elevation & Depth
Flat page surfaces and fine rules; shallow shadows are reserved for interactive filters. No decorative wave banner. Actions have slightly rounded corners; filters retain their established shapes. Index links explicitly say Site or Source, with a small arrow and a 44px target height. No temporary palette or typography selectors ship.

Theme control: a 44px sun/moon button and compact auto button. A circular reveal expands from the button when switching explicitly; reduced motion and unsupported browsers switch instantly. Auto follows the system preference.

Project filters use raised graphite chips with a pressed selected state, inspired by Pin UI Chips. Noninteractive metadata is plain 12px technical text, without a filled background or shadow. Feature metadata uses a fine divider; only filters use raised chips.

## Shapes

Screenshot frames and mixer buttons use 3px corners, primary actions 4px, theme buttons 8px, and filter chips 13px. Sound clues are circular 44px controls. Index destination links are unboxed text with arrows.

## Components

### Primary actions and text links
Primary download actions use the accent background and action-text foreground, 4px corners, 13px 20px padding and a minimum 44px height. Hover uses ink on paper in reverse. Text actions remain unboxed, use bold Archivo, and underline on hover. Keyboard focus uses the shared 3px accent outline with a 5px offset.

### Project filters
Raised 13px technical text chips have 11px 18px padding (10px 13px on mobile), a 44px minimum height, and 12px gaps. Hover lifts them 2px; selected and active chips move down 3px and invert ink/paper. Selection is exposed with aria-pressed and a visible live result count. Reduced motion disables transitions.

### Metadata
Plain 12px technical text in the muted color, with no background, shadow, or pointer behavior. Feature metadata has 8px gaps and a 1px divider between values. Category labels use authored casing.

### Project features and index rows
Features are unboxed articles with actual screenshots contained in 8:5 frames. Titles link to the project; actions explicitly identify exploration and downloads. Index rows have fine horizontal rules, 24px vertical padding (20px mobile), and explicit Site or Source links. Descriptions use muted Archivo; technology metadata is omitted on mobile.

### Navigation
Desktop navigation uses 14px technical text, 44px link heights, and 28px gaps (20px below 1000px). Hover and the current page are underlined. At 760px and below, identity and the sound clue share the first column and theme controls occupy the second; navigation spans the row beneath. Below 360px navigation forms two columns.

### Theme control
A 44px icon button switches Light/Dark; Auto restores the system preference and exposes aria-pressed. Its 8px corners and line-color hover background distinguish it from plain navigation. Sun/moon icons transition over 220ms/150ms. The 520ms pixelated theme dissolve spreads from the theme button in crisp square tiles and falls back to an instant switch with reduced motion or without browser support.

### Hidden beat controls
Circular sound clues reveal a fixed, scrollable dock capped at 75dvh. Mixer buttons use 3px corners, fine rules and ink/paper inversion when pressed. Native range inputs use the accent color and 44px minimum height, with a 3px focus offset. Track columns change from four to two on mobile. Preserve playback, mute, multi-solo, master effects and reset behavior.

## Do's and Don'ts

- Do keep the Graphite palette, technical headings and Archivo descriptions.
- Do use actual project screenshots and factual project data.
- Do distinguish interactive filters from passive metadata.
- Do preserve keyboard focus, reduced motion and Light/Dark/System preferences.
- Don't invent biography, release availability, promotional claims or artwork.
- Don't copy child-site release artifacts into the root deployment or change their routes.
- Don't add decorative wave banners or temporary design selectors.
