/* Exhale Osteopathy — one-off pages (About, Pricing, Contact, Birmingham, Blog, blog posts).
   Shared section helpers first, then one builder per page: EX.buildPage(key). */
(function () {
  const { C, W, px, pct, dims, all, gap, section, heading, text, eyebrow, button, image, img, icon, IT, IN } = EX;
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
  P.label = label; P.para = para; P.maxw = maxw; P.stars = stars; P.tickRow = tickRow; P.link = link;

  // Inner-page hero: photo, multi-stop shade, breadcrumb, H1, lead + two buttons above a hairline
  P.hero = (o) => section({ pt: o.pt || 216, pb: 72, ptm: 160, pbm: 56, x: { min_height: px(o.minh || 760), flex_justify_content: 'flex-end',
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
        heading('[Patient name]', { tag: 'span', t: { f: IN, s: 14, w: 600, lh: 1.75 } })
      ])))
  ]);

  // Closing "Book Today" band
  P.book = (o) => section({ pt: o.pt || 100, pb: o.pb || 100, x: { _element_id: 'book', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#272B26', background_image: img(o.img),
    background_position: 'center center', background_size: 'cover', background_overlay_background: 'classic', background_overlay_color: '#272B26', background_overlay_opacity: { unit: 'px', size: o.op || 0.8, sizes: [] } } }, [
    C(grid(2, { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(48), grid_align_items: 'center' }), [
      C({}, [
        heading('Book Today', { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
        h2(o.title, { t: { s: 48, lh: 1.08, ls: -0.025 }, o: { color: '#F5F2EA', x: { _margin: dims(14, 0, 0, 0) } } }),
        text('<p>' + o.lead + '</p>', { color: 'rgba(245,242,234,0.8)', t: { s: 18, lh: 1.7 }, x: Object.assign({ _margin: dims(18, 0, 0, 0) }, maxw(520)) })
      ]),
      C({ flex_gap: gap(14) }, [
        EX.bookCard('Book an Appointment', 'Pick a time online in under a minute.', L.book, { background_background: 'classic', background_color: '#4F5945' }),
        EX.bookCard('Call 0121 751 2440', o.callSub || 'Speak to a real person on reception.', 'tel:+441217512440',
          { border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.35)', background_background: 'classic', background_color: 'rgba(39,43,38,0.4)' })
      ])
    ])
  ]);

  // Photo or grey placeholder in a fixed shape
  P.photo = (asset, alt, cls, o = {}) => asset ? image(asset, alt, { x: Object.assign({ _css_classes: cls, image_border_radius: all(3) }, o.x || {}) })
    : C(Object.assign({ css_classes: cls + '-box', background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3), flex_justify_content: 'flex-end', padding: all(14) }, o.box || {}),
      [heading(o.ph || '[Photo]', { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 12, lh: 1.4 } })]);

  // Team cards (About / Birmingham)
  const TEAM = [
    ['Hafi Rahman', 'Founder &amp; Principal Osteopath', L.hafi, 'f4513f27866f22682d9d1eafdcd00e9b'],
    ['Zoe Goodwin', 'Sports Massage Therapist', L.zoe, 'a1aa92c86185fbf90aea1ad6a47c85a3'],
    ['Freta Teklensenbet', 'Registered Osteopath', L.freta, '2b3650271a3bcca5534fca4186d2400c'],
    ['Ankita Desai', 'Registered Osteopath', L.ankita, 'f8984ae774fa815b4d817f0fe0266bba'],
    ['Emre Tosun', 'Physiotherapist &amp; Personal Trainer', L.emre, '']];
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
  P.CLINICS = {
    sutton: { name: 'Exhale Osteopathy', short: 'Sutton Coldfield', map: '1 Sutton Oak Corner, Streetly, Sutton Coldfield B74 2DH',
      addr: '1 Sutton Oak Corner, Streetly, Sutton Coldfield, B74 2DH · 0121 751 2440' },
    lichfield: { name: 'Lichfield Osteopathic Practice', short: 'Lichfield', map: '30 Rotten Row, Lichfield WS13 6JB',
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

  EX.buildPage = async function (key) {
    const out = P[key]();
    await EX.clearPage();
    for (const m of out) await EX.insert(m);
    return out.length;
  };
})();
