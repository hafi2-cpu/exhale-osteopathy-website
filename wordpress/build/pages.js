/* Exhale Osteopathy — one-off pages (About, Pricing, Contact, Birmingham, Blog, blog posts).
   Shared section helpers first, then one builder per page: EX.buildPage(key). */
(function () {
  const { C, W, px, em, pct, dims, all, gap, section, heading, text, eyebrow, button, image, img, icon, IT, IN } = EX;
  const { grid, gridC, fr, gaps, h2, circle, faqAccordion, esc } = EX.tx;
  const L = EX.L;
  const P = EX.P = {};

  const link = (url) => ({ url, is_external: '', nofollow: '' });
  const label = (t, color) => heading(t, { tag: 'span', color: color || '#4F5945', t: { f: IN, s: 12, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 } });
  const para = (t, o = {}) => text('<p>' + t + '</p>', { color: o.color, t: Object.assign({ s: 18, lh: 1.8 }, o.t || {}), x: Object.assign(o.mt != null ? { _margin: dims(o.mt, 0, 0, 0) } : {}, o.x || {}) });
  const maxw = (w) => ({ _element_width: 'initial', _element_custom_width: px(w), _element_custom_width_tablet: pct(100) });
  const stars = () => heading('★★★★★', { tag: 'span', color: '#E0A800', t: { f: IN, s: 16, lh: 1.4 }, x: { typography_letter_spacing: px(2) } });
  const tickRow = (t, o = {}) => C({ flex_direction: 'row', flex_align_items: 'flex-start', flex_gap: gap(12) }, [
    circle('tick', 22, 13, { color: '#4F5945', box: { background_background: 'classic', background_color: o.bg || '#E6E0D5', margin: dims(2, 0, 0, 0) } }),
    text('<p>' + t + '</p>', { color: o.color, t: { s: o.s || 15, lh: o.lh || 1.6 } })
  ]);
  // Rounded link chip (condition links, tags)
  P.chip = (t, href, o = {}) => button(t.replace(/&amp;/g, '&'), href, { kind: 'ivory', h: 44, fs: 15, pl: 16, pr: 16,
    x: Object.assign({ background_color: o.bg || '#E6E0D5', button_text_color: '#4F5945', button_background_hover_color: o.bg || '#E6E0D5', hover_color: '#272B26', border_radius: all(999) }, o.x || {}) });
  P.label = label; P.para = para; P.maxw = maxw; P.stars = stars; P.tickRow = tickRow; P.link = link;

  // Inner-page hero: photo, multi-stop shade, breadcrumb, H1, lead + two buttons above a hairline
  P.hero = (o) => section({ pt: o.pt || 216, pb: 72, ptm: o.pt || 216, pbm: 56, x: { min_height: px(o.minh || 760), flex_justify_content: 'flex-end',
    background_background: 'classic', background_color: '#272B26', background_image: img(o.img), background_position: 'initial',
    background_xpos: pct(o.x ?? 50), background_ypos: pct(o.y ?? 50), background_size: 'cover', css_classes: o.shade || 'ex-shade--about' } }, [
    heading('<a href="/">Home</a> <span aria-hidden="true">→</span> <strong>' + o.crumb + '</strong>',
      { tag: 'p', color: 'rgba(245,242,234,0.8)', t: { f: IN, s: 15, lh: 1.6 }, x: { _css_classes: 'ex-on-dark ex-crumbs' } }),
    heading(o.h1, { tag: 'h1', color: '#F5F2EA', t: { s: o.h1s || 68, st: 46, sm: 36, lh: 1.02, lhm: 1.08, ls: -0.035 }, x: Object.assign({ _margin: dims(22, 0, 0, 0) }, maxw(o.h1w || 820)) }),
    C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(32),
      margin: dims(32, 0, 0, 0), padding: dims(32, 0, 0, 0), border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: 'rgba(245,242,234,0.22)' }, [
      text('<p>' + o.lead + '</p>', { color: 'rgba(245,242,234,0.9)', t: { s: 20, lh: 1.6 }, x: maxw(640) }),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(14), css_classes: 'ex-shrink' }, o.buttons.map((b, i) =>
        button(b[0], b[1], { kind: i ? 'outline-light' : 'ivory', h: 62, fs: 18, icon: 'right', split: true, minw: b[2] || (i ? 240 : 260), pl: 32, pr: 28 })))
    ])
  ]);

  // "Patient Stories" placeholder reviews (real reviews to be pasted in — never invented)
  P.reviews = (title, prompt, o = {}) => section({ pt: 96, pb: 96, ptm: 64, pbm: 64, x: { background_background: 'classic', background_color: o.bg || '#E6E0D5' } }, [
    C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(24) }, [
      C({ css_classes: 'ex-shrink' }, [
        heading('Patient Stories', { tag: 'p', color: '#4F5945', t: { f: IN, s: 13, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 }, x: { _css_classes: 'ex-eyebrow' } }),
        h2(title, { o: { x: { _margin: dims(20, 0, 0, 0) } } })
      ]),
      C({ css_classes: 'ex-fit', flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(14), padding: dims(16, 22, 16, 22), background_background: 'classic', background_color: o.card || '#F5F2EA', border_radius: all(3) }, [
        heading('Google', { tag: 'span', t: { f: IN, s: 14, w: 600, lh: 1.4 } }), heading('[5.0]', { tag: 'span', t: { s: 26, lh: 1.2 } }), stars()
      ])
    ]),
    C(grid(3, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(20), margin: dims(40, 0, 0, 0) }), [1, 2, 3].map(() =>
      C({ padding: all(30), flex_gap: gap(14), background_background: 'classic', background_color: o.card || '#F5F2EA', border_radius: all(3) }, [
        stars(),
        text('<p>“' + prompt + '”</p>', { t: { s: 16, lh: 1.7 }, x: { _flex_size: 'grow' } }),
        heading(o.name || '[Patient name]', { tag: 'span', t: { f: IN, s: 14, w: 600, lh: 1.75 } })
      ]))),
    ...(o.after ? [o.after] : [])
  ]);

  // Closing "Book Today" band. cards: [[title, sub, href, 'olive'|'outline'|'outline-dark']]
  const OUTLINE = { border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.35)', background_background: 'classic', background_color: 'rgba(39,43,38,0.4)' };
  P.book = (o) => section({ pt: o.pt || 100, pb: o.pb || 100, x: Object.assign({ _element_id: 'book', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#272B26' },
    o.img ? { background_image: img(o.img), background_position: 'center center', background_size: 'cover', background_overlay_background: 'classic', background_overlay_color: '#272B26',
      background_overlay_opacity: { unit: 'px', size: o.op || 0.8, sizes: [] } } : {}) }, [
    C(grid(2, { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(48), grid_align_items: 'center' }), [
      C({}, [
        heading('Book Today', { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
        h2(o.title, { t: { s: o.ts || 48, lh: 1.08, ls: -0.025 }, o: { color: '#F5F2EA', x: { _margin: dims(14, 0, 0, 0) } } }),
        text('<p>' + o.lead + '</p>', { color: 'rgba(245,242,234,0.8)', t: { s: 18, lh: 1.7 }, x: Object.assign({ _margin: dims(18, 0, 0, 0) }, maxw(o.leadw || 520)) })
      ]),
      C({ flex_gap: gap(14) }, (o.cards || [['Book an Appointment', 'Pick a time online in under a minute.', L.book, 'olive'],
        ['Call 0121 751 2440', o.callSub || 'Speak to a real person on reception.', 'tel:+441217512440', 'outline']]).map(([t, sub, href, k]) =>
        EX.bookCard(t, sub, href, k === 'olive' ? { background_background: 'classic', background_color: '#4F5945' }
          : k === 'outline' ? OUTLINE : { border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.3)' })))
    ])
  ]);

  // Inner-page hero with a left-to-right shade (Pricing, Contact, Blog)
  P.heroSide = (o) => section({ pt: o.pt || 166, pb: 72, ptm: o.ptm || 150, pbm: 56, x: { min_height: px(o.minh || 560), flex_justify_content: 'flex-end',
    background_background: 'classic', background_color: '#272B26', background_image: o.img ? img(o.img) : { url: '', id: '' }, background_position: 'initial',
    background_xpos: pct(o.x ?? 50), background_ypos: pct(o.y ?? 50), background_size: 'cover', css_classes: o.shade || 'ex-hero-side ex-hero-side--92' } }, [
    heading('<a href="/">Home</a> <span aria-hidden="true">→</span> <strong>' + o.crumb + '</strong>',
      { tag: 'p', color: 'rgba(245,242,234,0.8)', t: { f: IN, s: 15, lh: 1.6 }, x: { _css_classes: 'ex-on-dark ex-crumbs' } }),
    heading(o.h1, { tag: 'h1', color: '#F5F2EA', t: { s: o.h1s || 64, st: 44, sm: 36, lh: 1.04, lhm: 1.08, ls: -0.035 }, x: Object.assign({ _margin: dims(22, 0, 0, 0) }, maxw(o.h1w || 760)) }),
    text('<p>' + o.lead + '</p>', { color: 'rgba(245,242,234,0.88)', t: { s: 20, lh: 1.6 }, x: Object.assign({ _margin: dims(22, 0, 0, 0) }, maxw(o.leadw || 600)) }),
    ...(o.buttons ? [C({ flex_direction: 'row', flex_wrap: 'wrap', flex_align_items: 'center', flex_gap: gap(14), margin: dims(36, 0, 0, 0) }, o.buttons.map((b, i) =>
      button(b[0], b[1], { kind: i ? 'outline-light' : 'ivory', h: 62, fs: 18, icon: 'right', split: true, minw: b[2] || 280, pl: 32, pr: 28 })))] : []),
    ...(o.extra || [])
  ]);

  // Photo or grey placeholder in a fixed shape
  P.photo = (asset, alt, cls, o = {}) => asset ? image(asset, alt, { x: Object.assign({ _css_classes: cls, image_border_radius: all(3) }, o.x || {}) })
    : C(Object.assign({ css_classes: cls + '-box', background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3), flex_justify_content: 'flex-end', padding: all(14) }, o.box || {}),
      o.ph === '' ? [] : [heading(o.ph || '[Photo]', { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 12, lh: 1.4 } })]);

  // Team cards (About / Birmingham)
  const TEAM = [
    ['Hafi Rahman', 'Founder &amp; Principal Osteopath', L.hafi, 'f4513f27866f22682d9d1eafdcd00e9b'],
    ['Zoe Goodwin', 'Sports Massage Therapist', L.zoe, 'a1aa92c86185fbf90aea1ad6a47c85a3'],
    ['Freta Teklensenbet', 'Registered Osteopath', L.freta, '2b3650271a3bcca5534fca4186d2400c'],
    ['Ankita Desai', 'Registered Osteopath', L.ankita, 'f8984ae774fa815b4d817f0fe0266bba'],
    ['Emre Tosun', 'Physiotherapist, Personal Trainer &amp; Sports Massage Therapist', L.emre, 'emre-portrait']];
  P.TEAM = TEAM;
  P.teamGrid = (o = {}) => C(grid(o.cols || 5, { grid_columns_grid_tablet_extra: fr(3), grid_columns_grid_tablet: fr(3), grid_columns_grid_mobile: fr(2), grid_gaps: gaps(20), grid_gaps_mobile: gaps(16), margin: dims(40, 0, 0, 0) }),
    (o.team || TEAM).map(([n, role, href, a]) => C({ html_tag: 'a', link: link(href) }, [
      P.photo(a, n.replace(/&amp;/g, '&'), 'ex-ratio-34', { x: { _css_classes: 'ex-ratio-34 ex-pos-top' }, ph: '[Headshot]' }),
      heading(n, { tag: 'h3', t: { s: 20, ls: -0.015, lh: 1.3 }, x: { _margin: dims(16, 0, 0, 0) } }),
      heading(role, { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 14, lh: 1.75 } }),
      heading('View Profile →', { tag: 'span', color: '#4F5945', t: { f: IN, s: 14, w: 500, lh: 1.75 }, x: { _margin: dims(8, 0, 0, 0) } })
    ])));

  // Clinic card with a Google Map (the design shows a "[Google Map embed]" placeholder here)
  P.clinicCard = (c, o = {}) => C({ background_background: 'classic', background_color: o.bg || '#F5F2EA', border_radius: all(3), overflow: 'hidden', padding: all(0) }, [
    W('google_maps', { address: c.map, zoom: { unit: 'px', size: 15, sizes: [] }, height: px(o.mapH || 240), _css_classes: 'ex-map' }),
    C({ padding: dims(30, 32, 34, 32), padding_mobile: dims(26, 22, 28, 22) }, [
      heading(c.name, { tag: 'h3', t: { s: 28, ls: -0.02, lh: 1.2 } }),
      para(c.addr, { t: { s: 16, lh: 1.6 }, mt: 8 }),
      C({ flex_gap: gap(10), margin: dims(20, 0, 0, 0) }, c.notes.map(n => tickRow(n, { color: '#272B26' }))),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(12), margin: dims(26, 0, 0, 0) }, [
        button('Book at ' + c.short, L.book, { kind: 'olive', h: 48, fs: 15, pl: 22, pr: 22 }),
        button('Get directions', c.dir || '#contact', { kind: 'outline', h: 48, fs: 15, pl: 22, pr: 22 })
      ])
    ])
  ]);
  const DIR = (a) => 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(a);
  P.CLINICS = {
    sutton: { name: 'Exhale Osteopathy', short: 'Sutton Coldfield', map: '1 Sutton Oak Corner, Streetly, Sutton Coldfield B74 2DH', dir: DIR('Exhale Osteopathy, 1 Sutton Oak Corner, Sutton Coldfield B74 2DH'),
      addr: '1 Sutton Oak Corner, Streetly, Sutton Coldfield, B74 2DH · 0121 751 2440' },
    lichfield: { name: 'Lichfield Osteopathic Practice', short: 'Lichfield', map: '30 Rotten Row, Lichfield WS13 6JB', dir: DIR('Lichfield Osteopathic Practice, 30 Rotten Row, Lichfield WS13 6JB'),
      addr: '30 Rotten Row, Lichfield, WS13 6JB · 01543 252673' }
  };

  /* ---------------- ABOUT ---------------- */
  P.about = () => {
    const out = [];
    out.push(P.hero({ img: '2cef3306a31a7e7056f2f7bef5cf4201', y: 15, crumb: 'Our Clinic', h1: 'Independent, local and here for the long run',
      lead: 'Exhale is an independent osteopathy clinic in Sutton Coldfield, with a sister practice in Lichfield — built around unhurried, hands-on care.',
      buttons: [['Book an appointment', '#book', 260], ['Meet the team', '#team', 240]] }));

    out.push(section({ pt: 110, pb: 90, ptm: 64, pbm: 64 }, [
      C(gridC('minmax(0,1fr) minmax(0,1.2fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(72, 72), grid_gaps_tablet: gaps(40), grid_align_items: 'start' }), [
        C({}, [eyebrow('Our Story'), h2('Built on word of mouth, one patient at a time', { t: { s: 48, lh: 1.08, ls: -0.03 }, o: { x: { _margin: dims(24, 0, 0, 0) } } })]),
        C({}, [
          para("Exhale was founded by osteopath Hafi Rahman with a simple idea: give people the time to be properly listened to, a clear explanation of what's going on, and treatment that actually gets them better.", { t: { s: 19, lh: 1.75 } }),
          para('Most of our patients come to us through a friend or family member. Today our team of around ten osteopaths, physiotherapists and therapists works across two clinics — Exhale in Sutton Coldfield, and Lichfield Osteopathic Practice, which has been caring for patients in Lichfield since 1983 — with the same approach in both.', { mt: 20 }),
          para('[Add a line or two about when and why Hafi started the clinic.]', { mt: 20 })
        ])
      ]),
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(2), grid_gaps: gaps(0), margin: dims(72, 0, 0, 0), margin_mobile: dims(48, 0, 0, 0),
        border_border: 'solid', border_width: dims(1, 0, 1, 0), border_color: '#B7AA99' }), [
        ['1983', 'Lichfield practice established'], ['~10', 'Clinicians &amp; support team'], ['2', 'Clinics — Sutton &amp; Lichfield'], ['[XXX]', 'Five-star Google reviews']
      ].map(([v, k]) => C({ padding: dims(32, 24, 30, 0), flex_gap: gap(4) }, [
        heading(v, { tag: 'span', t: { s: 56, sm: 44, lh: 1, ls: -0.04 } }),
        heading(k, { tag: 'span', color: 'rgba(39,43,38,0.84)', t: { f: IN, s: 15, lh: 1.75 } })
      ])))
    ]));

    out.push(section({ pt: 0, pb: 24, ptm: 0, pbm: 20, x: { html_tag: 'div', min_height: px(620), flex_justify_content: 'flex-end',
      background_background: 'classic', background_color: '#272B26', background_image: img('6046e3fbe3f542c03bbb9172ca220939'), background_position: 'center center', background_size: 'cover' } }, [
      heading('Treatment room · Sutton Coldfield', { tag: 'p', color: 'rgba(245,242,234,0.9)', t: { f: IN, s: 13, ls: 0.12, tt: 'uppercase', lh: 1.75 } })
    ]));

    const FEAT = [['home', '[X] treatment rooms', 'Private, light and fully equipped.'], ['sofa', 'Calm waiting area', 'A warm welcome from our reception team.'],
      ['parking', 'Parking nearby', '[Add parking and public transport details.]'], ['access', 'Accessible', '[Add step-free access details.] Let us know any access needs when you book.']];
    out.push(section({ x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      C(gridC('minmax(0,1.1fr) minmax(0,1fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(72), grid_gaps_tablet: gaps(40), grid_align_items: 'center' }), [
        C({}, [
          eyebrow('The Clinic'),
          h2('A calm space to get better', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
          para("We've designed our clinic to feel calm and welcoming from the moment you walk in — warm, light rooms, plenty of space and no rushing between patients.", { mt: 20 }),
          C(grid(2, { grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(32, 0, 0, 0) }), FEAT.map(([ic, t, d]) =>
            C({ flex_direction: 'row', flex_align_items: 'flex-start', flex_gap: gap(14), padding: dims(22, 22, 24, 22), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
              circle(ic, 40, 18, { color: '#4F5945', box: { background_background: 'classic', background_color: '#E6E0D5' } }),
              C({ css_classes: 'ex-grow' }, [
                heading(t, { tag: 'span', t: { s: 18, lh: 1.4 } }),
                text('<p>' + d + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 14, lh: 1.55 }, x: { _margin: dims(2, 0, 0, 0) } })
              ])
            ])))
        ]),
        image('3e5af535c29942d9a3c973f98d64792e', 'A treatment room at Exhale Osteopathy', { x: { _css_classes: 'ex-ratio-45', image_border_radius: all(3) } })
      ])
    ]));

    const VALS = [['01', 'Listen first', 'Time to tell your story properly, without being rushed.'], ['02', 'Treat the cause', 'We look for why it hurts, not just where.'],
      ['03', 'Honest advice', 'Clear answers — including when you don’t need us.'], ['04', 'Calm, unhurried care', 'A relaxed space and appointments that don’t feel like a conveyor belt.'],
      ['05', 'Lasting results', 'Simple tools to help you stay well between visits.']];
    out.push(section({ x: { background_background: 'classic', background_color: '#4F5945' } }, [
      eyebrow('What We Believe', { light: true, pb: 18 }),
      h2('Five things you can expect from us, every time', { t: { s: 48, lh: 1.08, ls: -0.03 }, o: { color: '#F5F2EA', x: Object.assign({ _margin: dims(28, 0, 0, 0) }, maxw(760)) } }),
      C(grid(5, { grid_columns_grid_tablet_extra: fr(3), grid_columns_grid_tablet: fr(3), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(48, 0, 0, 0) }), VALS.map(([n, t, d]) =>
        C({ flex_gap: gap(12), padding: dims(28, 24, 30, 24), border_radius: all(3), background_background: 'classic', background_color: 'rgba(245,242,234,0.08)',
          border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.18)' }, [
          heading(n, { tag: 'span', color: '#E6E0D5', t: { s: 44, lh: 1, ls: -0.04 } }),
          heading(t, { tag: 'h3', color: '#F5F2EA', t: { s: 21, w: 500, ls: -0.015, lh: 1.3 } }),
          text('<p>' + d + '</p>', { color: 'rgba(245,242,234,0.82)', t: { s: 15, lh: 1.6 } })
        ])))
    ]));

    out.push(section({ x: { _element_id: 'team', css_classes: 'ex-anchor' } }, [
      eyebrow('Our Team'),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(24), margin: dims(24, 0, 0, 0) }, [
        h2('Registered clinicians who work as one team', { o: { x: maxw(640) } }),
        text('<p>Our osteopaths, physiotherapists and therapists share notes and refer to each other, so you get the right person for your problem — not just whoever is free.</p>', { t: { s: 17, lh: 1.7 }, x: maxw(520) })
      ]),
      P.teamGrid()
    ]));

    const C1 = P.CLINICS;
    out.push(section({ x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      eyebrow('Our Clinics'),
      h2('Two clinics, one approach', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
      C(grid(2, { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(20), margin: dims(40, 0, 0, 0) }), [
        P.clinicCard(Object.assign({}, C1.sutton, { notes: ['Inside Sutton Hearing Care', 'Mon–Fri 09:00–20:00 · Sat 08:00–14:00', '[Parking details]'] })),
        P.clinicCard(Object.assign({}, C1.lichfield, { notes: ['Established in 1983', 'Parking outside, plus free parking at Tesco nearby', 'A few minutes’ walk from the city centre'] }))
      ])
    ]));

    const HOURS = [['Monday – Friday', '09:00 – 20:00'], ['Saturday', '08:00 – 14:00'], ['Sunday', 'Closed'], ['Lichfield: Mon – Fri', '09:00 – 19:00'], ['Lichfield: Saturday', '09:00 – 14:00']];
    out.push(section({}, [
      C(grid(2, { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(20) }), [
        C({ background_background: 'classic', background_color: '#272B26', border_radius: all(3), padding: dims(40, 40, 44, 40), padding_mobile: dims(30, 24, 32, 24) }, [
          label('Opening Hours', '#E6E0D5'),
          heading('Evening and Saturday appointments', { color: '#F5F2EA', t: { s: 34, st: 32, sm: 28, lh: 1.15, ls: -0.02 }, x: { _margin: dims(12, 0, 0, 0) } }),
          C({ margin: dims(26, 0, 0, 0) }, HOURS.map(([d, t]) => C({ flex_direction: 'row', flex_justify_content: 'space-between', flex_gap: gap(20), padding: dims(12, 0, 12, 0),
            border_border: 'solid', border_width: dims(0, 0, 1, 0), border_color: 'rgba(245,242,234,0.12)' }, [
            heading(d, { tag: 'span', color: 'rgba(245,242,234,0.85)', t: { f: IN, s: 16, lh: 1.75 } }),
            heading(t, { tag: 'span', color: '#F5F2EA', t: { s: 16, lh: 1.75 }, x: { _flex_size: 'none' } })
          ]))),
          text('<p>Can\'t find a time? Call <a class="ex-underline" href="tel:+441217512440">0121 751 2440</a> and we\'ll do our best to fit you in.</p>',
            { color: 'rgba(245,242,234,0.88)', t: { s: 15, lh: 1.75 }, x: { _margin: dims(18, 0, 0, 0), _css_classes: 'ex-on-dark' } })
        ]),
        C({ background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3), padding: dims(40, 40, 44, 40), padding_mobile: dims(30, 24, 32, 24) }, [
          label('Insurance &amp; Self-Pay'),
          heading("Insured or paying yourself, you're welcome here", { t: { s: 34, st: 32, sm: 28, lh: 1.15, ls: -0.02 }, x: { _margin: dims(12, 0, 0, 0) } }),
          para("We're recognised by [list insurers]. Get your authorisation number from your insurer before your first visit and bring it with you.", { t: { s: 17, lh: 1.75 }, mt: 18 }),
          para('Paying for yourself? No referral needed — just book online or give us a call.', { t: { s: 17, lh: 1.75 }, mt: 14 }),
          C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(12), padding: dims(28, 0, 0, 0), css_classes: 'ex-push-bottom' }, [
            button('See our prices', L.fees, { kind: 'olive', h: 50, fs: 15, pl: 24, pr: 24 }),
            button('Ask about insurance', 'tel:+441217512440', { kind: 'outline', h: 50, fs: 15, pl: 24, pr: 24 })
          ])
        ])
      ])
    ]));

    const GAL = [['3e3292b3448a80b063b85bf775c63745', 'Hafi treating a patient'], ['c6a31e9450e0eeb87fed01960d8d534e', 'Sports massage at Exhale'],
      ['eb3a3518e6e4460583ce6625b34e0d82', 'Neck treatment at Exhale'], ['c1b26d1d09b98e10ca67e53b603b1499', 'Hip mobilisation at Exhale']];
    out.push(section({ pt: 0, pb: 100, ptm: 0, pbm: 64, x: {} }, [
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(2), grid_gaps: gaps(14) }), GAL.map(([a, alt], i) =>
        image(a, alt, { x: Object.assign({ _css_classes: 'ex-ratio-34', image_border_radius: all(3) }, i % 2 ? { _margin: dims(40, 0, 0, 0) } : {}) })))
    ]));

    out.push(P.reviews('Loved by patients across Sutton &amp; Lichfield', '[Paste a real Google review here — ideally one about the clinic and the team.]'));
    out.push(EX.HOME.logos());
    out.push(P.book({ img: '2cef3306a31a7e7056f2f7bef5cf4201', title: 'Book your first appointment today',
      lead: "In pain, or just want a proper assessment? We're here to help. No GP referral needed." }));
    return out;
  };


  /* ---------------- PRICING ---------------- */
  P.pricing = () => {
    const out = [];
    out.push(P.heroSide({ img: '602bcebb1c29e98bc4fcd47a4c86b013', x: 60, crumb: 'Pricing', h1: 'Clear, honest pricing',
      lead: "No hidden extras and no pressure to book more than you need. Here's exactly what each appointment costs.",
      buttons: [['Book an appointment', '#book'], ['What to expect', '/']] }));

    const CATS = [
      ['Osteopathy', L.osteo, 'Hands-on assessment and treatment for back, neck, joint and muscle pain.', [
        ['Appointments', [['Initial consultation &amp; treatment', '(45–60 mins)', 'Full history, assessment, diagnosis and first treatment.', '£75'],
          ['Returning patient treatment', '(40–45 mins)', 'Ongoing treatment and progression of your plan.', '£60']]],
        ['Other', [['Cranial &amp; paediatric osteopathy', '(40–45 mins)', 'Gentle treatment for babies, children and adults — booked as a standard appointment.', '[£XX]']]]],
        'Initial consultations include treatment on the day wherever it’s appropriate. Most people need [2–4] sessions for a new problem — we’ll give you an honest estimate at your first visit.'],
      ['Physiotherapy', L.physio, 'Assessment and structured rehab for injuries, joint problems and recovery after surgery.', [
        ['Appointments', [['Initial assessment', '([60] mins)', 'Detailed assessment, diagnosis and a personalised rehab plan.', '[£XX]'],
          ['Follow-up session', '([45] mins)', 'Treatment and progression of your exercise programme.', '[£XX]']]]],
        'Your home exercise programme is included in every appointment at no extra cost.'],
      ['Sports Massage', L.massage, 'Sports, deep tissue and pregnancy massage for tight muscles, recovery and everyday tension.', [
        ['Sessions', [['Sports, deep tissue or pregnancy massage', '(60 mins)', 'Your choice of sports/deep tissue or pregnancy massage.', '£60'],
          ['Sports, deep tissue or pregnancy massage', '(90 mins)', 'Extended session — available at our Lichfield clinic.', '£80']]]],
        'Pre- and post-event sessions are available around race and match days — call us to arrange.'],
      ['Laser Therapy', L.laser, 'High-power laser treatment for stubborn tendon, joint and muscle pain.', [
        ['Sessions', [['Laser therapy session', '([15–20] mins)', 'Following a clinical assessment.', '[£XX]'],
          ['Course of [6] sessions', '', 'Paid upfront, used over your treatment plan.', '[£XX]']]]],
        'Laser can be added to an osteopathy or physio appointment for [£XX]. We’ll check it’s suitable for you first.'],
      ['Acupuncture', L.acu, 'Western medical acupuncture and dry needling for persistent pain.', [
        ['Sessions', [['Acupuncture session', '([30] mins)', 'Can be used on its own or alongside other treatment.', '[£XX]']]]],
        'Dry needling is included within osteopathy appointments where appropriate, at no extra cost.'],
      ['Sports Therapy', L.rehab, 'Injury assessment, hands-on treatment and return-to-sport planning.', [
        ['Appointments', [['Initial assessment', '([60] mins)', 'Assessment of your injury and a plan to get you back to training.', '[£XX]'],
          ['Follow-up session', '([45] mins)', 'Treatment and rehab progression.', '[£XX]']]]],
        '[Add any sports club or student discounts here.]']];

    const panel = ([name, href, intro, groups, note]) => C({ padding: all(0) }, [
      C({ background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3), padding: dims(44, 48, 40, 48), padding_mobile: dims(44, 24, 40, 24) }, [
        C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-start', flex_gap: gap(20) }, [
          C({ css_classes: 'ex-shrink' }, [
            heading(name, { tag: 'h3', t: { s: 34, sm: 28, ls: -0.02, lh: 1.2 } }),
            text('<p>' + intro + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 16, lh: 1.65 }, x: Object.assign({ _margin: dims(8, 0, 0, 0) }, maxw(560)) })
          ]),
          heading('<a href="' + href + '">About ' + name + ' →</a>', { tag: 'p', t: { f: IN, s: 15, w: 500, lh: 1.75 }, x: { _flex_size: 'none' } })
        ]),
        ...groups.map(([gt, rows]) => C({ margin: dims(34, 0, 0, 0) }, [
          label(gt),
          C({ margin: dims(10, 0, 0, 0), border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: '#B7AA99' }, rows.map(([rn, dur, d, price]) =>
            C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'center', flex_gap: gap(24), padding: dims(22, 0, 22, 0),
              border_border: 'solid', border_width: dims(0, 0, 1, 0), border_color: '#B7AA99' }, [
              C({ css_classes: 'ex-grow ex-minw-240' }, [
                heading(rn + (dur ? ' <small class="ex-dur">' + dur + '</small>' : ''), { tag: 'h4', t: { s: 21, ls: -0.01, lh: 1.75 } }),
                text('<p>' + d + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 15, lh: 1.6 }, x: { _margin: dims(4, 0, 0, 0) } })
              ]),
              C({ flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(22), css_classes: 'ex-fit' }, [
                heading(price, { tag: 'span', t: { s: 30, ls: -0.02, lh: 1.2 }, x: { _css_classes: 'ex-nowrap-text' } }),
                button('Book', '#book', { kind: 'outline', h: 44, fs: 14, pl: 18, pr: 18 })
              ])
            ])))
        ])),
        C({ flex_direction: 'row', flex_align_items: 'flex-start', flex_gap: gap(14), margin: dims(30, 0, 0, 0), padding: dims(20, 22, 20, 22),
          background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3) }, [
          C({ css_classes: 'ex-fit', width: px(26), min_height: px(26), border_radius: all(50, '%'), background_background: 'classic', background_color: '#4F5945',
            flex_justify_content: 'center', flex_align_items: 'center', padding: all(0) }, [heading('i', { tag: 'span', color: '#F5F2EA', t: { s: 14, w: 600, lh: 1 } })]),
          text('<p>' + note + '</p>', { t: { s: 15, lh: 1.65 } })
        ])
      ])
    ]);

    out.push(section({ x: { _element_id: 'fees', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#E6E0D5' } }, [
      eyebrow('Our Fees'),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(24), margin: dims(24, 0, 0, 0) }, [
        h2('Prices &amp; appointments', { t: { s: 48, lh: 1.08, ls: -0.03 } }),
        text("<p>Prices are the same at both clinics. Choose a treatment to see what's included.</p>", { t: { s: 17, lh: 1.7 }, x: maxw(460) })
      ]),
      C({ margin: dims(44, 0, 0, 0) }, [W('nested-tabs', Object.assign({
        tabs: CATS.map(c => ({ _id: EX.rid(), tab_title: c[0] })),
        tabs_direction: 'inline-start', tabs_direction_tablet: 'block-start', breakpoint_selector: 'none',
        tabs_title_space_between: px(6), title_text_color: '#272B26', title_text_color_hover: '#272B26', title_text_color_active: '#F5F2EA',
        tabs_title_background_color_background: 'classic', tabs_title_background_color_color: '#F5F2EA',
        tabs_title_background_color_hover_background: 'classic', tabs_title_background_color_hover_color: '#E6E0D5',
        tabs_title_background_color_active_background: 'classic', tabs_title_background_color_active_color: '#272B26',
        _css_classes: 'ex-fee-tabs'
      }, EX.typo({ f: IT, s: 19, w: 400, ls: -0.01, lh: 1.3 }, 'title_typography')), CATS.map(panel))])
    ]));

    const KNOW = [['card', 'Paying', 'Payment is taken at the end of each appointment. [Add accepted payment methods.]'],
      ['clock', 'Cancellations', 'Please give us 24 hours’ notice. Late cancellations and missed appointments may be charged at 50% if we can’t fill the slot.'],
      ['check', 'No referral needed', 'You can book directly — no need to see your GP first. Some insurers do ask for a referral.'],
      ['pin', 'Two clinics', 'Osteopathy and massage prices are the same in Sutton Coldfield and Lichfield, so book whichever suits you.']];
    out.push(section({}, [
      eyebrow('Good to Know'),
      h2('Before you book', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
      C(grid(4, { grid_columns_grid_tablet_extra: fr(2), grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(36, 0, 0, 0) }), KNOW.map(([ic, t, d]) =>
        C({ flex_gap: gap(12), padding: dims(28, 26, 30, 26), background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3) }, [
          circle(ic, 46, 20, { color: '#4F5945', box: { background_background: 'classic', background_color: '#F5F2EA' } }),
          heading(t, { tag: 'h3', t: { s: 21, w: 500, ls: -0.015, lh: 1.3 } }),
          text('<p>' + d + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 15, lh: 1.65 } })
        ])))
    ]));

    out.push(section({ pt: 72, pb: 72, ptm: 56, pbm: 56, x: { background_background: 'classic', background_color: '#4F5945' } }, [
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'center', flex_gap: gap(32) }, [
        C({ width: px(720), width_tablet: pct(100) }, [
          label('Health Insurance', '#E6E0D5'),
          heading('Claiming through your insurer?', { color: '#F5F2EA', t: { s: 36, st: 32, sm: 28, lh: 1.15, ls: -0.02 }, x: { _margin: dims(12, 0, 0, 0) } }),
          text("<p>We're registered with [list insurers]. Call reception with your policy and authorisation numbers and we'll take care of the rest.</p>", { color: 'rgba(245,242,234,0.85)', t: { s: 17, lh: 1.7 }, x: { _margin: dims(12, 0, 0, 0) } })
        ]),
        button('Call 0121 751 2440', 'tel:+441217512440', { kind: 'ivory', h: 60, fs: 17, icon: 'right', gapIcon: 18, pl: 28, pr: 28 })
      ])
    ]));

    out.push(P.reviews('Loved by patients across Sutton &amp; Lichfield', '[Paste a real Google review here — ideally one that mentions value or being looked after.]'));
    out.push(EX.HOME.logos());
    out.push(P.book({ title: 'Ready when you are. Book in minutes.', lead: 'No GP referral needed. Book online, call the clinic, or send us a message — and start feeling better, sooner.',
      cards: [['Book an Appointment', 'Pick a time online in under a minute.', L.book, 'olive'], ['New Patients', 'See how your first appointment works, from arrival to treatment plan.', L.newp, 'outline-dark']] }));
    return out;
  };


  /* ---------------- CONTACT ---------------- */
  const iconBtn = (lbl, href, ic) => button(lbl, href, { kind: 'ivory', h: 60, fs: 14, icon: ic, gapIcon: 0, pl: 18, pr: 18,
    x: { _css_classes: 'ex-icon-btn ex-round', button_text_color: '#4F5945', hover_color: '#4F5945', border_radius: all(50, '%'), text_padding: all(18) } });
  P.iconBtn = iconBtn;
  P.contact = () => {
    const out = [];
    out.push(P.heroSide({ img: '6046e3fbe3f542c03bbb9172ca220939', x: 60, y: 40, minh: 600, crumb: 'Contact', h1: 'Get in touch', shade: 'ex-hero-side',
      lead: 'Call, email or pop in to either of our clinics. Our reception team is happy to help with bookings, insurance and any questions.',
      buttons: [['Call 0121 751 2440', 'tel:+441217512440', 280], ['Book online', '#book', 260]] }));

    const WAYS = [['phone', 'Call us', '0121 751 2440', 'tel:+441217512440'], ['mail', 'Email us', 'info@exhaleosteopathy.co.uk', 'mailto:info@exhaleosteopathy.co.uk'], ['calendar', 'Book online', 'Choose a time', '#book']];
    out.push(section({ pt: 0, pb: 0, ptm: 0, pbm: 0, x: { background_background: 'classic', background_color: '#4F5945' } }, [
      C(grid(3, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(0), css_classes: 'ex-strip ex-strip--3' }), WAYS.map(([ic, k, v, href]) =>
        C({ html_tag: 'a', link: link(href), flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(18), padding: dims(30, 24, 30, 0),
          border_border: 'solid', border_width: dims(0, 1, 0, 0), border_color: 'rgba(245,242,234,0.14)' }, [
          circle(ic, 52, 22, { color: '#E6E0D5', box: { border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.35)' } }),
          C({ css_classes: 'ex-grow' }, [
            heading(k, { tag: 'span', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 12, ls: 0.16, tt: 'uppercase', lh: 1.35 } }),
            heading(v, { tag: 'span', color: '#F5F2EA', t: { s: 22, sm: 19, ls: -0.01, lh: 1.35 }, x: { _css_classes: 'ex-break' } })
          ])
        ])))
    ]));

    out.push(section({ pt: 100, pb: 40, ptm: 64, pbm: 32 }, [
      eyebrow('Our Clinics'),
      h2('Find us in Sutton Coldfield &amp; Lichfield', { t: { s: 48, lh: 1.08, ls: -0.03 }, o: { x: { _margin: dims(24, 0, 0, 0) } } }),
      para('Coming from elsewhere in Birmingham? See our <a class="ex-underline-olive" href="' + L.bham + '">guide for Birmingham patients</a>.', { t: { s: 17, lh: 1.7 }, mt: 16 })
    ]));

    const CL = [
      Object.assign({ n: '01', addr: '1 Sutton Oak Corner, Streetly, Sutton Coldfield, B74 2DH (inside Sutton Hearing Care)', phone: '0121 751 2440', tel: 'tel:+441217512440', phone2: 'Mobile 07412 995401',
        email: 'info@exhaleosteopathy.co.uk', hours: [['Mon – Fri', '09:00 – 20:00'], ['Saturday', '08:00 – 14:00'], ['Sunday', 'Closed']],
        photo: '3e5af535c29942d9a3c973f98d64792e', photoAlt: 'A treatment room at Exhale Osteopathy, Sutton Coldfield',
        getting: ['We’re inside Sutton Hearing Care', '[Parking details]', '[Step-free access?]'],
        treats: ['Osteopathy', 'Cranial Osteopathy', 'Physiotherapy', 'Acupuncture', 'Sports Massage'], bg: '#F5F2EA', pt: 40 }, { name: P.CLINICS.sutton.name, short: P.CLINICS.sutton.short, map: P.CLINICS.sutton.map, dir: P.CLINICS.sutton.dir }),
      Object.assign({ n: '02', addr: '30 Rotten Row, Lichfield, Staffordshire, WS13 6JB', phone: '01543 252673', tel: 'tel:+441543252673', phone2: 'Established 1983',
        email: 'contact@lichfield-osteopaths.co.uk', hours: [['Mon – Fri', '09:00 – 19:00'], ['Saturday', '09:00 – 14:00'], ['Sunday', 'Closed']],
        photo: 'lichfield-clinic', pos: [36, 50, 52], photoAlt: 'Lichfield Osteopathic Practice, 30 Rotten Row', getting: ['Parking outside the clinic', 'Free parking at Tesco, a few minutes’ walk', 'A few minutes’ walk from Lichfield city centre'],
        treats: ['Osteopathy', 'Cranial Osteopathy', 'Paediatric Osteopathy', 'Sports &amp; Deep Tissue Massage', 'Pregnancy Massage'], bg: '#E6E0D5', pt: 90, flip: true },
        { name: P.CLINICS.lichfield.name, short: P.CLINICS.lichfield.short, map: P.CLINICS.lichfield.map, dir: P.CLINICS.lichfield.dir })];
    const h4 = (t) => heading(t, { tag: 'h4', color: '#4F5945', t: { f: IN, s: 12, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 } });
    CL.forEach(c => {
      const photo = c.photo
        ? C(Object.assign({ min_height: px(520), border_radius: all(3), background_background: 'classic', background_color: '#E6E0D5', background_image: img(c.photo),
            background_size: 'cover' }, c.pos ? { background_position: 'initial', background_xpos: { unit: '%', size: c.pos[0] }, background_ypos: { unit: '%', size: c.pos[1] }, background_position_tablet: 'initial', background_xpos_tablet: { unit: '%', size: c.pos[2] }, background_ypos_tablet: { unit: '%', size: c.pos[1] }, background_position_mobile: 'initial', background_xpos_mobile: { unit: '%', size: c.pos[2] }, background_ypos_mobile: { unit: '%', size: c.pos[1] } } : { background_position: 'center center' }), [])
        : C({ min_height: px(520), border_radius: all(3), background_background: 'classic', background_color: '#E6E0D5', flex_justify_content: 'center', flex_align_items: 'center',
            border_border: c.bg === '#E6E0D5' ? 'solid' : '', border_width: all(1), border_color: '#B7AA99' },
          [heading('[Photo of ' + c.name + ']', { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 13, ls: 0.14, tt: 'uppercase', lh: 1.4 } })]);
      const details = C({}, [
        heading(c.n, { tag: 'span', color: '#4F5945', t: { s: 15, ls: 0.1, lh: 1.4 } }),
        heading(c.name, { tag: 'h3', t: { s: 40, st: 34, sm: 30, lh: 1.1, ls: -0.025 }, x: { _margin: dims(8, 0, 0, 0) } }),
        para(c.addr, { t: { s: 18, lh: 1.6 }, mt: 12 }),
        C(grid(2, { grid_columns_grid_mobile: fr(1), grid_gaps: gaps(28, 32), margin: dims(32, 0, 0, 0), padding: dims(28, 0, 0, 0),
          border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: '#B7AA99' }), [
          C({}, [h4('Contact'), text('<p><a href="' + c.tel + '">' + c.phone + '</a></p><p class="ex-small">' + c.phone2 + '</p><p><a href="mailto:' + c.email + '">' + c.email + '</a></p>',
            { t: { s: 16, lh: 1.75 }, x: { _margin: dims(12, 0, 0, 0), _css_classes: 'ex-list ex-gap-8 ex-dark-links ex-break' } })]),
          C({}, [h4('Opening Hours'), C({ flex_gap: gap(4), margin: dims(12, 0, 0, 0) }, c.hours.map(([d, t]) => C({ flex_direction: 'row', flex_justify_content: 'space-between', flex_gap: gap(16) }, [
            heading(d, { tag: 'span', color: 'rgba(39,43,38,0.84)', t: { f: IN, s: 15, lh: 1.75 } }), heading(t, { tag: 'span', t: { f: IN, s: 15, lh: 1.75 }, x: { _flex_size: 'none' } })])))]),
          C({}, [h4('Getting Here'), C({ flex_gap: gap(8), margin: dims(12, 0, 0, 0) }, c.getting.map(g => C({ flex_direction: 'row', flex_align_items: 'flex-start', flex_gap: gap(10) }, [
            circle('tick', 20, 11, { color: '#4F5945', box: { background_background: 'classic', background_color: c.bg === '#E6E0D5' ? '#F5F2EA' : '#E6E0D5', margin: dims(3, 0, 0, 0) } }),
            text('<p>' + g + '</p>', { t: { s: 15, lh: 1.6 } })])))]),
          C({}, [h4('Treatments Here'), C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(8), margin: dims(12, 0, 0, 0) }, c.treats.map(t =>
            heading(t, { tag: 'span', color: '#4F5945', t: { f: IN, s: 13, w: 500, lh: 1.5 }, x: { _element_width: 'auto', _padding: dims(6, 12, 6, 12), _border_radius: all(999),
              _background_background: 'classic', _background_color: c.bg === '#E6E0D5' ? '#F5F2EA' : '#E6E0D5' } })))])
        ]),
        C({ margin: dims(32, 0, 0, 0), border_radius: all(3), overflow: 'hidden', padding: all(0) }, [W('google_maps', { address: c.map, zoom: { unit: 'px', size: 15, sizes: [] }, height: px(180), _css_classes: 'ex-map' })]),
        C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(12), margin: dims(24, 0, 0, 0) }, [
          button('Book at ' + c.short, L.book, { kind: 'olive', h: 52, fs: 15, pl: 24, pr: 24 }),
          button('Get directions', c.dir, { kind: 'outline', h: 52, fs: 15, pl: 24, pr: 24, icon: 'arrowNE', gapIcon: 10 })
        ])
      ]);
      out.push(section({ pt: c.pt, pb: 90, ptm: c.flip ? 64 : 24, pbm: 64, x: { background_background: 'classic', background_color: c.bg } }, [
        C(gridC('minmax(0,1.1fr) minmax(0,1fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(56, 56), grid_gaps_tablet: gaps(32), grid_align_items: 'stretch' }),
          c.flip ? [details, photo] : [photo, details])
      ]));
    });

    out.push(section({ pt: 80, pb: 80, ptm: 56, pbm: 56, x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'center', flex_gap: gap(32) }, [
        C({ width: px(680), width_tablet: pct(100) }, [
          label('Follow Us'),
          heading('Tips, exercises and life at Exhale', { t: { s: 36, st: 32, sm: 28, lh: 1.15, ls: -0.02 }, x: { _margin: dims(12, 0, 0, 0) } }),
          para('Follow us for simple exercises, clinic news and behind-the-scenes from the team.', { t: { s: 17, lh: 1.7 }, mt: 12 })
        ]),
        C({ flex_direction: 'row', flex_gap: gap(12), css_classes: 'ex-fit' }, [
          iconBtn('Instagram', 'https://www.instagram.com/lichfield_osteopaths', 'instagram'),
          iconBtn('Facebook', 'https://www.facebook.com/LichfieldOsteopaths/', 'facebook'),
          iconBtn('Google reviews', '#google', 'star')
        ])
      ])
    ]));

    out.push(section({ pt: 96, pb: 96, ptm: 64, pbm: 64, x: { _element_id: 'book', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#272B26' } }, [
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'center', flex_gap: gap(32) }, [
        C({ width: px(640), width_tablet: pct(100) }, [
          heading('Book Today', { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
          h2('Ready when you are', { t: { s: 48, lh: 1.08, ls: -0.025 }, o: { color: '#F5F2EA', x: { _margin: dims(14, 0, 0, 0) } } }),
          text('<p>No GP referral needed. Choose a time online in under a minute.</p>', { color: 'rgba(245,242,234,0.8)', t: { s: 18, lh: 1.7 }, x: { _margin: dims(16, 0, 0, 0) } })
        ]),
        button('Book an appointment', L.book, { kind: 'olive', h: 64, fs: 18, icon: 'right', split: true, minw: 300, pl: 34, pr: 30 })
      ])
    ]));
    return out;
  };


  /* ---------------- BIRMINGHAM ---------------- */
  // Clinic address shown on the Birmingham page (the design's "Clinic address" setting).
  // Current: 1 Sutton Oak Corner. When the move happens, swap to BH_ADDRS['jockey-road'] and rebuild this page.
  const BH_ADDRS = {
    'sutton-oak': { street: '1 Sutton Oak Corner, Streetly', town: 'Sutton Coldfield', pc: 'B74 2DH', line: '1 Sutton Oak Corner, Streetly, Sutton Coldfield, B74 2DH',
      maps: 'https://www.google.com/maps/search/?api=1&query=1+Sutton+Oak+Corner+Sutton+Coldfield+B74+2DH' },
    'jockey-road': { street: '247A Jockey Road', town: 'Sutton Coldfield', pc: 'B73 5XE', line: '247A Jockey Road, Sutton Coldfield, B73 5XE',
      maps: 'https://www.google.com/maps/search/?api=1&query=247A+Jockey+Road+Sutton+Coldfield+B73+5XE' } };
  const BH_ADDR = BH_ADDRS['sutton-oak'];
  P.birmingham = () => {
    const A = BH_ADDR, out = [];
    const GOOGLE_REVIEWS = 'https://www.google.com/maps/search/?api=1&query=Exhale+Osteopathy+Sutton+Coldfield'; // replace with the clinic's verified Google reviews link
    const DIRECTIONS = P.CLINICS.sutton.dir;

    /* HERO */
    out.push(section({ pt: 176, pb: 72, ptm: 176, pbm: 56, x: { min_height: px(700), flex_justify_content: 'flex-end',
      background_background: 'classic', background_color: '#272B26', background_image: img('2cef3306a31a7e7056f2f7bef5cf4201'), background_position: 'initial',
      background_xpos: pct(50), background_ypos: pct(15), background_size: 'cover', css_classes: 'ex-hero-side ex-hero-side--93' } }, [
      heading('Exhale Osteopathy · Sutton Coldfield', { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
      heading('Looking for an osteopath in Birmingham?', { tag: 'h1', color: '#F5F2EA', t: { s: 64, st: 44, sm: 36, lh: 1.04, lhm: 1.08, ls: -0.035 }, x: Object.assign({ _margin: dims(18, 0, 0, 0) }, maxw(820)) }),
      text('<p>Personal care, clear advice and time to understand what’s troubling you.</p>', { color: 'rgba(245,242,234,0.9)', t: { s: 20, lh: 1.6 }, x: Object.assign({ _margin: dims(22, 0, 0, 0) }, maxw(680)) }),
      text('<p>At Exhale Osteopathy, we welcome patients from across Birmingham to our Sutton Coldfield clinic. Whether you’re dealing with a recent ache, a recurring problem or discomfort that’s affecting everyday life, we start by listening.</p><p>Our team offers osteopathy, physiotherapy and sports massage, with an approach shaped around your symptoms, your circumstances and what you want to get back to doing.</p>',
        { color: 'rgba(245,242,234,0.82)', t: { s: 17, lh: 1.7 }, x: Object.assign({ _margin: dims(14, 0, 0, 0), _css_classes: 'ex-list ex-gap-12' }, maxw(680)) }),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_align_items: 'center', flex_gap: gap(14), margin: dims(30, 0, 0, 0) }, [
        button('Book an appointment', L.book, { kind: 'ivory', h: 62, fs: 18, icon: 'right', split: true, minw: 280, pl: 32, pr: 28 }),
        button('Meet our team', '#team', { kind: 'outline-light', h: 62, fs: 18, icon: 'right', split: true, minw: 260, pl: 32, pr: 28 })
      ]),
      C({ flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(12), css_classes: 'ex-fit', margin: dims(24, 0, 0, 0), padding: dims(12, 18, 12, 18),
        background_background: 'classic', background_color: 'rgba(245,242,234,0.1)', border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.2)', border_radius: all(3) }, [
        W('icon', { selected_icon: icon('pin'), primary_color: '#E6E0D5', size: px(18) }),
        heading('Sutton Coldfield, north Birmingham · Book directly without a GP referral', { tag: 'span', color: '#F5F2EA', t: { f: IN, s: 15, lh: 1.5 } })
      ])
    ]));

    /* AT A GLANCE (verified facts only) */
    const FACTS = [['Location', 'Sutton Coldfield, Birmingham'], ['Open late', 'Mon–Fri until 8pm'], ['Weekends', 'Saturday 8am–2pm'], ['GP referral', 'Not needed']];
    out.push(section({ pt: 0, pb: 0, ptm: 0, pbm: 0, x: { background_background: 'classic', background_color: '#4F5945' } }, [
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(0), css_classes: 'ex-strip' }), FACTS.map(([k, v]) =>
        C({ padding: dims(26, 24, 26, 0), border_border: 'solid', border_width: dims(0, 1, 0, 0), border_color: 'rgba(245,242,234,0.14)' }, [
          heading(k, { tag: 'span', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 12, ls: 0.16, tt: 'uppercase', lh: 1.35 } }),
          heading(v, { tag: 'span', color: '#F5F2EA', t: { s: 20, ls: -0.01, lh: 1.35 }, x: { _margin: dims(4, 0, 0, 0) } })
        ])))
    ]));

    /* LOCATION */
    out.push(section({ x: { _element_id: 'visit', css_classes: 'ex-anchor' } }, [
      C(gridC('minmax(0,1fr) minmax(0,1.1fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(64), grid_gaps_tablet: gaps(40), grid_align_items: 'start' }), [
        C({}, [
          eyebrow('Where We Are'),
          h2('Visit our Sutton Coldfield clinic in north Birmingham', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
          para('Choosing a clinic involves more than finding a name on a map. You need to know who you’ll see, what to expect and whether getting there will work for you.', { mt: 20 }),
          para('Exhale is based in Sutton Coldfield, within the City of Birmingham. Our location may be particularly convenient if you live or work in north Birmingham, including Erdington, Kingstanding and Great Barr.', { mt: 20 }),
          C({ margin: dims(32, 0, 0, 0), padding: dims(28, 28, 30, 28), padding_mobile: dims(24, 20, 26, 20), background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3) }, [
            heading('Address', { tag: 'h3', color: '#4F5945', t: { f: IN, s: 12, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 } }),
            heading('Exhale Osteopathy<br>' + A.street + '<br>' + A.town + ', ' + A.pc, { tag: 'p', t: { s: 22, ls: -0.01, lh: 1.35 }, x: { _margin: dims(10, 0, 0, 0) } }),
            text('<p>Inside Sutton Hearing Care</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 16, lh: 1.6 }, x: { _margin: dims(6, 0, 0, 0) } }),
            heading('Telephone', { tag: 'h3', color: '#4F5945', t: { f: IN, s: 12, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 }, x: { _margin: dims(24, 0, 0, 0) } }),
            heading('<a href="tel:+441217512440">0121 751 2440</a>', { tag: 'p', t: { s: 22, ls: -0.01, lh: 1.35 }, x: { _margin: dims(10, 0, 0, 0), _css_classes: 'ex-dark-links' } })
          ])
        ]),
        C({}, [
          C({ border_radius: all(3), overflow: 'hidden', padding: all(0) }, [W('google_maps', { address: 'Exhale Osteopathy, 1 Sutton Oak Corner, Sutton Coldfield B74 2DH', zoom: { unit: 'px', size: 15, sizes: [] }, height: px(520), _css_classes: 'ex-map' })]),
          C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(12), margin: dims(18, 0, 0, 0) }, [
            button('Get directions', DIRECTIONS, { kind: 'olive', h: 52, fs: 15, pl: 24, pr: 24, icon: 'arrowNE', gapIcon: 10 }),
            button('Call 0121 751 2440', 'tel:+441217512440', { kind: 'outline', h: 52, fs: 15, pl: 24, pr: 24 })
          ])
        ])
      ])
    ]));

    /* REASONS */
    const WHY = [['01', 'Time to explain what’s happening', 'Tell us what hurts, when it started and how it affects your day. Your work, activity levels, medical history and concerns all help us understand the bigger picture.'],
      ['02', 'An assessment with a clear explanation', 'We assess your symptoms and explain our findings in straightforward language. You’ll have the opportunity to ask questions and discuss the options before deciding whether to proceed with treatment.'],
      ['03', 'A plan built around your goals', 'Your priority might be sitting comfortably at work, walking further, returning to exercise or managing day-to-day activities. We’ll discuss a practical plan that takes those goals into account.'],
      ['04', 'Advice about the next step', 'Hands-on treatment won’t be appropriate for every person or every problem. If your assessment suggests you need another type of care or further investigation, we’ll explain why and discuss where to seek help.']];
    out.push(section({ x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      eyebrow('Why Patients Choose Exhale'),
      h2('Care that starts with understanding you', { o: { x: Object.assign({ _margin: dims(24, 0, 0, 0) }, maxw(780)) } }),
      C(grid(2, { grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(40, 0, 0, 0) }), WHY.map(([n, t, d]) =>
        C({ flex_gap: gap(12), padding: dims(30, 28, 32, 28), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
          heading(n, { tag: 'span', color: '#4F5945', t: { s: 13, ls: 0.1, lh: 1.4 } }),
          heading(t, { tag: 'h3', t: { s: 22, w: 500, ls: -0.015, lh: 1.3 } }),
          text('<p>' + d + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 15, lh: 1.65 } })
        ])))
    ]));

    /* TREATMENTS */
    const SVC = [['Osteopathy', L.osteo, 'An assessment-led approach that may include hands-on treatment, movement advice and exercises, depending on your symptoms and preferences.', 'Explore osteopathy'],
      ['Physiotherapy', L.physio, 'Assessment, rehabilitation and exercise guidance to help you work towards your movement and activity goals.', 'Explore physiotherapy'],
      ['Sports massage', L.massage, 'Massage for people seeking help with muscular tension or recovery from activity. You don’t need to play sport to book.', 'Explore sports massage']];
    out.push(section({}, [
      eyebrow('Our Treatments'),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(24), margin: dims(24, 0, 0, 0) }, [
        h2('Osteopathy, physiotherapy and sports massage', { o: { x: maxw(680) } }),
        text('<p>Different people need different approaches. Our team brings together several services at the same clinic, making it easier to discuss which may suit your needs.</p>', { t: { s: 17, lh: 1.7 }, x: maxw(500) })
      ]),
      C(grid(3, { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(0, 48), margin: dims(36, 0, 0, 0), border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: '#B7AA99' }), SVC.map(([n, href, d, cta]) =>
        C({ html_tag: 'a', link: link(href), flex_direction: 'row', flex_justify_content: 'space-between', flex_align_items: 'flex-start', flex_gap: gap(20), padding: dims(26, 0, 26, 0),
          border_border: 'solid', border_width: dims(0, 0, 1, 0), border_color: '#B7AA99' }, [
          C({ css_classes: 'ex-grow' }, [
            heading(n, { tag: 'h3', t: { s: 21, ls: -0.01, lh: 1.5 } }),
            text('<p>' + d + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 15, lh: 1.6 }, x: { _margin: dims(4, 0, 0, 0) } }),
            heading(cta + ' →', { tag: 'span', color: '#4F5945', t: { f: IN, s: 15, w: 500, lh: 1.6 }, x: { _margin: dims(10, 0, 0, 0) } })
          ]),
          W('icon', { selected_icon: icon('right'), view: 'stacked', shape: 'square', primary_color: '#E6E0D5', secondary_color: '#4F5945', size: px(18), icon_padding: px(13), border_radius: all(3) })
        ]))),
      para('We also offer dedicated appointments for <a class="ex-underline-olive ex-w400" href="' + L.preg + '">pregnancy</a> and for <a class="ex-underline-olive ex-w400" href="' + L.babies + '">babies and children</a>. These have different assessment needs, so please choose the relevant service when booking or contact us for guidance.',
        { t: { s: 17, lh: 1.7 }, mt: 28, x: maxw(820) }),
      heading('<a href="/#services">View all treatments →</a>', { tag: 'p', t: { f: IN, s: 15, w: 500, lh: 1.75 }, x: { _margin: dims(14, 0, 0, 0) } })
    ]));

    /* TEAM */
    const TEAM = [['Hafi Rahman', 'Founder &amp; Osteopath', L.hafi, 'f4513f27866f22682d9d1eafdcd00e9b', 'B’Ost (Hons). Also a sports therapist and personal trainer.'],
      ['Ankita Desai', 'Registered Osteopath', L.ankita, 'f8984ae774fa815b4d817f0fe0266bba', 'Master’s in Osteopathy, British School of Osteopathy.'],
      ['Freta Teklensenbet', 'Registered Osteopath', L.freta, '2b3650271a3bcca5534fca4186d2400c', 'Registered with the General Osteopathic Council.'],
      ['Emre Tosun', 'Physiotherapist, Personal Trainer &amp; Sports Massage Therapist', L.emre, 'emre-portrait', 'MSc Physiotherapy; background in Sports and Exercise Science.'],
      ['Zoe Goodwin', 'Sports Massage Therapist', L.zoe, 'a1aa92c86185fbf90aea1ad6a47c85a3', 'Level 4 Sports Massage; BSc Sport, Exercise &amp; Health Science.']];
    out.push(section({ x: { _element_id: 'team', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#E6E0D5' } }, [
      eyebrow('Who You’ll See'),
      C(gridC('minmax(0,1fr) minmax(0,1fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(24, 64), margin: dims(24, 0, 0, 0), grid_align_items: 'start' }), [
        C({}, [
          h2('Meet the people behind your care'),
          para('Knowing who will treat you matters.', { t: { s: 19, lh: 1.6 }, mt: 16 })
        ]),
        C({}, [
          text('<p>Exhale is led by <a class="ex-underline-olive ex-w400" href="' + L.hafi + '">Hafi Rahman</a>, osteopath and founder, alongside a team of osteopaths, a physiotherapist and a sports massage therapist.</p>' +
            '<p>Visit our practitioner profiles to read about each clinician’s qualifications, experience and areas of interest. You can then choose a practitioner when booking.</p>' +
            '<p>If you’re unsure who to see, call reception on <a class="ex-underline-olive ex-w400" href="tel:+441217512440">0121 751 2440</a> and we’ll help you find an appropriate appointment.</p>',
            { t: { s: 17, lh: 1.7 }, x: { _css_classes: 'ex-list ex-gap-12' } }),
          button('Meet our team', L.about + '#team', { kind: 'outline', h: 52, fs: 15, pl: 24, pr: 24, x: { _margin: dims(22, 0, 0, 0) } })
        ])
      ]),
      C(grid(5, { grid_columns_grid_tablet_extra: fr(3), grid_columns_grid_tablet: fr(3), grid_columns_grid_mobile: fr(2), grid_gaps: gaps(20), grid_gaps_mobile: gaps(16), margin: dims(40, 0, 0, 0) }),
        TEAM.map(([n, role, href, a, cred]) => C({ html_tag: 'a', link: link(href) }, [
          P.photo(a, n.replace(/&amp;/g, '&'), 'ex-ratio-34', { x: { _css_classes: 'ex-ratio-34 ex-pos-top' }, ph: '', box: { background_color: '#F5F2EA' } }),
          heading(n, { tag: 'h3', t: { s: 20, ls: -0.015, lh: 1.3 }, x: { _margin: dims(16, 0, 0, 0) } }),
          heading(role, { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 14, lh: 1.75 } }),
          text('<p>' + cred + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 14, lh: 1.55 }, x: { _margin: dims(8, 0, 0, 0) } }),
          heading('View Profile →', { tag: 'span', color: '#4F5945', t: { f: IN, s: 14, w: 500, lh: 1.75 }, x: { _margin: dims(8, 0, 0, 0) } })
        ])))
    ]));

    /* FIRST APPOINTMENT */
    const STEPS = [['01', 'Tell us about your symptoms', 'We’ll ask about your current concerns, relevant medical history and how the problem affects your daily life.'],
      ['02', 'Have an assessment', 'Your practitioner will explain the examination and ask for your consent. This may include looking at your movement and carrying out relevant physical tests.'],
      ['03', 'Discuss your options', 'We’ll explain our findings, whether treatment is appropriate and what it may involve. You can ask questions, decline any part of the assessment or treatment, or ask us to stop at any time.'],
      ['04', 'Agree your next steps', 'Where appropriate, treatment may begin at the first appointment. We may also suggest exercises or practical changes to try at home. Any follow-up recommendations will depend on your individual needs.']];
    out.push(section({ pt: 100, pb: 108, ptm: 64, pbm: 64, x: { background_background: 'classic', background_color: '#4F5945' } }, [
      eyebrow('Your First Appointment', { light: true, pb: 18 }),
      h2('What happens at your first appointment?', { t: { s: 46, lh: 1.08, ls: -0.03 }, o: { color: '#F5F2EA', x: Object.assign({ _margin: dims(28, 0, 0, 0) }, maxw(780)) } }),
      C(grid(4, { grid_columns_grid_tablet_extra: fr(2), grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(48, 0, 0, 0) }), STEPS.map(([n, t, d]) =>
        C({ flex_gap: gap(14), padding: dims(30, 28, 32, 28), border_radius: all(3), background_background: 'classic', background_color: 'rgba(245,242,234,0.08)',
          border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.18)' }, [
          heading(n, { tag: 'span', color: '#E6E0D5', t: { s: 52, lh: 1, ls: -0.04 } }),
          heading(t, { tag: 'h3', color: '#F5F2EA', t: { s: 22, w: 500, ls: -0.015, lh: 1.25 } }),
          text('<p>' + d + '</p>', { color: 'rgba(245,242,234,0.85)', t: { s: 15, lh: 1.65 } })
        ]))),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(12), margin: dims(36, 0, 0, 0) }, [
        button('View appointment fees', L.fees, { kind: 'outline-light', bd: 'rgba(245,242,234,0.7)', h: 54, fs: 16, pl: 26, pr: 26 }),
        button('Book your first appointment', L.book, { kind: 'ivory', h: 54, fs: 16, pl: 26, pr: 26 })
      ])
    ]));

    /* REVIEWS — introduction and Google link only (no unverified testimonial cards) */
    out.push(section({ pt: 96, pb: 96, ptm: 64, pbm: 64 }, [
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(32) }, [
        C({ width: px(760), width_tablet: pct(100) }, [
          heading('Patient Stories', { tag: 'p', color: '#4F5945', t: { f: IN, s: 13, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 }, x: { _css_classes: 'ex-eyebrow' } }),
          h2('Read about other patients’ experiences', { o: { x: { _margin: dims(20, 0, 0, 0) } } }),
          para('Choosing someone to help with your health is a personal decision. Reading independent reviews can give you an idea of how other patients have experienced the clinic, our communication and their appointments.', { t: { s: 17, lh: 1.7 }, mt: 16 })
        ]),
        button('Read our reviews on Google', GOOGLE_REVIEWS, { kind: 'olive', h: 54, fs: 16, pl: 26, pr: 26, icon: 'arrowNE', gapIcon: 10 })
      ])
    ]));

    /* FAQS */
    const FAQ = [['Where in Birmingham is Exhale Osteopathy?', 'Our clinic is in Sutton Coldfield, in north Birmingham. Please check the location details on this page for our current street address, directions and parking arrangements before travelling.'],
      ['Do I need a GP referral?', 'No. You can book directly with us. If you intend to claim through private health insurance, check your insurer’s requirements and whether your chosen practitioner is covered before booking.'],
      ['Should I book osteopathy or physiotherapy?', 'Both involve assessing your symptoms and discussing an appropriate plan. The best starting point depends on your needs, preferences and the practitioner’s expertise. If you’re unsure, contact reception and we’ll help guide your booking.'],
      ['Can I choose who I see?', 'Yes. You can view our practitioner profiles and check their available appointments through online booking. Some services are provided by specific practitioners.'],
      ['What should I wear?', 'Wear comfortable clothing that allows you to move. Depending on the area being assessed, your practitioner may discuss adjusting or removing some clothing. They will explain what is needed, respect your preferences and ask for your consent.'],
      ['Will I receive treatment at my first visit?', 'Treatment may be offered after your assessment if it is appropriate and you agree to it. Occasionally, further investigation or another type of care may be the more suitable next step.'],
      ['How many appointments will I need?', 'There is no fixed number that suits everyone. Your practitioner will discuss their recommendations after assessing you and review the plan according to your progress.'],
      ['Is there parking, and is the clinic accessible?', 'Please check the confirmed parking and access information in the location section above. If you have mobility needs or are visiting with a pram, call before your appointment so we can discuss the arrangements.']];
    const acc = faqAccordion(FAQ.map(([q, a]) => ({ q, a })));
    acc.settings.title_tag = 'h3';
    acc.settings.custom_css = acc.settings.custom_css.replace('background:#E6E0D5;color:#4F5945', 'background:#F5F2EA;color:#4F5945');
    out.push(section({ x: { _element_id: 'faqs', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#E6E0D5' } }, [
      C(gridC('minmax(0,1fr) minmax(0,1.5fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(64), grid_gaps_tablet: gaps(40), grid_align_items: 'start' }), [
        C({}, [
          eyebrow('Visiting Us'),
          h2('Questions about visiting Exhale from Birmingham', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
          para('Anything else? Call <a class="ex-underline-olive ex-w400" href="tel:+441217512440">0121 751 2440</a> or email <a class="ex-underline-olive ex-w400 ex-break" href="mailto:info@exhaleosteopathy.co.uk">info@exhaleosteopathy.co.uk</a>.', { t: { s: 17, lh: 1.7 }, mt: 18 })
        ]),
        acc
      ])
    ]));

    /* CONDITION LINKS */
    const CONDS = [['Back pain', L.back], ['Neck pain', L.neck], ['Shoulder pain', L.shoulder], ['Hip pain', L.hip], ['Knee pain', L.knee], ['Foot and ankle pain', L.ankle],
      ['Sciatica', L.sciatica], ['Sports injuries', L.sports]];
    out.push(section({ pt: 80, pb: 80, ptm: 56, pbm: 56 }, [
      label('Common Problems We Treat'),
      heading('Explore information about your symptoms', { t: { s: 34, st: 32, sm: 28, lh: 1.15, ls: -0.02 }, x: { _margin: dims(12, 0, 0, 0) } }),
      para('Our condition pages explain how we approach assessment and when another type of care may be needed.', { t: { s: 17, lh: 1.7 }, mt: 12, x: maxw(760) }),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(10), margin: dims(24, 0, 0, 0) }, CONDS.map(([n, href]) => P.chip(n, href))),
      para('If you’re unsure whether an appointment is suitable, <a class="ex-underline-olive ex-w400" href="' + L.contact + '">contact us</a> before booking.', { t: { s: 16, lh: 1.7 }, mt: 22 })
    ]));

    /* FINAL BOOKING */
    out.push(P.book({ img: '602bcebb1c29e98bc4fcd47a4c86b013', title: 'Book an appointment at Exhale', ts: 46, leadw: 540,
      lead: 'Find a practitioner and appointment time that work for you at our Sutton Coldfield clinic.</p><p>You can check availability and book online, or call us if you would prefer to speak to someone first.',
      cards: [['Book an appointment', 'Check availability and book online.', L.book, 'olive'], ['Call 0121 751 2440', 'Speak to someone first.', 'tel:+441217512440', 'outline'],
        ['Email us', 'info@exhaleosteopathy.co.uk', 'mailto:info@exhaleosteopathy.co.uk', 'outline']] }));
    return out;
  };

  /* ---------------- BLOG ---------------- */
  // Uses Elementor Pro Loop Grid + Taxonomy Filter with the loop-item templates "Exhale Blog Card" / "Exhale Blog Featured Card"
  P.BLOG = { card: 401, featured: 407, small: 410, featuredPost: 400 };
  P.blog = () => {
    const B = P.BLOG, out = [];
    out.push(section({ pt: 168, pb: 80, ptm: 136, pbm: 56, x: { background_background: 'classic', background_color: '#272B26', css_classes: 'ex-hero-line' } }, [
      heading('<a href="/">Home</a> <span aria-hidden="true">→</span> <strong>Blog</strong>',
        { tag: 'p', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 15, lh: 1.6 }, x: { _css_classes: 'ex-on-dark ex-crumbs ex-crumbs--88' } }),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(32), margin: dims(24, 0, 0, 0) }, [
        heading('Advice from the treatment room', { tag: 'h1', color: '#F5F2EA', t: { s: 68, st: 44, sm: 36, lh: 1.02, lhm: 1.08, ls: -0.035 }, x: maxw(760) }),
        text('<p>Practical guides, exercises and honest answers to the questions our patients ask most — written by the Exhale team.</p>', { color: 'rgba(245,242,234,0.85)', t: { s: 19, lh: 1.65 }, x: maxw(480) })
      ])
    ]));
    out.push(section({ pt: 72, pb: 40, ptm: 40, pbm: 24 }, [
      W('loop-grid', { template_id: String(B.featured), columns: '1', columns_tablet: '1', columns_mobile: '1', posts_per_page: 1,
        post_query_post_type: 'by_id', post_query_posts_ids: [String(B.featuredPost)], row_gap: px(0), column_gap: px(0) })
    ]));
    const gridId = EX.rid();
    out.push(section({ pt: 40, pb: 100, ptm: 24, pbm: 64 }, [
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'center', flex_gap: gap(20),
        border_border: 'solid', border_width: dims(0, 0, 1, 0), border_color: '#B7AA99' }, [
        W('taxonomy-filter', Object.assign({ selected_element: gridId, taxonomy: 'category', show_first_item: 'yes', first_item_title: 'All',
          horizontal_scroll: 'disable', taxonomy_filter_items_space_between: px(0), _css_classes: 'ex-blog-filter',
          taxonomy_filter_normal_text_color: '#272B26', taxonomy_filter_hover_text_color: '#4F5945', taxonomy_filter_active_text_color: '#4F5945',
          taxonomy_filter_padding: dims(14, 18, 16, 18), taxonomy_filter_border_radius: all(0) }, EX.typo({ f: IN, s: 14, w: 500, ls: 0.06, lh: 1.4 }, 'taxonomy_filter_typography')))
      ]),
      Object.assign(W('loop-grid', { template_id: String(B.card), columns: '3', columns_tablet: '2', columns_mobile: '1', posts_per_page: 6,
        post_query_post_type: 'post', post_query_exclude: ['manual_selection'], post_query_exclude_ids: [String(B.featuredPost)],
        column_gap: px(24), row_gap: px(40), pagination_type: 'load_more_on_click', text: 'Load more articles', load_more_spacing: px(56),
        load_more_no_posts_custom_message: '', _margin: dims(40, 0, 0, 0), _css_classes: 'ex-blog-grid' }), { id: gridId })
    ]));
    out.push(section({ pt: 80, pb: 80, ptm: 56, pbm: 56, x: { background_background: 'classic', background_color: '#4F5945' } }, [
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'center', flex_gap: gap(32) }, [
        C({ width: px(680), width_tablet: pct(100) }, [
          label('Follow Us', '#E6E0D5'),
          heading('More tips and exercises on Instagram', { color: '#F5F2EA', t: { s: 36, st: 30, sm: 28, lh: 1.15, ls: -0.02 }, x: { _margin: dims(12, 0, 0, 0) } }),
          para('Short videos, simple exercises and clinic news from the team.', { color: 'rgba(245,242,234,0.85)', t: { s: 17, lh: 1.7 }, mt: 12 })
        ]),
        C({ flex_direction: 'row', flex_gap: gap(12), css_classes: 'ex-fit' }, [
          P.iconBtn('Instagram', 'https://www.instagram.com/lichfield_osteopaths', 'instagram'),
          P.iconBtn('Facebook', 'https://www.facebook.com/LichfieldOsteopaths/', 'facebook')
        ])
      ])
    ]));
    out.push(P.book({ title: 'Reading isn’t fixing it?', ts: 46, lead: 'Book an assessment and we’ll find out what’s going on. No GP referral needed.',
      cards: [['Book an Appointment', 'Initial consultation &amp; treatment — £75.', L.book, 'olive'], ['Call 0121 751 2440', 'Speak to our team.', 'tel:+441217512440', 'outline']] }));
    return out;
  };


  /* ---------------- BLOG ARTICLE: Does Osteopathy Help With Pelvic Girdle Pain? (post 400) ---------------- */
  const avatar = (size, fs) => C({ css_classes: 'ex-avatar ex-avatar--' + size, background_background: 'classic', background_color: '#4F5945', border_radius: all(50, '%'),
    flex_justify_content: 'center', flex_align_items: 'center', padding: all(0) }, [heading('e', { tag: 'span', color: '#F5F2EA', t: { s: fs, lh: 1 } })]);
  P.avatar = avatar;
  P.postPgp = () => {
    const out = [];
    const aH2 = (t, id) => heading(t, { t: { s: 32, sm: 28, lh: 1.15, ls: -0.02 }, x: { _element_id: id, _css_classes: 'ex-anchor', _margin: dims(52, 0, 0, 0) } });
    const aP = (t, mt) => para(t, { mt: mt ?? 18 });
    out.push(section({ pt: 160, pb: 150, ptm: 128, pbm: 140, x: { background_background: 'classic', background_color: '#272B26', css_classes: 'ex-hero-line', flex_align_items: 'center' } }, [
      C({ width: px(900), width_tablet: pct(100), flex_align_items: 'center' }, [
        heading('<a href="/">Home</a> <span aria-hidden="true">→</span> <a href="' + L.blog + '">Blog</a> <span aria-hidden="true">→</span> <strong>Pregnancy</strong>',
          { tag: 'p', align: 'center', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 15, lh: 1.6 }, x: { _css_classes: 'ex-on-dark ex-crumbs ex-crumbs--88' } }),
        heading('Does Osteopathy Help With Pelvic Girdle Pain?', { tag: 'h1', align: 'center', color: '#F5F2EA', t: { s: 58, st: 40, sm: 36, lh: 1.06, lhm: 1.08, ls: -0.035 }, x: { _margin: dims(26, 0, 0, 0) } }),
        text('<p>What pelvic girdle pain is, how osteopathy can help, and the simple exercises and everyday changes that make a difference during pregnancy.</p>',
          { color: 'rgba(245,242,234,0.85)', t: { s: 19, lh: 1.65 }, x: Object.assign({ align: 'center', _margin: dims(22, 0, 0, 0) }, maxw(680)) }),
        C({ flex_direction: 'row', flex_justify_content: 'center', flex_align_items: 'center', flex_gap: gap(14), margin: dims(30, 0, 0, 0), css_classes: 'ex-fit' }, [
          avatar(40, 18),
          text('<p><strong>[Author name]</strong><br>[Date] · 6 min read</p>', { color: 'rgba(245,242,234,0.88)', t: { s: 14, lh: 1.4 }, x: { _css_classes: 'ex-strong-light' } })
        ])
      ])
    ]));
    out.push(section({ pt: 0, pb: 0, ptm: 0, pbm: 0, x: { margin: dims(-110, 0, 0, 0), position: '', z_index: 2, css_classes: 'ex-overlap' } }, [
      image('fcb8c0b6c5dee3cb4f97fc820f5f9a2d', 'Osteopath treating a patient\'s lower back', { x: { _css_classes: 'ex-cover-520', image_border_radius: all(3), align: 'center' } })
    ]));

    const TECH = [['Joint mobilisation', 'gentle movement of the pelvic and lower back joints.'], ['Soft tissue work', 'easing tight muscles around the hips, buttocks and back.'],
      ['Postural advice', 'simple changes to how you sit, stand and sleep.'], ['Exercises &amp; stretches', 'to support and strengthen the pelvis.'], ['Clinical Pilates', 'building core and pelvic stability.']];
    const EXS = [['01', 'Hip bridges', 'Strengthen the glutes to support the pelvis. Lie on your back with knees bent and lift your hips gently.'],
      ['02', 'Pelvic floor exercises', 'Regular squeezes help support the pelvis and are recommended throughout pregnancy.'],
      ['03', 'Pelvic tilts', 'Gently rock the pelvis on all fours or against a wall to ease stiffness.'],
      ['04', 'Gentle cardio', 'Walking or swimming (avoiding breaststroke kick) helps you stay active.'],
      ['05', 'Supported squats', 'Shallow squats holding a chair or worktop, only if they feel comfortable.']];
    const FAQ = [['What should I avoid with pelvic girdle pain?', 'Try to avoid standing on one leg, heavy lifting, carrying a child on one hip and wide-legged movements such as breaststroke kick.'],
      ['What makes pelvic girdle pain worse?', 'Common triggers include stairs, turning over in bed, getting in and out of the car and walking for long periods.'],
      ['How can I ease pelvic girdle pain?', 'Treatment, gentle exercise, a pillow between your knees at night, keeping your knees together when moving, ice or heat, and sometimes a pelvic support belt can all help. Rest when you need to.'],
      ['Is osteopathy safe during pregnancy?', 'Osteopathy is generally safe throughout pregnancy when adapted appropriately. Let your midwife know you’re seeing us.']];
    const acc = faqAccordion(FAQ.map(([q, a]) => ({ q, a })));
    acc.settings.title_typography_font_size = px(20);
    acc.settings.custom_css = acc.settings.custom_css.replace('padding:24px 0', 'padding:20px 0').replace('width:40px;height:40px', 'width:36px;height:36px').replace('padding:0 48px 26px 0', 'padding:0 40px 22px 0');
    acc.settings._margin = dims(20, 0, 0, 0);

    const TOC = [['what-is', 'What is pelvic girdle pain?'], ['how-helps', 'How osteopathy can help'], ['evidence', 'Does it work?'], ['expect', 'What to expect'],
      ['exercises', 'Exercises that can help'], ['tips', 'Everyday tips'], ['faqs', 'FAQs']];
    const left = C({ css_classes: 'ex-sticky', html_tag: 'aside' }, [
      C({ html_tag: 'nav', padding: dims(16, 0, 0, 0), border_border: 'solid', border_width: dims(2, 0, 0, 0), border_color: '#272B26' }, [
        label('In this article'),
        C({ margin: dims(12, 0, 0, 0) }, TOC.map(([id, t]) => heading('<a href="#' + id + '">' + t + '</a>', { tag: 'p', t: { f: IN, s: 15, lh: 1.45 },
          x: { _css_classes: 'ex-toc-link', _padding: dims(8, 0, 8, 0), _border_border: 'solid', _border_width: dims(0, 0, 1, 0), _border_color: '#B7AA99' } })))
      ]),
      W('share-buttons', { share_buttons: [{ _id: EX.rid(), button: 'facebook' }, { _id: EX.rid(), button: 'email' }], view: 'icon', skin: 'flat', shape: 'circle',
        color_source: 'custom', primary_color: '#E6E0D5', secondary_color: '#4F5945', primary_color_hover: '#4F5945', secondary_color_hover: '#F5F2EA',
        button_size: px(1.1), icon_size: em(1.1), column_gap: px(10), _margin: dims(24, 0, 0, 0), _css_classes: 'ex-share' })
    ]);
    const art = C({ html_tag: 'article' }, [
      heading('Pelvic girdle pain (PGP) is common in pregnancy — it’s thought to affect around 1 in 5 pregnant women. It can make walking, climbing stairs and even turning over in bed uncomfortable. The good news is that it usually responds well to the right care, and osteopathy can be part of that.',
        { tag: 'p', t: { s: 23, sm: 20, lh: 1.55, ls: -0.01 } }),
      aH2('What is pelvic girdle pain?', 'what-is'),
      aP('PGP is pain in the joints of the pelvis — at the front (the pubic symphysis), at the back (the sacroiliac joints), or both. During pregnancy, hormonal changes and the growing weight of your bump change how these joints move and how much load they carry, which can lead to pain and stiffness.'),
      aP('You might feel it over the pubic bone, in the lower back or buttocks, in the groin, or down the inner thighs. It’s often worse with activities that load one leg at a time.'),
      aH2('How osteopathy can help', 'how-helps'),
      aP('Osteopathy is a hands-on approach that aims to restore comfortable movement and function in the pelvis, lower back and hips. Treatment is always adapted for pregnancy — we use side-lying and seated positions with plenty of support, and gentle techniques suited to your stage.'),
      C({ margin: dims(28, 0, 0, 0), padding: dims(28, 30, 28, 30), padding_mobile: dims(24, 20, 24, 20), background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3) }, [
        heading('Techniques we may use', { tag: 'h3', t: { s: 20, w: 500, lh: 1.3 } }),
        C({ flex_gap: gap(10), margin: dims(14, 0, 0, 0) }, TECH.map(([t, d]) => C({ flex_direction: 'row', flex_align_items: 'flex-start', flex_gap: gap(12) }, [
          circle('tick', 22, 12, { color: '#4F5945', box: { background_background: 'classic', background_color: '#F5F2EA', margin: dims(3, 0, 0, 0) } }),
          text('<p><strong>' + t + '</strong> — ' + d + '</p>', { t: { s: 16, lh: 1.75 }, x: { _css_classes: 'ex-strong-600' } })])))
      ]),
      aH2('Does it work?', 'evidence'),
      aP('Research into manual therapy for pregnancy-related pelvic pain is still growing, but studies — including a 2021 observational study of pregnant women receiving osteopathic treatment — have reported improvements in pain and quality of life, particularly over several visits. Many of our patients find a combination of treatment, exercise and practical advice makes daily life much easier.'),
      aH2('What to expect at your appointment', 'expect'),
      aP('We’ll ask about your pregnancy, your symptoms and what makes them better or worse, then gently assess how your pelvis, back and hips are moving. Treatment usually includes hands-on work, some simple exercises and advice for home and work. Most people need a few sessions, and we’ll review how you’re doing each time.'),
      aH2('Exercises that can help', 'exercises'),
      aP('Gentle exercise can support the pelvis and keep you moving. Always check with your osteopath or midwife which exercises are right for you, and stop anything that increases your pain.'),
      C(grid(2, { grid_columns_grid_mobile: fr(1), grid_gaps: gaps(12), margin: dims(24, 0, 0, 0) }), EXS.map(([n, t, d]) =>
        C({ padding: dims(22, 22, 24, 22), border_border: 'solid', border_width: all(1), border_color: '#B7AA99', border_radius: all(3) }, [
          heading(n, { tag: 'span', color: '#4F5945', t: { s: 13, ls: 0.1, lh: 1.4 } }),
          heading(t, { tag: 'h3', t: { s: 19, w: 500, lh: 1.3 }, x: { _margin: dims(6, 0, 0, 0) } }),
          text('<p>' + d + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 15, lh: 1.6 }, x: { _margin: dims(6, 0, 0, 0) } })
        ]))),
      aH2('Everyday tips for pelvic girdle pain', 'tips'),
      C({ flex_gap: gap(12), margin: dims(24, 0, 0, 0) }, [
        ['Try to', '#4F5945', 'Keep your knees together when getting in and out of the car or turning in bed · sleep with a pillow between your knees · take stairs one step at a time · rest when you need to · use ice or heat for comfort.'],
        ['Try to avoid', '#272B26', 'Standing on one leg (e.g. to put on trousers — sit down instead) · heavy lifting · carrying a toddler on one hip · wide-legged movements such as breaststroke kick.']
      ].map(([t, col, d]) => C({ padding: dims(22, 24, 22, 24), background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3) }, [
        heading(t, { tag: 'h3', color: col, t: { s: 19, w: 500, lh: 1.3 } }),
        text('<p>' + d + '</p>', { t: { s: 16, lh: 1.7 }, x: { _margin: dims(8, 0, 0, 0) } })]))),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'center', flex_gap: gap(20), margin: dims(40, 0, 0, 0),
        padding: dims(30, 32, 30, 32), padding_mobile: dims(26, 22, 26, 22), background_background: 'classic', background_color: '#272B26', border_radius: all(3) }, [
        C({ width: px(440), width_tablet: pct(100), css_classes: 'ex-shrink-w' }, [
          label('Pregnancy Osteopathy', '#E6E0D5'),
          heading('Struggling with pelvic pain? We can help — at any stage of pregnancy.', { tag: 'p', color: '#F5F2EA', t: { s: 22, lh: 1.35 }, x: { _margin: dims(8, 0, 0, 0) } })
        ]),
        button('Learn more', L.preg, { kind: 'olive', h: 50, fs: 15, pl: 22, pr: 22 })
      ]),
      aH2('Frequently asked questions', 'faqs'),
      acc,
      text('<p>This article is general information, not a substitute for advice from your midwife, GP or osteopath. Contact your midwife or maternity unit straight away if you have bleeding, reduced baby movements, severe headaches or sudden swelling.</p>',
        { color: 'rgba(39,43,38,0.76)', t: { s: 14, lh: 1.6 }, x: { _margin: dims(32, 0, 0, 0), _padding: dims(18, 20, 18, 20), _background_background: 'classic', _background_color: '#E6E0D5', _border_radius: all(3) } }),
      C({ flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(18), margin: dims(40, 0, 0, 0), padding: dims(28, 0, 0, 0), border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: '#B7AA99' }, [
        avatar(64, 26),
        C({ css_classes: 'ex-grow' }, [
          heading('Written by', { tag: 'span', color: '#4F5945', t: { f: IN, s: 12, w: 500, ls: 0.16, tt: 'uppercase', lh: 1.75 } }),
          heading('[Author name], [Role]', { tag: 'p', t: { s: 20, lh: 1.4 }, x: { _margin: dims(4, 0, 0, 0) } }),
          heading('<a href="' + L.hafi + '">View profile →</a>', { tag: 'span', t: { f: IN, s: 14, w: 500, lh: 1.75 } })
        ])
      ])
    ]);
    const REL = [['Pregnancy Osteopathy', L.preg], ['Pregnancy Massage', L.massage], ['Hip Pain', L.hip], ['Back Pain', L.back]];
    const right = C({ css_classes: 'ex-sticky ex-hide-1180', html_tag: 'aside' }, [
      C({ padding: dims(26, 24, 26, 24), background_background: 'classic', background_color: '#272B26', border_radius: all(3) }, [
        heading('Pelvic pain in pregnancy?', { tag: 'span', color: '#F5F2EA', t: { s: 21, ls: -0.015, lh: 1.25 } }),
        heading('Gentle, adapted treatment in Sutton Coldfield &amp; Lichfield.', { tag: 'span', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 14, lh: 1.75 }, x: { _margin: dims(8, 0, 0, 0) } }),
        button('Book an appointment', L.book, { kind: 'olive', h: 48, fs: 15, x: { align: 'justify', _margin: dims(18, 0, 0, 0) } }),
        button('0121 751 2440', 'tel:+441217512440', { kind: 'outline-light', bd: 'rgba(245,242,234,0.35)', h: 48, fs: 15, x: { align: 'justify', _margin: dims(10, 0, 0, 0) } })
      ]),
      C({ margin: dims(18, 0, 0, 0), padding: dims(22, 22, 22, 22), background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3) }, [
        label('Related'),
        C({ margin: dims(10, 0, 0, 0) }, REL.map(([t, h], i) => heading('<a href="' + h + '">' + t + '</a>', { tag: 'p', t: { f: IN, s: 15, lh: 1.6 },
          x: Object.assign({ _css_classes: 'ex-toc-link', _padding: dims(8, 0, 8, 0) }, i < REL.length - 1 ? { _border_border: 'solid', _border_width: dims(0, 0, 1, 0), _border_color: '#B7AA99' } : {}) })))
      ])
    ]);
    out.push(section({ pt: 72, pb: 100, ptm: 48, pbm: 64 }, [
      C(gridC('260px minmax(0,720px) 260px', { grid_columns_grid_tablet_extra: { unit: 'custom', size: '240px minmax(0,1fr)', sizes: [] }, grid_columns_grid_tablet: fr(1),
        grid_gaps: gaps(56), grid_gaps_tablet: gaps(40), grid_align_items: 'start', grid_justify_content: 'space-between', css_classes: 'ex-post-body' }), [left, art, right])
    ]));

    out.push(section({ pt: 96, pb: 96, ptm: 64, pbm: 64, x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(20) }, [
        h2('More from the blog', { t: { s: 40, lh: 1.1, ls: -0.025 } }),
        heading('<a href="' + L.blog + '">View all articles →</a>', { tag: 'span', t: { f: IN, s: 15, w: 500, lh: 1.75 } })
      ]),
      W('loop-grid', { template_id: String(P.BLOG.small), columns: '3', columns_tablet: '2', columns_mobile: '1', posts_per_page: 3, post_query_post_type: 'post',
        post_query_exclude: ['current_post'], column_gap: px(24), row_gap: px(24), _margin: dims(36, 0, 0, 0) })
    ]));
    out.push(section({ pt: 80, pb: 80, ptm: 56, pbm: 56, x: { _element_id: 'book', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#272B26' } }, [
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'center', flex_gap: gap(32) }, [
        C({ width: px(640), width_tablet: pct(100) }, [
          heading('Book Today', { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
          h2('Ready when you are', { t: { s: 44, lh: 1.08, ls: -0.025 }, o: { color: '#F5F2EA', x: { _margin: dims(14, 0, 0, 0) } } }),
          text('<p>No GP referral needed. Evening and Saturday appointments available.</p>', { color: 'rgba(245,242,234,0.8)', t: { s: 18, lh: 1.7 }, x: { _margin: dims(14, 0, 0, 0) } })
        ]),
        button('Book an appointment', L.book, { kind: 'olive', h: 64, fs: 18, icon: 'right', split: true, minw: 300, pl: 34, pr: 30 })
      ])
    ]));
    return out;
  };

  /* ---------------- NEW PATIENTS (/new-patients) ----------------
     Facts used here all come from the approved site: fees and lengths (Pricing), cancellation and payment (Pricing),
     first-appointment steps (treatment pages), clothing/chaperone (Birmingham FAQ), hours and addresses (footer/Contact). */
  P.newPatients = () => {
    const out = [];
    out.push(P.heroSide({ img: 'e7ccc65900e405cbfd5068742f9f19a8', x: 60, y: 40, minh: 600, crumb: 'New Patients', h1: 'New patients: what to expect at your first appointment',
      lead: 'Booking with Exhale for the first time? Here’s how your first visit works, how long it takes, what it costs and what to wear — so you can arrive knowing exactly what will happen.',
      buttons: [['Book an appointment', L.book, 280], ['Your first visit', '#first', 260]] }));

    const FACTS = [['First appointment', '45–60 minutes'], ['Initial consultation', '£75, including treatment'], ['GP referral', 'Not needed'], ['Appointments', 'Evenings &amp; Saturdays']];
    out.push(section({ pt: 0, pb: 0, ptm: 0, pbm: 0, x: { background_background: 'classic', background_color: '#4F5945' } }, [
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(0), css_classes: 'ex-strip' }), FACTS.map(([k, v]) =>
        C({ padding: dims(26, 24, 26, 0), border_border: 'solid', border_width: dims(0, 1, 0, 0), border_color: 'rgba(245,242,234,0.14)' }, [
          heading(k, { tag: 'span', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 12, ls: 0.16, tt: 'uppercase', lh: 1.35 } }),
          heading(v, { tag: 'span', color: '#F5F2EA', t: { s: 20, ls: -0.01, lh: 1.35 }, x: { _margin: dims(4, 0, 0, 0) } })
        ])))
    ]));

    /* Intro */
    out.push(section({ pt: 100, pb: 90, ptm: 64, pbm: 56 }, [
      C(gridC('minmax(0,1fr) minmax(0,1.2fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(72), grid_gaps_tablet: gaps(32), grid_align_items: 'start' }), [
        C({}, [eyebrow('Welcome to Exhale'), h2('Unhurried care from your very first visit', { t: { s: 44, lh: 1.1, ls: -0.025 }, o: { x: { _margin: dims(24, 0, 0, 0) } } })]),
        C({}, [
          para('Your first appointment is the most important one. It’s our chance to understand what’s going on, find out what’s driving the problem and agree a plan that fits your life — not to rush you through a standard treatment.', { t: { s: 19, lh: 1.75 } }),
          para('You can book with any of our osteopaths, our physiotherapist or our sports massage therapist, at our clinics in <a class="ex-underline-olive ex-w400" href="' + L.contact + '">Sutton Coldfield and Lichfield</a>. You don’t need a GP referral.', { mt: 20 })
        ])
      ])
    ]));

    /* First appointment steps */
    const STEPS = [['01', 'Your story', 'We take a full history — your symptoms, health, work, activity and what you want to get back to.'],
      ['02', 'Assessment', 'We look at how you move and test the structures involved to find what’s driving the problem.'],
      ['03', 'Diagnosis &amp; plan', 'We explain what we’ve found in plain language and agree a plan with clear goals and timescales.'],
      ['04', 'First treatment', 'Where it’s appropriate we start treatment the same day, and send you home with simple things to do.']];
    out.push(section({ pt: 100, pb: 108, ptm: 64, pbm: 64, x: { _element_id: 'first', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#4F5945' } }, [
      eyebrow('Your First Appointment', { light: true, pb: 18 }),
      h2('What happens at your first appointment', { t: { s: 48, lh: 1.08, ls: -0.03 }, o: { color: '#F5F2EA', x: Object.assign({ _margin: dims(28, 0, 0, 0) }, maxw(780)) } }),
      text('<p>Your first appointment lasts 45–60 minutes and includes treatment on the day wherever it’s appropriate. Nothing happens without your agreement — you can ask questions, ask for a chaperone, or ask us to stop at any time.</p>',
        { color: 'rgba(245,242,234,0.85)', t: { s: 18, lh: 1.7 }, x: Object.assign({ _margin: dims(20, 0, 0, 0) }, maxw(720)) }),
      C(grid(4, { grid_columns_grid_tablet_extra: fr(2), grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(48, 0, 0, 0) }), STEPS.map(([n, t, d]) =>
        C({ flex_gap: gap(14), padding: dims(30, 28, 32, 28), border_radius: all(3), background_background: 'classic', background_color: 'rgba(245,242,234,0.08)',
          border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.18)' }, [
          heading(n, { tag: 'span', color: '#E6E0D5', t: { s: 52, lh: 1, ls: -0.04 } }),
          heading(t, { tag: 'h3', color: '#F5F2EA', t: { s: 22, w: 500, ls: -0.015, lh: 1.25 } }),
          text('<p>' + d + '</p>', { color: 'rgba(245,242,234,0.85)', t: { s: 15, lh: 1.65 } })
        ])))
    ]));

    /* Before your visit */
    const BEFORE = [['calendar', 'Book online or by phone', 'Choose your practitioner and a time online, or call <a class="ex-underline-olive ex-w400" href="tel:+441217512440">0121 751 2440</a> and we’ll help you choose who to see.'],
      ['user', 'What to wear', 'Comfortable clothes you can move in, such as leggings or shorts and a vest top. You can always ask for a gown or a chaperone.'],
      ['pin', 'Finding us', 'Our Sutton Coldfield clinic is inside Sutton Hearing Care, 1 Sutton Oak Corner, B74 2DH. Our Lichfield practice is at 30 Rotten Row, WS13 6JB.'],
      ['card', 'Health insurance', 'Claiming through your insurer? Call reception with your policy and authorisation numbers before your first visit.']];
    out.push(section({ x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      eyebrow('Before You Arrive'),
      h2('Getting ready for your visit', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
      C(grid(2, { grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(36, 0, 0, 0) }), BEFORE.map(([ic, t, d]) =>
        C({ flex_direction: 'row', flex_align_items: 'flex-start', flex_gap: gap(16), padding: dims(26, 26, 28, 26), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
          circle(ic, 46, 20, { color: '#4F5945', box: { background_background: 'classic', background_color: '#E6E0D5' } }),
          C({ css_classes: 'ex-grow' }, [
            heading(t, { tag: 'h3', t: { s: 21, w: 500, ls: -0.015, lh: 1.3 } }),
            text('<p>' + d + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 15, lh: 1.65 }, x: { _margin: dims(8, 0, 0, 0) } })
          ])
        ])))
    ]));

    /* After your first visit */
    out.push(section({}, [
      C(gridC('minmax(0,1fr) minmax(0,1.2fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(72), grid_gaps_tablet: gaps(32), grid_align_items: 'start' }), [
        C({}, [eyebrow('Follow-up Appointments'), h2('After your first visit', { o: { x: { _margin: dims(24, 0, 0, 0) } } })]),
        C({}, [
          para('Follow-up appointments last 40–45 minutes and continue the plan we agreed together. Treatment is tailored to you and may combine hands-on techniques, exercise and practical advice for work, sport and home.', { t: { s: 18, lh: 1.8 } }),
          para('How many sessions you need depends on the problem. We’ll give you an honest estimate at your first visit — and tell you if you don’t need to come back.', { mt: 18 }),
          para('Explore <a class="ex-underline-olive ex-w400" href="' + L.osteo + '">osteopathy</a>, <a class="ex-underline-olive ex-w400" href="' + L.physio + '">physiotherapy</a> and <a class="ex-underline-olive ex-w400" href="' + L.massage + '">sports massage</a>, or read about the <a class="ex-underline-olive ex-w400" href="' + L.back + '">conditions we treat</a>.', { mt: 18 })
        ])
      ])
    ]));

    /* Fees and policies */
    const KNOW = [['pound', 'Fees', 'Initial consultation and treatment (45–60 mins) £75. Returning patient treatment (40–45 mins) £60.'],
      ['card', 'Paying', 'Payment is taken at the end of each appointment.'],
      ['clock', 'Cancellations', 'Please give us 24 hours’ notice. Late cancellations and missed appointments may be charged at 50% if we can’t fill the slot.'],
      ['check', 'No referral needed', 'You can book directly — no need to see your GP first. Some insurers do ask for a referral.']];
    out.push(section({ x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(24) }, [
        C({ css_classes: 'ex-shrink' }, [eyebrow('Good to Know'), h2('Fees and policies', { o: { x: { _margin: dims(24, 0, 0, 0) } } })]),
        button('See all fees', L.fees, { kind: 'outline', h: 52, fs: 15, pl: 24, pr: 24 })
      ]),
      C(grid(4, { grid_columns_grid_tablet_extra: fr(2), grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(36, 0, 0, 0) }), KNOW.map(([ic, t, d]) =>
        C({ flex_gap: gap(12), padding: dims(28, 26, 30, 26), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
          circle(ic, 46, 20, { color: '#4F5945', box: { background_background: 'classic', background_color: '#E6E0D5' } }),
          heading(t, { tag: 'h3', t: { s: 21, w: 500, ls: -0.015, lh: 1.3 } }),
          text('<p>' + d + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 15, lh: 1.65 } })
        ])))
    ]));

    /* Team */
    out.push(section({}, [
      eyebrow('Choose Your Practitioner'),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(24), margin: dims(24, 0, 0, 0) }, [
        h2('Who you could see', { o: { x: maxw(640) } }),
        text('<p>Read about each clinician before you book. Not sure who’s right for you? Call us and we’ll help you choose.</p>', { t: { s: 17, lh: 1.7 }, x: maxw(520) })
      ]),
      P.teamGrid()
    ]));

    /* FAQs */
    const FAQ = [['Do I need a GP referral?', 'No. You can book directly with us online or by phone. If you’re claiming through health insurance, check whether your insurer asks for a referral.'],
      ['How long is the first appointment?', 'Your initial consultation lasts 45–60 minutes and includes treatment on the day wherever it’s appropriate.'],
      ['How much does it cost?', 'An initial consultation and treatment is £75 and returning patient appointments are £60. See our fees page for physiotherapy, sports massage and other treatments.'],
      ['What should I wear?', 'Comfortable clothes you can move in, such as leggings or shorts and a vest top. You can always ask for a gown or a chaperone.'],
      ['Will I be treated at my first appointment?', 'Where it’s appropriate, yes — and only with your agreement. If we think another type of care or further investigation would be better, we’ll explain why.'],
      ['How many appointments will I need?', 'It depends on the problem. We’ll give you an honest estimate at your first visit and review your progress as we go.'],
      ['Can I claim on health insurance?', 'Call reception with your policy and authorisation numbers before your first visit and we’ll take care of the rest.'],
      ['What if I need to cancel?', 'Please give us 24 hours’ notice. Late cancellations and missed appointments may be charged at 50% if we can’t fill the slot.']];
    out.push(section({ x: { _element_id: 'faqs', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#E6E0D5' } }, [
      C(gridC('minmax(0,1fr) minmax(0,1.5fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(64), grid_gaps_tablet: gaps(40), grid_align_items: 'start' }), [
        C({}, [
          eyebrow('FAQs'),
          h2('New patient questions', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
          para('Anything else? Call <a class="ex-underline-olive ex-w400" href="tel:+441217512440">0121 751 2440</a> or email <a class="ex-underline-olive ex-w400 ex-break" href="mailto:info@exhaleosteopathy.co.uk">info@exhaleosteopathy.co.uk</a>.', { t: { s: 17, lh: 1.7 }, mt: 18 })
        ]),
        (() => { const a = faqAccordion(FAQ.map(([q, a]) => ({ q, a }))); a.settings.title_tag = 'h3';
          a.settings.custom_css = a.settings.custom_css.replace('background:#E6E0D5;color:#4F5945', 'background:#F5F2EA;color:#4F5945'); return a; })()
      ])
    ]));

    out.push(EX.HOME.logos());
    out.push(P.book({ img: 'e7ccc65900e405cbfd5068742f9f19a8', title: 'Book your first appointment', lead: 'No GP referral needed. Choose a practitioner and time online, or call us if you’d like to talk it through first.',
      cards: [['Book an Appointment', 'Pick a time online in under a minute.', L.book, 'olive'], ['Call 0121 751 2440', 'Not sure who to see? We’ll help you choose.', 'tel:+441217512440', 'outline']] }));
    return out;
  };

  EX.buildPage = async function (key) {
    const out = P[key]();
    await EX.clearPage();
    for (const m of out) await EX.insert(m);
    return out.length;
  };
})();
