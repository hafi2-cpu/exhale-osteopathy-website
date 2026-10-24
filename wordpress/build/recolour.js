/* In-place recolour (option C: sign green + gold) and HD photo swap for the CURRENT Elementor document.
   Keeps every manual edit: reads the saved document data, changes only colours/media, re-inserts it.
   RC_JOB = { dry: true|false, publish: true }  →  poll window.RC */
(async function () {
  const RC = window.RC = { running: true, log: [], errs: [], stats: {} };
  try {
    const B = window.EX_BASE;
    for (let i = 0; i < 200 && !(window.elementor && elementor.getPreviewContainer && elementor.getPreviewContainer()); i++) await new Promise(r => setTimeout(r, 250));
    const SWAP = await (await fetch(B + 'build/media-swap.json')).json();
    // old hex -> [new hex, global id]
    const MAP = {
      '4F5945': ['56684F', 'primary'], '178D86': ['56684F', 'primary'], '272B26': ['22302A', 'text'],
      '7B826C': ['B8975A', 'accent'], 'E6E0D5': ['EDE5D6', 'exsand'], 'F5F2EA': ['F5F2EA', 'excream'],
      'B7AA99': ['B7AA99', 'extaupe'], '155E63': ['2C3D33', 'exdeep'], '8C8471': ['8A7650', null]
    };
    const RGB = {}; for (const [o, [n]] of Object.entries(MAP)) RGB[[0, 2, 4].map(i => parseInt(o.substr(i, 2), 16)).join(',')] = [0, 2, 4].map(i => parseInt(n.substr(i, 2), 16)).join(',');
    const S = RC.stats; const inc = k => S[k] = (S[k] || 0) + 1;
    const GOLD = '#C9A86A', GOLD_D = '#B8975A', FOREST = '#22302A';
    const G = id => 'globals/colors?id=' + id;
    const fixStr = s => {
      let t = s.replace(/#([0-9a-f]{6})\b/gi, (m, h) => MAP[h.toUpperCase()] ? (inc('hexInStr'), '#' + MAP[h.toUpperCase()][0]) : m);
      t = t.replace(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g, (m, r, g, b) => { const k = r + ',' + g + ',' + b; return RGB[k] ? (inc('rgb'), m.replace(/\(\s*\d+\s*,\s*\d+\s*,\s*\d+/, '(' + RGB[k])) : m; });
      for (const [oid, [nid, of, nf]] of Object.entries(SWAP)) if (t.includes('/' + of)) { t = t.split('/' + of).join('/' + nf); inc('urlInStr'); }
      return t;
    };
    const fixObj = (o) => {            // o = settings object or repeater item
      if (!o || typeof o !== 'object') return;
      if (Array.isArray(o)) { o.forEach(fixObj); return; }
      if (o.id && o.url && SWAP[o.id]) { const [nid, of, nf] = SWAP[o.id]; o.id = nid; o.url = String(o.url).replace(of, nf); inc('media'); }
      for (const k of Object.keys(o)) {
        if (k === '__globals__') continue;
        const v = o[k];
        if (typeof v === 'string') {
          const m = v.match(/^#([0-9a-f]{6})$/i);
          if (m && MAP[m[1].toUpperCase()]) {
            const [n, gid] = MAP[m[1].toUpperCase()]; o[k] = '#' + n; inc('hex');
            if (gid) { o.__globals__ = (o.__globals__ && !Array.isArray(o.__globals__)) ? o.__globals__ : {}; if (!o.__globals__[k]) o.__globals__[k] = G(gid); inc('linked'); }
          } else if (/#[0-9a-f]{6}|rgba?\(|\/wp-content\/uploads\//i.test(v)) o[k] = fixStr(v);
        } else if (v && typeof v === 'object') fixObj(v);
      }
    };
    const setG = (s, key, val, gid) => { s[key] = val; s.__globals__ = (s.__globals__ && !Array.isArray(s.__globals__)) ? s.__globals__ : {}; s.__globals__[key] = gid ? G(gid) : ''; };
    const isGreen = v => /^#(4F5945|178D86|56684F)$/i.test(v || '');
    // gold call-to-action rules (decided on ORIGINAL values, before mapping)
    const goldify = (el) => {
      const s = el.settings || {};
      if (el.widgetType === 'button' && /^\s*Book Now\s*$/i.test(s.text || '')) {
        setG(s, 'background_color', GOLD, 'secondary'); setG(s, 'button_text_color', FOREST, 'text');
        setG(s, 'button_background_hover_color', GOLD_D, 'accent'); setG(s, 'hover_color', FOREST, 'text'); inc('goldBtn');
      }
      if (el.elType === 'container' && s.html_tag === 'a' && /cliniko|\/book/i.test((s.link && s.link.url) || '') && isGreen(s.background_color)) {
        setG(s, 'background_color', GOLD, 'secondary'); inc('goldCard');
        const dark = (e) => { const t = e.settings || {};
          for (const k of ['title_color', 'text_color', 'primary_color', 'color']) if (typeof t[k] === 'string' && /^#F5F2EA$/i.test(t[k])) setG(t, k, FOREST, 'text');
            else if (typeof t[k] === 'string' && /rgba\(\s*245\s*,\s*242\s*,\s*234/.test(t[k])) t[k] = t[k].replace(/rgba\(\s*245\s*,\s*242\s*,\s*234/, 'rgba(34,48,42');
          (e.elements || []).forEach(dark); };
        (el.elements || []).forEach(dark);
      }
      (el.elements || []).forEach(goldify);
    };
    const walk = (el) => { if (el.settings && !Array.isArray(el.settings)) fixObj(el.settings); (el.elements || []).forEach(walk); };

    const doc = elementor.documents.getCurrent();
    const orig = JSON.parse(JSON.stringify(doc.config.elements));
    const data = JSON.parse(JSON.stringify(orig));
    data.forEach(goldify); data.forEach(walk);
    RC.log.push('transformed');
    const before = JSON.stringify(orig), after = JSON.stringify(data);
    RC.changed = before !== after; RC.left = (after.match(/#(4F5945|272B26|7B826C|E6E0D5|178D86|155E63)\b|rgba?\(\s*(79,\s*89,\s*69|39,\s*43,\s*38|123,\s*130,\s*108)/gi) || []).slice(0, 10);
    if (window.RC_JOB && RC_JOB.dry) { RC.log.push('dry'); RC.running = false; return; }
    if (!RC.changed) { RC.log.push('nochange'); RC.running = false; return; }
    // backup original data as a .txt in the media library
    const nonce = await (await fetch('/wp-admin/admin-ajax.php?action=rest-nonce', { credentials: 'include' })).text();
    const name = 'exhale-backup-' + doc.id + '-' + new Date().toISOString().slice(0, 10) + '.txt';
    const up = await (await fetch('/wp-json/wp/v2/media', { method: 'POST', credentials: 'include', headers: { 'X-WP-Nonce': nonce, 'Content-Disposition': 'attachment; filename="' + name + '"', 'Content-Type': 'text/plain' }, body: 'Exhale Osteopathy - Elementor backup of document ' + doc.id + ' before the green and gold recolour (JSON; < and > are escaped).\n\n' + before.replace(/</g, '\\u003c').replace(/>/g, '\\u003e') })).json();
    if (!up.id) throw new Error('backup failed ' + JSON.stringify(up).slice(0, 160));
    RC.backup = up.id; RC.log.push('backup');
    // replace content
    const target = elementor.getPreviewContainer();
    if (target.children.length) await $e.run('document/elements/delete', { containers: [...target.children] });
    for (let i = 0; i < data.length; i++) await $e.run('document/elements/create', { container: target, model: data[i], options: { at: i } });
    RC.log.push('inserted');
    await $e.run('document/save/publish'); RC.log.push('saved');
  } catch (e) { RC.errs.push(e.message); }
  RC.running = false;
})();
