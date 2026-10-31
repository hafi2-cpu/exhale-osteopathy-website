# Launch redirects and checks (exhaleosteopathy.co.uk)

Put these at the top of the live site's `.htaccess` (above the WordPress block) when the new site goes live.

```apache
RewriteEngine On
# One canonical host: https, no www
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^(.*)$ https://exhaleosteopathy.co.uk/$1 [R=301,L]

# Old misspelt URL
Redirect 301 /pregnacy-pain /pregnancy-osteopathy
```

`/book` → Cliniko is handled inside WordPress (keep as is).

URLs that keep the same address (no redirect needed): `/`, `/babies`, `/cranial-osteopathy`, `/faqs`,
the condition and treatment pages, and the three blog posts
(`/why-choose-an-osteopath`, `/cranial-osteopathy-for-babies-at-exhale-osteopathy`, `/is-osteopathy-safe-in-early-pregnancy`).
`/thank-you` exists on the live site — recreate it or 301 it to `/` before launch.

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
- SiteGround Speed Optimizer: minify + combine CSS (with preload), minify JS, defer render-blocking JS, minify HTML, web font optimisation, remove query strings, disable emojis, WebP on. Combine JS left OFF (Elementor-safe).
- Elementor > Performance: Lazy Load Background Images turned OFF (it delayed the hero image, the LCP element).
- Every page hero (first section with a background image) has an absolutely positioned HTML widget with `<link rel="preload" as="image" fetchpriority="high" class="ex-hero-preload">` for its background.
- Header (127) has an HTML widget preloading the Inter and Inter Tight woff2 files.
- Image widgets: team portraits / about-strip photos use the 768px size; 54px avatars use thumbnail.
- Result so far: /osteopathy mobile 68 → 79 (FCP 2.9 s → 1.7 s) after the plugin settings alone.
