# Launch redirects and checks (exhaleosteopathy.co.uk)

Put these at the top of the live site's `.htaccess` (above the WordPress block) when the new site goes live.

```apache
RewriteEngine On
# One canonical host: https, no www
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^(.*)$ https://exhaleosteopathy.co.uk/$1 [R=301,L]

# Old URLs (exact matches, permanent)
RewriteRule ^pregnacy-pain/?$ /pregnancy-osteopathy [R=301,L]
RewriteRule ^thank-you/?$ /contact-us [R=301,L]
RewriteRule ^category/blog/?$ /blog-posts [R=301,L]
RewriteRule ^author/exhale_admin/?$ /blog-posts [R=301,L]
```

Not redirected (internal template URLs with no search value, left to 404):
`/elementor-hf/footer-1`, `/elementor-hf/elementor-2381`. `/?elementskit_template=footer` resolves to the home page.
`/book` is a real page again on the new site (Cliniko embedded booking, same as live), so it needs no redirect.


URLs that keep the same address (no redirect needed): `/`, `/babies`, `/cranial-osteopathy`, `/faqs`,
the condition and treatment pages, and the three blog posts
(`/why-choose-an-osteopath`, `/cranial-osteopathy-for-babies-at-exhale-osteopathy`, `/is-osteopathy-safe-in-early-pregnancy`).

## Launch day
1. Settings → Reading: untick "Discourage search engines".
2. Purge the SiteGround cache.
3. Search Console: submit `https://exhaleosteopathy.co.uk/sitemap_index.xml`; use URL Inspection → Request indexing on `/`, `/babies`, `/cranial-osteopathy`.
4. Check `http://www.exhaleosteopathy.co.uk/` lands on `https://exhaleosteopathy.co.uk/` in one hop.
5. Watch Search Console → Pages and Performance weekly for 6–8 weeks.

## New pages (not on the old site)
- `/assisted-stretch-therapy-sutton-coldfield` (Assisted Stretch Therapy, launching December 2026). Yoast: "Assisted Stretch Therapy in Sutton Coldfield | Exhale", keyphrase "Assisted Stretch Therapy Sutton Coldfield". Service + FAQ schema on page.
- Delete or draft the WordPress default `/sample-page` before launch.

## Title changes vs live site
- `/osteopathy`: was "Cranial Osteopathy Birmingham | Osteopaths in Sutton Coldfield" (clashed with `/cranial-osteopathy`). Now "Osteopathic Treatment Sutton Coldfield & Birmingham | Exhale". After launch, check Search Console queries for this URL; if "cranial osteopathy birmingham" impressions drop overall, add Birmingham wording to `/cranial-osteopathy`.
- `/womens-health-osteopathy` (new, 30 Oct 2026): Women's Health Osteopathy page with £99 postnatal check (Ankita). Title "Women’s Health Osteopath Sutton Coldfield & Birmingham | Exhale", keyphrase "women’s health osteopath Sutton Coldfield", Service + FAQPage schema. Linked from header menus, footer, Pregnancy page and Ankita's profile. Does not use the "Mummy MOT" trademark.
- `/our-fees` meta description (30 Oct 2026): updated from old prices (£70/£50) to "Our fees at Exhale Osteopathy, Sutton Coldfield: osteopathy and physiotherapy £75 initial, £60 follow-up. Sports massage from £40. Card and cash accepted."

## Content vs live site (checked 30 Oct 2026)
Titles and meta descriptions match the live site on 22 of 23 URLs (`/osteopathy` changed on purpose). Body copy was rewritten.
Longer than live: babies, cranial, jaw, osteopathy, neck, hip, knee, ankle, headaches, massage, fees.
Shorter than live: home (H1 no longer contains "osteopath Sutton Coldfield"; "Why choose us" copy gone), about (bios moved to profile pages), PGP blog post (~2,000 words to ~900).
Fixed 30 Oct 2026: home H1 is now "Family Osteopaths · Sutton Coldfield & Birmingham" (big headline is H2, same look); home About paragraph lists conditions and treatments; PGP post restored to ~1,500 words with a local "Sutton Coldfield & Birmingham" section.

## Speed settings (31 Oct 2026)
- SiteGround Speed Optimizer: minify + combine CSS (with preload), minify JS, minify HTML, web font optimisation, disable emojis, WebP on. Combine JS left OFF (Elementor-safe).
- Elementor > Performance: Lazy Load Background Images turned OFF (it delayed the hero image, the LCP element).
- Every page hero (first section with a background image) has an absolutely positioned HTML widget with `<link rel="preload" as="image" fetchpriority="high" class="ex-hero-preload">` for its background.
- Header (127) has an HTML widget preloading the Inter and Inter Tight woff2 files.
- Image widgets: team portraits / about-strip photos use the 768px size; 54px avatars use thumbnail.
- Result so far: /osteopathy mobile 68 → 79 (FCP 2.9 s → 1.7 s) after the plugin settings alone.


## SEO migration audit (31 Oct 2026)
Fixed on staging:
- Duplicate meta description on posts came from the Hello Elementor theme (post excerpt). Turned off in Hello theme settings (`hello_elementor_settings_description_meta_tag`). Every page now has one description (Yoast).
- `/book` page recreated (id 2652) with the live site's Cliniko embed; Yoast title/description set.
- `/sample-page` moved to trash; gone from the sitemap.
- About page "[X] treatment rooms" placeholder replaced with "Private treatment rooms".
- Yoast site representation: Organization "Exhale Osteopathy", legal name Walsall Osteopathic Clinic Ltd, colour logo (431), email, phone, description, Instagram. Author archives disabled (single author; slug exposed an email address).

Canonicals: Yoast deliberately omits rel=canonical on noindexed pages, so their absence on staging is expected. They will appear once "Discourage search engines" is off.

## Launch-day checks
1. View source on /, /osteopathy, /babies, a blog post: `<meta name="robots" content="index, follow, ...">`, one meta description, `<link rel="canonical" href="https://exhaleosteopathy.co.uk/...">`.
2. `curl -sI https://exhaleosteopathy.co.uk/` and a few pages: no `X-Robots-Tag: noindex` on HTML responses (sitemap XML having `noindex, follow` is normal Yoast behaviour).
3. https://exhaleosteopathy.co.uk/robots.txt shows `Disallow:` (empty) and the live sitemap URL.
4. https://exhaleosteopathy.co.uk/sitemap_index.xml lists only exhaleosteopathy.co.uk URLs; no sample-page, no author sitemap.
5. Search the database for `hafir61.sg-host.com` after the Site Tools migration / search-replace; Elementor > Tools > Replace URL (old staging URL → https://exhaleosteopathy.co.uk); Elementor > Tools > Regenerate CSS; Yoast > Tools > "Optimize SEO data" reset and re-run; purge SG cache. Then grep the HTML of the key pages for "sg-host".
6. Each redirect above returns a single 301 to the right page (`curl -sI`).
7. Rich results test on / shows Organization; on a condition page shows FAQPage.
8. Staging copy (hafir61.sg-host.com) keeps "Discourage search engines" ticked, or is deleted; exhaleclinic.co.uk forwards to the live domain.
- 31 Oct 2026: "Defer render-blocking JS" turned OFF again. It deferred Elementor core but not Elementor Pro's scripts, so Pro widgets (the off-canvas mobile menu) could load before core and the hamburger did nothing on phones. Leave it off.
- 31 Oct 2026: "Remove query strings" turned OFF. It stripped Elementor's ?ver= cache-busting, so browsers kept old CSS after edits.
- 31 Oct 2026: mobile off-canvas menu (header 127) restyled to mockup J: Jost uppercase, 0.22em tracking, 17px items; buttons Jost 14px 0.18em; hours 12px. Colours/layout unchanged.
