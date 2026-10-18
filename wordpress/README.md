# Exhale Osteopathy — WordPress / Elementor build

The approved design (`/source`) rebuilt as a WordPress site using native Elementor
containers and widgets. No page content lives in HTML widgets, iframes or PHP templates.

## Stack and dependencies

| Item | Version on staging | Notes |
|---|---|---|
| WordPress | 7.1.3 | |
| Hello Elementor (theme) | 3.5.1 | No child theme needed so far |
| Elementor | 4.3.5 | Classic containers + widgets (not the v4 "atomic" elements) |
| Elementor Pro | 4.3.2 | **Required (paid licence)**: Theme Builder header/footer, Mega Menu, Off-Canvas, Carousel, per-element Custom CSS, Site Settings Custom CSS |
| SiteGround Optimizer / Security / AI Studio / Wizard | host plugins | Pre-installed by SiteGround |
| SEO plugin | *not yet installed* | One plugin only (Yoast or Rank Math) — to decide |

## Where things live in WordPress

- **Site Settings (Elementor → Site Settings)**: global colours (Deep olive, Muted olive, Soft charcoal + Warm ivory, Warm stone, Mushroom), global fonts (Inter Tight / Inter, hosted locally), button style, 1280px content width, breakpoints 1180 / 980 / 560, and the site-wide **Custom CSS** (`site-custom.css` here — every rule is documented and switched on by a CSS class on an element).
- **Templates → Theme Builder**
  - *Exhale Header* — entire site. Logo, Mega Menu (Treatments, What We Treat), Book Now, ☰ button that opens an Off-Canvas full-screen menu.
  - *Exhale Footer* — entire site.
  - *Exhale Footer – Condition pages* — condition pages only (third column lists conditions, as in the design).
- **Pages** — one WordPress page per design page, using the live site's URLs where they exist.
- **Media Library** — all design photos/logos (`exhale-*.jpg/png`) and line icons (`exhale-icon-*.svg`). See `media-map.json`.

## How the pages were built

`build/*.js` run inside the Elementor editor and insert native elements with Elementor's own
commands. Page copy comes from the approved design source, extracted unchanged into `data/*.json`.
After the build, everything is edited normally in Elementor — the scripts are only a record of how it was made.

| Builder | Pages |
|---|---|
| `home.js` | Homepage |
| `treatment.js` + `data/treatments.json` | 11 treatment pages |
| `condition.js` + `data/conditions.json` | 11 condition pages |
| `practitioner.js` + `data/practitioners.json` | 5 team profiles |
| `header.js`, `footer.js` | Theme Builder header and footers |
| `pages.js` | About, Pricing, Contact, Birmingham, Blog listing, blog article (pelvic girdle pain) |

Blog: real WordPress posts in categories (Osteopathy, Pregnancy, Babies & Children, Conditions, Self-Care, Sports).
The Blog page uses Elementor Pro **Loop Grid + Taxonomy Filter** with three loop-item templates
(*Exhale Blog Card*, *Exhale Blog Featured Card*, *Exhale Blog Card Small*), so new posts appear automatically.
The four "suggested post" ideas from the design are saved as **draft posts** (drafts don't appear on the site).

## URL plan (live addresses kept where they exist)

| Page | WordPress URL | Live site today |
|---|---|---|
| Home | `/` | `/` |
| About | `/about` | `/about` |
| Pricing | `/our-fees` | `/our-fees` |
| Contact | `/contact-us` | `/contact-us` |
| Blog | `/blog-posts` | `/blog-posts` |
| Booking | Book buttons go straight to Cliniko | `/book` → **301** to Cliniko booking page |
| Osteopathy | `/osteopathy` | `/osteopathy` |
| Cranial Osteopathy | `/cranial-osteopathy` | `/cranial-osteopathy` |
| Baby & Paediatric | `/babies` | `/babies` |
| Sports Massage | `/massage` | `/massage` |
| Acupuncture | `/acupuncture` | `/acupuncture` |
| Pregnancy Osteopathy | `/pregnancy-osteopathy` | `/pregnacy-pain` → **301** |
| Back / Neck / Hip / Knee / Jaw pain, Headaches | same slugs | same |
| Foot & Ankle Pain | `/ankle-pain` | `/ankle-pain` |
| New: Physiotherapy, Laser, Rehab/Pilates, Shockwave, Ultrasound | `/physiotherapy`, `/laser-therapy`, `/rehab-pilates`, `/shockwave-therapy`, `/diagnostic-ultrasound` | — |
| New: Shoulder Pain, Sciatica, Sports Injuries, Tendon Problems | `/shoulder-pain`, `/sciatica`, `/sports-injuries`, `/tendon-problems` | — |
| New: team profiles | `/hafi-rahman`, `/zoe-goodwin`, `/freta-teklensenbet`, `/ankita-desai`, `/emre-tosun` | — |
| New: Birmingham landing page | `/osteopath-birmingham` | — |
| Blog posts (4) | same slugs | same |

### Draft 301 redirect map (to confirm before launch)

| From (live) | To |
|---|---|
| `/pregnacy-pain` | `/pregnancy-osteopathy` |
| `/book` | `https://exhale-osteopaths.uk2.cliniko.com/bookings?business_id=1358847506980544559#service` |
| `/faqs` | *decide*: no FAQ page in the approved design — suggest `/` or the most relevant page |

Permalinks are set to `/%postname%` (no trailing slash), matching the live site.

## WordPress IDs (staging)

| What | ID |
|---|---|
| Home | 11 |
| Treatments | Osteopathy 150, Physio 213, Massage 214, Laser 215, Cranial 216, Babies 217, Pregnancy 218, Acupuncture 219, Rehab 220, Shockwave 221, Ultrasound 222 |
| Conditions | Back 161, Neck 223, Shoulder 224, Hip 225, Knee 226, Foot & Ankle 227, Headaches 228, Sciatica 229, Sports Injuries 230, Tendon 231, Jaw 232 |
| Team | Hafi 168, Zoe 233, Freta 234, Ankita 235, Emre 236 |
| One-off pages | About 356, Our Fees 357, Contact Us 358, Osteopath Birmingham 359, Blog 360 |
| Posts | Pelvic girdle pain 400 (built), Why choose 399, Cranial babies 398, Early pregnancy 397 (text to import); drafts 393–396 |
| Theme Builder | Header 127, Footer 105, Footer – Condition pages 186 (all 11 condition pages) |
| Loop items | Blog Card 401, Featured Card 407, Card Small 410 |

## Status

See the conversation for the current, tested status of each page. Staging is set to
"Discourage search engines"; this must be switched off at launch.

## Birmingham page — editorial checklist (to confirm before launch)

- [ ] Launch address: page shows **1 Sutton Oak Corner, Streetly, Sutton Coldfield, B74 2DH** (inside Sutton Hearing Care). Switch to 247A Jockey Road, B73 5XE only once the new premises are open (`BH_ADDRS` in `pages.js`, plus footer and Contact).
- [ ] Parking details (not shown on the page until confirmed).
- [ ] Step-free / pram access details (not shown until confirmed).
- [ ] Public transport / travel information (not shown until confirmed).
- [ ] Verified Google reviews link — the button currently opens a Google Maps search for "Exhale Osteopathy Sutton Coldfield".
- [ ] Which practitioners work at the Sutton Coldfield clinic (all five are shown).
- [ ] Pregnancy and baby/children appointments available at Sutton Coldfield; baby appointments with Hafi.
- [ ] Emre's headshot (grey card until supplied).
- [ ] Appointment lengths and prices (removed from this page; still on the Pricing page).
- [ ] SEO title and meta description (needs the SEO plugin): "Osteopath Birmingham | Exhale Osteopathy, Sutton Coldfield" / "Looking for an osteopath in Birmingham? Visit Exhale in Sutton Coldfield for osteopathy, physiotherapy and sports massage. Meet the team and book online."
- [ ] At launch: indexable, self-referencing canonical on the live domain, included in the XML sitemap, LocalBusiness/MedicalClinic schema for the one real clinic (no separate Birmingham branch).

## New Patients page (/new-patients)

- SEO title: `New Patients: Your First Appointment | Exhale Osteopathy` (55 chars)
- Meta description: `New to Exhale Osteopathy? See what happens at your first appointment in Sutton Coldfield or Lichfield, how long it takes, fees, what to wear and how to book.` (156 chars)
- Linked from: homepage hero and booking card ("New Patients", "Your First Visit"), Pricing booking card.
- To confirm: accepted payment methods, insurers you're registered with, parking at each clinic, whether the same fees apply to every practitioner.
