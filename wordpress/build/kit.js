/* Sets Global Colours (option C: sign green + gold) and the site CSS on the Elementor kit.
   Run inside any Elementor editor. Poll window.KIT. */
(async function () {
  const K = window.KIT = { running: true, log: [], errs: [] };
  try {
    const css = await (await fetch(window.EX_BASE + 'site-custom.css')).text();
    await $e.run('panel/global/open'); await new Promise(r => setTimeout(r, 2500));
    const kit = elementor.documents.get(elementor.config.kit_id);
    const sys = [['primary', 'Primary green', '#56684F'], ['secondary', 'Gold', '#C9A86A'], ['text', 'Forest (text & dark sections)', '#22302A'], ['accent', 'Gold – deep', '#B8975A']]
      .map(([_id, title, color]) => ({ _id, title, color }));
    const cust = [['excream', 'Cream', '#F5F2EA'], ['exsand', 'Sand', '#EDE5D6'], ['extaupe', 'Taupe (lines)', '#B7AA99'], ['exdeep', 'Deep green', '#2C3D33']]
      .map(([_id, title, color]) => ({ _id, title, color }));
    const prev = (kit.container.settings.get('custom_colors') || { toJSON: () => [] }); const keep = (prev.toJSON ? prev.toJSON() : prev).filter(c => !cust.some(n => n._id === c._id)); K.kept = keep.map(c => c.title + ' ' + c.color);
    await $e.run('document/elements/settings', { container: kit.container, settings: { system_colors: sys, custom_colors: cust.concat(keep), custom_css: css }, options: { external: true } });
    await $e.run('document/save/update', { document: kit });
    await $e.run('panel/global/close'); K.log.push('kit saved');
  } catch (e) { K.errs.push(e.message); }
  K.running = false;
})();
