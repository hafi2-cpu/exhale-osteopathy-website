// Builds the redesigned Exhale footer for template 105 (services/general) and 186 (conditions).
// Run inside that footer's own Elementor editor: (window.buildFooter)(105|186, oldElements)
window.buildFooter = function (pid, old) {
  var uid = function () { return elementorCommon.helpers.getUniqueId(); };
  var find = function (arr, id) { for (var i = 0; i < arr.length; i++) { var e = arr[i]; if (e.id === id) return e; var r = find(e.elements || [], id); if (r) return r; } return null; };
  var C = { sage: '#56684F', deep: '#4A5B44', ink: '#22302A', gold: '#C9A86A', goldH: '#B8975A', cream: '#F5F2EA', sand: '#EDE5D6', soft: 'rgba(245,242,234,0.82)', line: 'rgba(245,242,234,0.16)' };
  var px = function (n) { return { unit: 'px', size: n, sizes: [] }; };
  var box = function (t, r, b, l) { return { unit: 'px', top: String(t), right: String(r), bottom: String(b), left: String(l), isLinked: false }; };
  var font = function (size, weight, lh, extra) { var o = { typography_typography: 'custom', typography_font_family: 'Inter', typography_font_size: px(size), typography_font_weight: String(weight), typography_line_height: { unit: 'em', size: lh, sizes: [] } }; for (var k in extra || {}) o[k] = extra[k]; return o; };
  var merge = function () { var o = {}; for (var i = 0; i < arguments.length; i++) for (var k in arguments[i]) o[k] = arguments[i][k]; return o; };
  var con = function (settings, kids, inner) { return { id: uid(), elType: 'container', isInner: inner !== false, settings: merge({ content_width: 'full' }, settings), elements: kids || [] }; };
  var w = function (type, settings) { return { id: uid(), elType: 'widget', widgetType: type, isInner: false, settings: settings, elements: [] }; };
  var label = function (txt) { return w('heading', merge({ title: txt, header_size: 'h3', title_color: C.gold }, font(12, 600, 1.4, { typography_letter_spacing: { unit: 'em', size: 0.16, sizes: [] }, typography_text_transform: 'uppercase' }))); };
  var text = function (html, extra) { return w('text-editor', merge({ editor: html, text_color: C.soft, _css_classes: 'ex-list ex-on-dark' }, font(15, 400, 1.75), { _margin: box(18, 0, 0, 0) }, extra || {})); };
  var src = function (id) { var e = find(old, id); return e ? e.settings.editor : ''; };

  var isCond = pid === 186;
  var colThree = isCond ? { title: 'What We Treat', html: src('4906f0a') } : { title: 'Treatments', html: src('969ce31') };
  var clinicsHtml = src(isCond ? '68e6f9a' : '897a8a4').replace(/<\/p>\s*<p>Lichfield/, '</p><hr class="ex-ft-sep"><p>Lichfield');
  var book = 'https://exhale-osteopaths.uk2.cliniko.com/bookings?business_id=1358847506980544559#service';
  var maps = 'https://www.google.com/maps/search/?api=1&query=Exhale+Osteopathy+Sutton+Coldfield';

  // 1. Brand band
  var brand = con({ flex_direction: 'column', flex_gap: { unit: 'px', size: 18, column: '18', row: '18', isLinked: true }, width: { unit: '%', size: 100, sizes: [] } }, [
    w('image', { image: { id: 430, url: 'https://hafir61.sg-host.com/wp-content/uploads/2026/10/exhale-logo-white.png', alt: 'Exhale Osteopathy' }, image_size: 'full', width: px(200), width_mobile: px(170), align: 'left', link_to: 'custom', link: { url: '/', is_external: '', nofollow: '' } }),
    w('text-editor', merge({ editor: '<p>Hands-on osteopathy, physiotherapy and massage in Sutton Coldfield, helping people across Birmingham move better and feel better.</p>', text_color: 'rgba(245,242,234,0.9)' }, font(17, 400, 1.6), { _element_width: 'initial', _element_custom_width: px(460), _element_custom_width_mobile: { unit: '%', size: 100, sizes: [] } }))
  ]);
  var stars = w('text-editor', merge({ editor: '<p><span class="ex-ft-stars">★★★★★</span> <strong>5.0</strong> on Google reviews</p>', text_color: C.cream }, font(14, 400, 1.4)));
  var btnBase = merge(font(15, 500, 1.2), { border_radius: { unit: 'px', top: '3', right: '3', bottom: '3', left: '3', isLinked: true }, text_padding: box(16, 24, 16, 24) });
  var ctas = con({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'flex-end', flex_justify_content_mobile: 'flex-start', flex_gap: { unit: 'px', size: 12, column: '12', row: '12', isLinked: true } }, [
    w('button', merge(btnBase, { text: 'Book an appointment', link: { url: book, is_external: '', nofollow: '' }, button_text_color: C.ink, background_color: C.gold, hover_color: C.ink, button_background_hover_color: C.goldH, size: 'sm' })),
    w('button', merge(btnBase, { text: '0121 751 2440', link: { url: 'tel:+441217512440', is_external: '', nofollow: '' }, button_text_color: C.cream, background_color: 'rgba(0,0,0,0)', hover_color: C.ink, button_background_hover_color: C.cream, border_border: 'solid', border_width: { unit: 'px', top: '1', right: '1', bottom: '1', left: '1', isLinked: true }, border_color: 'rgba(245,242,234,0.55)', size: 'sm', _css_classes: 'ex-ft-outline' }))
  ]);
  var cta = con({ flex_direction: 'column', flex_gap: { unit: 'px', size: 16, column: '16', row: '16', isLinked: true }, flex_align_items: 'flex-end', flex_align_items_mobile: 'flex-start', width: { unit: '%', size: 50, sizes: [] }, width_mobile: { unit: '%', size: 100, sizes: [] } }, [stars, ctas]);
  var band = con({ flex_direction: 'row', flex_direction_mobile: 'column', flex_justify_content: 'space-between', flex_align_items: 'center', flex_align_items_mobile: 'flex-start', flex_gap: { unit: 'px', size: 32, column: '32', row: '32', isLinked: true }, padding: box(0, 0, 40, 0), border_border: 'solid', border_width: box(0, 0, 1, 0), border_color: C.line }, [brand]);

  // 2. Columns
  var contactList = w('icon-list', merge({
    icon_list: [
      { _id: uid(), text: '1 Sutton Oak Corner, Streetly, Sutton Coldfield, B74 2DH', selected_icon: { value: 'fas fa-map-marker-alt', library: 'fa-solid' }, link: { url: maps, is_external: 'on', nofollow: '' } },
      { _id: uid(), text: '0121 751 2440', selected_icon: { value: 'fas fa-phone-alt', library: 'fa-solid' }, link: { url: 'tel:+441217512440', is_external: '', nofollow: '' } },
      { _id: uid(), text: 'info@exhaleosteopathy.co.uk', selected_icon: { value: 'fas fa-envelope', library: 'fa-solid' }, link: { url: 'mailto:info@exhaleosteopathy.co.uk', is_external: '', nofollow: '' } }
    ],
    icon_color: C.gold, text_color: C.soft, text_color_hover: C.cream, icon_size: px(15), text_indent: px(12), space_between: px(14), icon_self_vertical_align: 'flex-start', _margin: box(18, 0, 0, 0)
  }, { icon_typography_typography: 'custom', icon_typography_font_family: 'Inter', icon_typography_font_size: px(15), icon_typography_line_height: { unit: 'em', size: 1.6, sizes: [] } }));
  var directions = w('text-editor', merge({ editor: '<p><a class="ex-ft-arrow" href="' + maps + '" target="_blank" rel="noopener">Get directions →</a></p>', text_color: C.gold, _margin: box(14, 0, 0, 0) }, font(14, 500, 1.4)));
  var hours = text('<div class="ex-ft-hours"><div><span>Monday – Friday</span><span>09:00 – 20:00</span></div><div><span>Saturday</span><span>08:00 – 14:00</span></div><div><span>Sunday</span><span>Closed</span></div></div><p class="ex-ft-note">Evening and Saturday appointments available.</p>');
  var col = function (kids) { return con({ flex_direction: 'column' }, kids); };
  var oldGrid = find(old, isCond ? '3636476' : 'f6acc73');
  var gridSettings = merge(oldGrid ? oldGrid.settings : {}, { margin: box(0, 0, 0, 0) });
  var grid = { id: uid(), elType: 'container', isInner: true, settings: gridSettings, elements: [
    col([label('Get in touch'), contactList, directions]),
    col([label('Opening hours'), hours]),
    col([label(colThree.title), text(colThree.html)]),
    col([label('Our clinics'), text(clinicsHtml)])
  ] };

  // 3. Accreditations
  var chip = function (id, url, alt) { return w('image', { image: { id: id, url: url, alt: alt }, image_size: 'full', height: px(36), height_mobile: px(30), object_fit: 'contain', _css_classes: 'ex-ft-chip' }); };
  var accred = con({ flex_direction: 'row', flex_wrap: 'wrap', flex_align_items: 'center', flex_gap: { unit: 'px', size: 12, column: '12', row: '12', isLinked: true }, margin: box(52, 0, 0, 0) }, [
    w('heading', merge({ title: 'Registered with', header_size: 'p', title_color: 'rgba(245,242,234,0.7)', _margin: box(0, 8, 0, 0), _css_classes: 'ex-ft-accred-label' }, font(12, 600, 1.4, { typography_letter_spacing: { unit: 'em', size: 0.16, sizes: [] }, typography_text_transform: 'uppercase' }))),
    chip(1890, 'https://hafir61.sg-host.com/wp-content/uploads/2026/10/exhale-gosc-transparent.png', 'General Osteopathic Council'),
    chip(39, 'https://hafir61.sg-host.com/wp-content/uploads/2026/10/exhale-io.png', 'Institute of Osteopathy'),
    chip(35, 'https://hafir61.sg-host.com/wp-content/uploads/2026/10/exhale-hcpc.png', 'Health and Care Professions Council')
  ]);

  // 4. Bottom bar (reuse old, keep only working policy link)
  var oldBottom = JSON.parse(JSON.stringify(find(old, isCond ? '18e3711' : '2f3ac53')));
  oldBottom.settings.margin = box(32, 0, 0, 0);
  (oldBottom.elements || []).forEach(function (e) { if (/Privacy Policy/.test(e.settings.title || '')) e.settings.title = '<a href="/privacy-policy">Privacy Policy</a>'; });

  var root = JSON.parse(JSON.stringify(old[0]));
  root.settings.padding = box(80, 30, 36, 30);
  root.settings.padding_mobile = box(56, 16, 32, 16);
  root.settings.custom_css = [
    'selector .ex-ft-stars{color:' + C.gold + ';letter-spacing:2px;margin-right:4px}',
    'selector .ex-ft-hours{display:grid;gap:10px}',
    'selector .ex-ft-hours>div{display:flex;justify-content:space-between;gap:16px;padding-bottom:10px;border-bottom:1px solid ' + C.line + '}',
    'selector .ex-ft-hours span:last-child{color:' + C.cream + ';white-space:nowrap}',
    'selector .ex-ft-note{margin-top:14px;font-size:13px;opacity:.85}',
    'selector .ex-ft-chip{width:auto!important}',
    'selector .ex-ft-chip img{width:auto!important;max-width:none!important;height:36px!important;background:' + C.cream + ';border-radius:6px;padding:8px 14px;box-sizing:content-box;display:block}',
    'selector .ex-ft-outline .elementor-button{color:' + C.cream + '!important;background:transparent!important;border:1px solid rgba(245,242,234,0.55)!important}',
    'selector .ex-ft-outline .elementor-button:hover{color:' + C.ink + '!important;background:' + C.cream + '!important}',
    '@media (max-width:767px){selector .ex-ft-accred-label{width:100%}selector .ex-ft-chip img{height:30px!important;padding:7px 12px}selector .elementor-widget-button{width:100%!important;max-width:100%!important}selector .elementor-widget-button .elementor-button{width:100%;justify-content:center}}',
    'selector .ex-ft-sep{border:0;border-top:1px solid ' + C.line + ';margin:18px 0;height:0}',
    'selector .ex-ft-arrow{color:' + C.gold + ';text-decoration:none}',
    'selector .ex-ft-arrow:hover{color:' + C.cream + '}',
    'selector .elementor-icon-list-item a:hover .elementor-icon-list-text{color:' + C.cream + '}'
  ].join('\n');
  root.elements = [grid, accred, oldBottom];
  return [root];
};
