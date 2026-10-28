/* Lichfield Osteopathic Practice: homepage. Same sections and styling as the Exhale homepage
   (build/home.js on main), with Lichfield content taken from the live lichfield-osteopaths.co.uk.
   Needs lib.js and site.js. */
(function () {
  const { C, W, px, em, pct, dims, all, gap, section, heading, text, eyebrow, button, image, img, icon, IT, IN } = EX;
  const L = EX.L, SITE = EX.SITE;

  const tones = ['#7D7868', '#7B826C', '#8C8471', '#4F5945', '#857C69'];
  const grid = (cols, s = {}) => Object.assign({ container_type: 'grid', grid_columns_grid: { unit: 'fr', size: cols, sizes: [] },
    grid_rows_grid: { unit: 'custom', size: 'auto', sizes: [] } }, s);
  const gaps = (r, c = r) => ({ unit: 'px', column: String(c), row: String(r), isLinked: r === c });

  // Photo card used by the treatment and Who We Help carousels
  const card = (name, href, assetId, tone) => C({
    html_tag: 'a', link: { url: href, is_external: '', nofollow: '' },
    css_classes: 'ex-shade ex-card', flex_justify_content: 'space-between',
    background_background: 'classic', background_color: tone,
    background_image: assetId ? img(assetId) : { url: '', id: '' }, background_size: 'cover', background_position: 'center center',
    border_radius: all(3), padding: dims(40, 40, 42, 40), padding_mobile: dims(30, 28, 30, 28)
  }, [
    heading(name, { tag: 'p', color: '#F5F2EA', t: { s: 25, lh: 1.2, ls: -0.02 } }),
    C({ flex_direction: 'row', flex_justify_content: 'space-between', flex_align_items: 'center', flex_gap: gap(12) }, [
      heading('Learn More', { tag: 'span', color: '#F5F2EA', t: { f: IN, s: 20, lh: 1.4 } }),
      W('icon', { selected_icon: icon('right'), view: 'stacked', shape: 'square', primary_color: '#F5F2EA', secondary_color: '#272B26', size: px(22), icon_padding: px(21), border_radius: all(3) })
    ])
  ]);
  EX.card = card;

  const carousel = (cards, o = {}) => W('nested-carousel', Object.assign({
    carousel_items: cards.map((c) => ({ _id: EX.rid(), slide_title: c.title })),
    slides_to_show: o.show || '4', slides_to_show_tablet: '2', slides_to_show_mobile: '1', slides_to_scroll: '1',
    offset_sides: 'right', offset_width: px(0), offset_width_tablet: px(150), offset_width_mobile: px(70),
    image_spacing_custom: px(14), image_spacing_custom_tablet: px(12), image_spacing_custom_mobile: px(12),
    arrows: 'yes', pagination: '', autoplay: '', loop: '',
    navigation_previous_icon: icon('left'), navigation_next_icon: icon('right'),
    arrows_size: px(24), arrow_normal_color: o.arrowFg || '#F5F2EA', arrow_hover_color: o.arrowFg || '#F5F2EA',
    arrows_normal_background_background: 'classic', arrows_normal_background_color: o.arrowBg || '#4F5945',
    arrows_hover_background_background: 'classic', arrows_hover_background_color: o.arrowHover || '#272B26',
    arrows_border_radius: all(3), arrows_padding: all(19),
    _css_classes: 'ex-carousel'
  }, o.x || {}), cards.map(c => c.el));
  const slides = (list) => list.map(([title, href, asset], i) => ({ title, el: C({ padding: all(0) }, [card(title, href, asset, tones[i % 5])]) }));
  EX.carousel = carousel; EX.slides = slides;

  const S = {};

  /* 1. HERO */
  S.hero = () => section({ pt: 216, pb: 56, ptm: 216, pbm: 56, x: {
    _element_id: 'top', min_height: px(880), flex_justify_content: 'flex-end',
    background_background: 'classic', background_color: '#272B26', background_image: img('hero'),
    background_position: 'initial', background_xpos: pct(45), background_ypos: pct(40), background_size: 'cover',
    css_classes: 'ex-hero-shade' } }, [
    heading('Osteopathy &amp; Massage · Lichfield · Established 1983', { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
    heading('Expert Osteopathic Treatment &amp; Sports Massage in Lichfield', { tag: 'h1', color: '#F5F2EA', t: { s: 60, st: 40, sm: 36, lh: 1.05, lhm: 1.08, ls: -0.03 },
      x: { _element_width: 'initial', _element_custom_width: px(900), _element_custom_width_tablet: pct(100), _margin: dims(18, 0, 0, 0) } }),
    C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(32),
      margin: dims(36, 0, 0, 0), padding: dims(36, 0, 0, 0), border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: 'rgba(245,242,234,0.22)' }, [
      C({ width: px(880), width_tablet: pct(100) }, [
        text('<p>Welcome to Lichfield Osteopathic Practice, established in 1983. Our registered osteopaths and massage therapists offer a truly holistic approach to health, for all ages from birth to seniority.</p>',
          { color: 'rgba(245,242,234,0.9)', t: { s: 20, lh: 1.65 } }),
        C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(14), margin: dims(32, 0, 0, 0) }, [
          button('Book an appointment', L.book, { kind: 'ivory', h: 64, fs: 18, icon: 'right', split: true, pl: 36, pr: 30 }),
          button('Meet the team', L.team, { kind: 'outline-light', h: 64, fs: 18, icon: 'right', split: true, pl: 36, pr: 30 })
        ])
      ]),
      C({ css_classes: 'ex-fit', flex_align_items: 'flex-end', flex_gap: gap(10) }, [
        heading('Open 6 days a week', { tag: 'p', color: 'rgba(245,242,234,0.9)', t: { f: IN, s: 12, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 }, x: { align: 'right' } }),
        C({ flex_direction: 'row', flex_gap: gap(0) }, ['freta', 'emma', 'zoe', 'hafi']
          .map((a, i) => image(a, '', { x: { width: px(54), height: px(54), 'object-fit': 'cover', 'object-position': 'center top',
            image_border_border: 'solid', image_border_width: all(3), image_border_color: '#F5F2EA', image_border_radius: all(50, '%'),
            _margin: dims(0, 0, 0, i ? -12 : 0) } })))
      ])
    ])
  ]);

  /* 2. ABOUT + WHAT WE OFFER */
  S.about = () => section({ pt: 100, pb: 40, ptm: 64, pbm: 40, x: { _element_id: 'about', overflow: 'hidden' } }, [
    C(grid(2, { grid_columns_grid_tablet: { unit: 'fr', size: 1, sizes: [] }, grid_gaps: gaps(64), grid_align_items: 'center' }), [
      C({}, [
        eyebrow('Welcome to Our Clinic'),
        heading('A busy Lichfield clinic, caring for patients since 1983', { t: { s: 44, st: 30, sm: 28, lh: 1.1, lhm: 1.15, ls: -0.025 }, x: { _margin: dims(24, 0, 0, 0) } }),
        text('<p>Lichfield Osteopathic Practice is a clinic of four registered osteopaths, a physiotherapist and a sports massage therapist. Our dedicated team covers a broad spectrum of osteopathic skills, including classical, cranial and paediatric osteopathy, sports injuries and functional medicine. We look forward to helping you on your pathway to health.</p>',
          { t: { s: 18, lh: 1.75 }, x: { _margin: dims(24, 0, 0, 0), _element_width: 'initial', _element_custom_width: px(600), _element_custom_width_tablet: pct(100) } }),
        C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(12), margin: dims(32, 0, 0, 0) }, [
          button('Meet the Team', L.team, { kind: 'olive' }),
          button('Our Fees', L.fees, { kind: 'outline' })
        ])
      ]),
      C(grid(3, { grid_columns_grid_mobile: { unit: 'fr', size: 3, sizes: [] }, grid_gaps: gaps(14) }), [
        image('osteo-freta', "Freta assessing a patient's shoulder", { x: { _css_classes: 'ex-ratio-34', image_border_radius: all(3), _margin: dims(48, 0, 0, 0) } }),
        image('freta', 'Freta Teklesenbet at Lichfield Osteopathic Practice', { x: { _css_classes: 'ex-ratio-34 ex-pos-top', image_border_radius: all(3) } }),
        image('massage-zoe', 'Zoe giving a sports massage', { x: { _css_classes: 'ex-ratio-34', image_border_radius: all(3), _margin: dims(24, 0, 0, 0) } })
      ])
    ]),
    C({ flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(40), margin: dims(80, 0, 0, 0), padding: dims(22, 0, 22, 0), overflow: 'hidden',
      border_border: 'solid', border_width: dims(1, 0, 1, 0), border_color: '#B7AA99' }, [
      heading('What We Offer', { tag: 'p', color: '#4F5945', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.4 }, x: { _flex_size: 'none' } }),
      C({ css_classes: 'ex-marquee', flex_direction: 'row' }, [
        text('<p>' + [0, 1].map(() => ['Classical Osteopathy', 'Cranial Osteopathy', 'Paediatric Osteopathy', 'Physiotherapy', 'Acupuncture', 'Laser Therapy', 'Sports &amp; Deep Tissue Massage', 'Pregnancy Massage']
          .map(v => '<span>' + v + '</span><span style="color:#B7AA99">✦</span>').join('')).join('') + '</p>',
          { t: { f: IT, s: 24, ls: -0.015, lh: 1.4 }, x: { _css_classes: 'ex-marquee-track' } })
      ])
    ])
  ]);

  /* 3. TREATMENTS: tabs with a carousel in each (as on Exhale) */
  const OSTEO = [['Osteopathy', L.osteo, 'osteo-arm'], ['Cranial &amp; Baby Osteopathy', L.babies, 'cranial-baby'],
    ['Sports &amp; Deep Tissue Massage', L.massage, 'massage-stock'], ['Acupuncture', L.acu, 'acupuncture']];
  const RECOV = [['Physiotherapy', L.physio, 'emre'], ['Laser Therapy', L.laser, 'laser'], ['Sports Massage', L.massage, 'massage-zoe']];
  const tabsCss = 'selector .e-n-tabs-heading{border-bottom:1px solid #B7AA99;gap:0}\nselector .e-n-tab-title{padding:18px 48px 20px;margin-bottom:-1px;border:0;border-bottom:2px solid transparent;background:transparent}\nselector .e-n-tab-title[aria-selected="true"]{border-bottom-color:#4F5945}\nselector .e-n-tabs-content > .e-con{padding:0;border:0}\n@media(max-width:560px){selector .e-n-tab-title{padding:14px 12px;letter-spacing:.08em}}';
  S.services = () => section({ pt: 80, pb: 100, ptm: 64, pbm: 64, x: { _element_id: 'services', overflow: 'hidden', position: 'relative' } }, [
    heading('Hands-on treatment, from first twinge to full recovery.', { t: { s: 34, st: 30, sm: 28, lh: 1.15, ls: -0.02 },
      x: { _element_width: 'initial', _element_custom_width: px(520), _element_custom_width_tablet: pct(100),
        _position: 'absolute', _offset_orientation_h: 'end', _offset_x_end: px(0), _offset_y: px(0), _z_index: 2,
        custom_css: '@media (max-width:980px){selector{position:static!important;margin:0 0 24px!important}}' } }),
    W('nested-tabs', Object.assign({
      tabs: [{ _id: EX.rid(), tab_title: 'Osteopathy & Wellbeing' }, { _id: EX.rid(), tab_title: 'Recovery & Performance' }],
      tabs_justify_horizontal: 'start', breakpoint_selector: 'none', tabs_title_space_between: px(0), tabs_title_spacing: px(30),
      tabs_title_background_color_background: 'classic', tabs_title_background_color_color: 'rgba(0,0,0,0)',
      tabs_title_background_color_hover_background: 'classic', tabs_title_background_color_hover_color: 'rgba(0,0,0,0)',
      tabs_title_background_color_active_background: 'classic', tabs_title_background_color_active_color: 'rgba(0,0,0,0)',
      title_text_color: '#272B26', title_text_color_hover: '#4F5945', title_text_color_active: '#4F5945',
      custom_css: tabsCss
    }, EX.typo({ f: IN, s: 15, w: 500, ls: 0.18, tt: 'uppercase', lh: 1.3 }, 'title_typography')), [
      C({ padding: all(0) }, [carousel(slides(OSTEO))]),
      C({ padding: all(0) }, [carousel(slides(RECOV), { show: '3' })])
    ])
  ]);

  /* 4. CONDITIONS card over photo (links to the What We Treat pages, as on Exhale) */
  const CONDS = [['Back Pain', 'hands-back', L.back], ['Neck Pain', 'hands-upper', L.neck], ['Shoulder Pain', 'osteo-arm', L.shoulder], ['Hip Pain', 'hands-deep', L.hip],
    ['Knee Pain', 'hands-leg', L.knee], ['Foot &amp; Ankle Pain', 'hands-leg', L.ankle], ['Headaches &amp; Migraines', 'hands-upper', L.head], ['Sciatica', 'hands-deep', L.sciatica],
    ['Sports Injuries', 'massage-zoe', L.sports], ['Tendon Problems', 'osteo-arm', L.tendon], ['TMJ / Jaw Pain', 'osteo-freta', L.jaw]];
  S.conditions = () => section({ pt: 90, pb: 90, ptm: 64, pbm: 64, x: { _element_id: 'conditions',
    background_background: 'classic', background_color: '#7B826C', background_image: img('hands-back'),
    background_position: 'initial', background_xpos: pct(75), background_ypos: pct(50), background_size: 'cover' } }, [
    C({ width: pct(62), width_tablet: pct(100), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3),
      padding: dims(70, 70, 64, 70), padding_tablet: dims(56, 48, 52, 48), padding_mobile: dims(36, 22, 32, 22) }, [
      eyebrow('How We Can Help'),
      heading('Common conditions<br>we treat', { t: { s: 56, st: 30, sm: 28, lh: 1.1, lhm: 1.15, ls: -0.03 }, x: { _margin: dims(24, 0, 0, 0) } }),
      C(grid(2, { grid_columns_grid_mobile: { unit: 'fr', size: 1, sizes: [] }, grid_gaps: gaps(22, 28), margin: dims(34, 0, 0, 0) }),
        CONDS.map(([n, a, h]) => C({ html_tag: 'a', link: { url: h, is_external: '', nofollow: '' }, flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(16) }, [
          image(a, '', { x: { width: px(96), height: px(96), 'object-fit': 'cover', image_border_radius: all(3), _flex_size: 'none' } }),
          heading(n, { tag: 'span', t: { f: IN, s: 20, w: 500, lh: 1.3 } })
        ])))
    ])
  ]);

  /* 5. WHO WE HELP (from the live Osteopathy FAQ: "the young, the more mature person, manual workers, office professionals, pregnant women, children and sports people") */
  const WHO = [['Babies &amp; Children', L.babies, 'cranial-baby-2'], ['Office Professionals', L.osteo, 'hands-upper'], ['Manual Workers', L.osteo, 'hands-deep'],
    ['Sports People', L.sports, 'hands-leg'], ['Pregnancy', L.massage, 'massage-stock'], ['Later Life', L.osteo, 'osteo-arm']];
  S.who = () => section({ pt: 110, pb: 120, ptm: 64, pbm: 64, x: { _element_id: 'who', overflow: 'hidden', background_background: 'classic', background_color: '#4F5945' } }, [
    eyebrow('Who We Help', { light: true, pb: 18 }),
    C({ margin: dims(40, 0, 0, 0) }, [carousel(slides(WHO), { arrowBg: '#F5F2EA', arrowFg: '#4F5945', arrowHover: '#E6E0D5' })])
  ]);

  /* 6. TEAM */
  S.team = () => section({ x: { _element_id: 'team' } }, [
    eyebrow('Our Team'),
    C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(20), margin: dims(24, 0, 0, 0) }, [
      heading('Meet the Clinicians Behind Your Recovery', { t: { s: 44, st: 30, sm: 28, lh: 1.1, lhm: 1.15, ls: -0.025 } }),
      button('View All Team', L.team, { kind: 'outline', h: 50, pl: 24, pr: 24 })
    ]),
    C(grid(EX.TEAM.length, { grid_columns_grid_tablet: { unit: 'fr', size: 3, sizes: [] }, grid_columns_grid_mobile: { unit: 'fr', size: 2, sizes: [] }, grid_gaps: gaps(20), grid_gaps_mobile: gaps(16), margin: dims(40, 0, 0, 0) }),
      EX.TEAM.map(p => C({ html_tag: 'a', link: { url: p.href, is_external: '', nofollow: '' } }, [
        image(p.photo, p.name, { x: { _css_classes: 'ex-ratio-34 ex-pos-top', image_border_radius: all(3) } }),
        heading(p.name, { tag: 'h3', t: { s: 20, ls: -0.015, lh: 1.3 }, x: { _margin: dims(16, 0, 0, 0) } }),
        heading(p.role, { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 14, lh: 1.75 } }),
        heading('View Profile →', { tag: 'span', color: '#4F5945', t: { f: IN, s: 14, w: 500, lh: 1.75 }, x: { _margin: dims(8, 0, 0, 0) } })
      ])))
  ]);

  /* 7. FIND US (from the live homepage "How to find us") */
  S.findus = () => section({ pt: 96, pb: 96, ptm: 64, pbm: 64, x: { _element_id: 'find-us', background_background: 'classic', background_color: '#E6E0D5' } }, [
    C(grid(2, { grid_columns_grid_tablet: { unit: 'fr', size: 1, sizes: [] }, grid_gaps: gaps(64), grid_gaps_tablet: gaps(36), grid_align_items: 'center' }), [
      image('exterior', 'Lichfield Osteopathic Practice, 30 Rotten Row', { x: { _css_classes: 'ex-ratio-54', image_border_radius: all(3) } }),
      C({}, [
        eyebrow('How to Find Us'),
        heading('A few minutes’ walk from Lichfield city centre', { t: { s: 40, st: 30, sm: 28, lh: 1.12, ls: -0.025 }, x: { _margin: dims(24, 0, 0, 0) } }),
        text("<p>There is parking outside the clinic, on-street parking a few minutes' walk away, and free parking at Tesco, also a few minutes' walk away.</p>",
          { t: { s: 18, lh: 1.75 }, x: { _margin: dims(20, 0, 0, 0) } }),
        C({ flex_gap: gap(10), margin: dims(26, 0, 0, 0), padding: dims(24, 0, 0, 0), border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: '#B7AA99' }, [
          heading(SITE.name, { tag: 'h3', t: { s: 22, ls: -0.015, lh: 1.3 } }),
          text('<p>' + SITE.addr + '</p><p><a href="' + SITE.tel + '">' + SITE.phone + '</a> · <a href="mailto:' + SITE.email + '">' + SITE.email + '</a></p><p>' + SITE.hoursLine + ' · Sunday closed</p>',
            { t: { s: 16, lh: 1.7 }, x: { _css_classes: 'ex-list ex-gap-8 ex-dark-links ex-break' } })
        ]),
        C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(12), margin: dims(28, 0, 0, 0) }, [
          button('Get directions', L.dir, { kind: 'olive', h: 52, fs: 15, pl: 24, pr: 24, icon: 'arrowNE', gapIcon: 10 }),
          button('Contact us', L.contact, { kind: 'outline', h: 52, fs: 15, pl: 24, pr: 24 })
        ])
      ])
    ])
  ]);

  /* 8. REGISTRATIONS strip */
  S.logos = () => section({ pt: 44, pb: 48, ptm: 40, pbm: 44, x: { border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: '#B7AA99' } }, [
    heading('Registered With', { tag: 'p', align: 'center', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 12, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 } }),
    C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'center', flex_align_items: 'center', flex_gap: gap(28, 72), margin: dims(28, 0, 0, 0) }, [
      image('gosc', 'General Osteopathic Council', { x: { height: px(60), width: px(143), _element_width: 'auto' } })
    ])
  ]);

  /* 9. BOOK TODAY */
  const bookCard = (title, sub, href, o) => C(Object.assign({ html_tag: 'a', link: { url: href, is_external: '', nofollow: '' }, flex_direction: 'row', flex_align_items: 'center',
    flex_justify_content: 'space-between', flex_gap: gap(20), padding: dims(24, 26, 24, 26), border_radius: all(3), css_classes: 'ex-nowrap' }, o), [
    C({ flex_gap: gap(4), css_classes: 'ex-grow' }, [
      heading(title, { tag: 'span', color: '#F5F2EA', t: { s: 22, ls: -0.015, lh: 1.3 } }),
      heading(sub, { tag: 'span', color: 'rgba(245,242,234,0.86)', t: { f: IN, s: 15, lh: 1.6 } })
    ]),
    W('icon', { selected_icon: icon('right'), primary_color: '#F5F2EA', size: px(24), _flex_size: 'none' })
  ]);
  S.book = () => section({ pb: 100, x: { padding_tablet: dims(100, 30, 100, 30), _element_id: 'book', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#272B26' } }, [
    C(grid(2, { grid_columns_grid_tablet: { unit: 'fr', size: 1, sizes: [] }, grid_gaps: gaps(48), grid_align_items: 'center' }), [
      C({}, [
        heading('Book Your Session', { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
        heading('Ready When You Are. Book in Minutes.', { color: '#F5F2EA', t: { s: 46, st: 30, sm: 28, lh: 1.08, lhm: 1.15, ls: -0.025 }, x: { _margin: dims(14, 0, 0, 0) } }),
        text('<p>Schedule an appointment online in a few clicks. If you would like a quick chat before booking, call us on ' + SITE.phone + '.</p>',
          { color: 'rgba(245,242,234,0.88)', t: { s: 18, lh: 1.7 }, x: { _margin: dims(18, 0, 0, 0), _element_width: 'initial', _element_custom_width: px(520), _element_custom_width_tablet: pct(100) } })
      ]),
      C({ flex_gap: gap(14) }, [
        bookCard('Book an Appointment', 'Choose your practitioner and a time online.', L.book, { background_background: 'classic', background_color: '#4F5945' }),
        bookCard('Call ' + SITE.phone, 'Speak to us about whether we can help.', SITE.tel,
          { border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.3)' })
      ])
    ])
  ]);

  EX.HOME = S;
  EX.bookCard = bookCard;
  EX.buildHome = async function (only) {
    const order = ['hero', 'about', 'services', 'conditions', 'who', 'team', 'findus', 'logos', 'book'];
    for (const k of (only || order)) await EX.insert(S[k]());
  };
})();
