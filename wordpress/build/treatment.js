/* Exhale Osteopathy — treatment page (rebuilt from source/Service.dc.html). One builder, 11 pages:
   EX.buildTreatment(key, data) where data = wordpress/data/treatments.json. */
(function () {
  const { C, W, px, em, pct, dims, all, gap, section, heading, text, eyebrow, button, image, img, icon, IT, IN } = EX;
  const L = EX.L;
  const grid = (cols, s = {}) => Object.assign({ container_type: 'grid', grid_columns_grid: { unit: 'fr', size: cols, sizes: [] }, grid_rows_grid: { unit: 'custom', size: 'auto', sizes: [] } }, s);
  const gridC = (tpl, s = {}) => Object.assign({ container_type: 'grid', grid_columns_grid: { unit: 'custom', size: tpl, sizes: [] }, grid_rows_grid: { unit: 'custom', size: 'auto', sizes: [] } }, s);
  const fr = (n) => ({ unit: 'fr', size: n, sizes: [] });
  const gaps = (r, c = r) => ({ unit: 'px', column: String(c), row: String(r), isLinked: r === c });
  const h2 = (t, o = {}) => heading(t, Object.assign({ t: Object.assign({ s: 44, st: 32, sm: 28, lh: 1.1, lhm: 1.15, ls: -0.025 }, o.t || {}) }, o.o || {}));
  const PAGE = { osteo: L.osteo, physio: L.physio, massage: L.massage, laser: L.laser, cranial: L.cranial, paediatric: L.babies, pregnancy: L.preg,
    acupuncture: L.acu, rehab: L.rehab, shockwave: L.shock, ultrasound: L.us };
  const CPAGE = { back: L.back, neck: L.neck, sciatica: L.sciatica, shoulder: L.shoulder, head: L.head, hip: L.hip, knee: L.knee, ankle: L.ankle,
    posture: L.back, joint: L.sports, baby: L.babies };
  const PEOPLE = { hafi: L.hafi, zoe: L.zoe, freta: L.freta, ankita: L.ankita, emre: L.emre };
  const FACT_ICON = { 'Appointment': 'clock', 'From': 'pound', 'GP referral': 'check', 'Clinics': 'pin' };
  const amp = (s) => String(s).replace(/&amp;/g, '&');
  const esc = (s) => amp(s).replace(/&/g, '&amp;');

  const circle = (iconKey, size, iconSize, o) => C(Object.assign({ css_classes: 'ex-fit', width: px(size), min_height: px(size), flex_justify_content: 'center', flex_align_items: 'center',
    border_radius: all(50, '%'), padding: all(0) }, o.box || {}), [W('icon', { selected_icon: icon(iconKey), primary_color: o.color, size: px(iconSize) })]);

  const photoCard = (name, href, asset, tone, h) => C({ html_tag: 'a', link: { url: href, is_external: '', nofollow: '' }, css_classes: 'ex-shade ' + (h || 'ex-card'),
    flex_justify_content: 'space-between', background_background: 'classic', background_color: tone,
    background_image: asset ? img(asset) : { url: '', id: '' }, background_size: 'cover', background_position: 'center center',
    border_radius: all(3), padding: dims(36, 36, 38, 36), padding_mobile: dims(28, 26, 28, 26) }, [
    heading(esc(name), { tag: 'p', color: '#F5F2EA', t: { s: 25, lh: 1.2, ls: -0.02 } }),
    C({ flex_direction: 'row', flex_justify_content: 'space-between', flex_align_items: 'center', flex_gap: gap(12) }, [
      heading('Learn More', { tag: 'span', color: '#F5F2EA', t: { f: IN, s: 19, lh: 1.4 } }),
      W('icon', { selected_icon: icon('right'), view: 'stacked', shape: 'square', primary_color: '#F5F2EA', secondary_color: '#272B26', size: px(22), icon_padding: px(19), border_radius: all(3) })
    ])
  ]);

  const faqAccordion = (faqs) => W('nested-accordion', Object.assign({
    items: faqs.map(f => ({ _id: EX.rid(), item_title: amp(f.q) })),
    accordion_item_title_icon: icon('plus'), accordion_item_title_icon_active: icon('plus'),
    title_color: '#272B26', max_items_expended: 'one', default_state: 'expanded', faq_schema: 'yes',
    custom_css: [
      'selector{border-top:1px solid #B7AA99}',
      'selector .e-n-accordion-item{border:0;border-bottom:1px solid #B7AA99}',
      'selector .e-n-accordion-item-title{padding:24px 0;border:0;background:transparent;justify-content:space-between;gap:24px}',
      'selector .e-n-accordion-item-title-header{order:1;flex:1 1 auto;text-align:left;justify-content:flex-start}',
      'selector .e-n-accordion-item-title-icon{order:2;flex:none;width:40px;height:40px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:#E6E0D5;color:#4F5945;transition:transform .2s}',
      'selector .e-n-accordion-item[open] .e-n-accordion-item-title-icon{background:#4F5945;color:#F5F2EA;transform:rotate(45deg)}',
      'selector .e-n-accordion-item-title-icon svg{width:18px;height:18px}',
      'selector .e-n-accordion-item > .e-con{border:0;padding:0 48px 26px 0}'
    ].join('\n')
  }, EX.typo({ f: IT, s: 21, w: 400, ls: -0.01, lh: 1.35 }, 'title_typography')),
  faqs.map(f => C({ padding: all(0) }, [text('<p>' + esc(f.a) + '</p>', { t: { s: 16, lh: 1.75 } })])));

  EX.buildTreatment = async function (key, D) {
    const s = D.S[key], people = D.people, T = D.T;
    const [hx, hy] = s.heroPos.split(' ').map(v => parseFloat(v));
    const out = [];

    /* HERO */
    out.push(section({ pt: 176, pb: 72, ptm: 160, pbm: 56, x: { min_height: px(640), flex_justify_content: 'flex-end',
      background_background: 'classic', background_color: '#272B26', background_image: img(s.heroImg), background_position: 'initial',
      background_xpos: pct(hx), background_ypos: pct(hy), background_size: 'cover', css_classes: 'ex-hero-side' } }, [
      heading('<a href="/">Home</a> <span aria-hidden="true">→</span> Treatments <span aria-hidden="true">→</span> <strong>' + esc(s.name) + '</strong>',
        { tag: 'p', color: 'rgba(245,242,234,0.8)', t: { f: IN, s: 15, lh: 1.6 }, x: { _css_classes: 'ex-on-dark ex-crumbs' } }),
      heading(esc(s.h1), { tag: 'h1', color: '#F5F2EA', t: { s: 64, st: 42, sm: 36, lh: 1.04, lhm: 1.08, ls: -0.035 },
        x: { _element_width: 'initial', _element_custom_width: px(760), _element_custom_width_tablet: pct(100), _margin: dims(22, 0, 0, 0) } }),
      text('<p>' + esc(s.lead) + '</p>', { color: 'rgba(245,242,234,0.88)', t: { s: 20, lh: 1.6 },
        x: { _element_width: 'initial', _element_custom_width: px(620), _element_custom_width_tablet: pct(100), _margin: dims(22, 0, 0, 0) } }),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_align_items: 'center', flex_gap: gap(14), margin: dims(36, 0, 0, 0) }, [
        button('Book an appointment', '#book', { kind: 'ivory', h: 62, fs: 18, icon: 'right', split: true, minw: 280, pl: 32, pr: 28 }),
        button('What to expect', '#expect', { kind: 'outline-light', h: 62, fs: 18, icon: 'right', split: true, minw: 280, pl: 32, pr: 28 }),
        C({ flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(14), css_classes: 'ex-fit', margin: dims(0, 0, 0, 12), margin_mobile: dims(0, 0, 0, 0) }, [
          C({ flex_direction: 'row', css_classes: 'ex-fit' }, ['3c84c3f41e71194a585fdbe2ba549b68', '3145376680e5c707cbbb4e7924778e72', '281742b2504bf22d441c896347616585'].map((a, i) =>
            image(a, '', { x: { width: px(44), height: px(44), 'object-fit': 'cover', image_border_border: 'solid', image_border_width: all(2), image_border_color: '#F5F2EA',
              image_border_radius: all(50, '%'), _margin: dims(0, 0, 0, i ? -10 : 0) } }))),
          heading('[5★] Google<br>Reviews', { tag: 'span', color: 'rgba(245,242,234,0.9)', t: { f: IN, s: 12, w: 500, ls: 0.18, tt: 'uppercase', lh: 1.5 } })
        ])
      ])
    ]));

    /* AT A GLANCE */
    out.push(section({ pt: 0, pb: 0, ptm: 0, pbm: 0, x: { html_tag: 'section', background_background: 'classic', background_color: '#4F5945' } }, [
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(0) }), s.facts.map(f =>
        C({ flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(16), padding: dims(28, 24, 28, 0),
          border_border: 'solid', border_width: dims(0, 1, 0, 0), border_color: 'rgba(245,242,234,0.14)' }, [
          circle(FACT_ICON[f.k] || 'check', 44, 20, { color: '#E6E0D5', box: { border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.35)' } }),
          C({ flex_gap: gap(0) }, [
            heading(esc(f.k), { tag: 'span', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 12, ls: 0.16, tt: 'uppercase', lh: 1.35 } }),
            heading(esc(f.v), { tag: 'span', color: '#F5F2EA', t: { s: 20, ls: -0.01, lh: 1.35 } })
          ])
        ])))
    ]));

    /* INTRO */
    out.push(section({ pt: 100, pb: 90, ptm: 64, pbm: 64 }, [
      C(gridC('minmax(0,1.1fr) minmax(0,1fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(72), grid_align_items: 'center' }), [
        C({}, [
          eyebrow('Discover'),
          h2(esc(s.introTitle), { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
          ...s.intro.map(p => text('<p>' + esc(p) + '</p>', { t: { s: 18, lh: 1.75 }, x: { _margin: dims(20, 0, 0, 0) } })),
          C({ flex_gap: gap(10), margin: dims(28, 0, 0, 0) }, s.ticks.map(t => C({ flex_direction: 'row', flex_align_items: 'flex-start', flex_gap: gap(12) }, [
            circle('tick', 22, 13, { color: '#4F5945', box: { background_background: 'classic', background_color: '#E6E0D5', margin: dims(3, 0, 0, 0) } }),
            text('<p>' + esc(t) + '</p>', { t: { s: 16, lh: 1.75 } })
          ])))
        ]),
        C({ position: 'relative', css_classes: 'ex-rel' }, [
          s.introImg ? image(s.introImg, amp(s.introAlt || ''), { x: { _css_classes: 'ex-ratio-45', image_border_radius: all(3) } })
            : C({ css_classes: 'ex-ratio-45-box', background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3), flex_justify_content: 'center', flex_align_items: 'center' },
              [heading('[' + esc(s.name) + ' photo]', { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 13, ls: 0.14, tt: 'uppercase' } })]),
          C({ css_classes: 'ex-float-card ex-fit', flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(14), padding: dims(20, 24, 20, 24),
            background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
            heading('★★★★★', { tag: 'span', color: '#E0A800', t: { f: IN, s: 15, lh: 1.4 }, x: { typography_letter_spacing: px(2) } }),
            text('<p><strong>[5.0] on Google</strong><br>[XXX] patient reviews</p>', { t: { s: 14, lh: 1.4 } })
          ])
        ])
      ])
    ]));

    /* BODY: sticky contents + sections + techniques */
    const toc = [...s.sections.map(x => [x.title, '#' + x.id]), ['Conditions we treat', '#conditions'], ['What to expect', '#expect'], ['FAQs', '#faqs']];
    out.push(section({ pt: 96, pb: 96, ptm: 64, pbm: 64, x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      C(gridC('280px minmax(0,1fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(64), grid_align_items: 'start' }), [
        C({ css_classes: 'ex-sticky', flex_gap: gap(18), html_tag: 'aside' }, [
          C({ html_tag: 'nav', background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3), padding: dims(26, 24, 26, 24) }, [
            heading('On this page', { tag: 'span', color: '#4F5945', t: { f: IN, s: 12, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 } }),
            C({ margin: dims(14, 0, 0, 0) }, toc.map(([t, h], i) => heading('<a href="' + h + '">' + esc(t) + '</a>', { tag: 'p', t: { f: IN, s: 15, lh: 1.5 },
              x: Object.assign({ _css_classes: 'ex-toc-link', _padding: dims(9, 0, 9, 0) }, i < toc.length - 1 ? { _border_border: 'solid', _border_width: dims(0, 0, 1, 0), _border_color: '#B7AA99' } : {}) })))
          ]),
          C({ background_background: 'classic', background_color: '#272B26', border_radius: all(3), padding: dims(26, 24, 26, 24) }, [
            heading('Book ' + esc(s.name), { tag: 'span', color: '#F5F2EA', t: { s: 22, ls: -0.015, lh: 1.25 } }),
            heading('Sutton Coldfield &amp; Lichfield · No GP referral', { tag: 'span', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 14, lh: 1.5 }, x: { _margin: dims(6, 0, 0, 0) } }),
            button('Book online', L.book, { kind: 'olive', h: 48, fs: 15, x: { align: 'justify', _margin: dims(18, 0, 0, 0) } }),
            button('0121 751 2440', 'tel:+441217512440', { kind: 'outline-light', bd: 'rgba(245,242,234,0.35)', h: 48, fs: 15, x: { align: 'justify', _margin: dims(10, 0, 0, 0) } })
          ])
        ]),
        C({ flex_gap: gap(56), width: px(820), width_tablet: pct(100), css_classes: 'ex-maxw' }, [
          ...s.sections.map(x => C({ html_tag: 'article', _element_id: x.id, css_classes: 'ex-anchor' }, [
            heading(esc(x.title), { t: { s: 34, st: 32, sm: 28, lh: 1.15, ls: -0.02 } }),
            ...x.paras.map(p => text('<p>' + esc(p) + '</p>', { t: { s: 17, lh: 1.8 }, x: { _margin: dims(16, 0, 0, 0) } }))
          ])),
          C({ html_tag: 'article' }, [
            heading('Techniques we use', { t: { s: 34, st: 32, sm: 28, lh: 1.15, ls: -0.02 } }),
            C(grid(3, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(24, 0, 0, 0) }), s.techniques.map((t, i) =>
              C({ background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3), padding: dims(22, 22, 24, 22) }, [
                heading('0' + (i + 1), { tag: 'span', color: '#4F5945', t: { s: 13, ls: 0.1, lh: 1.4 } }),
                heading(esc(t.t), { tag: 'h3', t: { s: 19, w: 500, ls: -0.01, lh: 1.3 }, x: { _margin: dims(6, 0, 0, 0) } }),
                text('<p>' + esc(t.d) + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 15, lh: 1.6 }, x: { _margin: dims(6, 0, 0, 0) } })
              ])))
          ])
        ])
      ])
    ]));

    /* CONDITIONS */
    out.push(section({ x: { _element_id: 'conditions', css_classes: 'ex-anchor' } }, [
      C(gridC('minmax(0,1fr) minmax(0,1.5fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(64), grid_align_items: 'start' }), [
        C({ flex_align_items: 'flex-start' }, [
          eyebrow('How We Can Help', { x: { _element_width: 'inherit' } }),
          h2('Conditions ' + esc(s.name) + ' can help with', { t: { s: 48, lh: 1.08, ls: -0.03 }, o: { x: { _margin: dims(24, 0, 0, 0) } } }),
          text("<p>Not sure if your problem is on the list? Call us — if we're not the right fit, we'll tell you honestly and point you to who is.</p>", { t: { s: 18, lh: 1.7 }, x: { _margin: dims(18, 0, 0, 0) } }),
          button('Call 0121 751 2440', 'tel:+441217512440', { kind: 'outline', h: 52, pl: 26, pr: 26, x: { _margin: dims(26, 0, 0, 0) } })
        ]),
        C(grid(2, { grid_columns_grid_mobile: fr(1), grid_gaps: gaps(18, 28) }), s.conds.map(([n, k]) =>
          C({ html_tag: 'a', link: { url: CPAGE[k] || '/', is_external: '', nofollow: '' }, flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(16) }, [
            image(T[k], '', { x: { width: px(84), height: px(84), 'object-fit': 'cover', image_border_radius: all(3), _flex_size: 'none' } }),
            heading(esc(n), { tag: 'span', t: { f: IN, s: 19, w: 500, lh: 1.3 } })
          ])))
      ])
    ]));

    /* WHAT TO EXPECT */
    out.push(section({ pt: 100, pb: 108, ptm: 64, pbm: 64, x: { _element_id: 'expect', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#4F5945' } }, [
      eyebrow('Your First Appointment', { light: true, pb: 18 }),
      h2('What to expect at your first ' + esc(s.short) + ' appointment', { t: { s: 48, lh: 1.08, ls: -0.03 }, o: { color: '#F5F2EA',
        x: { _margin: dims(28, 0, 0, 0), _element_width: 'initial', _element_custom_width: px(760), _element_custom_width_tablet: pct(100) } } }),
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(48, 0, 0, 0) }), D.steps.map(st =>
        C({ flex_gap: gap(14), padding: dims(30, 28, 32, 28), border_radius: all(3), background_background: 'classic', background_color: 'rgba(245,242,234,0.08)',
          border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.18)' }, [
          heading(st.n, { tag: 'span', color: '#E6E0D5', t: { s: 52, lh: 1, ls: -0.04 } }),
          heading(esc(st.t), { tag: 'h3', color: '#F5F2EA', t: { s: 22, w: 500, ls: -0.015, lh: 1.25 } }),
          text('<p>' + esc(st.d) + '</p>', { color: 'rgba(245,242,234,0.82)', t: { s: 15, lh: 1.65 } })
        ])))
    ]));

    /* TEAM */
    out.push(section({}, [
      eyebrow('Meet the Team'),
      h2('Your ' + esc(s.short) + ' team', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(2), grid_gaps: gaps(20), grid_gaps_mobile: gaps(16), margin: dims(40, 0, 0, 0) }), s.team.map(k => {
        const p = people[k];
        return C({ html_tag: 'a', link: { url: PEOPLE[k], is_external: '', nofollow: '' } }, [
          p.img ? image(p.img, p.name, { x: { _css_classes: 'ex-ratio-34', image_border_radius: all(3) } })
            : C({ css_classes: 'ex-ratio-box', background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3), flex_justify_content: 'flex-end', padding: all(14) },
              [heading('[Headshot]', { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 12, lh: 1.4 } })]),
          heading(esc(p.name), { tag: 'h3', t: { s: 22, ls: -0.015, lh: 1.3 }, x: { _margin: dims(16, 0, 0, 0) } }),
          heading(esc(p.role), { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 14, lh: 1.6 } }),
          text('<p>' + esc(p.bio) + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 15, lh: 1.6 }, x: { _margin: dims(10, 0, 0, 0) } }),
          heading('View Profile →', { tag: 'span', color: '#4F5945', t: { f: IN, s: 14, w: 500, lh: 1.6 }, x: { _margin: dims(10, 0, 0, 0) } })
        ]);
      }))
    ]));

    /* REVIEWS (placeholders) */
    const stars = () => heading('★★★★★', { tag: 'span', color: '#E0A800', t: { f: IN, s: 16, lh: 1.4 }, x: { typography_letter_spacing: px(2) } });
    out.push(section({ pt: 96, pb: 96, ptm: 64, pbm: 64, x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(24) }, [
        C({ css_classes: 'ex-fit' }, [
          heading('Patient Stories', { tag: 'p', color: '#4F5945', t: { f: IN, s: 13, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 }, x: { _css_classes: 'ex-eyebrow' } }),
          h2('What our ' + esc(s.short) + ' patients say', { o: { x: { _margin: dims(20, 0, 0, 0) } } })
        ]),
        C({ css_classes: 'ex-fit', flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(14), padding: dims(16, 22, 16, 22), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
          heading('Google', { tag: 'span', t: { f: IN, s: 14, w: 600, lh: 1.4 } }), heading('[5.0]', { tag: 'span', t: { s: 26, lh: 1.2 } }), stars()
        ])
      ]),
      C(grid(3, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(20), margin: dims(40, 0, 0, 0) }), [1, 2, 3].map(() =>
        C({ padding: all(30), flex_gap: gap(14), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
          stars(),
          text("<p>“[Paste a real Google review that mentions " + esc(s.short) + " — in the patient's own words.]”</p>", { t: { s: 16, lh: 1.7 }, x: { _flex_size: 'grow' } }),
          heading('[Patient name]', { tag: 'span', t: { f: IN, s: 14, w: 600, lh: 1.4 } })
        ])))
    ]));

    /* FAQS */
    out.push(section({ x: { _element_id: 'faqs', css_classes: 'ex-anchor' } }, [
      C(gridC('minmax(0,1fr) minmax(0,1.5fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(64), grid_align_items: 'start' }), [
        C({}, [
          eyebrow('FAQs'),
          h2('Your ' + esc(s.short) + ' questions, answered', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
          text("<p>Can't see your question? Our reception team is happy to help.</p>", { t: { s: 17, lh: 1.7 }, x: { _margin: dims(18, 0, 0, 0) } })
        ]),
        faqAccordion(s.faqs)
      ])
    ]));

    /* WORKS WELL WITH */
    const rel = D.related.filter(r => r.k !== key);
    const tones = ['#7B826C', '#7D7868', '#8C8471', '#4F5945', '#857C69'];
    out.push(section({ pt: 96, pb: 100, ptm: 64, pbm: 64, x: { overflow: 'hidden', background_background: 'classic', background_color: '#E6E0D5' } }, [
      eyebrow('Works Well With'),
      h2('Integrated care under one roof', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
      C({ margin: dims(36, 0, 0, 0) }, [W('nested-carousel', {
        carousel_items: rel.map(r => ({ _id: EX.rid(), slide_title: r.name })),
        slides_to_show: '4', slides_to_show_tablet: '2', slides_to_show_mobile: '1', slides_to_scroll: '1',
        offset_sides: 'right', offset_width: px(0), offset_width_tablet: px(150), offset_width_mobile: px(70),
        image_spacing_custom: px(14), image_spacing_custom_tablet: px(12), image_spacing_custom_mobile: px(12),
        arrows: 'yes', pagination: '', autoplay: '', loop: '', navigation_previous_icon: icon('left'), navigation_next_icon: icon('right'),
        arrows_size: px(24), arrow_normal_color: '#F5F2EA', arrow_hover_color: '#F5F2EA', arrows_normal_background_background: 'classic', arrows_normal_background_color: '#4F5945',
        arrows_hover_background_background: 'classic', arrows_hover_background_color: '#272B26', arrows_border_radius: all(3), arrows_padding: all(18), _css_classes: 'ex-carousel'
      }, rel.map((r, i) => C({ padding: all(0) }, [photoCard(r.name, PAGE[r.k], r.img, tones[i % 5], 'ex-card-600')])))])
    ]));

    /* LOGOS + BOOK */
    out.push(EX.HOME.logos());
    out.push(section({ x: { _element_id: 'book', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#272B26', background_image: img(s.heroImg),
      background_position: 'center center', background_size: 'cover', background_overlay_background: 'classic', background_overlay_color: '#272B26', background_overlay_opacity: { unit: 'px', size: 0.78, sizes: [] } } }, [
      C(grid(2, { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(48), grid_align_items: 'center' }), [
        C({}, [
          heading('Book Today', { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
          h2('Book your ' + esc(s.short) + ' appointment today', { t: { s: 48, lh: 1.08, ls: -0.025 }, o: { color: '#F5F2EA', x: { _margin: dims(14, 0, 0, 0) } } }),
          text('<p>In pain, stuck with a niggle that keeps coming back, or just want a proper assessment? Book online or call 0121 751 2440. No GP referral needed.</p>',
            { color: 'rgba(245,242,234,0.8)', t: { s: 18, lh: 1.7 }, x: { _margin: dims(18, 0, 0, 0), _element_width: 'initial', _element_custom_width: px(520), _element_custom_width_tablet: pct(100) } })
        ]),
        C({ flex_gap: gap(14) }, [
          EX.bookCard('Book an Appointment', 'Pick a time online in under a minute.', L.book, { background_background: 'classic', background_color: '#4F5945' }),
          EX.bookCard('Call 0121 751 2440', 'Speak to a real person about whether ' + esc(s.short) + ' is right for you.', 'tel:+441217512440',
            { border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.35)', background_background: 'classic', background_color: 'rgba(39,43,38,0.4)' })
        ])
      ])
    ]));

    await EX.clearPage();
    for (const m of out) await EX.insert(m);
    return out.length;
  };
})();
