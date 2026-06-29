/* SkyCrawler — Night-Cityscape Footer v4
   Layout: [left bldgs] [social panel] [center bldgs] [moon] [center-right bldgs] [vale panel] [right bldgs]
   Robots: 3 on buildings, 1 on moon, 2 on panel borders
*/
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';

  /* ─── CSS ────────────────────────────────────────────────── */
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
      '0%{transform:translateX(0);opacity:0}' +
      '3%{opacity:1}90%{opacity:1}' +
      '95%{transform:translateX(var(--dx));opacity:0}' +
      '100%{transform:translateX(0);opacity:0}' +
    '}' +
    '@keyframes sc-l{' +
      '0%{transform:translateX(0);opacity:0}' +
      '3%{opacity:1}90%{opacity:1}' +
      '95%{transform:translateX(calc(var(--dx)*-1));opacity:0}' +
      '100%{transform:translateX(0);opacity:0}' +
    '}' +
    '.sc-br{animation:sc-r var(--t,28s) linear var(--dl,0s) infinite}' +
    '.sc-bl{animation:sc-l var(--t,26s) linear var(--dl,0s) infinite}' +
    '.sc-foot-txt{' +
      'text-align:center;padding:.5rem 2rem .55rem;' +
      'font-size:.72rem;color:rgba(255,255,255,.18);' +
      'font-family:-apple-system,BlinkMacSystemFont,sans-serif;' +
      'letter-spacing:.1em;background:#0a1628' +
    '}';
  document.head.appendChild(css);

  /* ─── Mount ──────────────────────────────────────────────── */
  var footer = document.querySelector('footer');
  if (!footer) return;
  footer.className = 'sc-footer';
  footer.innerHTML = '';

  /* ─── SVG helpers ─────────────────────────────────────────── */
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function txt(str, attrs, parent) {
    var e = el('text', attrs, parent);
    e.textContent = str;
    return e;
  }

  /* ─── SVG canvas ──────────────────────────────────────────── */
  var svg = el('svg', {
    viewBox: '0 0 1440 280',
    width: '100%',
    preserveAspectRatio: 'xMidYMid meet',
    'aria-hidden': 'true'
  }, footer);

  /* ─── Defs ───────────────────────────────────────────────── */
  var defs = el('defs', {}, svg);

  // Sky gradient
  var skyG = el('linearGradient', {id:'scSky', x1:0, y1:0, x2:0, y2:1}, defs);
  el('stop', {'offset':'0%',  'stop-color':'#112040'}, skyG);
  el('stop', {'offset':'60%', 'stop-color':'#1a2e50'}, skyG);
  el('stop', {'offset':'100%','stop-color':'#1e3456'}, skyG);

  // Beam gradient
  var bmG = el('linearGradient', {id:'scBmG', x1:0, y1:0, x2:0, y2:1}, defs);
  el('stop', {'offset':'0%',  'stop-color':'#58b6ff', 'stop-opacity':'.78'}, bmG);
  el('stop', {'offset':'100%','stop-color':'#58b6ff', 'stop-opacity':'.18'}, bmG);

  // Beam glow filter
  var bGF = el('filter', {id:'scBGF', x:'-300%', y:'-2%', width:'700%', height:'104%'}, defs);
  el('feGaussianBlur', {stdDeviation:'2.5', result:'b'}, bGF);
  var bM = el('feMerge', {}, bGF);
  el('feMergeNode', {in:'b'}, bM);
  el('feMergeNode', {in:'SourceGraphic'}, bM);

  // Text glow filter (for "VALE" title)
  var tGF = el('filter', {id:'scTGF', x:'-25%', y:'-60%', width:'150%', height:'220%'}, defs);
  el('feGaussianBlur', {stdDeviation:'4', result:'b'}, tGF);
  var tM = el('feMerge', {}, tGF);
  el('feMergeNode', {in:'b'}, tM);
  el('feMergeNode', {in:'SourceGraphic'}, tM);

  // Eye glow filter
  var eGF = el('filter', {id:'scEGF', x:'-80%', y:'-80%', width:'260%', height:'260%'}, defs);
  el('feGaussianBlur', {stdDeviation:'1', result:'b'}, eGF);
  var eM = el('feMerge', {}, eGF);
  el('feMergeNode', {in:'b'}, eM);
  el('feMergeNode', {in:'SourceGraphic'}, eM);

  /* ─── Sky background ──────────────────────────────────────── */
  el('rect', {width:1440, height:280, fill:'url(#scSky)'}, svg);

  /* ─── Moon (in gap zone x≈666..820) ─────────────────────── */
  el('circle', {cx:740, cy:40, r:52, fill:'#1a3050', opacity:.4}, svg);
  el('circle', {cx:740, cy:40, r:42, fill:'#c2d8f2', opacity:.88}, svg);
  el('circle', {cx:740, cy:40, r:38, fill:'#cce0f8'}, svg);
  el('circle', {cx:727, cy:32, r:5,  fill:'#b8cfe6', opacity:.45}, svg);
  el('circle', {cx:752, cy:48, r:3.5,fill:'#b8cfe6', opacity:.38}, svg);
  el('circle', {cx:736, cy:53, r:2.5,fill:'#b8cfe6', opacity:.32}, svg);

  /* ─── Stars (avoid panel zones) ─────────────────────────── */
  [
    [36,13,1.0],[80,7,.8],[130,18,1.1],[178,9,.7],[210,22,.9],
    [510,7,.7],[560,8,.6],[614,16,.9],[636,5,.8],[654,20,1.0],
    [685,22,.9],[702,34,.7],[770,30,.6],[795,18,.9],
    [820,15,1.1],[862,8,.8],[896,22,1.0],[922,16,.7],
    [1170,6,.7],[1212,13,.9],[1277,8,.8],[1342,17,1.1],[1422,5,.7],
    [56,38,.5],[158,44,.4],[262,50,.6],
    [516,40,.5],[652,46,.5],[702,57,.5],
    [824,42,.5],[910,52,.4],[952,38,.5],
    [1188,39,.6],[1302,34,.5],[1382,44,.5]
  ].forEach(function(d) {
    el('circle', {cx:d[0], cy:d[1], r:d[2], fill:'white', opacity:.42}, svg);
  });

  /* ─── INFO PANELS ─────────────────────────────────────────── */
  var FONT = 'system-ui,-apple-system,BlinkMacSystemFont,sans-serif';
  var PY = 20, PH = 132;

  function panelCard(x, y, w, h, borderCol) {
    el('rect', {x:x, y:y, width:w, height:h, rx:9,
      fill:'#040e1c', 'fill-opacity':'.84'}, svg);
    el('rect', {x:x, y:y, width:w, height:h, rx:9,
      fill:'none', stroke: borderCol, 'stroke-width':'1'}, svg);
  }

  /* ── Social panel: x=308..498 ── */
  var sp = {x:308, y:PY, w:190, h:PH};
  panelCard(sp.x, sp.y, sp.w, sp.h, 'rgba(100,160,255,0.2)');

  txt('FIND US AT', {
    x: sp.x + sp.w/2, y: sp.y + 18,
    fill:'rgba(255,255,255,.28)', 'font-size':'6.5',
    'font-family':FONT, 'text-anchor':'middle', 'letter-spacing':'2.5'
  }, svg);
  el('line', {x1:sp.x+16, y1:sp.y+25, x2:sp.x+sp.w-16, y2:sp.y+25,
    stroke:'rgba(255,255,255,.1)', 'stroke-width':'1'}, svg);

  function socialRow(icon, label, handle, rowY, bgCol) {
    var ix = sp.x + 22, iy = rowY + 8;
    el('circle', {cx:ix, cy:iy, r:9, fill:bgCol,
      stroke:'rgba(255,255,255,.22)', 'stroke-width':'.8'}, svg);
    txt(icon, {x:ix, y:iy, fill:'rgba(255,255,255,.68)', 'font-size':'7.5',
      'font-family':FONT, 'text-anchor':'middle',
      'dominant-baseline':'central', 'font-weight':'700'}, svg);
    txt(label, {x:sp.x+37, y:rowY+5, fill:'rgba(255,255,255,.78)',
      'font-size':'8', 'font-family':FONT, 'font-weight':'500'}, svg);
    txt(handle, {x:sp.x+37, y:rowY+17, fill:'rgba(255,255,255,.35)',
      'font-size':'6.5', 'font-family':FONT}, svg);
  }

  socialRow('in', 'LinkedIn',  '@SkyCrawler',       sp.y+35, 'rgba(0,120,210,.35)');
  socialRow('ig', 'Instagram', '@skycrawler.be',    sp.y+65, 'rgba(200,50,100,.30)');
  socialRow('@',  'E-mail',    'info@skycrawler.be', sp.y+95, 'rgba(80,180,255,.20)');

  /* ── Vale panel: x=983..1148 ── */
  var vp = {x:983, y:PY, w:165, h:PH};
  panelCard(vp.x, vp.y, vp.w, vp.h, 'rgba(88,182,255,0.28)');

  txt('POWERED BY', {
    x: vp.x + vp.w/2, y: vp.y + 18,
    fill:'rgba(255,255,255,.28)', 'font-size':'6.5',
    'font-family':FONT, 'text-anchor':'middle', 'letter-spacing':'2.5'
  }, svg);
  el('line', {x1:vp.x+16, y1:vp.y+25, x2:vp.x+vp.w-16, y2:vp.y+25,
    stroke:'rgba(88,182,255,.22)', 'stroke-width':'1'}, svg);

  // V-chevron logo (glow)
  var vcx = vp.x + vp.w/2;
  el('polyline', {
    points:(vcx-24)+','+(vp.y+50)+' '+vcx+','+(vp.y+70)+' '+(vcx+24)+','+(vp.y+50),
    fill:'none', stroke:'#58b8ff', 'stroke-width':'2.8',
    'stroke-linecap':'round', 'stroke-linejoin':'round',
    filter:'url(#scBGF)'
  }, svg);
  el('polyline', {
    points:(vcx-24)+','+(vp.y+50)+' '+vcx+','+(vp.y+70)+' '+(vcx+24)+','+(vp.y+50),
    fill:'none', stroke:'rgba(210,238,255,.75)', 'stroke-width':'.8',
    'stroke-linecap':'round', 'stroke-linejoin':'round'
  }, svg);

  // "VALE" glowing
  txt('VALE', {
    x:vcx, y:vp.y+104,
    fill:'#58b8ff', 'font-size':'28',
    'font-family':FONT, 'font-weight':'700',
    'text-anchor':'middle', 'letter-spacing':'4',
    filter:'url(#scTGF)'
  }, svg);
  txt('vale.codes', {
    x:vcx, y:vp.y+120,
    fill:'rgba(88,182,255,.38)', 'font-size':'6.5',
    'font-family':FONT, 'text-anchor':'middle', 'letter-spacing':'1.5'
  }, svg);

  /* ─── BUILDINGS ───────────────────────────────────────────── */
  var GROUND = 270, BLDG_C = '#05101d';
  var WW=8, WH=7, WCST=12, WRST=11, WPADH=6;

  var BLDGS = [
    /* ── Left cluster (x=5..295) ── */
    {x:5,   w:40, top:78 },
    {x:55,  w:52, top:40 },   /* beam */
    {x:117, w:36, top:100},
    {x:163, w:46, top:58 },   /* beam */
    {x:219, w:36, top:122},
    {x:265, w:30, top:90 },
    /* ── Center cluster (x=508..666) ── */
    {x:508, w:65, top:38 },   /* beam, ROBOT 0, antenna */
    {x:581, w:36, top:96 },
    {x:625, w:41, top:62 },
    /* ── Center-right cluster (x=820..970) ── */
    {x:820, w:60, top:52 },   /* beam, ROBOT 1 */
    {x:888, w:36, top:104},
    {x:932, w:38, top:76 },
    /* ── Right cluster (x=1148..1407) ── */
    {x:1148, w:65, top:44 },  /* beam, ROBOT 2 */
    {x:1221, w:36, top:92 },
    {x:1265, w:46, top:63 },  /* beam */
    {x:1319, w:36, top:118},
    {x:1363, w:44, top:78 }
  ];

  function bldgPts(b) {
    var x=b.x, w=b.w, top=b.top, bH=GROUND-top;
    var s  = Math.max(3, Math.floor(w*0.12));
    var h1 = Math.max(10, Math.floor(bH*0.08));
    var h2 = Math.max(7,  Math.floor(bH*0.05));
    return [
      x+','+GROUND,           (x+w)+','+GROUND,
      (x+w)+','+(top+h1+h2),  (x+w-s)+','+(top+h1+h2),
      (x+w-s)+','+(top+h2),   (x+w-s*2)+','+(top+h2),
      (x+w-s*2)+','+top,      (x+s*2)+','+top,
      (x+s*2)+','+(top+h2),   (x+s)+','+(top+h2),
      (x+s)+','+(top+h1+h2),  x+','+(top+h1+h2)
    ].join(' ');
  }

  function winCol(bi, row, col) {
    var h  = (bi*3+row*5+col*7)    % 11;
    var h2 = (bi*5+row*7+col*11+3) % 9;
    if (h  < 4) return ['#e4f0ff', '.72'];
    if (h2 < 2) return ['#6a9cc8', '.48'];
    return ['#030810', '.9'];
  }

  /* ── Support beams (top < 55) ── */
  BLDGS.forEach(function(b) {
    if (b.top < 55) {
      var cx = b.x + b.w*0.5;
      el('rect', {x:cx-2.5, y:0, width:5,   height:b.top, fill:'url(#scBmG)', filter:'url(#scBGF)'}, svg);
      el('rect', {x:cx-1.2, y:0, width:2.4, height:b.top, fill:'url(#scBmG)'}, svg);
    }
  });

  /* ── Draw buildings ── */
  BLDGS.forEach(function(b, bi) {
    var bH = GROUND - b.top;
    var s  = Math.max(3, Math.floor(b.w*0.12));
    var h1 = Math.max(10, Math.floor(bH*0.08));
    var h2 = Math.max(7,  Math.floor(bH*0.05));

    el('polygon', {points:bldgPts(b), fill:BLDG_C}, svg);
    el('rect', {x:b.x+b.w-2, y:b.top+h1+h2, width:2, height:bH-h1-h2,
      fill:'#102238', opacity:.5}, svg);

    // Water towers on tallest building of left & right clusters
    if (bi === 1 || bi === 12) {
      var tx = b.x+b.w-17, ty = b.top-14;
      el('rect',    {x:tx+1, y:ty, width:13, height:14, fill:'#040e1c', rx:1}, svg);
      el('ellipse', {cx:tx+7, cy:ty, rx:7, ry:3.5, fill:'#08182c'}, svg);
      el('rect',    {x:tx+6, y:ty-9, width:2, height:9, fill:'#0d1e32'}, svg);
    }
    // Antenna on tallest center building
    if (bi === 6) {
      el('rect',   {x:b.x+b.w*0.5-1.2, y:b.top-22, width:2.4, height:22, fill:'#142235'}, svg);
      el('circle', {cx:b.x+b.w*0.5, cy:b.top-22, r:4,
        fill:'#60b0ff', opacity:.92, filter:'url(#scBGF)'}, svg);
    }

    // Window grid
    var winStartY = b.top + h1 + h2 + 4;
    var numCols   = Math.floor((b.w - 2*WPADH - WW) / WCST) + 1;
    var numRows   = Math.floor((GROUND - winStartY - 4) / WRST);
    for (var row = 0; row < numRows; row++) {
      for (var col = 0; col < numCols; col++) {
        var wc = winCol(bi, row, col);
        el('rect', {
          x:b.x+WPADH+col*WCST, y:winStartY+row*WRST,
          width:WW, height:WH, rx:.5,
          fill:wc[0], opacity:wc[1]
        }, svg);
      }
    }
  });

  /* ── Ground line ── */
  el('rect', {x:0, y:270, width:1440, height:10,  fill:'#040b14'}, svg);
  el('rect', {x:0, y:270, width:1440, height:1.5, fill:'#1a3a5f', opacity:.5}, svg);

  /* ─── ROBOTS ──────────────────────────────────────────────── */
  var ROB_W = 10, ROB_H = 7;

  function mkBot() {
    var g = el('g', {}, null);
    el('rect', {width:ROB_W, height:ROB_H, rx:1.2,
      fill:'#d5d5ec', stroke:'#8080a8', 'stroke-width':'.35'}, g);
    [2.5, 7.5].forEach(function(cx) {
      el('circle', {cx:cx, cy:3, r:1.5, fill:'#020810'}, g);
      el('circle', {cx:cx, cy:3, r:.8,  fill:'#50a8ff', filter:'url(#scEGF)'}, g);
    });
    el('rect', {x:-2.5, y:2.5, width:2.5, height:1.2, rx:.6, fill:'#8080a8'}, g);
    el('rect', {x:ROB_W,  y:2.5, width:2.5, height:1.2, rx:.6, fill:'#8080a8'}, g);
    el('rect', {x:.5, y:ROB_H-.5, width:ROB_W-1, height:1.5, rx:.7,
      fill:'#a8ccee', opacity:'.8'}, g);
    return g;
  }

  var botsG = el('g', {}, svg);

  function addRobot(x, y, dist, dir, dur, delay) {
    var bot = mkBot();
    bot.setAttribute('transform', 'translate('+x+','+y+')');
    bot.style.cssText = '--dx:'+dist+'px;--t:'+dur+'s;--dl:'+delay+'s';
    bot.classList.add(dir === 'r' ? 'sc-br' : 'sc-bl');
    botsG.appendChild(bot);
  }

  /* ── Building robots ── */
  [{bi:6, row:5, startCol:0, dir:'r', delay:0},
   {bi:9, row:4, startCol:3, dir:'l', delay:7},
   {bi:12,row:6, startCol:0, dir:'r', delay:14}
  ].forEach(function(r) {
    var b   = BLDGS[r.bi];
    var bH  = GROUND - b.top;
    var s   = Math.max(3,  Math.floor(b.w*0.12));
    var h1  = Math.max(10, Math.floor(bH*0.08));
    var h2  = Math.max(7,  Math.floor(bH*0.05));
    var wSY = b.top + h1 + h2 + 4;
    var nC  = Math.floor((b.w - 2*WPADH - WW) / WCST) + 1;
    var mC  = nC - 1;
    var cols = r.dir === 'r' ? (mC - r.startCol) : r.startCol;
    var dist = cols * WCST;
    var dur  = parseFloat((cols / 0.55).toFixed(1));
    addRobot(
      b.x + WPADH + r.startCol*WCST + (WW - ROB_W)/2,
      wSY + r.row*WRST + (WH - ROB_H)/2,
      dist, r.dir, dur, r.delay
    );
  });

  /* ── Moon robot (y≈65 on moon face, half-width ≈ 34 at that y) ── */
  addRobot(708, 63, 50, 'r', 11, 2);

  /* ── Panel border robots (sit on top edge of each panel) ── */
  addRobot(sp.x + 8,          sp.y - ROB_H - 1, sp.w - 18, 'r', 26,  4);
  addRobot(vp.x + vp.w - 18,  vp.y - ROB_H - 1, vp.w - 18, 'l', 21, 12);

  /* ─── Copyright ─────────────────────────────────────────── */
  var t = document.createElement('div');
  t.className = 'sc-foot-txt';
  t.textContent = '© 2026 SkyCrawler — Alle rechten voorbehouden.';
  footer.appendChild(t);

})();
