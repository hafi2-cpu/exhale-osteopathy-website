/* Lichfield redesign recipes: each turns one Exhale Elementor document into its Lichfield version.
   Needs xf.js. Each recipe returns the element list for XF.replaceDoc. */
(function () {
  const R = window.XR = {};
  const set = (e, html) => { const s = e.settings; if ('title' in s) s.title = html; else if ('editor' in s) s.editor = html; else if ('text' in s) s.text = html; else s.html = html; };
  const T = (els, re, html) => { const f = XF.byText(els, re); set(f.e, html); return f.e; };
  const tryT = (els, re, html) => { try { return T(els, re, html); } catch (e) { console.warn('XR skip', re); } };
  const htmlW = (els, re) => XF.one(els, e => e.widgetType === 'html' && re.test(e.settings.html || ''), String(re)).e;
  const SITE = { name: 'Lichfield Osteopathic Practice', addr: '30 Rotten Row, Lichfield, Staffordshire, WS13 6JB', phone: '01543 252673', tel: 'tel:+441543252673',
    maps: 'https://www.google.com/maps/search/?api=1&query=Lichfield+Osteopathic+Practice+30+Rotten+Row+Lichfield+WS13+6JB' };
  R.SITE = SITE;
  const TEAM = [
    ['freta', 'Freta Teklesenbet', 'Registered Osteopath'], ['emma', 'Emma Thompson', 'Registered Osteopath'],
    ['hafi', 'Hafi Rahman', 'Registered Osteopath'], ['david', 'David Brown', 'Registered Osteopath'],
    ['emre', 'Emre Tosun', 'Physiotherapist'], ['zoe', 'Zoe Goodwin', 'Sports Massage Therapist']];
  const HREF = { freta: '/freta-teklesenbet/', emma: '/emma-thompson/', hafi: '/hafi-rahman/', david: '/david-brown/', emre: '/emre-tosun/', zoe: '/zoe-goodwin/' };
  R.TEAM = TEAM; R.HREF = HREF;

  // Fill a person card (linked container) with one of the Lichfield team
  const fillPerson = (card, [k, name, role]) => {
    card.settings.link = Object.assign({}, card.settings.link, { url: HREF[k] });
    const im = XF.all([card], e => e.widgetType === 'image')[0];
    if (im) im.e.settings.image = Object.assign({}, im.e.settings.image, XF.img(k), { alt: name });
    const hs = XF.all([card], e => e.widgetType === 'heading').map(x => x.e);
    const nameH = hs.find(h => /Rahman|Teklesenbet|Desai|Goodwin|Tosun|Thompson|Brown/.test(h.settings.title));
    const roleH = hs[hs.indexOf(nameH) + 1];
    if (nameH) nameH.settings.title = name;
    if (roleH && !/profile/i.test(roleH.settings.title)) roleH.settings.title = role;
    return card;
  };
  // Replace a run of person cards (siblings) with the given people, cloning the first as the pattern
  const rebuildPeople = (els, people) => {
    const cards = XF.all(els, e => e.elType === 'container' && /^\/(hafi-rahman|freta-teklesenbet|emma-thompson|zoe-goodwin|emre-tosun|david-brown)\/$/.test(XF.linkOf(e) || ''));
    const parent = cards[0].arr; const at = parent.indexOf(cards[0].e); const pattern = cards[0].e;
    cards.forEach(c => { const i = c.arr.indexOf(c.e); if (i >= 0) c.arr.splice(i, 1); });
    parent.splice(at, 0, ...people.map(p => fillPerson(XF.clone(pattern), p)));
    return parent;
  };
  R.rebuildPeople = rebuildPeople;

  const schema = () => {
    const ld = { '@context': 'https://schema.org', '@type': 'MedicalBusiness', '@id': 'https://www.lichfield-osteopaths.co.uk/#business',
      name: SITE.name, url: 'https://www.lichfield-osteopaths.co.uk/', telephone: '+441543252673', email: 'contact@lichfield-osteopaths.co.uk', foundingDate: '1983',
      address: { '@type': 'PostalAddress', streetAddress: '30 Rotten Row', addressLocality: 'Lichfield', addressRegion: 'Staffordshire', postalCode: 'WS13 6JB', addressCountry: 'GB' },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' }],
      sameAs: ['https://www.facebook.com/LichfieldOsteopaths/', 'https://www.instagram.com/lichfield_osteopaths/'] };
    return { id: 'lopld01', elType: 'widget', widgetType: 'html', settings: { html: '<script type="application/ld+json">' + JSON.stringify(ld) + '</script>', _css_classes: 'ex-schema', _position: 'absolute' }, elements: [] };
  };

  /* ================= HOME ================= */
  R.home = () => {
    const els = XF.base(XF.src('p11'));
    htmlW(els, /<picture/).settings.html = '<picture><img src="' + XF.url('hero') + '" sizes="100vw" alt="Hands-on treatment at Lichfield Osteopathic Practice" style="object-position:50% 40% !important" fetchpriority="high" loading="eager" decoding="async"></picture>';
    T(els, /^Family osteopaths in Sutton/i, 'Osteopathy, physiotherapy &amp; sports massage in Lichfield');
    T(els, /^Move freely/, 'Move freely. Live well. <em class="sb-it">Feel like you again.</em>');
    T(els, /At Exhale we look beyond/, '<p>Welcome to Lichfield Osteopathic Practice, established in 1983. Our registered osteopaths, physiotherapist and sports massage therapist offer a truly holistic approach to health, for all ages from birth to seniority.</p>');
    const gl = htmlW(els, /sb-glance/);
    const li = (svg, a, b) => '<li><span class="sb-gl-ic"><svg viewBox="0 0 32 32" aria-hidden="true">' + svg + '</svg></span><span class="sb-gl-tx"><strong>' + a + '</strong><span>' + b + '</span></span></li>';
    gl.settings.html = '<ul class="sb-glance" aria-label="At a glance">' +
      li('<rect x="5" y="7" width="22" height="20" rx="2"/><path d="M5 13h22M11 4v6M21 4v6"/>', 'Established 1983', 'Caring for Lichfield patients') +
      li('<rect x="6" y="5" width="20" height="23" rx="2"/><path d="M16 11v9M11.5 15.5h9"/>', 'Registered', 'GOsC and HCPC') +
      li('<circle cx="11" cy="10" r="4"/><circle cx="22" cy="10" r="4"/><path d="M4 26c0-4 3-7 7-7s7 3 7 7M15 26c0-4 3-7 7-7s7 3 7 7"/>', 'All under one roof', 'Osteopathy, physio, massage and more') +
      li('<path d="M16 29s-9-8.5-9-15a9 9 0 0 1 18 0c0 6.5-9 15-9 15z"/><circle cx="16" cy="14" r="3.2"/>', 'Lichfield city centre', 'With a sister clinic in Sutton Coldfield') + '</ul>';
    // About
    const about = XF.one(els, e => e.widgetType === 'image' && e.settings._css_classes && /sb-img--43/.test(e.settings._css_classes)).e;
    about.settings.image = Object.assign({}, about.settings.image, XF.img('osteo-freta'), { alt: 'Freta assessing a patient at Lichfield Osteopathic Practice' });
    T(els, /^A family clinic in Sutton Coldfield/, 'A Lichfield clinic, caring for patients since 1983');
    T(els, /^Exhale is a family osteopathy clinic/, '<p>Lichfield Osteopathic Practice is a clinic of four registered osteopaths, a physiotherapist and a sports massage therapist at 30 Rotten Row, a few minutes’ walk from Lichfield city centre.</p><p>Our team covers a broad spectrum of osteopathic skills, including classical, cranial and paediatric osteopathy, sports injuries and functional medicine. We see patients of all ages, from babies to later life, for back and neck pain, headaches, joint problems, sports injuries and changes to posture in pregnancy.</p>');
    htmlW(els, /ex-accr/).settings.html = '<div class="ex-accr"><img src="' + XF.url('gosc') + '" alt="General Osteopathic Council registered" loading="lazy"><img src="' + XF.url('hcpc') + '" alt="HCPC registered" loading="lazy"></div>';
    // Treatment carousels: Lichfield names, and Massage in the Recovery tab too
    XF.all(els, e => e.widgetType === 'heading' && e.settings.title === 'Baby & Paediatric Osteopathy').forEach(x => x.e.settings.title = 'Cranial &amp; Paediatric Osteopathy');
    XF.all(els, e => e.widgetType === 'heading' && e.settings.title === 'Sports Massage').forEach(x => x.e.settings.title = 'Sports &amp; Deep Tissue Massage');
    const cars = XF.all(els, e => e.widgetType === 'nested-carousel').map(x => x.e);
    if (cars[1]) {
      const src = cars[0].elements.find(sl => XF.all([sl], e => XF.linkOf(e) === '/massage/').length);
      if (src) { const c = XF.clone(src); XF.all([c], e => e.elType === 'container' && XF.linkOf(e)).forEach(x => { x.e.settings.background_image = Object.assign({}, x.e.settings.background_image, XF.img('massage-zoe')); });
        cars[1].elements.push(c); cars[1].settings.carousel_items.push({ _id: Math.random().toString(16).slice(2, 9), slide_title: 'Sports Massage' }); }
    }
    // Team
    rebuildPeople(els, TEAM);
    const teamGrid = XF.one(els, e => e.elType === 'container' && (e.elements || []).some(c => XF.linkOf(c) === '/freta-teklesenbet/')).e;
    if (teamGrid.settings.container_type === 'grid') {
      teamGrid.settings.grid_columns_grid = { unit: 'fr', size: 6, sizes: [] };
      teamGrid.settings.grid_columns_grid_tablet = { unit: 'fr', size: 3, sizes: [] };
      teamGrid.settings.grid_columns_grid_mobile = { unit: 'fr', size: 2, sizes: [] };
    }
    // No genuine Lichfield reviews yet: drop the reviews section; schema lives in the footer
    XF.remove(els, XF.one(els, e => e.settings && e.settings._element_id === 'reviews').e);
    XF.all(els, e => e.widgetType === 'html' && /application\/ld\+json/.test(e.settings.html || '')).forEach(x => XF.remove(els, x.e));
    tryT(els, /^Book online, call the clinic/, '<p>Book online, or call us on 01543 252673 if you’d like a quick chat before booking.</p>');
    tryT(els, /^New to osteopathy\? See exactly/, 'New to the practice? See how your first appointment works.');
    return els;
  };

  /* ================= HEADER ================= */
  R.header = () => {
    const els = XF.base(XF.src('t127'));
    // preload the Lichfield hero on the homepage; fonts come from Elementor
    const pre = htmlW(els, /createElement\("link"\)/);
    pre.settings.html = '<script>(function(){if(location.pathname!=="/")return;var l=document.createElement("link");l.rel="preload";l.as="image";l.setAttribute("fetchpriority","high");l.href="' + XF.url('hero') + '";document.head.appendChild(l)})();</script>';
    XF.all(els, e => e.widgetType === 'html' && /ex-font-preload/.test(e.settings.html || '')).forEach(x => XF.remove(els, x.e));
    const ren = (from, to) => XF.all(els, e => e.widgetType === 'heading' && e.settings.title === from).forEach(x => x.e.settings.title = to);
    ren('About Exhale', 'About Us'); ren('Our story, values and clinics', 'Our story, team and clinic');
    ren('Baby & Paediatric Osteopathy', 'Cranial &amp; Paediatric Osteopathy'); ren('Sports Massage', 'Sports &amp; Deep Tissue Massage');
    ren('TMJ / Jaw Pain', 'Jaw Pain'); ren('Foot & Ankle Pain', 'Ankle Pain');
    XF.all(els, e => e.widgetType === 'text-editor' && /New to Exhale\?/.test(e.settings.editor)).forEach(x => x.e.settings.editor = x.e.settings.editor.replace('New to Exhale?', 'New to the practice?'));
    XF.all(els, e => e.widgetType === 'text-editor' && /Sutton Coldfield/.test(e.settings.editor)).forEach(x => x.e.settings.editor = x.e.settings.editor.replace(/Sutton Coldfield\s*·\s*Lichfield/g, '30 Rotten Row, Lichfield'));
    // About menus: Lichfield has no blog, FAQs or Birmingham page, so list the team, fees and finding us instead
    XF.all(els, e => e.elType === 'container' && (e.elements || []).some(c => XF.linkOf(c) === '/about/')).forEach(({ e: g }) => {
      const pat = g.elements.find(c => XF.linkOf(c) === '/about/');
      [['/meet-the-team/', 'Meet the Team', 'Our osteopaths, physio and massage therapist', 'osteo-freta'], ['/pricing/', 'Our Fees', 'Prices for every treatment', 'exterior'],
        ['/contact/', 'Find Us', '30 Rotten Row, parking and opening hours', 'exterior']].forEach(([h, t, sub, img]) => {
        const c = XF.clone(pat); c.settings.link = Object.assign({}, c.settings.link, { url: h });
        const hs = XF.all([c], x => x.widgetType === 'heading').map(x => x.e); if (hs[0]) hs[0].settings.title = t; if (hs[1]) hs[1].settings.title = sub;
        XF.all([c], x => x.widgetType === 'image').forEach(x => { x.e.settings.image = Object.assign({}, x.e.settings.image, XF.img(img), { alt: '' }); });
        g.elements.push(c);
      });
    });
    // Team menus (desktop mega menu and the mobile menu): Osteopathy = Freta, Emma, Hafi, David; Physio & Massage = Emre, Zoe
    const groups = XF.all(els, e => e.elType === 'container' && (e.elements || []).some(c => XF.linkOf(c) === '/hafi-rahman/')).map(x => x.e);
    groups.forEach(g => {
      const pattern = g.elements.find(c => XF.linkOf(c) === '/hafi-rahman/');
      const at = g.elements.indexOf(pattern);
      const keep = g.elements.filter(c => !/^\/(hafi-rahman|freta-teklesenbet|emma-thompson)\/$/.test(XF.linkOf(c) || ''));
      const people = TEAM.slice(0, 4).map(p => fillPerson(XF.clone(pattern), p));
      g.elements = [...keep.slice(0, at), ...people, ...keep.slice(at)];
    });
    return els;
  };

  /* ================= FOOTER ================= */
  R.footer = () => {
    const els = XF.base(XF.src('t105'));
    XF.deep(els.map(e => e), (s) => s.split('Exhale+Osteopathy+Sutton+Coldfield').join('Lichfield+Osteopathic+Practice+30+Rotten+Row+Lichfield+WS13+6JB')
      .split('1 Sutton Oak Corner, Streetly, Sutton Coldfield, B74 2DH').join(SITE.addr));
    XF.all(els, e => e.widgetType === 'icon-list').forEach(x => (x.e.settings.icon_list || []).forEach(it => {
      if (/Rotten Row/.test(it.text)) it.link = Object.assign({}, it.link, { url: SITE.maps, is_external: 'on' });
    }));
    tryT(els, /Get directions/, '<p><a class="ex-ft-arrow" href="https://www.google.com/maps/dir/?api=1&destination=Lichfield+Osteopathic+Practice+30+Rotten+Row+Lichfield+WS13+6JB" target="_blank" rel="noopener">Get directions →</a></p>');
    XF.all(els, e => e.widgetType === 'text-editor' && /ex-ft-note/.test(e.settings.editor)).forEach(x => x.e.settings.editor = x.e.settings.editor.replace(/<p class="ex-ft-note">[^<]*<\/p>/, '<p class="ex-ft-note">Early evening and Saturday appointments available.</p>'));
    T(els, /^<p><a href="\/osteopathy\/">Osteopathy/, ['/osteopathy/|Osteopathy', '/peadiatric-osteopathy/|Cranial &amp; Paediatric Osteopathy', '/physiotherapy/|Physiotherapy', '/massage/|Sports &amp; Deep Tissue Massage', '/acupuncture/|Acupuncture', '/laser-therapy/|Laser Therapy']
      .map(x => { const [h, t] = x.split('|'); return '<p><a href="' + h + '">' + t + '</a></p>'; }).join(''));
    const clinics = XF.one(els, e => e.widgetType === 'text-editor' && /Rotten Row|ex-ft-sep/.test(e.settings.editor)).e;
    clinics.settings.editor = '<p>Lichfield Osteopathic Practice<br>30 Rotten Row, Lichfield, WS13 6JB<br><a href="tel:+441543252673">01543 252673</a></p><hr class="ex-ft-sep"><p>Our sister clinic<br><a class="ex-underline" href="https://exhaleosteopathy.co.uk/">Exhale Osteopathy, Sutton Coldfield</a></p>';
    // Registered with: GOsC and HCPC only
    const chips = XF.all(els, e => e.widgetType === 'image' && /ex-ft-chip/.test(e.settings._css_classes || '')).map(x => x.e);
    chips.forEach((c, i) => { if (i > 1) XF.remove(els, c); else c.settings.image = Object.assign({}, c.settings.image, XF.img(i ? 'hcpc' : 'gosc'), { alt: i ? 'HCPC registered' : 'General Osteopathic Council registered' }); });
    T(els, /^©/, '© 2026 Lichfield Osteopathic Practice');
    // Exhale's analytics click tracking is Exhale's; leave it out
    XF.all(els, e => e.widgetType === 'html' && /gtag|dataLayer/.test(e.settings.html || '')).forEach(x => XF.remove(els, x.e));
    els[els.length - 1].elements.push(schema());
    return els;
  };

  /* ================= KIT (global colours, fonts, Elementor CSS) ================= */
  R.kit = async () => {
    const src = JSON.parse(JSON.stringify(XF.B.kit.ps));
    const skip = /^(site_|hello_|lightbox|page_title_selector|global_image_lightbox)/;
    const s = {};
    for (const k of Object.keys(src)) if (!skip.test(k)) s[k] = src[k];
    XF.deep(s, (str) => XF.col(str));
    const lop = [['lopcream', 'Cream (old)', '#F4EFEB'], ['lopsand', 'Sand (old)', '#EAE3DD'], ['loplines', 'Lines (old)', '#C9C1BB'], ['lopink', 'Near black', '#1F1F1F']]
      .map(([_id, title, color]) => ({ _id, title, color }));
    s.custom_colors = (s.custom_colors || []).filter(c => !/^lop/.test(c._id)).concat(lop);
    const extraFonts = [['lopjost', 'Menu (Jost)', 'Jost', '500'], ['lopintertight', 'Inter Tight', 'Inter Tight', '400']]
      .map(([_id, title, f, w]) => ({ _id, title, typography_typography: 'custom', typography_font_family: f, typography_font_weight: w }));
    s.custom_typography = (s.custom_typography || []).filter(t => !/^lop/.test(t._id)).concat(extraFonts);
    const kit = elementor.documents.get(elementor.config.kit_id);
    await $e.run('panel/global/open'); await new Promise(r => setTimeout(r, 2500));
    await $e.run('document/elements/settings', { container: kit.container, settings: s, options: { external: true } });
    await $e.run('document/save/update', { document: kit });
    await $e.run('panel/global/close');
    return Object.keys(s).length;
  };

  /* Customizer "Additional CSS" (where Exhale keeps the new design's CSS), recoloured */
  R.css = () => XF.col(XF.CSS)
    .replace(/@font-face\{[^}]*\}/g, '')            // fonts are loaded by Elementor on this site
    .replace(/content:"by Exhale"/g, 'content:""')
    .replace(/exhale-pregnancy-bump-hands/g, 'lop-none');
})();
