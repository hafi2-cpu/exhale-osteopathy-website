/* Loader used in the Elementor editor: loads every Lichfield builder + data, then runs one job.
   window.EX_BASE = base URL of the lichfield/ folder (GitHub raw, lichfield-site branch).
   window.EX_JOB = { kind: 'home'|'treatment'|'practitioner'|'page'|'header'|'footer', key, publish: true }. Poll EX.status. */
(async function () {
  const B = window.EX_BASE;
  const get = async (p) => { const r = await fetch(B + p + '?v=' + Date.now()); if (!r.ok) throw new Error(p + ' ' + r.status); return r.text(); };
  for (let i = 0; i < 200 && !(window.elementor && elementor.getPreviewContainer && elementor.getPreviewContainer()); i++) await new Promise(r => setTimeout(r, 250));
  const media = window.LOP_MEDIA || JSON.parse(await get('media-map.json'));
  eval(await get('build/lib.js')); EX.setMedia(media);
  for (const f of ['site', 'home', 'treatment', 'practitioner', 'header', 'footer', 'pages']) eval(await get('build/' + f + '.js'));
  const job = window.EX_JOB;
  EX.runBg(async (st) => {
    if (job.kind === 'home') { await EX.clearPage(); await EX.buildHome(); }
    if (job.kind === 'treatment') await EX.buildTreatment(job.key, JSON.parse(await get('data/treatments.json')));
    if (job.kind === 'practitioner') await EX.buildPractitioner(job.key, JSON.parse(await get('data/practitioners.json')));
    if (job.kind === 'page') await EX.buildPage(job.key);
    if (job.kind === 'header') await EX.buildHeader();
    if (job.kind === 'footer') await EX.buildFooter();
    st.log.push('built');
    await $e.run(job.publish ? 'document/save/publish' : 'document/save/draft');
    st.log.push('saved');
    st.log.push('done');
  });
})();
