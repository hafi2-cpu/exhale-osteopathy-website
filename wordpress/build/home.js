/* Exhale Osteopathy — homepage, rebuilt from source/Main.dc.html with native Elementor elements.
   Requires lib.js (window.EX) and EX.setMedia(media-map). Header and footer are separate
   Theme Builder templates (header.js / footer.js). */
(function () {
  const { C, W, px, em, pct, dims, all, gap, section, heading, text, eyebrow, button, image, img, icon, IT, IN } = EX;

  // Live-site URLs kept where a page already exists; new pages use matching flat slugs.
  const L = {
    about: '/about', fees: '/our-fees', contact: '/contact-us', blog: '/blog-posts', book: '/book', bham: '/osteopath-birmingham',
    osteo: '/osteopathy', cranial: '/cranial-osteopathy', babies: '/babies', preg: '/pregnancy-osteopathy', massage: '/massage',
    acu: '/acupuncture', physio: '/physiotherapy', rehab: '/rehab-pilates', shock: '/shockwave-therapy', laser: '/laser-therapy',
    us: '/diagnostic-ultrasound', back: '/back-pain', neck: '/neck-pain', shoulder: '/shoulder-pain', hip: '/hip-pain',
    knee: '/knee-pain', ankle: '/ankle-pain', head: '/headaches', sciatica: '/sciatica', sports: '/sports-injuries',
    tendon: '/tendon-problems', jaw: '/jaw-pain', hafi: '/hafi-rahman', zoe: '/zoe-goodwin', freta: '/freta-teklensenbet',
    ankita: '/ankita-desai', emre: '/emre-tosun'
  };
  EX.L = L;
  const tones = ['#7D7868', '#7B826C', '#8C8471', '#4F5945', '#857C69'];
  // grid rows 'auto' — Elementor's default (2 equal rows) would add an empty row of the same height
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

  const carousel = (cards, o = {}) => W('nested-carousel', Object.assign({
    carousel_items: cards.map((c, i) => ({ _id: EX.rid(), slide_title: c.title })),
    slides_to_show: '4', slides_to_show_tablet: '2', slides_to_show_mobile: '1', slides_to_scroll: '1',
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
  // nested children must be the slide containers
  const slides = (list) => list.map(([title, href, asset], i) => ({ title, el: C({ padding: all(0) }, [card(title, href, asset, tones[i % 5])]) }));

  const S = {};

  /* 1. HERO */
  S.hero = () => section({ pt: 216, pb: 56, ptm: 216, pbm: 56, x: {
    _element_id: 'top', min_height: px(880), flex_justify_content: 'flex-end',
    background_background: 'classic', background_color: '#272B26', background_image: img('9f8669dac189f5736c81b923529a4b21'),
    background_position: 'initial', background_xpos: pct(40), background_ypos: pct(35), background_size: 'cover',
    css_classes: 'ex-hero-shade' } }, [
    heading('Private Osteopathy · Sutton Coldfield &amp; Lichfield', { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
    heading('Move Freely. Breathe Easier. Feel Like You Again.', { tag: 'h1', color: '#F5F2EA', t: { s: 60, st: 40, sm: 36, lh: 1.05, lhm: 1.08, ls: -0.03 },
      x: { _element_width: 'initial', _element_custom_width: px(860), _element_custom_width_tablet: pct(100), _margin: dims(18, 0, 0, 0) } }),
    C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(32),
      margin: dims(36, 0, 0, 0), padding: dims(36, 0, 0, 0), border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: 'rgba(245,242,234,0.22)' }, [
      C({ width: px(880), width_tablet: pct(100) }, [
        text('<p>At Exhale we look beyond the sore spot to find out why it hurts — then treat, prevent and help you stay well, with care that never feels rushed. No GP referral needed.</p>',
          { color: 'rgba(245,242,234,0.9)', t: { s: 20, lh: 1.65 } }),
        C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(14), margin: dims(32, 0, 0, 0) }, [
          button('Book an appointment', '#book', { kind: 'ivory', h: 64, fs: 18, icon: 'right', split: true, pl: 36, pr: 30 }),
          button('New Patients', '#expect', { kind: 'outline-light', h: 64, fs: 18, icon: 'right', split: true, pl: 36, pr: 30 })
        ])
      ]),
      C({ css_classes: 'ex-fit', flex_align_items: 'flex-end', flex_gap: gap(10) }, [
        heading('[5★] Google Reviews', { tag: 'p', color: 'rgba(245,242,234,0.9)', t: { f: IN, s: 12, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 } }),
        C({ flex_direction: 'row', flex_gap: gap(0) }, ['3c84c3f41e71194a585fdbe2ba549b68', '3145376680e5c707cbbb4e7924778e72', '281742b2504bf22d441c896347616585', '707736522f4e7464c994a8b9b88b27b3']
          .map((a, i) => image(a, '', { x: { width: px(54), height: px(54), 'object-fit': 'cover',
            image_border_border: 'solid', image_border_width: all(3), image_border_color: '#F5F2EA', image_border_radius: all(50, '%'),
            _margin: dims(0, 0, 0, i ? -12 : 0) } })))
      ])
    ])
  ]);

  /* 2. ABOUT + VALUES */
  S.about = () => section({ pt: 100, pb: 40, ptm: 64, pbm: 40, x: { _element_id: 'about', overflow: 'hidden' } }, [
    C(grid(2, { grid_columns_grid_tablet: { unit: 'fr', size: 1, sizes: [] }, grid_gaps: gaps(64), grid_align_items: 'center' }), [
      C({}, [
        eyebrow('About Us'),
        heading('Expert Osteopathic Care in the Heart of Sutton Coldfield', { t: { s: 44, st: 30, sm: 28, lh: 1.1, lhm: 1.15, ls: -0.025 }, x: { _margin: dims(24, 0, 0, 0) } }),
        text("<p>Exhale Osteopathy is a private clinic in Sutton Coldfield, with a sister practice in Lichfield. Our registered osteopaths, sports therapists and acupuncturists take time to understand how you move, what you need, and what's getting in the way — then build a plan that gets you back to the things you love.</p>",
          { t: { s: 18, lh: 1.75 }, x: { _margin: dims(24, 0, 0, 0), _element_width: 'initial', _element_custom_width: px(600), _element_custom_width_tablet: pct(100) } }),
        C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(12), margin: dims(32, 0, 0, 0) }, [
          button('Meet the Team', '#team', { kind: 'olive' }),
          button('Your First Visit', '#expect', { kind: 'outline' })
        ])
      ]),
      C(grid(3, { grid_columns_grid_mobile: { unit: 'fr', size: 3, sizes: [] }, grid_gaps: gaps(14) }), [
        image('3e3292b3448a80b063b85bf775c63745', "Hafi Rahman treating a patient's upper back", { x: { _css_classes: 'ex-ratio-34', image_border_radius: all(3), _margin: dims(48, 0, 0, 0) } }),
        image('ce41d49da62d783b997bc31a778778a3', 'Zoe, Freta and Ankita in the Exhale treatment room', { x: { _css_classes: 'ex-ratio-34', image_border_radius: all(3) } }),
        image('2129889c75f1ece566f1ddfe2606ea2e', "Freta assessing a patient's spine", { x: { _css_classes: 'ex-ratio-34', image_border_radius: all(3), _margin: dims(24, 0, 0, 0) } })
      ])
    ]),
    C({ flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(40), margin: dims(80, 0, 0, 0), padding: dims(22, 0, 22, 0), overflow: 'hidden',
      border_border: 'solid', border_width: dims(1, 0, 1, 0), border_color: '#B7AA99' }, [
      heading('Our Values', { tag: 'p', color: '#4F5945', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.4 }, x: { _flex_size: 'none' } }),
      C({ css_classes: 'ex-marquee', flex_direction: 'row' }, [
        text('<p>' + [0, 1].map(() => ['Listen First', 'Treat the Cause', 'Honest Advice', 'Calm, Unhurried Care', 'Lasting Results']
          .map(v => '<span>' + v + '</span><span style="color:#B7AA99">✦</span>').join('')).join('') + '</p>',
          { t: { f: IT, s: 24, ls: -0.015, lh: 1.4 }, x: { _css_classes: 'ex-marquee-track' } })
      ])
    ])
  ]);

  /* 3. TREATMENTS — tabs with a carousel in each */
  const OSTEO = [['Osteopathy', L.osteo, 'eb3a3518e6e4460583ce6625b34e0d82'], ['Cranial Osteopathy', L.cranial, '2a651f6711f7912944a68430e75364cb'],
    ['Baby & Paediatric Osteopathy', L.babies, '5b3d676c6ce99472242a84649521af62'], ['Pregnancy Osteopathy', L.preg, '6128b4e96822ca4aa5be53906bd1ae7f'],
    ['Sports Massage', L.massage, 'c6a31e9450e0eeb87fed01960d8d534e'], ['Acupuncture', L.acu, 'ebc5540e0e4f70c2c0727439dc39383e']];
  const RECOV = [['Physiotherapy', L.physio, 'e7ccc65900e405cbfd5068742f9f19a8'], ['1-to-1 Rehab / Pilates', L.rehab, 'c1b26d1d09b98e10ca67e53b603b1499'],
    ['Shockwave Therapy', L.shock, '33d9918bd1f13c2db06cb07701f3f61f'], ['Laser Therapy', L.laser, ''], ['Diagnostic Ultrasound', L.us, '']];
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
      C({ padding: all(0) }, [carousel(slides(RECOV))])
    ])
  ]);

  /* 4. CONDITIONS card over photo */
  const CONDS = [['Back Pain', 'bad5ffe8e3d651f608eed6b8395755e1', L.back], ['Neck Pain', 'ecff3978d740e61ad991d87ac8ed9c80', L.neck],
    ['Shoulder Pain', 'c525025c94afa6c27f465df87630f2d5', L.shoulder], ['Hip Pain', '336754bc2f4144cf175e16e96253b0c6', L.hip],
    ['Knee Pain', '45650fb355363711c837123b9102097b', L.knee], ['Foot & Ankle Pain', '2ba8ade52a5466a109b0e50cb08b37f9', L.ankle],
    ['Headaches & Migraines', 'a6111fcfc10ade3e8e1ab9feee68d0bd', L.head], ['Sciatica', 'b4cbb771eeb8f8ab5dc8dc2aea17df46', L.sciatica],
    ['Sports Injuries', '69eda695c26e3fcc7ef14bd02b658884', L.sports], ['Tendon Problems', '6b36c7e66c35b11e6d4a167d6cd862ea', L.tendon],
    ['TMJ / Jaw Pain', 'f8e9145ba19cb163a759ff111c5ad1b2', L.jaw]];
  S.conditions = () => section({ pt: 90, pb: 90, ptm: 64, pbm: 64, x: { _element_id: 'conditions',
    background_background: 'classic', background_color: '#7B826C', background_image: img('602bcebb1c29e98bc4fcd47a4c86b013'),
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

  /* 5. WHO WE HELP */
  const WHO = [['Active People & Athletes', '#book', '33d9918bd1f13c2db06cb07701f3f61f'], ['Desk-Based Workers', '#book', 'fc0cd8dee0d77427c8848367796d1363'],
    ['Babies & Children', '#book', '2a651f6711f7912944a68430e75364cb'], ['Everyday Aches & Pains', '#book', '9af45bf075c03267ebade2a841e7dbed'],
    ['Weekend Sports Players', '#book', 'c1b26d1d09b98e10ca67e53b603b1499']];
  S.who = () => section({ pt: 110, pb: 120, ptm: 64, pbm: 64, x: { _element_id: 'who', overflow: 'hidden', background_background: 'classic', background_color: '#4F5945' } }, [
    eyebrow('Who We Help', { light: true, pb: 18 }),
    C({ margin: dims(40, 0, 0, 0) }, [carousel(slides(WHO), { arrowBg: '#F5F2EA', arrowFg: '#4F5945', arrowHover: '#E6E0D5' })])
  ]);

  /* 6. TEAM */
  const TEAM = [['Hafi Rahman', 'Founder & Principal Osteopath', 'adb0a00027d03ae9e913fa80bfed0bf2', L.hafi], ['Zoe Goodwin', 'Sports Massage Therapist', '0a842542348f2fd4ca49aad4f2bf2c64', L.zoe],
    ['Freta Teklensenbet', 'Registered Osteopath', '4ff59666163d2da4d9903e010addea99', L.freta], ['Ankita Desai', 'Registered Osteopath', '7a6e5e3046a8707b0a2a72472a2adc55', L.ankita],
    ['Emre Tosun', 'Physiotherapist & Personal Trainer', '', L.emre]];
  S.team = () => section({ x: { _element_id: 'team' } }, [
    eyebrow('Our Team'),
    C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(20), margin: dims(24, 0, 0, 0) }, [
      heading('Meet the Clinicians Behind Your Recovery', { t: { s: 44, st: 30, sm: 28, lh: 1.1, lhm: 1.15, ls: -0.025 } }),
      button('View All Team', '#team', { kind: 'outline', h: 50, pl: 24, pr: 24 })
    ]),
    C(grid(5, { grid_columns_grid_tablet: { unit: 'fr', size: 2, sizes: [] }, grid_columns_grid_mobile: { unit: 'fr', size: 2, sizes: [] }, grid_gaps: gaps(20), grid_gaps_mobile: gaps(16), margin: dims(40, 0, 0, 0) }),
      TEAM.map(([n, r, a, h]) => C({ html_tag: 'a', link: { url: h, is_external: '', nofollow: '' } }, [
        a ? image(a, n, { x: { _css_classes: 'ex-ratio-34', image_border_radius: all(3) } })
          : C({ css_classes: 'ex-ratio-box', background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3), flex_justify_content: 'flex-end', padding: all(14) },
              [heading('[Headshot]', { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 12, lh: 1.4 } })]),
        heading(n, { tag: 'h3', t: { s: 20, ls: -0.015, lh: 1.3 }, x: { _margin: dims(16, 0, 0, 0) } }),
        heading(r, { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 14, lh: 1.75 } }),
        heading('View Profile →', { tag: 'span', color: '#4F5945', t: { f: IN, s: 14, w: 500, lh: 1.75 }, x: { _margin: dims(8, 0, 0, 0) } })
      ])))
  ]);

  /* 7. REVIEWS (placeholders until genuine Google reviews are supplied) */
  const stars = (o = {}) => heading('★★★★★', { tag: 'span', color: '#E0A800', t: { f: IN, s: 16, lh: 1.4 }, x: Object.assign({ typography_letter_spacing: px(2) }, o) });
  S.reviews = () => section({ x: { _element_id: 'reviews' } }, [
    eyebrow('Patient Stories'),
    C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(24), margin: dims(24, 0, 0, 0) }, [
      heading('Loved by Patients Across Sutton &amp; Lichfield', { t: { s: 44, st: 30, sm: 28, lh: 1.1, lhm: 1.15, ls: -0.025 } }),
      C({ flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(14), padding: dims(16, 22, 16, 22), border_border: 'solid', border_width: all(1), border_color: '#B7AA99', border_radius: all(3), css_classes: 'ex-fit' }, [
        heading('Google', { tag: 'span', t: { f: IN, s: 14, w: 600, lh: 1.4 } }),
        heading('[5.0]', { tag: 'span', t: { s: 26, lh: 1.2 } }),
        stars(),
        heading('[XXX] reviews', { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 13, lh: 1.4 } })
      ])
    ]),
    C(grid(3, { grid_columns_grid_tablet: { unit: 'fr', size: 2, sizes: [] }, grid_columns_grid_mobile: { unit: 'fr', size: 1, sizes: [] }, grid_gaps: gaps(24), margin: dims(40, 0, 0, 0) }),
      [1, 2, 3].map(() => C({ padding: all(30), flex_gap: gap(14), border_border: 'solid', border_width: all(1), border_color: '#B7AA99', border_radius: all(3) }, [
        stars(),
        text("<p>“[Paste a real Google review here — keep it in the patient's own words.]”</p>", { t: { s: 16, lh: 1.7 }, x: { _flex_size: 'grow' } }),
        heading('[Patient name]', { tag: 'span', t: { f: IN, s: 14, w: 600, lh: 1.75 } })
      ]))),
    heading('<a href="#reviews">See All Reviews on Google →</a>', { tag: 'p', color: '#4F5945', t: { f: IN, s: 15, w: 500, lh: 1.6 }, x: { _margin: dims(28, 0, 0, 0) } })
  ]);

  /* 8. REGISTRATIONS strip */
  S.logos = () => section({ pt: 44, pb: 48, ptm: 40, pbm: 44, x: { border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: '#B7AA99' } }, [
    heading('Registered &amp; Accredited', { tag: 'p', align: 'center', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 12, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 } }),
    C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'center', flex_align_items: 'center', flex_gap: gap(28, 72), margin: dims(28, 0, 0, 0) }, [
      image('fd147b5fe67c84b8213ca8698b4d19c5', 'General Osteopathic Council', { x: { height: px(60), width: px(143), _element_width: 'auto' } }),
      image('2327180f75ec1201c108d81a10773018', 'The Institute of Osteopathy', { x: { height: px(72), width: px(74), _element_width: 'auto' } }),
      image('3bf80f0bb880bf686723d71a92a87e30', 'HCPC registered', { x: { height: px(72), width: px(70), _element_width: 'auto' } }),
      image('0b1f164aa218fea261047c24cd9adf5a', 'The Australian Physiotherapy & Pilates Institute', { x: { height: px(76), width: px(76), _element_width: 'auto' } })
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
  S.book = () => section({ pb: 36, x: { padding_tablet: dims(100, 30, 100, 30), _element_id: 'book', background_background: 'classic', background_color: '#272B26' } }, [
    C(grid(2, { grid_columns_grid_tablet: { unit: 'fr', size: 1, sizes: [] }, grid_gaps: gaps(48), grid_align_items: 'center' }), [
      C({}, [
        heading('Book Today', { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
        heading('Ready When You Are. Book in Minutes.', { color: '#F5F2EA', t: { s: 46, st: 30, sm: 28, lh: 1.08, lhm: 1.15, ls: -0.025 }, x: { _margin: dims(14, 0, 0, 0) } }),
        text('<p>No GP referral needed. Book online, call the clinic, or send us a message — and start feeling better, sooner.</p>',
          { color: 'rgba(245,242,234,0.88)', t: { s: 18, lh: 1.7 }, x: { _margin: dims(18, 0, 0, 0), _element_width: 'initial', _element_custom_width: px(520), _element_custom_width_tablet: pct(100) } })
      ]),
      C({ flex_gap: gap(14) }, [
        bookCard('Book an Appointment', 'Pick a time online in under a minute, or call and speak to a real person.', L.book,
          { background_background: 'classic', background_color: '#4F5945' }),
        bookCard('New Patients', 'New to osteopathy? See exactly how your first appointment works, from arrival to treatment plan.', '#expect',
          { _element_id: 'expect', border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.3)' })
      ])
    ])
  ]);

  EX.HOME = S;
  EX.bookCard = bookCard;
  EX.buildHome = async function (only) {
    const order = ['hero', 'about', 'services', 'conditions', 'who', 'team', 'reviews', 'logos', 'book'];
    for (const k of (only || order)) await EX.insert(S[k]());
  };
})();
