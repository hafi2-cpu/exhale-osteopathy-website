/* Loader used in the Elementor editor: loads every builder + data, then runs one job.
   EX_JOB = { kind: 'home'|'treatment'|'condition'|'practitioner'|'header'|'footer', key, variant, css: true } */
(async function () {
  const B = window.EX_BASE;
  const get = async (p) => (await fetch(B + p)).text();
  for (let i = 0; i < 200 && !(window.elementor && elementor.getPreviewContainer && elementor.getPreviewContainer()); i++) await new Promise(r => setTimeout(r, 250));
  const media = JSON.parse(await get('media-map.json'));
  eval(await get('build/lib.js')); EX.setMedia(media);
  for (const f of ['home', 'treatment', 'condition', 'practitioner', 'header', 'footer', 'pages']) eval(await get('build/' + f + '.js'));
  const job = window.EX_JOB;
  EX.runBg(async (st) => {
    if (job.kind === 'home') { await EX.clearPage(); await EX.buildHome(); }
    if (job.kind === 'treatment') await EX.buildTreatment(job.key, JSON.parse(await get('data/treatments.json')));
    if (job.kind === 'condition') await EX.buildCondition(job.key, JSON.parse(await get('data/conditions.json')));
    if (job.kind === 'practitioner') await EX.buildPractitioner(job.key, JSON.parse(await get('data/practitioners.json')));
    if (job.kind === 'page') await EX.buildPage(job.key);
    if (job.kind === 'header') await EX.buildHeader();
    if (job.kind === 'footer') await EX.buildFooter(job.variant);
    st.log.push('built');
    await $e.run(job.publish ? 'document/save/publish' : 'document/save/draft');
    st.log.push('saved');
    if (job.css) {
      const css = await get('site-custom.css');
      await $e.run('panel/global/open'); await new Promise(r => setTimeout(r, 2500));
      const kit = elementor.documents.get(elementor.config.kit_id);
      await $e.run('document/elements/settings', { container: kit.container, settings: { custom_css: css }, options: { external: true } });
      await $e.run('document/save/update', { document: kit });
      await $e.run('panel/global/close'); st.log.push('css');
    }
    st.log.push('done');
  });
})();
