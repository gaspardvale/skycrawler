/* SkyCrawler — Night-Cityscape Footer v3
   New York Art Deco skyline, deep blue night sky, stepped building profiles.
   Support beams stay within the footer. No nav links — socials coming later.
*/
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  /* ─── CSS ──────────────────────────────────────────────── */
  var css = document.createElement('style');
  css.textContent =
    'footer.sc-footer{' +
      'padding:0!important;border-top:none!important;' +
      'display:block!important;flex-direction:unset!important;' +
      'align-items:unset!important;justify-content:unset!important;' +
      'background:#0a1628;overflow:hidden;position:relative!important' +
    '}' +
    '.sc-footer svg{display:block;width:100%}' +
    '@keyframes sc-r{' +
      '0%{transform:translateX(0);opacity:0}3%{opacity:1}' +
      '90%{opacity:1}95%{transform:translateX(var(--dx));opacity:0}' +
      '100%{transform:translateX(0);opacity:0}}' +
    '@keyframes sc-l{' +
      '0%{transform:translateX(0);opacity:0}3%{opacity:1}' +
      '90%{opacity:1}95%{transform:translateX(calc(var(--dx)*-1));opacity:0}' +
      '100%{transform:translateX(0);opacity:0}}' +
    '.sc-br{animation:sc-r var(--t,28s) linear var(--dl,0s) infinite}' +
    '.sc-bl{animation:sc-l var(--t,26s) linear var(--dl,0s) infinite}' +
    '.sc-foot-txt{' +
      'text-align:center;padding:.5rem 2rem .55rem;' +
      'font-size:.72rem;color:rgba(255,255,255,.18);' +
      'font-family:-apple-system,BlinkMacSystemFont,sans-serif;' +
      'letter-spacing:.1em;background:#0a1628}';

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

  /* ─── SVG (no overflow — beams stay inside footer) ─── */
  var svg = el('svg', {
    viewBox: '0 0 1440 280',
    width: '100%',
    preserveAspectRatio: 'xMidYMid meet',
    'aria-hidden': 'true'
  }, footer);

  /* ── Defs ── */
  var defs = el('defs', {}, svg);

  /* Night sky gradient — deep blue, not near-black */
  var skyG = el('linearGradient', {id:'scSky', x1:0, y1:0, x2:0, y2:1}, defs);
  el('stop', {'offset':'0%',  'stop-color':'#112040'}, skyG);
  el('stop', {'offset':'60%', 'stop-color':'#1a2e50'}, skyG);
  el('stop', {'offset':'100%','stop-color':'#1e3456'}, skyG);

  /* Beam gradient — bright at top of footer, fading down to rooftop */
  var bmG = el('linearGradient', {id:'scBmG', x1:0, y1:0, x2:0, y2:1}, defs);
  el('stop', {'offset':'0%',  'stop-color':'#58b6ff','stop-opacity':'.78'}, bmG);
  el('stop', {'offset':'100%','stop-color':'#58b6ff','stop-opacity':'.22'}, bmG);

  /* Beam glow filter */
  var bGF = el('filter', {id:'scBGF', x:'-300%', y:'-2%', width:'700%', height:'104%'}, defs);
  el('feGaussianBlur', {stdDeviation:'2.5', result:'b'}, bGF);
  var bM = el('feMerge', {}, bGF);
  el('feMergeNode', {in:'b'}, bM);
  el('feMergeNode', {in:'SourceGraphic'}, bM);

  /* Eye glow filter */
  var eGF = el('filter', {id:'scEGF', x:'-80%', y:'-80%', width:'260%', height:'260%'}, defs);
  el('feGaussianBlur', {stdDeviation:'1', result:'b'}, eGF);
  var eM = el('feMerge', {}, eGF);
  el('feMergeNode', {in:'b'}, eM);
  el('feMergeNode', {in:'SourceGraphic'}, eM);

  /* ── Night sky background ── */
  el('rect', {width:1440, height:280, fill:'url(#scSky)'}, svg);

  /* Moon — sits in the gap between centre clusters (~x=720) */
  el('circle', {cx:720, cy:40, r:52, fill:'#1a3050', opacity:.45}, svg); /* outer glow */
  el('circle', {cx:720, cy:40, r:42, fill:'#c2d8f2', opacity:.88},  svg); /* face        */
  el('circle', {cx:720, cy:40, r:38, fill:'#cce0f8'},                svg); /* bright core */

  /* Stars */
  [
    [36,14,1],[92,7,.8],[185,20,1.1],[255,10,.9],[340,18,.9],
    [408,5,.7],[495,12,.9],[578,6,.8],[638,22,1],[793,5,.7],
    [854,15,1.1],[920,8,.9],[976,19,1],[1038,10,.8],[1148,7,.9],
    [1228,16,1.1],[1308,5,.7],[1418,13,1],
    [58,38,.6],[170,33,.5],[292,40,.7],[468,36,.6],[612,30,.5],
    [800,42,.7],[958,37,.6],[1082,33,.7],[1192,39,.6],[1352,36,.5],
    [28,54,.5],[152,59,.4],[418,57,.5],[558,61,.4],[872,56,.5],[1258,58,.4]
  ].forEach(function(d) {
    el('circle', {cx:d[0], cy:d[1], r:d[2], fill:'white', opacity:.44}, svg);
  });

  /* ── Building data ────────────────────────────────────────
     NY Art Deco silhouettes: narrow (35–62 px), tall (top = 35–132).
     Deliberate gaps between clusters leave room for footer content.

     Window grid: WW=8, WH=7, col-step=12, row-step=11, H-pad=6
     Robot buildings: index 6 (cx≈471), 10 (cx≈807), 14 (cx≈1090)
  ── */
  var GROUND = 270;
  var BLDG_C = '#05101d';
  var WW=8, WH=7, WCST=12, WRST=11, WPADH=6;

  var BLDGS = [
    /* ─── Left cluster ───────────────────────── */
    {x:5,    w:42, top:78 },
    {x:57,   w:55, top:38 }, /* tall            */
    {x:122,  w:38, top:103},
    {x:170,  w:50, top:56 }, /* tall            */
    {x:230,  w:35, top:122},
    {x:275,  w:48, top:84 },
    /* ── gap x≈323–440 ── */
    /* ─── Centre cluster ─────────────────────── */
    {x:440,  w:62, top:35 }, /* tallest → robot 0 */
    {x:512,  w:40, top:96 },
    {x:562,  w:52, top:62 }, /* tall              */
    {x:624,  w:38, top:112},
    /* ── gap x≈662–780 — moon sits here ── */
    /* ─── Centre-right cluster ───────────────── */
    {x:780,  w:55, top:50 }, /* tall  → robot 1   */
    {x:845,  w:38, top:107},
    {x:893,  w:50, top:73 },
    {x:953,  w:40, top:132},
    /* ── gap x≈993–1060 ── */
    /* ─── Right cluster ──────────────────────── */
    {x:1060, w:60, top:42 }, /* tall  → robot 2   */
    {x:1130, w:38, top:90 },
    {x:1178, w:50, top:65 },
    /* ── gap x≈1228–1290 ── */
    /* ─── Far right ──────────────────────────── */
    {x:1290, w:42, top:97 },
    {x:1342, w:45, top:72 },
    {x:1395, w:42, top:104}
  ];

  /* Art Deco stepped polygon — two symmetric setback levels */
  function bldgPts(b) {
    var x=b.x, w=b.w, top=b.top, bH=GROUND-top;
    var s  = Math.max(3, Math.floor(w  * 0.12));
    var h1 = Math.max(10, Math.floor(bH * 0.08));
    var h2 = Math.max(7,  Math.floor(bH * 0.05));
    return [
      x+','+GROUND,           (x+w)+','+GROUND,
      (x+w)+','+(top+h1+h2),  (x+w-s)+','+(top+h1+h2),
      (x+w-s)+','+(top+h2),   (x+w-s*2)+','+(top+h2),
      (x+w-s*2)+','+top,      (x+s*2)+','+top,
      (x+s*2)+','+(top+h2),   (x+s)+','+(top+h2),
      (x+s)+','+(top+h1+h2),  x+','+(top+h1+h2)
    ].join(' ');
  }

  /* Window colour — white lit (~36%), sky-blue reflect (~22%), dark (~42%) */
  function winCol(bi, row, col) {
    var h  = (bi*3 + row*5 + col*7)    % 11;
    var h2 = (bi*5 + row*7 + col*11+3) % 9;
    if (h  < 4) { return ['#e4f0ff', '.72']; }
    if (h2 < 2) { return ['#6a9cc8', '.48']; }
    return ['#030810', '.9'];
  }

  /* ── Support beams (inside footer only, top < 58) ── */
  BLDGS.forEach(function(b) {
    if (b.top < 58) {
      var cx = b.x + b.w * 0.5;
      el('rect', {
        x:cx-2.5, y:0, width:5, height:b.top,
        fill:'url(#scBmG)', filter:'url(#scBGF)'
      }, svg);
      el('rect', {x:cx-1.2, y:0, width:2.4, height:b.top, fill:'url(#scBmG)'}, svg);
    }
  });

  /* ── Draw buildings ── */
  BLDGS.forEach(function(b, bi) {
    var bH = GROUND - b.top;
    var s  = Math.max(3,  Math.floor(b.w * 0.12));
    var h1 = Math.max(10, Math.floor(bH  * 0.08));
    var h2 = Math.max(7,  Math.floor(bH  * 0.05));

    /* Silhouette polygon */
    el('polygon', {points:bldgPts(b), fill:BLDG_C}, svg);

    /* Subtle right-edge sheen */
    el('rect', {
      x:b.x+b.w-2, y:b.top+h1+h2,
      width:2, height:bH-h1-h2,
      fill:'#102238', opacity:.5
    }, svg);

    /* Water tower (select tall buildings) */
    if (bi===1 || bi===6) {
      var tx=b.x+b.w-17, ty=b.top-14;
      el('rect',    {x:tx+1, y:ty,   width:13, height:14, fill:'#040e1c', rx:1}, svg);
      el('ellipse', {cx:tx+7,  cy:ty, rx:7,    ry:3.5,    fill:'#08182c'}, svg);
      el('rect',    {x:tx+6,  y:ty-9, width:2, height:9,  fill:'#0d1e32'}, svg);
    }

    /* Antenna on tallest building (bi=6) */
    if (bi===6) {
      el('rect', {
        x:b.x+b.w*0.5-1.2, y:b.top-22,
        width:2.4, height:22, fill:'#142235'
      }, svg);
      el('circle', {
        cx:b.x+b.w*0.5, cy:b.top-22, r:4,
        fill:'#60b0ff', opacity:.92, filter:'url(#scBGF)'
      }, svg);
    }

    /* Window grid — starts below the Art Deco crown */
    var winStartY = b.top + h1 + h2 + 4;
    var numCols   = Math.floor((b.w - 2*WPADH - WW) / WCST) + 1;
    var numRows   = Math.floor((GROUND - winStartY - 4) / WRST);

    for (var row=0; row<numRows; row++) {
      for (var col=0; col<numCols; col++) {
        var wx = b.x + WPADH + col*WCST;
        var wy = winStartY + row*WRST;
        var wc = winCol(bi, row, col);
        el('rect', {x:wx, y:wy, width:WW, height:WH, rx:.5, fill:wc[0], opacity:wc[1]}, svg);
      }
    }
  });

  /* Ground line */
  el('rect', {x:0, y:270, width:1440, height:10,  fill:'#040b14'}, svg);
  el('rect', {x:0, y:270, width:1440, height:1.5, fill:'#1a3a5f', opacity:.5}, svg);

  /* ── Robots ──────────────────────────────────────────────
     Each robot (10×7 px) is centred on a window cell.
     [building index, row, startCol, direction, delay seconds]
  ── */
  var ROB_W=10, ROB_H=7;

  var ROBOTS = [
    {bi:6,  row:5, startCol:0, dir:'r', delay:0 },
    {bi:10, row:4, startCol:2, dir:'l', delay:7 },
    {bi:14, row:6, startCol:0, dir:'r', delay:14}
  ];

  function mkBot() {
    var g = el('g', {}, null);
    el('rect', {
      width:ROB_W, height:ROB_H, rx:1.2,
      fill:'#d5d5ec', stroke:'#8080a8', 'stroke-width':'.35'
    }, g);
    [2.5, 7.5].forEach(function(cx) {
      el('circle', {cx:cx, cy:3,   r:1.5,  fill:'#020810'}, g);
      el('circle', {cx:cx, cy:3,   r:.8,   fill:'#50a8ff', filter:'url(#scEGF)'}, g);
    });
    el('rect', {x:-2.5,    y:2.5, width:2.5,      height:1.2, rx:.6, fill:'#8080a8'}, g);
    el('rect', {x:ROB_W,   y:2.5, width:2.5,      height:1.2, rx:.6, fill:'#8080a8'}, g);
    el('rect', {x:.5, y:ROB_H-.5, width:ROB_W-1,  height:1.5, rx:.7, fill:'#a8ccee', opacity:'.8'}, g);
    return g;
  }

  var botsG = el('g', {}, svg);

  ROBOTS.forEach(function(r) {
    var b  = BLDGS[r.bi];
    var bH = GROUND - b.top;
    var s  = Math.max(3,  Math.floor(b.w * 0.12));
    var h1 = Math.max(10, Math.floor(bH  * 0.08));
    var h2 = Math.max(7,  Math.floor(bH  * 0.05));
    var winStartY = b.top + h1 + h2 + 4;

    var numCols = Math.floor((b.w - 2*WPADH - WW) / WCST) + 1;
    var maxCol  = numCols - 1;
    var cols    = r.dir === 'r' ? (maxCol - r.startCol) : r.startCol;
    var dist    = cols * WCST;
    var dur     = (cols / 0.55).toFixed(1) + 's';

    var winX = b.x + WPADH + r.startCol * WCST + (WW - ROB_W) / 2;
    var winY = winStartY + r.row * WRST + (WH - ROB_H) / 2;

    var bot = mkBot();
    bot.setAttribute('transform', 'translate(' + winX + ',' + winY + ')');
    bot.style.cssText = '--dx:' + dist + 'px;--t:' + dur + ';--dl:' + r.delay + 's';
    bot.classList.add(r.dir === 'r' ? 'sc-br' : 'sc-bl');
    botsG.appendChild(bot);
  });

  /* ── Copyright ── */
  var txt = document.createElement('div');
  txt.className = 'sc-foot-txt';
  txt.textContent = '© 2026 SkyCrawler — Alle rechten voorbehouden.';
  footer.appendChild(txt);

})();
