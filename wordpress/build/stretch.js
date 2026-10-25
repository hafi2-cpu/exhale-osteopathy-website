/* Build the Assisted Stretch Therapy page in the CURRENT (empty) Elementor document.
   Sections are cloned from the live-styled Acupuncture page (localStorage.acu219) and Fees page (localStorage.fees357),
   then re-worded from data/stretch.json (window.ST). Progress on window.PIPE. */
(async function () {
  const PIPE = window.PIPE = { stage: 'load', warn: [] };
  try {
    for (let i = 0; i < 240 && !(window.elementor && elementor.getPreviewContainer && elementor.getPreviewContainer()); i++) await new Promise(r => setTimeout(r, 250));
    const D = window.ST;
    const A = JSON.parse(localStorage.getItem('acu219')), F = JSON.parse(localStorage.getItem('fees357'));
    if (!A || !F) throw new Error('source pages not cached');
    const rid = () => Math.random().toString(16).slice(2, 9);
    const clone = (o) => JSON.parse(JSON.stringify(o));
    const reid = (e) => { e.id = rid(); (e.elements || []).forEach(reid); return e; };
    const find = (root, id) => { if (root.id === id) return root; for (const c of root.elements || []) { const r = find(c, id); if (r) return r; } return null; };
    const byId = (root, id) => { const r = find(root, id); if (!r) PIPE.warn.push('missing ' + id); return r || { settings: {}, elements: [] }; };
    const T = (root, id, v) => { byId(root, id).settings.title = v; };
    const X = (root, id, v) => { byId(root, id).settings.editor = /^\s*</.test(v) ? v : '<p>' + v + '</p>'; };
    const sec = (i) => clone(A[i]);
    const out = [];

    /* 0 HERO */
    const hero = sec(0);
    Object.assign(hero.settings, { background_image: D.heroImg });
    T(hero, '875f169', D.crumbs); T(hero, '8f9fdee', D.h1); X(hero, 'bfc12d5', D.lead);
    Object.assign(byId(hero, 'bac1f3f').settings, { text: 'Book your first session', link: { url: D.book, is_external: 'on', nofollow: '' } });
    Object.assign(byId(hero, 'c8b1836').settings, { text: 'Sessions & prices', link: { url: '#prices', is_external: '', nofollow: '' } });
    out.push(hero);

    /* 1 FACTS */
    const facts = sec(1);
    [['c17380a', '5f47e44'], ['86a7269', '582211f'], ['4bc5b7a', 'da3f2d8'], ['1dc2386', '9be7325']].forEach(([k, v], i) => { T(facts, k, D.facts[i][0]); T(facts, v, D.facts[i][1]); });
    out.push(facts);

    /* 2 INTRO */
    const intro = sec(2);
    T(intro, '145b3f3', D.introTitle); X(intro, '23f4fa2', D.intro[0]); X(intro, '3775bb4', D.intro[1]);
    byId(intro, '127670f').elements.forEach((tick, i) => { const t = (tick.elements || []).find(e => e.widgetType === 'text-editor'); if (t && D.ticks[i]) t.settings.editor = '<p>' + D.ticks[i] + '</p>'; });
    Object.assign(byId(intro, '5c8e8ec').settings, { image: Object.assign({ alt: D.introAlt, source: 'library' }, D.introImg) });
    out.push(intro);

    /* 3 BODY */
    const body = sec(3);
    byId(body, '0ad771e').elements.forEach((h, i) => { if (D.toc[i]) h.settings.title = '<a href="' + D.toc[i][1] + '">' + D.toc[i][0] + '</a>'; });
    T(body, 'dc6edf7', D.sideTitle); T(body, 'a8f7a74', D.sideSub);
    Object.assign(byId(body, '916bd5d').settings, { link: { url: D.book, is_external: 'on', nofollow: '' } });
    const col = byId(body, '3a68b97');
    const artTpl = clone(byId(body, '3122750')); // article with heading + 2 paras
    const paraTpl = artTpl.elements.find(e => e.widgetType === 'text-editor');
    const tech = col.elements.find(e => e.id === '54df740');
    col.elements = D.sections.map(s => {
      const a = reid(clone(artTpl)); a.settings._element_id = s.id;
      const h = a.elements.find(e => e.widgetType === 'heading'); h.settings.title = s.title;
      a.elements = [h, ...s.paras.map(p => { const t = reid(clone(paraTpl)); t.settings.editor = '<p>' + p + '</p>'; return t; })];
      return a;
    });
    tech.elements.find(e => e.widgetType === 'heading').settings.title = D.techTitle;
    const tgrid = tech.elements.find(e => e.elType === 'container');
    tgrid.elements.forEach((card, i) => {
      const hs = card.elements.filter(e => e.widgetType === 'heading'), tx = card.elements.find(e => e.widgetType === 'text-editor');
      if (!D.techniques[i]) return; hs[1].settings.title = D.techniques[i][0]; tx.settings.editor = '<p>' + D.techniques[i][1] + '</p>';
    });
    col.elements.push(tech);
    out.push(body);

    /* 4 PRICES (from Fees page) */
    const pr = clone(F[1]); const P = D.prices;
    pr.settings._element_id = 'prices'; pr.settings.css_classes = 'ex-anchor';
    T(pr, 'a774c20', P.eyebrow); T(pr, '3816549', P.title); X(pr, '96e8333', P.text);
    const card = clone(byId(F[1], '46a7a2f'));
    T(card, '4ffa07a', P.cardTitle); X(card, '8a4cdc4', P.cardText); T(card, '03c73e8', P.cardLink);
    T(card, 'fac773a', P.group1); T(card, 'c036e8f', P.group2);
    const setRow = (row, r, book) => {
      const grow = row.elements[0], fit = row.elements[1];
      grow.elements.find(e => e.widgetType === 'heading').settings.title = r[0];
      grow.elements.find(e => e.widgetType === 'text-editor').settings.editor = '<p>' + r[1] + '</p>';
      fit.elements.find(e => e.widgetType === 'heading').settings.title = r[2];
      const b = fit.elements.find(e => e.widgetType === 'button');
      Object.assign(b.settings, book ? { text: 'Book', link: { url: D.book, is_external: 'on', nofollow: '' } } : { text: 'Ask', link: { url: 'tel:+441217512440', is_external: '', nofollow: '' } });
    };
    setRow(byId(card, '823555b'), P.rows1[0], true); setRow(byId(card, '1f7c9dc'), P.rows1[1], true);
    const list2 = byId(card, '3fd20e8'); const r2 = byId(card, 'bea928c');
    const r3 = reid(clone(r2)); list2.elements.push(r3);
    setRow(r2, P.rows2[0], false); setRow(r3, P.rows2[1], false);
    X(card, '0657134', P.note);
    reid(card);
    byId(pr, 'e4249cb').elements = [card];
    out.push(reid(pr));

    /* 5 SELF-PAY band (from Fees insurance band) */
    const sp = clone(F[3]);
    T(sp, '055e069', D.selfpay.eyebrow); T(sp, '784468e', D.selfpay.title); X(sp, '1901207', D.selfpay.text);
    out.push(reid(sp));

    /* 6 WHAT TO EXPECT */
    const ex = sec(5);
    T(ex, '7c53d2c', D.expectEyebrow); T(ex, '1720dee', D.expectTitle);
    [['cd6ac83', 'aa4f5ea'], ['0edee1f', 'a46c0fc'], ['09881c6', 'd274491'], ['2e56dbf', '555af5a']].forEach(([h, t], i) => { T(ex, h, D.steps[i][0]); X(ex, t, D.steps[i][1]); });
    out.push(ex);

    /* 7 WHY EXHALE (from Fees "Good to know") */
    const why = clone(F[2]);
    T(why, '5a94043', D.why.eyebrow); T(why, '5870c54', D.why.title);
    [['96c65fa', 'ecdc0c1'], ['7b5b832', '1a02504'], ['16fe4b6', '64a8198'], ['aac7a08', 'cb05534']].forEach(([h, t], i) => { T(why, h, D.why.cards[i][0]); X(why, t, D.why.cards[i][1]); });
    out.push(reid(why));

    /* 8 TEAM, 9 REVIEWS, 10 FAQS */
    const team = sec(6); T(team, '2c79446', D.teamTitle); out.push(team);
    const rv = sec(7); T(rv, 'e46dcf4', D.reviewsTitle);
    [['70d0f74', '3d4f025'], ['27276a0', 'e53d64b'], ['eadb6f0', '9c68d8e']].forEach(([t, n], i) => { X(rv, t, '“' + D.reviews[i][0] + '”'); T(rv, n, D.reviews[i][1]); });
    out.push(rv);
    const fq = sec(8); T(fq, '5f47a49', D.faqTitle);
    const acc = byId(fq, '1dfe8b6'); const itemTpl = clone(acc.elements[0]);
    acc.settings.items = D.faqs.map(f => ({ _id: rid(), item_title: f[0].replace(/&amp;/g, '&'), element_css_id: '' }));
    acc.elements = D.faqs.map(f => { const c = reid(clone(itemTpl)); c.elements = [c.elements[0]]; c.elements[0].settings.editor = '<p>' + f[1] + '</p>'; return c; });
    out.push(fq);

    /* 11 WORKS WELL WITH, 12 LOGOS, 13 BOOK */
    out.push(sec(9)); out.push(sec(10));
    const bk = sec(11);
    Object.assign(bk.settings, { background_image: D.heroImg });
    T(bk, '6a48ab7', D.bookTitle); X(bk, '93232a3', D.bookText);
    const c1 = byId(bk, '95249d2'); if (c1.settings.link) c1.settings.link = { url: D.book, is_external: 'on', nofollow: '' };
    const s2 = JSON.stringify(byId(bk, 'a2be5b4')).replace(/acupuncture/g, 'assisted stretching');
    const a2 = JSON.parse(s2); Object.assign(byId(bk, 'a2be5b4'), a2);
    byId(bk, 'e0e58c6').elements.push({ id: rid(), elType: 'widget', widgetType: 'html', isInner: false, settings: { html: '<script type="application/ld+json">' + JSON.stringify(D.schema) + '</script>' }, elements: [] });
    out.push(bk);

    out.forEach(reid);
    const left = JSON.stringify(out.slice(0, 9)).match(/acupunct[a-z]*/gi);
    if (left) PIPE.warn.push('leftover: ' + [...new Set(left)].join(','));
    PIPE.sections = out.length;
    if (window.ST_DRY) { PIPE.stage = 'dry'; window.ST_OUT = out; return; }
    PIPE.stage = 'inserting';
    const target = elementor.getPreviewContainer();
    for (let i = 0; i < out.length; i++) await $e.run('document/elements/create', { container: target, model: out[i], options: { at: i } });
    PIPE.stage = 'saving';
    await $e.run('document/save/publish');
    PIPE.stage = 'done';
  } catch (e) { PIPE.stage = 'err ' + e.message; }
})();
