/* Remove links/cards/carousel slides that point to HIDE_URLS from the CURRENT Elementor document.
   Backs up the document to the Media Library first. Progress on window.PIPE. */
(async function () {
  const PIPE = window.PIPE = { stage: 'load', log: [] };
  try {
    for (let i = 0; i < 240 && !(window.elementor && elementor.getPreviewContainer && elementor.getPreviewContainer()); i++) await new Promise(r => setTimeout(r, 250));
    PIPE.id = new URLSearchParams(location.search).get('post');
    const URLS = window.HIDE_URLS || ['/shockwave-therapy', '/diagnostic-ultrasound'];
    const hits = s => URLS.some(u => s.includes('"' + u + '"') || s.includes('"' + u + '/"') || s.includes('href=\\"' + u));
    const doc = elementor.documents.getCurrent();
    const orig = JSON.stringify(doc.config.elements);
    if (!URLS.some(u => orig.includes(u))) { PIPE.stage = 'done'; PIPE.log.push('nothing to hide'); return; }
    const repeaterOps = [], deletes = [], renumber = new Set();
    const walk = (el, parent) => {
      const own = JSON.stringify(el.settings || {});
      if (el.widgetType === 'nested-carousel') {
        (el.elements || []).forEach((slide, i) => { if (hits(JSON.stringify(slide))) repeaterOps.push([el.id, i, slide.settings && slide.settings._title || i]); });
        return;
      }
      if (el.elType === 'container' && el.settings && el.settings.link && URLS.some(u => (el.settings.link.url || '').replace(/\/$/, '') === u)) {
        deletes.push(el.id); if (parent) renumber.add(parent.id); return;
      }
      if (el.elType === 'widget' && hits(own) && parent) {
        // a widget mentioning the link: report only, never delete automatically
        (PIPE.widgetHits = PIPE.widgetHits || []).push(el.widgetType + ' ' + el.id + ' in ' + parent.id + ' (' + (parent.elements || []).length + ' siblings): ' + own.slice(0, 160)); return;
      }
      (el.elements || []).forEach(c => walk(c, el));
    };
    doc.config.elements.forEach(e => walk(e, null));
    PIPE.plan = { carouselSlides: repeaterOps.length, deletes: deletes.length };
    if (window.HIDE_DRY) { PIPE.stage = 'dry'; return; }
    PIPE.stage = 'backup';
    const nonce = await (await fetch('/wp-admin/admin-ajax.php?action=rest-nonce', { credentials: 'include' })).text();
    const name = 'exhale-backup-' + doc.id + '-before-hiding-shockwave-ultrasound.txt';
    const up = await (await fetch('/wp-json/wp/v2/media', { method: 'POST', credentials: 'include', headers: { 'X-WP-Nonce': nonce, 'Content-Disposition': 'attachment; filename="' + name + '"', 'Content-Type': 'text/plain' },
      body: 'Exhale Osteopathy - Elementor backup of document ' + doc.id + ' before hiding Shockwave/Ultrasound links (JSON; < and > are escaped).\n\n' + orig.replace(/</g, '\\u003c').replace(/>/g, '\\u003e') })).json();
    if (!up.id) throw new Error('backup failed');
    PIPE.backup = up.id; PIPE.stage = 'editing';
    // carousel slides: remove highest index first per carousel
    repeaterOps.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : 0);
    for (const [cid, idx] of repeaterOps) await $e.run('document/repeater/remove', { container: elementor.getContainer(cid), name: 'carousel_items', index: idx });
    for (const id of [...new Set(deletes)]) { const c = elementor.getContainer(id); if (c) await $e.run('document/elements/delete', { container: c }); }
    // renumber "01/02/03" headings inside affected card grids
    for (const gid of renumber) {
      const g = elementor.getContainer(gid); if (!g) continue; let n = 0;
      for (const card of g.children) {
        const find = c => { if (c.model.get('widgetType') === 'heading' && /^0\d$/.test((c.settings.get('title') || '').trim())) return c; for (const k of (c.children || [])) { const r = find(k); if (r) return r; } };
        const h = find(card); if (h) { n++; const t = String(n).padStart(2, '0'); if (h.settings.get('title').trim() !== t) await $e.run('document/elements/settings', { container: h, settings: { title: t } }); }
      }
    }
    PIPE.stage = 'saving';
    await $e.run('document/save/publish');
    PIPE.stage = 'done';
  } catch (e) { PIPE.stage = 'err ' + e.message; }
})();
