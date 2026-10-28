/* Sets the Lichfield Global Colours, fonts stay as in the Exhale kit, and the site CSS on the Elementor kit.
   Run inside any Elementor editor. Poll window.KIT. */
(async function () {
  const K = window.KIT = { running: true, log: [], errs: [] };
  try {
    const css = await (await fetch(window.EX_BASE + 'site-custom.css?v=' + Date.now())).text();
    await $e.run('panel/global/open'); await new Promise(r => setTimeout(r, 2500));
    const kit = elementor.documents.get(elementor.config.kit_id);
    const sys = [['primary', 'Olive (deep): buttons & links', '#6F6E4A'], ['secondary', 'Olive: Book Now & accents', '#949366'], ['text', 'Charcoal (text & dark sections)', '#3D3937'], ['accent', 'Pale olive (on dark)', '#D7D6A4']]
      .map(([_id, title, color]) => ({ _id, title, color }));
    const cust = [['lopcream', 'Cream', '#F4EFEB'], ['lopsand', 'Sand', '#EAE3DD'], ['loplines', 'Lines', '#C9C1BB'], ['lopink', 'Near black', '#1F1F1F']]
      .map(([_id, title, color]) => ({ _id, title, color }));
    const fonts = [['primary', 'Headings', 'Inter Tight', '400'], ['secondary', 'Body', 'Inter', '400'], ['text', 'Text', 'Inter', '400'], ['accent', 'Accent', 'Inter', '500']]
      .map(([_id, title, f, w]) => ({ _id, title, typography_typography: 'custom', typography_font_family: f, typography_font_weight: w }));
    await $e.run('document/elements/settings', { container: kit.container, settings: { system_colors: sys, custom_colors: cust, system_typography: fonts, custom_css: css,
      body_background_background: 'classic', body_background_color: '#F4EFEB', body_color: '#3D3937', body_typography_typography: 'custom', body_typography_font_family: 'Inter',
      container_width: { unit: 'px', size: 1280, sizes: [] },
      active_breakpoints: ['viewport_mobile', 'viewport_tablet', 'viewport_tablet_extra'], viewport_mobile: 560, viewport_tablet: 980, viewport_tablet_extra: 1180 }, options: { external: true } });
    await $e.run('document/save/update', { document: kit });
    await $e.run('panel/global/close'); K.log.push('kit saved');
  } catch (e) { K.errs.push(e.message); }
  K.running = false;
})();
