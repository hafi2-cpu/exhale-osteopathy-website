/* Exhale Osteopathy — condition page (rebuilt from source/Condition.dc.html). One builder, 11 pages:
   EX.buildCondition(key, data) with data = wordpress/data/conditions.json. Needs treatment.js (EX.tx). */
(function () {
  const { C, W, px, pct, dims, all, gap, section, heading, text, eyebrow, button, image, img, icon, IT, IN } = EX;
  const L = EX.L;
  const { grid, gridC, fr, gaps, h2, circle, faqAccordion, esc, amp, PEOPLE } = EX.tx;
  const CPAGE = { back: L.back, neck: L.neck, shoulder: L.shoulder, hip: L.hip, knee: L.knee, foot: L.ankle, headaches: L.head, sciatica: L.sciatica,
    sports: L.sports, tendon: L.tendon, jaw: L.jaw };
  const TPAGE = { osteo: L.osteo, physio: L.physio, massage: L.massage, laser: L.laser, acu: L.acu, shock: L.shock, rehab: L.rehab, cranial: L.cranial, us: L.us, preg: L.preg };
  const FACTS = [['Seen by', 'Registered clinicians', 'user'], ['GP referral', 'Not needed', 'check'], ['Appointments', 'Evenings &amp; Saturdays', 'clock'], ['Clinics', 'Sutton &amp; Lichfield', 'pin']];
  const label = (t, color) => heading(t, { tag: 'span', color: color || '#4F5945', t: { f: IN, s: 12, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 } });
  const card = (els, o = {}) => C(Object.assign({ background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3), padding: dims(40, 40, 44, 40), padding_mobile: dims(30, 24, 32, 24) }, o), els);
  const row = (els, o = {}) => C(Object.assign({ flex_direction: 'row', flex_align_items: 'flex-start' }, o), els);
  const dot = (size, color, mt) => C({ css_classes: 'ex-dot', width: px(size), min_height: px(size), background_background: 'classic', background_color: color, border_radius: all(50, '%'), margin: dims(mt, 0, 0, 0), padding: all(0) }, []);

  EX.buildCondition = async function (key, D) {
    const c = D.C[key], people = D.people, TH = D.TH;
    const [hx, hy] = c.heroPos.split(' ').map(v => parseFloat(v));
    const out = [];

    /* HERO */
    out.push(section({ pt: 176, pb: 72, ptm: 160, pbm: 56, x: { min_height: px(640), flex_justify_content: 'flex-end',
      background_background: 'classic', background_color: '#272B26', background_image: img(c.hero), background_position: 'initial',
      background_xpos: pct(hx), background_ypos: pct(hy), background_size: 'cover', css_classes: 'ex-hero-side' } }, [
      heading('<a href="/">Home</a> <span aria-hidden="true">→</span> <a href="/#conditions">What We Treat</a> <span aria-hidden="true">→</span> <strong>' + esc(c.name) + '</strong>',
        { tag: 'p', color: 'rgba(245,242,234,0.8)', t: { f: IN, s: 15, lh: 1.6 }, x: { _css_classes: 'ex-on-dark ex-crumbs' } }),
      heading(esc(c.h1), { tag: 'h1', color: '#F5F2EA', t: { s: 62, st: 42, sm: 36, lh: 1.04, lhm: 1.08, ls: -0.035 },
        x: { _element_width: 'initial', _element_custom_width: px(820), _element_custom_width_tablet: pct(100), _margin: dims(22, 0, 0, 0) } }),
      text('<p>' + esc(c.lead) + '</p>', { color: 'rgba(245,242,234,0.88)', t: { s: 20, lh: 1.6 },
        x: { _element_width: 'initial', _element_custom_width: px(640), _element_custom_width_tablet: pct(100), _margin: dims(22, 0, 0, 0) } }),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_align_items: 'center', flex_gap: gap(14), margin: dims(36, 0, 0, 0) }, [
        button('Book an appointment', '#book', { kind: 'ivory', h: 62, fs: 18, icon: 'right', split: true, minw: 280, pl: 32, pr: 28 }),
        button('Call 0121 751 2440', 'tel:+441217512440', { kind: 'outline-light', h: 62, fs: 18, icon: 'right', split: true, minw: 260, pl: 32, pr: 28 }),
        C({ flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(14), css_classes: 'ex-fit', margin: dims(0, 0, 0, 12), margin_mobile: dims(0, 0, 0, 0) }, [
          C({ flex_direction: 'row', css_classes: 'ex-fit' }, ['3c84c3f41e71194a585fdbe2ba549b68', '3145376680e5c707cbbb4e7924778e72', '281742b2504bf22d441c896347616585'].map((a, i) =>
            image(a, '', { x: { width: px(44), height: px(44), 'object-fit': 'cover', image_border_border: 'solid', image_border_width: all(2), image_border_color: '#F5F2EA',
              image_border_radius: all(50, '%'), _margin: dims(0, 0, 0, i ? -10 : 0) } }))),
          heading('[5★] Google<br>Reviews', { tag: 'span', color: 'rgba(245,242,234,0.9)', t: { f: IN, s: 12, w: 500, ls: 0.18, tt: 'uppercase', lh: 1.5 } })
        ])
      ])
    ]));

    /* AT A GLANCE */
    out.push(section({ pt: 0, pb: 0, ptm: 0, pbm: 0, x: { background_background: 'classic', background_color: '#4F5945' } }, [
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(0) }), FACTS.map(([k, v, ic]) =>
        C({ flex_direction: 'row', css_classes: 'ex-nowrap', flex_align_items: 'center', flex_gap: gap(16), padding: dims(26, 24, 26, 0), border_border: 'solid', border_width: dims(0, 1, 0, 0), border_color: 'rgba(245,242,234,0.14)' }, [
          circle(ic, 44, 20, { color: '#E6E0D5', box: { border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.35)' } }),
          C({ css_classes: 'ex-grow' }, [heading(k, { tag: 'span', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 12, ls: 0.16, tt: 'uppercase', lh: 1.35 } }),
            heading(v, { tag: 'span', color: '#F5F2EA', t: { s: 19, ls: -0.01, lh: 1.35 } })])
        ])))
    ]));

    /* INTRO */
    out.push(section({ pt: 100, pb: 90, ptm: 64, pbm: 64 }, [
      C(gridC('minmax(0,1.1fr) minmax(0,1fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(72), grid_align_items: 'center' }), [
        C({}, [
          eyebrow(esc(c.name) + ' Treatment'),
          h2(esc(c.introTitle), { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
          ...c.intro.map(p => text('<p>' + esc(p) + '</p>', { t: { s: 18, lh: 1.75 }, x: { _margin: dims(20, 0, 0, 0) } }))
        ]),
        C({ position: 'relative', css_classes: 'ex-rel' }, [
          image(c.introImg, amp(c.introAlt || ''), { x: { _css_classes: 'ex-ratio-45', image_border_radius: all(3) } }),
          C({ css_classes: 'ex-float-card ex-fit', flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(14), padding: dims(20, 24, 20, 24), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
            heading('★★★★★', { tag: 'span', color: '#E0A800', t: { f: IN, s: 15, lh: 1.4 }, x: { typography_letter_spacing: px(2) } }),
            text('<p><strong>[5.0] on Google</strong><br>Trusted across Birmingham</p>', { t: { s: 14, lh: 1.4 } })
          ])
        ])
      ])
    ]));

    /* SYMPTOMS + CAUSES */
    out.push(section({ pt: 96, pb: 96, ptm: 64, pbm: 64, x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      C(grid(2, { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(20) }), [
        card([label('Symptoms'), h2(esc(c.symTitle), { t: { s: 32, st: 32, sm: 28, lh: 1.15, ls: -0.02 }, o: { x: { _margin: dims(12, 0, 0, 0) } } }),
          C({ margin: dims(24, 0, 0, 0) }, c.symptoms.map(sy => row([dot(8, '#7B826C', 10), text('<p>' + esc(sy) + '</p>', { t: { s: 16, lh: 1.75 } })],
            { flex_gap: gap(14), padding: dims(12, 0, 12, 0), border_border: 'solid', border_width: dims(0, 0, 1, 0), border_color: '#B7AA99' })))]),
        card([label('Common Causes'), h2(esc(c.causeTitle), { t: { s: 32, st: 32, sm: 28, lh: 1.15, ls: -0.02 }, o: { x: { _margin: dims(12, 0, 0, 0) } } }),
          C({ margin: dims(24, 0, 0, 0) }, c.causes.map(cs => C({ padding: dims(12, 0, 12, 0), border_border: 'solid', border_width: dims(0, 0, 1, 0), border_color: '#B7AA99' }, [
            heading(esc(cs.t), { tag: 'span', t: { s: 18, lh: 1.5 } }),
            heading(esc(cs.d), { tag: 'span', color: 'rgba(39,43,38,0.84)', t: { f: IN, s: 15, lh: 1.5 } })])))])
      ])
    ]));

    /* HOW WE HELP */
    out.push(section({}, [
      eyebrow('How We Help'),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(24), margin: dims(24, 0, 0, 0) }, [
        h2(esc(c.helpTitle), { o: { x: { _element_width: 'initial', _element_custom_width: px(720), _element_custom_width_tablet: pct(100) } } }),
        text('<p>' + esc(c.helpLead) + '</p>', { t: { s: 17, lh: 1.7 }, x: { _element_width: 'initial', _element_custom_width: px(480), _element_custom_width_tablet: pct(100) } })
      ]),
      C(grid(3, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(40, 0, 0, 0) }), c.treats.map(([k, d], i) =>
        C({ html_tag: 'a', link: { url: TPAGE[k] || '/', is_external: '', nofollow: '' }, flex_gap: gap(10), background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3), padding: dims(30, 28, 30, 28) }, [
          heading('0' + (i + 1), { tag: 'span', color: '#4F5945', t: { s: 13, ls: 0.1, lh: 1.4 } }),
          heading(esc(D.TREAT[k][0]), { tag: 'h3', t: { s: 23, w: 500, ls: -0.015, lh: 1.25 } }),
          text('<p>' + esc(d) + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 15, lh: 1.65 }, x: { _flex_size: 'grow' } }),
          heading('About ' + esc(D.TREAT[k][0]) + ' →', { tag: 'span', color: '#4F5945', t: { f: IN, s: 14, w: 500, lh: 1.75 }, x: { _margin: dims(6, 0, 0, 0) } })
        ])))
    ]));

    /* SELF-HELP + RED FLAGS */
    out.push(section({ pt: 96, pb: 96, ptm: 64, pbm: 64, x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      C(gridC('minmax(0,1.3fr) minmax(0,1fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(20), grid_align_items: 'stretch' }), [
        card([label('Self-Help'), h2('Things you can do at home', { t: { s: 32, st: 32, sm: 28, lh: 1.15, ls: -0.02 }, o: { x: { _margin: dims(12, 0, 0, 0) } } }),
          C({ flex_gap: gap(14), margin: dims(22, 0, 0, 0) }, c.tips.map((tp, i) => row([
            heading('0' + (i + 1), { tag: 'span', color: '#4F5945', t: { s: 15, lh: 1.65 }, x: { _element_width: 'initial', _element_custom_width: px(28), _flex_size: 'none', _margin: dims(2, 0, 0, 0) } }),
            text('<p>' + esc(tp) + '</p>', { t: { s: 16, lh: 1.65 } })], { flex_gap: gap(16) })))]),
        card([
          row([circle('alert', 40, 20, { color: '#F2C14E', box: { background_background: 'classic', background_color: 'rgba(242,193,78,0.18)' } }), label('When to get urgent help', '#F2C14E')], { flex_align_items: 'center', flex_gap: gap(12) }),
          h2('Get urgent medical help — call 999 or 111, or go to A&amp;E — if you have:', { t: { s: 28, st: 28, sm: 26, lh: 1.2, ls: -0.02 }, o: { color: '#F5F2EA', x: { _margin: dims(16, 0, 0, 0) } } }),
          C({ flex_gap: gap(10), margin: dims(18, 0, 0, 0) }, c.redFlags.map(r => row([dot(6, '#F2C14E', 9), text('<p>' + esc(r) + '</p>', { color: 'rgba(245,242,234,0.88)', t: { s: 15, lh: 1.55 } })], { flex_gap: gap(12) }))),
          text('<p>' + esc(c.gpNote) + '</p>', { color: 'rgba(245,242,234,0.88)', t: { s: 14, lh: 1.6 }, x: { _margin: dims(20, 0, 0, 0) } })
        ], { background_color: '#272B26' })
      ])
    ]));

    /* WHAT TO EXPECT */
    out.push(section({ pt: 100, pb: 108, ptm: 64, pbm: 64, x: { background_background: 'classic', background_color: '#4F5945' } }, [
      eyebrow('Your First Appointment', { light: true, pb: 18 }),
      h2('What to expect when you come to us with ' + esc(c.lower), { t: { s: 46, lh: 1.08, ls: -0.03 }, o: { color: '#F5F2EA',
        x: { _margin: dims(28, 0, 0, 0), _element_width: 'initial', _element_custom_width: px(780), _element_custom_width_tablet: pct(100) } } }),
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
      h2("Who you'll see for " + esc(c.lower), { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(2), grid_gaps: gaps(20), grid_gaps_mobile: gaps(16), margin: dims(40, 0, 0, 0) }), c.team.map(k => {
        const p = people[k];
        return C({ html_tag: 'a', link: { url: PEOPLE[k], is_external: '', nofollow: '' } }, [
          p.img ? image(p.img, p.name, { x: { _css_classes: 'ex-ratio-34 ex-pos-top', image_border_radius: all(3) } })
            : C({ css_classes: 'ex-ratio-box', background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3), flex_justify_content: 'flex-end', padding: all(14) },
              [heading('[Headshot]', { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 12, lh: 1.4 } })]),
          heading(esc(p.name), { tag: 'h3', t: { s: 22, ls: -0.015, lh: 1.3 }, x: { _margin: dims(16, 0, 0, 0) } }),
          heading(esc(p.role), { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 14, lh: 1.75 } }),
          heading('View Profile →', { tag: 'span', color: '#4F5945', t: { f: IN, s: 14, w: 500, lh: 1.75 }, x: { _margin: dims(8, 0, 0, 0) } })
        ]);
      }))
    ]));

    /* REVIEWS */
    const stars = () => heading('★★★★★', { tag: 'span', color: '#E0A800', t: { f: IN, s: 16, lh: 1.4 }, x: { typography_letter_spacing: px(2) } });
    out.push(section({ pt: 96, pb: 96, ptm: 64, pbm: 64, x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(24) }, [
        C({ css_classes: 'ex-fit' }, [
          heading('Patient Stories', { tag: 'p', color: '#4F5945', t: { f: IN, s: 13, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 }, x: { _css_classes: 'ex-eyebrow' } }),
          h2(esc(c.reviewTitle), { o: { x: { _margin: dims(20, 0, 0, 0) } } })
        ]),
        C({ css_classes: 'ex-fit', flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(14), padding: dims(16, 22, 16, 22), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
          heading('Google', { tag: 'span', t: { f: IN, s: 14, w: 600, lh: 1.75 } }), heading('[5.0]', { tag: 'span', t: { s: 26, lh: 1.2 } }), stars()
        ])
      ]),
      C(grid(3, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(20), margin: dims(40, 0, 0, 0) }), [1, 2, 3].map(() =>
        C({ padding: all(30), flex_gap: gap(14), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
          stars(),
          text("<p>“[Paste a real Google review that mentions " + esc(c.lower) + " — in the patient's own words.]”</p>", { t: { s: 16, lh: 1.7 }, x: { _flex_size: 'grow' } }),
          heading('[Patient name]', { tag: 'span', t: { f: IN, s: 14, w: 600, lh: 1.75 } })
        ])))
    ]));

    /* FAQS */
    out.push(section({ x: { _element_id: 'faqs', css_classes: 'ex-anchor' } }, [
      C(gridC('minmax(0,1fr) minmax(0,1.5fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(64), grid_align_items: 'start' }), [
        C({}, [
          eyebrow('FAQs'),
          h2(esc(c.faqTitle), { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
          text('<p>Still unsure? Call our Sutton Coldfield clinic on 0121 751 2440 or Lichfield on 01543 252673.</p>', { t: { s: 17, lh: 1.7 }, x: { _margin: dims(18, 0, 0, 0) } })
        ]),
        faqAccordion(c.faqs)
      ])
    ]));

    /* AREAS WE COVER */
    out.push(section({ pt: 80, pb: 80, ptm: 64, pbm: 64, x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      label('Areas We Cover'),
      h2(esc(c.name + ' treatment for patients across Birmingham, Sutton Coldfield and Lichfield'), { t: { s: 34, st: 32, sm: 28, lh: 1.15, ls: -0.02 },
        o: { x: { _margin: dims(12, 0, 0, 0), _element_width: 'initial', _element_custom_width: px(860), _element_custom_width_tablet: pct(100) } } }),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(10), margin: dims(26, 0, 0, 0) }, D.areas.map(a =>
        heading(esc(a), { tag: 'span', color: '#4F5945', t: { f: IN, s: 15, w: 500, lh: 1.5 },
          x: { _element_width: 'auto', _background_background: 'classic', _background_color: '#F5F2EA', _padding: dims(10, 16, 10, 16), _border_radius: all(999) } }))),
      text('<p>Travelling from elsewhere in Birmingham? <a class="ex-underline-olive" href="' + L.bham + '">Read our guide for Birmingham patients</a> — where we are, parking and what to expect.</p>',
        { t: { s: 16, lh: 1.7 }, x: { _margin: dims(24, 0, 0, 0) } })
    ]));

    /* RELATED CONDITIONS */
    out.push(section({ pt: 96, pb: 96, ptm: 64, pbm: 64 }, [
      eyebrow('Related Conditions'),
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(18, 28), margin: dims(32, 0, 0, 0) }), c.related.map(k =>
        C({ html_tag: 'a', link: { url: CPAGE[k], is_external: '', nofollow: '' }, flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(16) }, [
          image(TH[k], '', { x: { width: px(84), height: px(84), 'object-fit': 'cover', image_border_radius: all(3), _flex_size: 'none' } }),
          heading(esc(D.PAGE[k][0]), { tag: 'span', t: { f: IN, s: 19, w: 500, lh: 1.3 } })
        ])))
    ]));

    /* LOGOS + BOOK */
    out.push(EX.HOME.logos());
    out.push(section({ x: { _element_id: 'book', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#272B26', background_image: img(c.hero),
      background_position: 'center center', background_size: 'cover', background_overlay_background: 'classic', background_overlay_color: '#272B26', background_overlay_opacity: { unit: 'px', size: 0.8, sizes: [] } } }, [
      C(grid(2, { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(48), grid_align_items: 'center' }), [
        C({}, [
          heading('Book Today', { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
          h2(esc(c.ctaTitle), { t: { s: 46, lh: 1.08, ls: -0.025 }, o: { color: '#F5F2EA', x: { _margin: dims(14, 0, 0, 0) } } }),
          text('<p>Evening and Saturday appointments in Sutton Coldfield and Lichfield. No GP referral needed — book online or call 0121 751 2440.</p>',
            { color: 'rgba(245,242,234,0.8)', t: { s: 18, lh: 1.7 }, x: { _margin: dims(18, 0, 0, 0), _element_width: 'initial', _element_custom_width: px(540), _element_custom_width_tablet: pct(100) } })
        ]),
        C({ flex_gap: gap(14) }, [
          EX.bookCard('Book an Appointment', 'Initial consultation &amp; treatment — £75.', L.book, { background_background: 'classic', background_color: '#4F5945' }),
          EX.bookCard('Call 0121 751 2440', 'Not sure what you need? Speak to our team.', 'tel:+441217512440',
            { border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.35)', background_background: 'classic', background_color: 'rgba(39,43,38,0.4)' })
        ])
      ])
    ]));

    await EX.clearPage();
    for (const m of out) await EX.insert(m);
    return out.length;
  };
})();
