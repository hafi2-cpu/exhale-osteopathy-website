/* Exhale Osteopathy — Elementor build helpers.
   Runs inside the Elementor editor. Everything it creates is a native
   Elementor container or widget, inserted with Elementor's own commands
   ($e.run 'document/elements/create'), so the result is fully editable. */
(function () {
  const SITE = location.origin;
  const rid = () => Math.random().toString(16).slice(2, 9);
  const px = (n) => ({ unit: 'px', size: n, sizes: [] });
  const em = (n) => ({ unit: 'em', size: n, sizes: [] });
  const pct = (n) => ({ unit: '%', size: n, sizes: [] });
  const dims = (t, r, b, l, u = 'px') => ({ unit: u, top: String(t), right: String(r), bottom: String(b), left: String(l), isLinked: false });
  const all = (n, u = 'px') => ({ unit: u, top: String(n), right: String(n), bottom: String(n), left: String(n), isLinked: true });
  const gap = (row, col = row) => ({ unit: 'px', size: col, column: String(col), row: String(row), isLinked: row === col });

  // Media Library IDs (design asset id -> [attachment id, file name])
  let MEDIA = {};
  const img = (assetId) => {
    const m = MEDIA[assetId];
    if (!m) throw new Error('missing media ' + assetId);
    return { id: m[0], url: SITE + '/wp-content/uploads/2026/10/' + m[1], alt: '', source: 'library' };
  };
  const ICON = {
    right: [75, 'exhale-icon-arrow-right.svg'], left: [76, 'exhale-icon-arrow-left.svg'],
    chevron: [77, 'exhale-icon-chevron-down.svg'], plus: [78, 'exhale-icon-plus.svg'],
    menu: [79, 'exhale-icon-menu.svg'], close: [80, 'exhale-icon-close.svg']
  };
  const icon = (k) => ({ value: { id: ICON[k][0], url: SITE + '/wp-content/uploads/2026/10/' + ICON[k][1] }, library: 'svg' });

  const C = (s, els) => ({ id: rid(), elType: 'container', isInner: false, settings: Object.assign({ content_width: 'full', flex_direction: 'column' }, s), elements: els || [] });
  const W = (type, s) => ({ id: rid(), elType: 'widget', widgetType: type, settings: s || {}, elements: [] });

  // Typography block with a prefix ('typography' for most widgets)
  const typo = (o, p = 'typography') => {
    const s = { [p + '_typography']: 'custom' };
    if (o.f) s[p + '_font_family'] = o.f;
    if (o.s != null) s[p + '_font_size'] = px(o.s);
    if (o.st != null) s[p + '_font_size_tablet'] = px(o.st);
    if (o.sm != null) s[p + '_font_size_mobile'] = px(o.sm);
    if (o.w) s[p + '_font_weight'] = String(o.w);
    if (o.lh != null) s[p + '_line_height'] = em(o.lh);
    if (o.lhm != null) s[p + '_line_height_mobile'] = em(o.lhm);
    if (o.ls != null) s[p + '_letter_spacing'] = em(o.ls);
    if (o.tt) s[p + '_text_transform'] = o.tt;
    return s;
  };
  const IT = 'Inter Tight', IN = 'Inter';

  // Boxed page section = the design's .wrap (1280 content + 30px gutters; 16px on phones)
  const section = (s, els) => C(Object.assign({
    content_width: 'boxed', html_tag: 'section',
    padding: dims(s.pt ?? 100, 30, s.pb ?? 100, 30),
    padding_mobile: dims(s.ptm ?? 64, 16, s.pbm ?? 64, 16)
  }, s.x || {}), els);

  const heading = (title, o = {}) => W('heading', Object.assign({
    title, header_size: o.tag || 'h2', title_color: o.color || '#272B26', align: o.align || ''
  }, typo(Object.assign({ f: IT, w: 400 }, o.t || {})), o.x || {}));

  const text = (html, o = {}) => W('text-editor', Object.assign({
    editor: html, text_color: o.color || '#272B26'
  }, typo(Object.assign({ f: IN, w: 400 }, o.t || {})), o.x || {}));

  // Eyebrow label: Heading + ex-eyebrow class + mushroom underline
  const eyebrow = (label, o = {}) => heading(label, {
    tag: 'p', color: o.light ? '#F5F2EA' : '#4F5945',
    t: { f: IN, s: 13, w: 500, ls: 0.2, tt: 'uppercase', lh: 1.4 },
    x: Object.assign({
      _css_classes: 'ex-eyebrow' + (o.light ? ' ex-eyebrow--light' : ''),
      _padding: dims(0, 0, o.pb ?? 14, 0),
      _border_border: 'solid', _border_width: dims(0, 0, 1, 0), _border_color: o.light ? 'rgba(245,242,234,0.5)' : '#B7AA99'
    }, o.x || {})
  });

  // Button. kind: 'olive' | 'ivory' | 'outline' | 'outline-light'
  const button = (label, href, o = {}) => {
    const k = o.kind || 'olive';
    const pal = {
      olive: { bg: '#4F5945', fg: '#F5F2EA', hbg: '#272B26', hfg: '#F5F2EA', bd: '' },
      ivory: { bg: '#F5F2EA', fg: '#272B26', hbg: '#E6E0D5', hfg: '#272B26', bd: '' },
      outline: { bg: 'rgba(0,0,0,0)', fg: '#272B26', hbg: '#E6E0D5', hfg: '#272B26', bd: '#B7AA99', hbd: '#4F5945' },
      'outline-light': { bg: 'rgba(0,0,0,0)', fg: '#F5F2EA', hbg: 'rgba(245,242,234,0.14)', hfg: '#F5F2EA', bd: o.bd || 'rgba(245,242,234,0.9)' }
    }[k];
    const h = o.h || 52, fs = o.fs || 15;
    const vpad = Math.round((h - 2 * (pal.bd ? 1 : 0) - fs * 1.2) / 2);
    const s = Object.assign({
      text: label, link: { url: href, is_external: '', nofollow: '' },
      button_text_color: pal.fg, background_background: 'classic', background_color: pal.bg,
      hover_color: pal.hfg, button_background_hover_background: 'classic', button_background_hover_color: pal.hbg,
      border_radius: all(3),
      text_padding: dims(vpad, o.pr || 28, vpad, o.pl || 28)
    }, typo({ f: IN, s: fs, w: 500, lh: 1.2 }));
    if (pal.bd) Object.assign(s, { border_border: 'solid', border_width: all(1), border_color: pal.bd, button_hover_border_color: pal.hbd || pal.bd });
    if (o.icon) Object.assign(s, { selected_icon: icon(o.icon), icon_align: 'row-reverse', icon_indent: px(o.gapIcon || 24) });
    if (o.split) { s._css_classes = 'ex-btn-split'; s._element_width = 'initial'; s._element_custom_width = px(o.minw || 300); s._element_custom_width_mobile = pct(100); }
    return W('button', Object.assign(s, o.x || {}));
  };

  const image = (assetId, alt, o = {}) => {
    const im = img(assetId); im.alt = alt || '';
    return W('image', Object.assign({ image: im, image_size: 'full' }, o.x || {}));
  };

  async function insert(model, at) {
    const target = elementor.getPreviewContainer();
    return $e.run('document/elements/create', { container: target, model, options: { at: at ?? target.children.length } });
  }
  async function clearPage() {
    const target = elementor.getPreviewContainer();
    const kids = [...target.children];
    if (kids.length) await $e.run('document/elements/delete', { containers: kids });
  }

  window.EX = { rid, px, em, pct, dims, all, gap, C, W, typo, IT, IN, section, heading, text, eyebrow, button, image, img, icon, insert, clearPage,
    setMedia: (m) => { MEDIA = m; } };
})();
