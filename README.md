# Exhale Osteopathy — approved website design (backup)

Backup date: 17 October 2026
Source: the published "Exhale Osteopathy Website" design canvas on claude.ai
(artifact Q5GZhbKfMeguoBGf3sxj83, published version 1792262177-4aab).

This is the **approved design, frozen**. Treat it as the reference and do not edit it.
The WordPress/Elementor build is made from a separate copy.

## View it in your browser

1. Unzip this folder anywhere.
2. Open a terminal in the folder and run:
   - Mac / Linux: `python3 serve.py`
   - Windows: `py serve.py`
3. Your browser opens http://localhost:8765/ with a list of every page.
   Click through; the menus, mega menus, mobile menu, tabs and carousels all work.
   To see the mobile layout, narrow the browser window or use your browser's device view.

All you need is Python 3, which is already on most Macs. The fonts load from Google Fonts,
so connect to the internet for exact typography. Copies of the fonts are in `assets/fonts/`.

Opening the `.html` files directly by double-clicking will **not** work. They need the
small local server above, because the pages share templates and load images by ID.

## What's inside

| Folder / file | Contents |
|---|---|
| `source/` | The 34 page files exactly as published (`*.dc.html`) and `canvas.json` (board layout, page titles, SEO notes). `support.js` is the design runtime that renders them. `_canvas-shell-index.html` is the canvas viewer shell, for reference only. |
| `assets/blob/` | All 58 images and logos used by the design, named by their asset ID. These are byte-identical to the design's image library; checksums were verified. |
| `assets/named/` | The same 58 images under readable names (e.g. `hero.jpg`, `p_hafi.jpg`). |
| `assets/asset-map.csv` | Maps asset ID → readable name → size. |
| `assets/fonts/` | Inter and Inter Tight (weights 400/500/600, the only weights the design uses), `fonts.css` and the SIL Open Font Licence. |
| `assets/original-uploads/` | Your original full-resolution clinic photo (DSC04871.jpg). |
| `SEO-NOTES.md` | Meta titles/descriptions from the canvas notes, plus the full page list. |
| `serve.py` | Local viewer (above). |
| `MANIFEST.sha256` | Checksum of every file, so you can confirm nothing has changed. |

## How the source is organised

The design uses shared templates, so these files hold the content:

- `Main.dc.html` is the homepage. `About`, `Pricing`, `Contact`, `Birmingham`, `Blog` and `BlogPost` are their own pages.
- `Service.dc.html` is the treatment template. All 11 treatments' copy is inside it.
  `Physiotherapy.dc.html`, `Massage.dc.html` and the rest are one-line wrappers that pick a treatment.
- `Practitioner.dc.html` is the team-member template, holding Hafi, Zoe, Freta, Ankita and Emre. Wrappers: `Zoe`, `Freta`, `Ankita`, `Emre`.
- `Condition.dc.html` is the condition template, holding all 11 conditions. Back pain is the default. Wrappers: `Neck-Pain` and the rest.
- `Birmingham.dc.html` has a "Clinic address" switch: 247A Jockey Road (default) or 1 Sutton Oak Corner.

Colour palette: ivory #F5F2EA, stone #E6E0D5, deep olive #4F5945, muted olive #7B826C,
mushroom #B7AA99, soft charcoal #272B26.
Fonts: Inter Tight for headings, Inter for body text.
Responsive breakpoints:
- 1180px: the desktop menu switches to the ☰ menu.
- 980px: carousels become swipeable.
- 560px: phone typography and spacing.
- 380px.

## Known placeholders (unchanged from the approved design)

The design still contains `[bracketed]` placeholders for:
- prices for physio, laser, acupuncture, rehab, shockwave and ultrasound
- registration numbers and bios
- Emre's photo
- some treatment and Lichfield photos
- parking details and insurers
- genuine reviews
- Exhale's social links
- blog authors and dates

The Jockey Road address is not yet confirmed.

## Verify the backup

Mac/Linux: `shasum -a 256 -c MANIFEST.sha256`. Every line should say `OK`.

## Not included

Full-page screenshots were left out of this backup at your request. They can be added as a
separate download.

## Online preview (GitHub Pages)

`docs/` is a browser-ready copy for GitHub Pages: https://hafi2-cpu.github.io/exhale-osteopathy-website/
It is generated from `source/` and is not the approved reference. Differences from `source/`:
- image paths are rewritten to relative `assets/<id>.jpg`
- `noindex` tags and a `robots.txt` are added so search engines don't list it
- a mobile `viewport` tag is added so phones use the responsive layout

The pages, layout, copy and styles are otherwise unchanged. `source/` remains the frozen approved design.

## Copy style
- No em dashes (—) or en dashes (–) as sentence punctuation. Use full stops, commas, colons or connecting words.
  En dashes are fine only for genuine ranges (09:00–20:00, 45–60 mins, Mon–Fri). Rewrites applied 25 Oct 2026: see seo/dash-rewrites.json.
