/* Redesign loader for the Elementor editor on hafir63.
   window.XF_BASE = raw GitHub URL of lichfield/ at a commit; window.XF_JOB = 'home' | 'header' | 'footer' | 'kit' | ...
   Poll window.XS. */
(async function () {
  const XS = window.XS = { running: true, log: [], errs: [] };
  try {
    const B = window.XF_BASE;
    const get = async (p) => { const r = await fetch(B + p); if (!r.ok) throw new Error(p + ' ' + r.status); return r.text(); };
    for (let i = 0; i < 200 && !(window.elementor && elementor.getPreviewContainer && elementor.getPreviewContainer()); i++) await new Promise(r => setTimeout(r, 250));
    window.LOP_MEDIA = JSON.parse(await get('media-map.json'));
    eval(await get('redesign/xf.js')); eval(await get('redesign/recipes.js')); eval(await get('redesign/pages.js'));
    window.LOP_DATA = { treat: JSON.parse(await get('data/treatments.json')), prac: JSON.parse(await get('data/practitioners.json')), cond: JSON.parse(await get('data/conditions.json')) };
    if (window.XF_EXTRA) for (const f of window.XF_EXTRA) eval(await get('redesign/' + f));
    await XF.load(); XS.log.push('loaded');
    const job = window.XF_JOB;
    if (job === 'kit') { XS.log.push('kit keys ' + await XR.kit()); }
    else {
      const els = await XR[job](window.XF_ARG);
      XS.log.push('built ' + els.length);
      await XF.replaceDoc(els); XS.log.push('inserted');
      await $e.run(window.XF_DRAFT ? 'document/save/draft' : 'document/save/publish'); XS.log.push('saved');
    }
  } catch (e) { XS.errs.push(e.message + ' ' + (e.stack || '').split('\n')[1]); }
  XS.running = false;
})();
