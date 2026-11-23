/* Lichfield redesign: treatment pages on the new Exhale treatment template (Exhale's /osteopathy page),
   filled from data/treatments.json and data/practitioners.json. Needs xf.js, recipes.js and window.LOP_DATA. */
(function () {
  const R = window.XR;
  const esc = (s) => String(s).replace(/&amp;/g, '&').replace(/&/g, '&amp;');
  const lc = (s) => String(s).replace(/&amp;/g, '&');
  const cls = (re) => (e) => re.test((e.settings && (e.settings.css_classes || e.settings._css_classes)) || '');
  const id = (v) => (e) => e.settings && e.settings._element_id === v;
  const one = (els, pred, what) => XF.one(els, pred, what).e;
  const W = (els, type) => XF.all(els, e => e.widgetType === type).map(x => x.e);
  const H = (els) => W(els, 'heading');
  const TXT = (els) => W(els, 'text-editor');
  R.esc = esc;

  const SVG = {
    clock: '<circle cx="16" cy="16" r="11"/><path d="M16 10v6l4 3"/>',
    pin: '<path d="M16 29s-9-8.5-9-15a9 9 0 0 1 18 0c0 6.5-9 15-9 15z"/><circle cx="16" cy="14" r="3.2"/>',
    pound: '<path d="M21 9.5a5 5 0 0 0-9 3V24M9 17h9M9 24h13"/>',
    user: '<circle cx="16" cy="11" r="5"/><path d="M6 27c0-5.5 4.5-9 10-9s10 3.5 10 9"/>',
    check: '<circle cx="16" cy="16" r="11"/><path d="M11 16.5l3.5 3.5L21 13"/>'
  };
  R.glance = (facts) => '<ul class="sb-glance" aria-label="At a glance">' + facts.map(f =>
    '<li><span class="sb-gl-ic"><svg viewBox="0 0 32 32" aria-hidden="true">' + (SVG[f.icon] || SVG.check) + '</svg></span><span class="sb-gl-tx"><strong>' + esc(f.v) + '</strong><span>' + esc(f.k) + '</span></span></li>').join('') + '</ul>';
  R.fig = (k, alt) => '<figure class="ex-split-fig"><img src="' + XF.url(k) + '" alt="' + esc(alt || '') + '" loading="lazy" decoding="async"></figure>';
  R.heroPic = (k, pos, alt) => '<picture class="ex-hp"><img src="' + XF.url(k) + '" sizes="100vw" alt="' + esc(alt || '') + '"' + (pos ? ' style="object-position:' + pos + ' !important"' : '') + ' fetchpriority="high" loading="eager" decoding="async"></picture>';
  R.preload = (k) => '<link rel="preload" as="image" href="' + XF.url(k) + '" fetchpriority="high" class="ex-hero-preload">';
  R.ticks = (list) => '<ul class="ex-ticks">' + list.map(t => '<li>' + esc(t) + '</li>').join('') + '</ul>';
  R.toc = (items) => '<nav class="sb-faqnav ex-toc" aria-label="On this page"><span class="ex-toc-t">On this page</span>' + items.map(([t, h]) => '<a href="' + h + '">' + esc(t) + '</a>').join('') + '</nav>';
  const CONDURL = [[/back|postur/i, '/back-pain/'], [/neck/i, '/neck-pain/'], [/shoulder/i, '/shoulder-pain/'], [/hip/i, '/hip-pain/'], [/knee/i, '/knee-pain/'],
    [/ankle|foot/i, '/ankle-pain/'], [/headache|migraine/i, '/headaches/'], [/sciatica/i, '/sciatica/'], [/sport/i, '/sports-injuries/'], [/tendon|repetitive/i, '/tendon-problems/'], [/jaw|tmj/i, '/jaw-pain/']];
  R.condUrl = (t) => { for (const [re, u] of CONDURL) if (re.test(t)) return u; return ''; };
  R.TREATS = [['osteo', 'Osteopathy', '/osteopathy/', 'osteo-arm'], ['paediatric', 'Cranial &amp; Paediatric Osteopathy', '/peadiatric-osteopathy/', 'cranial-baby'],
    ['physio', 'Physiotherapy', '/physiotherapy/', 'hands-leg'], ['massage', 'Sports &amp; Deep Tissue Massage', '/massage/', 'massage-stock'],
    ['acupuncture', 'Acupuncture', '/acupuncture/', 'acupuncture'], ['laser', 'Laser Therapy', '/laser-therapy/', 'laser']];

  // Rebuild a carousel's slides from a list of [title, href, img]
  R.slides = (car, list) => {
    const pat = car.elements[0];
    car.elements = list.map(([t, h, img]) => {
      const sl = XF.clone(pat);
      const card = XF.all([sl], e => e.elType === 'container' && XF.linkOf(e))[0].e;
      card.settings.link = Object.assign({}, card.settings.link, { url: h });
      card.settings.background_image = Object.assign({}, card.settings.background_image, XF.img(img));
      H([card])[0].settings.title = t;
      return sl;
    });
    car.settings.carousel_items = list.map(([t]) => ({ _id: Math.random().toString(16).slice(2, 9), slide_title: lc(t) }));
  };
  // Rebuild accordion items from [{q, a}]
  R.faqs = (acc, faqs) => {
    const pat = acc.elements[0];
    acc.elements = faqs.map(f => { const c = XF.clone(pat); const t = TXT([c])[0]; t.settings.editor = '<p>' + esc(f.a) + '</p>'; return c; });
    acc.settings.items = faqs.map(f => ({ _id: Math.random().toString(16).slice(2, 9), item_title: lc(f.q) }));
  };
  // Rebuild a grid of numbered info cards from [[title, text]]
  R.infocards = (grid, list) => {
    const pat = grid.elements[0];
    grid.elements = list.map(([t, d], i) => { const c = XF.clone(pat); const hs = H([c]); hs[0].settings.title = String(i + 1).padStart(2, '0'); hs[1].settings.title = esc(t); TXT([c])[0].settings.editor = '<p>' + esc(d) + '</p>'; return c; });
  };
  // Registered & Accredited row: GOsC and HCPC only
  R.accr = (els) => XF.all(els, cls(/(^|\s)ex-accr(\s|$)/)).forEach(({ e }) => {
    if (e.widgetType === 'html') { e.settings.html = '<div class="ex-accr"><img src="' + XF.url('gosc') + '" alt="General Osteopathic Council registered" loading="lazy"><img src="' + XF.url('hcpc') + '" alt="HCPC registered" loading="lazy"></div>'; return; }
    const ims = W([e], 'image');
    ims.forEach((im, i) => { if (i > 1) XF.remove(els, im); else im.settings.image = Object.assign({}, im.settings.image, XF.img(i ? 'hcpc' : 'gosc'), { alt: i ? 'HCPC registered' : 'General Osteopathic Council registered' }); });
  });
  // Team cells (Exhale's ex-perso cards)
  R.perso = (grid, keys) => {
    const P = window.LOP_DATA.prac.P;
    const pat = grid.elements[0];
    grid.elements = keys.map(k => {
      const c = XF.clone(pat); const p = P[k]; const href = R.HREF[k];
      const im = W([c], 'image')[0]; im.settings.image = Object.assign({}, im.settings.image, XF.img(k), { alt: p.name }); if (im.settings.link) im.settings.link.url = href;
      const hs = H([c]); hs[0].settings.title = esc(p.name); if (hs[0].settings.link) hs[0].settings.link.url = href; hs[1].settings.title = esc(p.role);
      const t = TXT([c]); t[0].settings.editor = '<p>' + esc(p.lead.split(/(?<=\.)\s/)[0]) + '</p>';
      if (c.settings.link) c.settings.link.url = href;
      return c;
    });
  };

  /* ================= TREATMENT ================= */
  R.treatment = (key) => {
    const s = window.LOP_DATA.treat.S[key]; if (!s) throw new Error('no treatment ' + key);
    const els = XF.base(XF.src('p150'));
    const name = esc(s.name), short = s.short;
    // hero
    one(els, e => e.widgetType === 'html' && /ex-hero-preload/.test(e.settings.html)).settings.html = R.preload(s.heroImg);
    one(els, e => e.widgetType === 'html' && /<picture/.test(e.settings.html)).settings.html = R.heroPic(s.heroImg, s.heroPos, lc(s.name) + ' at Lichfield Osteopathic Practice');
    const hero = els[0];
    const hh = H([hero]);
    hh[0].settings.title = '<a href="/">Home</a> → <a href="/treatments/">Treatments</a> → ' + name;
    hh[1].settings.title = esc(s.h1);
    TXT([hero])[0].settings.editor = '<p>' + esc(s.lead) + '</p>';
    hh.filter(h => /5\.0 on Google/.test(h.settings.title)).forEach(h => XF.remove(els, h));
    one(els, e => e.widgetType === 'html' && /sb-glance/.test(e.settings.html)).settings.html = R.glance(s.facts);
    // intro
    const what = one(els, cls(/sb-what/));
    const im = W([what], 'image')[0]; im.settings.image = Object.assign({}, im.settings.image, XF.img(s.introImg), { alt: lc(s.introAlt || '') });
    XF.all([what], e => e.widgetType === 'html' && /ex-floatcard/.test(e.settings.html)).forEach(x => XF.remove(els, x.e));
    const wh = H([what]); wh[1].settings.title = esc(s.introTitle);
    const wt = TXT([what]); wt[0].settings.editor = '<p>' + esc(s.intro[0]) + '</p>';
    if (s.intro[1]) wt[1].settings.editor = '<p>' + esc(s.intro[1]) + '</p>'; else XF.remove(els, wt[1]);
    one([what], e => e.widgetType === 'html' && /ex-ticks/.test(e.settings.html)).settings.html = R.ticks(s.ticks);
    // long-form: contents, book panel, sections
    const toc = [...s.sections.map(x => [lc(x.title), '#' + x.id]), ['Conditions we treat', '#conditions'], ['What to expect', '#expect'], ...(s.faqs && s.faqs.length ? [['FAQs', '#faqs']] : [])];
    one(els, e => e.widgetType === 'html' && /ex-toc/.test(e.settings.html)).settings.html = R.toc(toc);
    const book = one(els, cls(/ex-lfbook/)); const bh = H([book]); bh[0].settings.title = 'Book ' + name; bh[1].settings.title = '30 Rotten Row, Lichfield';
    const main = one(els, cls(/ex-lf-main/));
    const splitA = one([main], id('what-is')), splitB = one([main], id('approach')), wide = one([main], id('right-for-me'));
    const tech = main.elements.find(cls(/ex-lf-tech/));
    const pics = ['hands-deep', 'hands-back', 'hands-upper', 'hands-leg', 'osteo-arm', 'massage-stock'].filter(k => k !== s.heroImg && k !== s.introImg);
    const rows = s.sections.map((sec, i) => {
      const r = XF.clone(i === 0 ? splitA : i === 1 ? splitB : wide);
      r.settings._element_id = sec.id;
      H([r])[0].settings.title = esc(sec.title);
      const ts = TXT([r]); const holder = XF.all([r], e => (e.elements || []).includes(ts[0]))[0].e;
      const pos = holder.elements.indexOf(ts[0]);
      ts.forEach(t => holder.elements.splice(holder.elements.indexOf(t), 1));
      holder.elements.splice(pos, 0, ...sec.paras.map(p => { const t = XF.clone(ts[0]); t.settings.editor = '<p>' + p + '</p>'; return t; }));
      const fig = XF.all([r], e => e.widgetType === 'html' && /ex-split-fig/.test(e.settings.html))[0];
      if (fig) fig.e.settings.html = R.fig(pics[i % pics.length], lc(sec.title));
      return r;
    });
    main.elements = [...rows, ...(tech ? [tech] : [])];
    if (tech) {
      if (s.techniques && s.techniques.length) { H([tech])[0].settings.title = esc(s.techTitle || 'Techniques we use'); R.infocards(one([tech], cls(/sb-grid/)), s.techniques.map(t => [t.t, t.d])); }
      else main.elements.pop();
    }
    // conditions
    const cs = one(els, id('conditions'));
    H([cs])[1].settings.title = esc(s.condsTitle || 'What we can help with');
    TXT([cs])[0].settings.editor = '<p>' + esc(s.condsLead) + '</p>';
    const grid = one([cs], cls(/ex-minigrid/)); const pat = grid.elements[0];
    grid.elements = s.conds.map(c => {
      const card = XF.clone(pat); const u = R.condUrl(lc(c));
      const ci = W([card], 'image')[0]; ci.settings.image = Object.assign({}, ci.settings.image, XF.img(u ? XF.IMG_BY_LINK[u] : 'hands-deep'), { alt: '' });
      const ch = H([card])[0]; ch.settings.title = esc(c);
      [ci, ch].forEach(w => { if (u) w.settings.link = Object.assign({}, w.settings.link, { url: u }); else delete w.settings.link; });
      if (!u) card.settings.css_classes = (card.settings.css_classes || '').replace('sb-cell--link', '');
      return card;
    });
    // first appointment steps
    const ex = one(els, id('expect'));
    H([ex])[1].settings.title = 'What to expect at your first ' + esc(short) + ' appointment';
    R.infocards(one([ex], cls(/sb-grid/)), s.steps.map(x => [x.t, x.d]));
    // team
    const ts = one(els, cls(/ex-teamsec/));
    H([ts])[1].settings.title = s.team.length > 1 ? 'Your ' + esc(short) + ' team' : 'Your ' + esc(short) + ' practitioner';
    R.perso(one([ts], cls(/ex-team3/)), s.team);
    // no genuine Lichfield reviews yet
    XF.remove(els, one(els, cls(/ex-rv/)));
    // FAQs
    const fq = one(els, id('faqs'));
    if (s.faqs && s.faqs.length) { H([fq])[1].settings.title = 'Your ' + esc(short) + ' questions, answered'; R.faqs(W([fq], 'nested-accordion')[0], s.faqs); }
    else XF.remove(els, fq);
    // works well with
    R.slides(W(els, 'nested-carousel')[0], R.TREATS.filter(t => t[0] !== key).map(t => [t[1], t[2], t[3]]));
    R.accr(els);
    // book banner
    const bb = one(els, id('book'));
    H([bb])[1].settings.title = 'Book your ' + esc(short) + ' appointment today';
    XF.all([bb], e => e.widgetType === 'html').forEach(x => { x.e.settings.html = x.e.settings.html.replace(/whether osteopathy is right/g, 'whether ' + esc(short) + ' is right'); });
    return els;
  };
})();
