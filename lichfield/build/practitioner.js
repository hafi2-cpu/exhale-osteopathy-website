/* Lichfield Osteopathic Practice: practitioner profile, same template as Exhale (source/Practitioner.dc.html).
   EX.buildPractitioner(key, data) with data = lichfield/data/practitioners.json. Needs treatment.js (EX.tx).
   Same sections as the Exhale profiles. Quotes, special interests and credentials come from each person's
   live Lichfield bio; reviews and "outside the clinic" are left out until real content is supplied. */
(function () {
  const { C, W, px, pct, dims, all, gap, section, heading, text, eyebrow, button, image, img, icon, IT, IN } = EX;
  const L = EX.L, SITE = EX.SITE;
  const { grid, gridC, fr, gaps, h2, circle, photoCard, esc, amp, PEOPLE, PAGE } = EX.tx;
  const label = (t, color) => heading(t, { tag: 'h3', color: color || '#4F5945', t: { f: IN, s: 12, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 } });
  const TREAT = { osteo: ['Osteopathy', 'osteo-arm'], paediatric: ['Baby & Paediatric Osteopathy', 'cranial-baby'], massage: ['Sports & Deep Tissue Massage', 'massage-stock'] };

  EX.buildPractitioner = async function (key, D) {
    const p = D.P[key];
    const person = EX.TEAM.find(t => t.k === key);
    const out = [];
    const tones = ['#7B826C', '#7D7868', '#8C8471', '#4F5945', '#857C69'];

    /* HERO: text left, portrait right (sits on the section's bottom edge) */
    out.push(section({ pt: 160, pb: 0, ptm: 144, pbm: 0, x: { background_background: 'classic', background_color: '#272B26',
      custom_css: 'selector::before{content:"";position:absolute;left:0;right:0;top:96px;height:1px;background:rgba(245,242,234,.1);z-index:1}' } }, [
      C(gridC('minmax(0,1.15fr) minmax(0,1fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(64), grid_align_items: 'end' }), [
        C({ padding: dims(0, 0, 72, 0), padding_tablet: dims(0, 0, 0, 0) }, [
          heading('<a href="/">Home</a> <span aria-hidden="true">→</span> <a href="' + L.team + '">Our Team</a> <span aria-hidden="true">→</span> <strong>' + esc(p.name) + '</strong>',
            { tag: 'p', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 15, lh: 1.6 }, x: { _css_classes: 'ex-on-dark ex-crumbs ex-crumbs--88' } }),
          heading(esc(p.role), { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 13, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 }, x: { _css_classes: 'ex-eyebrow ex-eyebrow--mush ex-eyebrow--g12', _margin: dims(40, 0, 0, 0) } }),
          heading(esc(p.name), { tag: 'h1', color: '#F5F2EA', t: { s: 72, st: 46, sm: 36, lh: 1, lhm: 1.08, ls: -0.04 }, x: { _margin: dims(20, 0, 0, 0) } }),
          ...(p.reg ? [heading(esc(p.reg), { tag: 'p', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 15, lh: 1.75, ls: 0.02 }, x: { _margin: dims(14, 0, 0, 0) } })] : []),
          text('<p>' + esc(p.lead) + '</p>', { color: 'rgba(245,242,234,0.88)', t: { s: 19, lh: 1.65 },
            x: { _margin: dims(24, 0, 0, 0), _element_width: 'initial', _element_custom_width: px(600), _element_custom_width_tablet: pct(100) } }),
          C({ flex_gap: gap(10), margin: dims(26, 0, 0, 0) }, p.creds.map(cr => C({ flex_direction: 'row', flex_align_items: 'flex-start', flex_gap: gap(12) }, [
            circle('tick', 22, 13, { color: '#E6E0D5', box: { background_background: 'classic', background_color: 'rgba(123,130,108,0.25)', margin: dims(3, 0, 0, 0) } }),
            text('<p>' + esc(cr) + '</p>', { color: 'rgba(245,242,234,0.9)', t: { s: 16, lh: 1.75 } })
          ]))),
          C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(14), margin: dims(36, 0, 0, 0) }, [
            button('Book with ' + esc(p.first), L.book, { kind: 'ivory', h: 62, fs: 18, icon: 'right', split: true, minw: 280, pl: 32, pr: 28 }),
            button('Treatments', '#treatments', { kind: 'outline-light', h: 62, fs: 18, icon: 'right', split: true, minw: 240, pl: 32, pr: 28 })
          ])
        ]),
        C({ css_classes: 'ex-rel', flex_justify_content: 'flex-end' }, [
          image(p.portrait, 'Portrait of ' + amp(p.name), { x: { _css_classes: 'ex-ratio-45 ex-pos-top ex-round-top' } }),
          C({ css_classes: 'ex-float-card ex-float-card--hi', padding: dims(18, 22, 18, 22), flex_gap: gap(2), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
            heading('In clinic at Lichfield', { tag: 'span', color: '#4F5945', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
            heading(esc(person.days), { tag: 'span', t: { s: 18, ls: -0.01, lh: 1.4 } }),
            heading(person.times.map(([d, t]) => d.slice(0, 3) + ' ' + t.replace(/ – /g, '–')).join(' · '), { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 14, lh: 1.75 } })
          ])
        ])
      ])
    ]));

    /* AT A GLANCE */
    out.push(section({ pt: 0, pb: 0, ptm: 0, pbm: 0, x: { background_background: 'classic', background_color: '#4F5945' } }, [
      C(grid(p.facts.length, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(0), css_classes: 'ex-strip' }), p.facts.map(f =>
        C({ padding: dims(26, 24, 26, 0), border_border: 'solid', border_width: dims(0, 1, 0, 0), border_color: 'rgba(245,242,234,0.14)' }, [
          heading(esc(f.k), { tag: 'span', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 12, ls: 0.16, tt: 'uppercase', lh: 1.35 } }),
          heading(esc(f.v), { tag: 'span', color: '#F5F2EA', t: { s: 22, ls: -0.01, lh: 1.35 }, x: { _margin: dims(4, 0, 0, 0) } })
        ])))
    ]));

    /* ABOUT + SIDEBAR */
    out.push(section({ x: { _element_id: 'about', css_classes: 'ex-anchor' } }, [
      C(gridC('minmax(0,1.5fr) minmax(0,1fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(72), grid_align_items: 'start' }), [
        C({}, [
          eyebrow('About ' + esc(p.first)),
          h2(esc(p.aboutTitle), { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
          ...p.bio.map(b => text('<p>' + esc(b) + '</p>', { t: { s: 18, lh: 1.8 }, x: { _margin: dims(20, 0, 0, 0) } })),
          ...(p.quote ? [C({ html_tag: 'figure', margin: dims(40, 0, 0, 0), padding: dims(32, 36, 32, 36), padding_mobile: dims(26, 24, 26, 24), background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3) }, [
            W('icon', { selected_icon: icon('quote'), primary_color: '#B7AA99', size: px(34), align: 'left', _css_classes: 'ex-icon-fill' }),
            heading(esc(p.quote), { tag: 'p', t: { s: 26, st: 22, lh: 1.35, ls: -0.015 }, x: { _margin: dims(12, 0, 0, 0) } }),
            ...(p.quoteBy ? [heading(esc(p.quoteBy), { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 14, lh: 1.75 }, x: { _margin: dims(14, 0, 0, 0) } })] : [])
          ])] : [])
        ]),
        C({ html_tag: 'aside', css_classes: 'ex-sticky', flex_gap: gap(18) }, [
          C({ background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3), padding: dims(28, 26, 28, 26) }, [
            label('Qualifications'),
            C({ margin: dims(14, 0, 0, 0) }, p.quals.map(q => C({ padding: dims(12, 0, 12, 0), border_border: 'solid', border_width: dims(0, 0, 1, 0), border_color: '#B7AA99' }, [
              heading(esc(q.t), { tag: 'span', t: { f: IN, s: 16, w: 500, lh: 1.4 } }),
              ...(q.d ? [heading(esc(q.d), { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 14, lh: 1.4 } })] : [])
            ]))),
            label('Days at Lichfield'),
            C({ margin: dims(10, 0, 0, 0), flex_gap: gap(4) }, person.times.map(([d, t]) => C({ flex_direction: 'row', flex_justify_content: 'space-between', flex_gap: gap(16) }, [
              heading(d, { tag: 'span', color: 'rgba(39,43,38,0.84)', t: { f: IN, s: 15, lh: 1.75 } }), heading(t, { tag: 'span', t: { f: IN, s: 15, lh: 1.75 }, x: { _flex_size: 'none' } })]))),
            ...(p.gosc ? [label('Registered with'), image('gosc', 'General Osteopathic Council', { x: { height: px(38), width: px(91), _element_width: 'auto', _margin: dims(14, 0, 0, 0) } })] : [])
          ]),
          C({ background_background: 'classic', background_color: '#272B26', border_radius: all(3), padding: dims(26, 24, 26, 24) }, [
            heading('Book with ' + esc(p.first), { tag: 'span', color: '#F5F2EA', t: { s: 22, ls: -0.015, lh: 1.25 } }),
            heading('30 Rotten Row, Lichfield', { tag: 'span', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 14, lh: 1.75 }, x: { _margin: dims(6, 0, 0, 0) } }),
            button('Book online', L.book, { kind: 'olive', h: 48, fs: 15, x: { align: 'justify', _margin: dims(18, 0, 0, 0) } }),
            button(SITE.phone, SITE.tel, { kind: 'outline-light', bd: 'rgba(245,242,234,0.35)', h: 48, fs: 15, x: { align: 'justify', _margin: dims(10, 0, 0, 0) } })
          ])
        ])
      ])
    ]));

    /* SPECIAL INTERESTS */
    out.push(section({ pt: 96, pb: 96, ptm: 64, pbm: 64, x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      eyebrow('Special Interests'),
      h2('What ' + esc(p.first) + ' helps with most', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(36, 0, 0, 0) }), p.interests.map(it =>
        C({ background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3), padding: all(0), overflow: 'hidden' }, [
          image(it.img, '', { x: { _css_classes: 'ex-ratio-1610' } }),
          C({ padding: dims(20, 22, 24, 22) }, [
            heading(esc(it.t), { tag: 'h3', t: { s: 20, w: 500, ls: -0.01, lh: 1.3 } }),
            text('<p>' + esc(it.d) + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 15, lh: 1.6 }, x: { _margin: dims(6, 0, 0, 0) } })
          ])
        ])))
    ]));

    /* TREATMENTS */
    out.push(section({ x: { _element_id: 'treatments', css_classes: 'ex-anchor' } }, [
      eyebrow('Treatments'),
      h2('Book ' + esc(p.first) + ' for', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
      C(grid(3, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(36, 0, 0, 0) }), p.treatments.map((k, i) =>
        photoCard(TREAT[k][0], PAGE[k], TREAT[k][1], tones[i % 5], 'ex-card-560')))
    ]));

    /* CREDENTIALS */
    out.push(section({ x: { background_background: 'classic', background_color: '#4F5945' } }, [
      eyebrow('Credentials &amp; Experience', { light: true, pb: 18 }),
      h2(esc(p.credTitle), { o: { color: '#F5F2EA', x: { _margin: dims(28, 0, 0, 0), _element_width: 'initial', _element_custom_width: px(760), _element_custom_width_tablet: pct(100) } } }),
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(44, 0, 0, 0) }), p.recognition.map(r =>
        C({ flex_gap: gap(12), padding: dims(28, 26, 30, 26), border_radius: all(3), background_background: 'classic', background_color: 'rgba(245,242,234,0.08)',
          border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.18)' }, [
          circle('award', 46, 20, { color: '#E6E0D5', box: { border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.35)' } }),
          heading(esc(r.t), { tag: 'h3', color: '#F5F2EA', t: { s: 21, w: 500, ls: -0.015, lh: 1.25 } }),
          text('<p>' + esc(r.d) + '</p>', { color: 'rgba(245,242,234,0.82)', t: { s: 15, lh: 1.6 } })
        ])))
    ]));

    /* REST OF THE TEAM */
    const others = EX.TEAM.filter(t => t.k !== key);
    out.push(section({ x: { _element_id: 'team', css_classes: 'ex-anchor', overflow: 'hidden' } }, [
      eyebrow('Our Team'),
      h2('Meet the rest of the team', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(2), grid_gaps: gaps(20), grid_gaps_mobile: gaps(16), margin: dims(40, 0, 0, 0) }), others.map(o =>
        C({ html_tag: 'a', link: { url: o.href, is_external: '', nofollow: '' } }, [
          image(o.photo, o.name, { x: { _css_classes: 'ex-ratio-34 ex-pos-top', image_border_radius: all(3) } }),
          heading(esc(o.name), { tag: 'h3', t: { s: 22, ls: -0.015, lh: 1.3 }, x: { _margin: dims(16, 0, 0, 0) } }),
          heading(esc(o.role), { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 14, lh: 1.75 } }),
          heading('View Profile →', { tag: 'span', color: '#4F5945', t: { f: IN, s: 14, w: 500, lh: 1.75 }, x: { _margin: dims(8, 0, 0, 0) } })
        ])))
    ]));

    /* LOGOS + BOOK */
    out.push(EX.HOME.logos());
    out.push(section({ x: { _element_id: 'book', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#272B26' } }, [
      C(grid(2, { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(48), grid_align_items: 'center' }), [
        C({}, [
          heading('Book Today', { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
          h2('Book an appointment with ' + esc(p.first), { t: { s: 48, lh: 1.08, ls: -0.025 }, o: { color: '#F5F2EA', x: { _margin: dims(14, 0, 0, 0) } } }),
          text('<p>Book online, or call ' + SITE.phone + ' and ask for ' + esc(p.first) + '.</p>',
            { color: 'rgba(245,242,234,0.8)', t: { s: 18, lh: 1.7 }, x: { _margin: dims(18, 0, 0, 0), _element_width: 'initial', _element_custom_width: px(520), _element_custom_width_tablet: pct(100) } })
        ]),
        C({ flex_gap: gap(14) }, [
          EX.bookCard('Book with ' + esc(p.first), 'See ' + esc(p.first) + '’s next available appointments.', L.book, { background_background: 'classic', background_color: '#4F5945' }),
          EX.bookCard('Call ' + SITE.phone, 'Speak to us before you book.', SITE.tel,
            { border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.3)' })
        ])
      ])
    ]));

    await EX.clearPage();
    for (const m of out) await EX.insert(m);
    return out.length;
  };
})();
