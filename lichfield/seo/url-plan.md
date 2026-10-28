# Lichfield Osteopathic Practice: URL plan and redirects

Live site crawled 28 Oct 2026 (Rank Math sitemap, 26 URLs). Live permalinks end in a slash,
so staging uses `/%postname%/` too. Every live URL either keeps its address on the new site
or gets a 301 to the closest page.

## Kept (same URL on the new site)

| URL | Live title | New page |
|---|---|---|
| `/` | Lichfield Osteopathic Practice | Homepage |
| `/osteopathy/` | Osteopathy - LOP | Osteopathy (treatment template) |
| `/peadiatric-osteopathy/` | Peadiatric Osteopathy - LOP | Baby & Paediatric (Cranial) Osteopathy. Slug kept as spelt, it is the indexed URL |
| `/massage/` | Massage - LOP | Massage (treatment template) |
| `/pricing/` | Pricing — Lichfield Osteopathic Practice | Our Fees |
| `/contact/` | Contact — Lichfield Osteopathic Practice | Contact |
| `/meet-the-team/` | Meet The Team — Lichfield Osteopathic Practice | Meet the Team |
| `/hafi-rahman/` | Hafi Rahman — Lichfield Osteopathic Practice | Profile |
| `/david-brown/` | David Brown B.Sc. (Hons) Ost — Lichfield Osteopathic Practice | Profile |
| `/emma-thompson/` | Emma Thompson - LOP | Profile |
| `/zoe-goodwin/` | Zoe Goodwin - LOP | Profile |

## New pages (not on the live site)

| URL | Suggested title |
|---|---|
| `/about/` | About Us \| Lichfield Osteopathic Practice |
| `/new-patients/` | New Patients: Your First Appointment \| Lichfield Osteopathic Practice |
| `/physiotherapy/` | Physiotherapy in Lichfield \| Lichfield Osteopathic Practice |
| `/acupuncture/` | Acupuncture in Lichfield \| Lichfield Osteopathic Practice |
| `/laser-therapy/` | Laser Therapy in Lichfield \| Lichfield Osteopathic Practice |
| `/emre-tosun/` | Emre Tosun, Physiotherapist \| Lichfield Osteopathic Practice |
| `/back-pain/` and the other 10 condition pages | <Condition> Treatment in Lichfield \| Lichfield Osteopathic Practice |

Note: `/about/` was a 404 on the live site, so it needs no redirect.

## Changed: 301 redirects to add at launch

| From (live) | To | Why |
|---|---|---|
| `/cmsms_teacher/freta/` | `/freta-teklesenbet/` | Old theme's "teacher" post type is not carried over; Freta becomes a normal page like the others |
| `/cmsms_teacher/emma-thompson/` | `/emma-thompson/` | Already redirects on live; keep it |
| `/cmsms_teacher/david/` | `/david-brown/` | Already redirects on live; keep it |
| `/cmsms_teacher/hafi/` | `/hafi-rahman/` | Already redirects on live; keep it |
| `/cmsms_teacher/zoe/` | `/zoe-goodwin/` | Already redirects on live; keep it |
| `/cmsms_teacher/` | `/meet-the-team/` | Theme archive page |
| `/cmsms_teacher_classes/registered-osteopath/` | `/meet-the-team/` | Theme archive page |
| `/cmsms_teacher_classes/massage-therapist/` | `/zoe-goodwin/` | Theme archive page |
| `/cmsms_classes_category/oteopathy/` | `/osteopathy/` | Theme archive page |
| `/cmsms_classes_category/paediatric-osteopathy/` | `/peadiatric-osteopathy/` | Theme archive page |
| `/cmsms_classes_category/massage/` | `/massage/` | Theme archive page |
| `/classes/` | `/osteopathy/` | Yoga theme demo page |
| `/timetable/` | `/contact/` | Yoga theme demo page (opening hours are on Contact) |
| `/blog/` | `/` | Only held the yoga demo posts |
| `/7-abdominal-exercises-if-you-have-a-bad-back/` | `/osteopathy/` | Yoga theme demo post |
| `/yoga-for-scoliosis-5-best-poses-for-spine-curvature/` | `/osteopathy/` | Yoga theme demo post |
| `/a-10-minute-morning-yoga-sequence-for-beginners/` | `/` | Yoga theme demo post |
| `/5-more-reasons-to-take-your-yoga-practice-outdoors/` | `/` | Yoga theme demo post |
| `/adding-yoga-strength-training-to-your-fitness-routine/` | `/` | Yoga theme demo post |
| `/these-are-the-most-popular-yoga-styles-in-the-world/` | `/` | Yoga theme demo post |
| `/acroyoga-for-beginners-3-poses-to-get-you-started/` | `/` | Yoga theme demo post |
| `/rest-and-digest-8-restorative-yoga-poses-for-digestion/` | `/` | Yoga theme demo post |
| `/the-truth-about-hot-yoga-explained-by-science/` | `/` | Yoga theme demo post |
| `/3-breathing-exercises-that-go-best-with-your-sleep-meditation/` | `/` | Yoga theme demo post |
| `/category/yoga/`, `/category/types-of-yoga/`, `/category/yoga-poses/` | `/` | Yoga demo categories |

The yoga posts are template filler (author shown as an email address, an "oral health myths" excerpt
on a back-exercise post). Rebuilding them would not help rankings, so they are redirected, not copied.

## SEO titles and descriptions (to set in Rank Math or Yoast at launch)

Live titles are kept where they already say what the page is. The "- LOP" ones are expanded,
since "LOP" means nothing in search results. Descriptions that were empty or theme filler
("Home|No breadcrumbs") are replaced with page summaries written from the page's own content.

| URL | Title | Description |
|---|---|---|
| `/` | Lichfield Osteopathic Practice | Osteopaths and massage therapists in Lichfield since 1983. Osteopathy, cranial and baby osteopathy, and sports massage at 30 Rotten Row. Book online. |
| `/osteopathy/` | Osteopathy in Lichfield \| Lichfield Osteopathic Practice | (live) At Lichfield Osteopathic Practice, we provide professional osteopathy in Lichfield to help reduce pain, improve movement, and support long term musculoskeletal health. |
| `/peadiatric-osteopathy/` | Baby & Paediatric Osteopathy in Lichfield \| Lichfield Osteopathic Practice | (live) gentle, specialist osteopathy for babies and infants |
| `/massage/` | Sports & Deep Tissue Massage in Lichfield \| Lichfield Osteopathic Practice | (live) expert deep tissue and sports massage in Lichfield |
| `/pricing/` | Our Fees \| Lichfield Osteopathic Practice | Osteopathy and massage fees at Lichfield Osteopathic Practice: initial consultation, follow-up appointments and 60 or 90 minute massage. Book online. |
| `/contact/` | Contact \| Lichfield Osteopathic Practice | Find Lichfield Osteopathic Practice at 30 Rotten Row, Lichfield, WS13 6JB. Call 01543 252673. Parking outside and a few minutes' walk from the city centre. |
| `/meet-the-team/` | Meet the Team \| Lichfield Osteopathic Practice | Meet the osteopaths and massage therapist at Lichfield Osteopathic Practice, and see which days each practitioner is in clinic. |
| team profiles | live titles, with "- LOP" expanded | live descriptions (the opening of each bio) |

Rank Math is the SEO plugin on the live site. Using the same plugin on staging lets its
settings and redirects be exported and imported.

## Launch checklist
- [ ] Staging: Settings → Reading → "Discourage search engines" ticked until launch, then unticked.
- [ ] Permalinks `/%postname%/` (trailing slash, matches live).
- [ ] All redirects above added (Rank Math → Redirections), then test each one.
- [ ] Titles and descriptions set per page.
- [ ] XML sitemap submitted in Search Console after launch.
- [ ] LocalBusiness schema: Lichfield Osteopathic Practice, 30 Rotten Row, Lichfield, WS13 6JB, 01543 252673.
