/* Exhale Osteopathy — shared header (Elementor Pro Theme Builder "header" template).
   Desktop: logo · Mega Menu (Treatments, What We Treat and Our Team dropdowns) · Book Now.
   ≤1180px: Mega Menu hidden; ☰ button opens an Off-Canvas full-screen menu with accordions. */
(function () {
  const { C, W, px, em, pct, dims, all, gap, heading, text, button, image, img, icon, IT, IN } = EX;
  const L = EX.L;
  const hideBelowDesktop = { hide_tablet_extra: 'hidden-tablet_extra', hide_tablet: 'hidden-tablet', hide_mobile: 'hidden-mobile' };
  const desktopOnlyHidden = { hide_desktop: 'hidden-desktop' };
  const actionHash = (action, id) => '#' + encodeURIComponent('elementor-action:action=off_canvas:' + action + '&settings=' + btoa(JSON.stringify({ id, displayMode: action })));

  const TREAT = [
    ['Osteopathy & Wellbeing', [['Osteopathy', L.osteo, 'ecff3978d740e61ad991d87ac8ed9c80'], ['Cranial Osteopathy', L.cranial, '4abb3bc38e81b54f28716e660d7ac6bb'],
      ['Baby & Paediatric Osteopathy', L.babies, '4abb3bc38e81b54f28716e660d7ac6bb'], ['Pregnancy Osteopathy', L.preg, 'bad5ffe8e3d651f608eed6b8395755e1'],
      ['Sports Massage', L.massage, '6b36c7e66c35b11e6d4a167d6cd862ea'], ['Acupuncture', L.acu, '']]],
    ['Recovery & Performance', [['Physiotherapy', L.physio, 'c525025c94afa6c27f465df87630f2d5'], ['1-to-1 Rehab / Pilates', L.rehab, '69eda695c26e3fcc7ef14bd02b658884'],
      ['Shockwave Therapy', L.shock, '2ba8ade52a5466a109b0e50cb08b37f9'], ['Laser Therapy', L.laser, ''], ['Diagnostic Ultrasound', L.us, '45650fb355363711c837123b9102097b']]]
  ];
  const CONDS = [
    ['Spine & Head', [['Back Pain', L.back, 'bad5ffe8e3d651f608eed6b8395755e1'], ['Neck Pain', L.neck, 'ecff3978d740e61ad991d87ac8ed9c80'], ['Sciatica', L.sciatica, 'b4cbb771eeb8f8ab5dc8dc2aea17df46'],
      ['Headaches & Migraines', L.head, 'a6111fcfc10ade3e8e1ab9feee68d0bd'], ['TMJ / Jaw Pain', L.jaw, 'f8e9145ba19cb163a759ff111c5ad1b2']]],
    ['Joints & Injuries', [['Hip Pain', L.hip, '336754bc2f4144cf175e16e96253b0c6'], ['Knee Pain', L.knee, '45650fb355363711c837123b9102097b'], ['Foot & Ankle Pain', L.ankle, '2ba8ade52a5466a109b0e50cb08b37f9'],
      ['Shoulder Pain', L.shoulder, 'c525025c94afa6c27f465df87630f2d5'], ['Sports Injuries', L.sports, '69eda695c26e3fcc7ef14bd02b658884'], ['Tendon Problems', L.tendon, '6b36c7e66c35b11e6d4a167d6cd862ea']]]
  ];

  // Our Team dropdown (avatar crops of each headshot; Emre has no photo yet)
  const TEAM = [
    ['Osteopathy', [['Hafi Rahman', L.hafi, '707736522f4e7464c994a8b9b88b27b3', 'Founder &amp; Principal Osteopath'], ['Freta Teklensenbet', L.freta, '281742b2504bf22d441c896347616585', 'Registered Osteopath'],
      ['Ankita Desai', L.ankita, '3c84c3f41e71194a585fdbe2ba549b68', 'Registered Osteopath']]],
    ['Physiotherapy &amp; Massage', [['Emre Tosun', L.emre, '', 'Physiotherapist &amp; Personal Trainer'], ['Zoe Goodwin', L.zoe, '3145376680e5c707cbbb4e7924778e72', 'Sports Massage Therapist']]]
  ];

  const thumb = (asset, size) => asset
    ? image(asset, '', { x: { width: px(size), height: px(size), 'object-fit': 'cover', image_border_radius: all(3), _flex_size: 'none' } })
    : C({ background_background: 'classic', background_color: '#E6E0D5', border_radius: all(3), css_classes: 'ex-thumb-ph ex-thumb-ph--' + size }, []);
  const linkRow = ([name, href, asset, role], size, minh) => C({ html_tag: 'a', link: { url: href, is_external: '', nofollow: '' }, flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(14),
    padding: dims(size === 48 ? 6 : 8, 0, size === 48 ? 6 : 8, 0), min_height: minh ? px(minh) : undefined }, [
    thumb(asset, size),
    role ? C({ css_classes: 'ex-grow', padding: all(0) }, [heading(name, { tag: 'span', t: { f: IN, s: 17, w: 500, lh: 1.3 } }),
      heading(role, { tag: 'span', color: 'rgba(39,43,38,0.76)', t: { f: IN, s: 13, lh: 1.4 } })])
      : heading(name, { tag: 'span', t: { f: IN, s: 17, w: 500, lh: 1.3 } })
  ]);
  const colTitle = (t, small) => small
    ? heading(t, { tag: 'p', color: '#4F5945', t: { f: IN, s: 12, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 }, x: { _css_classes: 'ex-eyebrow ex-eyebrow--sm' } })
    : EX.eyebrow(t);

  // Desktop mega-menu panel
  const panel = (cols, footer) => C({ content_width: 'boxed', padding: dims(0, 30, 0, 30) }, [
    C({ background_background: 'classic', background_color: '#F5F2EA', padding: dims(34, 28, 30, 28), css_classes: 'ex-mega-panel' }, [
      C({ container_type: 'grid', grid_columns_grid: { unit: 'fr', size: 2, sizes: [] }, grid_rows_grid: { unit: 'custom', size: 'auto', sizes: [] },
        grid_gaps: { unit: 'px', column: '40', row: '40', isLinked: true } },
        cols.map(([t, items]) => C({}, [
          colTitle(t),
          C({ container_type: 'grid', grid_columns_grid: { unit: 'fr', size: 2, sizes: [] }, grid_rows_grid: { unit: 'custom', size: 'auto', sizes: [] },
            grid_gaps: { unit: 'px', column: '24', row: '8', isLinked: false }, margin: dims(18, 0, 0, 0) }, items.map(it => linkRow(it, 48)))
        ]))),
      ...(footer ? [footer] : [])
    ])
  ]);
  const condFooter = C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'center', flex_gap: gap(12),
    margin: dims(22, 0, 0, 0), padding: dims(18, 0, 0, 0), border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: '#B7AA99' }, [
    text('<p>Not sure what you need? Call <a href="tel:+441217512440" style="font-weight:500;text-decoration:underline;text-underline-offset:3px">0121 751 2440</a> and we’ll point you to the right person.</p>', { t: { s: 15, lh: 1.6 } }),
    heading('<a href="' + L.bham + '">Visiting from Birmingham? →</a>', { tag: 'p', color: '#4F5945', t: { f: IN, s: 15, w: 500, lh: 1.6 } })
  ]);

  const teamFooter = C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'flex-end', flex_align_items: 'center', flex_gap: gap(12),
    margin: dims(22, 0, 0, 0), padding: dims(18, 0, 0, 0), border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: '#B7AA99' }, [
    heading('<a href="' + L.about + '#team">Meet the whole team →</a>', { tag: 'p', color: '#4F5945', t: { f: IN, s: 15, w: 500, lh: 1.6 } })
  ]);

  const megaCss = [
    'selector .e-n-menu-title{padding:12px;background:transparent}',
    'selector .e-n-menu-title-container{gap:6px}',
    'selector .e-n-menu-dropdown-icon svg{width:14px;height:14px;fill:none;stroke:currentColor}',
    'selector .e-n-menu-dropdown-icon{transition:transform .2s}',
    'selector .e-n-menu-title[aria-expanded="true"] .e-n-menu-dropdown-icon, selector .e-n-menu-item:hover .e-n-menu-dropdown-icon{transform:rotate(180deg)}',
    'selector .e-n-menu-content{background:transparent}',
    'selector .ex-mega-panel{box-shadow:0 24px 60px rgba(39,43,38,.25)}',
    'selector .e-n-menu-title a,selector .e-n-menu-title-text{white-space:nowrap}'
  ].join('\n');

  const items = [['About', L.about], ['Treatments', '', TREAT], ['What We Treat', '', CONDS], ['Our Team', '', TEAM], ['Blog', L.blog], ['Pricing', L.fees], ['Contact', L.contact]];
  const mega = W('mega-menu', Object.assign({
    menu_items: items.map(([t, href, cols]) => Object.assign({ _id: EX.rid(), item_title: t, item_link: { url: href || '', is_external: '', nofollow: '' } },
      cols ? { item_dropdown_content: 'yes' } : { item_dropdown_content: '' })),
    item_layout: 'horizontal', open_on: 'hover', breakpoint_selector: 'none', content_width: 'full_width',
    item_position_horizontal: 'center', menu_item_title_space_between: px(6), menu_item_title_distance_from_content: px(20),
    menu_item_icon: icon('chevron'), menu_item_icon_active: icon('chevron'),
    menu_item_title_text_color_normal: '#F5F2EA', menu_item_title_text_color_hover: '#F5F2EA', menu_item_title_text_color_active: '#F5F2EA',
    custom_css: megaCss
  }, EX.typo({ f: IN, s: 16, w: 500, lh: 1.5 }, 'menu_item_title_typography'), hideBelowDesktop),
  items.map(([, , cols], i) => C({ padding: all(0) }, cols ? [panel(cols, i === 2 ? condFooter : i === 3 ? teamFooter : null)] : [])));

  // Off-canvas (mobile) menu
  const OC_ID = EX.rid();
  const bigRow = (label, href) => C({ html_tag: 'a', link: { url: href, is_external: '', nofollow: '' }, flex_direction: 'row', flex_justify_content: 'space-between', flex_align_items: 'center',
    flex_gap: gap(16), padding: dims(18, 0, 18, 0), border_border: 'solid', border_width: dims(0, 0, 1, 0), border_color: '#B7AA99' }, [
    heading(label, { tag: 'span', t: { s: 26, ls: -0.02, lh: 1.25 } }),
    W('icon', { selected_icon: icon('right'), primary_color: '#4F5945', size: px(20) })
  ]);
  const mobGroup = (cols) => C({ padding: dims(4, 0, 20, 0) }, cols.map(([t, list]) => C({ margin: dims(16, 0, 0, 0) }, [
    colTitle(t, true),
    C({ container_type: 'grid', grid_columns_grid: { unit: 'fr', size: 2, sizes: [] }, grid_columns_grid_tablet: { unit: 'fr', size: 2, sizes: [] }, grid_columns_grid_mobile: { unit: 'fr', size: 1, sizes: [] },
      grid_rows_grid: { unit: 'custom', size: 'auto', sizes: [] }, grid_gaps: { unit: 'px', column: '24', row: '2', isLinked: false }, margin: dims(8, 0, 0, 0) },
      list.map(it => linkRow(it, 44, 52)))
  ])));
  const accCss = [
    'selector .e-n-accordion-item{border:0;border-bottom:1px solid #B7AA99}',
    'selector .e-n-accordion-item-title{padding:18px 0;border:0;background:transparent;justify-content:space-between;flex-direction:row}',
    'selector .e-n-accordion-item-title-header{order:1;flex:1 1 auto;text-align:left;justify-content:flex-start}',
    'selector .e-n-accordion-item-title-icon{order:2;margin-left:auto}',
    'selector .e-n-accordion-item-title-icon{width:40px;height:40px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:#E6E0D5;color:#272B26;transition:transform .2s}',
    'selector .e-n-accordion-item[open] .e-n-accordion-item-title-icon{background:#4F5945;color:#F5F2EA;transform:rotate(45deg)}',
    'selector .e-n-accordion-item-title-icon svg{width:18px;height:18px;fill:none;stroke:currentColor}',
    'selector .e-n-accordion-item > [role="region"], selector .e-n-accordion-item > .e-con{border:0;padding:0}'
  ].join('\n');
  const accordion = W('nested-accordion', Object.assign({
    items: [{ _id: EX.rid(), item_title: 'Treatments' }, { _id: EX.rid(), item_title: 'What We Treat' }, { _id: EX.rid(), item_title: 'Our Team' }],
    accordion_item_title_icon: icon('plus'), accordion_item_title_icon_active: icon('plus'),
    title_color: '#272B26', custom_css: accCss, max_items_expended: 'one', default_state: 'all_collapsed'
  }, EX.typo({ f: IT, s: 26, w: 400, ls: -0.02, lh: 1.25 }, 'title_typography')), [
    C({ padding: all(0) }, [mobGroup(TREAT)]), C({ padding: all(0) }, [mobGroup(CONDS)]), C({ padding: all(0) }, [mobGroup(TEAM)])
  ]);
  // Real Exhale logo (white on dark heroes, colour on the light mobile menu). Media IDs 430 (white) / 431 (colour)
  const LOGO = { white: [430, 'exhale-logo-white.png'], colour: [431, 'exhale-logo-colour.png'] };
  const logo = (dark, h = 46, hm = 38) => {
    const L0 = LOGO[dark ? 'colour' : 'white'];
    return W('image', { image: { id: L0[0], url: location.origin + '/wp-content/uploads/2026/10/' + L0[1], alt: 'Exhale Osteopathy', source: 'library' }, image_size: 'full',
      link_to: 'custom', link: { url: '/', is_external: '', nofollow: '' }, height: px(h), height_tablet: px(hm), height_mobile: px(hm),
      _element_width: 'auto', _flex_size: 'none', _css_classes: 'ex-logo' });
  };
  const offcanvas = { id: OC_ID, elType: 'widget', widgetType: 'off-canvas', settings: {
      horizontal_position: 'right', width: { unit: 'vw', size: 100, sizes: [] }, height: 'custom', custom_height: { unit: 'vh', size: 100, sizes: [] },
      entrance_animation: 'fadeIn', exit_animation: 'fadeIn', prevent_scroll: 'yes',
      overlay_background_background: 'classic', overlay_background_color: 'rgba(0,0,0,0)',
      custom_css: 'selector .e-off-canvas__content{background:#F5F2EA;color:#272B26;overflow-y:auto}'
    }, elements: [
    C({ min_height: { unit: 'vh', size: 100, sizes: [] }, background_background: 'classic', background_color: '#F5F2EA', padding: all(0) }, [
      C({ flex_direction: 'row', flex_justify_content: 'space-between', flex_align_items: 'center', min_height: px(80), padding: dims(0, 16, 0, 16),
        border_border: 'solid', border_width: dims(0, 0, 1, 0), border_color: '#B7AA99' }, [
        logo(true, 38, 34),
        button('Close menu', actionHash('close', OC_ID), { kind: 'outline', h: 48, pl: 12, pr: 12, icon: 'close', x: { _css_classes: 'ex-icon-btn', icon_indent: px(0) } })
      ]),
      C({ content_width: 'boxed', boxed_width: px(900), padding: dims(4, 16, 24, 16), html_tag: 'nav' }, [
        accordion,
        bigRow('About', L.about), bigRow('Pricing', L.fees), bigRow('Blog', L.blog), bigRow('Contact', L.contact)
      ]),
      C({ margin: dims(0, 0, 0, 0), padding: dims(24, 16, 28, 16), background_background: 'classic', background_color: '#E6E0D5', css_classes: 'ex-push-bottom' }, [
        C({ content_width: 'boxed', boxed_width: px(900), flex_gap: gap(10), padding: all(0) }, [
          button('Book an appointment', L.book, { kind: 'olive', h: 56, fs: 17, x: { align: 'justify' } }),
          button('Call 0121 751 2440', 'tel:+441217512440', { kind: 'outline', h: 56, fs: 17, x: { align: 'justify', border_color: '#4F5945' } }),
          text('<p>Mon–Fri 09:00–20:00 · Sat 08:00–14:00<br>Sutton Coldfield · Lichfield</p>', { t: { s: 14, lh: 1.6 }, x: { align: 'center', _margin: dims(8, 0, 0, 0) } })
        ])
      ])
    ])
  ] };

  EX.buildHeader = async function () {
    await EX.clearPage();
    return EX.insert(C({ content_width: 'boxed', flex_direction: 'row', flex_justify_content: 'space-between', flex_align_items: 'center', flex_gap: gap(24),
      min_height: px(96), padding: dims(0, 30, 0, 30), padding_mobile: dims(0, 16, 0, 16), css_classes: 'ex-header', z_index: 50 }, [
      logo(false),
      mega,
      C({ flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(10), css_classes: 'ex-fit' }, [
        button('Book Now', L.book, { kind: 'olive', h: 52, fs: 16, pl: 30, pr: 30, x: { _css_classes: 'ex-hide-xs',
          text_padding_tablet: dims(13, 18, 13, 18), typography_font_size_tablet: px(15) } }),
        button('Open menu', actionHash('open', OC_ID), { kind: 'outline-light', bd: 'rgba(245,242,234,0.5)', h: 48, pl: 12, pr: 12, icon: 'menu',
          x: Object.assign({ _css_classes: 'ex-icon-btn', icon_indent: px(0) }, desktopOnlyHidden) }),
        offcanvas
      ])
    ]));
  };
})();
