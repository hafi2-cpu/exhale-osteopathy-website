// Restores the fuller pelvic girdle pain article content (post 400) inside the existing layout.
// Run in post 400's Elementor editor: expandPGP(T) where T is the current elements array.
window.expandPGP = function (T) {
  var find = function (a, id) { for (var i = 0; i < a.length; i++) { if (a[i].id === id) return a[i]; var r = find(a[i].elements || [], id); if (r) return r; } return null; };
  var ed = function (id, v) { var e = find(T, id); if (!e) throw new Error('missing ' + id); e.settings.editor = v; };

  ed('d217635',
    '<p>Osteopathy is a hands-on approach that aims to restore comfortable movement and function in the pelvis, lower back and hips. Treatment is always adapted for pregnancy. We use side-lying and seated positions with plenty of support, and gentle techniques suited to your stage.</p>' +
    '<p>Just as important, we help you understand why your pelvis is hurting and what you can do about it. Once you know which movements load the sore joints and how to manage them, everyday activities usually become much easier and you feel more in control.</p>');

  ed('676467e', '<p><strong>Joint mobilisation:</strong> gentle, rhythmic movement of the pelvic and lower back joints to ease stiffness and help them move more comfortably.</p>');
  ed('e0a0542', '<p><strong>Soft tissue work:</strong> easing tight, guarded muscles around the hips, buttocks and back, which can relieve pain and improve circulation to the area.</p>');
  ed('bcc5753', '<p><strong>Postural advice:</strong> simple, tailored changes to how you sit, stand, sleep and move, to reduce the strain on your pelvis through the day.</p>');
  ed('60cd578', '<p><strong>Exercises &amp; stretches:</strong> targeted work to strengthen the muscles around your pelvis and improve stability.</p>');
  ed('e9a64a0', '<p><strong>Clinical Pilates:</strong> one-to-one Pilates to build core and pelvic stability, ease symptoms and help stop pain coming back.</p>');

  ed('6ca2ec7',
    '<p>Research into manual therapy for pregnancy-related pelvic pain is still growing, but studies, including a 2021 observational study of pregnant women receiving osteopathic treatment, have reported improvements in low back and pelvic pain and in quality of life, particularly in women who had several treatments.</p>' +
    '<p>Osteopathy is a drug-free option, which many women value during pregnancy. By combining joint mobilisation, soft tissue work, postural advice and exercise, it aims to address the reasons your pelvis is sore rather than just the symptoms. Many of our patients find this combination makes daily life much easier.</p>');

  ed('8bccc11',
    '<p>We’ll ask about your pregnancy, your symptoms and what makes them better or worse, then gently assess how your pelvis, back and hips are moving. Treatment usually includes hands-on work such as gentle joint articulation, muscle stretching and, where helpful, very gentle cranial osteopathy techniques to help restore balance through the pelvis.</p>' +
    '<p>The main aims are to reduce the load on the irritated joint, restore comfortable movement and ease your pain. Most people need a few sessions. Your osteopath will talk you through how quickly you can expect things to improve, and give you personalised exercises and practical advice so you can keep making progress between appointments.</p>');

  ed('ca78f21',
    '<p>Gentle exercise alongside treatment can strengthen the muscles that support your pelvis, improve stability and reduce pain over time. Always check with your osteopath or midwife which exercises are right for you, and stop anything that increases your pain.</p>');

  ed('6ec403f', '<p>Lie on your back with your knees bent and feet flat on the floor. Gently tighten your tummy and lift your hips until your body forms a straight line from shoulders to knees. Hold briefly, then lower slowly. This works the glute and core muscles that support your pelvis. If lying on your back makes you feel dizzy or unwell, stop and roll onto your side.</p>');
  ed('2c2635d', '<p>Imagine stopping the flow of urine, then gently squeeze and lift those muscles. Hold for a few seconds and fully relax. Build up the length and number of squeezes over time. A strong pelvic floor helps support your pelvis and is recommended throughout pregnancy.</p>');
  ed('095e8c8', '<p>On all fours, or standing with your back against a wall, gently tilt your pelvis to flatten your lower back. Hold briefly, then release. This works your tummy muscles and eases stiffness in the lower back and pelvis.</p>');
  ed('325e2a7', '<p>Low-impact activity such as walking or swimming (avoiding breaststroke kick) keeps you fit and helps circulation without straining your pelvic joints. Start with shorter sessions and build up gradually as your body adapts.</p>');
  ed('d01c861', '<p>Holding a chair or worktop, with your feet shoulder-width apart, slowly lower into a shallow squat, keeping your knees in line with your toes and your back straight. Hold briefly, then rise. This strengthens your hips, thighs and buttocks. Only go as low as feels comfortable.</p>');

  ed('299477b', '<p>Keep your knees together when getting in and out of the car or turning in bed · sleep with a pillow between your knees and keep it there as you roll over · take stairs one step at a time · keep both feet on the floor when sitting and take shorter steps when walking · use a soft ice pack for about 20 minutes, or a warm (not hot) wheat bag, for comfort · ask us whether a pelvic support belt or Tubigrip could help · rest when you need to.</p>');
  ed('64dd91a', '<p>Standing on one leg (sit down to put on trousers instead) · heavy lifting or pushing, such as shopping or a heavy pram · carrying a toddler on one hip · wide-legged movements such as breaststroke kick or some gym machines and yoga poses · long walks while your pain is flaring · anything that makes your pain worse.</p>');

  ed('a52bbc6', '<p>Try to avoid lifting or pushing heavy loads, standing on one leg, carrying a child on one hip and wide-legged movements such as breaststroke kick, some yoga poses and certain gym machines. Above all, if an activity makes your pain worse, it’s a sign to stop and rest.</p>');
  ed('d1bcc69', '<p>Common triggers include walking for long periods, going up and down stairs, standing on one leg (for example to get dressed), turning over in bed and moving your legs apart, such as getting out of a car. Some women also notice a clicking or grinding feeling in the pelvis.</p>');
  ed('53eca6f', '<p>A mix of treatment and self-care usually works best: hands-on osteopathy, gentle exercise, a pillow between your knees at night, keeping your knees together when you move, a soft ice pack for about 20 minutes or a warm wheat bag, and sometimes a pelvic support belt or Tubigrip fitted by your osteopath. Reducing your activity for a while can also help, and we’ll advise you when to build back up.</p>');

  // Local section before the call-to-action box
  var parent = find(T, '5c3e0a6');
  var hTpl = find(T, 'dc231f9'), pTpl = find(T, 'ca78f21');
  var h = JSON.parse(JSON.stringify(hTpl)); h.settings.title = 'Pelvic girdle pain treatment in Sutton Coldfield &amp; Birmingham';
  var p = JSON.parse(JSON.stringify(pTpl));
  p.settings.editor = '<p>At Exhale Osteopathy in Streetly, Sutton Coldfield, we treat pelvic girdle pain at every stage of pregnancy and after birth, for women from Sutton Coldfield, Four Oaks, Walsall and across north Birmingham. Your osteopath will take time to understand what is causing your pain and give you a clear plan of gentle hands-on treatment, exercises and practical advice.</p>' +
    '<p>If your pain carries on after your baby arrives, our <a href="/womens-health-osteopathy">women’s health osteopathy</a> service includes a postnatal check with a written recovery plan. You can also read more about our <a href="/pregnancy-osteopathy">pregnancy osteopathy</a>.</p>';
  [h, p].forEach(function (e) { e.id = elementorCommon.helpers.getUniqueId(); });
  var idx = parent.elements.findIndex(function (e) { return e.id === '9fa7c5c'; });
  parent.elements.splice(idx, 0, h, p);

  var meta = find(T, '47a4328'); meta.settings.editor = meta.settings.editor.replace('6 min read', '9 min read');
  return T;
};
