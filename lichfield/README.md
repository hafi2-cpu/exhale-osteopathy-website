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
