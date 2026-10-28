/* Lichfield Osteopathic Practice: one-off pages (Our Fees, Contact, Meet the Team), same templates as the
   Exhale one-off pages. Shared section helpers first, then one builder per page: EX.buildPage(key). */
(function () {
  const { C, W, px, em, pct, dims, all, gap, section, heading, text, eyebrow, button, image, img, icon, IT, IN } = EX;
  const { grid, gridC, fr, gaps, h2, circle, faqAccordion, esc } = EX.tx;
  const L = EX.L, SITE = EX.SITE;
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
      C({ flex_gap: gap(14) }, (o.cards || [['Book an Appointment', 'Choose your practitioner and a time online.', L.book, 'olive'],
        ['Call ' + SITE.phone, o.callSub || 'Speak to us before you book.', SITE.tel, 'outline']]).map(([t, sub, href, k]) =>
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

  // Team cards (Meet the Team)
  P.teamGrid = (o = {}) => C(grid(o.cols || EX.TEAM.length, { grid_columns_grid_tablet_extra: fr(3), grid_columns_grid_tablet: fr(3), grid_columns_grid_mobile: fr(2), grid_gaps: gaps(20), grid_gaps_mobile: gaps(16), margin: dims(40, 0, 0, 0) }),
    EX.TEAM.map(p => C({ html_tag: 'a', link: link(p.href) }, [
      P.photo(p.photo, p.name, 'ex-ratio-34', { x: { _css_classes: 'ex-ratio-34 ex-pos-top' } }),
      heading(p.name, { tag: 'h3', t: { s: 20, ls: -0.015, lh: 1.3 }, x: { _margin: dims(16, 0, 0, 0) } }),
      heading(p.role, { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 14, lh: 1.75 } }),
      heading('View Profile →', { tag: 'span', color: '#4F5945', t: { f: IN, s: 14, w: 500, lh: 1.75 }, x: { _margin: dims(8, 0, 0, 0) } })
    ])));

  /* ---------------- CONTACT ---------------- */
  const iconBtn = (lbl, href, ic) => button(lbl, href, { kind: 'ivory', h: 60, fs: 14, icon: ic, gapIcon: 0, pl: 18, pr: 18,
    x: { _css_classes: 'ex-icon-btn ex-round', button_text_color: '#4F5945', hover_color: '#4F5945', border_radius: all(50, '%'), text_padding: all(18) } });
  P.iconBtn = iconBtn;

  /* ---------------- OUR FEES (/pricing/) ---------------- */
  P.pricing = () => {
    const out = [];
    out.push(P.heroSide({ img: 'exterior', x: 55, y: 50, crumb: 'Our Fees', h1: 'Our fees',
      lead: 'Osteopathy and massage fees at Lichfield Osteopathic Practice. Book online, or call us if you have any questions.',
      buttons: [['Book an appointment', L.book], ['Call ' + SITE.phone, SITE.tel]] }));

    // Prices from the live /pricing/ page (28 Oct 2026)
    const CATS = [
      ['Osteopathy', L.osteo, 'Hands-on assessment and treatment from our registered osteopaths.', [
        ['Appointments', [['Initial consultation &amp; treatment', '', "For patients who haven't attended Lichfield Osteopathic Practice before.", '£75'],
          ['Follow-up appointment', '', 'A follow-up treatment session where we review your progress and continue with your treatment plan.', '£60']]]],
        'Not sure which to book? Call us on ' + SITE.phone + ' and we will help.'],
      ['Massage', L.massage, 'Sports, deep tissue or pregnancy massage, tailored to you.', [
        ['Sessions', [['Sports, deep tissue or pregnancy massage', '(60 mins)', 'Choice of massage tailored to you.', '£60'],
          ['Sports, deep tissue or pregnancy massage', '(90 mins)', 'Choice of massage tailored to you.', '£80']]]],
        'Massage can be booked on its own or alongside osteopathy.']];

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
                button('Book', L.book, { kind: 'outline', h: 44, fs: 14, pl: 18, pr: 18 })
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
        text("<p>Choose a treatment to see what's included.</p>", { t: { s: 17, lh: 1.7 }, x: maxw(460) })
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

    out.push(EX.HOME.logos());
    out.push(P.book({ title: 'Ready when you are. Book in minutes.', lead: 'Book online in a few clicks, or call ' + SITE.phone + ' if you would like a quick chat first.' }));
    return out;
  };

  /* ---------------- CONTACT (/contact/) ---------------- */
  P.contact = () => {
    const out = [];
    out.push(P.heroSide({ img: 'exterior', x: 55, y: 45, minh: 600, crumb: 'Contact', h1: 'Get in touch', shade: 'ex-hero-side',
      lead: 'Call, email or book online. We are a few minutes’ walk from Lichfield city centre.',
      buttons: [['Call ' + SITE.phone, SITE.tel, 280], ['Book online', L.book, 260]] }));

    const WAYS = [['phone', 'Call us', SITE.phone, SITE.tel], ['mail', 'Email us', SITE.email, 'mailto:' + SITE.email], ['calendar', 'Book online', 'Choose a time', L.book]];
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

    const h4 = (t) => heading(t, { tag: 'h4', color: '#4F5945', t: { f: IN, s: 12, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 } });
    const photo = C({ min_height: px(520), border_radius: all(3), background_background: 'classic', background_color: '#E6E0D5', background_image: img('exterior'),
      background_size: 'cover', background_position: 'center center' }, []);
    const details = C({}, [
      eyebrow('Our Location'),
      heading(SITE.name, { tag: 'h2', t: { s: 40, st: 34, sm: 30, lh: 1.1, ls: -0.025 }, x: { _margin: dims(24, 0, 0, 0) } }),
      para(SITE.addr, { t: { s: 18, lh: 1.6 }, mt: 12 }),
      C(grid(2, { grid_columns_grid_mobile: fr(1), grid_gaps: gaps(28, 32), margin: dims(32, 0, 0, 0), padding: dims(28, 0, 0, 0),
        border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: '#B7AA99' }), [
        C({}, [h4('Contact'), text('<p><a href="' + SITE.tel + '">' + SITE.phone + '</a></p><p class="ex-small">Established 1983</p><p><a href="mailto:' + SITE.email + '">' + SITE.email + '</a></p>',
          { t: { s: 16, lh: 1.75 }, x: { _margin: dims(12, 0, 0, 0), _css_classes: 'ex-list ex-gap-8 ex-dark-links ex-break' } })]),
        C({}, [h4('Opening Hours'), C({ flex_gap: gap(4), margin: dims(12, 0, 0, 0) }, SITE.hours.map(([d, t]) => C({ flex_direction: 'row', flex_justify_content: 'space-between', flex_gap: gap(16) }, [
          heading(d, { tag: 'span', color: 'rgba(39,43,38,0.84)', t: { f: IN, s: 15, lh: 1.75 } }), heading(t, { tag: 'span', t: { f: IN, s: 15, lh: 1.75 }, x: { _flex_size: 'none' } })])))]),
        C({}, [h4('Getting Here'), C({ flex_gap: gap(8), margin: dims(12, 0, 0, 0) }, ['Parking outside the clinic', 'On-street parking close by', 'Free parking at Tesco, a few minutes’ walk', 'A few minutes’ walk from Lichfield city centre'].map(g => C({ flex_direction: 'row', flex_align_items: 'flex-start', flex_gap: gap(10) }, [
          circle('tick', 20, 11, { color: '#4F5945', box: { background_background: 'classic', background_color: '#E6E0D5', margin: dims(3, 0, 0, 0) } }),
          text('<p>' + g + '</p>', { t: { s: 15, lh: 1.6 } })])))]),
        C({}, [h4('Treatments Here'), C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(8), margin: dims(12, 0, 0, 0) }, ['Osteopathy', 'Cranial Osteopathy', 'Paediatric Osteopathy', 'Physiotherapy', 'Acupuncture', 'Laser Therapy', 'Sports &amp; Deep Tissue Massage', 'Pregnancy Massage'].map(t =>
          heading(t, { tag: 'span', color: '#4F5945', t: { f: IN, s: 13, w: 500, lh: 1.5 }, x: { _element_width: 'auto', _padding: dims(6, 12, 6, 12), _border_radius: all(999),
            _background_background: 'classic', _background_color: '#E6E0D5' } })))])
      ]),
      C({ margin: dims(32, 0, 0, 0), border_radius: all(3), overflow: 'hidden', padding: all(0) }, [W('google_maps', { address: SITE.map, zoom: { unit: 'px', size: 15, sizes: [] }, height: px(220), _css_classes: 'ex-map' })]),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(12), margin: dims(24, 0, 0, 0) }, [
        button('Book an appointment', L.book, { kind: 'olive', h: 52, fs: 15, pl: 24, pr: 24 }),
        button('Get directions', L.dir, { kind: 'outline', h: 52, fs: 15, pl: 24, pr: 24, icon: 'arrowNE', gapIcon: 10 })
      ])
    ]);
    out.push(section({ pt: 100, pb: 90, ptm: 64, pbm: 64, x: { background_background: 'classic', background_color: '#F5F2EA' } }, [
      C(gridC('minmax(0,1.1fr) minmax(0,1fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(56, 56), grid_gaps_tablet: gaps(32), grid_align_items: 'stretch' }), [photo, details])
    ]));

    out.push(section({ pt: 80, pb: 80, ptm: 56, pbm: 56, x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'center', flex_gap: gap(32) }, [
        C({ width: px(680), width_tablet: pct(100) }, [
          label('Follow Us'),
          heading('Find us on Instagram and Facebook', { t: { s: 36, st: 32, sm: 28, lh: 1.15, ls: -0.02 }, x: { _margin: dims(12, 0, 0, 0) } })
        ]),
        C({ flex_direction: 'row', flex_gap: gap(12), css_classes: 'ex-fit' }, [
          iconBtn('Instagram', L.insta, 'instagram'),
          iconBtn('Facebook', L.fb, 'facebook')
        ])
      ])
    ]));

    out.push(section({ pt: 96, pb: 96, ptm: 64, pbm: 64, x: { _element_id: 'book', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#272B26' } }, [
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'center', flex_gap: gap(32) }, [
        C({ width: px(640), width_tablet: pct(100) }, [
          heading('Book Today', { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
          h2('Ready when you are', { t: { s: 48, lh: 1.08, ls: -0.025 }, o: { color: '#F5F2EA', x: { _margin: dims(14, 0, 0, 0) } } }),
          text('<p>Choose your practitioner and a time online.</p>', { color: 'rgba(245,242,234,0.8)', t: { s: 18, lh: 1.7 }, x: { _margin: dims(16, 0, 0, 0) } })
        ]),
        button('Book an appointment', L.book, { kind: 'olive', h: 64, fs: 18, icon: 'right', split: true, minw: 300, pl: 34, pr: 30, x: { _lop_cta: true } })
      ])
    ]));
    return out;
  };

  /* ---------------- MEET THE TEAM (/meet-the-team/) ---------------- */
  P.team = () => {
    const out = [];
    out.push(P.heroSide({ img: 'osteo-freta', x: 60, y: 35, crumb: 'Meet the Team', h1: 'Meet our experienced team',
      lead: 'Get to know our osteopaths, physiotherapist and massage therapist, and see which days each of us is in clinic.',
      buttons: [['Book an appointment', L.book], ['Our fees', L.fees]] }));
    out.push(section({ x: { _element_id: 'team', css_classes: 'ex-anchor' } }, [
      eyebrow('Our Team'),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(24), margin: dims(24, 0, 0, 0) }, [
        h2('Get to know our osteopaths', { o: { x: maxw(640) } }),
        text('<p>Our dedicated team covers a broad spectrum of osteopathic skills, including classical, cranial and paediatric osteopathy, sports injuries and functional medicine.</p>', { t: { s: 17, lh: 1.7 }, x: maxw(520) })
      ]),
      P.teamGrid()
    ]));

    // Who is in on which day
    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    out.push(section({ x: { _element_id: 'rota', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#E6E0D5' } }, [
      eyebrow('Who Is In When'),
      h2('Our week at Lichfield', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
      C(grid(3, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(36, 0, 0, 0) }), DAYS.map(d =>
        C({ background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3), padding: dims(24, 24, 26, 24), flex_gap: gap(8) }, [
          heading(d, { tag: 'h3', t: { s: 22, ls: -0.015, lh: 1.3 } }),
          ...EX.TEAM.flatMap(p => p.times.filter(([td]) => td === d).map(([, t]) => C({ flex_direction: 'row', flex_justify_content: 'space-between', flex_gap: gap(12),
            padding: dims(8, 0, 0, 0), border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: '#B7AA99' }, [
            heading('<a href="' + p.href + '">' + p.name + '</a>', { tag: 'span', t: { f: IN, s: 15, w: 500, lh: 1.6 } }),
            heading(t, { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 15, lh: 1.6 }, x: { _flex_size: 'none' } })
          ])))
        ]))),
      text('<p>Opening hours: ' + SITE.hoursLine + '. Sunday closed.</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 15, lh: 1.7 }, x: { _margin: dims(24, 0, 0, 0) } })
    ]));
    out.push(EX.HOME.logos());
    out.push(P.book({ title: 'Book your appointment', lead: 'Choose your practitioner and a time online, or call ' + SITE.phone + '.' }));
    return out;
  };

  /* ---------------- ABOUT (/about/) ----------------
     Same sections as the Exhale About page, filled only with facts from the live Lichfield site. */
  P.about = () => {
    const out = [];
    out.push(P.hero({ img: 'exterior', y: 45, crumb: 'About', h1: 'Caring for Lichfield since 1983',
      lead: 'Lichfield Osteopathic Practice is a busy clinic a few minutes’ walk from the city centre, offering a truly holistic approach to health.',
      buttons: [['Book an appointment', L.book, 260], ['Meet the team', '#team', 240]] }));

    out.push(section({ pt: 110, pb: 90, ptm: 64, pbm: 64 }, [
      C(gridC('minmax(0,1fr) minmax(0,1.2fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(72, 72), grid_gaps_tablet: gaps(40), grid_align_items: 'start' }), [
        C({}, [eyebrow('Our Practice'), h2('Osteopathy for all the family', { t: { s: 48, lh: 1.08, ls: -0.03 }, o: { x: { _margin: dims(24, 0, 0, 0) } } })]),
        C({}, [
          para('Lichfield Osteopathic Practice was established in 1983. Today it is a busy clinic of four registered osteopaths, alongside a physiotherapist and a sports massage therapist.', { t: { s: 19, lh: 1.75 } }),
          para('Our dedicated team covers a broad spectrum of osteopathic skills, including classical, cranial and paediatric osteopathy, sports injuries and functional medicine. Osteopathy is suitable for all ages, from birth to seniority.', { mt: 20 }),
          para('We look forward to helping you on your pathway to health.', { mt: 20 })
        ])
      ]),
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(2), grid_gaps: gaps(0), margin: dims(72, 0, 0, 0), margin_mobile: dims(48, 0, 0, 0),
        border_border: 'solid', border_width: dims(1, 0, 1, 0), border_color: '#B7AA99' }), [
        ['1983', 'Practice established'], ['4', 'Registered osteopaths'], ['6', 'Days a week open'], ['6', 'Practitioners']
      ].map(([v, k]) => C({ padding: dims(32, 24, 30, 0), flex_gap: gap(4) }, [
        heading(v, { tag: 'span', t: { s: 56, sm: 44, lh: 1, ls: -0.04 } }),
        heading(k, { tag: 'span', color: 'rgba(39,43,38,0.84)', t: { f: IN, s: 15, lh: 1.75 } })
      ])))
    ]));

    const FEAT = [['parking', 'Parking outside', 'There is parking outside the clinic, and on-street parking a few minutes’ walk away.'], ['car', 'Free parking nearby', 'Free parking at Tesco, a few minutes’ walk away.'],
      ['home', 'Near the city centre', 'A few minutes’ walk from Lichfield city centre.'], ['clock', 'Open 6 days a week', SITE.hoursLine + '.']];
    out.push(section({ x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      C(gridC('minmax(0,1.1fr) minmax(0,1fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(72), grid_gaps_tablet: gaps(40), grid_align_items: 'center' }), [
        C({}, [
          eyebrow('The Clinic'),
          h2('30 Rotten Row, Lichfield', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
          para('Find us a few minutes’ walk from Lichfield city centre, with parking right outside.', { mt: 20 }),
          C(grid(2, { grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(32, 0, 0, 0) }), FEAT.map(([ic, t, d]) =>
            C({ flex_direction: 'row', flex_align_items: 'flex-start', flex_gap: gap(14), padding: dims(22, 22, 24, 22), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
              circle(ic, 40, 18, { color: '#4F5945', box: { background_background: 'classic', background_color: '#E6E0D5' } }),
              C({ css_classes: 'ex-grow' }, [
                heading(t, { tag: 'span', t: { s: 18, lh: 1.4 } }),
                text('<p>' + d + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 14, lh: 1.55 }, x: { _margin: dims(2, 0, 0, 0) } })
              ])
            ])))
        ]),
        image('exterior', 'Lichfield Osteopathic Practice, 30 Rotten Row', { x: { _css_classes: 'ex-ratio-45', image_border_radius: all(3) } })
      ])
    ]));

    out.push(section({ x: { _element_id: 'team', css_classes: 'ex-anchor' } }, [
      eyebrow('Our Team'),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(24), margin: dims(24, 0, 0, 0) }, [
        h2('Meet the team', { o: { x: maxw(640) } }),
        text('<p>Get to know our osteopaths, physiotherapist and massage therapist before you book.</p>', { t: { s: 17, lh: 1.7 }, x: maxw(520) })
      ]),
      P.teamGrid()
    ]));

    out.push(section({}, [
      C(grid(2, { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(20) }), [
        C({ background_background: 'classic', background_color: '#272B26', border_radius: all(3), padding: dims(40, 40, 44, 40), padding_mobile: dims(30, 24, 32, 24) }, [
          label('Opening Hours', '#E6E0D5'),
          heading('Open six days a week', { color: '#F5F2EA', t: { s: 34, st: 32, sm: 28, lh: 1.15, ls: -0.02 }, x: { _margin: dims(12, 0, 0, 0) } }),
          C({ margin: dims(26, 0, 0, 0) }, SITE.hours.map(([d, t]) => C({ flex_direction: 'row', flex_justify_content: 'space-between', flex_gap: gap(20), padding: dims(12, 0, 12, 0),
            border_border: 'solid', border_width: dims(0, 0, 1, 0), border_color: 'rgba(245,242,234,0.12)' }, [
            heading(d, { tag: 'span', color: 'rgba(245,242,234,0.85)', t: { f: IN, s: 16, lh: 1.75 } }),
            heading(t, { tag: 'span', color: '#F5F2EA', t: { s: 16, lh: 1.75 }, x: { _flex_size: 'none' } })
          ]))),
          text('<p>Can\'t find a time? Call <a class="ex-underline" href="' + SITE.tel + '">' + SITE.phone + '</a>.</p>',
            { color: 'rgba(245,242,234,0.88)', t: { s: 15, lh: 1.75 }, x: { _margin: dims(18, 0, 0, 0), _css_classes: 'ex-on-dark' } })
        ]),
        C({ background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3), padding: dims(40, 40, 44, 40), padding_mobile: dims(30, 24, 32, 24) }, [
          label('Booking'),
          heading('Book online or give us a call', { t: { s: 34, st: 32, sm: 28, lh: 1.15, ls: -0.02 }, x: { _margin: dims(12, 0, 0, 0) } }),
          para('Choose your practitioner and a time online. If you would like a quick chat before booking, call us on ' + SITE.phone + '.', { t: { s: 17, lh: 1.75 }, mt: 18 }),
          C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(12), padding: dims(28, 0, 0, 0), css_classes: 'ex-push-bottom' }, [
            button('See our prices', L.fees, { kind: 'olive', h: 50, fs: 15, pl: 24, pr: 24 }),
            button('New patients', L.newp, { kind: 'outline', h: 50, fs: 15, pl: 24, pr: 24 })
          ])
        ])
      ])
    ]));

    const GAL = [['osteo-freta', 'Freta assessing a patient’s shoulder'], ['massage-zoe', 'Zoe giving a sports massage'], ['acupuncture', 'Acupuncture treatment'], ['cranial-baby', 'Gentle cranial osteopathy for a baby']];
    out.push(section({ pt: 0, pb: 100, ptm: 0, pbm: 64, x: {} }, [
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(2), grid_gaps: gaps(14) }), GAL.map(([a, alt], i) =>
        image(a, alt, { x: Object.assign({ _css_classes: 'ex-ratio-34', image_border_radius: all(3) }, i % 2 ? { _margin: dims(40, 0, 0, 0) } : {}) })))
    ]));

    out.push(EX.HOME.logos());
    out.push(P.book({ img: 'exterior', title: 'Book your first appointment', lead: 'No GP referral needed. Book online, or call ' + SITE.phone + ' if you would like a quick chat first.' }));
    return out;
  };

  /* ---------------- NEW PATIENTS (/new-patients/) ----------------
     Same sections as the Exhale New Patients page. Facts come from the live Lichfield site (first-appointment FAQs,
     fees, hours, address, parking); Exhale-only details (appointment lengths, payment and cancellation terms, insurers) are left out. */
  P.newPatients = () => {
    const out = [];
    out.push(P.heroSide({ img: 'osteo-freta', x: 60, y: 35, minh: 600, crumb: 'New Patients', h1: 'New patients: what to expect at your first appointment',
      lead: 'Coming to Lichfield Osteopathic Practice for the first time? Here’s how your first visit works and what it costs.',
      buttons: [['Book an appointment', L.book, 280], ['Your first visit', '#first', 260]] }));

    const FACTS = [['Initial consultation', '£75, including treatment'], ['Follow-up', '£60'], ['GP referral', 'Not needed'], ['Open', '6 days a week']];
    out.push(section({ pt: 0, pb: 0, ptm: 0, pbm: 0, x: { background_background: 'classic', background_color: '#4F5945' } }, [
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(0), css_classes: 'ex-strip' }), FACTS.map(([k, v]) =>
        C({ padding: dims(26, 24, 26, 0), border_border: 'solid', border_width: dims(0, 1, 0, 0), border_color: 'rgba(245,242,234,0.14)' }, [
          heading(k, { tag: 'span', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 12, ls: 0.16, tt: 'uppercase', lh: 1.35 } }),
          heading(v, { tag: 'span', color: '#F5F2EA', t: { s: 20, ls: -0.01, lh: 1.35 }, x: { _margin: dims(4, 0, 0, 0) } })
        ])))
    ]));

    out.push(section({ pt: 100, pb: 90, ptm: 64, pbm: 56 }, [
      C(gridC('minmax(0,1fr) minmax(0,1.2fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(72), grid_gaps_tablet: gaps(32), grid_align_items: 'start' }), [
        C({}, [eyebrow('Welcome'), h2('Calm, thorough care from your very first visit', { t: { s: 44, lh: 1.1, ls: -0.025 }, o: { x: { _margin: dims(24, 0, 0, 0) } } })]),
        C({}, [
          para('We welcome patients of all ages from Lichfield and the surrounding areas, offering calm, thorough care in a supportive clinical setting.', { t: { s: 19, lh: 1.75 } }),
          para('You can book with any of our osteopaths, our physiotherapist or our sports massage therapist at <a class="ex-underline-olive ex-w400" href="' + L.contact + '">30 Rotten Row, Lichfield</a>. You don’t need a GP referral.', { mt: 20 })
        ])
      ])
    ]));

    const STEPS = [['01', 'Your case history', 'Your initial consultation starts with a detailed case history.'],
      ['02', 'Examination', 'Careful observation and examination, using palpation (feel through touch) to find areas of restriction, strain and weakness.'],
      ['03', 'Diagnosis &amp; plan', 'We explain the diagnosis. By the second treatment your osteopath can usually tell you how many treatments are likely to be needed.'],
      ['04', 'After treatment', 'You may feel a little sore or achy for up to 48 hours. Most people usually start feeling better after this.']];
    out.push(section({ pt: 100, pb: 108, ptm: 64, pbm: 64, x: { _element_id: 'first', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#4F5945' } }, [
      eyebrow('Your First Appointment', { light: true, pb: 18 }),
      h2('What happens at your first appointment', { t: { s: 48, lh: 1.08, ls: -0.03 }, o: { color: '#F5F2EA', x: Object.assign({ _margin: dims(28, 0, 0, 0) }, maxw(780)) } }),
      text('<p>Your initial consultation includes treatment, and the aim is to keep your appointments to a minimum.</p>',
        { color: 'rgba(245,242,234,0.85)', t: { s: 18, lh: 1.7 }, x: Object.assign({ _margin: dims(20, 0, 0, 0) }, maxw(720)) }),
      C(grid(4, { grid_columns_grid_tablet_extra: fr(2), grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(48, 0, 0, 0) }), STEPS.map(([n, t, d]) =>
        C({ flex_gap: gap(14), padding: dims(30, 28, 32, 28), border_radius: all(3), background_background: 'classic', background_color: 'rgba(245,242,234,0.08)',
          border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.18)' }, [
          heading(n, { tag: 'span', color: '#E6E0D5', t: { s: 52, lh: 1, ls: -0.04 } }),
          heading(t, { tag: 'h3', color: '#F5F2EA', t: { s: 22, w: 500, ls: -0.015, lh: 1.25 } }),
          text('<p>' + d + '</p>', { color: 'rgba(245,242,234,0.85)', t: { s: 15, lh: 1.65 } })
        ])))
    ]));

    const BEFORE = [['calendar', 'Book online or by phone', 'Choose your practitioner and a time online, or call <a class="ex-underline-olive ex-w400" href="' + SITE.tel + '">' + SITE.phone + '</a> for a quick chat first.'],
      ['user', 'What to wear', 'Comfortable clothes you can move in.'],
      ['pin', 'Finding us', SITE.addr + '. A few minutes’ walk from the city centre.'],
      ['parking', 'Parking', 'Parking outside the clinic, on-street parking close by, and free parking at Tesco a few minutes’ walk away.']];
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

    out.push(section({}, [
      C(gridC('minmax(0,1fr) minmax(0,1.2fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(72), grid_gaps_tablet: gaps(32), grid_align_items: 'start' }), [
        C({}, [eyebrow('Follow-up Appointments'), h2('After your first visit', { o: { x: { _margin: dims(24, 0, 0, 0) } } })]),
        C({}, [
          para('A follow-up treatment session reviews your progress and continues with your treatment plan.', { t: { s: 18, lh: 1.8 } }),
          para('The number of sessions you need depends on the condition and the person we are treating. Your osteopath will usually be able to tell you by the second treatment how many treatments are likely to be required.', { mt: 18 }),
          para('Explore <a class="ex-underline-olive ex-w400" href="' + L.osteo + '">osteopathy</a>, <a class="ex-underline-olive ex-w400" href="' + L.physio + '">physiotherapy</a> and <a class="ex-underline-olive ex-w400" href="' + L.massage + '">sports massage</a>, or read about the <a class="ex-underline-olive ex-w400" href="' + L.back + '">conditions we treat</a>.', { mt: 18 })
        ])
      ])
    ]));

    const KNOW = [['pound', 'Osteopathy fees', 'Initial consultation and treatment £75. Follow-up appointment £60.'],
      ['pound', 'Massage fees', 'Sports, deep tissue or pregnancy massage: 60 minutes £60, 90 minutes £80.'],
      ['check', 'No referral needed', 'You can book directly, with no need to see your GP first.'],
      ['clock', 'Opening hours', SITE.hoursLine + '. Sunday closed.']];
    out.push(section({ x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(24) }, [
        C({ css_classes: 'ex-shrink' }, [eyebrow('Good to Know'), h2('Fees and opening hours', { o: { x: { _margin: dims(24, 0, 0, 0) } } })]),
        button('See all fees', L.fees, { kind: 'outline', h: 52, fs: 15, pl: 24, pr: 24 })
      ]),
      C(grid(4, { grid_columns_grid_tablet_extra: fr(2), grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(36, 0, 0, 0) }), KNOW.map(([ic, t, d]) =>
        C({ flex_gap: gap(12), padding: dims(28, 26, 30, 26), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
          circle(ic, 46, 20, { color: '#4F5945', box: { background_background: 'classic', background_color: '#E6E0D5' } }),
          heading(t, { tag: 'h3', t: { s: 21, w: 500, ls: -0.015, lh: 1.3 } }),
          text('<p>' + d + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 15, lh: 1.65 } })
        ])))
    ]));

    out.push(section({}, [
      eyebrow('Choose Your Practitioner'),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(24), margin: dims(24, 0, 0, 0) }, [
        h2('Who you could see', { o: { x: maxw(640) } }),
        text('<p>Read about each clinician before you book. Not sure who’s right for you? Call us and we’ll help you choose.</p>', { t: { s: 17, lh: 1.7 }, x: maxw(520) })
      ]),
      P.teamGrid()
    ]));

    const FAQ = [['Do I need a GP referral?', 'No. You can book directly with us online or by phone.'],
      ['How much does it cost?', 'An initial consultation and treatment is £75 and a follow-up appointment is £60. Massage is £60 for 60 minutes or £80 for 90 minutes.'],
      ['What can I expect at my first session?', 'Your initial consultation will include a detailed case history, as well as careful observation and examination using palpation (feel through touch) to find areas of restriction, strain and weakness in the body.'],
      ['How many sessions will I need?', 'It depends on the condition and the person we are treating. The aim is to keep your appointments to a minimum, and your osteopath will usually be able to tell you by the second treatment how many are likely to be needed.'],
      ['How will I feel after a treatment?', 'You may feel a little sore or achy for up to 48 hours after a treatment. Most people usually start feeling better after this.'],
      ['Is osteopathy suitable for children?', 'Yes. Osteopathy is suitable for all ages, from birth to seniority, and we offer gentle osteopathy for babies and children.']];
    out.push(section({ x: { _element_id: 'faqs', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#E6E0D5' } }, [
      C(gridC('minmax(0,1fr) minmax(0,1.5fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(64), grid_gaps_tablet: gaps(40), grid_align_items: 'start' }), [
        C({}, [
          eyebrow('FAQs'),
          h2('New patient questions', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
          para('Anything else? Call <a class="ex-underline-olive ex-w400" href="' + SITE.tel + '">' + SITE.phone + '</a> or email <a class="ex-underline-olive ex-w400 ex-break" href="mailto:' + SITE.email + '">' + SITE.email + '</a>.', { t: { s: 17, lh: 1.7 }, mt: 18 })
        ]),
        (() => { const a = faqAccordion(FAQ.map(([q, a]) => ({ q, a }))); a.settings.title_tag = 'h3';
          a.settings.custom_css = a.settings.custom_css.replace('background:#E6E0D5;color:#4F5945', 'background:#F5F2EA;color:#4F5945'); return a; })()
      ])
    ]));

    out.push(EX.HOME.logos());
    out.push(P.book({ img: 'osteo-freta', title: 'Book your first appointment', lead: 'No GP referral needed. Choose a practitioner and time online, or call us if you’d like to talk it through first.' }));
    return out;
  };

  EX.buildPage = async function (key) {
    const out = P[key]();
    await EX.clearPage();
    for (const m of out) await EX.insert(m);
    return out.length;
  };
})();
