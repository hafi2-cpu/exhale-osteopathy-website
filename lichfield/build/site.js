/* Lichfield Osteopathic Practice: site constants shared by every builder.
   Live-site URLs are kept (with their trailing slash); see lichfield/seo/url-plan.md. */
(function () {
  const L = {
    home: '/', fees: '/pricing/', contact: '/contact/', team: '/meet-the-team/',
    book: 'https://exhale-osteopaths.uk2.cliniko.com/bookings?business_id=1833503730075443426#service',
    osteo: '/osteopathy/', babies: '/peadiatric-osteopathy/', massage: '/massage/', physio: '/physiotherapy/', acu: '/acupuncture/', laser: '/laser-therapy/',
    about: '/about/', newp: '/new-patients/',
    back: '/back-pain/', neck: '/neck-pain/', shoulder: '/shoulder-pain/', hip: '/hip-pain/', knee: '/knee-pain/', ankle: '/ankle-pain/', head: '/headaches/', sciatica: '/sciatica/', sports: '/sports-injuries/', tendon: '/tendon-problems/', jaw: '/jaw-pain/',
    hafi: '/hafi-rahman/', freta: '/freta-teklesenbet/', emma: '/emma-thompson/', david: '/david-brown/', zoe: '/zoe-goodwin/', emre: '/emre-tosun/',
    insta: 'https://www.instagram.com/lichfield_osteopaths/', fb: 'https://www.facebook.com/LichfieldOsteopaths/',
    maps: 'https://www.google.com/maps/search/?api=1&query=Lichfield+Osteopathic+Practice+30+Rotten+Row+Lichfield+WS13+6JB',
    dir: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('Lichfield Osteopathic Practice, 30 Rotten Row, Lichfield WS13 6JB')
  };
  const SITE = {
    name: 'Lichfield Osteopathic Practice',
    phone: '01543 252673', tel: 'tel:+441543252673',
    email: 'contact@lichfield-osteopaths.co.uk',
    addr: '30 Rotten Row, Lichfield, Staffordshire, WS13 6JB', addrShort: '30 Rotten Row, Lichfield, WS13 6JB', map: '30 Rotten Row, Lichfield WS13 6JB',
    hours: [['Monday – Friday', '09:00 – 19:00'], ['Saturday', '09:00 – 14:00'], ['Sunday', 'Closed']],
    hoursLine: 'Mon–Fri 09:00–19:00 · Sat 09:00–14:00',
    since: '1983'
  };
  // Team at Lichfield (days and times as given by Hafi, 28 Oct 2026; Emre's days still to confirm)
  const TEAM = [
    { k: 'freta', name: 'Freta Teklesenbet', role: 'Registered Osteopath', photo: 'freta', href: L.freta, days: 'Mon, Tue, Wed & Fri', times: [['Monday', '09:00 – 17:00'], ['Tuesday', '09:00 – 17:00'], ['Wednesday', '09:00 – 17:00'], ['Friday', '09:00 – 17:00']] },
    { k: 'emma', name: 'Emma Thompson', role: 'Registered Osteopath', photo: 'emma', href: L.emma, days: 'Monday', times: [['Monday', '09:00 – 17:00']] },
    { k: 'hafi', name: 'Hafi Rahman', role: 'Registered Osteopath', photo: 'hafi', href: L.hafi, days: 'Friday', times: [['Friday', '10:00 – 17:00']] },
    { k: 'david', name: 'David Brown', role: 'Registered Osteopath', photo: 'david', href: L.david, days: 'Thursday', times: [['Thursday', '09:00 – 18:00']] },
    { k: 'emre', name: 'Emre Tosun', role: 'Physiotherapist', photo: 'emre', href: L.emre, days: '', times: [] },
    { k: 'zoe', name: 'Zoe Goodwin', role: 'Sports Massage Therapist', photo: 'zoe', href: L.zoe, days: 'Wednesday & Saturday', times: [['Wednesday', '16:00 – 20:00'], ['Saturday', '08:00 – 12:00']] }
  ];
  EX.L = L; EX.SITE = SITE; EX.TEAM = TEAM;
})();
