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
      const t = TXT([c]); if (t.length > 1) t[0].settings.editor = '<p>' + esc(p.lead.split(/(?<=\.)\s/)[0]) + '</p>';
      if (c.settings.link) c.settings.link.url = href;
      return c;
    });
  };

  /* ================= TREATMENT ================= */
  const TSRC = { osteo: 'p150', paediatric: 'p217', massage: 'p214', physio: 'p213', acupuncture: 'p219', laser: 'p215' };
  const CSRC = { back: 'p161', neck: 'p223', shoulder: 'p224', hip: 'p225', knee: 'p226', foot: 'p227', headaches: 'p228', sciatica: 'p229', sports: 'p230', tendon: 'p231', jaw: 'p232' };
  const figsOf = (els) => XF.all(els, e => e.widgetType === 'html' && /ex-split-fig/.test(e.settings.html)).map(x => x.e.settings.html);
  const exPhoto = (html) => /hafir63/.test(html || '');
  R.treatment = (key) => {
    const s = window.LOP_DATA.treat.S[key]; if (!s) throw new Error('no treatment ' + key);
    const src = XF.B[TSRC[key]] ? TSRC[key] : 'p150';
    const els = XF.base(XF.src(src));
    const exFigs = figsOf(els).filter(exPhoto);
    const name = esc(s.name), short = s.short;
    // hero
    const pic = one(els, e => e.widgetType === 'html' && /<picture/.test(e.settings.html));
    if (!exPhoto(pic.settings.html)) { one(els, e => e.widgetType === 'html' && /ex-hero-preload/.test(e.settings.html)).settings.html = R.preload(s.heroImg); pic.settings.html = R.heroPic(s.heroImg, s.heroPos, lc(s.name) + ' at Lichfield Osteopathic Practice'); }
    else pic.settings.html = pic.settings.html.replace(/alt="[^"]*"/, 'alt="' + lc(s.name) + ' at Lichfield Osteopathic Practice"');
    const hero = els[0];
    const hh = H([hero]);
    hh[0].settings.title = '<a href="/">Home</a> → <a href="/treatments/">Treatments</a> → ' + name;
    hh[1].settings.title = esc(s.h1);
    TXT([hero])[0].settings.editor = '<p>' + esc(s.lead) + '</p>';
    hh.filter(h => /5\.0 on Google/.test(h.settings.title)).forEach(h => XF.remove(els, h));
    one(els, e => e.widgetType === 'html' && /sb-glance/.test(e.settings.html)).settings.html = R.glance(s.facts);
    // intro
    const what = one(els, cls(/sb-what/));
    const im = W([what], 'image')[0]; if (!/hafir63\.sg-host\.com\/wp-content\/uploads\/20\d\d\/11\/exhale-/.test(im.settings.image.url)) im.settings.image = Object.assign({}, im.settings.image, XF.img(s.introImg)); im.settings.image.alt = lc(s.introAlt || '');
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
      if (fig) fig.e.settings.html = exFigs.length ? exFigs[i % exFigs.length] : R.fig(pics[i % pics.length], lc(sec.title));
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
    const exCards = grid.elements.map(c => W([c], 'image')[0]).filter(Boolean).map(i => i.settings.image);
    grid.elements = s.conds.map((c, ci0) => {
      const card = XF.clone(pat); const u = R.condUrl(lc(c));
      const ci = W([card], 'image')[0]; ci.settings.image = Object.assign({}, ci.settings.image, u ? XF.img(XF.IMG_BY_LINK[u]) : exCards[ci0 % exCards.length], { alt: '' });
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

  /* ================= CONDITION ================= */
  R.condition = (key) => {
    const D = window.LOP_DATA.cond, c = D.C[key]; if (!c) throw new Error('no condition ' + key);
    const els = XF.base(XF.src(XF.B[CSRC[key]] ? CSRC[key] : 'p161'));
    const name = esc(c.name), lower = esc(c.lower);
    const pic = one(els, e => e.widgetType === 'html' && /<picture/.test(e.settings.html));
    if (!exPhoto(pic.settings.html)) { one(els, e => e.widgetType === 'html' && /ex-hero-preload/.test(e.settings.html)).settings.html = R.preload(c.hero); pic.settings.html = R.heroPic(c.hero, c.heroPos, lc(c.introAlt || c.name)); }
    else pic.settings.html = pic.settings.html.replace(/alt="[^"]*"/, 'alt="' + lc(c.name) + ' treatment at Lichfield Osteopathic Practice"');
    const hero = els[0]; const hh = H([hero]);
    hh[0].settings.title = '<a href="/">Home</a> → <a href="/conditions/">What We Treat</a> → ' + name;
    hh[1].settings.title = esc(c.h1);
    TXT([hero])[0].settings.editor = '<p>' + esc(c.lead) + '</p>';
    hh.filter(h => /5\.0 on Google/.test(h.settings.title)).forEach(h => XF.remove(els, h));
    one(els, e => e.widgetType === 'html' && /sb-glance/.test(e.settings.html)).settings.html = R.glance([
      { k: 'Seen by', v: 'Registered clinicians', icon: 'user' }, { k: 'GP referral', v: 'Not needed', icon: 'check' }, { k: 'Clinic', v: '30 Rotten Row, Lichfield', icon: 'pin' }]).replace('class="sb-glance"', 'class="sb-glance ex-glance--3"');
    // intro
    const what = one(els, cls(/sb-what/));
    const im = W([what], 'image')[0]; if (!/hafir63\.sg-host\.com\/wp-content\/uploads\/20\d\d\/11\/exhale-/.test(im.settings.image.url)) im.settings.image = Object.assign({}, im.settings.image, XF.img(c.introImg)); im.settings.image.alt = lc(c.introAlt || '');
    XF.all([what], e => e.widgetType === 'html' && /ex-floatcard/.test(e.settings.html)).forEach(x => XF.remove(els, x.e));
    const wh = H([what]); wh[0].settings.title = name + ' Treatment'; wh[1].settings.title = esc(c.introTitle);
    const wt = TXT([what]); const holder = XF.all([what], e => (e.elements || []).includes(wt[0]))[0].e; const at = holder.elements.indexOf(wt[0]);
    wt.forEach(t => holder.elements.splice(holder.elements.indexOf(t), 1));
    holder.elements.splice(at, 0, ...c.intro.map(p => { const t = XF.clone(wt[0]); t.settings.editor = '<p>' + esc(p) + '</p>'; return t; }));
    // symptoms + causes
    const cols = XF.all(els, cls(/ex-cols/)).map(x => x.e);
    const c1 = cols[0].elements[0].elements[0].elements; // two column cards
    const sym = cols[0], symCards = XF.all([sym], cls(/ex-colcard/)).map(x => x.e);
    H([symCards[0]])[1].settings.title = esc(c.symTitle);
    W([symCards[0]], 'html')[0].settings.html = '<ul class="ex-dots">' + c.symptoms.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>';
    H([symCards[1]])[1].settings.title = esc(c.causeTitle);
    W([symCards[1]], 'html')[0].settings.html = '<dl class="ex-dl">' + c.causes.map(x => '<div><dt>' + esc(x.t) + '</dt><dd>' + esc(x.d) + '</dd></div>').join('') + '</dl>';
    // how we help
    const steps = XF.all(els, cls(/ex-steps/)).map(x => x.e);
    const help = steps[0];
    const fig = XF.all([help], e => e.widgetType === 'html' && /ex-split-fig/.test(e.settings.html))[0];
    if (fig && !exPhoto(fig.e.settings.html)) fig.e.settings.html = R.fig(D.TH[key] === c.hero ? 'hands-deep' : (D.TH[key] || 'hands-deep'), lc(c.name) + ' treatment');
    const helpH = H([help]); helpH[1].settings.title = esc(c.helpTitle);
    TXT([help])[0].settings.editor = '<p>' + esc(c.helpLead) + '</p>';
    const hg = one([help], cls(/sb-grid/)); const hp = hg.elements[0];
    hg.elements = c.treats.map(([k, d], i) => {
      const [tn, tu] = D.TREAT[k]; const card = XF.clone(hp); const hs = H([card]);
      hs[0].settings.title = String(i + 1).padStart(2, '0'); hs[1].settings.title = esc(tn); hs[1].settings.link = Object.assign({}, hs[1].settings.link, { url: tu });
      const ts = TXT([card]); ts[0].settings.editor = '<p>' + esc(d) + '</p>'; if (ts[1]) ts[1].settings.editor = '<p><a href="' + tu + '">About ' + esc(tn) + ' →</a></p>';
      if (card.settings.link) card.settings.link.url = tu;
      return card;
    });
    // self-help + red flags
    const self = cols[1]; const sc = XF.all([self], cls(/ex-colcard/)).map(x => x.e);
    W([sc[0]], 'html')[0].settings.html = '<ol class="ex-nums">' + c.tips.map((t, i) => '<li><span class="ex-n">' + String(i + 1).padStart(2, '0') + '</span><span>' + esc(t).replace(/(\d+)–(\d+)/g, '$1 to $2') + '</span></li>').join('') + '</ol>';
    W([sc[1]], 'html')[0].settings.html = '<ul class="ex-dots">' + c.redFlags.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>';
    const gp = TXT([sc[1]])[0]; if (gp) { if (c.gpNote) gp.settings.editor = '<p>' + esc(c.gpNote) + '</p>'; else XF.remove(els, gp); }
    // first appointment
    const ex = steps[1];
    H([ex])[1].settings.title = 'What to expect when you come to us with ' + lower;
    R.infocards(one([ex], cls(/sb-grid/)), D.steps.map(x => [lc(x.t), lc(x.d)]));
    // team
    const ts = one(els, cls(/ex-teamsec/));
    H([ts])[1].settings.title = 'Who you’ll see for ' + lower;
    R.perso(one([ts], cls(/ex-team3/)), c.team);
    XF.remove(els, one(els, cls(/ex-rv/)));
    XF.remove(els, one(els, cls(/ex-areas/)));
    // FAQs
    const fq = one(els, id('faqs'));
    if (c.faqs && c.faqs.length) { H([fq])[1].settings.title = esc(c.faqTitle); R.faqs(W([fq], 'nested-accordion')[0], c.faqs); } else XF.remove(els, fq);
    // related conditions
    const rel = one(els, cls(/ex-cond/));
    H([rel])[1].settings.title = 'You might also be interested in';
    const rg = one([rel], cls(/ex-minigrid/)); const rp = rg.elements[0];
    rg.elements = c.related.map(k => {
      const [rn, ru] = D.PAGE[k]; const card = XF.clone(rp);
      const ci = W([card], 'image')[0]; ci.settings.image = Object.assign({}, ci.settings.image, XF.img(XF.IMG_BY_LINK[ru] || D.TH[k] || 'hands-deep'), { alt: '' }); ci.settings.link = Object.assign({}, ci.settings.link, { url: ru });
      const ch = H([card])[0]; ch.settings.title = esc(rn); ch.settings.link = Object.assign({}, ch.settings.link, { url: ru });
      return card;
    });
    R.accr(els);
    const bb = one(els, id('book'));
    H([bb])[1].settings.title = esc(c.ctaTitle || ('Book ' + c.lower + ' treatment in Lichfield'));
    TXT([bb])[0].settings.editor = '<p>Appointments Monday to Saturday at 30 Rotten Row, Lichfield. No GP referral needed.</p>';
    return els;
  };

  /* ================= PRACTITIONER PROFILE ================= */
  const DAYS = { freta: 'Mon · Tue · Wed · Fri', emma: 'Monday', hafi: 'Friday', david: 'Thursday', zoe: 'Wed evening · Sat morning', emre: 'Call 01543 252673 for days' };
  const TURL = { osteo: ['Osteopathy', '/osteopathy/'], paediatric: ['Cranial &amp; Paediatric Osteopathy', '/peadiatric-osteopathy/'], massage: ['Sports &amp; Deep Tissue Massage', '/massage/'],
    physio: ['Physiotherapy', '/physiotherapy/'], acupuncture: ['Acupuncture', '/acupuncture/'], laser: ['Laser Therapy', '/laser-therapy/'] };
  R.practitioner = (key) => {
    const p = window.LOP_DATA.prac.P[key]; if (!p) throw new Error('no practitioner ' + key);
    const els = XF.base(XF.src('p168'));
    const first = esc(p.first), name = esc(p.name);
    // hero
    const hero = els[0]; const hh = H([hero]);
    hh[0].settings.title = '<a href="/">Home</a> → <a href="/meet-the-team/">Our Team</a> → ' + name;
    hh[1].settings.title = esc(p.role); hh[2].settings.title = name; hh[3].settings.title = esc(p.reg);
    TXT([hero])[0].settings.editor = '<p>' + esc(p.lead) + '</p>';
    one([hero], e => e.widgetType === 'html' && /ex-ticks/.test(e.settings.html)).settings.html = R.ticks(p.creds).replace('class="ex-ticks"', 'class="ex-ticks ex-ticks--dark"');
    const bt = W([hero], 'button'); if (bt[0]) bt[0].settings.text = 'Book with ' + first;
    one([hero], e => e.widgetType === 'html' && /<picture/.test(e.settings.html)).settings.html = R.heroPic(p.portrait || key, 'center top', 'Portrait of ' + lc(p.name));
    one([hero], e => e.widgetType === 'html' && /ex-floatcard/.test(e.settings.html)).settings.html =
      '<div class="ex-floatcard ex-floatcard--prof"><span class="ex-fc-k">In clinic at</span><span class="ex-fc-b">30 Rotten Row, Lichfield</span><span class="ex-fc-t">' + DAYS[key] + '</span></div>';
    const n = p.facts.length;
    one(els, e => e.widgetType === 'html' && /sb-glance/.test(e.settings.html)).settings.html = R.glance(p.facts.map(f => ({ k: f.k, v: f.v, icon: /lichfield|clinic/i.test(f.k) ? 'pin' : /role|registered|gosc/i.test(f.k) ? 'check' : 'user' })))
      .replace('class="sb-glance"', 'class="sb-glance ex-glance--' + n + '"');
    // about + sidebar
    const ab = one(els, cls(/ex-abou/));
    const ah = H([ab]); ah[0].settings.title = 'About ' + first; ah[1].settings.title = esc(p.aboutTitle);
    const ats = TXT([ab]); const holder = XF.all([ab], e => (e.elements || []).includes(ats[0]))[0].e; const at = holder.elements.indexOf(ats[0]);
    ats.forEach(t => holder.elements.splice(holder.elements.indexOf(t), 1));
    holder.elements.splice(at, 0, ...p.bio.map(x => { const t = XF.clone(ats[0]); t.settings.editor = '<p>' + esc(x) + '</p>'; return t; }));
    const q = XF.all([ab], e => e.widgetType === 'html' && /ex-quoteblock/.test(e.settings.html))[0];
    if (q) { if (p.quote) q.e.settings.html = '<blockquote class="ex-quoteblock"><p>“' + esc(p.quote) + '”</p><cite>' + esc(p.quoteBy || p.name) + '</cite></blockquote>'; else XF.remove(els, q.e); }
    const side = one([ab], cls(/ex-sidecard/));
    const dls = W([side], 'html').filter(h => /ex-dl1/.test(h.settings.html)); const dpos = side.elements.indexOf(dls[0]);
    dls.forEach(d => side.elements.splice(side.elements.indexOf(d), 1));
    side.elements.splice(dpos, 0, ...p.quals.map(x => { const d = XF.clone(dls[0]); d.settings.html = '<div class="ex-dl1"><strong>' + esc(x.t) + '</strong><span>' + esc(x.d || '') + '</span></div>'; return d; }));
    const regIm = W([side], 'image'); const regs = [p.gosc !== false ? 'gosc' : null, p.hcpc ? 'hcpc' : null].filter(Boolean);
    regIm.forEach((im, i) => { if (!regs[i]) XF.remove(els, im); else im.settings.image = Object.assign({}, im.settings.image, XF.img(regs[i]), { alt: regs[i] === 'gosc' ? 'General Osteopathic Council registered' : 'HCPC registered' }); });
    if (!regs.length) { const rh = H([side]).find(h => /Registrations/.test(h.settings.title)); if (rh) XF.remove(els, rh); }
    // special interests
    const sp = one(els, e => cls(/ex-cond/)(e) && !id('treatments')(e) && H([e]).some(h => /Special Interests/.test(h.settings.title)));
    H([sp])[1].settings.title = 'What ' + first + ' helps with most';
    const sg = one([sp], cls(/ex-minigrid/)); const spat = sg.elements[0];
    sg.elements = (p.interests || []).map(x => {
      const card = XF.clone(spat); const u = /bab|child|infant/i.test(x.t) ? '/peadiatric-osteopathy/' : R.condUrl(x.t);
      const ci = W([card], 'image')[0]; ci.settings.image = Object.assign({}, ci.settings.image, XF.img((u && XF.IMG_BY_LINK[u]) || x.img || 'hands-deep'), { alt: '' });
      const ch = H([card])[0]; ch.settings.title = esc(x.t); TXT([card])[0].settings.editor = '<p>' + esc(x.d) + '</p>';
      [ci, ch].forEach(w => { if (u) w.settings.link = Object.assign({}, w.settings.link, { url: u }); else delete w.settings.link; });
      return card;
    });
    // treatments
    const tr = one(els, id('treatments'));
    H([tr])[1].settings.title = 'Book ' + first + ' for';
    const tg = one([tr], cls(/ex-minigrid/)); const tpat = tg.elements[0];
    tg.elements = (p.treatments || []).map(k => {
      const [tn, tu] = TURL[k]; const card = XF.clone(tpat);
      const ci = W([card], 'image')[0]; ci.settings.image = Object.assign({}, ci.settings.image, XF.img(XF.IMG_BY_LINK[tu]), { alt: '' }); ci.settings.link = Object.assign({}, ci.settings.link, { url: tu });
      const ch = H([card])[0]; ch.settings.title = tn; ch.settings.link = Object.assign({}, ch.settings.link, { url: tu });
      const more = TXT([card])[0]; if (more) more.settings.editor = '<p><a href="' + tu + '">Learn More →</a></p>';
      return card;
    });
    // credentials
    const cr = one(els, cls(/ex-steps/));
    H([cr])[1].settings.title = esc(p.credTitle || 'Qualified and experienced');
    if (p.recognition && p.recognition.length) R.infocards(one([cr], cls(/sb-grid/)), p.recognition.map(x => [x.t, x.d])); else XF.remove(els, cr);
    // no "outside the clinic" or reviews for Lichfield yet
    XF.remove(els, one(els, cls(/ex-outside/)).constructor === Object ? XF.all(els, e => cls(/sb-what/)(e) && XF.all([e], cls(/ex-outside/)).length)[0].e : null);
    XF.remove(els, one(els, cls(/ex-rv/)));
    // rest of the team
    const tm = one(els, id('team'));
    R.perso(one([tm], cls(/ex-team3/)), R.TEAM.map(t => t[0]).filter(k => k !== key));
    R.accr(els);
    const bb = one(els, id('book'));
    H([bb])[1].settings.title = 'Book an appointment with ' + first;
    TXT([bb])[0].settings.editor = '<p>Book online in under a minute, or call 01543 252673 and ask for ' + first + '.</p>';
    XF.all([bb], e => e.widgetType === 'html').forEach(x => { x.e.settings.html = x.e.settings.html.replace(/Hafi/g, first); });
    return els;
  };
})();
