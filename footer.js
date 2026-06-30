/* SkyCrawler — Footer v6: Light-Sky Cityscape + Fauna-style Info Panel */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  /* ─── STYLES ─────────────────────────────────────────────────────── */
  var css = document.createElement('style');
  css.textContent =
    /* Reset old footer shell */
    'footer.sc-footer{' +
      'padding:0!important;border-top:none!important;' +
      'display:block!important;flex-direction:unset!important;' +
      'align-items:unset!important;justify-content:unset!important;' +
      'overflow:visible;position:relative!important;background:#dde8f5' +
    '}' +
    '.sc-footer svg{display:block;width:100%;vertical-align:bottom}' +

    /* ── Info panel ── */
    '#sc-panel{' +
      'background:#e0e5ed;' +
      'border-radius:28px 28px 0 0;' +
      'margin-top:-28px;' +
      'padding:3.8rem 4.5rem 2.2rem;' +
      'font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;' +
      'position:relative;z-index:2' +
    '}' +
    '#sc-grid{' +
      'display:grid;' +
      'grid-template-columns:2.2fr 1fr 1fr 1fr;' +
      'gap:2rem 3rem;' +
      'max-width:1180px;margin:0 auto;' +
      'padding-bottom:2.8rem;' +
      'border-bottom:1px solid rgba(0,0,0,0.09)' +
    '}' +
    '.sc-brand-name{' +
      'font-size:1.55rem;font-weight:700;letter-spacing:-.045em;' +
      'color:#1d1d1f;margin-bottom:.8rem' +
    '}' +
    '.sc-tagline{' +
      'font-size:.9rem;font-weight:300;color:#6e6e73;' +
      'line-height:1.65;max-width:260px' +
    '}' +
    '.sc-col-hd{' +
      'font-size:.65rem;font-weight:600;letter-spacing:.14em;' +
      'text-transform:uppercase;color:rgba(0,0,0,.32);' +
      'margin-bottom:1.1rem' +
    '}' +
    '.sc-links{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.65rem}' +
    '.sc-links a{' +
      'text-decoration:none;font-size:.88rem;font-weight:400;' +
      'color:#1d1d1f;transition:color .18s' +
    '}' +
    '.sc-links a:hover{color:#6e6e73}' +
    '#sc-vale{' +
      'display:flex;align-items:center;justify-content:center;gap:.65rem;' +
      'padding:1.4rem 0;border-top:1px solid rgba(0,0,0,0.06);' +
      'max-width:1180px;margin:0 auto' +
    '}' +
    '#sc-vale-horse{height:22px;width:auto;opacity:.45}' +
    '#sc-vale>span{font-size:.68rem;font-weight:500;letter-spacing:.15em;' +
      'text-transform:uppercase;color:rgba(0,0,0,.32)}' +
    '#sc-vale strong{font-weight:700;color:rgba(0,0,0,.48)}' +
    '#sc-btm{' +
      'display:flex;align-items:center;justify-content:space-between;' +
      'padding-top:1.4rem;max-width:1180px;margin:0 auto;' +
      'border-top:1px solid rgba(0,0,0,0.06)' +
    '}' +
    '#sc-btm span{font-size:.72rem;color:rgba(0,0,0,.32)}' +
    '@media(max-width:900px){' +
      '#sc-panel{padding:2.5rem 2rem 1.8rem}' +
      '#sc-grid{grid-template-columns:1fr 1fr;gap:2rem 1.5rem}' +
      '.sc-brand-col{grid-column:span 2}' +
      '#sc-btm{flex-direction:column;gap:.5rem;text-align:center}' +
    '}';
  document.head.appendChild(css);

  /* ─── Mount ─────────────────────────────────────────────────────── */
  var footer = document.querySelector('footer');
  if (!footer) return;
  footer.className = 'sc-footer';
  footer.innerHTML = '';

  /* ─── SVG helpers ────────────────────────────────────────────────── */
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  /* ─── SVG canvas ─────────────────────────────────────────────────── */
  var VW = 1440, VH = 370, GY = 358; /* GY = ground y */
  var svg = el('svg', {
    viewBox: '0 0 ' + VW + ' ' + VH,
    width: '100%',
    preserveAspectRatio: 'xMidYMid meet',
    'aria-hidden': 'true'
  }, footer);

  /* Sky */
  el('rect', { x: 0, y: 0, width: VW, height: VH, fill: '#dde8f5' }, svg);

  /* ─── BUILDINGS ──────────────────────────────────────────────────── */
  /*  Each entry: [x, width, topY]
      topY = SVG y-coordinate of building's highest point
      Lower topY = taller building                           */
  var BLDG_C  = '#1a2f52'; /* dark navy silhouette */
  var BLDGS = [
    /* Left zone */
    [0,   42,  92],
    [50,  60,  34],
    [118, 38, 115],
    [164, 54,  52],
    [226, 32, 140],
    [266, 66,  25],
    [340, 44,  88],
    [392, 30, 158],
    [430, 56,  58],
    [494, 36, 108],
    /* Center zone */
    [538, 74,  16],   /* tallest */
    [620, 42,  94],
    [670, 50,  62],
    [728, 28, 148],
    [764, 60,  44],
    [832, 40,  90],
    [880, 68,  26],
    [956, 34, 120],
    /* Right zone */
    [998, 54,  60],
    [1060, 42, 95],
    [1110, 64, 30],
    [1182, 36, 125],
    [1226, 56, 52],
    [1290, 38, 88],
    [1336, 62, 40],
    [1406, 34, 82],
  ];

  /* Stepped-skyscraper polygon (same architectural style as before) */
  function drawBldg(x, w, top) {
    var bH = GY - top;
    var s  = Math.max(4, Math.floor(w * 0.13));
    var h1 = Math.max(12, Math.floor(bH * 0.09));
    var h2 = Math.max(8,  Math.floor(bH * 0.06));
    var pts = [
      x            + ',' + GY,
      (x + w)      + ',' + GY,
      (x + w)      + ',' + (top + h1 + h2),
      (x + w - s)  + ',' + (top + h1 + h2),
      (x + w - s)  + ',' + (top + h2),
      (x + w - 2*s)+ ',' + (top + h2),
      (x + w - 2*s)+ ',' + top,
      (x + 2*s)    + ',' + top,
      (x + 2*s)    + ',' + (top + h2),
      (x + s)      + ',' + (top + h2),
      (x + s)      + ',' + (top + h1 + h2),
      x            + ',' + (top + h1 + h2),
    ].join(' ');
    el('polygon', { points: pts, fill: BLDG_C }, svg);

    /* Subtle right-edge depth shadow */
    var h = GY - top - h1 - h2;
    if (h > 0) el('rect', { x: x + w - 2, y: top + h1 + h2, width: 2, height: h, fill: '#0f1f38', opacity: .45 }, svg);
  }

  BLDGS.forEach(function (b, i) {
    drawBldg(b[0], b[1], b[2]);

    /* Antenna on buildings with topY < 45 */
    if (b[2] < 45) {
      var cx = b[0] + b[1] * 0.5;
      /* Determine antenna height variation */
      var antH = 30 + (i % 4) * 10;
      /* Shaft */
      el('rect', { x: cx - 1.5, y: b[2] - antH, width: 3, height: antH, fill: BLDG_C }, svg);
      /* Thin top segment */
      el('rect', { x: cx - 0.8, y: b[2] - antH - 10, width: 1.6, height: 10, fill: '#243d6a' }, svg);
      /* Small crossbar */
      el('rect', { x: cx - 7, y: b[2] - antH + 5, width: 14, height: 1.5, fill: '#243d6a' }, svg);
    }

    /* Spire (thin tapered top) on tall buildings without antenna (topY 45–70) */
    if (b[2] >= 45 && b[2] < 70) {
      var cx2 = b[0] + b[1] * 0.5;
      var spH = 22 + (i % 3) * 8;
      el('rect', { x: cx2 - 2, y: b[2] - spH, width: 4, height: spH, fill: BLDG_C }, svg);
    }
  });

  /* Ground line */
  el('rect', { x: 0, y: GY, width: VW, height: VH - GY, fill: '#dde8f5' }, svg);

  /* ─── INFO PANEL ─────────────────────────────────────────────────── */
  var lang = localStorage.getItem('sc-lang') || 'nl';
  var nl = lang === 'nl';

  var panel = document.createElement('div');
  panel.id = 'sc-panel';
  panel.innerHTML =
    '<div id="sc-grid">' +
      '<div class="sc-brand-col">' +
        '<div class="sc-brand-name">SkyCrawler</div>' +
        '<div class="sc-tagline">' + (nl
          ? 'Autonome gevelreiniging voor de hoogste gebouwen ter wereld.'
          : 'Autonomous façade cleaning for the world\'s tallest buildings.') +
        '</div>' +
      '</div>' +

      '<div>' +
        '<div class="sc-col-hd">' + (nl ? 'Verkennen' : 'Explore') + '</div>' +
        '<ul class="sc-links">' +
          '<li><a href="home.html">Home</a></li>' +
          '<li><a href="techniek.html">' + (nl ? 'Techniek' : 'Technology') + '</a></li>' +
          '<li><a href="tarieven.html">' + (nl ? 'Tarieven' : 'Pricing') + '</a></li>' +
        '</ul>' +
      '</div>' +

      '<div>' +
        '<div class="sc-col-hd">' + (nl ? 'Bedrijf' : 'Company') + '</div>' +
        '<ul class="sc-links">' +
          '<li><a href="businessplan.html">' + (nl ? 'Over Ons' : 'About Us') + '</a></li>' +
          '<li><a href="contact.html">Contact</a></li>' +
        '</ul>' +
      '</div>' +

      '<div>' +
        '<div class="sc-col-hd">Social</div>' +
        '<ul class="sc-links">' +
          '<li><a href="https://www.linkedin.com/" target="_blank" rel="noopener">LinkedIn</a></li>' +
          '<li><a href="https://x.com/" target="_blank" rel="noopener">X (Twitter)</a></li>' +
          '<li><a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a></li>' +
          '<li><a href="mailto:info@skycrawler.be">Email</a></li>' +
        '</ul>' +
      '</div>' +
    '</div>' +

    '<div id="sc-vale">' +
      '<img src="horseman_logo_transparent.png" id="sc-vale-horse" alt="VALE" />' +
      '<span>' + (nl ? 'Mogelijk gemaakt door' : 'Powered by') + ' <strong>VALE</strong></span>' +
    '</div>' +
    '<div id="sc-btm">' +
      '<span>' + (nl ? '© 2026 SkyCrawler — Alle rechten voorbehouden.' : '© 2026 SkyCrawler — All rights reserved.') + '</span>' +
      '<span>' + (nl ? 'Gebouwd in Gent, België.' : 'Built in Ghent, Belgium.') + '</span>' +
    '</div>';

  footer.appendChild(panel);

})();
