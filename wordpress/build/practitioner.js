/* Exhale Osteopathy — practitioner profile (rebuilt from source/Practitioner.dc.html). 5 pages:
   EX.buildPractitioner(key, data) with data = wordpress/data/practitioners.json. Needs treatment.js (EX.tx). */
(function () {
  const { C, W, px, pct, dims, all, gap, section, heading, text, eyebrow, button, image, img, icon, IT, IN } = EX;
  const L = EX.L;
  const { grid, gridC, fr, gaps, h2, circle, photoCard, esc, amp, PEOPLE } = EX.tx;
  const TPAGE = { 'Service.dc.html': L.osteo, 'Physiotherapy.dc.html': L.physio, 'Massage.dc.html': L.massage, 'Laser.dc.html': L.laser, 'Cranial.dc.html': L.cranial,
    'Paediatric.dc.html': L.babies, 'Pregnancy.dc.html': L.preg, 'Acupuncture.dc.html': L.acu, 'Rehab.dc.html': L.rehab, 'Shockwave.dc.html': L.shock, 'Ultrasound.dc.html': L.us };
  const INTNAME = { back: 'Back Pain', neck: 'Neck & Shoulders', sciatica: 'Sciatica', shoulder: 'Shoulder Pain', head: 'Headaches & Tension', hip: 'Hip Pain',
    knee: 'Knee Pain', ankle: 'Sports Injuries', posture: 'Postural Strain', joint: 'Muscle Tension', baby: 'Babies & Children' };
  const label = (t, color) => heading(t, { tag: 'h3', color: color || '#4F5945', t: { f: IN, s: 12, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 } });
  const LOGOH = { 'General Osteopathic Council': ['fd147b5fe67c84b8213ca8698b4d19c5', 38, 91], 'The Institute of Osteopathy': ['2327180f75ec1201c108d81a10773018', 46, 47],
    'HCPC registered': ['3bf80f0bb880bf686723d71a92a87e30', 46, 45], 'APPI': ['0b1f164aa218fea261047c24cd9adf5a', 48, 48] };

  EX.buildPractitioner = async function (key, D) {
    const p = D.P[key];
    const out = [];
    const tones = ['#7B826C', '#7D7868', '#8C8471', '#4F5945', '#857C69'];

    /* HERO: text left, portrait right (sits on the section's bottom edge) */
    out.push(section({ pt: 160, pb: 0, ptm: 144, pbm: 0, x: { background_background: 'classic', background_color: '#272B26',
      custom_css: 'selector::before{content:"";position:absolute;left:0;right:0;top:96px;height:1px;background:rgba(245,242,234,.1);z-index:1}' } }, [
      C(gridC('minmax(0,1.15fr) minmax(0,1fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(64), grid_align_items: 'end' }), [
        C({ padding: dims(0, 0, 72, 0), padding_tablet: dims(0, 0, 0, 0) }, [
          heading('<a href="/">Home</a> <span aria-hidden="true">→</span> <a href="/#team">Our Team</a> <span aria-hidden="true">→</span> <strong>' + esc(p.name) + '</strong>',
            { tag: 'p', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 15, lh: 1.6 }, x: { _css_classes: 'ex-on-dark ex-crumbs ex-crumbs--88' } }),
          heading(esc(p.role), { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 13, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 }, x: { _css_classes: 'ex-eyebrow ex-eyebrow--mush ex-eyebrow--g12', _margin: dims(40, 0, 0, 0) } }),
          heading(esc(p.name), { tag: 'h1', color: '#F5F2EA', t: { s: 72, st: 46, sm: 36, lh: 1, lhm: 1.08, ls: -0.04 }, x: { _margin: dims(20, 0, 0, 0) } }),
          heading(esc(p.reg), { tag: 'p', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 15, lh: 1.75, ls: 0.02 }, x: { _margin: dims(14, 0, 0, 0) } }),
          text('<p>' + esc(p.lead) + '</p>', { color: 'rgba(245,242,234,0.88)', t: { s: 19, lh: 1.65 },
            x: { _margin: dims(24, 0, 0, 0), _element_width: 'initial', _element_custom_width: px(600), _element_custom_width_tablet: pct(100) } }),
          C({ flex_gap: gap(10), margin: dims(26, 0, 0, 0) }, p.creds.map(cr => C({ flex_direction: 'row', flex_align_items: 'flex-start', flex_gap: gap(12) }, [
            circle('tick', 22, 13, { color: '#E6E0D5', box: { background_background: 'classic', background_color: 'rgba(123,130,108,0.25)', margin: dims(3, 0, 0, 0) } }),
            text('<p>' + esc(cr) + '</p>', { color: 'rgba(245,242,234,0.9)', t: { s: 16, lh: 1.75 } })
          ]))),
          C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(14), margin: dims(36, 0, 0, 0) }, [
            button('Book with ' + esc(p.first), '#book', { kind: 'ivory', h: 62, fs: 18, icon: 'right', split: true, minw: 280, pl: 32, pr: 28 }),
            button('Treatments', '#treatments', { kind: 'outline-light', h: 62, fs: 18, icon: 'right', split: true, minw: 240, pl: 32, pr: 28 })
          ])
        ]),
        C({ css_classes: 'ex-rel', flex_justify_content: 'flex-end' }, [
          p.portrait ? image(p.portrait, 'Portrait of ' + amp(p.name), { x: { _css_classes: 'ex-ratio-45 ex-pos-top ex-round-top' } })
            : C({ css_classes: 'ex-ratio-45-box', background_background: 'classic', background_color: '#272B26', flex_justify_content: 'center', flex_align_items: 'center',
              border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.12)' },
              [heading('[Portrait of ' + esc(p.name) + ']', { tag: 'span', color: 'rgba(245,242,234,0.5)', t: { f: IN, s: 13, ls: 0.16, tt: 'uppercase' } })]),
          C({ css_classes: 'ex-float-card ex-float-card--hi', padding: dims(18, 22, 18, 22), flex_gap: gap(2), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
            heading('Available at', { tag: 'span', color: '#4F5945', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
            heading(esc(p.clinics), { tag: 'span', t: { s: 18, ls: -0.01, lh: 1.4 } }),
            heading(esc(p.days), { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 14, lh: 1.75 } })
          ])
        ])
      ])
    ]));

    /* AT A GLANCE */
    out.push(section({ pt: 0, pb: 0, ptm: 0, pbm: 0, x: { background_background: 'classic', background_color: '#4F5945' } }, [
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(0) }), p.facts.map(f =>
        C({ padding: dims(26, 24, 26, 0), border_border: 'solid', border_width: dims(0, 1, 0, 0), border_color: 'rgba(245,242,234,0.14)' }, [
          heading(esc(f.k), { tag: 'span', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 12, ls: 0.16, tt: 'uppercase', lh: 1.35 } }),
          heading(esc(f.v), { tag: 'span', color: '#F5F2EA', t: { s: 22, ls: -0.01, lh: 1.35 }, x: { _margin: dims(4, 0, 0, 0) } })
        ])))
    ]));

    /* ABOUT + SIDEBAR */
    out.push(section({}, [
      C(gridC('minmax(0,1.5fr) minmax(0,1fr)', { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(72), grid_align_items: 'start' }), [
        C({}, [
          eyebrow('About ' + esc(p.first)),
          h2(esc(p.aboutTitle), { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
          ...p.bio.map(b => text('<p>' + esc(b) + '</p>', { t: { s: 18, lh: 1.8 }, x: { _margin: dims(20, 0, 0, 0) } })),
          C({ html_tag: 'figure', margin: dims(40, 0, 0, 0), padding: dims(32, 36, 32, 36), padding_mobile: dims(26, 24, 26, 24), background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3) }, [
            W('icon', { selected_icon: icon('quote'), primary_color: '#B7AA99', size: px(34), align: 'left', _css_classes: 'ex-icon-fill' }),
            heading(esc(p.quote), { tag: 'p', t: { s: 26, st: 22, lh: 1.35, ls: -0.015 }, x: { _margin: dims(12, 0, 0, 0) } }),
            heading('— ' + esc(p.name), { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 14, lh: 1.75 }, x: { _margin: dims(14, 0, 0, 0) } })
          ])
        ]),
        C({ html_tag: 'aside', css_classes: 'ex-sticky', flex_gap: gap(18) }, [
          C({ background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3), padding: dims(28, 26, 28, 26) }, [
            label('Qualifications'),
            C({ margin: dims(14, 0, 0, 0) }, p.quals.map(q => C({ padding: dims(12, 0, 12, 0), border_border: 'solid', border_width: dims(0, 0, 1, 0), border_color: '#B7AA99' }, [
              heading(esc(q.t), { tag: 'span', t: { f: IN, s: 16, w: 500, lh: 1.4 } }),
              heading(esc(q.d), { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 14, lh: 1.4 } })
            ]))),
            heading('Registered with', { tag: 'h3', color: '#4F5945', t: { f: IN, s: 12, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 }, x: { _margin: dims(24, 0, 0, 0) } }),
            C({ flex_direction: 'row', flex_wrap: 'wrap', flex_align_items: 'center', flex_gap: gap(16, 22), margin: dims(14, 0, 0, 0) },
              (p.logos || []).map(l => { const m = LOGOH[l.alt]; return image(m[0], l.alt, { x: { height: px(m[1]), width: px(m[2]), _element_width: 'auto' } }); }))
          ]),
          C({ background_background: 'classic', background_color: '#272B26', border_radius: all(3), padding: dims(26, 24, 26, 24) }, [
            heading('Book with ' + esc(p.first), { tag: 'span', color: '#F5F2EA', t: { s: 22, ls: -0.015, lh: 1.25 } }),
            heading(esc(p.clinics) + ' · No GP referral', { tag: 'span', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 14, lh: 1.75 }, x: { _margin: dims(6, 0, 0, 0) } }),
            button('Book online', L.book, { kind: 'olive', h: 48, fs: 15, x: { align: 'justify', _margin: dims(18, 0, 0, 0) } }),
            button('0121 751 2440', 'tel:+441217512440', { kind: 'outline-light', bd: 'rgba(245,242,234,0.35)', h: 48, fs: 15, x: { align: 'justify', _margin: dims(10, 0, 0, 0) } })
          ])
        ])
      ])
    ]));

    /* SPECIAL INTERESTS */
    out.push(section({ pt: 96, pb: 96, ptm: 64, pbm: 64, x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      eyebrow('Special Interests'),
      h2('What ' + esc(p.first) + ' helps with most', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(36, 0, 0, 0) }), p.interests.map(k =>
        C({ background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3), padding: all(0), overflow: 'hidden' }, [
          image(D.T[k], '', { x: { _css_classes: 'ex-ratio-1610' } }),
          C({ padding: dims(20, 22, 24, 22) }, [
            heading(esc(INTNAME[k]), { tag: 'h3', t: { s: 20, w: 500, ls: -0.01, lh: 1.3 } }),
            text('<p>' + esc(D.INT[k]) + '</p>', { color: 'rgba(39,43,38,0.84)', t: { s: 15, lh: 1.6 }, x: { _margin: dims(6, 0, 0, 0) } })
          ])
        ])))
    ]));

    /* TREATMENTS */
    out.push(section({ x: { _element_id: 'treatments', css_classes: 'ex-anchor' } }, [
      eyebrow('Treatments'),
      h2('Book ' + esc(p.first) + ' for', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(14), margin: dims(36, 0, 0, 0) }), p.treatments.map((k, i) => {
        const t = D.TREAT[k];
        return photoCard(t.name, TPAGE[t.href] || '/', t.img, tones[i % 5], 'ex-card-560');
      }))
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

    /* OUTSIDE THE CLINIC */
    out.push(section({}, [
      C(grid(2, { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(72), grid_align_items: 'center' }), [
        p.action ? image(p.action, amp(p.first) + ' treating a patient', { x: { _css_classes: 'ex-ratio-54', image_border_radius: all(3) } })
          : C({ css_classes: 'ex-ratio-54-box', background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3), flex_justify_content: 'center', flex_align_items: 'center' },
            [heading('[Photo of ' + esc(p.first) + ' treating]', { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 13, ls: 0.14, tt: 'uppercase' } })]),
        C({}, [
          eyebrow('Outside the Clinic'),
          h2('A little more about ' + esc(p.first), { t: { s: 40, st: 32, sm: 28, lh: 1.12, ls: -0.025 }, o: { x: { _margin: dims(24, 0, 0, 0) } } }),
          text('<p>' + esc(p.outside) + '</p>', { t: { s: 18, lh: 1.8 }, x: { _margin: dims(20, 0, 0, 0) } }),
          C({ flex_direction: 'row', flex_wrap: 'wrap', flex_gap: gap(10), margin: dims(24, 0, 0, 0) }, p.tags.map(t =>
            heading(esc(t), { tag: 'span', color: '#4F5945', t: { f: IN, s: 14, w: 500, lh: 1.5 },
              x: { _element_width: 'auto', _background_background: 'classic', _background_color: '#E6E0D5', _padding: dims(8, 14, 8, 14), _border_radius: all(999) } })))
        ])
      ])
    ]));

    /* REVIEWS */
    const stars = () => heading('★★★★★', { tag: 'span', color: '#E0A800', t: { f: IN, s: 16, lh: 1.4 }, x: { typography_letter_spacing: px(2) } });
    out.push(section({ pt: 96, pb: 96, ptm: 64, pbm: 64, x: { background_background: 'classic', background_color: '#E6E0D5' } }, [
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'flex-end', flex_gap: gap(24) }, [
        C({ css_classes: 'ex-shrink' }, [
          heading('Patient Stories', { tag: 'p', color: '#4F5945', t: { f: IN, s: 13, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 }, x: { _css_classes: 'ex-eyebrow' } }),
          h2('What patients say about ' + esc(p.first), { o: { x: { _margin: dims(20, 0, 0, 0) } } })
        ]),
        C({ css_classes: 'ex-fit', flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(14), padding: dims(16, 22, 16, 22), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
          heading('Google', { tag: 'span', t: { f: IN, s: 14, w: 600, lh: 1.75 } }), heading('[5.0]', { tag: 'span', t: { s: 26, lh: 1.2 } }), stars()
        ])
      ]),
      C(grid(3, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(1), grid_gaps: gaps(20), margin: dims(40, 0, 0, 0) }), [1, 2, 3].map(() =>
        C({ padding: all(30), flex_gap: gap(14), background_background: 'classic', background_color: '#F5F2EA', border_radius: all(3) }, [
          stars(),
          text("<p>“[Paste a real Google review that mentions " + esc(p.first) + " — in the patient's own words.]”</p>", { t: { s: 16, lh: 1.7 }, x: { _flex_size: 'grow' } }),
          heading('[Patient name]', { tag: 'span', t: { f: IN, s: 14, w: 600, lh: 1.75 } })
        ])))
    ]));

    /* REST OF THE TEAM */
    const others = Object.keys(D.P).filter(k => k !== key);
    out.push(section({ x: { _element_id: 'team', css_classes: 'ex-anchor', overflow: 'hidden' } }, [
      eyebrow('Our Team'),
      h2('Meet the rest of the team', { o: { x: { _margin: dims(24, 0, 0, 0) } } }),
      C(grid(4, { grid_columns_grid_tablet: fr(2), grid_columns_grid_mobile: fr(2), grid_gaps: gaps(20), grid_gaps_mobile: gaps(16), margin: dims(40, 0, 0, 0) }), others.map(k => {
        const o = D.P[k];
        return C({ html_tag: 'a', link: { url: PEOPLE[k], is_external: '', nofollow: '' } }, [
          o.portrait ? image(o.portrait, o.name, { x: { _css_classes: 'ex-ratio-34 ex-pos-top', image_border_radius: all(3) } })
            : C({ css_classes: 'ex-ratio-box', background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3), flex_justify_content: 'flex-end', padding: all(14) },
              [heading('[Headshot]', { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 12, lh: 1.4 } })]),
          heading(esc(o.name), { tag: 'h3', t: { s: 22, ls: -0.015, lh: 1.3 }, x: { _margin: dims(16, 0, 0, 0) } }),
          heading(esc(o.role), { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 14, lh: 1.75 } }),
          heading('View Profile →', { tag: 'span', color: '#4F5945', t: { f: IN, s: 14, w: 500, lh: 1.75 }, x: { _margin: dims(8, 0, 0, 0) } })
        ]);
      }))
    ]));

    /* LOGOS + BOOK */
    out.push(EX.HOME.logos());
    out.push(section({ x: { _element_id: 'book', css_classes: 'ex-anchor', background_background: 'classic', background_color: '#272B26' } }, [
      C(grid(2, { grid_columns_grid_tablet: fr(1), grid_gaps: gaps(48), grid_align_items: 'center' }), [
        C({}, [
          heading('Book Today', { tag: 'p', color: '#E6E0D5', t: { f: IN, s: 11, w: 600, ls: 0.18, tt: 'uppercase', lh: 1.6 } }),
          h2('Book an appointment with ' + esc(p.first), { t: { s: 48, lh: 1.08, ls: -0.025 }, o: { color: '#F5F2EA', x: { _margin: dims(14, 0, 0, 0) } } }),
          text('<p>Book online in under a minute, or call 0121 751 2440 and ask for ' + esc(p.first) + '. No GP referral needed.</p>',
            { color: 'rgba(245,242,234,0.8)', t: { s: 18, lh: 1.7 }, x: { _margin: dims(18, 0, 0, 0), _element_width: 'initial', _element_custom_width: px(520), _element_custom_width_tablet: pct(100) } })
        ]),
        C({ flex_gap: gap(14) }, [
          EX.bookCard('Book with ' + esc(p.first), 'See ' + esc(p.first) + '’s next available appointments.', L.book, { background_background: 'classic', background_color: '#4F5945' }),
          EX.bookCard('New Patients', 'See how your first appointment works, from arrival to treatment plan.', '/#expect',
            { border_border: 'solid', border_width: all(1), border_color: 'rgba(245,242,234,0.3)' })
        ])
      ])
    ]));

    await EX.clearPage();
    for (const m of out) await EX.insert(m);
    return out.length;
  };
})();
