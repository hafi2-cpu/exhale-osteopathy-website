/* Lichfield redesign, Nov 2026: copies the NEW Exhale design (live exhaleosteopathy.co.uk, built in
   Elementor and the Customizer) onto Lichfield staging, with Lichfield's olive colours and content.

   How the Exhale design gets here: Exhale's Elementor JSON (pages, header, footer, kit) and its
   Customizer CSS are read (GET only) from the live Exhale admin and handed to hafir63 through the URL
   hash, then kept in hafir63's localStorage (EXB64, EXCSS: gzip + base64). Nothing on Exhale is changed.

   This file is the shared engine: colour map, link map, image map, tree helpers, insert/save.
   Page recipes live in recipes.js. Needs window.LOP_MEDIA (media-map.json). */
(function () {
  const XF = window.XF = {};

  /* ---------- colours: Exhale (forest green + gold) -> Lichfield (dark olive + olive gold) ---------- */
  const HEX = {
    '#2B4536': '#3B3A28', '#1A2C22': '#232219', '#22302A': '#2A2920', '#22382B': '#2C2B1E', '#2C3D33': '#302F22',
    '#1F3328': '#28271B', '#2C332E': '#2E2D27', '#3F5A4A': '#5A5940', '#56684F': '#6F6E4A', '#4E5A52': '#57554C',
    '#5B665F': '#63615A', '#C4C9BE': '#CBC9BC', '#DFE2D8': '#E2E0D6',
    '#C9A86A': '#ABA972', '#C9A96E': '#ADAB76', '#B9975A': '#949366', '#B8975A': '#949366', '#B8955A': '#949366',
    '#9A7B45': '#7C7B50', '#9C7B3E': '#7E7D4E', '#8A6D3B': '#6F6E45', '#6B5D3A': '#58573A', '#D4B77F': '#C3C18E',
    '#D8BC84': '#C7C592', '#E9D9B5': '#E3E2C4', '#8A7650': '#7E7A58',
    '#F5F2EA': '#F4EFEB', '#EDE5D6': '#EAE3DD', '#B7AA99': '#C9C1BB', '#F3EEE4': '#F2EDE8', '#D2C9B7': '#D6CEC7',
    '#D9D2C3': '#DCD5CE', '#E2DACB': '#E4DDD6', '#DDD5C5': '#DED7D0', '#BFB5A1': '#C4BCB4', '#E8E4D8': '#E9E4DF',
    '#C5D19A': '#D7D6A4', '#B4C285': '#C4C38E'
  };
  const RGB = {
    '43,69,54': '59,58,40', '34,56,43': '44,43,30', '20,28,24': '28,27,20', '201,168,106': '171,169,114',
    '154,123,69': '124,123,80', '245,242,234': '244,239,235', '34,48,42': '42,41,32', '243,238,228': '242,237,232',
    '86,104,79': '111,110,74', '237,229,214': '234,227,221', '183,170,153': '201,193,187', '44,61,51': '48,47,34'
  };
  XF.HEX = HEX;
  XF.col = (s) => s
    .replace(/#([0-9a-fA-F]{6})\b/g, (m, h) => HEX['#' + h.toUpperCase()] || m)
    .replace(/(rgba?\(\s*)(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g, (m, p, r, g, b) => { const t = RGB[r + ',' + g + ',' + b]; return t ? p + t : m; });

  /* ---------- links ---------- */
  const BOOK = 'https://exhale-osteopaths.uk2.cliniko.com/bookings?business_id=1833503730075443426#service';
  XF.BOOK = BOOK;
  const LINK = {
    '/': '/', '/osteopathy': '/osteopathy/', '/babies': '/peadiatric-osteopathy/', '/massage': '/massage/',
    '/physiotherapy': '/physiotherapy/', '/acupuncture': '/acupuncture/', '/laser-therapy': '/laser-therapy/',
    '/about': '/about/', '/new-patients': '/new-patients/', '/our-fees': '/pricing/', '/contact-us': '/contact/',
    '/book': BOOK, '/treatments': '/treatments/', '/conditions': '/conditions/', '/about#team': '/meet-the-team/',
    '/back-pain': '/back-pain/', '/neck-pain': '/neck-pain/', '/shoulder-pain': '/shoulder-pain/', '/hip-pain': '/hip-pain/',
    '/knee-pain': '/knee-pain/', '/ankle-pain': '/ankle-pain/', '/headaches': '/headaches/', '/sciatica': '/sciatica/',
    '/sports-injuries': '/sports-injuries/', '/tendon-problems': '/tendon-problems/', '/jaw-pain': '/jaw-pain/',
    '/hafi-rahman': '/hafi-rahman/', '/freta-teklesenbet': '/freta-teklesenbet/', '/zoe-goodwin': '/zoe-goodwin/',
    '/emre-tosun': '/emre-tosun/', '/ankita-desai': '/emma-thompson/'
  };
  // Exhale pages with no Lichfield equivalent: links to them are removed
  const GONE = ['/cranial-osteopathy', '/pregnancy-osteopathy', '/womens-health-osteopathy', '/rehab-pilates',
    '/assisted-stretch-therapy-sutton-coldfield', '/deep-tissue-massage', '/pregnancy-massage', '/pelvic-girdle-pain',
    '/blog-posts', '/blog', '/osteopath-birmingham', '/faqs', '/sports-massage-birmingham', '/pregnancy-osteopath-birmingham',
    '/privacy-policy', '/cookie-policy-uk'];
  XF.GONE_MARK = '#__gone__';
  XF.mapUrl = (u) => {
    if (typeof u !== 'string' || !u) return u;
    if (/^(tel:|mailto:|#elementor-action|https?:\/\/(?!(www\.)?exhaleosteopathy\.co\.uk))/i.test(u)) return u;
    if (u[0] === '#') return u;
    let p = u.replace(/^https?:\/\/(www\.)?exhaleosteopathy\.co\.uk/i, '') || '/';
    const [path0, hash] = p.split('#');
    const path = (path0.replace(/\/+$/, '') || '/');
    if (hash && LINK[path + '#' + hash]) return LINK[path + '#' + hash];
    if (GONE.includes(path)) return XF.GONE_MARK;
    if (LINK[path]) return LINK[path] + (hash ? '#' + hash : '');
    if (path.startsWith('/wp-content/')) return u;
    console.warn('XF unmapped link', u);
    return u;
  };

  /* ---------- plain text swaps applied to every string ---------- */
  XF.TEXT = [
    ['0121 751 2440', '01543 252673'], ['+441217512440', '+441543252673'], ['01217512440', '01543252673'],
    ['1358847506980544559', '1833503730075443426'], ['info@exhaleosteopathy.co.uk', 'contact@lichfield-osteopaths.co.uk'],
    ['09:00 to 20:00', '09:00 to 19:00'], ['08:00 to 14:00', '09:00 to 14:00'],
    ['https://www.instagram.com/exhaleosteopathy/', 'https://www.instagram.com/lichfield_osteopaths/'],
    ['https://www.facebook.com/exhaleosteopathy/', 'https://www.facebook.com/LichfieldOsteopaths/']
  ];
  XF.RE = [
    // two-clinic call card -> one Lichfield number
    [/<a class="p" href="tel:[^"]*">Sutton Coldfield [^<]*<span[^>]*>→<\/span><\/a><a class="s"([^>]*)>Lichfield /g, '<a class="p"$1>Call '],
    [/Sutton Coldfield (and|&amp;|&) Lichfield/g, 'Lichfield']
  ];
  const swapText = (s) => { for (const [a, b] of XF.TEXT) s = s.split(a).join(b); for (const [re, b] of XF.RE) s = s.replace(re, b); return s; };
  const swapHrefs = (s) => s.replace(/href=(["'])([^"']*)\1/g, (m, q, u) => 'href=' + q + XF.mapUrl(u) + q);
  // Drop <p>/<li>/<br>-separated links whose target is gone
  XF.dropGoneLinks = (h) => h
    .replace(/<(p|li)[^>]*>\s*<a[^>]*href="#__gone__"[^>]*>[\s\S]*?<\/a>\s*<\/\1>/g, '')
    .replace(/<br\s*\/?>\s*<a[^>]*href="#__gone__"[^>]*>[\s\S]*?<\/a>/g, '')
    .replace(/<a[^>]*href="#__gone__"[^>]*>[\s\S]*?<\/a>\s*<br\s*\/?>/g, '');

  /* ---------- media ---------- */
  const M = () => window.LOP_MEDIA;
  XF.img = (k) => { const m = M()[k]; if (!m) throw new Error('no media ' + k); return { url: m[1], id: m[0], alt: '', source: 'library', size: '' }; };
  XF.url = (k) => M()[k][1];
  // Picture for a linked card / menu item, by where it links
  XF.IMG_BY_LINK = {
    '/osteopathy/': 'osteo-arm', '/peadiatric-osteopathy/': 'cranial-baby', '/massage/': 'massage-stock', '/physiotherapy/': 'hands-leg',
    '/acupuncture/': 'acupuncture', '/laser-therapy/': 'laser', '/about/': 'exterior', '/new-patients/': 'exterior', '/meet-the-team/': 'osteo-freta',
    '/back-pain/': 'hands-back', '/neck-pain/': 'hands-upper', '/shoulder-pain/': 'osteo-freta', '/hip-pain/': 'hands-deep', '/knee-pain/': 'osteo-arm',
    '/ankle-pain/': 'hands-leg', '/headaches/': 'hands-upper', '/sciatica/': 'hands-back', '/sports-injuries/': 'hands-leg',
    '/tendon-problems/': 'osteo-arm', '/jaw-pain/': 'hands-upper',
    '/hafi-rahman/': 'hafi', '/freta-teklesenbet/': 'freta', '/zoe-goodwin/': 'zoe', '/emre-tosun/': 'emre', '/emma-thompson/': 'emma', '/david-brown/': 'david'
  };
  // Fallback by Exhale image file name
  XF.IMG_BY_FILE = [[/logo-white/, 'logo-white'], [/logo-forest|logo-dark|logo-green/, 'logo-dark'], [/gosc/, 'gosc'], [/hcpc/, 'hcpc'],
    [/hafi/, 'hafi'], [/freta/, 'freta'], [/zoe/, 'zoe'], [/emre/, 'emre'], [/ankita/, 'emma'], [/baby|cranial|infant/, 'cranial-baby'],
    [/massage/, 'massage-stock'], [/acupunct/, 'acupuncture'], [/laser/, 'laser'], [/back/, 'hands-back'], [/neck|head|jaw|temple/, 'hands-upper'],
    [/knee|ankle|foot|sport|tendon|achilles/, 'hands-leg'], [/hip|pelvi/, 'hands-deep'], [/shoulder/, 'osteo-freta'], [/team|clinic|hero|ab-/, 'exterior']];
  XF.imgFor = (exUrl, link) => {
    if (link && XF.IMG_BY_LINK[link]) return XF.IMG_BY_LINK[link];
    const f = String(exUrl || '').split('/').pop();
    for (const [re, k] of XF.IMG_BY_FILE) if (re.test(f)) return k;
    return 'hands-deep';
  };

  /* ---------- tree helpers ---------- */
  XF.walk = (els, f, parent) => { for (const e of [...els]) { f(e, parent, els); XF.walk(e.elements || [], f, e); } };
  XF.all = (els, pred) => { const o = []; XF.walk(els, (e, p, arr) => { if (pred(e)) o.push({ e, p, arr }); }); return o; };
  XF.one = (els, pred, what) => { const r = XF.all(els, pred); if (!r.length) throw new Error('not found: ' + (what || pred)); return r[0]; };
  XF.byText = (els, re) => XF.one(els, e => { const s = e.settings || {}; const t = String(s.title || s.editor || s.text || '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim(); return re.test(t) || re.test(s.title || s.editor || s.text || ''); }, String(re));
  XF.remove = (els, e) => { XF.walk(els, (x, p, arr) => { const i = arr.indexOf(e); if (i >= 0) arr.splice(i, 1); }); const i = els.indexOf(e); if (i >= 0) els.splice(i, 1); };
  XF.clone = (o) => { const c = JSON.parse(JSON.stringify(o)); XF.walk([c], e => { e.id = Math.random().toString(16).slice(2, 9); }); return c; };
  XF.linkOf = (e) => e.settings && e.settings.link && e.settings.link.url;

  // Map every string in a settings object (deep)
  const deep = (v, f, key) => {
    if (typeof v === 'string') return f(v, key);
    if (Array.isArray(v)) return v.map(x => deep(x, f, key));
    if (v && typeof v === 'object') { for (const k of Object.keys(v)) v[k] = deep(v[k], f, k); return v; }
    return v;
  };
  XF.deep = deep;

  /* The general pass: colours, links, phone/hours/email, images by link, removal of links to pages Lichfield
     doesn't have (and the card or carousel slide that carried them). */
  XF.base = (els) => {
    XF.walk(els, (e) => {
      const s = e.settings; if (!s || Array.isArray(s)) return;
      deep(s, (str, key) => {
        let t = XF.col(str);
        if (key === 'url') t = XF.mapUrl(t);
        if (/<a |href=/.test(t)) t = XF.dropGoneLinks(swapHrefs(t));
        return swapText(t);
      });
    });
    // pictures: by the link of the nearest linked ancestor (cards, menu items, team), else by file name
    const fix = (e, link) => {
      const s = e.settings || {};
      const l = XF.linkOf(e) || link;
      for (const k of Object.keys(s)) {
        if (/^(image|background_image)(_tablet|_mobile|_tablet_extra)?$/.test(k) && s[k] && s[k].url && !/hafir63/.test(s[k].url)) {
          const key = XF.imgFor(s[k].url, l); const im = XF.img(key);
          s[k] = Object.assign({}, s[k], { url: im.url, id: im.id, source: 'library' });
        }
      }
      (e.elements || []).forEach(c => fix(c, l));
    };
    els.forEach(e => fix(e));
    // SVG icons from Exhale's media library -> the same icons in Lichfield's
    const icons = (v) => {
      if (Array.isArray(v)) return v.forEach(icons);
      if (!v || typeof v !== 'object') return;
      if (v.library === 'svg' && v.value && /exhale-icon-([a-z-]+)\.svg/.test(v.value.url || '')) {
        const k = 'icon-' + v.value.url.match(/exhale-icon-([a-z-]+)\.svg/)[1];
        if (M()[k]) v.value = { id: M()[k][0], url: M()[k][1] }; else console.warn('XF no icon', k);
        return;
      }
      Object.values(v).forEach(icons);
    };
    XF.walk(els, e => icons(e.settings));
    // alt text naming Exhale
    XF.walk(els, e => { const s = e.settings || {}; for (const k of ['image']) if (s[k] && /Exhale/.test(s[k].alt || '')) s[k].alt = 'Lichfield Osteopathic Practice'; });
    // headings/text that were only a link to a page Lichfield doesn't have
    XF.all(els, e => { const s = e.settings || {}; const t = s.title || s.editor || ''; return /#__gone__/.test(t) && !t.replace(/<a[^>]*#__gone__[^>]*>[\s\S]*?<\/a>/g, '').replace(/<[^>]+>/g, '').trim(); })
      .forEach(({ e }) => XF.remove(els, e));
    // remove linked containers/buttons pointing at pages Lichfield doesn't have
    XF.all(els, e => XF.linkOf(e) === XF.GONE_MARK).forEach(({ e }) => XF.remove(els, e));
    // nested carousels: drop slides left empty, keep carousel_items in step
    XF.all(els, e => e.widgetType === 'nested-carousel').forEach(({ e }) => {
      const keep = e.elements.map(sl => XF.all(sl.elements || [], x => true).length > 0);
      e.settings.carousel_items = (e.settings.carousel_items || []).filter((_, i) => keep[i]);
      e.elements = e.elements.filter((_, i) => keep[i]);
    });
    return els;
  };

  /* ---------- load the Exhale bundle kept in localStorage ---------- */
  const gunzip = async (b64) => {
    const b = atob(b64); const u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i);
    return new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
  };
  XF.load = async () => {
    if (!XF.B) XF.B = JSON.parse(await gunzip(localStorage.getItem('EXB64')));
    if (!XF.CSS && localStorage.getItem('EXCSS')) XF.CSS = await gunzip(localStorage.getItem('EXCSS'));
    for (const k of ['EXB64b', 'EXB64c']) if (localStorage.getItem(k)) Object.assign(XF.B, JSON.parse(await gunzip(localStorage.getItem(k))));
    return XF.B;
  };
  XF.src = (key) => JSON.parse(JSON.stringify(XF.B[key].data));

  /* ---------- write into the open Elementor document ---------- */
  XF.replaceDoc = async (els) => {
    // Elementor won't create a widget at the top level: tuck any (script-only html widgets) into the next section
    for (let i = els.length - 1; i >= 0; i--) {
      if (els[i].elType === 'widget') {
        const w = els.splice(i, 1)[0]; w.settings._position = 'absolute';
        const host = els[i] || els[i - 1]; if (host) host.elements.unshift(w);
      }
    }
    const target = elementor.getPreviewContainer();
    const kids = [...target.children];
    if (kids.length) await $e.run('document/elements/delete', { containers: kids });
    for (let i = 0; i < els.length; i++) {
      await $e.run('document/elements/create', { container: target, model: els[i], options: { at: i } });
    }
  };
})();
