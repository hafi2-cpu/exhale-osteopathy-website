/* Exhale Osteopathy — shared footer (Elementor Pro Theme Builder "footer" template). */
(function () {
  const { C, W, px, pct, dims, all, gap, heading, text, button, IT, IN } = EX;
  const L = EX.L;
  const colHead = (t) => heading(t, { tag: 'h3', color: '#E6E0D5', t: { f: IN, s: 13, w: 600, ls: 0.14, tt: 'uppercase', lh: 1.4 } });
  const list = (html, o = {}) => text(html, { color: o.color || 'rgba(245,242,234,0.85)', t: { s: o.s || 14, lh: 1.6 },
    x: { _css_classes: 'ex-list ex-on-dark' + (o.gap12 ? ' ex-gap-12' : ''), _margin: dims(o.mt ?? 16, 0, 0, 0) } });

  EX.buildFooter = async function () {
    await EX.clearPage();
    return EX.insert(C({ content_width: 'boxed', html_tag: 'div', background_background: 'classic', background_color: '#4F5945',
      padding: dims(72, 30, 56, 30), padding_mobile: dims(56, 16, 40, 16), _element_id: 'contact' }, [
      C({ container_type: 'grid', grid_columns_grid: { unit: 'custom', size: 'minmax(0,1.3fr) repeat(3,minmax(0,1fr))', sizes: [] },
        grid_columns_grid_tablet: { unit: 'fr', size: 2, sizes: [] }, grid_columns_grid_mobile: { unit: 'fr', size: 1, sizes: [] },
        grid_rows_grid: { unit: 'custom', size: 'auto', sizes: [] }, grid_gaps: { unit: 'px', column: '40', row: '40', isLinked: true } }, [
        C({}, [
          heading('Get In Touch', { tag: 'h2', color: '#F5F2EA', t: { s: 28, ls: -0.02, lh: 1.2 } }),
          list('<p>Exhale Osteopathy<br>1 Sutton Oak Corner, Streetly<br>Sutton Coldfield, B74 2DH</p><p><a href="tel:+441217512440">0121 751 2440</a></p><p><a href="mailto:info@exhaleosteopathy.co.uk">info@exhaleosteopathy.co.uk</a></p>',
            { s: 15, gap12: true, mt: 20 })
        ]),
        C({}, [
          colHead('Opening Hours'),
          list('<p>Monday – Friday 09:00 – 20:00</p><p>Saturday 08:00 – 14:00</p><p>Sunday Closed</p>', { color: 'rgba(245,242,234,0.82)' })
        ]),
        C({}, [
          colHead('Treatments'),
          list('<p><a href="' + L.osteo + '">Osteopathy</a></p><p><a href="/#services">Sports Therapy</a></p><p><a href="' + L.massage + '">Sports Massage</a></p><p><a href="' + L.acu + '">Acupuncture</a></p>',
            { x: {} })
        ]),
        C({ flex_align_items: 'flex-start' }, [
          colHead('Our Clinics'),
          list('<p>Exhale Osteopathy, Sutton Coldfield<br><a class="ex-underline" href="' + L.bham + '">Visiting from Birmingham?</a></p><p>Lichfield Osteopathic Practice<br>30 Rotten Row, Lichfield, WS13 6JB<br><a href="tel:+441543252673">01543 252673</a></p>'),
          button('Book Now', L.book, { kind: 'ivory', h: 48, fs: 14, pl: 22, pr: 22, x: { _margin: dims(22, 0, 0, 0) } })
        ])
      ]),
      C({ flex_direction: 'row', flex_wrap: 'wrap', flex_justify_content: 'space-between', flex_gap: gap(12), margin: dims(56, 0, 0, 0), padding: dims(22, 0, 0, 0),
        border_border: 'solid', border_width: dims(1, 0, 0, 0), border_color: 'rgba(245,242,234,0.18)' }, [
        heading('© 2026 Exhale Osteopathy', { tag: 'p', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 13, lh: 1.6 } }),
        heading('<a href="/privacy-policy">Privacy Policy</a> · <a href="/terms">Terms &amp; Conditions</a> · <a href="/cookie-policy">Cookie Policy</a>',
          { tag: 'p', color: 'rgba(245,242,234,0.88)', t: { f: IN, s: 13, lh: 1.6 }, x: { _css_classes: 'ex-on-dark ex-muted-links' } })
      ])
    ]));
  };
})();
