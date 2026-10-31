// Builds the /book page (keeps the live site's URL) from the FAQs page (1128) layout,
// with the same Cliniko embedded booking widget the live /book page uses.
// Run in the new page's Elementor editor: buildBook(JSON.parse(localStorage.faqT))
window.buildBook = function (T) {
  var find = function (a, id) { for (var i = 0; i < a.length; i++) { if (a[i].id === id) return a[i]; var r = find(a[i].elements || [], id); if (r) return r; } return null; };
  var hero = find(T, '5059019');
  find(T, '304b645').settings.title = '<a href="/">Home</a> <span aria-hidden="true">→</span> <strong>Book Online</strong>';
  find(T, '1850747').settings.title = 'Book an Appointment';
  find(T, 'b8e16cf').settings.editor = '<p>Choose your clinic, treatment and clinician, then pick a time that suits you. Prefer to talk to someone? Call 0121 751 2440.</p>';
  hero.elements = hero.elements.filter(function (e) { return e.id !== 'e2502fc'; });

  var sec = find(T, '37dbb96');
  find(T, '9880b29').settings.title = 'Book online';
  find(T, 'afde0fd').settings.title = 'Pick a time that suits you';
  find(T, '6b24620').settings.editor = '<p>Not sure who to see? Call <a class="ex-underline-olive ex-w400" href="tel:01217512440">0121 751 2440</a> and we’ll help you choose. Read our <a class="ex-underline-olive ex-w400" href="/new-patients">new patient guide</a> or see <a class="ex-underline-olive ex-w400" href="/our-fees">our fees</a>.</p>';
  var acc = find(T, 'c804921');
  var html = '<iframe src="https://exhale-osteopaths.uk2.cliniko.com/bookings?embedded=true" title="Book an appointment with Exhale Osteopathy" width="100%" height="1100" style="border:0;width:100%;min-height:1100px;background:#fff;border-radius:6px" loading="lazy"></iframe>';
  var widget = { id: elementorCommon.helpers.getUniqueId(), elType: 'widget', widgetType: 'html', isInner: false, settings: { html: html, _element_width: 'initial', _element_custom_width: { unit: '%', size: 100, sizes: [] } }, elements: [] };
  var wrap = find(T, 'e7421e3');
  wrap.elements = wrap.elements.map(function (e) { return e.id === acc.id ? widget : e; });

  var out = [hero, sec];
  var reid = function (e) { e.id = elementorCommon.helpers.getUniqueId(); (e.elements || []).forEach(reid); };
  out.forEach(reid);
  return out;
};
