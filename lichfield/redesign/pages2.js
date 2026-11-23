/* Lichfield redesign: About, New Patients, Pricing, Contact and Meet the Team, on Exhale's new templates.
   Only facts from the live Lichfield site, the SEO brief and Hafi's answers. Needs xf.js, recipes.js, pages.js. */
(function () {
  const R = window.XR;
  const esc = R.esc;
  const cls = (re) => (e) => re.test((e.settings && (e.settings.css_classes || e.settings._css_classes)) || '');
  const id = (v) => (e) => e.settings && e.settings._element_id === v;
  const one = (els, pred, what) => XF.one(els, pred, what).e;
  const W = (els, type) => XF.all(els, e => e.widgetType === type).map(x => x.e);
  const H = (els) => W(els, 'heading');
  const TXT = (els) => W(els, 'text-editor');
  const P = (t) => '<p>' + t + '</p>';
  const A = (h, t) => '<a class="ex-underline" href="' + h + '">' + t + '</a>';
  const byTitle = (els, re) => H(els).find(h => re.test(h.settings.title.replace(/<[^>]+>/g, '')));
  const setT = (els, re, v) => { const h = byTitle(els, re); if (!h) throw new Error('no heading ' + re); h.settings.title = v; return h; };
  const setX = (els, re, v) => { const t = TXT(els).find(t => re.test(t.settings.editor.replace(/<[^>]+>/g, ''))); if (!t) throw new Error('no text ' + re); t.settings.editor = v; return t; };
  const secWith = (els, re) => els.find(s => H([s]).some(h => re.test(h.settings.title.replace(/<[^>]+>/g, ''))) || TXT([s]).some(t => re.test(t.settings.editor.replace(/<[^>]+>/g, ''))));
  const hero = (els, crumb, h1, lead, img, alt) => {
    const h = els[0]; const hh = H([h]);
    hh[0].settings.title = '<a href="/">Home</a> → ' + crumb; hh[1].settings.title = h1;
    TXT([h])[0].settings.editor = P(lead);
    const pre = XF.all([h], e => e.widgetType === 'html' && /ex-hero-preload/.test(e.settings.html))[0]; if (pre) pre.e.settings.html = R.preload(img);
    const pic = XF.all([h], e => e.widgetType === 'html' && /<picture/.test(e.settings.html))[0]; if (pic) pic.e.settings.html = R.heroPic(img, '', alt);
  };
  const dropSchema = (els) => XF.all(els, e => e.widgetType === 'html' && /application\/ld\+json/.test(e.settings.html || '')).forEach(x => XF.remove(els, x.e));
  const dropReviews = (els) => XF.all(els, cls(/ex-rv(\s|$)/)).forEach(x => XF.remove(els, x.e));
  const ROTA = [['Monday', 'Freta, Emma'], ['Tuesday', 'Freta'], ['Wednesday', 'Freta · Zoe (4pm to 8pm)'], ['Thursday', 'David'], ['Friday', 'Freta, Hafi'], ['Saturday', 'Zoe (8am to 12pm)']];
  R.ROTA = ROTA;

  /* ================= ABOUT ================= */
  R.about = () => {
    const els = XF.base(XF.src('p356'));
    hero(els, 'About Us', 'Caring for Lichfield since 1983', 'Lichfield Osteopathic Practice is a busy clinic at 30 Rotten Row, a few minutes’ walk from the city centre, offering a truly holistic approach to health.', 'exterior', 'Lichfield Osteopathic Practice, 30 Rotten Row');
    const story = secWith(els, /Our Story/);
    setT([story], /^Built on word of mouth/, 'Osteopathy for all the family');
    const st = TXT([story]);
    st[0].settings.editor = P('Lichfield Osteopathic Practice was established in 1983. Today it is a busy clinic of four registered osteopaths, alongside a physiotherapist and a sports massage therapist.');
    st[1].settings.editor = P('Our dedicated team covers a broad spectrum of osteopathic skills, including classical, cranial and paediatric osteopathy, sports injuries and functional medicine. Osteopathy is suitable for all ages, from birth to seniority.');
    st[2].settings.editor = P('Our sister clinic, ' + A('https://exhaleosteopathy.co.uk/', 'Exhale Osteopathy') + ', is in Sutton Coldfield. We look forward to helping you on your pathway to health.');
    const stats = [['1983', 'Practice established'], ['4', 'Registered osteopaths'], ['6', 'Practitioners'], ['6', 'Days a week open']];
    const sh = H([story]).filter(h => h.settings.header_size === 'span');
    for (let i = 0; i < 4; i++) { sh[i * 2].settings.title = stats[i][0]; sh[i * 2 + 1].settings.title = stats[i][1]; }
    const cap = byTitle(els, /Treatment room/); if (cap) cap.settings.title = '30 Rotten Row · Lichfield';
    // The clinic
    const clinic = secWith(els, /^The Clinic$/);
    setT([clinic], /calm space/i, '30 Rotten Row, Lichfield');
    setX([clinic], /designed our clinic/, P('Our clinic is a few minutes’ walk from Lichfield city centre, with parking outside and free parking nearby.'));
    const feats = [['Parking outside', 'There is parking outside the clinic, and on-street parking a few minutes’ walk away.'], ['Free parking nearby', 'Free parking at Tesco, a few minutes’ walk away.'],
      ['Near the city centre', 'A few minutes’ walk from Lichfield city centre.'], ['Open 6 days a week', 'Mon to Fri 09:00 to 19:00 · Sat 09:00 to 14:00.']];
    const rows = XF.all([clinic], e => e.elType === 'container' && cls(/ex-nowrap/)(e) && H([e]).length === 1).map(x => x.e);
    rows.forEach((r, i) => { H([r])[0].settings.title = feats[i][0]; TXT([r])[0].settings.editor = P(feats[i][1]); });
    W([clinic], 'image').forEach(im => { im.settings.image = Object.assign({}, im.settings.image, XF.img('exterior'), { alt: 'Lichfield Osteopathic Practice, 30 Rotten Row' }); });
    // team
    const team = one(els, id('team'));
    setT([team], /^Registered clinicians/, 'Four osteopaths, a physiotherapist and a sports massage therapist');
    TXT([team])[0].settings.editor = P('Get to know our team before you book, and see which days each of us is in clinic.');
    R.rebuildPeople([team], R.TEAM);
    const tg = XF.all([team], e => e.elType === 'container' && (e.elements || []).some(c => XF.linkOf(c) === '/freta-teklesenbet/'))[0];
    if (tg && tg.e.settings.container_type === 'grid') tg.e.settings.grid_columns_grid = { unit: 'fr', size: 3, sizes: [] };
    const tb = byTitle([team], /Meet the|View all/);
    // clinics: Lichfield first, then the sister clinic with its own details
    const clinics = secWith(els, /Our Clinics/);
    setT([clinics], /Two clinics/, 'Our clinic and our sister clinic');
    const cards = clinics.elements.find(e => e.elType === 'container').elements;
    const exh = cards.find(c => H([c]).some(h => /Exhale Osteopathy/.test(h.settings.title)));
    const lop = cards.find(c => H([c]).some(h => /Lichfield Osteopathic Practice/.test(h.settings.title)));
    if (exh && lop) {
      TXT([exh])[0].settings.editor = P('1 Sutton Oak Corner, Streetly, Sutton Coldfield, B74 2DH · 0121 751 2440');
      const et = TXT([exh]); et[1].settings.editor = P('Our sister clinic, run by the same owner'); et[2].settings.editor = P('Mon to Fri 09:00 to 20:00 · Sat 08:00 to 14:00'); et[3].settings.editor = P('Plenty of parking right outside');
      const eb = W([exh], 'button'); eb[0].settings.text = 'Visit Exhale Osteopathy'; eb[0].settings.link = Object.assign({}, eb[0].settings.link, { url: 'https://exhaleosteopathy.co.uk/', is_external: 'on' });
      if (eb[1]) eb[1].settings.link = Object.assign({}, eb[1].settings.link, { url: 'https://www.google.com/maps/dir/?api=1&destination=Exhale+Osteopathy+Sutton+Coldfield' });
      cards.splice(cards.indexOf(lop), 1); cards.splice(cards.indexOf(exh), 0, lop);
    }
    // hours + fees
    const cols = one(els, cls(/ex-cols/));
    const cc = XF.all([cols], cls(/ex-colcard/)).map(x => x.e);
    H([cc[0]])[1].settings.title = 'Open six days a week';
    W([cc[0]], 'html')[0].settings.html = '<dl class="ex-dl"><div><dt>Monday to Friday</dt><dd>09:00 to 19:00</dd></div><div><dt>Saturday</dt><dd>09:00 to 14:00</dd></div><div><dt>Sunday</dt><dd>Closed</dd></div></dl>';
    TXT([cc[0]])[0].settings.editor = P('Can’t find a time? Call 01543 252673 and we’ll do our best to fit you in.');
    const ch = H([cc[1]]); ch[0].settings.title = 'Fees'; ch[1].settings.title = 'Clear prices, no referral needed';
    const ct = TXT([cc[1]]); ct[0].settings.editor = P('Osteopathy is £75 for your first appointment, including treatment, and £60 for a follow-up.');
    ct[1].settings.editor = P('You don’t need a GP referral. Book online or give us a call.');
    const cb = W([cc[1]], 'button'); cb[1].settings.text = 'Call 01543 252673';
    // photo strip
    const strip = els.find(s => cls(/ex-tone-beige/)(s) && W([s], 'image').length >= 4 && !H([s]).length);
    if (strip) W([strip], 'image').forEach((im, i) => { const k = ['exterior', 'osteo-freta', 'massage-zoe', 'cranial-baby'][i] || 'hands-deep'; im.settings.image = Object.assign({}, im.settings.image, XF.img(k), { alt: '' }); });
    dropReviews(els); R.accr(els); dropSchema(els);
    setT(els, /^Book your first appointment today/, 'Book your first appointment today');
    return els;
  };

  /* ================= MEET THE TEAM ================= */
  R.team = () => {
    const src = XF.base(XF.src('p356'));
    const heroS = src[0];
    const els = [heroS];
    hero(els, 'Meet the Team', 'Meet the team', 'Get to know our osteopaths, physiotherapist and massage therapist, and see which days each of us is in clinic.', 'osteo-freta', 'Freta assessing a patient at Lichfield Osteopathic Practice');
    const hb = W([heroS], 'button'); if (hb[1]) { hb[1].settings.text = 'Our week'; hb[1].settings.link = Object.assign({}, hb[1].settings.link, { url: '#week' }); }
    const team = one(src, id('team'));
    setT([team], /^Registered clinicians/, 'The people who’ll look after you');
    TXT([team])[0].settings.editor = P('Four registered osteopaths, a physiotherapist and a sports massage therapist, all at 30 Rotten Row, Lichfield.');
    R.rebuildPeople([team], R.TEAM);
    els.push(team);
    // our week: dark info cards, one per day
    const steps = XF.clone(one(src, cls(/ex-steps/)));
    steps.settings._element_id = 'week';
    const sh = H([steps]); sh[0].settings.title = 'Our Week'; sh[1].settings.title = 'Who’s in clinic, day by day';
    R.infocards(one([steps], cls(/sb-grid/)), ROTA.map(([d, who]) => [d, who + '.']));
    H([steps]).filter(h => /^0\d$/.test(h.settings.title)).forEach((h, i) => { h.settings.title = ROTA[i][0].slice(0, 3); });
    const g = one([steps], cls(/sb-grid/)); g.settings.css_classes = (g.settings.css_classes || '').replace('sb-grid--4', 'sb-grid--3');
    els.push(steps);
    const note = XF.clone(one(src, cls(/ex-cols/)));
    els.push(one(src, cls(/ex-accr/)));
    els.push(one(src, id('book')));
    R.accr(els);
    return els;
  };

  /* ================= NEW PATIENTS ================= */
  R.newp = () => {
    const els = XF.base(XF.src('p580'));
    hero(els, 'New Patients', 'New patients: what to expect at your first appointment', 'Coming to Lichfield Osteopathic Practice for the first time? Here’s how your first visit works and what it costs.', 'osteo-freta', 'Freta assessing a patient’s shoulder');
    one(els, e => e.widgetType === 'html' && /sb-glance/.test(e.settings.html)).settings.html = R.glance([
      { k: 'Initial consultation', v: '£75, including treatment', icon: 'pound' }, { k: 'GP referral', v: 'Not needed', icon: 'check' }, { k: 'Open', v: '6 days a week', icon: 'clock' }])
      .replace('class="sb-glance"', 'class="sb-glance ex-glance--3"');
    const wel = secWith(els, /Welcome to Exhale/);
    setT([wel], /Welcome to Exhale/, 'Welcome');
    setT([wel], /Unhurried care/, 'Thorough care from your very first visit');
    const wt = TXT([wel]);
    wt[0].settings.editor = P('We welcome patients of all ages from Lichfield and the surrounding areas. Your first appointment starts with a detailed case history, followed by careful examination and, where appropriate, your first treatment.');
    wt[1].settings.editor = P('You can book with any of our osteopaths, our physiotherapist or our sports massage therapist at 30 Rotten Row, Lichfield. You don’t need a GP referral.');
    const first = one(els, id('first'));
    TXT([first])[0].settings.editor = P('Your first appointment includes treatment on the day wherever it’s appropriate.');
    R.infocards(one([first], cls(/sb-grid/)), window.LOP_DATA.cond.steps.map(x => [x.t.replace(/&amp;/g, '&'), x.d.replace(/&amp;/g, '&')]));
    const prep = XF.all(els, cls(/ex-steps/)).map(x => x.e).find(s => H([s]).some(h => /Before You Arrive/.test(h.settings.title)));
    R.infocards(one([prep], cls(/sb-grid/)), [
      ['Book online or by phone', 'Choose your practitioner and a time online, or call 01543 252673 and we’ll find a time that suits you.'],
      ['What to wear', 'Comfortable clothes you can move in, such as leggings or shorts and a vest top.'],
      ['Finding us', '30 Rotten Row, Lichfield, WS13 6JB. There is parking outside, and free parking at Tesco a few minutes’ walk away.'],
      ['Opening hours', 'Monday to Friday 09:00 to 19:00, Saturday 09:00 to 14:00. Closed on Sundays.']]);
    const fu = secWith(els, /Follow-up Appointments/);
    const ft = TXT([fu]);
    ft[0].settings.editor = P('A follow-up treatment session reviews your progress and continues with your treatment plan.');
    ft[1].settings.editor = P('The number of sessions you need depends on the condition and the person we are treating. Your osteopath will usually be able to tell you by the second treatment how many treatments are likely to be required.');
    ft[2].settings.editor = P('Explore ' + A('/osteopathy/', 'osteopathy') + ', ' + A('/physiotherapy/', 'physiotherapy') + ' and ' + A('/massage/', 'sports massage') + ', or read about the ' + A('/conditions/', 'conditions we treat') + '.');
    const gk = secWith(els, /Fees and policies/);
    setT([gk], /Fees and policies/, 'Fees and opening hours');
    const items = [['Osteopathy', 'Initial consultation and treatment £75. Follow-up appointment £60.'], ['Physiotherapy', 'New patient appointment (1 hour) £75. Follow-up (45 minutes) £60.'],
      ['Massage', '30 minutes £40, 60 minutes £60, 90 minutes £80.'], ['No referral needed', 'You can book directly, with no need to see your GP first.']];
    const gcards = XF.all([gk], e => e.elType === 'container' && H([e]).length === 1 && TXT([e]).length === 1 && W([e], 'icon').length === 1).map(x => x.e);
    gcards.forEach((c, i) => { if (!items[i]) return XF.remove(els, c); H([c])[0].settings.title = items[i][0]; TXT([c])[0].settings.editor = P(items[i][1]); });
    const who = secWith(els, /Choose Your Practitioner/);
    R.rebuildPeople([who], R.TEAM);
    const wg = XF.all([who], e => e.elType === 'container' && (e.elements || []).some(c => XF.linkOf(c) === '/freta-teklesenbet/'))[0];
    if (wg && wg.e.settings.container_type === 'grid') wg.e.settings.grid_columns_grid = { unit: 'fr', size: 3, sizes: [] };
    TXT([who])[0].settings.editor = P('Read about each clinician before you book. Not sure who’s right for you? Call 01543 252673 and we’ll help you choose.');
    const fq = one(els, id('faqs'));
    R.faqs(W([fq], 'nested-accordion')[0], [
      { q: 'Do I need a GP referral?', a: 'No. You can book directly with us online or by phone.' },
      { q: 'How much does it cost?', a: 'An initial consultation and treatment is £75 and a follow-up appointment is £60. Physiotherapy is £75 for a one-hour new patient appointment and £60 for a 45-minute follow-up. Massage is £40 for 30 minutes, £60 for 60 minutes or £80 for 90 minutes.' },
      { q: 'What can I expect at my first session?', a: 'Your initial consultation will include a detailed case history, as well as careful observation and examination using palpation (feel through touch) to find areas of restriction, strain and weakness in the body.' },
      { q: 'How many sessions will I need?', a: 'It depends on the condition and the person we are treating. The aim is to keep your appointments to a minimum, and your osteopath will usually be able to tell you by the second treatment how many are likely to be needed.' },
      { q: 'How will I feel after a treatment?', a: 'You may feel a little sore or achy for up to 48 hours after a treatment. Most people usually start feeling better after this.' },
      { q: 'Is osteopathy suitable for children?', a: 'Yes. Osteopathy is suitable for all ages, from birth to seniority, and we offer gentle osteopathy for babies and children.' }]);
    R.accr(els); dropSchema(els); dropReviews(els);
    return els;
  };

  /* ================= PRICING ================= */
  R.pricing = () => {
    const els = XF.base(XF.src('p357'));
    hero(els, 'Pricing', 'Our fees', 'Osteopathy, physiotherapy and massage fees at Lichfield Osteopathic Practice. Book online, or call us if you have any questions.', 'exterior', 'Lichfield Osteopathic Practice, 30 Rotten Row');
    const hb = W([els[0]], 'button'); if (hb[1]) { hb[1].settings.text = 'New patients'; hb[1].settings.link = Object.assign({}, hb[1].settings.link, { url: '/new-patients/' }); }
    const fees = one(els, id('fees'));
    TXT([fees])[0].settings.editor = P('Choose a treatment to see what’s included and what it costs. Not sure which to book? Call us on 01543 252673 and we will help.');
    const tabs = W([fees], 'nested-tabs')[0];
    // keep Osteopathy, Physiotherapy, Massage (laser and acupuncture prices for Lichfield to follow)
    const keep = tabs.elements.map(t => H([t]).some(h => /^(Osteopathy|Physiotherapy|Sports Massage)$/.test(h.settings.title)));
    tabs.elements = tabs.elements.filter((_, i) => keep[i]);
    tabs.settings.tabs = tabs.settings.tabs.filter((_, i) => keep[i]);
    tabs.settings.tabs.forEach(t => { if (/Massage/.test(t.tab_title)) t.tab_title = 'Massage'; });
    const [o, ph, m] = tabs.elements;
    setX([o], /^Initial consultations include/, P('Not sure which to book? Call us on 01543 252673 and we will help.'));
    setT([o], /^Returning patient treatment/, 'Follow-up appointment');
    setX([o], /^Ongoing treatment/, P('A follow-up treatment session where we review your progress and continue with your treatment plan.'));
    setX([o], /^Full history/, P('For patients who haven’t attended Lichfield Osteopathic Practice before.'));
    setT([ph], /^Initial assessment/, 'New patient appointment (60 mins)');
    setX([ph], /^Detailed assessment/, P('Assessment and treatment for patients new to physiotherapy with us, with Emre Tosun.'));
    setT([m], /^Sports Massage$/, 'Sports &amp; Deep Tissue Massage');
    setX([m], /^55 minutes/, P('Choice of sports, deep tissue or pregnancy massage, tailored to you.'));
    setX([m], /^Sessions before and after events/, P('Massage can be booked on its own or alongside osteopathy or physiotherapy.'));
    XF.all([m], e => e.widgetType === 'heading' && /About Sports Massage/.test(e.settings.title)).forEach(x => x.e.settings.title = x.e.settings.title.replace('About Sports Massage', 'About Massage'));
    // good to know: only what we know for Lichfield
    const gk = XF.all(els, cls(/ex-steps/)).map(x => x.e)[0];
    R.infocards(one([gk], cls(/sb-grid/)), [
      ['No referral needed', 'You can book directly, with no need to see your GP first.'],
      ['Opening hours', 'Monday to Friday 09:00 to 19:00, Saturday 09:00 to 14:00. Closed on Sundays.'],
      ['Finding us', '30 Rotten Row, Lichfield. Parking outside, and free parking at Tesco a few minutes’ walk away.'],
      ['Questions?', 'Call 01543 252673 and we’ll help you choose the right appointment.']]);
    XF.all(els, cls(/ex-tone-deep/)).forEach(x => XF.remove(els, x.e)); // insurance band (Lichfield insurers not confirmed)
    dropReviews(els); R.accr(els); dropSchema(els);
    return els;
  };

  /* ================= CONTACT ================= */
  R.contact = () => {
    const els = XF.base(XF.src('p358'));
    hero(els, 'Contact', 'Contact Lichfield Osteopathic Practice', 'Call, email or pop in to see us at 30 Rotten Row, Lichfield.', 'exterior', 'Lichfield Osteopathic Practice, 30 Rotten Row');
    const intro = secWith(els, /Our Clinics/);
    setT([intro], /Our Clinics/, 'Find Us');
    setT([intro], /^Find us in/, '30 Rotten Row, Lichfield');
    TXT([intro])[0].settings.editor = P('A few minutes’ walk from Lichfield city centre. Our sister clinic, ' + A('https://exhaleosteopathy.co.uk/', 'Exhale Osteopathy') + ', is in Sutton Coldfield.');
    const exh = els.find(s => H([s]).some(h => /^Exhale Osteopathy$/.test(h.settings.title)));
    if (exh) XF.remove(els, exh);
    const lop = els.find(s => H([s]).some(h => /^Lichfield Osteopathic Practice$/.test(h.settings.title)));
    const num = H([lop]).find(h => /^0\d$/.test(h.settings.title)); if (num) num.settings.title = 'Visit us';
    const chips = one([lop], cls(/ex-chips/));
    const cp = H([chips])[0];
    chips.elements = [['Osteopathy', '/osteopathy/'], ['Cranial &amp; Paediatric Osteopathy', '/peadiatric-osteopathy/'], ['Physiotherapy', '/physiotherapy/'], ['Sports &amp; Deep Tissue Massage', '/massage/'], ['Acupuncture', '/acupuncture/'], ['Laser Therapy', '/laser-therapy/']]
      .map(([t, h]) => { const c = XF.clone(cp); c.settings.title = t; c.settings.link = Object.assign({}, c.settings.link, { url: h }); return c; });
    const fol = secWith(els, /Follow Us/);
    setT([fol], /Tips, exercises/, 'Follow Lichfield Osteopathic Practice');
    TXT([fol])[0].settings.editor = P('Clinic news and updates on Instagram and Facebook.');
    const gb = W([fol], 'button').find(b => /Google/.test(b.settings.text)); if (gb) gb.settings.link = Object.assign({}, gb.settings.link, { url: R.SITE.maps });
    dropSchema(els); dropReviews(els);
    return els;
  };
})();
