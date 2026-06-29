/* SkyCrawler — Animated SVG Footer
   Injects a cartoon skyscraper (lying on its side) with small robots
   crawling across its windows. Drop-in: just load this script before </body>.
*/
(function () {
  'use strict';

  /* ─── CSS ─────────────────────────────────────────── */
  var css = document.createElement('style');
  css.textContent =
    /* Reset conflicting simple-footer styles */
    'footer.sc-footer{padding:0!important;border-top:none!important;' +
    'display:block!important;flex-direction:unset!important;' +
    'align-items:unset!important;justify-content:unset!important;' +
    'background:#05050f;overflow:hidden}' +

    /* SVG fills width, capped so it doesn't become enormous on 4K screens */
    '.sc-footer svg{display:block;width:100%;max-height:240px}' +

    /* ── Robot crawl right ── */
    '@keyframes sc-r{' +
      '0%{transform:translateX(0);opacity:0}' +
      '4%{opacity:1}' +
      '90%{opacity:1}' +
      '95%{transform:translateX(var(--dx));opacity:0}' +
      '100%{transform:translateX(0);opacity:0}' +
    '}' +

    /* ── Robot crawl left ── */
    '@keyframes sc-l{' +
      '0%{transform:translateX(0);opacity:0}' +
      '4%{opacity:1}' +
      '90%{opacity:1}' +
      '95%{transform:translateX(calc(var(--dx)*-1));opacity:0}' +
      '100%{transform:translateX(0);opacity:0}' +
    '}' +

    '.sc-br{animation:sc-r var(--t,30s) linear var(--dl,0s) infinite}' +
    '.sc-bl{animation:sc-l var(--t,28s) linear var(--dl,0s) infinite}' +

    /* Copyright strip */
    '.sc-foot-txt{text-align:center;padding:.4rem 2rem .5rem;' +
    'font-size:.72rem;color:rgba(255,255,255,.18);' +
    'font-family:-apple-system,BlinkMacSystemFont,sans-serif;' +
    'letter-spacing:.1em}' +

    /* Footer nav */
    '.sc-foot-nav{display:flex;align-items:center;justify-content:center;' +
    'flex-wrap:wrap;gap:1.6rem 2rem;padding:.55rem 3rem .8rem;' +
    'border-top:1px solid rgba(255,255,255,.06)}' +
    '.sc-foot-nav a{font-size:.78rem;color:rgba(255,255,255,.3);' +
    'text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,sans-serif;' +
    'transition:color .18s}' +
    '.sc-foot-nav a:hover{color:rgba(255,255,255,.7)}';

  document.head.appendChild(css);

  /* ─── SVG helpers ──────────────────────────────────── */
  var NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) { e.setAttribute(k, attrs[k]); }
    if (parent) { parent.appendChild(e); }
    return e;
  }

  /* ─── Mount point ──────────────────────────────────── */
  var footer = document.querySelector('footer');
  if (!footer) { return; }

  footer.className = 'sc-footer';
  footer.innerHTML = '';

  /* ── ViewBox: 1440 × 180
     Building path (stepped skyscraper on its side):
       Left  = base/lobby (full height, all 4 floors)
       Right = top/spire  (steps narrower floor by floor)

     Floor y-bands:  [12–50] [50–88] [88–126] [126–165]
     Step x-edges:    1100    1170    1240     1285
  ─── */
  var svg = el('svg', {
    viewBox: '0 0 1440 180',
    width: '100%',
    preserveAspectRatio: 'xMidYMid meet',
    'aria-hidden': 'true'
  }, footer);

  /* ── Defs ── */
  var defs = el('defs', {}, svg);

  /* Sky gradient */
  var skyG = el('linearGradient', {id:'scSky', x1:0, y1:0, x2:0, y2:1}, defs);
  el('stop', {'offset':'0%',  'stop-color':'#04040c'}, skyG);
  el('stop', {'offset':'100%','stop-color':'#09091b'}, skyG);

  /* Building face gradient */
  var blG = el('linearGradient', {id:'scBl', x1:0, y1:0, x2:0, y2:1}, defs);
  el('stop', {'offset':'0%',  'stop-color':'#1b1d30'}, blG);
  el('stop', {'offset':'100%','stop-color':'#11121e'}, blG);

  /* Antenna glow */
  var aGF = el('filter', {id:'scAG', x:'-60%', y:'-60%', width:'220%', height:'220%'}, defs);
  el('feGaussianBlur', {stdDeviation:'3', result:'b'}, aGF);
  var aM  = el('feMerge', {}, aGF);
  el('feMergeNode', {in:'b'}, aM);
  el('feMergeNode', {in:'SourceGraphic'}, aM);

  /* Eye glow */
  var eGF = el('filter', {id:'scEG', x:'-60%', y:'-60%', width:'220%', height:'220%'}, defs);
  el('feGaussianBlur', {stdDeviation:'1.4', result:'b'}, eGF);
  var eM  = el('feMerge', {}, eGF);
  el('feMergeNode', {in:'b'}, eM);
  el('feMergeNode', {in:'SourceGraphic'}, eM);

  /* ── Background ── */
  el('rect', {width:1440, height:180, fill:'url(#scSky)'}, svg);

  /* Stars */
  [
    [22,8,.85],[90,3,.65],[185,9,.7],[350,5,.55],[495,11,.7],
    [635,4,.5],[820,8,.8],[1000,4,.6],[1145,9,.72],[1300,5,.5],[1405,11,.6]
  ].forEach(function(d) {
    el('circle', {cx:d[0], cy:d[1], r:d[2], fill:'white', opacity:.32}, svg);
  });

  /* Faint city skyline hint at horizon */
  el('rect', {x:0, y:166, width:1440, height:14, fill:'#0a0a1a'}, svg);

  /* ── Building main body (stepped polygon) ── */
  el('path', {
    d: 'M 22,12 H 1100 V 50 H 1170 V 88 H 1240 V 126 H 1285 V 165 H 22 Z',
    fill: 'url(#scBl)'
  }, svg);

  /* Decorative corner blocks at each step (Art Deco look) */
  el('rect', {x:1094, y:12,  width:12, height:38, fill:'#20203c', rx:1}, svg);
  el('rect', {x:1164, y:50,  width:12, height:38, fill:'#1b1b34', rx:1}, svg);
  el('rect', {x:1234, y:88,  width:12, height:38, fill:'#181828', rx:1}, svg);

  /* Floor separators */
  el('rect', {x:22, y:49,  width:1078, height:2, fill:'#07071a', opacity:.98}, svg);
  el('rect', {x:22, y:87,  width:1148, height:2, fill:'#07071a', opacity:.98}, svg);
  el('rect', {x:22, y:125, width:1218, height:2, fill:'#07071a', opacity:.98}, svg);

  /* Top accent band of each floor */
  el('rect', {x:22, y:12,  width:1078, height:3,   fill:'#38385c', opacity:.65}, svg);
  el('rect', {x:22, y:51,  width:1148, height:2.5, fill:'#2d2d50', opacity:.45}, svg);
  el('rect', {x:22, y:89,  width:1218, height:2.5, fill:'#2d2d50', opacity:.40}, svg);
  el('rect', {x:22, y:127, width:1263, height:2.5, fill:'#2d2d50', opacity:.35}, svg);

  /* ── Lobby / left end ── */
  el('rect', {x:22, y:12, width:90, height:153, fill:'#121228'}, svg);
  /* Sign header band */
  el('rect', {x:22, y:12, width:90, height:18, fill:'#1e1e3c'}, svg);
  var signTxt = el('text', {
    x:67, y:24.5, 'text-anchor':'middle',
    'font-family':'-apple-system, BlinkMacSystemFont, sans-serif',
    'font-size':'6.5', fill:'rgba(255,255,255,0.52)',
    'letter-spacing':'.1em'
  }, svg);
  signTxt.textContent = 'SKYCRAWLER';

  /* Lobby upper windows (2 × 1) */
  el('rect', {x:29, y:35, width:36, height:28, fill:'#0d2340', rx:2}, svg);
  el('rect', {x:32, y:38, width:30, height:22, fill:'#1a3860', opacity:.88, rx:1}, svg);
  el('rect', {x:34, y:40, width:8,  height:7,  fill:'white',   opacity:.07, rx:1}, svg);
  el('rect', {x:68, y:35, width:36, height:28, fill:'#0d2340', rx:2}, svg);
  el('rect', {x:71, y:38, width:30, height:22, fill:'#1a3860', opacity:.88, rx:1}, svg);
  el('rect', {x:73, y:40, width:8,  height:7,  fill:'white',   opacity:.07, rx:1}, svg);

  /* Lobby entrance doors */
  el('rect', {x:29, y:68, width:80, height:97, fill:'#0b1c34', rx:1}, svg);
  el('rect', {x:35, y:74, width:28, height:87, fill:'#153050', opacity:.88, rx:1}, svg);
  el('rect', {x:68, y:74, width:28, height:87, fill:'#153050', opacity:.88, rx:1}, svg);
  el('rect', {x:37, y:76, width:8,  height:14, fill:'white',   opacity:.07, rx:1}, svg);
  el('rect', {x:70, y:76, width:8,  height:14, fill:'white',   opacity:.07, rx:1}, svg);
  el('rect', {x:61, y:96, width:2,  height:30, fill:'#4880c0', opacity:.4,  rx:1}, svg);
  /* Warm light at lobby ceiling */
  el('rect', {x:29, y:68, width:80, height:6, fill:'#f0c040', opacity:.07, rx:1}, svg);

  /* ── Rooftop HVAC / mechanical units ── */
  [
    [142,7,22,5], [305,8,16,4], [480,7,20,5],
    [645,8,16,4], [825,7,22,5], [990,8,18,4]
  ].forEach(function(d) {
    el('rect', {x:d[0], y:d[1], width:d[2], height:d[3], fill:'#1e1e38', rx:1}, svg);
  });

  /* ── Antenna mast + beacon ──
     Mast rises from y=1 down through the sky, anchors into floor-2 zone.
     Beacon sits at the very top (y≈1).
  ── */
  el('rect', {x:1279, y:1, width:3.5, height:126, fill:'#30305a', opacity:.9}, svg);
  el('circle', {
    cx:1280.75, cy:1, r:4.5,
    fill:'#5227FF', opacity:1, filter:'url(#scAG)'
  }, svg);

  /* ── Window grid ──────────────────────────────────── */
  var WX0   = 115;   /* first column x  */
  var WSTEP = 40;    /* column spacing  */
  var WW    = 30;    /* window width    */
  var WH    = 26;    /* window height   */
  /* y-top of windows per floor: floor_top + (38-26)/2 = floor_top + 6 */
  var FY  = [18, 56, 94, 132];
  /* max columns per floor (limited by setback) */
  var FMX = [24, 26, 28, 29];

  /* Lit windows (warm office light) */
  var LIT = {
    '0-2':1,'0-7':1,'0-11':1,'0-16':1,'0-21':1,
    '1-0':1,'1-5':1,'1-10':1,'1-14':1,'1-20':1,'1-25':1,
    '2-3':1,'2-8':1,'2-13':1,'2-18':1,'2-23':1,'2-27':1,
    '3-1':1,'3-6':1,'3-11':1,'3-16':1,'3-21':1,'3-26':1
  };
  /* Sky-reflection windows (bright blue glass) */
  var REFL = {
    '0-0':1,'0-5':1,'0-9':1,'0-14':1,'0-19':1,'0-23':1,
    '1-2':1,'1-7':1,'1-12':1,'1-17':1,'1-22':1,
    '2-1':1,'2-6':1,'2-11':1,'2-16':1,'2-21':1,'2-25':1,
    '3-4':1,'3-9':1,'3-14':1,'3-19':1,'3-24':1,'3-28':1
  };

  var wg = el('g', {}, svg);
  FY.forEach(function(fy, row) {
    for (var c = 0; c < FMX[row]; c++) {
      var wx  = WX0 + c * WSTEP;
      var key = row + '-' + c;
      var fill, op;
      if      (LIT[key])  { fill = '#f0c040'; op = '.74'; }
      else if (REFL[key]) { fill = '#5a9ad5'; op = '.55'; }
      else                { fill = '#0e2442'; op = '.90'; }
      el('rect', {x:wx, y:fy, width:WW, height:WH, rx:2, fill:fill, opacity:op}, wg);
    }
  });

  /* ── Robots ────────────────────────────────────────
     Each robot:  14 × 10 px body, two glowing blue eyes, side arms, cleaning pad.
     Animation:   fade in → crawl → fade out → teleport back → repeat.
  ── */
  function mkBot() {
    var g = el('g', {}, null);
    /* Body */
    el('rect', {
      width:13, height:10, rx:2,
      fill:'#d5d5e8', stroke:'#8585a5', 'stroke-width':'.5'
    }, g);
    /* Eyes */
    [3.2, 9.3].forEach(function(cx) {
      el('circle', {cx:cx, cy:4, r:2.2, fill:'#060e1a'}, g);
      el('circle', {cx:cx, cy:4, r:1.3, fill:'#3a8aff', filter:'url(#scEG)'}, g);
    });
    /* Arms */
    el('rect', {x:-4,  y:3.5, width:4,  height:1.8, rx:.8, fill:'#8888a8'}, g);
    el('rect', {x:13,  y:3.5, width:4,  height:1.8, rx:.8, fill:'#8888a8'}, g);
    /* Cleaning pad (bottom) */
    el('rect', {x:1, y:9.5, width:11, height:2, rx:1, fill:'#b8d8f0', opacity:'.85'}, g);
    return g;
  }

  var bg = el('g', {}, svg);

  /* [floor, startCol, dir ('r'|'l'), delaySec] */
  [
    [1,  0, 'r',  0],   /* floor 1: crawls  left → right */
    [0, 21, 'l',  4],   /* floor 0: crawls right → left  */
    [2,  4, 'r',  9],   /* floor 2: crawls  left → right */
    [3, 26, 'l',  2]    /* floor 3: crawls right → left  */
  ].forEach(function(d) {
    var floor = d[0], sCol = d[1], dir = d[2], delay = d[3];
    var bot   = mkBot();
    var maxC  = FMX[floor] - 1;
    var cols  = dir === 'r' ? (maxC - sCol) : sCol;
    var dist  = cols * WSTEP;                      /* px in SVG units */
    var dur   = (cols / 0.85).toFixed(1) + 's';   /* ~0.85 cols/sec  */
    /* Starting position: horizontally centred inside first window */
    var sx = WX0 + sCol * WSTEP + (WW - 13) / 2;
    var sy = FY[floor] + (WH - 10) / 2;
    bot.setAttribute('transform', 'translate(' + sx + ',' + sy + ')');
    bot.style.cssText =
      '--dx:' + dist + 'px;' +
      '--t:'  + dur  + ';' +
      '--dl:' + delay + 's';
    bot.classList.add(dir === 'r' ? 'sc-br' : 'sc-bl');
    bg.appendChild(bot);
  });

  /* ── Footer text & nav ── */
  var txt = document.createElement('div');
  txt.className = 'sc-foot-txt';
  txt.textContent = '© 2026 SkyCrawler — Alle rechten voorbehouden.';
  footer.appendChild(txt);

  var nav = document.createElement('nav');
  nav.className = 'sc-foot-nav';
  nav.setAttribute('aria-label', 'Footer navigatie');
  [
    ['home.html',         'Home'],
    ['techniek.html',     'Techniek'],
    ['tarieven.html',     'Tarieven'],
    ['businessplan.html', 'Businessplan'],
    ['contact.html',      'Contact']
  ].forEach(function(item) {
    var a = document.createElement('a');
    a.href = item[0];
    a.textContent = item[1];
    nav.appendChild(a);
  });
  footer.appendChild(nav);

})();
