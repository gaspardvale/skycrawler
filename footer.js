/* SkyCrawler — Night-Cityscape Footer v5
   Left gap  : SkyCrawler robot logo, sky-blue tinted + glowing
   Center gap: open starfield (moon moved right)
   Right gap : Moon + social icon row (X, Instagram, LinkedIn, Email)
   Bottom    : "POWERED BY VALE" centered glowing HTML strip
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
    /* robot walk animations */
    '@keyframes sc-r{0%{transform:translateX(0);opacity:0}3%{opacity:1}90%{opacity:1}95%{transform:translateX(var(--dx));opacity:0}100%{transform:translateX(0);opacity:0}}' +
    '@keyframes sc-l{0%{transform:translateX(0);opacity:0}3%{opacity:1}90%{opacity:1}95%{transform:translateX(calc(var(--dx)*-1));opacity:0}100%{transform:translateX(0);opacity:0}}' +
    '.sc-br{animation:sc-r var(--t,28s) linear var(--dl,0s) infinite}' +
    '.sc-bl{animation:sc-l var(--t,26s) linear var(--dl,0s) infinite}' +
    /* social icon hover */
    '.sc-soc{opacity:.52;cursor:pointer;transition:opacity .22s,filter .22s}' +
    '.sc-soc:hover{opacity:1;filter:drop-shadow(0 0 7px rgba(88,182,255,.95))}' +
    /* footer nav links */
    '.sc-fnav text{fill:rgba(255,255,255,.28);transition:fill .22s;cursor:pointer}' +
    '.sc-fnav:hover text{fill:rgba(255,255,255,.88)}' +
    /* VALE bottom strip */
    '.sc-vale-bar{' +
      'display:flex;align-items:center;justify-content:center;gap:10px;' +
      'padding:.6rem 2rem .5rem;background:#0a1628' +
    '}' +
    '.sc-horse-logo{' +
      'height:26px;vertical-align:middle;' +
      'filter:brightness(0) saturate(100%) invert(1) sepia(1) saturate(500%) hue-rotate(185deg) drop-shadow(0 0 10px rgba(88,182,255,.85))' +
    '}' +
    '.sc-pwr-by{' +
      'font-size:.6rem;font-family:-apple-system,BlinkMacSystemFont,sans-serif;' +
      'letter-spacing:.28em;text-transform:uppercase;color:rgba(88,182,255,.45)' +
    '}' +
    '.sc-vale-word{' +
      'font-size:.82rem;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif;' +
      'font-weight:700;letter-spacing:.18em;text-transform:uppercase;' +
      'color:#58b6ff;' +
      'text-shadow:0 0 12px rgba(88,182,255,.9),0 0 28px rgba(88,182,255,.45)' +
    '}' +
    /* copyright */
    '.sc-foot-txt{' +
      'text-align:center;padding:.4rem 2rem .5rem;' +
      'font-size:.7rem;color:rgba(255,255,255,.16);' +
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

  /* ─── SVG canvas ──────────────────────────────────────────── */
  var svg = el('svg', {
    viewBox: '0 0 1440 280',
    width: '100%',
    preserveAspectRatio: 'xMidYMid meet',
    'aria-hidden': 'true'
  }, footer);

  /* ─── Defs ───────────────────────────────────────────────── */
  var defs = el('defs', {}, svg);

  /* Sky gradient */
  var skyG = el('linearGradient', {id:'scSky',x1:0,y1:0,x2:0,y2:1}, defs);
  el('stop', {'offset':'0%',  'stop-color':'#112040'}, skyG);
  el('stop', {'offset':'60%', 'stop-color':'#1a2e50'}, skyG);
  el('stop', {'offset':'100%','stop-color':'#1e3456'}, skyG);

  /* Beam gradient */
  var bmG = el('linearGradient', {id:'scBmG',x1:0,y1:0,x2:0,y2:1}, defs);
  el('stop', {'offset':'0%',  'stop-color':'#58b6ff','stop-opacity':'.78'}, bmG);
  el('stop', {'offset':'100%','stop-color':'#58b6ff','stop-opacity':'.18'}, bmG);

  /* Beam glow filter */
  var bGF = el('filter', {id:'scBGF',x:'-300%',y:'-2%',width:'700%',height:'104%'}, defs);
  el('feGaussianBlur', {stdDeviation:'2.5',result:'b'}, bGF);
  var bM = el('feMerge',{},bGF); el('feMergeNode',{in:'b'},bM); el('feMergeNode',{in:'SourceGraphic'},bM);

  /* Text glow filter */
  var tGF = el('filter', {id:'scTGF',x:'-25%',y:'-60%',width:'150%',height:'220%'}, defs);
  el('feGaussianBlur', {stdDeviation:'4',result:'b'}, tGF);
  var tM = el('feMerge',{},tGF); el('feMergeNode',{in:'b'},tM); el('feMergeNode',{in:'SourceGraphic'},tM);

  /* Eye glow filter */
  var eGF = el('filter', {id:'scEGF',x:'-80%',y:'-80%',width:'260%',height:'260%'}, defs);
  el('feGaussianBlur', {stdDeviation:'1',result:'b'}, eGF);
  var eM = el('feMerge',{},eGF); el('feMergeNode',{in:'b'},eM); el('feMergeNode',{in:'SourceGraphic'},eM);

  /* Logo filter: tint sky-blue (#58b8ff = 0.345, 0.722, 1.0) + glow */
  var loF = el('filter', {id:'scLoF',x:'-25%',y:'-25%',width:'150%',height:'150%','color-interpolation-filters':'sRGB'}, defs);
  el('feColorMatrix', {
    type:'matrix',
    values:'0 0 0 0 0.345  0 0 0 0 0.722  0 0 0 0 1  0 0 0 1 0',
    result:'tinted'
  }, loF);
  el('feGaussianBlur', {in:'tinted',stdDeviation:'9',result:'glow'}, loF);
  var loM = el('feMerge',{},loF);
  el('feMergeNode',{in:'glow'},loM);
  el('feMergeNode',{in:'tinted'},loM);

  /* ─── Sky ─────────────────────────────────────────────────── */
  el('rect', {width:1440,height:280,fill:'url(#scSky)'}, svg);

  /* ─── Stars ───────────────────────────────────────────────── */
  /* avoid logo zone (x=295..508) and moon zone (x=970..1148) */
  [
    [36,13,1.0],[80,7,.8],[130,18,1.1],[178,9,.7],[210,22,.9],
    /* center gap — more stars since moon moved away */
    [670,8,.7],[692,22,.9],[710,14,.8],[730,6,.7],[748,18,1.0],
    [766,10,.8],[785,28,.6],[800,15,.9],[816,8,.7],
    /* far right */
    [1170,6,.7],[1210,13,.9],[1275,8,.8],[1340,17,1.1],[1420,5,.7],
    /* lower stars */
    [56,38,.5],[158,44,.4],
    [672,40,.5],[718,50,.5],[795,42,.5],
    [1188,39,.6],[1302,34,.5],[1382,44,.5]
  ].forEach(function(d){
    el('circle',{cx:d[0],cy:d[1],r:d[2],fill:'white',opacity:.42},svg);
  });

  /* ─── Moon (right gap, cx=1059) ──────────────────────────── */
  el('circle',{cx:1059,cy:40,r:52,fill:'#1a3050',opacity:.4},svg);
  el('circle',{cx:1059,cy:40,r:42,fill:'#c2d8f2',opacity:.88},svg);
  el('circle',{cx:1059,cy:40,r:38,fill:'#cce0f8'},svg);
  el('circle',{cx:1046,cy:32,r:5, fill:'#b8cfe6',opacity:.45},svg);
  el('circle',{cx:1071,cy:48,r:3.5,fill:'#b8cfe6',opacity:.38},svg);
  el('circle',{cx:1055,cy:53,r:2.5,fill:'#b8cfe6',opacity:.32},svg);

  /* ─── Big decorative robot (left gap, x=295..508, center≈401) ─── */
  var BB_CX = 401, BB_Y = 72, BB_W = 80, BB_H = 55;
  var bbg = el('g', {}, svg);
  /* antenna */
  el('rect', {x:BB_CX-2.5, y:BB_Y-28, width:5, height:28, fill:'#142235'}, bbg);
  el('circle', {cx:BB_CX, cy:BB_Y-30, r:10, fill:'#60b0ff', opacity:.8, filter:'url(#scBGF)'}, bbg);
  el('circle', {cx:BB_CX, cy:BB_Y-30, r:5.5, fill:'#90d0ff'}, bbg);
  /* neck */
  el('rect', {x:BB_CX-8, y:BB_Y-5, width:16, height:6, rx:2, fill:'#9090b5'}, bbg);
  /* body */
  el('rect', {x:BB_CX-BB_W/2, y:BB_Y, width:BB_W, height:BB_H, rx:7, fill:'#d5d5ec', stroke:'#8080a8', 'stroke-width':1.2}, bbg);
  /* face panel inset */
  el('rect', {x:BB_CX-28, y:BB_Y+6, width:56, height:36, rx:4, fill:'#c8c8e0'}, bbg);
  /* eyes */
  [BB_CX-13, BB_CX+13].forEach(function(ex) {
    el('circle', {cx:ex, cy:BB_Y+22, r:11, fill:'#020810'}, bbg);
    el('circle', {cx:ex, cy:BB_Y+22, r:6.5, fill:'#50a8ff', filter:'url(#scEGF)'}, bbg);
    el('circle', {cx:ex+3, cy:BB_Y+18, r:2.5, fill:'#b0d8ff', opacity:.6}, bbg);
  });
  /* mouth display */
  el('rect', {x:BB_CX-17, y:BB_Y+36, width:34, height:4, rx:2, fill:'#040e1c'}, bbg);
  [-10,-3,4,11].forEach(function(lx, i) {
    el('rect', {x:BB_CX+lx, y:BB_Y+37, width:3, height:2, rx:.5, fill:i%2===0?'#50a8ff':'#30e890', opacity:.9}, bbg);
  });
  /* chest LEDs */
  el('rect', {x:BB_CX-18, y:BB_Y+44, width:36, height:8, rx:2, fill:'#040e1c', opacity:.6}, bbg);
  [BB_CX-10, BB_CX, BB_CX+10].forEach(function(lx) {
    el('circle', {cx:lx, cy:BB_Y+48, r:2.5, fill:'#50a8ff', opacity:.75, filter:'url(#scEGF)'}, bbg);
  });
  /* arms */
  el('rect', {x:BB_CX-BB_W/2-18, y:BB_Y+10, width:18, height:10, rx:5, fill:'#9090b5'}, bbg);
  el('circle', {cx:BB_CX-BB_W/2-18, cy:BB_Y+15, r:5.5, fill:'#8080a8'}, bbg);
  el('rect', {x:BB_CX+BB_W/2, y:BB_Y+10, width:18, height:10, rx:5, fill:'#9090b5'}, bbg);
  el('circle', {cx:BB_CX+BB_W/2+18, cy:BB_Y+15, r:5.5, fill:'#8080a8'}, bbg);
  /* legs */
  el('rect', {x:BB_CX-24, y:BB_Y+BB_H,   width:18, height:26, rx:4, fill:'#b0c8e0'}, bbg);
  el('rect', {x:BB_CX+6,  y:BB_Y+BB_H,   width:18, height:26, rx:4, fill:'#b0c8e0'}, bbg);
  /* feet */
  el('rect', {x:BB_CX-28, y:BB_Y+BB_H+26, width:26, height:8, rx:3, fill:'#8090a8'}, bbg);
  el('rect', {x:BB_CX+2,  y:BB_Y+BB_H+26, width:26, height:8, rx:3, fill:'#8090a8'}, bbg);

  /* ─── Footer nav links (below robot) ─────────────────────── */
  var FNV_FONT = 'system-ui,-apple-system,BlinkMacSystemFont,sans-serif';
  var FNV_PAGES = [
    {label:'HOME',      href:'home.html'},
    {label:'TECHNIEK',  href:'techniek.html'},
    {label:'TARIEVEN',  href:'tarieven.html'},
    {label:'OVER ONS',  href:'businessplan.html'},
    {label:'CONTACT',   href:'contact.html'}
  ];
  var fnvY0 = 175, fnvStep = 14;
  /* thin divider line */
  el('line', {x1:BB_CX-30, y1:fnvY0-8, x2:BB_CX+30, y2:fnvY0-8, stroke:'rgba(255,255,255,.1)', 'stroke-width':'.7'}, svg);
  FNV_PAGES.forEach(function(lk, i) {
    var a = document.createElementNS(NS, 'a');
    a.setAttribute('href', lk.href);
    a.classList.add('sc-fnav');
    var t = document.createElementNS(NS, 'text');
    t.setAttribute('x', BB_CX);
    t.setAttribute('y', fnvY0 + i * fnvStep);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('font-size', '7');
    t.setAttribute('font-family', FNV_FONT);
    t.setAttribute('letter-spacing', '2');
    t.textContent = lk.label;
    a.appendChild(t);
    svg.appendChild(a);
  });

  /* ─── Social icons (right gap, below moon) ───────────────── */
  /* 4 icons × 22px + 3 × 14px gaps = 130px → center at 1059 → start x=994 */
  var FONT = 'system-ui,-apple-system,BlinkMacSystemFont,sans-serif';
  var socY = 122; /* center y for icons — moved down from moon */

  /* "FOLLOW US" label above icons */
  var flEl = document.createElementNS(NS, 'text');
  flEl.setAttribute('x', 1059);
  flEl.setAttribute('y', 107);
  flEl.setAttribute('fill', 'rgba(255,255,255,.25)');
  flEl.setAttribute('font-size', '6');
  flEl.setAttribute('font-family', FONT);
  flEl.setAttribute('text-anchor', 'middle');
  flEl.setAttribute('letter-spacing', '2.5');
  flEl.textContent = 'FOLLOW US';
  svg.appendChild(flEl);

  var SOC_ICONS = [
    /* X */
    { href: 'https://x.com/ceo_vale_eu',
      path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.626zm-1.161 17.52h1.833L7.084 4.126H5.117z',
      label: 'X / Twitter' },
    /* Instagram */
    { href: 'https://www.instagram.com/vale.codes.eu',
      path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
      label: 'Instagram' },
    /* LinkedIn */
    { href: 'https://www.linkedin.com/',
      path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
      label: 'LinkedIn' },
    /* Email */
    { href: 'mailto:info@skycrawler.be',
      path: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
      label: 'Email' }
  ];

  var socStartX = 1059 - 65; /* 130px total / 2 = 65 */
  var socStep   = 36; /* 22px icon + 14px gap */

  SOC_ICONS.forEach(function(ic, i) {
    var cx = socStartX + i * socStep + 11; /* +11 = half icon width */
    var cy = socY;

    var a = document.createElementNS(NS, 'a');
    a.setAttribute('href', ic.href);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.classList.add('sc-soc');

    var titleEl = document.createElementNS(NS, 'title');
    titleEl.textContent = ic.label;
    a.appendChild(titleEl);

    /* subtle circle background */
    el('circle', {cx:cx, cy:cy, r:14,
      fill:'rgba(255,255,255,0.04)', stroke:'rgba(255,255,255,0.12)', 'stroke-width':'0.7'}, a);

    /* icon path (24×24 viewbox → translate to center) */
    el('path', {
      d: ic.path,
      fill: 'white',
      transform: 'translate('+(cx-12)+','+(cy-12)+')'
    }, a);

    svg.appendChild(a);
  });

  /* ─── BUILDINGS ───────────────────────────────────────────── */
  var GROUND = 270, BLDG_C = '#05101d';
  var WW=8, WH=7, WCST=12, WRST=11, WPADH=6;

  var BLDGS = [
    /* Left cluster (x=5..295) */
    {x:5,   w:40, top:78 },
    {x:55,  w:52, top:40 },  /* beam */
    {x:117, w:36, top:100},
    {x:163, w:46, top:58 },  /* beam */
    {x:219, w:36, top:122},
    {x:265, w:30, top:90 },
    /* Center cluster (x=508..666) */
    {x:508, w:65, top:38 },  /* beam, ROBOT 0, antenna */
    {x:581, w:36, top:96 },
    {x:625, w:41, top:62 },
    /* Center-right cluster (x=820..970) */
    {x:820, w:60, top:52 },  /* beam, ROBOT 1 */
    {x:888, w:36, top:104},
    {x:932, w:38, top:76 },
    /* Right cluster (x=1148..1407) */
    {x:1148,w:65, top:44 },  /* beam, ROBOT 2 */
    {x:1221,w:36, top:92 },
    {x:1265,w:46, top:63 },  /* beam */
    {x:1319,w:36, top:118},
    {x:1363,w:44, top:78 }
  ];

  function bldgPts(b) {
    var x=b.x,w=b.w,top=b.top,bH=GROUND-top;
    var s  = Math.max(3,Math.floor(w*0.12));
    var h1 = Math.max(10,Math.floor(bH*0.08));
    var h2 = Math.max(7, Math.floor(bH*0.05));
    return [
      x+','+GROUND,           (x+w)+','+GROUND,
      (x+w)+','+(top+h1+h2),  (x+w-s)+','+(top+h1+h2),
      (x+w-s)+','+(top+h2),   (x+w-s*2)+','+(top+h2),
      (x+w-s*2)+','+top,      (x+s*2)+','+top,
      (x+s*2)+','+(top+h2),   (x+s)+','+(top+h2),
      (x+s)+','+(top+h1+h2),  x+','+(top+h1+h2)
    ].join(' ');
  }

  function winCol(bi,row,col){
    var h  = (bi*3+row*5+col*7)    % 11;
    var h2 = (bi*5+row*7+col*11+3) % 9;
    if (h  < 4) return ['#e4f0ff','.72'];
    if (h2 < 2) return ['#6a9cc8','.48'];
    return ['#030810','.9'];
  }

  /* Support beams (top < 55) */
  BLDGS.forEach(function(b){
    if (b.top < 55) {
      var cx = b.x + b.w*0.5;
      el('rect',{x:cx-2.5,y:0,width:5,  height:b.top,fill:'url(#scBmG)',filter:'url(#scBGF)'},svg);
      el('rect',{x:cx-1.2,y:0,width:2.4,height:b.top,fill:'url(#scBmG)'},svg);
    }
  });

  /* Draw buildings */
  BLDGS.forEach(function(b,bi){
    var bH=GROUND-b.top;
    var s  = Math.max(3,Math.floor(b.w*0.12));
    var h1 = Math.max(10,Math.floor(bH*0.08));
    var h2 = Math.max(7, Math.floor(bH*0.05));

    el('polygon',{points:bldgPts(b),fill:BLDG_C},svg);
    el('rect',{x:b.x+b.w-2,y:b.top+h1+h2,width:2,height:bH-h1-h2,fill:'#102238',opacity:.5},svg);

    /* Water towers on bi=1 and bi=12 */
    if (bi===1 || bi===12) {
      var tx=b.x+b.w-17, ty=b.top-14;
      el('rect',   {x:tx+1,y:ty,width:13,height:14,fill:'#040e1c',rx:1},svg);
      el('ellipse',{cx:tx+7,cy:ty,rx:7,ry:3.5,fill:'#08182c'},svg);
      el('rect',   {x:tx+6,y:ty-9,width:2,height:9,fill:'#0d1e32'},svg);
    }
    /* Antenna on bi=6 */
    if (bi===6) {
      el('rect',  {x:b.x+b.w*0.5-1.2,y:b.top-22,width:2.4,height:22,fill:'#142235'},svg);
      el('circle',{cx:b.x+b.w*0.5,cy:b.top-22,r:4,fill:'#60b0ff',opacity:.92,filter:'url(#scBGF)'},svg);
    }

    /* Windows */
    var wSY = b.top + h1 + h2 + 4;
    var nC  = Math.floor((b.w - 2*WPADH - WW) / WCST) + 1;
    var nR  = Math.floor((GROUND - wSY - 4) / WRST);
    for (var row=0; row<nR; row++) {
      for (var col=0; col<nC; col++) {
        var wc = winCol(bi,row,col);
        el('rect',{
          x:b.x+WPADH+col*WCST, y:wSY+row*WRST,
          width:WW, height:WH, rx:.5,
          fill:wc[0], opacity:wc[1]
        },svg);
      }
    }
  });

  /* Ground */
  el('rect',{x:0,y:270,width:1440,height:10, fill:'#040b14'},svg);
  el('rect',{x:0,y:270,width:1440,height:1.5,fill:'#1a3a5f',opacity:.5},svg);

  /* ─── ROBOTS ──────────────────────────────────────────────── */
  var ROB_W=10, ROB_H=7;

  function mkBot(){
    var g = el('g',{},null);
    el('rect',{width:ROB_W,height:ROB_H,rx:1.2,fill:'#d5d5ec',stroke:'#8080a8','stroke-width':'.35'},g);
    [2.5,7.5].forEach(function(cx){
      el('circle',{cx:cx,cy:3,r:1.5,fill:'#020810'},g);
      el('circle',{cx:cx,cy:3,r:.8, fill:'#50a8ff',filter:'url(#scEGF)'},g);
    });
    el('rect',{x:-2.5,y:2.5,width:2.5,height:1.2,rx:.6,fill:'#8080a8'},g);
    el('rect',{x:ROB_W, y:2.5,width:2.5,height:1.2,rx:.6,fill:'#8080a8'},g);
    el('rect',{x:.5,y:ROB_H-.5,width:ROB_W-1,height:1.5,rx:.7,fill:'#a8ccee',opacity:'.8'},g);
    return g;
  }

  var botsG = el('g',{},svg);

  function addRobot(x,y,dist,dir,dur,delay){
    var bot = mkBot();
    bot.setAttribute('transform','translate('+x+','+y+')');
    bot.style.cssText='--dx:'+dist+'px;--t:'+dur+'s;--dl:'+delay+'s';
    bot.classList.add(dir==='r'?'sc-br':'sc-bl');
    botsG.appendChild(bot);
  }

  /* Building robots */
  [{bi:6, row:5,startCol:0,dir:'r',delay:0 },
   {bi:9, row:4,startCol:3,dir:'l',delay:7 },
   {bi:12,row:6,startCol:0,dir:'r',delay:14}
  ].forEach(function(r){
    var b   = BLDGS[r.bi];
    var bH  = GROUND-b.top;
    var s   = Math.max(3, Math.floor(b.w*0.12));
    var h1  = Math.max(10,Math.floor(bH*0.08));
    var h2  = Math.max(7, Math.floor(bH*0.05));
    var wSY = b.top+h1+h2+4;
    var nC  = Math.floor((b.w-2*WPADH-WW)/WCST)+1;
    var mC  = nC-1;
    var cols= r.dir==='r'?(mC-r.startCol):r.startCol;
    var dist= cols*WCST;
    var dur = parseFloat((cols/0.55).toFixed(1));
    addRobot(
      b.x+WPADH+r.startCol*WCST+(WW-ROB_W)/2,
      wSY+r.row*WRST+(WH-ROB_H)/2,
      dist,r.dir,dur,r.delay
    );
  });

  /* Moon robot */
  addRobot(1027,63,50,'r',11,2);

  /* ─── Bottom strips ──────────────────────────────────────── */
  var valeBar = document.createElement('div');
  valeBar.className = 'sc-vale-bar';
  valeBar.innerHTML = '<img src="horseman_logo_transparent.png" alt="" class="sc-horse-logo"><span class="sc-pwr-by">POWERED BY</span><span class="sc-vale-word">Vale</span>';
  footer.appendChild(valeBar);

  var copy = document.createElement('div');
  copy.className = 'sc-foot-txt';
  copy.textContent = '© 2026 SkyCrawler — Alle rechten voorbehouden.';
  footer.appendChild(copy);

})();
