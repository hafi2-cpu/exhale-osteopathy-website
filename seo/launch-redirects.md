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
