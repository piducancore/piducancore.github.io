# piducan.dev

Personal project collection for **piducancore**. Live at https://piducan.dev/.

## Develop

Node 22 or later. The site has no runtime or build dependencies.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321/. The development server rebuilds on page navigation;
refresh the browser after edits. `npm run preview` serves a fixed production build.

```sh
npm test
npm run build
```

## Edit the collection

Edit `src/projects.mjs` to add or change projects. Keep descriptions factual and
use verified public URLs. Projects without a verified live site link to their
source repository. `featured: true` selects the audio features; `downloads`
adds a project to the downloads hub. Project artwork lives in `src/render.mjs`.

- `src/render.mjs`: semantic page templates and geometric artwork.
- `public/assets/style.css`: responsive design system.
- `public/assets/site.js`: progressive enhancement for filtering and signal remix.
- `scripts/build.mjs`: explicit static output, custom domain, sitemap, robots.
- `tests/site.test.mjs`: routing boundaries, no-JS discovery, escaping, build assets.
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/`: product facts and design documentation.

## Hosting and release boundaries

This is the account site repository, `piducancore/piducancore.github.io`.
GitHub Pages uses **GitHub Actions** and the existing custom domain **piducan.dev**.
The Website workflow tests and builds pull requests; main-branch pushes and manual
runs publish `dist/`. Only public build output is uploaded. Project documentation,
local paths, and design working files never ship.

The root build owns `/`, `/downloads/`, `/404.html`, and root assets. It does not
create folders or redirects for other project sites:

| Path | Owner |
| --- | --- |
| `/picadura/` | `piducancore/picadura` |
| `/buffer-uppercut/` | `piducancore/buffer-uppercut` |
| `/orgdot-webfonts/` | `piducancore/orgdot-webfonts` |

Those repositories keep their own Pages builds, GitHub Releases, release workflows,
and download catalogs. The root downloads hub links to those catalogs instead of
copying version numbers or binary URLs, so new releases require no root-site update.
Do not replace the account Pages domain, add catch-all routing, or publish the
projects' folders from this repository.

## Theme

The header offers System, Light, and Dark. System follows the device preference,
including changes while the page is open. Explicit choices use localStorage
and apply before the stylesheet renders. Without JavaScript, the device theme
still applies through CSS. Theme settings do not alter the independent project sites.

## Fonts and privacy

Archivo and Unbounded are self-hosted under the SIL Open Font License. License
texts ship beside the font files in `public/assets/`. Fonts were sourced from
Google Fonts; see `public/assets/SOURCES.md`. All artwork is original geometric
SVG, not a representation of a plugin's interface. No analytics, cookies, remote
font requests, client-side GitHub API calls, or autoplay audio.

## Rollback

Revert the relevant commit on `main`; the Website workflow republishes that version.
The earlier starter is retained in Git history. The old sample blog posts were
unmodified template content and are not represented as personal writing.
