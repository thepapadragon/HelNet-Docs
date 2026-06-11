# HelNet Docs — Fix Tracker

All issues from the docs site audit. **Fix pass completed 2026-06-11** — every item below is
resolved unless marked otherwise.

---

## Resolved

| # | Item | Resolution |
|---|---|---|
| 1 | Active nav class (`.active` vs `.nav-active`) | Standardized on `.active`. Stale `nav-active` in status.html / transmissions.html renamed. `Assets/nav.js` also applies `.active` automatically by URL on every page, so static classes are optional. |
| 2 | Missing nav cross-links | Every page's desktop nav is now: Legal ▾, Guides ▾, Transmissions, Status, Credits (no "Home" — the logo links home). Every mobile nav has a Navigation section with Home, Transmissions, Status, Credits (index omits Home since it *is* home). |
| 3 | status.html mobile nav `<ul>` markup | Rebuilt with the standard `div.nav-mobile-section` + `.nav-mobile-label` pattern (transmissions.html had the same problem — also fixed). |
| 4 | Hamburger breakpoint + touch dropdowns | `.nav-links` hide / `.nav-hamburger` show moved from 480px to 768px in shared.css. Dropdowns now also open via click/tap: `.nav-dropdown.open` CSS in shared.css + toggle logic in nav.js (closes others, closes on outside click). Hover still works on desktop. |
| 5 | State color variables | Added to shared.css `:root`: `--red: #ff4444`, `--red-dim: #ff6666`, `--red-soft: #ff9999`, `--amber: #ffaa00`. All hardcoded occurrences in page styles replaced. |
| 6 | CSS variable drift in guide pages | Guide pages no longer define `:root` at all; shared.css values (`--green-faint: 0.08`, `--border: 0.2`) are canonical. |
| 7 | Duplicated `:root`/CRT/nav/footer rules in inline styles | Stripped from index.html and all 7 guide pages (the other 5 pages had already been cleaned). Inline `<style>` blocks now contain only page-specific rules. shared.css owns all globals. |
| 8 | Google Fonts `display=swap` | Already present on all 13 pages (fixed before this pass). |
| 9 | Empty `alt` attributes | Nav logo `alt=""` → `alt="HelNet Logo"` on credits, terms, privacy. |
| 10 | Footer standardization | Two documented variants, both owned by shared.css (see comment above the footer section there): **full** (3-column: index + guide pages) and **compact** (`<footer class="compact">` with `.footer-bottom` only: credits, terms, privacy). status.html and transmissions.html had no footer at all — compact footer added. `.support-btn` / `.credit-card` etc. moved into shared.css so the full footer needs no inline CSS. |
| 11 | Page template split | **Decision: the split is intentional and permanent.** Main pages (index, status, transmissions, credits, legal) use the full-width `.page-wrap` template; guide pages use the sidebar template. New top-level pages copy status.html; new guides copy a module guide page. |

## Notes / remaining niceties (not blocking)

- shared.css `.status-bar` z-index (10001) is now unambiguous — the inline override in index.html was removed along with its duplicate block.
- Page `<title>` em-dash spacing was already consistent (` — HelNet`) across all pages; the audit note was stale.
- ~~Guide pages and index.html embed large base64 images inline (some single lines >600 KB). Swapping them for the files already in `Assets/` would cut page weight dramatically — candidate for a future pass.~~ **Done.** All data URIs in index.html, the 7 guide pages, and credits.html now reference `Assets/` files (each mapping verified by decoding and comparing the embedded image to the asset). Pages dropped from ~2 MB to 10–50 KB. The credits profile picture was a unique signed variant not present in Assets — exported as `Assets/PapaDragon-creditPFP.png`.
