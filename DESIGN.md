---
name: piducancore
description: Graphite surfaces, drafting typography, and actual project interfaces.
colors:
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
    letterSpacing: "-0.045em"
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
spacing:
  group: "24px"
  column: "32px"
  section: "80px"
---

# Graphite + Drafting

A personal project index, with technical headings and plain descriptions. Visible identity is **piducancore**. piducan.dev is the address. Avoid sales copy, claims of superiority, invented biography, and self-deprecation.

## Palette and themes
Warm paper, graphite text and controls in light mode; charcoal, pale text and neutral controls in dark mode. Accent color is reserved for interaction and focus. Theme defaults to System, follows OS changes, and persists explicit Light/Dark choices. Screenshots retain their original colors.

## Typography
Use the native monospace stack above for headings, navigation, identity, filters, and metadata. Archivo is self-hosted for descriptions and actions. Section headings are uppercase with modest tracking; project names keep their authored capitalization. Main headings use tight tracking and regular weight. On mobile the home heading uses clamp(24px, 7.1vw, 40px) to preserve its two-line composition at 320px. Project titles are 23px, index titles 21px, and labels 12px.

## Layout and spacing
The centered container is at most 1440px, with fluid 22–56px gutters. The intro places a short note alongside the title on wide screens and stacks below 1000px. Major sections are separated by 80px, reduced to 56px on mobile. Related labels are 8px apart, descriptions follow at 12px, and feature titles sit 20px below screenshots (16px on mobile).

Features use equal columns with a 32px gap and stack below 760px. Titles, metadata, descriptions, and action rows align across features. The index uses category, description, technology, and a 44px link column; mobile moves category above the title and omits redundant technology. Navigation stays visible, forming a deliberate two-column grid below 360px. Downloads stack below 760px. All content reflows without horizontal scrolling.

## Screenshots
Use actual UI screenshots from the child sites. Preserve the complete interface in 8:5 frames with object-fit:contain, intrinsic dimensions, descriptive alt text, and no enlargement or rotation. Provenance is recorded in public/assets/projects/SOURCES.md. Never replace screenshots with invented abstract artwork or copy child project release binaries into the root site.

## Interaction and accessibility
Use explicit project, download, installation, and source links. Interactive targets generally have a minimum 44px height. Keyboard focus is a 3px accent outline with 5px offset. Filters expose aria-pressed and a live result count; all projects remain visible without JavaScript. The project list owns its bottom border so filtering does not leave it open. Respect reduced motion, preserve native theme selection, and keep screenshots and controls usable in both themes.

## Surface finish
Flat surfaces, fine rules, no shadows, no decorative wave banner. Actions have slightly rounded corners; filters and circular project links retain their established shapes. No temporary palette or typography selectors ship.
