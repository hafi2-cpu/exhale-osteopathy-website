/* Lichfield Osteopathic Practice: footer (Elementor Pro Theme Builder "footer" template).
   Same layout as the redesigned Exhale footer (28 Oct 2026): four columns (Get in touch, Opening hours,
   Treatments, Our team), a "Registered with" row and a bottom bar. Built from scratch here because the
   Exhale footer builder edits the existing Exhale template in place. Needs lib.js and site.js. */
(function () {
  const { C, W, px, dims, all, gap, heading, text, image, IN } = EX;
  const L = EX.L, SITE = EX.SITE;
  const PALE = '#D7D6A4';                       // live "accent" colour: labels and links on the dark footer
  const SOFT = 'rgba(245,242,234,0.82)', LINE = 'rgba(245,242,234,0.16)';
  const font = (s, w, lh, extra) => Object.assign(EX.typo({ f: IN, s, w, lh }), extra || {});
  const label = (t) => W('heading', Object.assign({ title: t, header_size: 'h3', title_color: PALE }, font(12, 600, 1.4, { typography_letter_spacing: { unit: 'em', size: 0.16, sizes: [] }, typography_text_transform: 'uppercase' })));
  const body = (html, extra) => W('text-editor', Object.assign({ editor: html, text_color: SOFT, _css_classes: 'ex-list ex-on-dark' }, font(15, 400, 1.75), { _margin: dims(18, 0, 0, 0) }, extra || {}));

  EX.buildFooter = async function () {
    const contact = W('icon-list', Object.assign({
      icon_list: [
        { _id: EX.rid(), text: SITE.addr, selected_icon: { value: 'fas fa-map-marker-alt', library: 'fa-solid' }, link: { url: L.maps, is_external: 'on', nofollow: '' } },
        { _id: EX.rid(), text: SITE.phone, selected_icon: { value: 'fas fa-phone-alt', library: 'fa-solid' }, link: { url: SITE.tel, is_external: '', nofollow: '' } },
        { _id: EX.rid(), text: SITE.email, selected_icon: { value: 'fas fa-envelope', library: 'fa-solid' }, link: { url: 'mailto:' + SITE.email, is_external: '', nofollow: '' } }
      ],
      icon_color: PALE, text_color: SOFT, text_color_hover: '#F5F2EA', icon_size: px(15), text_indent: px(12), space_between: px(14), icon_self_vertical_align: 'flex-start', _margin: dims(18, 0, 0, 0)
    }, { icon_typography_typography: 'custom', icon_typography_font_family: 'Inter', icon_typography_font_size: px(15), icon_typography_line_height: { unit: 'em', size: 1.6, sizes: [] } }));
    const directions = W('text-editor', Object.assign({ editor: '<p><a class="ex-ft-arrow" href="' + L.dir + '" target="_blank" rel="noopener">Get directions →</a></p>', text_color: PALE, _margin: dims(14, 0, 0, 0) }, font(14, 500, 1.4)));
    const hours = body('<div class="ex-ft-hours">' + SITE.hours.map(([d, t]) => '<div><span>' + d + '</span><span>' + t + '</span></div>').join('') + '</div><p class="ex-ft-note">Open 6 days a week.</p>');
    const treatments = body('<p><a href="' + L.osteo + '">Osteopathy</a></p><p><a href="' + L.babies + '">Cranial &amp; Baby Osteopathy</a></p><p><a href="' + L.massage + '">Sports &amp; Deep Tissue Massage</a></p><p><a href="' + L.massage + '">Pregnancy Massage</a></p><p><a href="' + L.fees + '">Our Fees</a></p>');
    const team = body(EX.TEAM.map(p => '<p><a href="' + p.href + '">' + p.name + '</a></p>').join('') + '<p><a href="' + L.team + '">Meet the team →</a></p>');
    const col = (kids) => C({ padding: all(0) }, kids);
    const grid4 = C({ container_type: 'grid', grid_columns_grid: { unit: 'fr', size: 4, sizes: [] }, grid_columns_grid_tablet: { unit: 'fr', size: 2, sizes: [] }, grid_columns_grid_mobile: { unit: 'fr', size: 1, sizes: [] },
      grid_rows_grid: { unit: 'custom', size: 'auto', sizes: [] }, grid_gaps: { unit: 'px', column: '40', row: '44', isLinked: false }, padding: all(0) }, [
      col([label('Get in touch'), contact, directions]),
      col([label('Opening hours'), hours]),
      col([label('Treatments'), treatments]),
      col([label('Our team'), team])
    ]);
    const chip = (key, alt) => image(key, alt, { x: { height: px(36), height_mobile: px(30), object_fit: 'contain', _css_classes: 'ex-ft-chip' } });
    const accred = C({ flex_direction: 'row', flex_wrap: 'wrap', flex_align_items: 'center', flex_gap: gap(12), margin: dims(52, 0, 0, 0), padding: all(0) }, [
      W('heading', Object.assign({ title: 'Registered with', header_size: 'p', title_color: 'rgba(245,242,234,0.7)', _margin: dims(0, 8, 0, 0), _css_classes: 'ex-ft-accred-label' },
        font(12, 600, 1.4, { typography_letter_spacing: { unit: 'em', size: 0.16, sizes: [] }, typography_text_transform: 'uppercase' }))),
      chip('gosc', 'General Osteopathic Council')
    ]);
    const social = (href, ic, lbl) => W('icon', { selected_icon: { value: ic, library: 'fa-brands' }, link: { url: href, is_external: 'on', nofollow: '' }, primary_color: SOFT, hover_primary_color: '#F5F2EA', size: px(18), _element_width: 'auto', _css_classes: 'ex-ft-social', _attributes: 'aria-label|' + lbl });
    const bottom = C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_align_items: 'center', flex_gap: gap(16), margin: dims(32, 0, 0, 0),
      padding: dims(24, 0, 0, 0), border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: LINE }, [
      W('heading', Object.assign({ title: '© ' + new Date().getFullYear() + ' Lichfield Osteopathic Practice. Established 1983.', header_size: 'p', title_color: 'rgba(245,242,234,0.7)' }, font(13, 400, 1.6))),
      C({ css_classes: 'ex-fit', flex_direction: 'row', flex_align_items: 'center', flex_gap: gap(18), padding: all(0) }, [
        social(L.insta, 'fab fa-instagram', 'Instagram'), social(L.fb, 'fab fa-facebook-f', 'Facebook')
      ])
    ]);
    const css = [
      'selector .ex-ft-hours{display:grid;gap:10px}',
      'selector .ex-ft-hours>div{display:flex;justify-content:space-between;gap:16px;padding-bottom:10px;border-bottom:1px solid ' + LINE + '}',
      'selector .ex-ft-hours span:last-child{color:#F4EFEB;white-space:nowrap}',
      'selector .ex-ft-note{margin-top:14px;font-size:13px;opacity:.85}',
      'selector .ex-ft-chip{width:auto!important}',
      'selector .ex-ft-chip img{width:auto!important;max-width:none!important;height:36px!important;background:#F4EFEB;border-radius:6px;padding:8px 14px;box-sizing:content-box;display:block}',
      '@media (max-width:767px){selector .ex-ft-accred-label{width:100%}selector .ex-ft-chip img{height:30px!important;padding:7px 12px}}',
      'selector .ex-ft-arrow{color:' + PALE + ';text-decoration:none}',
      'selector .ex-ft-arrow:hover{color:#F4EFEB}',
      'selector .elementor-icon-list-item a:hover .elementor-icon-list-text{color:#F4EFEB}'
    ].join('\n');
    // Lichfield: near-black with an olive top rule, so the footer stands apart from the charcoal Book Today band above it
    const root = C({ content_width: 'boxed', html_tag: 'footer', background_background: 'classic', background_color: '#1F1F1F', __globals__: { background_color: 'globals/colors?id=lopink', border_color: 'globals/colors?id=secondary' },
      border_border: 'solid', border_width: dims(3, 0, 0, 0), border_color: '#949366',
      padding: dims(80, 30, 36, 30), padding_mobile: dims(56, 16, 32, 16), custom_css: css }, [grid4, accred, bottom]);
    await EX.clearPage();
    return EX.insert(root);
  };
})();
