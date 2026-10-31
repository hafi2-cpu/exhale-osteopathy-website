// Builds the "Postnatal recovery" blog post from the pelvic girdle pain post (400) layout.
// Run in the new post's Elementor editor: buildPostnatal(JSON.parse(localStorage.p400now), img)
// img = {id, url, alt} for the hero image.
window.buildPostnatal = function (T, img) {
  var find = function (a, id) { for (var i = 0; i < a.length; i++) { if (a[i].id === id) return a[i]; var r = find(a[i].elements || [], id); if (r) return r; } return null; };
  var t = function (id, v) { var e = find(T, id); if (!e) throw new Error('missing ' + id); e.settings.title = v; };
  var ed = function (id, v) { var e = find(T, id); if (!e) throw new Error('missing ' + id); e.settings.editor = v; };

  // Hero
  t('bbf441d', '<a href="/">Home</a> <span aria-hidden="true">→</span> <a href="/blog-posts">Blog</a> <span aria-hidden="true">→</span> <strong>Women’s Health</strong>');
  t('3c4917f', 'Postnatal Recovery: When to Get Checked and What Helps');
  ed('9836140', '<p>What’s normal after birth, why your six-week check isn’t the whole picture, and simple steps to rebuild strength in your core, pelvic floor and back.</p>');
  ed('47a4328', '<p><strong>Hafi Rahman</strong><br>31 October 2026 · 8 min read</p>');
  var hero = find(T, '7b778fc');
  hero.settings.image = { id: img.id, url: img.url, alt: img.alt, source: 'library' };

  // Table of contents (anchors stay the same, labels change)
  t('481b456', '<a href="#what-is">What’s normal after birth?</a>');
  t('ae33f2f', '<a href="#how-helps">Your six-week check</a>');
  t('11636fe', '<a href="#evidence">Signs it’s worth getting checked</a>');
  t('fe7c541', '<a href="#expect">Returning to exercise</a>');
  t('f92f562', '<a href="#exercises">Gentle exercises</a>');
  t('09d1a34', '<a href="#tips">Everyday tips</a>');
  t('0e749b6', '<a href="#faqs">FAQs</a>');

  // Lead
  t('8e93f84', 'Your body spends nine months adapting to pregnancy, then goes through birth and straight into feeding, lifting and broken sleep. It’s no surprise that recovery takes time, and often a little help.');

  // What's normal
  t('ea44271', 'What’s normal after birth?');
  ed('4272959', '<p>In the first few weeks it’s normal to feel sore, tired and a bit disconnected from your tummy and pelvic floor. Bleeding gradually settles, stitches or a caesarean wound heal, and your joints and ligaments slowly firm up again as pregnancy hormones settle.</p>');
  ed('c832593', '<p>Some things are common but are not something you just have to live with: leaking when you cough, sneeze or run, a feeling of heaviness in the pelvis, a gap or “doming” down the middle of your tummy, and back, neck or pelvic pain that isn’t settling. These usually respond well to the right advice and exercise.</p>');

  // Six-week check
  t('3915fe0', 'Why your six-week check isn’t the whole picture');
  ed('d217635',
    '<p>Your NHS postnatal check with your GP, usually 6 to 8 weeks after birth, looks at your general health: how you’re feeling emotionally, bleeding, blood pressure, how stitches or a caesarean wound are healing, contraception and feeding. It’s an important appointment, so do go.</p>' +
    '<p>What it doesn’t usually include is a detailed look at how your muscles and joints are recovering: your posture, your deep core, a tummy gap, how your pelvis and back are moving, and whether you’re ready to get back to exercise. That’s where a postnatal check with an osteopath can help.</p>');
  t('afb8924', 'What our postnatal check looks at');
  ed('676467e', '<p><strong>Your story:</strong> your pregnancy, birth, recovery so far and what you want to get back to.</p>');
  ed('e0a0542', '<p><strong>Posture and movement:</strong> simple squats, lunges and balance tests to see how your body is working.</p>');
  ed('bcc5753', '<p><strong>Tummy gap and deep core:</strong> checking for diastasis and how well your core is switching on.</p>');
  ed('60cd578', '<p><strong>C-section scar:</strong> a check of how your scar is healing and moving, if relevant.</p>');
  ed('e9a64a0', '<p><strong>A written plan:</strong> breathing, core and pelvic floor exercises, plus a safe route back to exercise.</p>');

  // Signs to get checked
  t('a83791e', 'Signs it’s worth getting checked');
  ed('6ca2ec7',
    '<p>We can see you from around six weeks after birth, once you’ve had your GP check, or sooner if you’re in pain. It’s never too late: many women come to us months or years after having children. It’s worth booking if you notice:</p>' +
    '<ul><li>leaking when you cough, sneeze, laugh, lift or exercise</li><li>a heaviness or dragging feeling in the pelvis</li><li>a gap, bulge or doming down the middle of your tummy</li><li>back, neck, shoulder or pelvic pain that isn’t settling</li><li>wrist or thumb pain from lifting and feeding</li><li>you want to get back to running, the gym or classes and aren’t sure where to start</li></ul>' +
    '<p>Pain during sex, or bladder or bowel problems that are getting worse, should also be mentioned to your GP.</p>');

  // Returning to exercise
  t('b8aaedd', 'Returning to exercise and running');
  ed('8bccc11',
    '<p>Gentle walking, breathing and pelvic floor exercises can usually start in the first days and weeks after birth. Low-impact activity such as static cycling or cross-training can follow from around 4 to 6 weeks, with swimming once bleeding has stopped and any wounds have healed.</p>' +
    '<p>UK postnatal running guidance, written by pelvic health physiotherapists, suggests a graded return to running from around 12 weeks after birth, once you can walk, balance and do simple strength and impact tests without pain, leaking or heaviness. Everyone is different, and a caesarean, a difficult birth or ongoing symptoms may mean a slower plan. We’ll test what your body is ready for and build your plan around your goals.</p>');

  // Exercises
  t('dec23f3', 'Gentle exercises to start with');
  ed('ca78f21', '<p>These are safe starting points for most women. If you had a caesarean or a complicated birth, follow your midwife’s or GP’s advice first, and stop anything that causes pain, leaking or heaviness.</p>');
  t('527ef93', 'Breathing and deep core');
  ed('6ec403f', '<p>Lie on your side or back with your knees bent. Breathe in and let your ribs and tummy widen. As you breathe out, gently draw your pelvic floor up and your lower tummy in. Relax fully, then repeat for a few breaths.</p>');
  t('31d9a2e', 'Pelvic floor exercises');
  ed('2c2635d', '<p>Imagine stopping the flow of urine and holding in wind, then squeeze and lift. Practise short, quick squeezes and longer holds of a few seconds, always relaxing fully in between. Aim for a few sets every day.</p>');
  t('69b6316', 'Pelvic tilts');
  ed('095e8c8', '<p>Lying with your knees bent, gently flatten your lower back into the floor by tilting your pelvis, then release. This eases stiffness in the lower back and wakes up your deep tummy muscles.</p>');
  t('be09127', 'Walking');
  ed('325e2a7', '<p>Start with short, easy walks with the pram and build up gradually. Walking helps your mood, circulation and fitness without loading a recovering pelvis.</p>');
  t('294bc68', 'Glute bridges');
  ed('d01c861', '<p>Lying on your back with knees bent, breathe out, gently engage your core and lift your hips, then lower slowly. Add these once the basics feel comfortable. They strengthen the muscles that support your pelvis and lower back.</p>');

  // Tips
  t('dc231f9', 'Everyday tips for a smoother recovery');
  ed('299477b', '<p>Breathe out as you lift your baby, car seat or shopping · bring the changing mat and pram handles up to waist height · feed in a supported position with a pillow under your baby · switch the side you carry your baby on · drink plenty of water and avoid straining on the toilet · rest when you can, and accept help.</p>');
  ed('64dd91a', '<p>Lifting heavy things before you feel ready · sit-ups and crunches while you still have a tummy gap · high-impact exercise such as running or jumping before around 12 weeks · ignoring leaking, heaviness or pain · comparing your recovery with anyone else’s.</p>');

  // Local section (added to the PGP post earlier; find by its old title)
  var local = null;
  (function w(a) { a.forEach(function (e) { if (e.widgetType === 'heading' && /Pelvic girdle pain treatment in Sutton Coldfield/.test(e.settings.title || '')) local = e; w(e.elements || []); }); })(T);
  if (local) {
    local.settings.title = 'Postnatal recovery support in Sutton Coldfield &amp; Birmingham';
    var parent = find(T, '5c3e0a6');
    var i = parent.elements.indexOf(local);
    parent.elements[i + 1].settings.editor =
      '<p>At Exhale Osteopathy in Streetly, Sutton Coldfield, our women’s health osteopath Ankita Desai sees women from Sutton Coldfield, Four Oaks, Walsall and across north Birmingham for postnatal checks and recovery. Whether your baby is six weeks or six years old, she’ll take time to understand what’s going on, treat anything that’s sore and give you a clear plan to feel strong again.</p>' +
      '<p>Find out more about our <a href="/womens-health-osteopathy">women’s health osteopathy and postnatal check</a>, or read about <a href="/does-osteopathy-help-pelvic-girdle-pain">pelvic girdle pain</a> if your pelvis is still sore after birth.</p>';
  }

  // Call-to-action box
  t('5982484', 'Women’s Health Osteopathy');
  t('7a9fc18', 'Our 60-minute postnatal check (£99) gives you a clear, written plan for your recovery.');
  var cta = find(T, 'c837c8e'); cta.settings.link = Object.assign({}, cta.settings.link, { url: '/womens-health-osteopathy' });

  // FAQs
  var acc = find(T, '2c6f43e');
  var faqs = [
    ['How soon after birth can I see an osteopath?', '<p>Usually from around six weeks after birth, once you’ve had your GP check. If you’re in pain before then, call us and we’ll advise. Treatment is gentle and adapted to how you gave birth.</p>'],
    ['Is it too late if my baby is older?', '<p>No. Many women come to us months or years after having children with back pain, a tummy gap or leaking. It’s never too late to get checked and start rebuilding strength.</p>'],
    ['Do I need a referral from my GP or midwife?', '<p>No. You can book directly with us. If anything needs a medical opinion first, we’ll tell you and liaise with your GP.</p>'],
    ['Do you do internal pelvic floor examinations?', '<p>Not at present. We screen your pelvic floor with questions and by assessing how your core and pelvis work together. If an internal examination would help, we’ll refer you to a pelvic health physiotherapist.</p>']
  ];
  acc.settings.items.forEach(function (it, i) { if (faqs[i]) it.item_title = faqs[i][0]; });
  acc.elements.forEach(function (c, i) { var te = (c.elements || []).find(function (x) { return x.widgetType === 'text-editor'; }); if (te && faqs[i]) te.settings.editor = faqs[i][1]; });

  ed('a41a54b', '<p>This article is general information, not a substitute for advice from your midwife, GP or osteopath. Contact your GP, midwife or NHS 111 straight away if you have heavy bleeding, a high temperature, a painful or swollen calf, chest pain or breathlessness, or a severe headache. If you feel very low or have thoughts of harming yourself, speak to your GP or call 111.</p>');

  // Sidebar
  t('8d6cbf3', 'Recovering after birth?');
  t('d9138a6', 'Postnatal checks with our women’s health osteopath in Sutton Coldfield.');
  t('236c2d8', '<a href="/womens-health-osteopathy">Women’s Health</a>');
  t('1e8ac00', '<a href="/pregnancy-osteopathy">Pregnancy Osteopathy</a>');
  t('b37833a', '<a href="/back-pain">Back Pain</a>');
  t('9c7a152', '<a href="/does-osteopathy-help-pelvic-girdle-pain">Pelvic Girdle Pain</a>');

  // Fresh ids everywhere (anchors are kept in _element_id)
  var reid = function (e) { e.id = elementorCommon.helpers.getUniqueId(); (e.elements || []).forEach(reid); };
  T.forEach(reid);
  return T;
};
