/* Fill the three placeholder Google-review cards on the CURRENT Elementor document, in place.
   REV_JOB = { heading: 'new section title' | null, reviews: [[text, name] x3], dry } → poll window.REV */
(async function () {
  const REV = window.REV = { running: true, log: [], errs: [] };
  try {
    for (let i = 0; i < 200 && !(window.elementor && elementor.getPreviewContainer && elementor.getPreviewContainer()); i++) await new Promise(r => setTimeout(r, 250));
    const job = window.REV_JOB;
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const ops = [];
    const cards = [];
    const walk = (el, parent) => {
      if (el.widgetType === 'text-editor' && /\[Paste a real Google review/.test(el.settings.editor || '')) cards.push({ el, parent });
      if (el.widgetType === 'heading') {
        const t = el.settings.title || '';
        let n = t.split('[5.0]').join('5.0').split('[XXX] reviews').join('87 reviews');
        if (job.heading && /^What (our .+ patients say|patients say about \w+)$/.test(t)) n = job.heading;
        if (n !== t) ops.push([el.id, { title: n }, 'heading ' + t.slice(0, 40) + ' → ' + n.slice(0, 40)]);
      }
      (el.elements || []).forEach(c => walk(c, el));
    };
    elementor.documents.getCurrent().config.elements.forEach(e => walk(e, null));
    if (cards.length !== job.reviews.length) throw new Error('found ' + cards.length + ' review cards, expected ' + job.reviews.length);
    cards.forEach((c, i) => {
      const [text, name] = job.reviews[i];
      ops.push([c.el.id, { editor: '<p>“' + esc(text) + '”</p>' }, 'review ' + i]);
      const nm = (c.parent.elements || []).find(x => x.widgetType === 'heading' && x.settings.title === '[Patient name]');
      if (!nm) throw new Error('no name heading for card ' + i);
      ops.push([nm.id, { title: esc(name) }, 'name ' + name]);
    });
    REV.log = ops.map(o => o[2]);
    if (job.dry) { REV.running = false; return; }
    for (const [id, settings] of ops) {
      const c = elementor.getContainer(id);
      if (!c) throw new Error('no container ' + id);
      await $e.run('document/elements/settings', { container: c, settings });
    }
    await $e.run('document/save/publish'); REV.log.push('saved');
  } catch (e) { REV.errs.push(e.message); }
  REV.running = false;
})();
