/* In-place wording swap for the CURRENT Elementor document (keeps layout and manual edits).
   RT_JOB = { spec: { headings: [[old,new]], groups: [{ match: [snippets], paras: [html] }] }, dry } → poll window.RT */
(async function () {
  const RT = window.RT = { running: true, log: [], errs: [], n: { head: 0, groups: 0 } };
  try {
    for (let i = 0; i < 200 && !(window.elementor && elementor.getPreviewContainer && elementor.getPreviewContainer()); i++) await new Promise(r => setTimeout(r, 250));
    const spec = window.RT_JOB.spec;
    const doc = elementor.documents.getCurrent();
    const orig = JSON.stringify(doc.config.elements);
    const data = JSON.parse(orig);
    const rid = () => Math.random().toString(16).slice(2, 9);
    const strip = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    // headings / link texts
    const fixStr = (o) => { if (!o || typeof o !== 'object') return; for (const k of Object.keys(o)) { const v = o[k];
      if (typeof v === 'string') { let t = v; for (const [a, b] of spec.headings) if (t.includes(a)) { t = t.split(a).join(b); RT.n.head++; } o[k] = t; }
      else if (v && typeof v === 'object') fixStr(v); } };
    const walk = (el) => { if (el.settings && !Array.isArray(el.settings)) fixStr(el.settings); (el.elements || []).forEach(walk); };
    data.forEach(walk);
    // paragraph groups
    for (const g of spec.groups) {
      let done = false;
      const visit = (parent) => {
        if (done || !parent.elements) return;
        const idx = parent.elements.map((e, i) => (e.widgetType === 'text-editor' && g.match.some(m => strip(e.settings.editor).includes(m))) ? i : -1).filter(i => i >= 0);
        if (idx.length) {
          const tpl = parent.elements[idx[0]];
          const clones = g.paras.map(p => { const c = JSON.parse(JSON.stringify(tpl)); c.id = rid(); c.settings.editor = /^\s*<(p|ul|ol)\b/i.test(p) ? p : '<p>' + p + '</p>'; return c; });
          for (let j = idx.length - 1; j >= 1; j--) parent.elements.splice(idx[j], 1);
          parent.elements.splice(idx[0], 1, ...clones); done = true; RT.n.groups++; RT.log.push('group ' + g.match[0].slice(0, 30) + ': ' + idx.length + '→' + clones.length);
          return;
        }
        parent.elements.forEach(visit);
      };
      data.forEach(visit);
      if (!done) RT.errs.push('no match: ' + g.match[0]);
    }
    if (RT.errs.length || window.RT_JOB.dry) { RT.running = false; return; }
    const after = JSON.stringify(data);
    if (after === orig) { RT.log.push('nochange'); RT.running = false; return; }
    const nonce = await (await fetch('/wp-admin/admin-ajax.php?action=rest-nonce', { credentials: 'include' })).text();
    const name = 'exhale-backup-' + doc.id + '-wording-' + new Date().toISOString().slice(0, 10) + '.txt';
    const up = await (await fetch('/wp-json/wp/v2/media', { method: 'POST', credentials: 'include', headers: { 'X-WP-Nonce': nonce, 'Content-Disposition': 'attachment; filename="' + name + '"', 'Content-Type': 'text/plain' },
      body: 'Exhale Osteopathy - Elementor backup of document ' + doc.id + ' before the wording change (JSON; < and > are escaped).\n\n' + orig.replace(/</g, '\\u003c').replace(/>/g, '\\u003e') })).json();
    if (!up.id) throw new Error('backup failed ' + JSON.stringify(up).slice(0, 160));
    RT.backup = up.id;
    const target = elementor.getPreviewContainer();
    if (target.children.length) await $e.run('document/elements/delete', { containers: [...target.children] });
    for (let i = 0; i < data.length; i++) await $e.run('document/elements/create', { container: target, model: data[i], options: { at: i } });
    await $e.run('document/save/publish'); RT.log.push('saved');
  } catch (e) { RT.errs.push(e.message); }
  RT.running = false;
})();
