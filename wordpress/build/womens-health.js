// Builds the Women's Health Osteopathy page from the Pregnancy Osteopathy page (218) layout.
// Run in the new page's own Elementor editor: buildWH(JSON.parse(localStorage.p218))
window.buildWH = function (T) {
  var find = function (a, id) { for (var i = 0; i < a.length; i++) { if (a[i].id === id) return a[i]; var r = find(a[i].elements || [], id); if (r) return r; } return null; };
  var t = function (id, v) { var e = find(T, id); if (!e) throw new Error('missing ' + id); e.settings.title = v; };
  var ed = function (id, v) { var e = find(T, id); if (!e) throw new Error('missing ' + id); e.settings.editor = v; };
  var link = function (id, url) { var e = find(T, id); e.settings.link = Object.assign({}, e.settings.link || {}, { url: url }); };

  // Hero
  var bc = find(T, '869ad94'); bc.settings.title = bc.settings.title.replace(/Pregnancy Osteopathy/g, 'Women’s Health Osteopathy');
  t('9cdc5ab', 'Women’s Health Osteopathy in Sutton Coldfield');
  ed('c068053', '<p>Gentle, hands-on osteopathy for women at every stage, from pregnancy aches and pelvic girdle pain to postnatal recovery and getting back to exercise. Serving Sutton Coldfield, Streetly and north Birmingham.</p>');
  t('5815421', 'Sutton Coldfield');

  // Discover
  t('233f92b', 'Care that understands women’s bodies');
  ed('0bd5d31', '<p>Pregnancy, birth and the years that follow bring real changes to your back, pelvis, core and posture. Our women’s health osteopathy in Sutton Coldfield is led by Ankita Desai, an osteopath with a special interest in women’s health and postnatal care, trained in postnatal assessment and rehabilitation.</p>');
  ed('84a7313', '<p>Whether you’re pregnant, a few weeks after birth or years down the line, we’ll take time to understand what’s going on, treat what’s sore and give you a clear plan to feel strong again.</p>');
  ed('fbffe16', '<p>Postnatal check with a written recovery plan</p>');
  ed('df05eb8', '<p>Pregnancy, pelvic and back pain treatment</p>');
  ed('16a4a3b', '<p>Evening and Saturday appointments in Sutton Coldfield</p>');
  var img = find(T, 'c242ded'); img.settings.image = Object.assign({}, img.settings.image, { alt: 'Women’s health osteopathy treatment at Exhale Osteopathy, Sutton Coldfield' });

  // Sticky nav + booking card
  t('5e3380a', 'What is women’s health osteopathy?');
  t('3fe7b6b', 'Our postnatal check');
  t('8ecc2d8', 'Is it safe?');
  t('f132b57', 'Conditions we treat');
  t('2881a41', 'Your first appointment');
  t('b037c89', 'Book Women’s Health Osteopathy');
  t('f34c471', 'Sutton Coldfield');

  // Main content
  t('422df23', 'What is women’s health osteopathy?');
  ed('dfda07f', '<p>Women’s health osteopathy is osteopathic care focused on the changes that pregnancy, birth and hormones bring to your muscles and joints. We assess how your back, pelvis, ribs and core are working together, then use gentle hands-on treatment, exercise and practical advice to ease pain and rebuild strength.</p><p>It suits mums-to-be, new mums and women who had children years ago but still feel their body hasn’t fully recovered. We see women from Sutton Coldfield, Four Oaks, Streetly, Walsall and across north Birmingham.</p>');
  t('dae485f', 'Our postnatal check');
  ed('b990515', '<p>Your six-week GP check looks at your general health and your baby’s. Our <strong>60-minute postnatal check (£99)</strong> looks closely at how your body is recovering, so you know what’s healing well and what needs work.</p><p><strong>Your first appointment includes:</strong></p><ul><li>A chat about your pregnancy, birth, recovery and goals</li><li>A posture and movement check, including simple squats, lunges and balance</li><li>A tummy gap (diastasis) and deep core check</li><li>A C-section scar check, if relevant</li><li>Screening questions about your pelvis, back and pelvic floor</li><li>Gentle hands-on treatment for any aches</li><li>A written plan with breathing, core and pelvic floor exercises and a safe return to exercise</li></ul><p><strong>Follow-ups</strong>, usually two or three over 6 to 12 weeks, re-check your progress, move your exercises on and help you get back to running, the gym or classes. Follow-ups are charged at our standard rate.</p><p>We can see you from around six weeks after birth, or sooner if you’re in pain, and it’s never too late: many women come to us years after having children. Internal pelvic floor examinations aren’t offered at present. If you would benefit from one, we’ll refer you to a pelvic health physiotherapist.</p>');
  t('f4ae188', 'Is it safe?');
  ed('29335bd', '<p>Yes. Treatment is gentle and adapted to you, using side-lying and supported positions during pregnancy and after a C-section. Please tell us how many weeks pregnant or postnatal you are, and about any complications, when you book. If anything needs a medical opinion first, we’ll tell you and liaise with your GP or midwife.</p>');
  t('f7fb68f', 'How we can help');
  t('9cbcea1', 'Postnatal check'); ed('2600f36', '<p>60 minutes, £99, with a written plan.</p>');
  t('6559dfd', 'Pelvic &amp; back pain'); ed('4be7e14', '<p>Pelvic girdle and back pain in pregnancy and after birth.</p>');
  t('fd7784c', 'Tummy gap &amp; core'); ed('27d52d0', '<p>Rebuilding core strength after diastasis.</p>');
  t('0fffa2e', 'Rib &amp; upper back'); ed('7c589c7', '<p>Easing strain from your bump, feeding and carrying.</p>');
  t('bce118d', 'Return to exercise'); ed('2d940c2', '<p>A step-by-step plan back to running, the gym or classes.</p>');
  t('22ff732', 'C-section recovery'); ed('18af0e1', '<p>Scar checks and gentle advice once you’ve healed.</p>');

  // Conditions
  t('8eb3a4a', 'Women’s health conditions we treat');
  link('ce45e28', '/does-osteopathy-help-pelvic-girdle-pain');
  link('0349dcf', '#expect');

  // First appointment
  t('63d921f', 'What to expect at your first women’s health appointment');

  // Team: Ankita first
  t('2313394', 'Your women’s health osteopath');
  ed('f1f1bcf', '<p>Registered osteopath with a special interest in women’s health and postnatal care. Fridays and Saturdays in Sutton Coldfield.</p>');
  var team = find(T, 'c239092'); var byId = {}; team.elements.forEach(function (e) { byId[e.id] = e; });
  team.elements = [byId['92b2801'], byId['ddae109'], byId['17ee951']].filter(Boolean);

  // Reviews
  t('e69a0fd', 'What our patients say');

  // FAQs
  t('f5110e9', 'Women’s health osteopathy questions, answered');
  var acc = find(T, '3af3147');
  var faqs = [
    ['How soon after birth can I book a postnatal check?', '<p>Usually from around six weeks after birth, once you’ve had your GP check. If you’re in pain before then, call us and we’ll advise. It’s never too late either: many women come to us years after having children.</p>'],
    ['What’s included in the postnatal check?', '<p>A chat about your birth and recovery, posture and movement checks, a tummy gap and core check, a C-section scar check if relevant, pelvic floor screening questions, gentle treatment and a written exercise plan. It lasts 60 minutes and costs £99.</p>'],
    ['Do you do internal pelvic floor examinations?', '<p>Not at present. We screen your pelvic floor with questions and by assessing how your core and pelvis work together. If an internal examination would help, we’ll refer you to a pelvic health physiotherapist.</p>'],
    ['Can you help with pelvic girdle pain in pregnancy?', '<p>Yes. Pelvic girdle pain often responds well to gentle treatment, advice and exercise. Read our <a href="/does-osteopathy-help-pelvic-girdle-pain">guide to pelvic girdle pain</a> or see our <a href="/pregnancy-osteopathy">pregnancy osteopathy</a> page.</p>']
  ];
  acc.settings.items.forEach(function (it, i) { if (faqs[i]) it.item_title = faqs[i][0]; });
  acc.elements.forEach(function (c, i) { var te = (c.elements || []).find(function (x) { return x.widgetType === 'text-editor'; }); if (te && faqs[i]) te.settings.editor = faqs[i][1]; });

  // Booking band
  t('86da5c4', 'Book your women’s health appointment today');
  ed('c94cfbb', '<p>Pregnant, recently had a baby, or still not feeling yourself years later? Book online or call 0121 751 2440.</p>');
  t('2858f3d', 'Speak to a real person about whether women’s health osteopathy is right for you.');

  // Schema (Service + FAQPage)
  var schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', name: 'Women’s Health Osteopathy and Postnatal Check', serviceType: 'Osteopathy', description: 'Women’s health osteopathy in Sutton Coldfield: pregnancy and pelvic girdle pain, postnatal checks, tummy gap and core recovery, and return to exercise.', areaServed: [{ '@type': 'Place', name: 'Sutton Coldfield' }, { '@type': 'Place', name: 'Birmingham' }], provider: { '@type': 'MedicalBusiness', name: 'Exhale Osteopathy', telephone: '+441217512440', address: { '@type': 'PostalAddress', streetAddress: '1 Sutton Oak Corner, Streetly', addressLocality: 'Sutton Coldfield', postalCode: 'B74 2DH', addressCountry: 'GB' } }, offers: { '@type': 'Offer', name: 'Postnatal check (60 minutes)', price: '99', priceCurrency: 'GBP' } },
      { '@type': 'FAQPage', mainEntity: faqs.map(function (f) { return { '@type': 'Question', name: f[0], acceptedAnswer: { '@type': 'Answer', text: f[1].replace(/<[^>]+>/g, '') } }; }) }
    ]
  };
  var last = T[T.length - 1];
  last.elements.push({ id: elementorCommon.helpers.getUniqueId(), elType: 'widget', widgetType: 'html', isInner: false, settings: { html: '<script type="application/ld+json">' + JSON.stringify(schema) + '</script>' }, elements: [] });

  // Fresh ids everywhere
  var reid = function (e) { e.id = elementorCommon.helpers.getUniqueId(); (e.elements || []).forEach(reid); };
  T.forEach(reid);
  return T;
};
