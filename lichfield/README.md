# Lichfield Osteopathic Practice: sister site build

Same design and layout as the Exhale Osteopathy WordPress/Elementor build (`wordpress/` on main),
recoloured to the live lichfield-osteopaths.co.uk palette, with Lichfield content. Lives on the
`lichfield-site` branch only; nothing on main or in `wordpress/` is changed by it.

- Staging: https://hafir63.sg-host.com (search engines discouraged, every page noindex)
- Live site (never edited from here): https://www.lichfield-osteopaths.co.uk

## Stack on staging
Hello Elementor 3.5.1 · Elementor 4.3.5 · Elementor Pro 4.3.2 (licence active) ·
Elementor "Unfiltered File Uploads" enabled (line icons are SVG, uploaded through Elementor's sanitiser).
Permalinks `/%postname%/` (trailing slash, as on the live site). SEO plugin not installed yet: the live site uses Rank Math.

## Colours (Elementor Site Settings → Global Colours)
| Global | Hex | Use |
|---|---|---|
| Primary | #6F6E4A | Olive (deep): buttons, links, eyebrow labels, olive sections |
| Secondary | #949366 | Olive (live brand colour): Book Now buttons and booking cards, with near-black text |
| Text | #3D3937 | Charcoal: text and dark sections |
| Accent | #D7D6A4 | Pale olive: labels and links on dark backgrounds |
| Cream / Sand / Lines / Near black | #F4EFEB / #EAE3DD / #C9C1BB / #1F1F1F | Backgrounds, panels, rules |

The builders keep the Exhale design's colour values; `build/lib.js` maps them to these colours
(and links them to the Global Colours) as each section is inserted.

## WordPress IDs (staging)
| What | ID |
|---|---|
| Home (front page) | 30 |
| Osteopathy / Baby & Paediatric / Massage | 31 / 32 / 33 |
| Our Fees (/pricing/) / Contact / Meet the Team | 34 / 35 / 36 |
| Freta / Emma / Hafi / David / Zoe / Emre | 37 / 38 / 39 / 40 / 41 / 158 |
| About / New Patients | 153 / 154 |
| Physiotherapy / Acupuncture / Laser Therapy | 155 / 156 / 157 |
| Conditions: back, neck, shoulder, hip, knee, foot & ankle, headaches, sciatica, sports injuries, tendon, jaw | 159 to 169 |
| Theme Builder header / footer (entire site) | 75 / 76 |

## Rebuilding a page
Open the page in Elementor, then in the browser console:
```js
window.EX_BASE = 'https://raw.githubusercontent.com/hafi2-cpu/exhale-osteopathy-website/<commit>/lichfield/';
window.EX_JOB = { kind: 'treatment', key: 'osteo', publish: true }; // or home | page (pricing, contact, team, about, newPatients) | practitioner (freta...) | condition (back...) | header | footer
fetch(EX_BASE + 'build/run.js').then(r => r.text()).then(eval);
```
Rebuilding replaces the page's content, so manual Elementor edits on that page would be lost.

## Menu
Same as Exhale: About, Treatments, What We Treat, Our Team, New Patients, Pricing, Contact (Exhale's header, see-through over each page's dark hero).

## Content rules
Copy comes from the live Lichfield pages (28 Oct 2026), with dashes rewritten. Condition, physiotherapy, acupuncture and laser pages and Emre's profile are adapted from the approved Exhale copy, with Sutton and Birmingham references, evening-appointment claims and treatments Lichfield doesn't offer (shockwave, ultrasound, rehab/Pilates) removed. No reviews,
qualifications or claims are added; Exhale template sections that would need new facts
(review placeholders, quotes, "outside the clinic") are left out.

## SEO and redirects
See `seo/url-plan.md`.

## Redesign on the new Exhale design (23 Nov 2026)

The whole staging site now uses the new Exhale design that went live on exhaleosteopathy.co.uk, recoloured to Lichfield olive.

- `redesign/xf.js`: the engine. It covers:
  - the colour map (Exhale forest green/gold to dark olive/olive gold, plus a hue shift for one-off shades);
  - the link map (Exhale pages Lichfield doesn't have are dropped);
  - the image and icon maps;
  - phone, hours and email swaps;
  - insert and save.
- `redesign/recipes.js`: home, header, footer, kit, and the Customizer CSS.
- `redesign/pages.js`: the treatment, condition and practitioner templates, filled from `data/*.json`.
- `redesign/pages2.js`: About, Meet the Team, New Patients, Pricing, Contact, `/treatments/` and `/conditions/`.
- `redesign/run.js`: the loader. Set `XF_BASE`, `XF_JOB` and `XF_ARG` in the Elementor editor, then poll `XS`.
- Exhale's Elementor JSON and Customizer CSS were read (GET only) from the live Exhale admin and are kept in hafir63's localStorage (`EXB64`, `EXB64b`, `EXCSS`). To refresh them, repeat that hand-over. Nothing on Exhale is changed.
- New staging pages: Treatments 374, Conditions 375.
- Left out until supplied:
  - reviews;
  - laser and acupuncture prices;
  - insurer list;
  - payment and cancellation policy;
  - Emre's days.

### Exhale photos (23 Nov 2026)
- 52 of Exhale's treatment and condition photos were copied into Lichfield's media library through an Elementor template import. Hafir63 downloaded the public image files, and nothing on Exhale changed.
- `exhale-image-map.json` maps each Exhale file name to its Lichfield copy. Each page now uses the same photos as its Exhale counterpart.
- Some photos were not copied: Exhale team and clinic photos, staff portraits, logos, and the pregnancy and Pilates images.
- Copying the photos left import templates in Templates > Saved Templates, titled lop-img-*: IDs 384, 392, 400, 408, 416, 424, 432, 440, 448 and 452. They can be deleted. The images stay.
- Pages are now written through the REST API (`_elementor_data`), followed by Elementor > Tools > Regenerate CSS.
