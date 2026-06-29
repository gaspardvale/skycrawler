/* SkyCrawler — Night-Cityscape Footer v2
   Full-width night skyline with sky-blue structural support beams rising
   upward into the page, and SkyCrawler robots crawling across window faces.
*/
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  /* ─── CSS ──────────────────────────────────────────────── */
  var css = document.createElement('style');
  css.textContent =
    /* Override any existing footer styles */
    'footer.sc-footer{' +
      'padding:0!important;border-top:none!important;' +
      'display:block!important;flex-direction:unset!important;' +
      'align-items:unset!important;justify-content:unset!important;' +
      'background:#02030c;overflow:visible;position:relative!important' +
    '}' +
    /* SVG must also have overflow:visible so beams render above the footer */
    '.sc-footer svg{display:block;width:100%;overflow:visible}' +
    /* ── Robot crawl right ── */
    '@keyframes sc-r{' +
      '0%{transform:translateX(0);opacity:0}' +
      '3%{opacity:1}90%{opacity:1}' +
      '95%{transform:translateX(var(--dx));opacity:0}' +
      '100%{transform:translateX(0);opacity:0}' +
    '}' +
    /* ── Robot crawl left ── */
    '@keyframes sc-l{' +
      '0%{transform:translateX(0);opacity:0}' +
      '3%{opacity:1}90%{opacity:1}' +
      '95%{transform:translateX(calc(var(--dx)*-1));opacity:0}' +
      '100%{transform:translateX(0);opacity:0}' +
    '}' +
    '.sc-br{animation:sc-r var(--t,28s) linear var(--dl,0s) infinite}' +
    '.sc-bl{animation:sc-l var(--t,26s) linear var(--dl,0s) infinite}' +
    /* Footer text strip */
    '.sc-foot-txt{' +
      'text-align:center;padding:.4rem 2rem .3rem;' +
      'font-size:.72rem;color:rgba(255,255,255,.2);' +
      'font-family:-apple-system,BlinkMacSystemFont,sans-serif;' +
      'letter-spacing:.1em;background:#02030c' +
    '}' +
    /* Footer nav */
    '.sc-foot-nav{' +
      'display:flex;align-items:center;justify-content:center;' +
      'flex-wrap:wrap;gap:1.6rem 2rem;padding:.55rem 3rem .8rem;' +
      'border-top:1px solid rgba(80,160,255,.12);background:#02030c' +
    '}' +
    '.sc-foot-nav a{' +
      'font-size:.78rem;color:rgba(255,255,255,.32);text-decoration:none;' +
      'font-family:-apple-system,BlinkMacSystemFont,sans-serif;transition:color .18s' +
    '}' +
    '.sc-foot-nav a:hover{color:rgba(255,255,255,.8)}';

  document.head.appendChild(css);

  /* ─── Mount ─────────────────────────────────────────────── */
  var footer = document.querySelector('footer');
  if (!footer) { return; }
  footer.className = 'sc-footer';
  footer.innerHTML = '';

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) { e.setAttribute(k, attrs[k]); }
    if (parent) { parent.appendChild(e); }
    return e;
  }

  /* ─── SVG
     ViewBox: 1440 × 280 px
     overflow: visible → beams extend above the SVG boundary into the page
  ─── */
  var svg = el('svg', {
    viewBox: '0 0 1440 280',
    width: '100%',
    preserveAspectRatio: 'xMidYMid meet',
    overflow: 'visible',
    'aria-hidden': 'true'
  }, footer);

  /* ── Defs ── */
  var defs = el('defs', {}, svg);

  /* Night sky gradient */
  var skyG = el('linearGradient', {id:'scSky', x1:0, y1:0, x2:0, y2:1}, defs);
  el('stop', {'offset':'0%',  'stop-color':'#010209'}, skyG);
  el('stop', {'offset':'100%','stop-color':'#050a1c'}, skyG);

  /* Support-beam gradient — fades from 0 opacity far above to solid near rooftops.
     gradientUnits="userSpaceOnUse" lets us use absolute SVG y-coordinates. */
  var bmG = el('linearGradient', {
    id:'scBmG', gradientUnits:'userSpaceOnUse',
    x1:0, y1:-600, x2:0, y2:80
  }, defs);
  el('stop', {'offset':'0%',  'stop-color':'#70c4ff','stop-opacity':'0'},   bmG);
  el('stop', {'offset':'70%', 'stop-color':'#70c4ff','stop-opacity':'.35'}, bmG);
  el('stop', {'offset':'100%','stop-color':'#70c4ff','stop-opacity':'.70'}, bmG);

  /* Beam inner bright core gradient */
  var bmGc = el('linearGradient', {
    id:'scBmGc', gradientUnits:'userSpaceOnUse',
    x1:0, y1:-600, x2:0, y2:80
  }, defs);
  el('stop', {'offset':'0%',  'stop-color':'white','stop-opacity':'0'},    bmGc);
  el('stop', {'offset':'100%','stop-color':'white','stop-opacity':'.30'},  bmGc);

  /* Glow filter for beam and antenna */
  var bGF = el('filter', {
    id:'scBGF', x:'-250%', y:'-2%', width:'600%', height:'104%'
  }, defs);
  el('feGaussianBlur', {stdDeviation:'3.5', result:'b'}, bGF);
  var bM = el('feMerge', {}, bGF);
  el('feMergeNode', {in:'b'}, bM);
  el('feMergeNode', {in:'SourceGraphic'}, bM);

  /* Eye glow filter */
  var eGF = el('filter', {
    id:'scEGF', x:'-80%', y:'-80%', width:'260%', height:'260%'
  }, defs);
  el('feGaussianBlur', {stdDeviation:'1.2', result:'b'}, eGF);
  var eM = el('feMerge', {}, eGF);
  el('feMergeNode', {in:'b'}, eM);
  el('feMergeNode', {in:'SourceGraphic'}, eM);

  /* ── Night sky background ── */
  el('rect', {width:1440, height:280, fill:'url(#scSky)'}, svg);

  /* Stars */
  [
    [38,18,1],[95,6,.8],[185,24,1.1],[272,11,.9],[355,21,1],
    [440,5,.7],[525,14,.9],[612,8,.8],[690,27,1],[775,6,.7],
    [858,19,1.1],[942,9,.9],[1028,23,1],[1112,5,.7],[1195,15,1],
    [1280,9,.9],[1388,21,1.1],[1428,7,.7],
    [58,42,.6],[168,38,.5],[315,44,.7],[478,39,.6],[638,34,.5],
    [748,47,.7],[898,41,.6],[1055,37,.7],[1248,43,.6],[1378,39,.5]
  ].forEach(function(d) {
    el('circle', {cx:d[0], cy:d[1], r:d[2], fill:'white', opacity:.38}, svg);
  });

  /* Faint moon glow */
  el('circle', {cx:1310, cy:28, r:24, fill:'#c8deff', opacity:.055}, svg);
  el('circle', {cx:1310, cy:28, r:16, fill:'#d8e8ff', opacity:.055}, svg);

  /* ── Building definitions ──────────────────────────────────
     Buildings span the FULL viewBox width (x=0 to x=1440 exactly).
     Total: 120+155+135+200+165+140+195+155+175 = 1440

     Ground line: y = 270.
     Window grid:  WW=14, WH=12, col step=24, row step=20
     Window padding: 10 px H, 12 px V (from building top)
  ─── */
  var GROUND = 270;
  var WW=14, WH=12, WCST=24, WRST=20, WPADH=10, WPADV=12;

  var BLDGS = [
    {x:0,    w:120, top:168, col:'#0c1428'},
    {x:120,  w:155, top:93,  col:'#0d1730'},
    {x:275,  w:135, top:133, col:'#0b1322'},
    {x:410,  w:200, top:53,  col:'#0c1526'},
    {x:610,  w:165, top:98,  col:'#0b1322'},
    {x:775,  w:140, top:153, col:'#0a1220'},
    {x:915,  w:195, top:78,  col:'#0d1730'},
    {x:1110, w:155, top:118, col:'#0c1428'},
    {x:1265, w:175, top:158, col:'#0b1220'}
  ];

  /* Deterministic window colour lookup */
  function winCol(bi, row, col) {
    var h  = (bi * 3 + row * 5 + col * 7) % 11;
    var h2 = (bi * 5 + row * 7 + col * 11 + 3) % 9;
    if (h  < 3)  { return ['#f4c040', '.74']; } /* warm lit     */
    if (h2 < 2)  { return ['#4a9ad5', '.58']; } /* sky-blue reflect */
    return ['#050d1c', '.92'];                   /* dark / unlit */
  }

  /* Identify which buildings get support beams (tallest ones: top < 130) */
  var beamBuildings = BLDGS.filter(function(b) { return b.top < 130; });

  /* ─ 1. Draw support beams FIRST (rendered behind buildings) ─ */
  beamBuildings.forEach(function(b) {
    var cx = b.x + b.w / 2;
    var beamH = 600 + b.top + 6; /* from y=-600 down to just past rooftop */

    /* Outer glow (wide, soft) */
    el('rect', {
      x: cx - 3.5, y: -600,
      width: 7, height: beamH,
      fill: 'url(#scBmG)', filter: 'url(#scBGF)'
    }, svg);

    /* Solid beam */
    el('rect', {
      x: cx - 1.8, y: -600,
      width: 3.6, height: beamH,
      fill: 'url(#scBmG)'
    }, svg);

    /* Bright inner core */
    el('rect', {
      x: cx - .9, y: -600,
      width: 1.8, height: beamH,
      fill: 'url(#scBmGc)'
    }, svg);
  });

  /* ─ 2. Draw buildings ─ */
  BLDGS.forEach(function(b, bi) {
    var bH = GROUND - b.top;

    /* Body */
    el('rect', {x:b.x, y:b.top, width:b.w, height:bH, fill:b.col}, svg);

    /* Left-edge highlight (subtle 3-D) */
    el('rect', {x:b.x, y:b.top, width:3, height:bH, fill:'#1c2c4e', opacity:.55}, svg);

    /* Roof edge */
    el('rect', {x:b.x, y:b.top, width:b.w, height:3, fill:'#1c305a', opacity:.75}, svg);

    /* ── Rooftop details (cartoon flavour) ── */
    if (bi === 1) {
      /* Water tower */
      var tx = b.x + b.w - 32, ty = b.top - 18;
      el('rect',    {x:tx+2,  y:ty,    width:16, height:18, fill:'#09152a', rx:2}, svg);
      el('ellipse', {cx:tx+10, cy:ty,   rx:10,   ry:4,      fill:'#0c1c38'}, svg);
      el('rect',    {x:tx+9,  y:ty-12, width:2,  height:12, fill:'#1a2a48'}, svg); /* flagpole */
    }
    if (bi === 3) {
      /* Tall building antenna — the beam glow helps it look electric */
      el('rect', {x:b.x+b.w/2-1.5, y:b.top-32, width:3, height:32, fill:'#263050'}, svg);
      el('circle', {cx:b.x+b.w/2, cy:b.top-32, r:4.5,
        fill:'#70c4ff', opacity:.95, filter:'url(#scBGF)'}, svg);
    }
    if (bi === 6) {
      /* HVAC units */
      el('rect', {x:b.x+12,  y:b.top-8, width:22, height:8, fill:'#09152a', rx:1}, svg);
      el('rect', {x:b.x+46,  y:b.top-6, width:16, height:6, fill:'#09152a', rx:1}, svg);
      el('rect', {x:b.x+b.w-34, y:b.top-7, width:20, height:7, fill:'#09152a', rx:1}, svg);
    }

    /* ── Window grid ── */
    var numCols = Math.floor((b.w - WPADH * 2 + (WCST - WW)) / WCST);
    var numRows = Math.floor((bH - WPADV + (WRST - WH)) / WRST);

    for (var row = 0; row < numRows; row++) {
      for (var col = 0; col < numCols; col++) {
        var wx = b.x + WPADH + col * WCST;
        var wy = b.top + WPADV + row * WRST;
        var wc = winCol(bi, row, col);
        el('rect', {
          x:wx, y:wy, width:WW, height:WH,
          rx:1, fill:wc[0], opacity:wc[1]
        }, svg);
      }
    }
  });

  /* ─ 3. Ground line ─ */
  el('rect', {x:0, y:270, width:1440, height:10, fill:'#020408'}, svg);
  el('rect', {x:0, y:270, width:1440, height:1.5, fill:'#2a5888', opacity:.45}, svg);

  /* ─ 4. Robots — appended last so they render above everything ─
     Each robot crawls across an ENTIRE row of windows on its building.
     Starting/ending positions are the left/right edge windows of that row.
     [bldgIndex, row, startCol, dir('r'|'l'), delaySec]
  ─ */
  var ROBOTS = [
    [1, 4, 0,   'r',  0],   /* Building 1 (x=120),  row 4, left → right  */
    [3, 6, 6,   'l',  5],   /* Building 3 (x=410),  row 6, right → left  */
    [6, 3, 0,   'r', 10]    /* Building 6 (x=915),  row 3, left → right  */
  ];

  function mkBot() {
    var g = el('g', {}, null);
    /* Body */
    el('rect', {
      width:12, height:9, rx:1.5,
      fill:'#d8d8ec', stroke:'#8080a8', 'stroke-width':'.4'
    }, g);
    /* Eyes */
    [3.0, 9.0].forEach(function(cx) {
      el('circle', {cx:cx, cy:3.5, r:2,   fill:'#03090f'}, g);
      el('circle', {cx:cx, cy:3.5, r:1.1, fill:'#50a8ff', filter:'url(#scEGF)'}, g);
    });
    /* Arms */
    el('rect', {x:-3.5, y:3, width:3.5, height:1.5, rx:.7, fill:'#8080a8'}, g);
    el('rect', {x:12,   y:3, width:3.5, height:1.5, rx:.7, fill:'#8080a8'}, g);
    /* Cleaning squeegee pad */
    el('rect', {x:.5,  y:8.5, width:11, height:2, rx:1, fill:'#a8ccee', opacity:'.85'}, g);
    return g;
  }

  var botsG = el('g', {}, svg);

  ROBOTS.forEach(function(r) {
    var bi = r[0], robotRow = r[1], startCol = r[2], dir = r[3], delay = r[4];
    var b = BLDGS[bi];

    var numCols = Math.floor((b.w - WPADH * 2 + (WCST - WW)) / WCST);
    var maxCol  = numCols - 1;
    var cols    = dir === 'r' ? (maxCol - startCol) : startCol;
    var dist    = cols * WCST;                         /* px in SVG units */
    var dur     = (cols / 0.65).toFixed(1) + 's';     /* ~0.65 cols/sec  */

    /* Position: robot centred on the starting window */
    var winX = b.x + WPADH + startCol * WCST + (WW - 12) / 2;
    var winY = b.top + WPADV + robotRow * WRST + (WH - 9) / 2;

    var bot = mkBot();
    bot.setAttribute('transform', 'translate(' + winX + ',' + winY + ')');
    bot.style.cssText =
      '--dx:' + dist + 'px;' +
      '--t:'  + dur  + ';' +
      '--dl:' + delay + 's';
    bot.classList.add(dir === 'r' ? 'sc-br' : 'sc-bl');
    botsG.appendChild(bot);
  });

  /* ─ Footer text & nav ─ */
  var txt = document.createElement('div');
  txt.className = 'sc-foot-txt';
  txt.textContent = '© 2026 SkyCrawler — Alle rechten voorbehouden.';
  footer.appendChild(txt);

  var nav = document.createElement('div');
  nav.className = 'sc-foot-nav';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Footer navigatie');
  [
    ['home.html',         'Home'],
    ['techniek.html',     'Techniek'],
    ['tarieven.html',     'Tarieven'],
    ['businessplan.html', 'Businessplan'],
    ['contact.html',      'Contact']
  ].forEach(function(item) {
    var a = document.createElement('a');
    a.href = item[0]; a.textContent = item[1];
    nav.appendChild(a);
  });
  footer.appendChild(nav);

})();
