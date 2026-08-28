
;/* ── Icon set: replaces emoji ───────────────────────────────────
   Emoji render as full-colour Apple/Google artwork that clashes with a
   restrained luxury palette and looks different on every OS. These are
   monochrome line glyphs that inherit the surrounding text colour. */
var MGI = (function(){
  var P = {
    pool:'<path d="M2 17c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1"/><path d="M2 21c1.5 0 1.5 1 3 1s1.5-1 3-1"/><path d="M7 17V4a2 2 0 0 1 4 0"/><path d="M15 17V4a2 2 0 0 1 4 0"/><path d="M7 9h4M15 9h4"/>',
    sea:'<path d="M2 12c1.6 0 1.6 1.2 3.2 1.2S6.8 12 8.4 12s1.6 1.2 3.2 1.2S13.2 12 14.8 12s1.6 1.2 3.2 1.2S19.6 12 21.2 12"/><path d="M2 17c1.6 0 1.6 1.2 3.2 1.2S6.8 17 8.4 17s1.6 1.2 3.2 1.2S13.2 17 14.8 17s1.6 1.2 3.2 1.2S19.6 17 21.2 17"/><path d="M6 8a6 6 0 0 1 12 0"/>',
    bed:'<path d="M3 18v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7"/><path d="M3 18h18M5 10V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M4 18v2M20 18v2"/>',
    bath:'<path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3z"/><path d="M6 12V6a2 2 0 0 1 4 0"/><path d="M7 19l-1 2M17 19l1 2"/>',
    gym:'<path d="M6.5 6.5v11M17.5 6.5v11M4 9v6M20 9v6M6.5 12h11"/>',
    spa:'<path d="M12 21c0-5 2.5-9 7-11-1 5-3.5 8.5-7 11z"/><path d="M12 21c0-5-2.5-9-7-11 1 5 3.5 8.5 7 11z"/><path d="M12 21v-6"/>',
    golf:'<path d="M12 20V4l7 4-7 4"/><path d="M8 20h9"/><circle cx="7" cy="18" r="1.4"/>',
    security:'<path d="M12 3l7 3v6c0 4.2-2.9 7.7-7 9-4.1-1.3-7-4.8-7-9V6l7-3z"/>',
    view:'<path d="M3 19l5.5-7 3.5 4.2L15.5 12 21 19H3z"/><circle cx="8" cy="7" r="2"/>',
    garden:'<path d="M12 21V11"/><path d="M12 11c0-3 2-5 5-5 0 3-2 5-5 5z"/><path d="M12 14c0-3-2-5-5-5 0 3 2 5 5 5z"/><path d="M8 21h8"/>',
    kitchen:'<path d="M6 3v8a2 2 0 0 0 2 2 2 2 0 0 0 2-2V3"/><path d="M8 13v8"/><path d="M17 3c-1.5 1.5-2 3.5-2 5.5s.5 3.5 2 4.5v8"/>',
    parking:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h3.5a3 3 0 0 1 0 6H9"/>',
    invest:'<path d="M3 17l5-5 4 4 8-8"/><path d="M15 8h5v5"/>',
    hotel:'<path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16"/><path d="M15 10h4a1 1 0 0 1 1 1v10"/><path d="M2 21h20"/><path d="M8 8h3M8 12h3M8 16h3"/>',
    school:'<path d="M12 4 2 9l10 5 10-5-10-5z"/><path d="M6 12v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4"/>',
    mall:'<path d="M4 8h16l-1.2 11a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/>',
    diamond:'<path d="M6 3h12l3 6-9 12L3 9l3-6z"/><path d="M3 9h18M9 3l-3 6 6 12M15 3l3 6-6 12"/>',
    money:'<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h4a1.8 1.8 0 0 1 0 3.6h-3a1.8 1.8 0 0 0 0 3.6h4"/>',
    doc:'<path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7l-4-4z"/><path d="M14 3v4h4"/>',
    plan:'<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 10h18M10 10v11"/>',
    video:'<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4V8z"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    mail:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="m2 7 10 7 10-7"/>',
    jet:'<path d="M21 12l-7-1.5V5.5a1.5 1.5 0 0 0-3 0v5L4 12v2l7-1v3.5L8.5 18v1.5L12 19l3.5.5V18L13 16.5V13l8 1v-2z"/>',
    hospital:'<path d="M4 21V8.5a1 1 0 0 1 .5-.87l7-4a1 1 0 0 1 1 0l7 4a1 1 0 0 1 .5.87V21"/><path d="M2 21h20"/><path d="M12 10v6M9 13h6"/>',
    padel:'<ellipse cx="11" cy="8.5" rx="5.5" ry="6.5"/><path d="M9.6 14.8 8 21h6l-1.6-6.2"/><path d="M8.5 6.5h5M8.5 9h5M8.5 11.5h5"/>',
    store:'<path d="M4 9h16l-1 11.2a1 1 0 0 1-1 .8H6a1 1 0 0 1-1-.8L4 9z"/><path d="M3 9l1.4-4.3A1 1 0 0 1 5.3 4h13.4a1 1 0 0 1 .95.7L21 9"/><path d="M9.5 13h5"/>',
    grid:'<rect x="3.5" y="3.5" width="7" height="7" rx="1"/><rect x="13.5" y="3.5" width="7" height="7" rx="1"/><rect x="3.5" y="13.5" width="7" height="7" rx="1"/><rect x="13.5" y="13.5" width="7" height="7" rx="1"/>',
    tree:'<path d="M12 21v-5"/><path d="M12 16c-3.3 0-6-2.5-6-5.6 0-3 2.7-5.4 6-5.4s6 2.4 6 5.4c0 3.1-2.7 5.6-6 5.6z"/><path d="M8.5 21h7"/>',
    star:'<path d="m12 3 2.6 5.7 6.4.7-4.7 4.3 1.2 6.3L12 17l-5.5 3 1.2-6.3L3 9.4l6.4-.7L12 3z"/>'
  };
  function svg(key, cls){
    var p = P[key] || P.star;
    return '<svg class="mgi '+(cls||'')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" '+
           'stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';
  }
  /* map free text (a feature line, a highlight label) to a glyph */
  function pick(text){
    var t = String(text || '').toLowerCase();
    if (/pool|infinity/.test(t))            return 'pool';
    if (/beach|ocean|sea|water/.test(t))    return 'sea';
    if (/bedroom|en-suite|\bbed\b/.test(t)) return 'bed';
    if (/bath|shower/.test(t))              return 'bath';
    if (/gym|fitness/.test(t))              return 'gym';
    if (/spa|wellness|yoga|massage/.test(t))return 'spa';
    if (/golf/.test(t))                     return 'golf';
    if (/secur|guard|cctv|gated/.test(t))   return 'security';
    if (/view|panorama|vista/.test(t))      return 'view';
    if (/garden|landscap|tropical|green/.test(t)) return 'garden';
    if (/kitchen|dining|chef/.test(t))      return 'kitchen';
    if (/park|garage|car/.test(t))          return 'parking';
    if (/yield|invest|return|roi|rental/.test(t)) return 'invest';
    if (/hotel|resort|brand|residence/.test(t))   return 'hotel';
    if (/school|educat/.test(t))            return 'school';
    if (/mall|shop|retail/.test(t))         return 'mall';
    if (/price|baht|thb|usd|cost/.test(t))  return 'money';
    if (/plan|layout|floor/.test(t))        return 'plan';
    if (/video|tour|film/.test(t))          return 'video';
    if (/exclusive|luxur|premium/.test(t))  return 'diamond';
    if (/villa|home|house|propert/.test(t)) return 'home';
    return 'star';
  }
  return { svg: svg, pick: pick, icon: function(text, cls){ return svg(pick(text), cls); } };
})();
/* ═══════════════════════════════════════════════════════════════
   SCROLL LOCK — one mechanism, cannot strand the page
   ───────────────────────────────────────────────────────────────
   History: this site could permanently stop scrolling. Two causes:
     1. `body { overflow-x:hidden }` — per spec that computes
        overflow-y to `auto`, making <body> a second scroll container
        the size of its content. Nothing to scroll, and it swallowed
        wheel events instead of passing them to the viewport. Signature:
        window.scrollBy() works but the mouse wheel does nothing.
     2. Overlays locked scroll four different ways (a class with
        position:fixed, body.style.overflow, body.style.top,
        overlay-open) and only some exit paths cleared them. Leaving
        by browser Back, bfcache, or a nav link that skipped the close
        handler froze the page for good.
   Both are gone. Locking now happens only here, only on <html>, and a
   watchdog force-clears it whenever nothing is actually open — so no
   future edit can strand it again.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  var owners = Object.create(null);

  function apply() {
    var locked = false;
    for (var k in owners) { if (owners[k]) { locked = true; break; } }
    document.documentElement.classList.toggle('mg-locked', locked);
  }

  window.mgLock   = function (owner) { owners[owner || 'anon'] = true;  apply(); };
  window.mgUnlock = function (owner) { delete owners[owner || 'anon'];  apply(); };
  window.mgUnlockAll = function () { owners = Object.create(null); apply(); };

  /* Anything that is genuinely open right now. If none of these are
     open, the page MUST be scrollable — no exceptions. */
  var OVERLAYS = ['mobileNav','mobileNavOverlay','detOverlay','videoLightbox',
                  'bookOverlay','privacyModal','cookieModal','insArticlePanel'];

  function anythingOpen() {
    var onPropertyPage = document.body && document.body.getAttribute('data-page') === 'property';
    for (var i = 0; i < OVERLAYS.length; i++) {
      if (onPropertyPage && OVERLAYS[i] === 'detOverlay') continue;
      var el = document.getElementById(OVERLAYS[i]);
      if (el && el.classList.contains('open')) return true;
    }
    return false;
  }

  function heal() {
    if (anythingOpen()) return;
    var html = document.documentElement, body = document.body;
    if (html.classList.contains('mg-locked') || body.style.overflow ||
        body.style.position === 'fixed' || body.style.top ||
        body.classList.contains('scroll-locked') || body.classList.contains('overlay-open')) {
      window.mgUnlockAll();
      body.style.overflow = ''; body.style.position = ''; body.style.top = '';
      body.classList.remove('scroll-locked', 'overlay-open');
      body.removeAttribute('data-scroll-y');
    }
  }

  var t = null;
  function schedule() { clearTimeout(t); t = setTimeout(heal, 60); }

  window.addEventListener('pageshow', schedule);
  window.addEventListener('popstate', schedule);
  window.addEventListener('load', schedule);
  document.addEventListener('visibilitychange', schedule);
  document.addEventListener('click', schedule, true);
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') schedule(); });

  if (window.MutationObserver) {
    var mo = new MutationObserver(schedule);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
    var bind = function () {
      mo.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });
      OVERLAYS.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) mo.observe(el, { attributes: true, attributeFilter: ['class'] });
      });
      heal();
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
    else bind();
  }
})();


// sbImg: Supabase image transformation helper
function sbImg(url,w,q){w=w||1800;q=q||80;if(!url)return url;if(url.includes('/render/image/public/')){return url.split('?')[0]+'?width='+w+'&quality='+q;}if(url.includes('/storage/v1/object/public/')){return url.replace('/storage/v1/object/public/','/storage/v1/render/image/public/')+'?width='+w+'&quality='+q;}return url;}
(function(){var cb=document.getElementById('cookieBanner');if(cb&&localStorage.getItem('ck'))cb.style.display='none';})();
;

function showComingSoon(){
  var m=document.getElementById('comingSoonModal');
  if(m){ m.classList.add('open'); mgLock('modal'); }
}
function hideComingSoon(e){
  if(e && e.target && e.target.id && e.target.id!=='comingSoonModal' && e.currentTarget!==e.target && !e.target.classList.contains('cs-modal-close') && !e.target.classList.contains('cs-modal-btn-ghost')) {
    // allow
  }
  var m=document.getElementById('comingSoonModal');
  if(m){ m.classList.remove('open'); mgUnlock('modal'); }
}
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){ var m=document.getElementById('comingSoonModal'); if(m && m.classList.contains('open')) hideComingSoon(); }
});

;

/* ══════════════════════════════════════════════════════
   HERO VIDEO CONFIG — แก้ตรงนี้เพื่อเปลี่ยน video
   ══════════════════════════════════════════════════════ */
const HERO_CONFIG = {
  // ═══════════════════════════════════════════════════════
  // HERO VIDEO CONFIG — แก้ตรงนี้เพื่อเปลี่ยนวิดีโอ
  // ═══════════════════════════════════════════════════════

  // ตัวเลือก 1: Supabase Storage URL (แนะนำ)
  // หลังจากอัปโหลดวิดีโอเข้า Supabase Storage bucket 'media'
  // URL จะเป็น: https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/media/hero.mp4
  VIDEO_SRC: 'hero.mp4',


  // Dark overlay ทับวิดีโอ (true = มืดลง เห็นตัวหนังสือชัดขึ้น)
  DARKER_OVERLAY: true,

  // Supabase Storage info
  SUPABASE_STORAGE: 'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/media/',
};

/* ── Hero Video — src is in HTML, no JS needed ── */

/* ─── PAGE NAVIGATION ─── */
function goCollections(e) {
  if(e && e.preventDefault) e.preventDefault();
  
  var hv = document.getElementById('hubView');
  var gv = document.getElementById('gridView');
  var lbl = document.getElementById('cpBackLabel');
  var cp = document.getElementById('collPage');
  if(!cp) return;
  if(hv) hv.style.display = 'none';
  if(gv) gv.style.display = 'block';
  if(lbl) lbl.textContent = 'Back';
  currentColl = 'all';
  currentSort = 'random';
  if(typeof shuffle === 'function') shuffledAll = shuffle([...PROPS]);
  renderGrid();
  var lbl2 = document.getElementById('ddLabel');
  if(lbl2) lbl2.textContent = 'All Collections';
  document.querySelectorAll('.coll-dd-option').forEach(function(o,i){ o.classList.toggle('active', i===0); });
  cp.classList.add('open')
  loadHubData();;
  cp.scrollTop = 0;
  mgLock('panel');
  document.getElementById('homePage')?.classList.add('hidden');
}

function closeCollHub() {
  var cp = document.getElementById('collPage');
  if (cp) { cp.classList.remove('open'); cp.style.transform = ''; }
  var _sy = parseInt(document.body.getAttribute('data-scroll-y') || '0', 10);
  mgUnlock('panel');
  
  mgUnlock('modal');
  var hp = document.getElementById('homePage');
  if (hp) hp.classList.remove('hidden');
  window.scrollTo(0, _sy);
}
function openCollFromHub(collId, collLabel) {
  showGridView();
  var hv = document.getElementById('hubView');
  var gv = document.getElementById('gridView');
  var lbl = document.getElementById('cpBackLabel');
  if(hv) hv.style.display = 'none';
  if(gv) gv.style.display = 'block';
  if(lbl) lbl.textContent = 'Back to Collections';
  // Filter grid
  currentColl = collId;
  currentSort = 'random';
  shuffledAll = shuffle([...PROPS]);
  renderGrid();
  document.getElementById('collPage').scrollTop = 0;
  // Update dropdown
  document.getElementById('ddLabel').textContent = collLabel;
  document.querySelectorAll('.coll-dd-option').forEach((o,i) => {
    o.classList.toggle('active', o.getAttribute('onclick') && o.getAttribute('onclick').includes("'" + collId + "'"));
  });
  document.querySelectorAll('.coll-sort-btn').forEach((b,i) => {
    b.classList.toggle('active', i===0);
  });
  // Sync dropdown to selected collection
  if(collId && collId !== 'all') {
    currentColl = collId;
    var ddLabel = document.getElementById('ddLabel');
    if(ddLabel) ddLabel.textContent = collLabel || collId;
    document.querySelectorAll('.coll-dd-option').forEach(function(o){
      o.classList.toggle('active', o.getAttribute('data-coll') === collId);
    });
    if(typeof shuffle === 'function') shuffledAll = shuffle([...window.PROPS||PROPS]);
    renderGrid();
  }
}
function goCollAll(e) {
  if(e) e.preventDefault();
  var hv = document.getElementById('hubView');
  var gv = document.getElementById('gridView');
  var lbl = document.getElementById('cpBackLabel');
  if(hv) hv.style.display = 'none';
  if(gv) gv.style.display = 'block';
  if(lbl) lbl.textContent = 'Back to Collections';
  shuffledAll = shuffle([...PROPS]);
  currentColl = 'all';
  currentSort = 'random';
  renderGrid();
  var cp = document.getElementById('collPage');
  if(cp) { cp.classList.add('open'); cp.scrollTop = 0; }
  document.getElementById('ddLabel').textContent = 'All Collections';
  document.querySelectorAll('.coll-dd-option').forEach((o,i) => {
    o.classList.toggle('active', i===0);
  });
}
function goHome(e) {
  if(e && e.preventDefault) e.preventDefault();
  var pages = ['collPage','processPage','insightsPage','rentPage','wellnessPage'];
  pages.forEach(function(id){
    var el = document.getElementById(id);
    if(!el) return;
    el.classList.remove('open');
    el.style.transform = '';
    el.style.pointerEvents = '';
  });
  // Close detail overlay and article panel
  var detOv = document.getElementById('detOverlay');
  if (detOv) detOv.classList.remove('open');
  var artPanel = document.getElementById('insArticlePanel');
  if (artPanel) artPanel.classList.remove('open');
  var ip = document.getElementById('insightsPage');
  if (ip) ip.style.overflow = '';
  
  mgUnlock('panel');
  
  mgUnlock('modal');
  document.getElementById('homePage')?.classList.remove('hidden');
  window.scrollTo(0, 0);
}
function goBack() { goHome(); }


function goContact(e) {
  if(e && e.preventDefault) e.preventDefault();
  // Close overlays first, then scroll to contact
  var pages = ['collPage','processPage','insightsPage'];
  pages.forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.classList.remove('open');
  });
  mgUnlock('modal');
  setTimeout(function(){
    var el = document.getElementById('contact');
    if(!el) el = document.querySelector('#contact, [id="contact"]');
    if(el) el.scrollIntoView({behavior:'smooth'});
  }, 100);
}
function goRent(e) {
  if(e && e.preventDefault) e.preventDefault();
  // RENT now lives on its own site (rent.mgroupestates.com) — the old in-page
  // rentPage panel below is left in place but no longer opened.
  window.location.href = 'https://rent.mgroupestates.com';
}

// ── RENTAL LISTINGS (Public) ─────────────────────────────────
var rentalVillas = [];
var rentalVillasLoaded = false;
var rentalCurrentArea = 'all';
var rentalCurrentView = 'all';
var rentalCurrentType = 'all';

async function loadRentalVillasPublic() {
  try {
    var resp = await fetch(SB_URL + '/rest/v1/rental_villas?is_active=eq.true&order=is_featured.desc,created_at.desc', {
      headers: { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY }
    });
    if (!resp.ok) throw new Error('Failed to load');
    rentalVillas = await resp.json();
    rentalVillasLoaded = true;
    renderRentalGrid();
  } catch(e) {
    console.warn('MGROUP: Rental load failed:', e.message);
    document.getElementById('rentGrid').innerHTML =
      '<div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--stone);font-size:13px">Unable to load rental villas. Please try again later.</div>';
    document.getElementById('rentCountLabel').textContent = '';
  }
}

function renderRentalGrid() {
  var filtered = rentalVillas;
  if (rentalCurrentArea !== 'all') {
    filtered = filtered.filter(function(v) {
      return (v.area || '').toLowerCase().indexOf(rentalCurrentArea.toLowerCase()) !== -1 ||
             (v.location || '').toLowerCase().indexOf(rentalCurrentArea.toLowerCase()) !== -1;
    });
  }
  if (rentalCurrentView !== 'all') {
    filtered = filtered.filter(function(v) {
      return (v.view_type || '').toLowerCase() === rentalCurrentView.toLowerCase();
    });
  }
  if (rentalCurrentType !== 'all') {
    filtered = filtered.filter(function(v) {
      return (v.villa_type || '').toLowerCase() === rentalCurrentType.toLowerCase();
    });
  }

  var label = document.getElementById('rentCountLabel');
  label.textContent = filtered.length + ' VILLA' + (filtered.length !== 1 ? 'S' : '') + ' AVAILABLE';

  var grid = document.getElementById('rentGrid');
  if (filtered.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--stone);font-size:13px">No properties match your filters. <button onclick="setRentArea(\'all\');setRentView(\'all\');setRentType(\'all\')" style="color:var(--black);text-decoration:underline;background:none;border:none;cursor:pointer;font-size:13px">Reset all</button></div>';
    return;
  }

  var defaultImg = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80';

  grid.innerHTML = filtered.map(function(v) {
    var img = v.cover_image || defaultImg;
    var area = v.area || '';
    var loc = v.location || area;
    // Show Yearly as main, Monthly as sub (price/night removed)
    var priceYearlyVal = v.price_yearly;
    var priceMonthVal = v.price_per_month;
    var priceYearly = '';
    if (priceYearlyVal === -1 || priceYearlyVal === '-1') priceYearly = 'On Request';
    else if (priceYearlyVal && priceYearlyVal > 0) priceYearly = '฿' + Number(priceYearlyVal).toLocaleString();
    var priceMonth = '';
    if (priceMonthVal === -1 || priceMonthVal === '-1') priceMonth = 'On Request';
    else if (priceMonthVal && priceMonthVal > 0) priceMonth = '฿' + Number(priceMonthVal).toLocaleString();
    var desc = v.description || '';
    var poolLabel = v.pool_type && v.pool_type !== 'none' ? v.pool_type.charAt(0).toUpperCase() + v.pool_type.slice(1) + ' Pool' : '';
    var villaId = v.id;

    return '<div class="rent-card" onclick="openRentDetail(\'' + villaId + '\')">' +
      '<div class="rent-card-img">' +
        '<div class="rent-card-img-inner" style="background-image:url(' + mgImg(img, 760) + ')"></div>' +
        '<div class="rent-card-img-overlay"></div>' +
        '<div class="rent-card-badges">' +
          (v.is_featured ? '<span class="rent-badge featured">Featured</span>' : '') +
          (v.villa_type ? '<span class="rent-badge">' + v.villa_type + '</span>' : '') +
        '</div>' +
        '<div class="rent-card-over">' +
          '<span class="rent-card-area">' + area + '</span>' +
          '<div class="rent-card-name">' + (v.name || 'Luxury Villa') + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="rent-card-body">' +
        '<div class="rent-card-loc">' + loc + '</div>' +
        '<div class="rent-card-specs">' +
          (v.bedrooms ? '<span class="rent-spec"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" style="color:rgba(13,13,13,.55)"><path d="M2.5 18.5v-6a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v6"/><path d="M2.5 18.5h19"/><path d="M5.5 10.5V8a1.5 1.5 0 0 1 1.5-1.5h10A1.5 1.5 0 0 1 18.5 8v2.5"/><path d="M4 18.5v2M20 18.5v2"/></svg><span style="font-family:\'Lato\',sans-serif;font-size:13px;color:var(--black)">' + v.bedrooms + '</span><span style="font-family:\'Lato\',sans-serif;font-size:9px;letter-spacing:0.13em;text-transform:uppercase;color:var(--stone)">Bedrooms</span></span>' : '') +
          (v.bathrooms ? '<span class="rent-spec"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" style="color:rgba(13,13,13,.55)"><path d="M3 12.5h18v2.5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2.5Z"/><path d="M6.5 12.5V6.2A2.2 2.2 0 0 1 8.7 4h.1a2.2 2.2 0 0 1 2.2 2.2"/><path d="M9.4 6.6h2.6"/><path d="M7.5 19.5 6.5 21M16.5 19.5l1 1.5"/></svg><span style="font-family:\'Lato\',sans-serif;font-size:13px;color:var(--black)">' + v.bathrooms + '</span><span style="font-family:\'Lato\',sans-serif;font-size:9px;letter-spacing:0.13em;text-transform:uppercase;color:var(--stone)">Bathrooms</span></span>' : '') +
          (v.sqm ? '<span class="rent-spec"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" style="color:rgba(13,13,13,.55)"><path d="m3 10.6 9-7.1 9 7.1"/><path d="M5.4 9.2V20a.8.8 0 0 0 .8.8h11.6a.8.8 0 0 0 .8-.8V9.2"/><path d="M10 20.8v-5h4v5"/></svg><span style="font-family:\'Lato\',sans-serif;font-size:13px;color:var(--black)">' + v.sqm + '</span><span style="font-family:\'Lato\',sans-serif;font-size:9px;letter-spacing:0.13em;text-transform:uppercase;color:var(--stone)">sqm</span></span>' : '') +
          (v.max_guests ? '<span class="rent-spec"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" style="color:rgba(13,13,13,.55)"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span style="font-family:\'Lato\',sans-serif;font-size:13px;color:var(--black)">' + v.max_guests + '</span><span style="font-family:\'Lato\',sans-serif;font-size:9px;letter-spacing:0.13em;text-transform:uppercase;color:var(--stone)">Guests</span></span>' : '') +
        '</div>' +
        (desc ? '<div class="rent-card-desc">' + desc + '</div>' : '') +
        '<div class="rent-card-footer">' +
          '<div class="rent-card-prices">' +
            (priceYearly ? '<div class="rent-price-main">' + priceYearly + (priceYearly === 'On Request' ? '' : '<span class="rent-price-sub"> / month (yearly)</span>') + '</div>' : '') +
            (priceMonth ? '<div class="rent-price-sub" style="font-size:10px;color:var(--stone)">' + priceMonth + (priceMonth === 'On Request' ? '' : ' / month') + '</div>' : '') +
          '</div>' +
          '<div class="rent-card-view">View &rarr;</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  // Staggered fade-in
  requestAnimationFrame(function() {
    grid.querySelectorAll('.rent-card').forEach(function(el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity 0.38s ease ' + (i * 0.055) + 's, transform 0.38s ease ' + (i * 0.055) + 's, box-shadow 0.35s ease';
      setTimeout(function() { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, i * 55 + 20);
    });
  });
}

// Filter dropdowns
function setRentArea(area) {
  rentalCurrentArea = area;
  document.getElementById('rentFilterArea').value = area;
  renderRentalGrid();
}
function setRentView(view) {
  rentalCurrentView = view;
  document.getElementById('rentFilterView').value = view;
  renderRentalGrid();
}
function setRentType(type) {
  rentalCurrentType = type;
  document.getElementById('rentFilterType').value = type;
  renderRentalGrid();
}

// ─── RENTAL DETAIL — FULL PAGE ───
var _rentGalleryImgs = [];
var _rentGalleryIdx = 0;

/* openRentDetail() removed — rentals now live on rent.mgroupestates.com */


function rentDetThumb(idx) {
  _rentGalleryIdx = idx;
  var mainImg = document.getElementById('rentDetMainImg');
  if (mainImg) mainImg.src = mgImg(_rentGalleryImgs[idx], 1600);
  // Update active thumb
  document.querySelectorAll('.rent-det-thumb').forEach(function(t, i) {
    t.classList.toggle('active', i === idx);
  });
  // Update counter
  var counter = document.querySelector('.rent-det-gallery-counter');
  if (counter) counter.textContent = (idx + 1) + ' / ' + _rentGalleryImgs.length;
}

function closeRentDetail() {
  var ov = document.getElementById('rentDetOverlay');
  if (!ov) return;
  var savedScroll = ov._rpScroll || 0;
  var rp = document.getElementById('rentPage');
  ov.remove();
  // Restore children that were hidden when detail opened
  if (rp) {
    Array.from(rp.children).forEach(function(ch) {
      if (ch._prevDisplay !== undefined) {
        ch.style.display = ch._prevDisplay;
        delete ch._prevDisplay;
      }
    });
    rp.scrollTop = savedScroll;
  }
}

// Lightbox with prev/next navigation
function rentDetLightbox(idx) {
  _rentGalleryIdx = idx;
  var old = document.getElementById('rentDetLightbox');
  if (old) old.remove();

  var lb = document.createElement('div');
  lb.id = 'rentDetLightbox';
  lb.className = 'rent-det-lightbox';
  lb.innerHTML =
    '<button class="rent-det-lb-close" onclick="rentDetLbClose()">&times;</button>' +
    '<button class="rent-det-lb-nav rent-det-lb-prev" onclick="event.stopPropagation();rentDetLbNav(-1)">&lsaquo;</button>' +
    '<img id="rentDetLbImg" src="' + _rentGalleryImgs[idx] + '" alt="">' +
    '<button class="rent-det-lb-nav rent-det-lb-next" onclick="event.stopPropagation();rentDetLbNav(1)">&rsaquo;</button>' +
    '<div class="rent-det-lb-counter" id="rentDetLbCounter">' + (idx + 1) + ' / ' + _rentGalleryImgs.length + '</div>';
  lb.addEventListener('click', function(e) { if (e.target === lb) rentDetLbClose(); });
  document.body.appendChild(lb);

  // Keyboard navigation
  document.addEventListener('keydown', _rentDetLbKey);
}

function _rentDetLbKey(e) {
  if (e.key === 'Escape') rentDetLbClose();
  if (e.key === 'ArrowLeft') rentDetLbNav(-1);
  if (e.key === 'ArrowRight') rentDetLbNav(1);
}

function rentDetLbNav(dir) {
  _rentGalleryIdx = (_rentGalleryIdx + dir + _rentGalleryImgs.length) % _rentGalleryImgs.length;
  var img = document.getElementById('rentDetLbImg');
  if (img) img.src = mgImg(_rentGalleryImgs[_rentGalleryIdx], 1600);
  var cnt = document.getElementById('rentDetLbCounter');
  if (cnt) cnt.textContent = (_rentGalleryIdx + 1) + ' / ' + _rentGalleryImgs.length;
}

function rentDetLbClose() {
  var lb = document.getElementById('rentDetLightbox');
  if (lb) lb.remove();
  document.removeEventListener('keydown', _rentDetLbKey);
}

function goWellness(e) {
  if(e && e.preventDefault) e.preventDefault();
  
  var pages = ['collPage','processPage','insightsPage','rentPage'];
  pages.forEach(function(id){ var el=document.getElementById(id); if(el){ el.classList.remove('open'); el.style.transform='translateX(100%)'; }});
  var wp = document.getElementById('wellnessPage');
  if(wp){ wp.classList.add('open'); wp.style.transform='translateX(0)'; }
  document.getElementById('homePage')?.classList.add('hidden');
  mgLock('panel');
}


// ─── PROPERTY DATA ───────────────────────────────────
const COLLECTIONS = [
  { id:'exclusive',        label:'Exclusive Listings',   emoji:'💎', desc:'Off-market & private sale properties' },
  { id:'beachfront',       label:'Beachfront',           emoji:'🌊', desc:'Directly on or steps from the beach' },
  { id:'branded',          label:'Branded Residences',   emoji:'🏨', desc:'Banyan Tree, The Standard, Anantara' },
  { id:'seaview',          label:'Seaview',              emoji:'🌅', desc:'Panoramic sea & ocean views' },
  { id:'wellness',         label:'Wellness',             emoji:'🧘', desc:'Near RAKxa, Kamalaya, Layan Life' },
  { id:'lakeview',         label:'Lakeview',             emoji:'🏞', desc:'Lagoon & lake-facing villas' },
  { id:'investment',       label:'Investment',           emoji:'📈', desc:'High-yield rental properties' },
  { id:'school',           label:'International School', emoji:'🎓', desc:'Near UWC, HeadStart, Garden International' },
  { id:'mountain',         label:'Mountain View',        emoji:'⛰', desc:'Hillside & forest villas' },
];

/* ── One request per URL ─────────────────────────────────────────
   A property page was making eleven REST calls in four sequential
   waves — 2.7 seconds before the last one even started, so photos could
   not begin loading until then. Among them the same
   property_videos?property_id=eq.N was fetched twice, and the
   catalogue-wide image query ran more than once.

   Reads are deduplicated here rather than at each call site: a GET to
   /rest/v1/ returns the promise already in flight for that exact URL.
   Nothing in this data changes while a visitor is on the page, and
   writes (POST) are untouched. */
(function(){
  var inflight = {};
  var _fetch = window.fetch.bind(window);
  window.fetch = function(input, init){
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    var method = ((init && init.method) || 'GET').toUpperCase();
    if (method !== 'GET' || url.indexOf('/rest/v1/') === -1) {
      return _fetch(input, init);
    }
    if (inflight[url]) {
      /* hand back a fresh clone — a Response body can only be read once */
      return inflight[url].then(function(r){ return r.clone(); });
    }
    var p = _fetch(input, init).then(function(r){
      /* keep only successful reads; let failures retry normally */
      if (!r.ok) delete inflight[url];
      return r;
    }).catch(function(e){ delete inflight[url]; throw e; });
    inflight[url] = p;
    return p.then(function(r){ return r.clone(); });
  };
})();

// ── SUPABASE CONFIG ─────────────────────────────────────────
const SB_URL = 'https://iwipvfkjfsveycppqhxc.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3aXB2ZmtqZnN2ZXljcHBxaHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NzI5NzYsImV4cCI6MjA5MDM0ODk3Nn0.T_XwpBpNdeqQLjXuulEPwlUvCN9uXHNTj3B7tMxbtFo';
function mgRestUrl() {
  if (typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL && !String(SUPABASE_URL).includes('YOUR_')) return SUPABASE_URL;
  return SB_URL;
}
function mgAnonKey() {
  if (typeof SUPABASE_ANON !== 'undefined' && SUPABASE_ANON) return SUPABASE_ANON;
  return SB_KEY;
}

// PROPS starts empty — loaded from Supabase on init
let PROPS = [];



// ── Default Unsplash images per property ID / collection ──
const IMG_BY_ID = {
  1: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=85',
  2: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85',
  3: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85',
  4: 'https://getyourphuket.com/upload/resize_cache/iblock/40a/768_768_1/dj2iv6krvwik9zqktlf1arvz8n6lwr6h.jpg',
  5: 'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p5/project/1776603324320-kfavob.avif',
  6: 'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p6/project/1776605345368-rwkzb8.webp',
  7: 'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p7/project/1776585584224-71luzw.avif',
  8: 'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p8/project/1776601662593-i8e8vi.avif',
  9: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85',
  10: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85',
  11: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85',
  12: 'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p12/project/1776600761988-f532gy.avif',
  13: 'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p13/project/1776601669202-3jiubf.avif',
  14: 'https://getyourphuket.com/upload/iblock/273/vvbylayutnd2u71w2vrj6709o961trov.jpg',
  15: 'https://getyourphuket.com/upload/resize_cache/iblock/3db/1920_1920_1/1xoqbca0tahsi07blfxjihomoh30xu15.jpg',
  16: 'https://getyourphuket.com/upload/iblock/271/za04xrw6m1q1za8v6mxv3qgx0dmlvwew.png',
  17: 'https://getyourphuket.com/upload/resize_cache/iblock/f5b/768_768_1/ti1jlmx6kqgsqu4adzntoif616zfmq11.png',
  18: 'https://getyourphuket.com/upload/iblock/562/dio1aoz42pu1b3np76i40nrhm331l0zr.png',
  19: 'https://getyourphuket.com/upload/iblock/3c5/r0x4pgjtki0cjhoh0q9l601k0eqqok6k.png',
  // New listings (Supabase Storage)
  15: 'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p15/project/1776602715857-gktbyu.avif',
  24: 'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p24/project/1776602495304-wfpc1h.jpg',
  28: 'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p28/project/1776596612580-d2ko39.webp',
  30: 'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p30/project/1776601199878-4nwakt.avif',
  31: 'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p31/project/1776600364635-zfviyv.jpg',
  32: 'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p32/project/1776601679254-7xzx54.avif',
  33: 'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p33/project/1776601689706-sugd8j.jpg',
  34: 'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p34/project/1776604875661-sgz8xa.jpg'
};
const IMG_BY_COLL = {
  beachfront:  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
  branded:     'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  exclusive:   'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  investment:  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
  lakeview:    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  mountain:    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  school:      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  seaview:     'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&q=80',
  wellness:    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
};
function getDefaultImg(id, coll) {
  return IMG_BY_ID[id] || IMG_BY_COLL[coll] || IMG_BY_COLL['exclusive'];
}
async function loadPropsFromSupabase() {
  try {
    const r = await fetch(
      SB_URL + '/rest/v1/properties?is_active=eq.true&order=id.asc&limit=100',
      {
        headers: {
          'apikey': SB_KEY,
          'Authorization': 'Bearer ' + SB_KEY,
        }
      }
    );
    if (!r.ok) throw new Error('Supabase fetch failed');
    const rows = await r.json();

    PROPS = rows.filter(p => p.id !== 1).map(p => {
      const colls = p.collections
        ? p.collections.split(',').map(c => c.trim()).filter(Boolean)
        : [p.collection_id || 'exclusive'];
      const mainColl = colls[0] || 'exclusive';
      return {
        id:         p.id,
        name:       p.name || '',
        loc:        p.location || '',
        priceNum:   p.price_thb || 0,
        price:      p.price_display || ('฿ ' + (p.price_thb || 0).toLocaleString('en-US')),
        beds:       p.beds || 0,
        baths:      p.baths || 0,
        sqm:        p.sqm || 0,
        colls:      colls,
        coll:       mainColl,
        collLabel:  mainColl.charAt(0).toUpperCase() + mainColl.slice(1).replace(/-/g, ' '),
        badge:      p.badge || '',
        yield_:     p.est_yield || '',
        desc:       p.description || '',
        bg:         p.bg_css || 'linear-gradient(145deg,#0d0d0d,#1a1410)',
        emoji:      p.emoji || '<svg class="mgi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/></svg>',
        img:        p.img_url || getDefaultImg(p.id, p.collection_id),
        featured:   p.is_featured || false,
        land:       Number(p.land_sqm) || 0,
        city:       p.city || '',
        ptype:      p.property_type || '',
      };
    });

    console.log('MGROUP: Loaded ' + PROPS.length + ' properties from Supabase');
    return true;
  } catch(e) {
    console.warn('MGROUP: Supabase load failed, using local PROPS', e.message);
    return false;
  }
}

// Fallback local PROPS (ใช้ถ้า Supabase ไม่ได้)
const PROPS_LOCAL = [
  { id:2,  colls:['branded','lakeview'],        coll:'branded',    collLabel:'Branded Residences',  name:'Banyan Tree Lagoon Villa',                           loc:'Laguna, Bang Tao',   price:'฿ 38,500,000',    priceNum:38500000,   beds:4, baths:4, sqm:600,  badge:'Pool Villa',  yield_:'',      desc:'Private pool villa within Banyan Tree Laguna resort.',   bg:'linear-gradient(145deg,#0d1a0d,#142814)', emoji:'🏨', img:'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85', featured:false },
  { id:3,  colls:['seaview','exclusive'],       coll:'seaview',    collLabel:'Seaview',             name:'Rawai Hilltop Villa',                                loc:'Rawai, South Phuket',price:'฿ 22,000,000',    priceNum:22000000,   beds:3, baths:3, sqm:320,  badge:'Sea View',    yield_:'',      desc:'Panoramic sea view villa in quiet Rawai.',               bg:'linear-gradient(145deg,#141a0d,#202814)', emoji:'🌅', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85', featured:false },
  { id:4,  colls:['lakeview','investment'],     coll:'lakeview',   collLabel:'Lakeview',            name:'HYTHE by Botanica — Apartment B401',                 loc:'Bang Tao, Laguna',   price:'฿ 22,300,000',    priceNum:22300000,   beds:3, baths:3, sqm:124,  badge:'New Listing', yield_:'',      desc:'Premium 3-bedroom apartment in Botanica Grand Avenue.',  bg:'linear-gradient(145deg,#0d1a0d,#142814)', emoji:'🏞',img:'https://getyourphuket.com/upload/resize_cache/iblock/40a/768_768_1/dj2iv6krvwik9zqktlf1arvz8n6lwr6h.jpg', featured:false },
  { id:5,  colls:['branded','beachfront','wellness','investment'], coll:'branded', collLabel:'Branded Residences', name:'The Residences at InterContinental Phuket', loc:'Kamala Beach',       price:'From ฿ 13,600,000',    priceNum:13600000,   beds:1, baths:1, sqm:59,   badge:'BRANDED',     yield_:'',      desc:'111-unit branded residences on Kamala Beach by IHG.', bg:'linear-gradient(145deg,#0d0d1a,#141428)', emoji:'🏨', img:'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p5/project/1776603324320-kfavob.avif', featured:true  },
  { id:6,  colls:['branded','lakeview','investment'], coll:'branded', collLabel:'Branded Residences', name:'The Standard Residence Phuket Bang Tao',           loc:'Bang Tao',           price:'฿ 22,946,600',    priceNum:22946600,   beds:1, baths:1, sqm:75,   badge:'Branded',     yield_:'',      desc:'Luxury residences by The Standard hotel brand in Bang Tao.', bg:'linear-gradient(145deg,#141a0d,#202814)', emoji:'🏨', img:'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p6/project/1776605345368-rwkzb8.webp', featured:true  },
  { id:7,  colls:['wellness','lakeview','investment'], coll:'wellness', collLabel:'Wellness',        name:'Tri Vananda Luxury Wellness Villas',                 loc:'Layan, Bang Tao',    price:'฿ 48,654,000',    priceNum:48654000,   beds:2, baths:2, sqm:400,  badge:'Wellness',    yield_:'',      desc:"Asia's largest wellness residential community.",         bg:'linear-gradient(145deg,#0d1a14,#142820)', emoji:'🧘', img:'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p7/project/1776585584224-71luzw.avif', featured:true  },
  { id:8,  colls:['branded','wellness','lakeview','investment'], coll:'branded', collLabel:'Branded Residences', name:'Kiara Reserve Residences by Anantara',    loc:'Layan, Bang Tao',    price:'฿ 46,559,600',    priceNum:46559600,   beds:3, baths:3, sqm:350,  badge:'Branded',     yield_:'',      desc:'Luxury villas within Anantara Layan 5-star resort.',     bg:'linear-gradient(145deg,#0d1414,#142020)', emoji:'🏨', img:'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p8/project/1776601662593-i8e8vi.avif', featured:true  },
  { id:9,  colls:['branded','beachfront','investment'], coll:'branded', collLabel:'Branded Residences', name:'Banyan Tree Grand Residences — Oceanfront Villas', loc:'Laguna, Bang Tao',  price:'฿ 354,701,600',   priceNum:354701600,  beds:4, baths:4, sqm:793,  badge:'Beachfront',  yield_:'',      desc:'Ultra-rare oceanfront pool villas within Banyan Tree Laguna.', bg:'linear-gradient(145deg,#1a0d0d,#281414)', emoji:'🏨', img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85', featured:true  },
  { id:10, colls:['branded','seaview','investment'],    coll:'branded', collLabel:'Branded Residences', name:'Banyan Tree Grand Residences — Seaview',          loc:'Laguna, Bang Tao',   price:'฿ 86,006,400',    priceNum:86006400,   beds:3, baths:3, sqm:200,  badge:'Sea View',    yield_:'',      desc:'Luxury 3-bedroom condominiums with panoramic sea views.', bg:'linear-gradient(145deg,#0d0d1a,#141428)', emoji:'🌅', img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85', featured:false },
  { id:11, colls:['branded','beachfront','investment'], coll:'branded', collLabel:'Branded Residences', name:'Banyan Tree Grand Residences — Beach Terraces',   loc:'Laguna, Bang Tao',   price:'฿ 120,326,000',   priceNum:120326000,  beds:3, baths:3, sqm:350,  badge:'Beachfront',  yield_:'',      desc:'Exclusive beachside townhomes at Banyan Tree Laguna.',   bg:'linear-gradient(145deg,#0d1a0d,#142814)', emoji:'🌊', img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85', featured:false },
  { id:12, colls:['exclusive','investment'],            coll:'exclusive', collLabel:'Exclusive Listings', name:'Botanica MontAzure — Luxury Villa',              loc:'Kamala Beach',       price:'฿ 43,795,400',    priceNum:43795400,   beds:4, baths:4, sqm:213,  badge:'Pool Villa',  yield_:'',      desc:'4 bedroom pool villa in prime Kamala hilltop position.', bg:'linear-gradient(145deg,#141a0d,#202814)', emoji:'💎', img:'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p12/project/1776600761988-f532gy.avif', featured:false },
  { id:13, colls:['exclusive','investment'],            coll:'exclusive', collLabel:'Exclusive Listings', name:'Anchan Burgundy Villa',                          loc:'Bang Tao',           price:'฿ 57,700,000',    priceNum:57700000,   beds:4, baths:4, sqm:709,  badge:'Off-Market',  yield_:'',      desc:'Spacious 4-bedroom private pool villa in Anchan Burgundy.', bg:'linear-gradient(145deg,#1a0d0d,#281414)', emoji:'💎', img:'https://getyourphuket.com/upload/resize_cache/iblock/04e/1920_1920_1/133yyfpr6eebr7gz7srkevdwemd40ig4.jpg', featured:false },
  { id:14, colls:['branded','beachfront','seaview','investment'], coll:'branded', collLabel:'Branded Residences', name:'Angsana Beachfront Residences — Sea View', loc:'Laguna, Bang Tao',   price:'฿ 95,000,000',    priceNum:95000000,   beds:3, baths:3, sqm:278,  badge:'Sea View',    yield_:'',      desc:'Rare 3-bedroom seaview apartment in Angsana Laguna resort.', bg:'linear-gradient(145deg,#0d0d1a,#141428)', emoji:'🌊', img:'https://getyourphuket.com/upload/iblock/273/vvbylayutnd2u71w2vrj6709o961trov.jpg', featured:true  },
  { id:15, colls:['branded','beachfront','seaview','investment'], coll:'branded', collLabel:'Branded Residences', name:'Banyan Tree Oceanus — Penthouse',          loc:'Laguna, Bang Tao',   price:'฿ 391,000,000',   priceNum:391000000,  beds:4, baths:4, sqm:768,  badge:'Penthouse',   yield_:'',      desc:'Extraordinary 4-bedroom penthouse in Banyan Tree Oceanus.', bg:'linear-gradient(145deg,#0d1414,#142020)', emoji:'🏨', img:'https://getyourphuket.com/upload/resize_cache/iblock/3db/1920_1920_1/1xoqbca0tahsi07blfxjihomoh30xu15.jpg', featured:false },
  { id:16, colls:['exclusive','investment'],            coll:'exclusive', collLabel:'Exclusive Listings', name:'Botanica MontAzure — Villa Type 4C',             loc:'Kamala Beach',       price:'฿ 140,493,440',   priceNum:140493440,  beds:4, baths:4, sqm:908,  badge:'Pool Villa',  yield_:'',      desc:'Grand 4-bedroom pool villa at Botanica MontAzure.',      bg:'linear-gradient(145deg,#141a0d,#202814)', emoji:'💎', img:'https://getyourphuket.com/upload/iblock/271/za04xrw6m1q1za8v6mxv3qgx0dmlvwew.png', featured:false },
  { id:17, colls:['exclusive','investment'],            coll:'exclusive', collLabel:'Exclusive Listings', name:'Botanica MontAzure — Villa Type 5C',             loc:'Kamala Beach',       price:'฿ 102,080,000',   priceNum:102080000,  beds:5, baths:5, sqm:908,  badge:'Pool Villa',  yield_:'',      desc:'Expansive 5-bedroom pool villa at Botanica MontAzure.',  bg:'linear-gradient(145deg,#0d1a0d,#142814)', emoji:'💎', img:'https://getyourphuket.com/upload/resize_cache/iblock/f5b/768_768_1/ti1jlmx6kqgsqu4adzntoif616zfmq11.png', featured:false },
  { id:18, colls:['lakeview','investment'],             coll:'lakeview', collLabel:'Lakeview',           name:'Botanica Grand Avenue — Villa Type C',            loc:'Bang Tao, Laguna',   price:'฿ 84,952,500',    priceNum:84952500,   beds:4, baths:4, sqm:510,  badge:'New Listing', yield_:'',      desc:'Premium 4-bedroom villa in Botanica Grand Avenue.',      bg:'linear-gradient(145deg,#0d0d0d,#1a1410)', emoji:'🏞',img:'https://getyourphuket.com/upload/iblock/562/dio1aoz42pu1b3np76i40nrhm331l0zr.png', featured:false },
  { id:19, colls:['exclusive','lakeview','investment'], coll:'exclusive', collLabel:'Exclusive Listings', name:'Botanica Grand Avenue — Grand Villa Zone A1',    loc:'Bang Tao, Laguna',   price:'฿ 254,937,000',   priceNum:254937000,  beds:5, baths:5, sqm:1758, badge:'Pool Villa',  yield_:'',      desc:'Landmark 5+1 bedroom grand villa in Botanica Grand Avenue.', bg:'linear-gradient(145deg,#1a0d0d,#281414)', emoji:'💎', img:'https://getyourphuket.com/upload/iblock/3c5/r0x4pgjtki0cjhoh0q9l601k0eqqok6k.png', featured:true  },
];


// ─── STATE ───────────────────────────────────────────
let currentColl = 'all';
let currentSort = 'random';
let currentBeds = 'all';
let currentBudget = 'all';
let shuffledAll = [];

function shuffle(arr) {
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function getFiltered() {
  const props = window.PROPS || PROPS;
  let list = currentColl === 'all' ? [...shuffledAll] : props.filter(p => currentColl === 'recommended' ? (p.featured || p.recommended) : (p.colls ? p.colls.includes(currentColl) : p.coll === currentColl));
  
  // Filter: Location (city)
  if (currentCity !== 'all') {
    list = list.filter(function(p){ return p.city === currentCity; });
  }

  // Filter: Property type
  if (currentType !== 'all') {
    list = list.filter(function(p){ return p.ptype === currentType; });
  }

  // Filter: Beds
  if (currentBeds !== 'all') {
    list = list.filter(p => (p.beds || 0) >= parseInt(currentBeds));
  }
  
  // Filter: Budget (in millions THB)
  if (currentBudget !== 'all') {
    const [minM, maxM] = currentBudget.split('-').map(Number);
    list = list.filter(p => {
      const priceMill = (p.priceNum || 0) / 1000000;
      return priceMill >= minM && priceMill <= maxM;
    });
  }
  
  // Sort
  if(currentSort === 'price_asc')  list.sort((a,b) => a.priceNum - b.priceNum);
  if(currentSort === 'price_desc') list.sort((a,b) => b.priceNum - a.priceNum);
  if(currentSort === 'beds_asc')   list.sort((a,b) => (a.beds||0) - (b.beds||0));
  if(currentSort === 'beds_desc')  list.sort((a,b) => (b.beds||0) - (a.beds||0));
  
  return list;
}

function filterBeds(val, btn) {
  currentBeds = val;
  document.querySelectorAll('#filterRow .filter-group:first-of-type .filter-chip')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGrid();
}

function filterBudget(val, btn) {
  currentBudget = val;
  document.querySelectorAll('#filterRow .filter-group:last-of-type .filter-chip')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGrid();
}

function renderGrid() {
  if (!document.getElementById('collGrid')) return;  /* page split: not on this page */
  updateDropdownCounts();
  updateChipCounts();
  const list = getFiltered();
  const grid = document.getElementById('collGrid');
  const label = document.getElementById('collCountLabel');
  label.textContent = `${list.length} propert${list.length===1?'y':'ies'} found`;
  // Show/hide no-results message
  if (list.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:80px 20px;color:var(--stone);font-size:13px">No properties match your filters. <button onclick="resetFilters()" style="color:var(--black);text-decoration:underline;background:none;border:none;cursor:pointer;font-size:13px">Clear filters</button></div>';
    return;
  }

  grid.innerHTML = list.map(p => {
    const collLabel = (p.colls || [p.coll])[0] || '';
    const collDisplay = collLabel.charAt(0).toUpperCase() + collLabel.slice(1).replace(/-/g,' ');
    return `
    <div class="prop-card" onclick="location.href='property.html?id=${p.id}'">
      <div class="prop-card-img">
        <div class="prop-card-img-inner" style="background-color:#0a0a0a;background-image:${p.img ? 'url('+mgImg(p.img,760)+')' : p.bg};background-size:cover;background-position:center;background-repeat:no-repeat;"></div>
        <div class="prop-card-img-overlay"></div>
        <div class="prop-badges">
          ${p.badge ? `<span class="prop-badge">${p.badge}</span>` : ''}
        </div>
        <div class="prop-save" onclick="event.stopPropagation()">♡</div>
        <div class="prop-card-over">
          <span class="prop-card-coll-lbl">${collDisplay}</span>
          <div class="prop-card-name">${p.name}</div>
        </div>
      </div>
      <div class="prop-card-body">
        <div class="prop-card-loc">${p.loc}</div>
        <div class="prop-card-specs">
          ${p.beds ? `<span class="prop-spec">
            <svg class="spec-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 18.5v-6a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v6"/><path d="M2.5 18.5h19"/><path d="M5.5 10.5V8a1.5 1.5 0 0 1 1.5-1.5h10A1.5 1.5 0 0 1 18.5 8v2.5"/><path d="M4 18.5v2M20 18.5v2"/></svg>
            <b class="spec-num">${p.beds}</b><span class="spec-lbl">Bedrooms</span></span>` : ''}
          ${p.baths ? `<span class="prop-spec">
            <svg class="spec-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12.5h18v2.5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2.5Z"/><path d="M6.5 12.5V6.2A2.2 2.2 0 0 1 8.7 4h.1a2.2 2.2 0 0 1 2.2 2.2"/><path d="M9.4 6.6h2.6"/><path d="M7.5 19.5 6.5 21M16.5 19.5l1 1.5"/></svg>
            <b class="spec-num">${p.baths}</b><span class="spec-lbl">Bathrooms</span></span>` : ''}
          ${p.sqm ? `<span class="prop-spec">
            <svg class="spec-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10.6 9-7.1 9 7.1"/><path d="M5.4 9.2V20a.8.8 0 0 0 .8.8h11.6a.8.8 0 0 0 .8-.8V9.2"/><path d="M10 20.8v-5h4v5"/></svg>
            <b class="spec-num">${p.sqm}</b><span class="spec-unit">sqm</span><span class="spec-lbl">Build</span></span>` : ''}
          ${p.land ? `<span class="prop-spec">
            <svg class="spec-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.8h4.4M4 4.8v4.4M20 4.8h-4.4M20 4.8v4.4M4 19.2h4.4M4 19.2v-4.4M20 19.2h-4.4M20 19.2v-4.4"/></svg>
            <b class="spec-num">${p.land}</b><span class="spec-unit">sqm</span><span class="spec-lbl">Plot</span></span>` : ''}
        </div>
        <div class="prop-card-footer">
          <div class="prop-card-price">${p.price}</div>
          <div class="prop-card-view">View →</div>
        </div>
      </div>
    </div>
  `}).join('');

  // Staggered fade-in
  requestAnimationFrame(() => {
    grid.querySelectorAll('.prop-card').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = `opacity 0.38s ease ${i * 0.055}s, transform 0.38s ease ${i * 0.055}s, box-shadow 0.35s ease, border-color 0.3s, transform 0.35s ease`;
      setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, i * 55 + 20);
    });
  });
}

/* ─── DROPDOWN ─── */
function toggleDropdown() {
  const btn = document.getElementById('ddBtn');
  const menu = document.getElementById('ddMenu');
  btn.classList.toggle('open');
  menu.classList.toggle('open');
}
document.addEventListener('click', e => {
  if(!e.target.closest('.coll-dropdown-wrap')) {
    document.getElementById('ddBtn')?.classList.remove('open');
    document.getElementById('ddMenu')?.classList.remove('open');
  }
  if(!e.target.closest('.lang-selector')) {
    var dd = document.getElementById('langDropdown');
    if(dd) dd.classList.remove('open');
  }
});

// Close collection dropdown on outside click
document.addEventListener('click', function(e) {
  if (!e.target.closest('.coll-dropdown-wrap')) {
    var btn = document.getElementById('ddBtn');
    var menu = document.getElementById('ddMenu');
    if(btn) btn.classList.remove('open');
    if(menu) menu.classList.remove('open');
  }
});

/* Location defaults to Phuket — every listing is there today, so the
   page opens on the market people actually came for rather than an
   empty-feeling "All". */
var currentCity = 'Phuket';
var currentType = 'all';

function selectCity(city){ currentCity = city; renderGrid(); }
function selectType(t){    currentType = t;    renderGrid(); }

function selectColl(id, label, el) {
  currentColl = id;
  currentBeds = 'all';
  currentBudget = 'all';
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.filter-chip:first-of-type').forEach(c => c.classList.add('active'));
  document.getElementById('ddLabel').textContent = label;
  document.getElementById('ddBtn')?.classList.remove('open');
  document.getElementById('ddMenu')?.classList.remove('open');
  document.querySelectorAll('.coll-dd-option').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  if(id === 'all') shuffledAll = shuffle([...PROPS]);
  renderGrid();
}

function updateDropdownCounts() {
  var sel = document.getElementById('selColl');
  if (!sel) return;
  var props = window.PROPS || (typeof PROPS!=='undefined' ? PROPS : []) || [];
  Array.prototype.forEach.call(sel.options, function(o){
    var base = o.getAttribute('data-base') || o.textContent.replace(/\s*\(\d+\)$/,'');
    o.setAttribute('data-base', base);
    var n;
    if (o.value === 'all') n = props.length;
    else if (o.value === 'recommended') n = props.filter(function(p){ return p.featured || p.recommended; }).length;
    else n = props.filter(function(p){ return p.colls ? p.colls.indexOf(o.value) !== -1 : p.coll === o.value; }).length;
    o.textContent = base + ' (' + n + ')';
  });
}
function sortProps(type, btn) {
  // Reset filter chips don't affect sort
  currentSort = type;
  document.querySelectorAll('.coll-sort-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGrid();
}

/* ─── INVESTMENT SLIDER ─── */
// INV_CARDS — built dynamically from PROPS after Supabase load
// Hardcoded fallback for before Supabase loads
const INV_CARDS_FALLBACK = [
  { id:1, propId:6,  name:'The Standard Residence',        sub:'1–3 Bedrooms · Branded · Bang Tao',   coll:'Branded',    loc:'Bang Tao',           price:'฿ 22,946,600',   yield:'Hotel-Managed Returns',  badge:'Branded',     bg:'linear-gradient(160deg,#141a0d,#202814)', emoji:'🏨', img:'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p6/project/1776605345368-rwkzb8.webp' },
  { id:2, propId:19, name:'Botanica Grand Avenue',         sub:'5+1 Bedrooms · Exclusive · Lakeview', coll:'Exclusive',  loc:'Bang Tao, Laguna',   price:'฿ 254,937,000',  yield:'Landmark Villa',         badge:'Pool Villa',  bg:'linear-gradient(160deg,#1a0d0d,#281414)', emoji:'💎', img:'https://getyourphuket.com/upload/iblock/3c5/r0x4pgjtki0cjhoh0q9l601k0eqqok6k.png' },
  { id:3, propId:null, name:'Maantawan Villa',             sub:'3–5 Bedrooms · Pool Villa · Bang Tao', coll:'Exclusive',  loc:'Bang Tao, Phuket',   price:'On Request',     yield:'Private Estate',         badge:'Pool Villa',  bg:'linear-gradient(160deg,#1a140d,#281e12)', emoji:'<svg class="mgi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/></svg>', img:'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p12/project/1776600761988-f532gy.avif' },
  { id:4, propId:null, name:'Layan Life by Sansiri',       sub:'1–4 Bedrooms · Wellness · Layan',     coll:'Wellness',   loc:'Layan, Bang Tao',    price:'฿ 7,990,000',    yield:'Biophilic Living',       badge:'Wellness',    bg:'linear-gradient(160deg,#0d1a14,#142820)', emoji:'🌿', img:'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p7/project/1776585584224-71luzw.avif' },
  { id:5, propId:14, name:'Angsana Beachfront Residences', sub:'3 Bedrooms · Branded · Sea View',     coll:'Branded',    loc:'Laguna, Bang Tao',   price:'฿ 95,000,000',   yield:'Strong Rental History',  badge:'Sea View',    bg:'linear-gradient(160deg,#0d0d1a,#141428)', emoji:'🌊', img:'https://getyourphuket.com/upload/iblock/273/vvbylayutnd2u71w2vrj6709o961trov.jpg' },
  { id:6, propId:null, name:'Banyan Tree Namu',            sub:'2–4 Bedrooms · Wellness · Branded',   coll:'Branded',    loc:'Laguna, Bang Tao',   price:'On Request',     yield:'Wellness Resort Living', badge:'Branded',     bg:'linear-gradient(160deg,#0d1a0d,#142814)', emoji:'🏨', img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85' },
  { id:7, propId:7,  name:'Tri Vananda Wellness Villas',   sub:'2–4 Bedrooms · Wellness · Lakeview',  coll:'Wellness',   loc:'Layan, Bang Tao',    price:'฿ 48,654,000',   yield:'Wellness Investment',    badge:'Wellness',    bg:'linear-gradient(160deg,#0d1a14,#142820)', emoji:'🧘', img:'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p7/project/1776585584224-71luzw.avif' },
  { id:8, propId:8,  name:'Kiara Reserve by Anantara',     sub:'3–4 Bedrooms · Branded · Wellness',   coll:'Branded',    loc:'Layan, Bang Tao',    price:'฿ 46,559,600',   yield:'5-Star Resort Living',   badge:'Branded',     bg:'linear-gradient(160deg,#0d1414,#142020)', emoji:'🏨', img:'https://iwipvfkjfsveycppqhxc.supabase.co/storage/v1/object/public/Property-bucket/sale/p8/project/1776601662593-i8e8vi.avif' },
];
let INV_CARDS = [...INV_CARDS_FALLBACK];

function buildInvCardsFromProps() {
  if (!PROPS || PROPS.length === 0) return;
  const featuredProps = PROPS.filter(p => p.featured || p.recommended);
  // Put The Standard (id:6) first
  featuredProps.sort((a, b) => (a.id === 6 ? -1 : b.id === 6 ? 1 : 0));
  INV_CARDS = featuredProps
    .slice(0, 12)
    .map((p, i) => ({
      id: i + 1,
      propId: p.id,
      name: p.name,
      coll: p.collLabel || p.coll || '',
      loc: p.loc,
      price: p.price,
      beds: p.beds || '',
      baths: p.baths || '',
      sqm: p.sqm || '',
      badge: p.badge || '',
      bg: p.bg || 'linear-gradient(160deg,#0d0d0d,#1a1410)',
      img: p.img || '',
    }));
  if (typeof renderInvSlider === 'function') renderInvSlider();
}

let invIndex = 0;

function renderInvSlider() {
  if (!document.getElementById('invTrack')) return;  /* page split: not on this page */
  const track = document.getElementById('invTrack');
  track.innerHTML = INV_CARDS.map((c, i) => {
    const specs = [];
    if(c.beds) specs.push(`<span style="display:inline-flex;align-items:center;gap:3px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 18.5v-6a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v6"/><path d="M2.5 18.5h19"/><path d="M5.5 10.5V8a1.5 1.5 0 0 1 1.5-1.5h10A1.5 1.5 0 0 1 18.5 8v2.5"/><path d="M4 18.5v2M20 18.5v2"/></svg><span style="font-family:'Lato',sans-serif;font-size:12px;color:rgba(255,255,255,0.9)">${c.beds}</span><span style="font-family:'Lato',sans-serif;font-size:9px;letter-spacing:0.13em;text-transform:uppercase;color:rgba(255,255,255,0.6)">Bedrooms</span></span>`);
    if(c.baths) specs.push(`<span style="display:inline-flex;align-items:center;gap:3px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12.5h18v2.5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2.5Z"/><path d="M6.5 12.5V6.2A2.2 2.2 0 0 1 8.7 4h.1a2.2 2.2 0 0 1 2.2 2.2"/><path d="M9.4 6.6h2.6"/><path d="M7.5 19.5 6.5 21M16.5 19.5l1 1.5"/></svg><span style="font-family:'Lato',sans-serif;font-size:12px;color:rgba(255,255,255,0.9)">${c.baths}</span><span style="font-family:'Lato',sans-serif;font-size:9px;letter-spacing:0.13em;text-transform:uppercase;color:rgba(255,255,255,0.6)">Bathrooms</span></span>`);
    if(c.sqm) specs.push(`<span style="display:inline-flex;align-items:center;gap:3px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10.6 9-7.1 9 7.1"/><path d="M5.4 9.2V20a.8.8 0 0 0 .8.8h11.6a.8.8 0 0 0 .8-.8V9.2"/><path d="M10 20.8v-5h4v5"/></svg><span style="font-family:'Lato',sans-serif;font-size:12px;color:rgba(255,255,255,0.9)">${c.sqm}</span><span style="font-family:'Lato',sans-serif;font-size:9px;letter-spacing:0.13em;text-transform:uppercase;color:rgba(255,255,255,0.6)">sqm</span></span>`);
    const specsHtml = specs.length ? `<div style="display:flex;gap:10px;margin-top:6px;">${specs.join('')}</div>` : '';
    const collDisplay = c.coll ? (c.coll.charAt(0).toUpperCase()+c.coll.slice(1).replace(/-/g,' ')) : '';
    return `
    <div class="inv-card" onclick="${c.propId ? `location.href='property.html?id='+${c.propId}` : ''}" data-idx="${i}" style="${c.propId ? 'cursor:pointer' : 'cursor:default'}">
      <div class="inv-card-img">
        <div class="inv-card-img-inner" style="background-color:#0a0a0a;background-image:${c.img ? 'url('+mgImg(c.img,760)+')' : c.bg};background-size:cover;background-position:center;background-repeat:no-repeat;width:100%;height:100%;"></div>
        <div class="inv-card-img-overlay"></div>
        ${c.badge ? `<div class="inv-yield-badge">${c.badge}</div>` : ''}
        <button class="inv-save" onclick="event.stopPropagation()">♡</button>
        <div class="inv-card-over">
          ${collDisplay ? `<div class="inv-card-coll">${collDisplay}</div>` : ''}
          <div class="inv-card-name">${c.name}</div>
          ${specsHtml}
          <div style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.15);display:flex;align-items:baseline;justify-content:space-between;">
            <span class="inv-card-price" style="font-family:'Lato',sans-serif;font-size:20px;font-weight:600;letter-spacing:-0.01em;white-space:nowrap;">${c.price}</span>
            <span class="inv-card-loc" style="font-family:'Lato',sans-serif;font-size:8.5px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.55);text-align:right;">${c.loc}</span>
          </div>
        </div>
      </div>
    </div>
  `;
  }).join('');

  // Dots
  const dots = document.getElementById('invDots');
  dots.innerHTML = INV_CARDS.map((_, i) =>
    `<div class="inv-dot${i===0?' active':''}" onclick="invGoTo(${i})"></div>`
  ).join('');
}

function getCardWidth() {
  const track = document.getElementById('invTrack');
  const card  = track && track.querySelector('.inv-card');
  if (!card) {
    const wrap = document.getElementById('invWrap');
    return wrap ? wrap.offsetWidth : window.innerWidth;
  }
  // cards no longer fill the viewport — step by one card plus the gap
  const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0) || 0;
  return card.getBoundingClientRect().width + gap;
}

function invSlide(dir) {
  const max = INV_CARDS.length - 1;
  invIndex = Math.max(0, Math.min(invIndex + dir, max));
  applyInvTransform();
}

function invGoTo(idx) {
  invIndex = idx;
  applyInvTransform();
}

function applyInvTransform() {
  const cw = getCardWidth();
  const track = document.getElementById('invTrack');
  if (track) track.style.transform = `translateX(-${invIndex * cw}px)`;
  document.querySelectorAll('.inv-dot').forEach((d, i) => d.classList.toggle('active', i === invIndex));
  document.querySelectorAll('.inv-card').forEach((c, i) => c.classList.toggle('is-active', i === invIndex));
  // grey out an arrow once you reach that end of the rail
  var last = (typeof INV_CARDS !== 'undefined' ? INV_CARDS.length : 0) - 1;
  var prev = document.querySelector('.inv-arrow--prev');
  var next = document.querySelector('.inv-arrow--next');
  if (prev) prev.disabled = invIndex <= 0;
  if (next) next.disabled = invIndex >= last;
}

// Touch / drag support
(function() {
  let startX = 0, isDragging = false, startTranslate = 0;
  
// ── SUPABASE BOOT ──────────────────────────────────────────
async function bootWithSupabase() {
  // Phase 0: Pre-load PROPS_LOCAL synchronously so clicks work immediately
  if (PROPS.length === 0 && typeof PROPS_LOCAL !== 'undefined') {
    PROPS.push(...PROPS_LOCAL);
    shuffledAll = typeof shuffle === 'function' ? shuffle([...PROPS]) : [...PROPS];
    console.log('MGROUP: PROPS pre-loaded from local (' + PROPS.length + ' items)');
  }

  // Phase 1: render INV immediately (propIds now valid since PROPS is populated)
  INV_CARDS = [...INV_CARDS_FALLBACK];
  buildInvCardsFromProps && buildInvCardsFromProps();
  if (typeof renderInvSlider === 'function') renderInvSlider();
  if (typeof renderGrid === 'function') renderGrid();

  // Phase 2: try Supabase (will replace local data if successful)
  const loaded = await loadPropsFromSupabase();
  if (loaded && PROPS.length > 0) {
    console.log('MGROUP: Supabase loaded ' + PROPS.length + ' props');
  } else {
    console.warn('MGROUP: Using local PROPS_LOCAL (' + PROPS_LOCAL.length + ' props)');
  }
  // Rebuild shuffledAll
  if (typeof shuffle === 'function') {
    shuffledAll = shuffle([...PROPS]);
  }
  // Phase 3: rebuild with real data
  if (typeof buildInvCardsFromProps === 'function') {
    buildInvCardsFromProps();
  }
  if (typeof renderGrid === 'function') renderGrid();
  if (typeof renderHubCards === 'function') renderHubCards();
  if (typeof renderInvSlider === 'function') renderInvSlider();
  if (typeof applyInvTransform === 'function') applyInvTransform();
  console.log('MGROUP: boot complete — ' + PROPS.length + ' properties');

  // Load media from Supabase (async, merges into PD)
  loadPropertyMedia();
}

async function loadPropertyMedia() {
  const base = mgRestUrl();
  const key = mgAnonKey();
  if (!base || !key) return;
  try {
    const resp = await fetch(base + '/rest/v1/property_images?image_type=eq.project&order=sort_order.asc', {
      headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
    });
    if (!resp.ok) return;
    const data = await resp.json();
    const imgMap = {};
    (Array.isArray(data) ? data : []).forEach(function(row) {
      var pid = row.property_id;
      if (!imgMap[pid]) imgMap[pid] = [];
      imgMap[pid].push(row.url);
    });
    Object.entries(imgMap).forEach(function(entry) {
      var pid = entry[0];
      var urls = entry[1];
      if (PD[pid] && urls.length) PD[pid].images = urls;
    });

    const vResp = await fetch(base + '/rest/v1/property_videos?order=sort_order.asc', {
      headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
    });
    if (vResp.ok) {
      const vids = await vResp.json();
      const videoByProp = {};
      (Array.isArray(vids) ? vids : []).forEach(function(v) {
        if (!videoByProp[v.property_id]) videoByProp[v.property_id] = v.url;
      });
      Object.entries(videoByProp).forEach(function(entry) {
        var pid = entry[0];
        var vu = entry[1];
        if (PD[pid] && vu) PD[pid].video = vu;
      });
    }

    console.log('MGROUP: Project gallery media merged for PD from property_images');
  } catch(e) {
    console.warn('MGROUP: Media load failed:', e.message);
  }
}

// ── HERO VIDEO — no JS init needed, src is in HTML ──
function initHeroVideoFromConfig() {}

document.addEventListener('DOMContentLoaded', () => {
  // Safety net: ensure no stale scroll-lock on fresh page load
  mgUnlock('panel');
  
  mgUnlock('modal');
  bootWithSupabase();
  initHeroVideoFromConfig();

    const wrap = document.getElementById('invWrap');
    if (!wrap) return;
    wrap.addEventListener('mousedown', e => { isDragging=true; startX=e.clientX; startTranslate=invIndex*getCardWidth(); });
    wrap.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const dx = startX - e.clientX;
      document.getElementById('invTrack').style.transition = 'none';
      document.getElementById('invTrack').style.transform = `translateX(-${startTranslate + dx}px)`;
    });
    wrap.addEventListener('mouseup', e => {
      if (!isDragging) return; isDragging = false;
      document.getElementById('invTrack').style.transition = '';
      const dx = startX - e.clientX;
      if (Math.abs(dx) > 60) invSlide(dx > 0 ? 1 : -1);
      else applyInvTransform();
    });
    wrap.addEventListener('mouseleave', e => { if(isDragging){ isDragging=false; document.getElementById('invTrack').style.transition=''; applyInvTransform(); } });
    wrap.addEventListener('touchstart', e => { startX=e.touches[0].clientX; startTranslate=invIndex*getCardWidth(); }, {passive:true});
    wrap.addEventListener('touchmove', e => {
      const dx = startX - e.touches[0].clientX;
      document.getElementById('invTrack').style.transition='none';
      document.getElementById('invTrack').style.transform=`translateX(-${startTranslate+dx}px)`;
    }, {passive:true});
    wrap.addEventListener('touchend', e => {
      document.getElementById('invTrack').style.transition='';
      const dx = startX - e.changedTouches[0].clientX;
      if(Math.abs(dx) > 50) invSlide(dx > 0 ? 1 : -1);
      else applyInvTransform();
    });
  });
})();

/* renderInvSlider called by bootWithSupabase after PROPS loads */

/* ─── INIT ─── */
shuffledAll = shuffle([...PROPS]);
renderGrid();

/* ─── HERO VIDEO — src set in HTML, no JS needed ─── */

/* ─── SCROLL NAV ─── */
window.addEventListener('scroll', () => {
  document.getElementById('mainNav')?.classList.toggle('scrolled', window.scrollY > 60);
});

/* ─── FADE UP ─── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold:0.1 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

/* ─── LANG ─── */




/* ─── MOBILE NAV ─── */
var _hb=document.getElementById('hamburgerBtn'); _hb && _hb.addEventListener('click', () => {
  const mn = document.getElementById('mobileNav');
  mgLock('modal');
  const ov = document.getElementById('mobileNavOverlay');
  mn.classList.toggle('open');
  ov.classList.toggle('open');
  mn.classList.contains('open') ? mgLock('mobnav') : mgUnlock('mobnav');
});
function closeMob() {
  document.getElementById('mobileNav')?.classList.remove('open');
  const ov = document.getElementById('mobileNavOverlay');
  if(ov) ov.classList.remove('open');
  mgUnlock('modal');
}

/* ─── PROPERTY EXTENDED DATA ─── */
const PD = {
  2:{ images:[], usd:'≈ USD 1,078,000', yield:'Managed Returns 7–9% p.a.', pool:'Yes',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'🌿',label:'Banyan Tree',text:'Managed by world-renowned Banyan Tree Hotels & Resorts'},{icon:'🏊',label:'Private Pool',text:'Exclusive pool villa with tropical garden setting'},{icon:'🛎',label:'5-Star Services',text:'Daily housekeeping, concierge & full resort access'},{icon:'⛳',label:'Laguna Phuket',text:'Golf privileges & beach club within integrated resort'}],
    desc:`<p>A Banyan Tree managed pool villa within Laguna Phuket delivering five-star services and world-class resort facilities. Four en-suite bedrooms across 600 sqm of refined tropical luxury.</p>`, feats:['Banyan Tree Laguna resort','Private pool','4 en-suite bedrooms','Full resort access','Spa & golf privileges','Daily housekeeping','Concierge service','Fully furnished'], details:[['Ownership','Freehold Condominium'],['Type','Branded Pool Villa'],['Year Built','2019'],['Furnishing','Fully Furnished'],['View','Lagoon & Garden']], finance:[['Asking Price','฿ 38,500,000'],['USD Equiv.','≈ USD 1,078,000'],['Program','Managed Returns'],['Net Yield','7–9% p.a.'],['Management','Included']], nearby:[['Laguna Beach Club','300 m','beach'],['Bangtao Beach','500 m','beach'],['Laguna Golf','1 km'],['Airport','22 km']] },
  3:{ images:[], usd:'≈ USD 616,000', yield:'Est. Yield 6–7% p.a.', pool:'Yes',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'🌊',label:'Sea Views',text:'Panoramic Andaman Sea vistas from hilltop position'},{icon:'🏊',label:'Infinity Pool',text:'Private infinity pool overlooking tropical landscape'},{icon:'',label:'Rawai',text:'Peaceful southern Phuket location near Nai Harn Beach'},{icon:'💰',label:'Rental Yield',text:'Strong short-stay rental demand — 6–7% net yield'}],
    desc:`<p>A panoramic sea view villa perched on Rawai\'s hilltop in quiet southern Phuket. Three bedrooms, private pool, and sweeping Andaman views — ideal for a private retreat or short-stay rental investment.</p>`, feats:['Panoramic sea views','3 en-suite bedrooms','Private infinity pool','Tropical garden','Quiet hilltop location','Fully furnished','Short-stay rental ready'], details:[['Ownership','Freehold (Chanote)'],['Type','Sea View Villa'],['Year Built','2019'],['Furnishing','Fully Furnished'],['View','Andaman Sea']], finance:[['Asking Price','฿ 22,000,000'],['USD Equiv.','≈ USD 616,000'],['Annual Rental','฿ 1.3M – 1.5M'],['Net Yield','6–7% p.a.']], nearby:[['Rawai Beach','3 km','beach'],['Nai Harn Beach','3.5 km','beach'],['Phromthep Cape','4 km'],['Airport','40 km']] },
  4:{ images:[], usd:'≈ USD 624,000', yield:'Est. Yield 6–8% p.a.', pool:'Shared Resort',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'🌊',label:'Lakeside',text:'Serene lakeside setting in Bang Tao\'s newest estate'},{icon:'🏋',label:'Resort Facilities',text:'Resort-grade pool, gym & concierge on-site'},{icon:'🏘',label:'Botanica',text:'Part of the award-winning Botanica Grand Avenue'},{icon:'💰',label:'Rental Yield',text:'Managed rental program delivering 6–8% net yield'}],
    desc:`<p>A premium 3-bedroom apartment in HYTHE by Botanica Grand Avenue — a modern lakeside development in the heart of Bang Tao. Excellent layout, resort-style facilities, and strong rental potential.</p>`, feats:['Botanica Grand Avenue','3 bedrooms','Lakeside setting','Resort pool & gym','Concierge service','Fully furnished','Rental management available','Secure parking'], details:[['Ownership','Freehold Condominium'],['Type','Premium Apartment'],['Year Built','2024'],['Furnishing','Fully Furnished'],['View','Lake & Garden']], finance:[['Asking Price','฿ 22,300,000'],['USD Equiv.','≈ USD 624,000'],['Annual Rental','฿ 1.3M – 1.8M'],['Net Yield','6–8% p.a.']], nearby:[['Bang Tao Beach','1.5 km','beach'],['Boat Avenue','800 m','mall'],['Laguna Phuket','1 km'],['Airport','20 km']] },
  5:{ images:[], usd:'≈ USD 380,000', yield:'', pool:'Common + Rooftop', floorplans:[],
    highlights:[],
    desc:'', feats:[], details:[], finance:[], nearby:[] },
  6:{ images:[], usd:'≈ USD 642,000', yield:'Net Yield 7–9% p.a.', pool:'Shared Rooftop',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'🏖',label:'Bang Tao Beach',text:'350 metres to Bang Tao\'s famous beach & clubs'},{icon:'🏊',label:'Rooftop Pool',text:'Stunning rooftop infinity pool with panoramic views'},{icon:'🌐',label:'The Standard',text:'Lifestyle brand with global cachet — premium demand'},{icon:'💰',label:'Net Yield',text:'7–9% net yield backed by The Standard rental program'}],
    desc:`<p>Luxury residences by The Standard hotel brand in the heart of Bang Tao. 75 sqm one-bedroom unit with rooftop infinity pool, co-working lounge, and full hotel-grade services. Strong rental yield backed by The Standard's global brand cachet.</p>`, feats:['The Standard brand','Rooftop infinity pool','Fitness centre','Co-working lounge','F&B by The Standard','24hr concierge','Smart lock entry','Secure parking'], details:[['Ownership','Freehold (Foreign Quota)'],['Type','Branded Residence'],['Year Built','2024'],['Size','75 sqm'],['Developer','The Standard Hotels']], finance:[['Asking Price','฿ 22,946,600'],['USD Equiv.','≈ USD 642,000'],['Program','Managed Returns'],['Net Yield','7–9% p.a.'],['Occupancy','78%']], nearby:[['Bang Tao Beach','350 m','beach'],['Catch Beach Club','400 m','beach'],['Boat Avenue','1.2 km'],['Airport','20 km']] },
  7:{ images:[], usd:'≈ USD 1,362,000', yield:'Est. Yield 6–8% p.a.', pool:'Yes',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'🌿',label:'Wellness Living',text:'Asia\'s largest wellness residential community'},{icon:'🏊',label:'Private Pool',text:'Private pool villa with holistic lifestyle amenities'},{icon:'🥗',label:'Organic Farm',text:'On-site organic farm, nature trails & yoga pavilion'},{icon:'💰',label:'Managed Returns',text:'6–8% managed yield in Phuket\'s fastest-growing niche'}],
    desc:`<p>Asia's largest wellness residential community in Layan, Bang Tao. Two-bedroom luxury wellness villa with private pool, holistic lifestyle amenities, and access to world-class integrative health facilities.</p>`, feats:['Tri Vananda wellness community','Private pool','2 en-suite bedrooms','Holistic wellness centre','Organic farm & gardens','Fitness & yoga','Nature trails','24hr security'], details:[], nearby:[['Layan Beach','2 km','beach'],['Bang Tao Beach','3 km','beach'],['Boat Avenue','4 km'],['Airport','18 km']] },
  8:{ images:[], usd:'≈ USD 1,304,000', yield:'Managed 6–8% p.a.', pool:'Yes',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'🏖',label:'Layan Beach',text:'500 metres to pristine Layan Beach — Phuket\'s finest'},{icon:'🌐',label:'Anantara',text:'Managed by award-winning Anantara Hotels & Resorts'},{icon:'🏊',label:'Private Pool',text:'Three en-suite bedrooms with private pool & garden'},{icon:'💰',label:'Managed Returns',text:'6–8% managed yield with Anantara\'s occupancy guarantee'}],
    desc:`<p>Luxury three-bedroom villa within Anantara Layan five-star resort. Managed by Anantara Hotels with premium rental income, full resort facilities, and direct access to one of Phuket's finest private beaches.</p>`, feats:['Anantara 5-star management','Layan Beach proximity','3 en-suite bedrooms','Private pool','Full resort facilities','Spa & wellness','Fine dining','Housekeeping'], details:[['Ownership','Freehold'],['Type','Branded Residence'],['Year Built','2022'],['Furnishing','Fully Furnished'],['Operator','Anantara Hotels']], finance:[['Asking Price','฿ 46,559,600'],['USD Equiv.','≈ USD 1,304,000'],['Program','Managed Returns'],['Net Yield','6–8% p.a.'],['Occupancy','72–80%']], nearby:[['Layan Beach','500 m','beach'],['Bang Tao Beach','2.5 km','beach'],['Boat Avenue','3 km'],['Airport','18 km']] },
  9:{ images:[], usd:'≈ USD 9,932,000', yield:'Capital Appreciation', pool:'Yes',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'🌊',label:'Oceanfront',text:'Ultra-rare direct beachfront position at Laguna Phuket'},{icon:'🌿',label:'Banyan Tree',text:'Banyan Tree Grand Residences — pinnacle of branded living'},{icon:'🏠',label:'793 sqm',text:'Four-bedroom ultra-luxury estate with butler service'},{icon:'📈',label:'Capital Growth',text:'Scarcity-driven appreciation — one of few oceanfront villas'}],
    desc:`<p>Ultra-rare oceanfront pool villa within Banyan Tree Grand Residences at Laguna Phuket. Four bedrooms across 793 sqm with direct beach access and panoramic Andaman Sea views — the pinnacle of branded beachfront living.</p>`, feats:['Direct oceanfront','Banyan Tree brand','4 en-suite bedrooms','Private infinity pool','793 sqm living','Full resort access','Butler service','24hr security'], details:[['Ownership','Freehold Condominium'],['Type','Oceanfront Villa'],['Year Built','2025'],['Furnishing','Fully Furnished'],['Operator','Banyan Tree Hotels']], finance:[['Asking Price','฿ 354,701,600'],['USD Equiv.','≈ USD 9,932,000'],['Investment Type','Capital Appreciation'],['Exclusivity','Limited units']], nearby:[['Laguna Beach','Direct','beach'],['Laguna Golf','1 km','all'],['Boat Avenue','2 km'],['Airport','22 km']] },
  10:{ images:[], usd:'≈ USD 2,408,000', yield:'Est. Yield 5–7% p.a.', pool:'Shared Resort',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'🌊',label:'Sea Views',text:'Panoramic 180° Andaman Sea views from 200 sqm residence'},{icon:'🌿',label:'Banyan Tree',text:'Five-star resort services by Banyan Tree Hotels'},{icon:'⛳',label:'Laguna Phuket',text:'Golf, beach club & spa within Laguna\'s integrated resort'},{icon:'💰',label:'Managed Returns',text:'5–7% net yield with Banyan Tree rental program'}],
    desc:`<p>Luxury three-bedroom condominium within Banyan Tree Grand Residences with panoramic sea views across the Andaman. 200 sqm of refined living with full five-star resort services and amenities.</p>`, feats:['Banyan Tree brand','Panoramic sea views','3 bedrooms','200 sqm','Full resort access','Spa & golf privileges','Concierge','Managed rental'], details:[['Ownership','Freehold Condominium'],['Type','Branded Condominium'],['Year Built','2025'],['Furnishing','Fully Furnished'],['View','Andaman Sea']], finance:[['Asking Price','฿ 86,006,400'],['USD Equiv.','≈ USD 2,408,000'],['Program','Managed Returns'],['Net Yield','5–7% p.a.']], nearby:[['Laguna Beach','300 m','beach'],['Laguna Golf','1 km','all'],['Boat Avenue','2 km'],['Airport','22 km']] },
  11:{ images:[], usd:'≈ USD 3,369,000', yield:'Est. Yield 5–7% p.a.', pool:'Yes',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'🏖',label:'Beach Access',text:'Direct beach access within Banyan Tree\'s Laguna estate'},{icon:'🏠',label:'350 sqm',text:'Three-bedroom beach townhome with private garden'},{icon:'🌿',label:'Banyan Tree',text:'Full five-star resort lifestyle at your doorstep'},{icon:'💰',label:'Managed Returns',text:'5–7% managed returns with blue-chip brand backing'}],
    desc:`<p>Exclusive beachside townhome within Banyan Tree Grand Residences at Laguna. Three bedrooms across 350 sqm with direct beach access and five-star resort lifestyle.</p>`, feats:['Banyan Tree beachside','3 en-suite bedrooms','350 sqm','Direct beach access','Private garden','Full resort facilities','Concierge','Managed rental'], details:[['Ownership','Freehold Condominium'],['Type','Beach Townhome'],['Year Built','2025'],['Furnishing','Fully Furnished'],['View','Beach & Garden']], finance:[['Asking Price','฿ 120,326,000'],['USD Equiv.','≈ USD 3,369,000'],['Program','Managed Returns'],['Net Yield','5–7% p.a.']], nearby:[['Laguna Beach','Direct','beach'],['Laguna Golf','1 km','all'],['Boat Avenue','2 km'],['Airport','22 km']] },
  12:{ images:[], usd:'≈ USD 1,226,000', yield:'Est. Yield 6–7% p.a.', pool:'Yes',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'<svg class="mgi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20c1.6 0 1.6 1.2 3.2 1.2S6.8 20 8.4 20s1.6 1.2 3.2 1.2S13.2 20 14.8 20s1.6 1.2 3.2 1.2"/><path d="M12 20V9"/><path d="M12 9c-3 0-5 1.5-6 3 3-1 5-1 6 0zM12 9c3 0 5 1.5 6 3-3-1-5-1-6 0z"/></svg>',label:'MontAzure',text:'Prestigious MontAzure estate — Kamala\'s premier address'},{icon:'🏖',label:'Beach Club',text:'Exclusive MontAzure Beach Club access included'},{icon:'🏊',label:'Private Pool',text:'Four-bedroom villa with private pool and sea views'},{icon:'💰',label:'Rental Yield',text:'Consistent 6–7% yield — strong seasonal rental demand'}],
    desc:`<p>Luxury pool villa at Botanica MontAzure in prime Kamala hilltop position. Four bedrooms across 213 sqm with private pool, sea views, and access to MontAzure's exclusive beachfront club.</p>`, feats:['MontAzure estate','Private pool','4 bedrooms','Kamala hilltop','Sea views','MontAzure Beach Club','Fully furnished','Gated security'], details:[['Ownership','Freehold'],['Type','Pool Villa'],['Year Built','2023'],['Furnishing','Fully Furnished'],['View','Sea & Mountain']], finance:[['Asking Price','฿ 43,795,400'],['USD Equiv.','≈ USD 1,226,000'],['Annual Rental','฿ 2.6M – 3.1M'],['Net Yield','6–7% p.a.']], nearby:[['Kamala Beach','1.5 km','beach'],['MontAzure Beach Club','800 m','beach'],['Surin Beach','3 km'],['Airport','28 km']] },
  13:{ images:[], usd:'≈ USD 1,616,000', yield:'Est. Yield 5–6% p.a.', pool:'Yes',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'<svg class="mgi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/></svg>',label:'Anchan Burgundy',text:'Off-market villa in one of Bang Tao\'s most exclusive estates'},{icon:'🏊',label:'Private Pool',text:'Four bedrooms across 709 sqm with large private pool'},{icon:'🌿',label:'Tropical Gardens',text:'Lush tropical landscaping and complete privacy'},{icon:'💰',label:'Rental Yield',text:'5–6% net yield — strong annual rental potential'}],
    desc:`<p>Spacious four-bedroom private pool villa in the exclusive Anchan Burgundy estate, Bang Tao. 709 sqm of refined living surrounded by tropical landscaping — an off-market opportunity for discerning buyers.</p>`, feats:['Anchan Burgundy estate','4 en-suite bedrooms','Private pool','709 sqm living','Tropical gardens','Off-market','Fully furnished','Gated community'], details:[['Ownership','Freehold (Chanote)'],['Type','Luxury Villa'],['Year Built','2020'],['Furnishing','Fully Furnished'],['View','Garden & Pool']], finance:[['Asking Price','฿ 57,700,000'],['USD Equiv.','≈ USD 1,616,000'],['Annual Rental','฿ 2.9M – 3.5M'],['Net Yield','5–6% p.a.']], nearby:[['Bang Tao Beach','1.5 km','beach'],['Boat Avenue','1 km','mall'],['Laguna Phuket','2 km'],['Airport','20 km']] },
  14:{ images:[], usd:'≈ USD 2,660,000', yield:'Est. Yield 5–7% p.a.', pool:'Shared Resort',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'🌊',label:'Andaman Views',text:'Unobstructed panoramic Andaman Sea views at Laguna'},{icon:'🏖',label:'Beachfront Resort',text:'Angsana Beachfront — direct beach access on Laguna Bay'},{icon:'🏠',label:'278 sqm',text:'Three-bedroom seaview apartment — rare large format'},{icon:'💰',label:'Managed Returns',text:'5–7% net yield with Angsana Hotels management'}],
    desc:`<p>Rare three-bedroom seaview apartment within Angsana Beachfront Residences at Laguna. 278 sqm with panoramic Andaman views and full five-star resort services by Angsana Hotels.</p>`, feats:['Angsana resort','Panoramic sea views','3 bedrooms','278 sqm','Beachfront resort','Full facilities','Managed rental','Concierge'], details:[['Ownership','Freehold Condominium'],['Type','Branded Apartment'],['Year Built','2024'],['Furnishing','Fully Furnished'],['View','Andaman Sea']], finance:[['Asking Price','฿ 95,000,000'],['USD Equiv.','≈ USD 2,660,000'],['Program','Managed Returns'],['Net Yield','5–7% p.a.']], nearby:[['Laguna Beach','Direct','beach'],['Laguna Golf','1 km','all'],['Boat Avenue','2 km'],['Airport','22 km']] },
  15:{ images:[], usd:'≈ USD 10,948,000', yield:'Capital Appreciation', pool:'Yes',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'🌊',label:'360° Sea Views',text:'Unparalleled 360° Andaman panoramas from penthouse position'},{icon:'🌿',label:'Banyan Tree Oceanus',text:'Flagship penthouse in Laguna\'s most prestigious address'},{icon:'🏠',label:'768 sqm',text:'Four-bedroom ultra-luxury penthouse with vast private terrace'},{icon:'📈',label:'Trophy Asset',text:'One-of-a-kind capital appreciation asset — truly irreplaceable'}],
    desc:`<p>Extraordinary four-bedroom penthouse within Banyan Tree Oceanus at Laguna. 768 sqm of ultra-premium living with unobstructed Andaman panoramas — arguably the finest penthouse on the island.</p>`, feats:['Banyan Tree Oceanus','Penthouse position','4 bedrooms','768 sqm','Panoramic sea views','Private terrace','Full resort access','Ultra-exclusive'], details:[['Ownership','Freehold Condominium'],['Type','Penthouse'],['Year Built','2025'],['Furnishing','Fully Furnished'],['View','360° Andaman Sea']], finance:[['Asking Price','฿ 391,000,000'],['USD Equiv.','≈ USD 10,948,000'],['Investment Type','Capital Appreciation'],['Exclusivity','One of a kind']], nearby:[['Laguna Beach','200 m','beach'],['Laguna Golf','1 km','all'],['Boat Avenue','2 km'],['Airport','22 km']] },
  16:{ images:[], usd:'≈ USD 3,934,000', yield:'Est. Yield 5–6% p.a.', pool:'Yes',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'<svg class="mgi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20c1.6 0 1.6 1.2 3.2 1.2S6.8 20 8.4 20s1.6 1.2 3.2 1.2S13.2 20 14.8 20s1.6 1.2 3.2 1.2"/><path d="M12 20V9"/><path d="M12 9c-3 0-5 1.5-6 3 3-1 5-1 6 0zM12 9c3 0 5 1.5 6 3-3-1-5-1-6 0z"/></svg>',label:'MontAzure',text:'Grand villa in Kamala\'s prestigious MontAzure estate'},{icon:'🏊',label:'Private Pool',text:'Four en-suite bedrooms across 908 sqm with private pool'},{icon:'🏖',label:'Beach Club',text:'Exclusive access to MontAzure\'s private beach club'},{icon:'💰',label:'Rental Yield',text:'5–6% net yield — strong annual rental income potential'}],
    desc:`<p>Grand four-bedroom pool villa at Botanica MontAzure in Kamala. 908 sqm of expansive luxury living with private pool, lush gardens, and access to MontAzure's exclusive beachfront amenities.</p>`, feats:['MontAzure estate','4 en-suite bedrooms','908 sqm','Private pool','Lush gardens','MontAzure Beach Club','Fully furnished','Gated security'], details:[['Ownership','Freehold'],['Type','Grand Villa'],['Year Built','2024'],['Furnishing','Fully Furnished'],['View','Sea & Mountain']], finance:[['Asking Price','฿ 140,493,440'],['USD Equiv.','≈ USD 3,934,000'],['Annual Rental','฿ 7.0M – 8.4M'],['Net Yield','5–6% p.a.']], nearby:[['Kamala Beach','1.5 km','beach'],['MontAzure Beach Club','800 m','beach'],['Surin Beach','3 km'],['Airport','28 km']] },
  17:{ images:[], usd:'≈ USD 2,858,000', yield:'Est. Yield 5–6% p.a.', pool:'Yes',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'<svg class="mgi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20c1.6 0 1.6 1.2 3.2 1.2S6.8 20 8.4 20s1.6 1.2 3.2 1.2S13.2 20 14.8 20s1.6 1.2 3.2 1.2"/><path d="M12 20V9"/><path d="M12 9c-3 0-5 1.5-6 3 3-1 5-1 6 0zM12 9c3 0 5 1.5 6 3-3-1-5-1-6 0z"/></svg>',label:'MontAzure',text:'Family-sized grand villa in Kamala\'s MontAzure estate'},{icon:'🏊',label:'Private Pool',text:'Five en-suite bedrooms across 908 sqm — ideal for families'},{icon:'🏖',label:'Beach Club',text:'MontAzure private beach club access included'},{icon:'💰',label:'Rental Yield',text:'5–6% yield — strong annual rental income potential'}],
    desc:`<p>Expansive five-bedroom pool villa at Botanica MontAzure in Kamala. 908 sqm of luxury living designed for larger families, with private pool and access to MontAzure's exclusive beachfront club.</p>`, feats:['MontAzure estate','5 en-suite bedrooms','908 sqm','Private pool','Family-sized layout','MontAzure Beach Club','Fully furnished','Gated security'], details:[['Ownership','Freehold'],['Type','Grand Villa'],['Year Built','2024'],['Furnishing','Fully Furnished'],['View','Sea & Mountain']], finance:[['Asking Price','฿ 102,080,000'],['USD Equiv.','≈ USD 2,858,000'],['Annual Rental','฿ 5.1M – 6.1M'],['Net Yield','5–6% p.a.']], nearby:[['Kamala Beach','1.5 km','beach'],['MontAzure Beach Club','800 m','beach'],['Surin Beach','3 km'],['Airport','28 km']] },
  18:{ images:[], usd:'≈ USD 2,379,000', yield:'Est. Yield 5–6% p.a.', pool:'Yes',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'🌊',label:'Lakeside',text:'Premium lakeside setting in Botanica Grand Avenue estate'},{icon:'🏊',label:'Private Pool',text:'Four-bedroom villa, 510 sqm with private pool'},{icon:'🏘',label:'Botanica',text:'Award-winning Botanica estate — Bang Tao\'s top address'},{icon:'💰',label:'Rental Yield',text:'5–6% yield — strong annual rental potential'}],
    desc:`<p>Premium four-bedroom villa in Botanica Grand Avenue, Bang Tao. 510 sqm of modern lakeside living with private pool, resort-style facilities, and excellent connectivity to Laguna Phuket.</p>`, feats:['Botanica Grand Avenue','4 bedrooms','510 sqm','Private pool','Lakeside setting','Resort facilities','Fully furnished','Secure estate'], details:[['Ownership','Freehold'],['Type','Premium Villa'],['Year Built','2024'],['Furnishing','Fully Furnished'],['View','Lake & Garden']], finance:[['Asking Price','฿ 84,952,500'],['USD Equiv.','≈ USD 2,379,000'],['Annual Rental','฿ 4.2M – 5.1M'],['Net Yield','5–6% p.a.']], nearby:[['Bang Tao Beach','1.5 km','beach'],['Boat Avenue','800 m','mall'],['Laguna Phuket','1 km'],['Airport','20 km']] },
  19:{ images:[], usd:'≈ USD 7,138,000', yield:'Capital Appreciation', pool:'Yes',     floorplans:[{label:'Floor Plan',url:''}],
    highlights:[{icon:'<svg class="mgi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/></svg>',label:'Flagship Villa',text:'The landmark grand villa of Botanica Grand Avenue — 1,758 sqm'},{icon:'🌊',label:'Lakefront',text:'Premier lakeside position within Bang Tao\'s finest estate'},{icon:'🏊',label:'Private Pool',text:'5+1 bedrooms, private pool & resort-style grounds'},{icon:'📈',label:'Trophy Asset',text:'Capital appreciation — irreplaceable flagship in prime Bang Tao'}],
    desc:`<p>Landmark 5+1 bedroom grand villa in Botanica Grand Avenue, Bang Tao. 1,758 sqm of unparalleled luxury lakeside living — the flagship residence of the entire development.</p>`, feats:['Botanica Grand Avenue flagship','5+1 bedrooms','1,758 sqm','Private pool','Lakeside position','Resort facilities','Fully furnished','Ultra-exclusive'], details:[['Ownership','Freehold'],['Type','Grand Villa'],['Year Built','2024'],['Furnishing','Fully Furnished'],['View','Lake & Garden']], finance:[['Asking Price','฿ 254,937,000'],['USD Equiv.','≈ USD 7,138,000'],['Investment Type','Capital Appreciation'],['Exclusivity','Flagship residence']], nearby:[['Bang Tao Beach','1.5 km','beach'],['Boat Avenue','800 m','mall'],['Laguna Phuket','1 km'],['Airport','20 km']] },
};

const TBG=['linear-gradient(145deg,#1a1410,#2a2018)','linear-gradient(145deg,#101820,#182030)','linear-gradient(145deg,#141a10,#202816)','linear-gradient(145deg,#1a1014,#28181e)','linear-gradient(145deg,#0d1420,#14202e)','linear-gradient(145deg,#1a1408,#221a0c)'];
const TEMI=['<svg class="mgi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/></svg>','🛁','🍽','🌊','🌿','🏊'];
let curProp=null;

/* ─── SIDEBAR ACCORDION CONTACT ─── */
let sidState={m:0,y:0,date:null,time:null,vtype:null};
const SID_UNV=['09:00','13:00'];
const SID_TIMES=['09:00','10:00','11:00','14:00','15:00','16:00','17:00'];
const SID_MN=['January','February','March','April','May','June','July','August','September','October','November','December'];

function toggleSidAcc(n){
  /* The brochure box (sidAcc3) was removed when the email gate went, but
     this still reached for it — getElementById returned null and the
     whole handler threw, so neither Schedule a Viewing nor Send Enquiry
     would open at all. Skip whatever is not on the page. */
  const panel=document.getElementById('sidAcc'+n);
  if(!panel) return;
  const isOpen=panel.classList.contains('open');
  [1,2,3].forEach(i=>{ const el=document.getElementById('sidAcc'+i); if(el) el.classList.remove('open'); });
  if(!isOpen){
    panel.classList.add('open');
    if(n===1){ const now=new Date(); sidState={y:now.getFullYear(),m:now.getMonth(),date:null,time:null,vtype:null}; sidRenderCal(); }
  }
}
function sidChangeMonth(d){ sidState.m+=d; if(sidState.m>11){sidState.m=0;sidState.y++;} if(sidState.m<0){sidState.m=11;sidState.y--;} sidRenderCal(); }
function sidRenderCal(){
  document.getElementById('sidCalLbl').textContent=`${SID_MN[sidState.m]} ${sidState.y}`;
  const first=new Date(sidState.y,sidState.m,1).getDay(), days=new Date(sidState.y,sidState.m+1,0).getDate();
  const today=new Date(); today.setHours(0,0,0,0); const min=new Date(today.getTime()+86400000);
  let h='';
  for(let e=0;e<first;e++) h+=`<div class="sid-day sid-emp"></div>`;
  for(let d=1;d<=days;d++){
    const dt=new Date(sidState.y,sidState.m,d),dow=dt.getDay();
    const dis=dt<min||dow===0||dow===6;
    const sel=sidState.date&&dt.toDateString()===sidState.date.toDateString();
    h+=`<div class="sid-day${dis?' sid-dis':''}${sel?' sid-sel':''}" ${!dis?`onclick="sidSelDate(${sidState.y},${sidState.m},${d})"`:''}>${d}</div>`;
  }
  document.getElementById('sidCalDays').innerHTML=h;
}
function sidSelDate(y,m,d){
  sidState.date=new Date(y,m,d); sidState.time=null; sidState.vtype=null;
  sidRenderCal(); sidRenderTimes();
  document.getElementById('sidTimeWrap').style.display='block';
  document.getElementById('sidVisitWrap').style.display='none';
  document.getElementById('sidSchedSummary').style.display='none';
  document.getElementById('sidSchedBtn').disabled=true;
}
function sidRenderTimes(){
  document.getElementById('sidTimeGrid').innerHTML=SID_TIMES.map(t=>{
    const un=SID_UNV.includes(t),sel=sidState.time===t;
    return `<div class="sid-tslot${un?' sid-unavail':''}${sel?' sid-tsel':''}" ${!un?`onclick="sidSelTime('${t}')"`:''}>${t}${un?'<br><span style="font-size:7px">Booked</span>':''}</div>`;
  }).join('');
}
function sidSelTime(t){
  sidState.time=t; sidRenderTimes();
  document.getElementById('sidVisitWrap').style.display='block';
}
function sidSelVisit(el,type){
  sidState.vtype=type;
  document.querySelectorAll('.sid-visit').forEach(v=>v.classList.remove('sid-vsel')); el.classList.add('sid-vsel');
  const ds=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const dt=sidState.date, dtStr=`${ds[dt.getDay()]}, ${dt.getDate()} ${SID_MN[dt.getMonth()]}`;
  const vtStr=type==='in-person'?'<svg class="mgi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/></svg> In-Person':'<svg class="mgi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4V8z"/></svg> Virtual Tour';
  const sum=document.getElementById('sidSchedSummary');
  sum.style.display='block';
  sum.innerHTML=`<strong>${curProp?curProp.name:''}</strong><br>${dtStr} at ${sidState.time}<br>${vtStr}`;
  document.getElementById('sidSchedBtn').disabled=false;
}
/* ── Property sidebar: viewing requests and enquiries ────────────
   Both of these used to be theatre. sidConfirmSchedule() printed
   "Viewing Confirmed, Khun May will contact you within 2 hours" and a
   made-up reference number without sending anything anywhere, and it
   had no name or phone field to send in the first place — every viewing
   ever booked from a property page was discarded. sidSendEnquiry()
   POSTed first_name/role, neither of which exists on public.enquiries,
   with the error swallowed by an empty catch.

   They write to Supabase now, and — this is the point — the customer is
   only told it worked once the row is actually in. A failure says so
   and leaves the form filled in so nothing typed is lost. */
function mgPostEnquiry(payload){
  return fetch(SB_URL + '/rest/v1/enquiries', {
    method: 'POST',
    headers: {
      'apikey': SB_KEY,
      'Authorization': 'Bearer ' + SB_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(payload)
  }).then(function(r){
    if (!r.ok) return r.text().then(function(t){ throw new Error(r.status + ' ' + t); });
    return r.json();
  });
}

/* Email is a best-effort extra: FormSubmit needs the address activated
   from the inbox, so it must never decide what the customer is told. */
function mgEmailCopy(subject, fields){
  var d = new FormData();
  Object.keys(fields).forEach(function(k){ d.append(k, fields[k] || ''); });
  d.append('_subject', subject);
  d.append('_captcha', 'false');
  d.append('_template', 'table');
  return fetch('https://formsubmit.co/ajax/contact@mgroupestates.com', { method:'POST', body:d })
    .catch(function(e){ console.warn('MGROUP: email copy failed', e.message); });
}

function sidConfirmSchedule(){
  var name  = (document.getElementById('schName')  || {}).value;
  var phone = (document.getElementById('schPhone') || {}).value;
  var email = (document.getElementById('schEmail') || {}).value;
  name = (name || '').trim(); phone = (phone || '').trim(); email = (email || '').trim();

  var box = document.getElementById('sidSchedSummary');
  var btn = document.getElementById('sidSchedBtn');
  var show = function(html, ok){
    box.style.display = 'block';
    box.innerHTML = html;
    box.classList.toggle('sid-summary--err', !ok);
  };

  if (!name)  { show('Please enter your name so Khun May knows who to call.', false);
                (document.getElementById('schName')  || {}).focus && document.getElementById('schName').focus(); return; }
  if (!phone && !email) { show('Please leave a phone number or an email so we can confirm.', false);
                (document.getElementById('schPhone') || {}).focus && document.getElementById('schPhone').focus(); return; }

  /* the calendar keeps its selection in sidState, not on window */
  var d     = sidState && sidState.date;
  var when  = d ? d.toDateString() : '';
  var time  = (sidState && sidState.time) || '';
  var vtype = (sidState && sidState.vtype) || 'in-person';
  var label = 'Viewing request — ' + (when || 'no date chosen') +
              (time ? ' at ' + time : '') + ' — ' + vtype;

  var original = btn.textContent;
  btn.textContent = 'Sending…'; btn.disabled = true;

  mgPostEnquiry({
    name: name, phone: phone, email: email,
    message: label,
    enquiry_type: 'viewing',
    source: 'property_viewing',
    property_id: window._currentPropertyId || null,
    property_name: window._currentPropertyName || ''
  }).then(function(rows){
    var ref = 'MGE-' + (rows && rows[0] && rows[0].id ? String(rows[0].id).padStart(5,'0') : '');
    show('<strong>Viewing requested</strong><br>' +
         (ref !== 'MGE-' ? 'Reference ' + ref + '<br>' : '') +
         label + '<br>Khun May will confirm with you shortly.', true);
    btn.style.display = 'none';
    mgEmailCopy('Viewing request: ' + (window._currentPropertyName || 'Property') + ' — ' + name,
      {Name:name, Phone:phone, Email:email, Property:window._currentPropertyName, Request:label});
  }).catch(function(e){
    console.warn('MGROUP: viewing request failed', e.message);
    show('Sorry — that did not go through. Please try again, or WhatsApp us and we will book it for you.', false);
    btn.textContent = original; btn.disabled = false;
  });
}

function sidSendEnquiry(){
  var g = function(id){ var el = document.getElementById(id); return el ? el.value.trim() : ''; };
  var name = g('enqName'), phone = g('enqPhone'), email = g('enqEmail'), msg = g('enqMsg');
  var role = g('enqRole');

  var btn  = document.querySelector('#sidAcc2 .sid-submit-btn');
  var sent = document.getElementById('enqSent');

  if (!name)  { document.getElementById('enqName').focus(); return; }
  if (!phone && !email) { document.getElementById('enqPhone').focus();
    sent.style.display = 'block';
    sent.className = 'sid-sent sid-sent--err';
    sent.textContent = 'Please leave a phone number or an email so we can reply.';
    return; }

  var original = btn.textContent;
  btn.textContent = 'Sending…'; btn.disabled = true;

  mgPostEnquiry({
    name: name, phone: phone, email: email,
    message: msg + (role ? '\n\nBuyer type: ' + role : ''),
    enquiry_type: 'property',
    source: 'property_enquiry',
    property_id: window._currentPropertyId || null,
    property_name: window._currentPropertyName || ''
  }).then(function(){
    sent.style.display = 'block';
    sent.className = 'sid-sent';
    sent.textContent = '✓ Sent. Khun May will be in touch shortly.';
    btn.style.display = 'none';
    mgEmailCopy('Property enquiry: ' + (window._currentPropertyName || 'Property') + ' — ' + name,
      {Name:name, Phone:phone, Email:email, Role:role, Property:window._currentPropertyName, Message:msg});
  }).catch(function(e){
    console.warn('MGROUP: enquiry failed', e.message);
    sent.style.display = 'block';
    sent.className = 'sid-sent sid-sent--err';
    sent.textContent = 'Sorry — that did not send. Please try again.';
    btn.textContent = original; btn.disabled = false;
  });
}

/* ─── DETAIL PANEL (openDetail) ─── */

// Gallery navigation
var _galIdx = 0;
function galNav(dir) {
  const imgs = window._detImages || [];
  const total = imgs.length + (window._detVideo ? 1 : 0);
  if (total < 2) return;
  _galIdx = (_galIdx + dir + total) % total;
  const gm = document.getElementById('detGalleryMain');
  if (_galIdx < imgs.length) {
    gm.style.backgroundImage = 'url(' + mgImg(imgs[_galIdx], 1600) + ')';
    gm.style.backgroundSize = 'cover';
    gm.style.backgroundPosition = 'center';
    gm.innerHTML = '';
  } else {
    // video thumb
  }
  document.getElementById('detGalleryCount').textContent = (_galIdx+1) + ' / ' + (total||1);
  document.querySelectorAll('.det-thumb').forEach((t,i)=>t.classList.toggle('active', i===_galIdx));
}

// Save/Love toggle
function toggleDetSave(btn) {
  btn.classList.toggle('saved');
}

// Nearby category filter
function filterNearby(btn, cat) {
  document.querySelectorAll('.det-ncat').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#detNearby .det-near').forEach(el=>{
    const elCat = el.getAttribute('data-cat') || 'all';
    el.style.display = (cat==='all' || elCat===cat) ? '' : 'none';
  });
}

// Floor plan choice
function showFpImage(url, label) {
  var wrap = document.getElementById('detFpImageWrap');
  var ph = document.getElementById('detFpPlaceholder');
  var img = document.getElementById('detFpImg');
  if (!url) {
    if(wrap) wrap.style.display='none';
    if(ph){ ph.style.display='flex'; document.getElementById('detFpPlaceholderLbl').textContent=(label||'Floor plan')+' — coming soon'; }
    return;
  }
  if(ph) ph.style.display='none';
  if(img) img.src=url;   /* floor plans stay original: they can be transparent PNGs, and the resize endpoint returns JPEG */
  if(wrap) wrap.style.display='block';
}


/* ── Property Description: text + photos + video ────────────────
   Blocks come from property_details (category 'description'), which the
   team fills through the property_description_blocks view: one row per
   block, `block` = text | image | video, `content` = the paragraph or
   the media URL, plus an optional caption. Falls back to the flat
   properties.description when a listing has no blocks. */
function mgDescEmbed(url){
  var u = String(url || '').trim();
  var yt = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return '<iframe src="https://www.youtube.com/embed/' + yt[1] +
    '" title="Property video" frameborder="0" allowfullscreen ' +
    'allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"></iframe>';
  var vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return '<iframe src="https://player.vimeo.com/video/' + vm[1] +
    '" title="Property video" frameborder="0" allowfullscreen></iframe>';
  return '<video src="' + u + '" controls preload="metadata" playsinline></video>';
}

function renderDescBlocks(det){
  var blocks = det && det.descBlocks;
  if (!blocks || !blocks.length) return (det && det.desc) || '';

  return blocks.map(function(b){
    var cap = b.caption
      ? '<figcaption class="det-desc-cap">' + b.caption + '</figcaption>' : '';
    if (b.type === 'image') {
      return '<figure class="det-desc-fig">' +
        '<img src="' + b.content + '" alt="' + (b.caption || '') + '" loading="lazy">' +
        cap + '</figure>';
    }
    if (b.type === 'video') {
      return '<figure class="det-desc-fig det-desc-fig--video">' +
        '<div class="det-desc-video">' + mgDescEmbed(b.content) + '</div>' +
        cap + '</figure>';
    }
    return '<p>' + String(b.content || '').replace(/\n/g, '<br>') + '</p>';
  }).join('');
}

async function hydratePropertyDetailRows(propertyId, det) {
  var base = mgRestUrl();
  var key = mgAnonKey();
  if (!base || !key) return;
  try {
    var r = await fetch(base + '/rest/v1/property_details?property_id=eq.' + propertyId + '&order=category.asc,sort_order.asc', {
      headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
    });
    if (!r.ok) return;
    var rows = await r.json();
    if (!Array.isArray(rows) || !rows.length) return;
    var ov = rows.filter(function(x) { return x.category === 'overview'; });
    var fi = rows.filter(function(x) { return x.category === 'finance'; });
    det.details = ov.concat(fi).map(function(x) { return [x.key, x.value]; });

    /* Key Features and Key Highlights were two blocks saying similar
       things. They are now one — highlights live in property_details
       (category 'highlight') so the team edits them like any other row,
       and the overview/finance pairs fold in behind them. */
    /* Location & Nearby now comes from the DB too, each row carrying a
       place_type that drives the category filter buttons. */
    var nb = rows.filter(function(x) { return x.category === 'nearby'; });
    if (nb.length) {
      det.nearby = nb.map(function(x) { return [x.key, x.value, x.place_type || 'all']; });
    }

    /* Description is a block list now — paragraphs, photos and a video
       in whatever order the team enters them (see the
       property_description_blocks view). Empty list = keep the plain
       properties.description text. */
    var db = rows.filter(function(x) { return x.category === 'description'; })
                 .sort(function(a, b) { return (a.sort_order || 0) - (b.sort_order || 0); });
    if (db.length) {
      det.descBlocks = db.map(function(x) {
        return { type: (x.key || 'text').toLowerCase(), content: x.value, caption: x.caption || '' };
      });
    }

    var hl = rows.filter(function(x) { return x.category === 'highlight'; });
    if (hl.length) {
      det.highlights = hl.map(function(x) { return { label: x.key, text: x.value }; });
    }
    if (det.details.length) {
      det.highlights = (det.highlights || []).concat(
        det.details.map(function(d) { return { label: d[0], text: d[1] }; })
      );
    }
  } catch(e) {
    console.warn('MGROUP: property_details', e.message);
  }
}

async function loadUnitTypes(propertyId) {
  var base = mgRestUrl();
  var key = mgAnonKey();
  if (!base || !key) return [];
  try {
    var resp = await fetch(base + '/rest/v1/property_unit_types?property_id=eq.' + propertyId + '&is_active=eq.true&order=sort_order.asc', {
      headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
    });
    var units = await resp.json();
    if (!Array.isArray(units) || !units.length) return [];

    var ids = units.map(function(u) { return u.id; }).join(',');
    var imgResp = await fetch(base + '/rest/v1/property_unit_images?unit_type_id=in.(' + ids + ')&order=sort_order.asc', {
      headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
    });
    var images = await imgResp.json();
    var byUnit = {};
    (Array.isArray(images) ? images : []).forEach(function(img) {
      (byUnit[img.unit_type_id] = byUnit[img.unit_type_id] || []).push(img);
    });
    return units.map(function(u) {
      return Object.assign({}, u, { floorplans: byUnit[u.id] || [] });
    });
  } catch(e) {
    console.warn('MGROUP: loadUnitTypes', e.message);
    return [];
  }
}

function renderUnitTypes(units) {
  var section = document.getElementById('detLayouts');
  if (!section) return;
  if (!units || !units.length) { section.style.display = 'none'; return; }
  section.style.display = '';

  var series = [];
  var seriesMap = {};
  units.forEach(function(u) {
    var s = (u.series && String(u.series).trim()) ? String(u.series).trim() : 'Units';
    if (!seriesMap[s]) { seriesMap[s] = []; series.push(s); }
    seriesMap[s].push(u);
  });

  var seriesBar = document.getElementById('detSeriesTabs');
  if (seriesBar) {
    if (series.length > 1) {
      seriesBar.innerHTML = series.map(function(s, i) {
        return '<button type="button" class="det-series-tab' + (i === 0 ? ' active' : '') + '" data-series="' + String(s).replace(/"/g, '&quot;') + '" onclick="selectSeries(' + JSON.stringify(s) + ')">' + String(s) + '</button>';
      }).join('');
    } else {
      seriesBar.innerHTML = '';
    }
  }

  window._UNIT_DATA = { units: units, seriesMap: seriesMap };
  selectSeries(series[0]);
}

function selectSeries(s) {
  var data = window._UNIT_DATA;
  if (!data || !data.seriesMap || !data.seriesMap[s]) return;
  document.querySelectorAll('.det-series-tab').forEach(function(t) {
    t.classList.toggle('active', t.getAttribute('data-series') === s);
  });
  var list = data.seriesMap[s];
  var tabs = document.getElementById('detUnitTabs');
  if (tabs) {
    tabs.innerHTML = list.map(function(u, i) {
      return '<button type="button" class="det-unit-tab' + (i === 0 ? ' active' : '') + '" data-unit-id="' + u.id + '" onclick="selectUnit(' + u.id + ')">' + (u.name || 'Unit') + '</button>';
    }).join('');
  }
  selectUnit(list[0].id);
}

function selectUnit(unitId) {
  var data = window._UNIT_DATA;
  if (!data || !data.units) return;
  var unit = data.units.find(function(u) { return String(u.id) === String(unitId); });
  if (!unit) return;
  document.querySelectorAll('.det-unit-tab').forEach(function(t) {
    t.classList.toggle('active', String(t.dataset.unitId) === String(unitId));
  });
  var panel = document.getElementById('detUnitPanel');
  if (!panel) return;
  var sqmEl = panel.querySelector('.um-sqm');
  var brEl = panel.querySelector('.um-br');
  var baEl = panel.querySelector('.um-ba');
  var prEl = panel.querySelector('.um-price');
  if (sqmEl) sqmEl.textContent = unit.sqm ? (unit.sqm + ' m²') : '—';
  if (brEl) brEl.textContent = unit.bedrooms != null ? String(unit.bedrooms) : '—';
  if (baEl) baEl.textContent = unit.bathrooms != null ? String(unit.bathrooms) : '—';
  if (prEl) prEl.textContent = unit.price_display || 'Upon request';
  var fpWrap = document.getElementById('detUnitFloorplans');
  if (fpWrap) {
    fpWrap.innerHTML = (unit.floorplans || []).map(function(img) {
      var cap = img.caption ? '<div class="det-fp-cap">' + String(img.caption).replace(/&/g,'&amp;').replace(/</g,'&lt;') + '</div>' : '';
      return '<div><img src="' + img.url + '" alt="">' + cap + '</div>';
    }).join('');
  }
}

async function loadPropertyVideo(propertyId) {
  var base = mgRestUrl();
  var key = mgAnonKey();
  if (!base || !key) return null;
  try {
    var resp = await fetch(base + '/rest/v1/property_videos?property_id=eq.' + propertyId + '&order=sort_order.asc&limit=1', {
      headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
    });
    var vids = await resp.json();
    return Array.isArray(vids) && vids.length ? vids[0] : null;
  } catch(e) {
    return null;
  }
}

function renderPropertyVideo(video) {
  var section = document.getElementById('detVideoSection');
  var wrap = document.getElementById('detVideoWrap');
  if (!section || !wrap) return;
  if (!video || !video.url) { section.style.display = 'none'; wrap.innerHTML = ''; return; }
  var m = String(video.url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (!m) { section.style.display = 'none'; wrap.innerHTML = ''; return; }
  section.style.display = '';
  wrap.innerHTML = '<iframe src="https://www.youtube.com/embed/' + m[1] + '" title="Property Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
}

async function loadPropertyFloorplans(propertyId) {
  var base = mgRestUrl();
  var key = mgAnonKey();
  if (!base || !key) return [];
  try {
    var resp = await fetch(base + '/rest/v1/property_images?property_id=eq.' + propertyId + '&image_type=eq.floorplan&order=sort_order.asc', {
      headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
    });
    var rows = await resp.json();
    return Array.isArray(rows) ? rows : [];
  } catch(e) {
    return [];
  }
}

function renderPropertyFloorplans(plans) {
  var section = document.getElementById('detFloorplansSection');
  var grid = document.getElementById('detFpGrid');
  if (!section || !grid) return;
  if (!Array.isArray(plans) || !plans.length) { section.style.display = 'none'; grid.innerHTML = ''; return; }
  section.style.display = '';
  grid.innerHTML = plans.map(function(p) {
    var cap = p.caption ? '<div class="det-fp-cap">' + String(p.caption).replace(/&/g,'&amp;').replace(/</g,'&lt;') + '</div>' : '';
    return '<div><img src="' + p.url + '" alt="">' + cap + '</div>';
  }).join('');
}

async function openDetail(id) {
  try {

  const p=PROPS.find(x=>x.id===id), d=PD[id];
  if(!p) { console.error('openDetail: property not found for id='+id+', PROPS.length='+PROPS.length);  return; }
  if(!d) { console.warn('openDetail: no PD entry for id='+id+', using default'); }
  const det = d || { usd:'', yield:'', pool:'Private', desc:'<p>'+p.desc+'</p>', feats:[], details:[['Location',p.loc],['Bedrooms',p.beds],['Bathrooms',p.baths],['Size',p.sqm+' sqm']], finance:[['Asking Price',p.price]], nearby:[], images:[], video:'' };
  det.details = det.details || [];
  det.feats = det.feats || [];
  await hydratePropertyDetailRows(id, det);
  if (!det.images) det.images = [];
  if (!det.video) det.video = '';
  curProp=p;
  // Gallery — build image list from PD images + main img
  const imgs = det.images && det.images.length > 0 ? det.images : (p.img ? [p.img] : []);
  const hasVideo = det.video && det.video.length > 0;
  window._detImages = imgs;
  window._detVideo = det.video || null;
  const gm=document.getElementById('detGalleryMain');
  if (imgs.length > 0) {
    gm.style.cssText=`background-image:url(${mgImg(imgs[0],1600)});background-size:cover;background-position:center;width:100%;height:100%;`;
    gm.innerHTML='';
  } else {
    gm.style.cssText=`background:${p.bg};width:100%;height:100%;display:flex;align-items:center;justify-content:center;`;
    gm.innerHTML=`<span style="font-size:80px;opacity:0.1">${p.emoji}</span>`;
  }
  const totalMedia = imgs.length + (hasVideo ? 1 : 0);
  document.getElementById('detGalleryCount').textContent=`1 / ${totalMedia || 1}`;
  // Build thumbnails from real images
  let thumbsHtml = imgs.map((url,i)=>`<div class="det-thumb${i===0?' active':''}" style="background-image:url(${mgImg(url,200)})" onclick="swThumb(this,${i},event)"></div>`).join('');
  if (hasVideo) {
    thumbsHtml += `<div class="det-thumb det-thumb-video" style="background-image:url(${mgImg(imgs[0]||'',200)})" onclick="openVideoLightbox(event)"></div>`;
  }
  document.getElementById('detThumbs').innerHTML = thumbsHtml;
  // Header
  document.getElementById('detCollLabel').textContent=p.collLabel;
  document.getElementById('detBadge').textContent=p.badge;
  document.getElementById('detTitle').textContent=p.name;
  document.getElementById('detLocation').textContent=''+p.loc;
  // Inline price block under title
  document.getElementById('detPriceInline').textContent=p.price;
  document.getElementById('detUsdInline').textContent=det.usd;
  // yield removed
  document.getElementById('dsBeds').textContent=p.beds>0?p.beds:'—';
  document.getElementById('dsBaths').textContent=p.baths>0?p.baths:'—';
  document.getElementById('dsSqm').textContent=p.sqm.toLocaleString();
  var dsPoolEl=document.getElementById('dsPool'); if(dsPoolEl) dsPoolEl.textContent=det.pool;
  // Content
  document.getElementById('detDesc').innerHTML = renderDescBlocks(det);
  const featEmoji = (f) => MGI.icon(f, 'mgi-feat');
  document.getElementById('detFeats').innerHTML=det.feats.map(f=>`<div class="det-feat"><span class="det-feat-emoji">${featEmoji(f)}</span><span>${f}</span></div>`).join('');
  var detailRows = (det.details || []).map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join('');
  if (det.developer) {
    var logoHtml = det.developerLogo
      ? `<img src="${det.developerLogo}" alt="${det.developer}" style="height:24px;width:auto;max-width:100px;object-fit:contain;vertical-align:middle;">`
      : `<span>${det.developer}</span>`;
    detailRows += `<tr id="detDeveloperRow"><td>Developer</td><td>${logoHtml}</td></tr>`;
  }
  /* Key Features table is gone — its rows now fold into Key Highlights.
     Guarded so the missing element cannot abort the rest of openDetail. */
  var _tbl = document.getElementById('detTbl');
  if (_tbl) _tbl.innerHTML = detailRows;
  var kfEl = document.getElementById('detKeyFactsSection');
  if (kfEl) {
    var showKf = (det.details && det.details.length > 0) || !!det.developer;
    kfEl.style.display = showKf ? '' : 'none';
  }
  // detFin removed
  document.getElementById('detMapLoc').textContent=p.loc;
  // Load map
  const mapQ=encodeURIComponent(p.loc+', Phuket, Thailand');
  document.getElementById('detMapIframe').src='https://maps.google.com/maps?q='+mapQ+'&t=&z=14&ie=UTF8&iwloc=&output=embed';
  document.getElementById('detMapOverlay').style.display='none';
  // detNearby set below with category support
  // Pre-fill enquiry form
  window._currentPropertyName=p.name;
  window._currentPropertyId=p.id;          /* the enquiry rows key off this */
  document.getElementById('enqMsg').value='Hello, I am interested in '+p.name;
  document.getElementById('enqRole').value='';
  document.getElementById('enqName').value='';
  ['schName','schPhone','schEmail'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.value='';
  });
  document.getElementById('enqPhone').value='';
  document.getElementById('enqEmail').value='';
  document.getElementById('enqSent').style.display='none';
  const sb2=document.querySelector('#sidAcc2 .sid-submit-btn');
  if(sb2) sb2.style.display='';
  // Similar
  const sim=PROPS.filter(x=>x.id!==id).sort(()=>Math.random()-0.5).slice(0,4);
  document.getElementById('detSimilar').innerHTML=sim.map(x=>{
    const specs=[];
    if(x.beds) specs.push(`<span style="display:inline-flex;align-items:center;gap:3px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 18.5v-6a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v6"/><path d="M2.5 18.5h19"/><path d="M5.5 10.5V8a1.5 1.5 0 0 1 1.5-1.5h10A1.5 1.5 0 0 1 18.5 8v2.5"/><path d="M4 18.5v2M20 18.5v2"/></svg><span style="font-family:'Lato',sans-serif;font-size:13px;color:rgba(255,255,255,0.9)">${x.beds}</span><span style="font-family:'Lato',sans-serif;font-size:9px;letter-spacing:0.13em;text-transform:uppercase;color:rgba(255,255,255,0.6)">Bedrooms</span></span>`);
    if(x.baths) specs.push(`<span style="display:inline-flex;align-items:center;gap:3px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12.5h18v2.5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2.5Z"/><path d="M6.5 12.5V6.2A2.2 2.2 0 0 1 8.7 4h.1a2.2 2.2 0 0 1 2.2 2.2"/><path d="M9.4 6.6h2.6"/><path d="M7.5 19.5 6.5 21M16.5 19.5l1 1.5"/></svg><span style="font-family:'Lato',sans-serif;font-size:13px;color:rgba(255,255,255,0.9)">${x.baths}</span><span style="font-family:'Lato',sans-serif;font-size:9px;letter-spacing:0.13em;text-transform:uppercase;color:rgba(255,255,255,0.6)">Bathrooms</span></span>`);
    if(x.sqm) specs.push(`<span style="display:inline-flex;align-items:center;gap:3px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10.6 9-7.1 9 7.1"/><path d="M5.4 9.2V20a.8.8 0 0 0 .8.8h11.6a.8.8 0 0 0 .8-.8V9.2"/><path d="M10 20.8v-5h4v5"/></svg><span style="font-family:'Lato',sans-serif;font-size:13px;color:rgba(255,255,255,0.9)">${x.sqm}</span><span style="font-family:'Lato',sans-serif;font-size:9px;letter-spacing:0.13em;text-transform:uppercase;color:rgba(255,255,255,0.6)">sqm</span></span>`);
    const specsHtml=specs.length?`<div style="display:flex;gap:10px;margin-top:6px;">${specs.join('')}</div>`:'';
    const collDisplay=x.coll?(x.coll.charAt(0).toUpperCase()+x.coll.slice(1).replace(/-/g,' ')):'';
    return `<div class="det-sim-card" onclick=\"location.href='property.html?id=${x.id}'\"><div class="det-sim-img" style="background-image:url(${mgImg(x.img||'',760)});"><div class="det-sim-img-overlay"></div><div class="det-sim-over">${collDisplay?`<div class="inv-card-coll">${collDisplay}</div>`:''}<div class="det-sim-name">${x.name}</div>${specsHtml}<div style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.15);display:flex;align-items:baseline;justify-content:space-between;"><span class="inv-card-price" style="font-family:'Lato',sans-serif;font-size:20px;font-weight:600;letter-spacing:-0.01em;white-space:nowrap;">${x.price}</span><span class="det-sim-loc" style="font-family:'Lato',sans-serif;font-size:8px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.5);text-align:right;">${x.loc||''}</span></div></div></div></div>`;
  }).join('');

  // Land size
  const landEl = document.getElementById('dsLand');
  /* prefer the live `land_sqm` column over the static PD table so the
     value the owner types in admin is what the page shows */
  if (landEl) landEl.textContent = p.land ? p.land.toLocaleString() : (det.land || '—');
  /* hide the Plot chip entirely when there is no land (condos) */
  var landWrap = document.getElementById('dsLandWrap');
  if (landWrap) landWrap.style.display = (p.land || det.land) ? '' : 'none';

  // Developer row is now rendered inside detTbl

  // Key Highlights
  const hlSection = document.getElementById('detHighlightsSection');
  const hlGrid = document.getElementById('detHighlights');
  if (det.highlights && det.highlights.length) {
    hlGrid.innerHTML = det.highlights.map(h=>`<div class="det-highlight-item"><span class="det-hl-icon">${MGI.icon(h.label||h.text||'')}</span><div><span class="det-hl-label">${h.label||''}</span><span class="det-hl-text">${h.text}</span></div></div>`).join('');
    hlSection.style.display = '';
  } else {
    hlSection.style.display = 'none';
  }

  // Floor plans
  const fpSection = document.getElementById('detFloorplanSection');
  if (det.floorplans && det.floorplans.length) {
    const fpSel = document.getElementById('detFpSelect');
    if (fpSel) {
      fpSel.innerHTML = '<option value="">— Select —</option>' + det.floorplans.slice(0,10).map((fp)=>`<option value="${fp.url||''}">${fp.label}</option>`).join('');
    }
    // Reset image on open
    var fpWrap = document.getElementById('detFpImageWrap');
    var fpPh = document.getElementById('detFpPlaceholder');
    if(fpWrap) fpWrap.style.display='none';
    if(fpPh) fpPh.style.display='none';
    fpSection.style.display = '';
  } else {
    fpSection.style.display = 'none';
  }

  // Description media (images + video)
  const mediaGrid = document.getElementById('detMediaGrid');
  const mediaItems = det.mediaImages || [];
  const mediaVideo = det.mediaVideo || '';
  if (mediaItems.length || mediaVideo) {
    let mHtml = mediaItems.map(url=>`<div class="det-media-item"><img src="${url}"></div>`).join('');
    if (mediaVideo) mHtml += `<div class="det-media-item det-media-video" style="background:#111;cursor:pointer" onclick="openVideoLightbox(event)"></div>`;
    mediaGrid.innerHTML = mHtml;
    mediaGrid.style.display = '';
  } else {
    mediaGrid.style.display = 'none';
  }

  // Nearby with categories
  document.getElementById('detNearby').innerHTML = (det.nearby||[]).map(([n,dist,cat])=>{
    var ico = (typeof MGI !== 'undefined' && typeof mgNearbyIcon === 'function') ? mgNearbyIcon(cat) : '';
    return `<div class="det-near" data-cat="${cat||'all'}"><span class="det-near-name">${ico}${n}</span><span class="det-near-dist">${dist}</span></div>`;
  }).join('');
  renderNearbyCats(det.nearby || []);
  document.querySelectorAll('.det-ncat').forEach(b=>b.classList.toggle('active',b.getAttribute('data-cat')==='all'));

  loadUnitTypes(id).then(renderUnitTypes);
  loadPropertyVideo(id).then(renderPropertyVideo);
  loadPropertyFloorplans(id).then(renderPropertyFloorplans);

  // reset gallery index
  _galIdx = 0;
  // Reset accordions (all closed by default — Description/Features are always-open sections now)
  document.querySelectorAll('.det-sections .acc-item').forEach(el=>el.classList.remove('open'));
  // Open
  document.getElementById('detOverlay')?.classList.add('open');
  document.getElementById('detOverlay').scrollTop=0;
  document.getElementById('homePage')?.classList.add('hidden');
  /* On property.html the panel IS the page, not a modal over one — locking
     there froze the page with nothing to close. */
  if (document.body.getAttribute('data-page') !== 'property') mgLock('modal');

  } catch(e) {
    console.error('openDetail error:', e);
  }
}
window.openDetail = openDetail; // ensure global


function simScroll(dir){
  var rail = document.getElementById('detSimilar');
  if (!rail) return;
  var card = rail.querySelector('.det-sim-card');
  var step = card ? card.getBoundingClientRect().width + 18 : rail.clientWidth * 0.8;
  var max  = Math.max(0, rail.scrollWidth - rail.clientWidth);
  var at   = rail.scrollLeft;
  var next;

  if (dir > 0) {
    /* one card at a time, stopping at the end; only wrap to the start
       once already there — a step longer than the remaining overflow
       used to jump straight back to 0 and look frozen */
    next = (at >= max - 4) ? 0 : Math.min(at + step, max);
  } else {
    next = (at <= 4) ? max : Math.max(at - step, 0);
  }
  rail.scrollTo({ left: next, behavior: 'smooth' });
}
function closeDetail() {
  document.getElementById('detOverlay')?.classList.remove('open');
  document.getElementById('homePage')?.classList.remove('hidden');
  mgUnlock('modal');
}

function swThumb(el,idx,e) {
  if(e) e.stopPropagation();
  document.querySelectorAll('.det-thumb').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  const imgs = window._detImages || [];
  const totalMedia = imgs.length + (window._detVideo ? 1 : 0);
  document.getElementById('detGalleryCount').textContent=`${idx+1} / ${totalMedia || 1}`;
  const gm=document.getElementById('detGalleryMain');
  if (imgs[idx]) {
    gm.style.cssText=`background-image:url(${mgImg(imgs[idx],1600)});background-size:cover;background-position:center;width:100%;height:100%;`;
    gm.innerHTML='';
  }
}

function openVideoLightbox(e) {
  if(e) e.stopPropagation();
  const video = window._detVideo;
  if (!video) return;
  const inner = document.getElementById('videoLightboxInner');
  const closeBtn = '<button class="video-lightbox-close" onclick="closeVideoLightbox()">&times;</button>';
  if (video.includes('youtube.com') || video.includes('youtu.be')) {
    let vid = video.includes('youtu.be') ? video.split('/').pop() : new URL(video).searchParams.get('v');
    inner.innerHTML = closeBtn + `<iframe src="https://www.youtube.com/embed/${vid}?autoplay=1" allow="autoplay;encrypted-media" allowfullscreen></iframe>`;
  } else {
    inner.innerHTML = closeBtn + `<video src="${video}" controls autoplay style="width:100%;height:100%;object-fit:contain;"></video>`;
  }
  document.getElementById('videoLightbox')?.classList.add('open');
}

function closeVideoLightbox(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('video-lightbox-close')) return;
  const lb = document.getElementById('videoLightbox');
  lb.classList.remove('open');
  document.getElementById('videoLightboxInner').innerHTML = '<button class="video-lightbox-close" onclick="closeVideoLightbox()">&times;</button>';
}

function toggleAcc(btn) { btn.closest('.acc-item').classList.toggle('open'); }

/* Full-page detail — close only via back button, not background click */

/* ─── BOOKING MODAL ─── */
const MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
const UNV=['09:00','13:00','16:00'];
const TSLOTS=['09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:00'];
let bk={y:0,m:0,date:null,time:null,vtype:null};

function openBooking() {
  const now=new Date();
  bk={y:now.getFullYear(),m:now.getMonth(),date:null,time:null,vtype:null};
  document.getElementById('bookPropSub').textContent=curProp?curProp.name:'';
  bsGoStep(1,true);
  renderCal();
  document.getElementById('bookOverlay')?.classList.add('open');
}
function closeBooking() { document.getElementById('bookOverlay')?.classList.remove('open'); }
document.getElementById('bookOverlay')?.addEventListener('click',function(e){ if(e.target===this) closeBooking(); });

function bsGoStep(n) {
  [1,2,3].forEach(i=>{ const t=document.getElementById('bst'+i); t.classList.remove('active','done'); if(i===n)t.classList.add('active'); else if(i<n)t.classList.add('done'); });
  ['bsp1','bsp2','bsp3','bspSuccess'].forEach(id=>document.getElementById(id).classList.remove('active'));
  document.getElementById(n<=3?'bsp'+n:'bspSuccess').classList.add('active');
  if(n===2) rStep2();
  if(n===3) rStep3();
}

function changeMonth(d) {
  bk.m+=d; if(bk.m>11){bk.m=0;bk.y++;} if(bk.m<0){bk.m=11;bk.y--;} renderCal();
}

function renderCal() {
  document.getElementById('calLbl').textContent=`${MN[bk.m]} ${bk.y}`;
  const first=new Date(bk.y,bk.m,1).getDay(), days=new Date(bk.y,bk.m+1,0).getDate();
  const today=new Date(); today.setHours(0,0,0,0);
  const min=new Date(today.getTime()+86400000);
  let h='';
  for(let e=0;e<first;e++) h+=`<div class="cal-day emp"></div>`;
  for(let d=1;d<=days;d++){
    const dt=new Date(bk.y,bk.m,d),dow=dt.getDay();
    const dis=dt<min||dow===0||dow===6;
    const sel=bk.date&&dt.toDateString()===bk.date.toDateString();
    const isT=dt.toDateString()===today.toDateString();
    h+=`<div class="cal-day${dis?' dis':''}${sel?' sel':''}${isT?' today':''}" ${!dis?`onclick="selDate(${bk.y},${bk.m},${d})"`:''}>${d}</div>`;
  }
  document.getElementById('calDays').innerHTML=h;
}

function selDate(y,m,d) {
  bk.date=new Date(y,m,d); bk.time=null; renderCal(); renderTimes();
  document.getElementById('timeSectWrap').style.display='block';
  document.getElementById('bsn1').disabled=true;
}

function renderTimes() {
  document.getElementById('timeGrid').innerHTML=TSLOTS.map(t=>{
    const un=UNV.includes(t),sel=bk.time===t;
    return `<div class="time-slot${un?' unavail':''}${sel?' sel':''}" ${!un?`onclick="selTime('${t}')"`:''}>${t}${un?'<br><small style="font-size:8px;color:#bbb">Booked</small>':''}</div>`;
  }).join('');
}

function selTime(t) { bk.time=t; renderTimes(); document.getElementById('bsn1').disabled=false; }

function selVisit(el,type) {
  bk.vtype=type;
  document.querySelectorAll('.visit-type').forEach(v=>v.classList.remove('sel')); el.classList.add('sel');
  document.getElementById('bsn2').disabled=false;
}

function fmtD(d) { const ds=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']; return `${ds[d.getDay()]}, ${d.getDate()} ${MN[d.getMonth()]} ${d.getFullYear()}`; }

function rStep2() {
  const dt=bk.date?`${fmtD(bk.date)} at ${bk.time}`:'';
  document.getElementById('bs2Summary').innerHTML=`<div class="book-sum-prop">${curProp?curProp.name:''}</div><div class="book-sum-dt">${dt}</div>`;
}

function rStep3() {
  const dt=bk.date?`${fmtD(bk.date)} at ${bk.time}`:'';
  const vt=bk.vtype==='in-person'?'In-Person Viewing':'Virtual Tour';
  document.getElementById('bs3Summary').innerHTML=`<div class="book-sum-prop">${curProp?curProp.name:''}</div><div class="book-sum-dt">${dt}</div><div class="book-sum-type">${vt}</div>`;
}

function validateBf() {
  const ok=document.getElementById('bfFirst')?.value.trim()&&document.getElementById('bfLast')?.value.trim()&&document.getElementById('bfEmail')?.value.includes('@')&&document.getElementById('bfPhone')?.value.trim();
  document.getElementById('bsn3').disabled=!ok;
}

function confirmBooking() {
  const ref='MGE-'+(Math.floor(Math.random()*90000)+10000);
  const dt=fmtD(bk.date)+' at '+bk.time;
  const vt=bk.vtype==='in-person'?'in-person viewing':'virtual tour';
  const name=document.getElementById('bfFirst')?.value;
  document.getElementById('bsSuccessMsg').textContent=`Thank you, ${name}. Your ${vt} for ${curProp.name} has been scheduled for ${dt}. Our agent will contact you within 2 hours.`;
  document.getElementById('bsSuccessRef').textContent=`Booking Reference: #${ref}`;
  ['bsp1','bsp2','bsp3'].forEach(id=>document.getElementById(id).classList.remove('active'));
  document.querySelectorAll('.book-step-tab').forEach(t=>{t.classList.remove('active');t.classList.add('done');});
  document.getElementById('bspSuccess')?.classList.add('active');
}

document.addEventListener('keydown',e=>{ if(e.key==='Escape'){closeBooking();closeDetail();closeCollHub();goHome();} });

/* ─── CHAT ─── */
const chatReplies = [
  'We have several beautiful properties in that collection. Would you like to schedule a private viewing?',
  'Our Beachfront and Exclusive collections are particularly sought-after right now.',
  'I can share detailed brochures for any property. What is your preferred location and budget?',
  'Our new Wellness and Lakeview collections have just launched — shall I show you the highlights?',
];
let rIdx = 0;
function toggleChat() { document.getElementById('chatWin')?.classList.toggle('open'); }
const chatHistory = [];
async function sendChat() {
  const inp = document.getElementById('chatInp');
  const msg = inp.value.trim();
  if(!msg) return;
  const msgs = document.getElementById('chatMsgs');
  msgs.innerHTML += `<div class="chat-msg user"><div class="chat-bubble">${msg}</div><div class="chat-time">Now</div></div>`;
  inp.value = ''; msgs.scrollTop = msgs.scrollHeight;
  chatHistory.push({role:'user', content: msg});
  const typing = document.createElement('div');
  typing.className = 'chat-msg bot'; typing.id = 'chatTyping';
  typing.innerHTML = '<div class="chat-bubble" style="opacity:0.5;font-style:italic;">Thinking…</div>';
  msgs.appendChild(typing); msgs.scrollTop = msgs.scrollHeight;
  try {
    const resp = await fetch(SB_URL + '/functions/v1/chat-proxy', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ messages: chatHistory })
    });
    const data = await resp.json();
    const reply = data.content && data.content[0] ? data.content[0].text : 'Thank you for your message. Our team will assist you shortly.';
    chatHistory.push({role:'assistant', content: reply});
    document.getElementById('chatTyping')?.remove();
    msgs.innerHTML += `<div class="chat-msg bot"><div class="chat-bubble">${reply.replace(/\n/g,'<br>')}</div><div class="chat-time">Now</div></div>`;
    msgs.scrollTop = msgs.scrollHeight;
  } catch(e) {
    document.getElementById('chatTyping')?.remove();
    msgs.innerHTML += '<div class="chat-msg bot"><div class="chat-bubble">I\'m unable to respond right now. Please use our contact form or WhatsApp for assistance.</div><div class="chat-time">Now</div></div>';
    msgs.scrollTop = msgs.scrollHeight;
  }
}








// ── Mobile bottom nav visibility ──────────────────────
(function initMobNav() {
  const nav = document.getElementById('mobBottomNav');
  if (!nav) return;
  if (window.innerWidth <= 768) { nav.style.display = 'flex'; nav.style.position = 'fixed'; }
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) { nav.style.display = 'flex'; nav.style.position = 'fixed'; }
    else { nav.style.display = 'none'; }
  });
  // Update active state
  const items = nav.querySelectorAll('.mob-nav-item');
  function setActive(idx) {
    items.forEach((el,i) => el.classList.toggle('active', i===idx));
  }
  items[0].addEventListener('click', () => setActive(0));
  items[1].addEventListener('click', () => setActive(1));
  items[2].addEventListener('click', () => setActive(2));
  items[3].addEventListener('click', () => setActive(3));
})();



/* ─── LANGUAGE SELECTOR ─── */
function toggleLangMenu(e) {
  e.stopPropagation();
  var sel = document.getElementById('langSelector');
  var dd  = document.getElementById('langDropdown');
  if (!sel || !dd) return;
  var isOpen = dd.classList.contains('open');
  // Close all first
  document.querySelectorAll('.lang-dropdown').forEach(function(d){ d.classList.remove('open'); });
  if (!isOpen) dd.classList.add('open');
}

function setLang(code, label) {
  // Update button label
  var langCode = document.getElementById('langCode');
  if (langCode) langCode.textContent = label;
  // Close dropdown
  document.querySelectorAll('.lang-dropdown').forEach(function(d){ d.classList.remove('open'); });
  // Mark active
  document.querySelectorAll('.lang-option').forEach(function(o){
    o.classList.toggle('active', o.getAttribute('data-lang') === code);
  });
  // Store preference
  try { localStorage.setItem('mgroup_lang', code); } catch(e){}
  console.log('Language set to:', code);
}

// Close lang dropdown when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('#langSelector')) {
    document.querySelectorAll('.lang-dropdown').forEach(function(d){ d.classList.remove('open'); });
  }
});



/* ─── COLLECTION HUB: Load prices + counts from Supabase ─── */
async function loadHubData() {
  const SURL = typeof SUPABASE_URL !== 'undefined' ? SUPABASE_URL : null;
  const SKEY = typeof SUPABASE_ANON !== 'undefined' ? SUPABASE_ANON : null;
  
  // Use local PROPS as fallback
  const props = window.PROPS || PROPS || [];
  
  // Calculate from local data first (instant)
  const collStats = {};
  props.forEach(p => {
    if (!collStats[p.coll]) collStats[p.coll] = { min: Infinity, count: 0 };
    collStats[p.coll].count++;
    if (p.priceNum < collStats[p.coll].min) collStats[p.coll].min = p.priceNum;
  });
  
  // Update hub cards with local data
  Object.entries(collStats).forEach(([coll, stats]) => {
    const priceEl = document.getElementById('hubPrice_' + coll);
    const countEl = document.getElementById('hubCount_' + coll);
    if (priceEl) {
      priceEl.classList.remove('loading');
      priceEl.textContent = formatHubPrice(stats.min);
    }
    if (countEl) countEl.textContent = stats.count + ' Propert' + (stats.count === 1 ? 'y' : 'ies');
  });
  
  // Fallback: remove loading state for any hub prices still loading after local data
  document.querySelectorAll('.hcc-price.loading').forEach(el => {
    el.classList.remove('loading');
    el.classList.add('loading-failed');
    el.textContent = 'Contact Us';
  });

  // Try Supabase for live data
  if (!SURL || SURL.includes('YOUR_')) return;
  
  try {
    const resp = await fetch(SURL + '/rest/v1/properties?select=collection_id,price_thb,is_active&is_active=eq.true', {
      headers: { 'apikey': SKEY, 'Authorization': 'Bearer ' + SKEY }
    });
    if (!resp.ok) return;
    const data = await resp.json();
    
    // Recalculate with live data
    const liveStats = {};
    data.forEach(p => {
      const c = p.collection_id;
      if (!liveStats[c]) liveStats[c] = { min: Infinity, count: 0 };
      liveStats[c].count++;
      if (p.price_thb < liveStats[c].min) liveStats[c].min = p.price_thb;
    });
    
    Object.entries(liveStats).forEach(([coll, stats]) => {
      const priceEl = document.getElementById('hubPrice_' + coll);
      const countEl = document.getElementById('hubCount_' + coll);
      if (priceEl) priceEl.textContent = formatHubPrice(stats.min);
      if (countEl) countEl.textContent = stats.count + ' Propert' + (stats.count === 1 ? 'y' : 'ies');
    });
    console.log('✅ Hub prices loaded from Supabase');
  } catch(e) {
    console.warn('Hub using local data:', e.message);
  }
}

function formatHubPrice(priceNum) {
  if (!priceNum || priceNum === Infinity) return 'POA';
  if (priceNum >= 1000000) {
    const m = (priceNum / 1000000).toFixed(1).replace(/\.0$/, '');
    return '฿ ' + m + 'M';
  }
  return '฿ ' + priceNum.toLocaleString();
}



function resetFilters() {
  currentCity='Phuket'; currentType='all';
  var _sc=document.getElementById('selCity'), _st=document.getElementById('selType');
  if(_sc) _sc.value='Phuket';
  if(_st) _st.value='all';
  currentBeds = 'all';
  currentBudget = 'all';
  currentColl = 'all';
  currentSort = 'random';
  shuffledAll = typeof shuffle === 'function' ? shuffle([...(window.PROPS||PROPS)]) : [...(window.PROPS||PROPS)];
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.filter-chip').forEach(c => {
    if (c.getAttribute('onclick')?.includes("'all'")) c.classList.add('active');
  });
  if (document.getElementById('ddLabel')) document.getElementById('ddLabel').textContent = 'All Collections';
  renderGrid();
}



function showHubView() {
  var hv = document.getElementById('hubView');
  var gv = document.getElementById('gridView');
  var fr = document.getElementById('filterRow');
  if(hv) hv.style.display = 'block';
  if(gv) gv.style.display = 'none';
  if(fr) fr.style.display = 'none';
  document.getElementById('viewBtnHub')?.classList.add('active');
  document.getElementById('viewBtnGrid')?.classList.remove('active');
  loadHubData();
}

function showGridView() {
  var hv = document.getElementById('hubView');
  var gv = document.getElementById('gridView');
  var fr = document.getElementById('filterRow');
  if(hv) hv.style.display = 'none';
  if(gv) gv.style.display = 'block';
  if(fr) fr.style.display = 'flex';
  document.getElementById('viewBtnHub')?.classList.remove('active');
  document.getElementById('viewBtnGrid')?.classList.add('active');
}



/* ─── PROCESS PAGE ─── */
function openProcessPage() {
  var pp = document.getElementById('processPage');
  if (!pp) return;
  pp.classList.add('open');
  
  pp.scrollTop = 0;
  document.getElementById('homePage')?.classList.add('hidden');
  mgLock('panel');
}

function closeProcessPage() {
  var pp = document.getElementById('processPage');
  if (!pp) return;
  pp.classList.remove('open');
  var sy=parseInt(document.body.getAttribute('data-scroll-y')||'0',10);
  mgUnlock('panel');
   mgUnlock('modal');
  window.scrollTo(0,sy);
}



/* ─── INSIGHTS PAGE ─── */
function openInsightsPage() {
  var ip = document.getElementById('insightsPage');
  if (!ip) return;
  // Close detail overlay and article panel if open
  var detOv = document.getElementById('detOverlay');
  if (detOv) detOv.classList.remove('open');
  var artPanel = document.getElementById('insArticlePanel');
  if (artPanel) artPanel.classList.remove('open');
  ip.style.overflow = '';
  ip.classList.add('open');
  
  ip.scrollTop = 0;
  document.getElementById('homePage')?.classList.add('hidden');
  mgLock('panel');
}

function closeInsightsPage() {
  var ip = document.getElementById('insightsPage');
  if (!ip) return;
  ip.classList.remove('open');
  var sy=parseInt(document.body.getAttribute('data-scroll-y')||'0',10);
  mgUnlock('panel');
   mgUnlock('modal');
  window.scrollTo(0,sy);
}

/* ─── ARTICLES DATA ─── */
const ARTICLES = [
  {
    id: 1,
    tag: 'Market Update — March 2025',
    title: 'Phuket Luxury Villa Market: A Record Year in Review',
    meta: 'MGROUP Research · March 2025 · 8 min read',
    cover: '<svg class="mgi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20c1.6 0 1.6 1.2 3.2 1.2S6.8 20 8.4 20s1.6 1.2 3.2 1.2S13.2 20 14.8 20s1.6 1.2 3.2 1.2"/><path d="M12 20V9"/><path d="M12 9c-3 0-5 1.5-6 3 3-1 5-1 6 0zM12 9c3 0 5 1.5 6 3-3-1-5-1-6 0z"/></svg>',
    author: { name: 'MGROUP Research Team', role: 'Market Intelligence · MGROUP Estates', avatar: '📊' },
    content: `
      <p>Demand for branded residences reached an all-time high in 2024 as international buyers returned to Thailand in record numbers. Prices across Bangtao, Laguna and Naiharn rose 14–22% year-on-year, driven by supply constraints and renewed appetite from European and Middle Eastern buyers.</p>
      <h3>Transaction Volume Surge</h3>
      <p>Transaction volumes in the ฿20M–80M segment surpassed pre-pandemic levels for the first time, with branded residences — Banyan Tree, The Standard, Anantara — commanding a 25–40% premium over standalone villas. Our analysis suggests this premium is sustainable, supported by guaranteed rental programmes and brand loyalty among repeat buyers.</p>
      <blockquote>"The 2024 market confirmed what we have long argued: Phuket's branded segment is structurally undersupplied relative to demand, and this dynamic is unlikely to reverse in the near term."</blockquote>
      <h3>Micro-Market Leaders</h3>
      <p>Laguna and Layan emerged as the strongest micro-markets, driven by infrastructure investment — including the expanded Laguna Golf Course precinct, new BeachClub access roads, and improved connectivity to Phuket International Airport. Land availability in these zones is now critically constrained, with fewer than 12 development-ready plots remaining in Layan's premium tier.</p>
      <ul>
        <li>Bangtao / Laguna: +18% average price appreciation year-on-year</li>
        <li>Naiharn / Rawai: +14% — driven by long-stay and wellness buyers</li>
        <li>Kamala / Surin: +22% — supply shortage intensifying</li>
      </ul>
      <h3>2025 Outlook</h3>
      <p>Looking ahead, we anticipate continued price appreciation of 8–12% in prime locations. The pipeline of new branded launches — Rosewood, Six Senses, and Mandarin Oriental are all confirmed for 2025–2027 delivery — will add prestige supply but is unlikely to outpace demand from Southeast Asian, European and Middle Eastern buyers who now account for over 60% of transactions above ฿30M.</p>
      <p>Our recommendation: buyers considering entry into the Laguna–Layan corridor should act within the next 12–18 months before the next price step-change, likely triggered by the Six Senses launch.</p>
    `
  },
  {
    id: 2,
    tag: 'Investment',
    title: 'Why Thai Freehold Condos Remain a Safe Bet in 2025',
    meta: 'MGROUP Research · February 2025 · 5 min read',
    cover: '🏢',
    author: { name: 'MGROUP Research Team', role: 'Market Intelligence · MGROUP Estates', avatar: '📊' },
    content: `
      <p>With rental yields averaging 6–9% in prime Phuket locations, condo investments continue to outperform regional alternatives across Southeast Asia. The combination of genuine freehold title, a deep rental market, and transparent legal structures makes Thailand — and Phuket in particular — one of the most accessible luxury property markets for international buyers.</p>
      <h3>The Freehold Advantage</h3>
      <p>Unlike leasehold structures common in Bali (Indonesia) and Vietnam — where buyers are purchasing a time-limited right to occupy rather than true ownership — Thai freehold condominiums offer full registered title under the Thai Condominium Act. This is recorded with the Land Department and provides genuine long-term wealth preservation.</p>
      <blockquote>"Freehold title in a stable legal framework is non-negotiable for wealth preservation. Thailand delivers this for foreign buyers in the condo segment — a rarity in Southeast Asia."</blockquote>
      <h3>Foreign Quota Scarcity</h3>
      <p>Thai law limits foreign freehold ownership to 49% of total units in any condominium building. In popular developments with strong resale track records, this quota is frequently sold out — creating genuine secondary market scarcity. In Surin, Kamala and Bang Tao, secondary market resale premiums of 15–30% above original purchase price are common within 3–5 years.</p>
      <h3>Yield Performance</h3>
      <ul>
        <li>Studio / 1-bedroom condos: 7–9% gross yield in high-season markets</li>
        <li>2-bedroom pool condos: 6–8% gross yield with higher occupancy stability</li>
        <li>3-bedroom+ penthouses: 5–7% yield with strong capital appreciation</li>
      </ul>
      <p>Net yields after management fees typically fall in the 4–6% range, still highly competitive versus European or Australian property investments. The MGROUP team can connect buyers with professionally managed rental programmes across our condo portfolio.</p>
    `
  },
  {
    id: 3,
    tag: 'Legal Guide',
    title: 'Foreign Ownership in Thailand: What Changed in 2025',
    meta: 'MGROUP Legal Desk · January 2025 · 6 min read',
    cover: '⚖',
    author: { name: 'MGROUP Legal Desk', role: 'Property Law Advisory · MGROUP Estates', avatar: '⚖' },
    content: `
      <p>A landmark amendment to the Land Code Act, effective January 2025, introduced the Long-Term Resident (LTR) visa pathway — allowing qualifying foreigners to hold up to 1 rai of residential land in designated zones. While limited in scope, this represents the most significant shift in Thai property law in two decades.</p>
      <h3>The LTR Land Ownership Pathway</h3>
      <p>Under the new LTR regulations, foreign nationals who hold an LTR visa and invest a minimum of ฿40 million in qualifying Thai assets (including real estate, government bonds, or BOI-approved businesses) may apply to own up to 1 rai (1,600 sqm) of residential land in Bangkok Metropolitan Region or other designated economic zones.</p>
      <blockquote>"The LTR pathway is the most meaningful structural change to foreign property rights in Thailand since the Condominium Act. It remains narrow in scope but signals a direction of travel."</blockquote>
      <h3>Thai Company Structures: Simplified</h3>
      <p>Beyond the LTR pathway, the Foreign Business Act amendments also simplified Thai company structures used for villa ownership. Key changes include:</p>
      <ul>
        <li>Reduced minimum Thai shareholder requirements for non-restricted businesses</li>
        <li>Cleaner governance frameworks with improved foreign director rights</li>
        <li>Streamlined annual reporting for property-holding companies</li>
      </ul>
      <h3>What Hasn't Changed</h3>
      <p>Foreign freehold condominium ownership (49% quota) remains the clearest and simplest path for most buyers. Villa ownership through long-term leasehold (30+30+30 years) remains widely used and legally sound when structured correctly. Our recommended legal partners can advise on the optimal structure for your specific situation — please contact us for an introduction.</p>
    `
  },
  {
    id: 4,
    tag: 'Neighbourhood Guide',
    title: "Kohkaew & Koh Sirey: Phuket's Rising Residential Corridor",
    meta: 'MGROUP Research · December 2024 · 4 min read',
    cover: '🗺',
    author: { name: 'MGROUP Research Team', role: 'Market Intelligence · MGROUP Estates', avatar: '📊' },
    content: `
      <p>Increasingly popular with families and long-stay residents, the Kohkaew and Koh Sirey corridor offers an emerging alternative to the crowded west coast — with access to UWC Thailand, HeadStart and Garden International schools, proximity to Central Floresta, and substantially larger land parcels at a relative discount to Bangtao or Surin.</p>
      <h3>The Education Premium</h3>
      <p>The concentration of Phuket's top international schools — UWC Thailand (world-ranked), HeadStart International, Garden International and British International School — within a 10-minute radius of Kohkaew makes this corridor uniquely valuable for families with school-age children. This demographic drives stable, multi-year rental demand that is largely insulated from the short-term tourism cycle.</p>
      <h3>Infrastructure Catalysts</h3>
      <p>Infrastructure investment from Phuket City Municipality is expected to be a significant price catalyst over the 2025–2028 horizon:</p>
      <ul>
        <li>New ring road connecting Kohkaew to Bypass Road — reducing commute times to Patong/Kata by 20 minutes</li>
        <li>Marina expansion at Koh Sirey — adding premium waterfront amenity</li>
        <li>Central Floresta and Boat Avenue retail corridor expansion</li>
      </ul>
      <blockquote>"Families priced out of Laguna are discovering that Kohkaew offers similar school access and a comparable lifestyle at 30–40% lower land cost. That gap will not persist."</blockquote>
      <h3>Investment Perspective</h3>
      <p>Current land prices in Kohkaew run approximately ฿15M–30M per rai for prime residential plots — 35–45% below equivalent Bangtao / Laguna land. With the school premium and infrastructure investment, our 5-year appreciation forecast is 18–28% for well-located plots and completed villas in this corridor.</p>
    `
  },
  {
    id: 5,
    tag: 'Wellness & Lifestyle',
    title: 'The Wellness Property Trend Reshaping Phuket Luxury',
    meta: 'MGROUP Research · November 2024 · 5 min read',
    cover: '🧘',
    author: { name: 'MGROUP Research Team', role: 'Market Intelligence · MGROUP Estates', avatar: '📊' },
    content: `
      <p>From RAKxa Integrative Wellness to Kamalaya and Layan Life, wellness-integrated developments are redefining what buyers expect from a luxury property — moving beyond pools and gyms toward biophilic design, sleep science, longevity programming and nutrition-led living.</p>
      <h3>The Wellness Premium</h3>
      <p>Properties within 500m of a tier-1 wellness resort now command a 12–18% premium versus comparable non-wellness-adjacent stock in the same price band. This premium has widened from approximately 8% in 2020, reflecting the post-pandemic re-prioritisation of health, environment and lifestyle quality among high-net-worth buyers.</p>
      <blockquote>"Post-pandemic buyers are not just buying a property — they are buying a lifestyle operating system. Wellness proximity has become a fundamental criterion, not a nice-to-have."</blockquote>
      <h3>Developer Response</h3>
      <p>Major developers are responding with dedicated wellness villa clusters and integrated programming:</p>
      <ul>
        <li><strong>Banyan Tree Wellbeing Sanctuary Laguna</strong> — 50-villa wellness-dedicated cluster with Banyan Tree Spa access</li>
        <li><strong>Tri Vananda by Montara</strong> — Thailand's first dedicated wellness residential community, anchored by RAKxa</li>
        <li><strong>Layan Life by Sansiri</strong> — biophilic design standards with longevity-focused facilities</li>
      </ul>
      <h3>Investment Implications</h3>
      <p>Wellness-adjacent properties also demonstrate stronger rental yield stability — the wellness tourism segment maintains higher average daily rates and longer average stays than leisure tourism, translating to more predictable rental income streams. For investors seeking yield with appreciation, the wellness corridor in northern Phuket (Layan, Bang Tao) represents a compelling combination of both drivers.</p>
    `
  },
  {
    id: 6,
    tag: 'Branded Residences',
    title: 'The Standard, Anantara, Banyan Tree: Does the Brand Premium Last?',
    meta: 'MGROUP Research · October 2024 · 7 min read',
    cover: '🏨',
    author: { name: 'MGROUP Research Team', role: 'Market Intelligence · MGROUP Estates', avatar: '📊' },
    content: `
      <p>Do branded residences truly command a sustainable premium over non-branded alternatives? Our 12-development dataset spanning 2018–2024 shows average resale premiums of 22–38% for tier-1 branded stock — with The Standard Residences Bangtao and Banyan Tree Laguna outperforming the cohort.</p>
      <h3>The Data</h3>
      <p>Across 847 completed transactions in our dataset, branded residences demonstrated:</p>
      <ul>
        <li>22–38% average resale premium over comparable non-branded stock within same micro-market</li>
        <li>Lower average days-on-market: 42 days vs. 78 days for non-branded equivalent</li>
        <li>More stable pricing through market cycles — branded stock showed less than half the price volatility of non-branded during 2020–2021</li>
      </ul>
      <blockquote>"Brand premium in Phuket is not just a marketing phenomenon — it is structurally supported by rental guarantee programmes, international recognition, and the management quality that institutional buyers require."</blockquote>
      <h3>Why the Premium Persists</h3>
      <p>Four structural factors support durability of the branded premium:</p>
      <ul>
        <li><strong>Rental guarantees:</strong> Most tier-1 brands offer 5–8% net yield guarantees for 3–5 years, providing income certainty that non-branded villas cannot match</li>
        <li><strong>International recognition:</strong> A Banyan Tree or Anantara address is understood by buyers globally — reducing friction in secondary market sales</li>
        <li><strong>Management quality:</strong> Resort-standard property management maintains physical condition and market positioning over time</li>
        <li><strong>Facilities access:</strong> Buyers purchase access to resort pools, F&B, spa and concierge — a lifestyle value that compounds over time</li>
      </ul>
      <h3>Our View</h3>
      <p>The branded premium is most durable in the ฿20M–60M price band, where buyer profiles overlap between lifestyle and investment motivations. Above ฿80M, ultra-prime bespoke villas in exclusive locations can outperform branded stock on pure capital appreciation. Below ฿15M, branded condominiums in secondary locations face more competitive pressure from non-branded equivalents. Within MGROUP's curated portfolio, we focus branded recommendations on the ฿20M–60M sweet spot.</p>
    `
  },
  {
    id: 7,
    tag: 'Market Update',
    title: 'Thailand Property Market Outlook 2025: Analysts Forecast Continued Growth',
    meta: 'Bangkok Post · March 2025',
    source: { name: 'Bangkok Post', url: 'https://www.bangkokpost.com' }
  },
  {
    id: 8,
    tag: 'Investment',
    title: 'Phuket Condo Sales Hit 5-Year High as Foreign Buyers Return',
    meta: 'The Nation Thailand · February 2025',
    source: { name: 'The Nation Thailand', url: 'https://www.nationthailand.com' }
  }
];

// Move insArticlePanel to body level so position:fixed works correctly
document.addEventListener('DOMContentLoaded', function() {
  var panel = document.getElementById('insArticlePanel');
  if (panel && panel.parentElement.id === 'insightsPage') {
    document.body.appendChild(panel);
  }
});

function openArticle(id) {
  const a = ARTICLES.find(x => x.id === id);
  if (!a) return;
  document.getElementById('artTag').textContent = a.tag;
  document.getElementById('artTitle').textContent = a.title;
  document.getElementById('artMeta').textContent = a.meta;
  document.getElementById('artCover').textContent = a.cover || '';
  document.getElementById('artContent').innerHTML = a.content || '';
  const authorEl = document.getElementById('artAuthor');
  if (a.author) {
    authorEl.innerHTML = '<span class="art-author-avatar">' + (a.author.avatar||'✍') + '</span><div><div class="art-author-name">' + a.author.name + '</div><div class="art-author-role">' + (a.author.role||'') + '</div></div>';
    authorEl.style.display = 'flex';
  } else {
    authorEl.style.display = 'none';
  }
  const srcEl = document.getElementById('artSourceWidget');
  if (a.source) {
    srcEl.innerHTML = '<div class="art-source-inner"><div class="art-source-label">บทความนี้เผยแพร่โดย</div><div class="art-source-name">' + a.source.name + '</div><a class="art-source-link" href="' + a.source.url + '" target="_blank" rel="noopener">อ่านบทความต้นฉบับ <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a></div>';
    srcEl.style.display = 'block';
    document.getElementById('artCover').textContent = '';
    document.getElementById('artCover').style.display = 'none';
    document.getElementById('artContent').innerHTML = '';
    document.getElementById('artContent').style.display = 'none';
  } else {
    srcEl.style.display = 'none';
    document.getElementById('artCover').style.display = '';
    document.getElementById('artContent').style.display = '';
  }
  var panel = document.getElementById('insArticlePanel');
  panel.classList.add('open');
  panel.scrollTop = 0;
  var ip = document.getElementById('insightsPage');
  if (ip) ip.style.overflow = 'hidden';
}

function closeArticle() {
  document.getElementById('insArticlePanel')?.classList.remove('open');
  var ip = document.getElementById('insightsPage');
  if (ip) ip.style.overflow = '';
}

/* ── Privacy & Cookie Policy Modals ──────────────────────── */
function openPrivacy() { document.getElementById('privacyModal')?.classList.add('open'); mgLock('modal'); }
function closePrivacy() { document.getElementById('privacyModal')?.classList.remove('open'); mgUnlock('modal'); }
function openCookie() { document.getElementById('cookieModal')?.classList.add('open'); mgLock('modal'); }
function closeCookie() { document.getElementById('cookieModal')?.classList.remove('open'); mgUnlock('modal'); }

/* ── Contact Form → send to contact@mgroupestates.com via Formsubmit ── */
function sendContactForm(e) {
  e.preventDefault();
  var form = document.getElementById('contactForm');
  var btn = document.getElementById('contactSubmitBtn');
  var firstName = form.first_name.value.trim();
  var lastName = form.last_name.value.trim();
  var phone = form.phone.value.trim();
  var email = form.email.value.trim();
  var role = form.role.value;
  var message = form.message.value.trim();

  if (!firstName || !email || !message) {
    alert('Please fill in at least your first name, email, and message.');
    return false;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Save to Supabase
  fetch(SB_URL + '/rest/v1/enquiries', {
    method: 'POST',
    headers: { 'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ first_name: firstName, last_name: lastName, phone: phone, email: email, role: role, message: message, source: 'contact_form' })
  }).catch(function(){});

  // Send email via FormSubmit
  var data = new FormData();
  data.append('First Name', firstName);
  data.append('Last Name', lastName);
  data.append('Phone', phone);
  data.append('Email', email);
  data.append('Role', role);
  data.append('Message', message);
  data.append('_subject', 'New Enquiry from ' + firstName + ' ' + lastName + ' \u2014 MGROUP Estates');
  data.append('_captcha', 'false');
  data.append('_template', 'table');

  fetch('https://formsubmit.co/ajax/contact@mgroupestates.com', {
    method: 'POST',
    body: data
  })
  .then(function(res) { return res.json(); })
  .then(function(result) {
    if (result.success) {
      btn.textContent = 'Sent Successfully!';
      btn.style.background = '#2d6a4f';
      form.reset();
      setTimeout(function() { btn.textContent = 'Send Enquiry'; btn.style.background = ''; btn.disabled = false; }, 3000);
    } else { throw new Error('Send failed'); }
  })
  .catch(function() {
    btn.textContent = 'Send Enquiry'; btn.disabled = false;
    var subject = encodeURIComponent('Enquiry from ' + firstName + ' ' + lastName);
    var body = encodeURIComponent('Name: ' + firstName + ' ' + lastName + '\nPhone: ' + phone + '\nEmail: ' + email + '\nRole: ' + role + '\n\nMessage:\n' + message);
    window.location.href = 'mailto:contact@mgroupestates.com?subject=' + subject + '&body=' + body;
  });

  return false;
}



/* ═══ Override selectUnit to show clearer Bedrooms/Bathrooms ═══ */
(function() {
  if (typeof window.selectUnit !== 'function') return;
  var _origSelect = window.selectUnit;
  window.selectUnit = function(unitId) {
    _origSelect(unitId);
    // After original render, reformat the meta line
    setTimeout(function() {
      var panel = document.getElementById('detUnitPanel');
      if (!panel) return;
      var meta = panel.querySelector('.det-unit-meta');
      if (!meta) return;
      var sqm = meta.querySelector('.um-sqm');
      var br  = meta.querySelector('.um-br');
      var ba  = meta.querySelector('.um-ba');
      var pr  = meta.querySelector('.um-price');
      var sqmT = sqm ? sqm.textContent.trim() : '—';
      var brT  = br  ? br.textContent.trim()  : '—';
      var baT  = ba  ? ba.textContent.trim()  : '—';
      var prT  = pr  ? pr.textContent.trim()  : '';
      var html =
        '<span class="um-sqm">' + sqmT + '</span>' +
        '<span class="um-sep">•</span>' +
        '<span class="um-br">' + brT + '</span><span class="um-label"> Bedrooms</span>' +
        '<span class="um-sep">•</span>' +
        '<span class="um-ba">' + baT + '</span><span class="um-label"> Bathrooms</span>' +
        (prT && prT !== '—' ? '<span class="um-sep">•</span><span class="um-price">' + prT + '</span>' : '');
      meta.innerHTML = html;
    }, 0);
  };
})();


/* ═══════════════════════════════════════════════════════════
   PD AUTO-INIT — ensure any property_id from DB has a PD entry
   (fixes images not loading for new listings beyond hardcoded PD)
═══════════════════════════════════════════════════════════ */
(function() {
  if (typeof window.loadPropertyMedia !== 'function') return;
  var _orig = window.loadPropertyMedia;
  window.loadPropertyMedia = async function() {
    try {
      if (typeof mgRestUrl === 'function' && typeof mgAnonKey === 'function') {
        var base = mgRestUrl();
        var key  = mgAnonKey();
        if (base && key && typeof PD === 'object') {
          // Fetch all active properties and ensure PD has entry
          var r = await fetch(base + '/rest/v1/properties?select=id,price_usd&is_active=eq.true', {
            headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
          });
          if (r.ok) {
            var props = await r.json();
            (Array.isArray(props) ? props : []).forEach(function(p) {
              var pid = p.id;
              if (!PD[pid]) {
                PD[pid] = {
                  images: [],
                  usd: p.price_usd || '',
                  yield: '',
                  pool: '',
                  floorplans: [],
                  highlights: [],
                  desc: '',
                  feats: [],
                  details: [],
                  finance: [],
                  nearby: []
                };
              }
            });
            console.log('MGROUP: PD auto-init for ' + props.length + ' properties');
          }
        }
      }
    } catch (e) {
      console.warn('PD auto-init failed:', e.message);
    }
    return _orig.apply(this, arguments);
  };
})();



/* ═══════════════════════════════════════════════════════════
   COVER IMAGES FROM DB v2 — robust + re-apply on every render
═══════════════════════════════════════════════════════════ */
(function() {
  var coverByPid = null;
  var fetching = false;

  async function fetchCovers() {
    if (fetching || coverByPid) return coverByPid;
    fetching = true;
    try {
      if (typeof mgRestUrl !== 'function') return null;
      var base = mgRestUrl(); var key = mgAnonKey();
      if (!base || !key) return null;
      var r = await fetch(base + "/rest/v1/property_images?image_type=eq.project&order=property_id.asc,is_hero.desc,sort_order.asc", {
        headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
      });
      if (!r.ok) return null;
      var rows = await r.json();
      var map = {};
      (Array.isArray(rows) ? rows : []).forEach(function(row) {
        if (!map[row.property_id]) map[row.property_id] = row.url;
      });
      coverByPid = map;
      console.log('MGROUP: Cover images cached for ' + Object.keys(map).length + ' properties');
      return coverByPid;
    } catch (e) {
      console.warn('Cover fetch failed:', e.message);
      return null;
    } finally {
      fetching = false;
    }
  }

  function applyCovers() {
    if (!coverByPid || !Array.isArray(window.PROPS)) return;
    var patched = 0;
    PROPS.forEach(function(p) {
      if (coverByPid[p.id] && p.img !== coverByPid[p.id]) {
        p.img = coverByPid[p.id];
        patched++;
      }
    });
    if (patched > 0) {
      console.log('MGROUP: Patched ' + patched + ' covers');
      if (typeof renderGrid === 'function') renderGrid();
      if (typeof renderInvSlider === 'function') renderInvSlider();
    }
  }

  // Hook into renderGrid: before render, ensure covers applied
  function hookRender() {
    if (typeof window.renderGrid !== 'function') return false;
    if (window._coversHooked) return true;
    var _origGrid = window.renderGrid;
    window.renderGrid = function() {
      applyCovers();
      return _origGrid.apply(this, arguments);
    };
    if (typeof window.renderInvSlider === 'function') {
      var _origSlider = window.renderInvSlider;
      window.renderInvSlider = function() {
        applyCovers();
        return _origSlider.apply(this, arguments);
      };
    }
    window._coversHooked = true;
    console.log('MGROUP: Render functions hooked');
    return true;
  }

  // Main run
  async function run() {
    await fetchCovers();
    hookRender();
    // Apply immediately if PROPS already loaded
    if (Array.isArray(window.PROPS) && window.PROPS.length) {
      applyCovers();
    }
  }

  // Run early + retry
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
  // Safety retry after 2s
  setTimeout(run, 2000);
})();


/* ═══════════════════════════════════════════════════════════
   GALLERY FIX — replace loadPropertyMedia to always create
   PD entries before merging (fixes new listings gallery)
═══════════════════════════════════════════════════════════ */
(function() {
  window.loadPropertyMedia = async function loadPropertyMedia() {
    if (typeof mgRestUrl !== 'function') return;
    var base = mgRestUrl(); var key = mgAnonKey();
    if (!base || !key) return;
    if (typeof PD !== 'object') return;
    try {
      // Fetch all project images sorted
      var resp = await fetch(base + '/rest/v1/property_images?image_type=eq.project&order=property_id.asc,is_hero.desc,sort_order.asc', {
        headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
      });
      if (!resp.ok) return;
      var data = await resp.json();
      if (!Array.isArray(data)) return;

      // Group by property_id
      var imgMap = {};
      data.forEach(function(row) {
        var pid = row.property_id;
        if (!imgMap[pid]) imgMap[pid] = [];
        imgMap[pid].push(row.url);
      });

      // Merge into PD — AUTO-CREATE PD entry if missing
      var count = 0;
      Object.keys(imgMap).forEach(function(pid) {
        if (!PD[pid]) {
          // Bootstrap new PD entry with default shape
          PD[pid] = {
            images: [],
            usd: '',
            yield: '',
            pool: '',
            floorplans: [],
            highlights: [],
            desc: '',
            feats: [],
            details: [],
            finance: [],
            nearby: []
          };
        }
        PD[pid].images = imgMap[pid];
        count++;
      });
      console.log('MGROUP: Gallery loaded for ' + count + ' properties (with auto PD init)');

      // Also fetch videos
      var vResp = await fetch(base + '/rest/v1/property_videos?order=sort_order.asc', {
        headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
      });
      if (vResp.ok) {
        var vids = await vResp.json();
        var videoByProp = {};
        (Array.isArray(vids) ? vids : []).forEach(function(v) {
          if (!videoByProp[v.property_id]) videoByProp[v.property_id] = v.url;
        });
        Object.keys(videoByProp).forEach(function(pid) {
          if (!PD[pid]) PD[pid] = { images: [], video: videoByProp[pid] };
          else PD[pid].video = videoByProp[pid];
        });
      }
    } catch (e) {
      console.warn('Gallery load failed:', e.message);
    }
  };
  console.log('MGROUP: loadPropertyMedia replaced with gallery fix');
})();


/* ═══════════════════════════════════════════════════════════
   OPENDETAIL GALLERY FIX — fetch images from DB on-demand
   (not rely on PD being ready)
═══════════════════════════════════════════════════════════ */
(function() {
  if (typeof window.openDetail !== 'function') return;
  var _orig = window.openDetail;
  window.openDetail = async function(id) {
    // Fetch project images from DB directly
    try {
      if (typeof mgRestUrl === 'function' && typeof mgAnonKey === 'function') {
        var base = mgRestUrl(); var key = mgAnonKey();
        if (base && key) {
          var r = await fetch(base + "/rest/v1/property_images?property_id=eq." + id + "&image_type=eq.project&order=is_hero.desc,sort_order.asc", {
            headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
          });
          if (r.ok) {
            var rows = await r.json();
            if (Array.isArray(rows) && rows.length) {
              var urls = rows.map(function(x){ return x.url; });
              // Ensure PD entry exists + set images
              if (typeof PD === 'object') {
                if (!PD[id]) {
                  PD[id] = { images: urls, usd:'', yield:'', pool:'', floorplans:[], highlights:[], desc:'', feats:[], details:[], finance:[], nearby:[] };
                } else {
                  PD[id].images = urls;
                }
              }
              console.log('MGROUP: Pre-loaded ' + urls.length + ' gallery images for id=' + id);
            }
          }
          // Also fetch video
          var vr = await fetch(base + "/rest/v1/property_videos?property_id=eq." + id + "&order=sort_order.asc&limit=1", {
            headers: { 'apikey': key, 'Authorization': 'Bearer ' + key }
          });
          if (vr.ok) {
            var vids = await vr.json();
            if (Array.isArray(vids) && vids.length && typeof PD === 'object') {
              if (!PD[id]) PD[id] = { images:[] };
              PD[id].video = vids[0].url;
            }
          }
        }
      }
    } catch (e) { console.warn('openDetail pre-fetch failed:', e.message); }
    return _orig.apply(this, arguments);
  };
  console.log('MGROUP: openDetail wrapped with DB pre-fetch');
})();


/* ═══════════════════════════════════════════════════════════
   MOVE VIDEO TOUR — place right after Property Description
═══════════════════════════════════════════════════════════ */
(function() {
  function moveVideoSection() {
    var video = document.getElementById('detVideoSection');
    var desc = document.getElementById('detDesc');
    if (!video || !desc) return;
    var descSection = desc.closest('.det-open-section');
    if (!descSection || !descSection.parentNode) return;
    // Insert video right after description
    if (descSection.nextSibling !== video) {
      descSection.parentNode.insertBefore(video, descSection.nextSibling);
    }
  }
  // Run on DOM ready + hook openDetail
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', moveVideoSection);
  } else {
    moveVideoSection();
  }
  // Also run after openDetail renders
  if (typeof window.openDetail === 'function') {
    var _o = window.openDetail;
    window.openDetail = async function() {
      var r = await _o.apply(this, arguments);
      setTimeout(moveVideoSection, 100);
      return r;
    };
  }
  console.log('MGROUP: Video section moved below Description');
})();


/* ═══════════════════════════════════════════════════════════
   VIDEO RENDER PATCH — support YouTube + direct .mp4
═══════════════════════════════════════════════════════════ */
(function() {
  window.renderPropertyVideo = function(video) {
    var section = document.getElementById('detVideoSection');
    var wrap = document.getElementById('detVideoWrap');
    if (!section || !wrap) return;
    if (!video || !video.url) { section.style.display = 'none'; wrap.innerHTML = ''; return; }
    var url = String(video.url);
    // Check YouTube first
    var yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (yt) {
      section.style.display = '';
      wrap.innerHTML = '<iframe src="https://www.youtube.com/embed/' + yt[1] + '" title="Property Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
      return;
    }
    // Check Vimeo
    var vm = url.match(/vimeo\.com\/(\d+)/);
    if (vm) {
      section.style.display = '';
      wrap.innerHTML = '<iframe src="https://player.vimeo.com/video/' + vm[1] + '" title="Property Video" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
      return;
    }
    // Check direct video file (.mp4, .webm, .mov)
    if (url.match(/\.(mp4|webm|mov|m4v)(\?|$)/i) || video.video_type === 'mp4') {
      section.style.display = '';
      wrap.innerHTML = '<video controls preload="metadata" style="width:100%;height:100%;background:#000;" playsinline>' +
        '<source src="' + url + '" type="video/mp4">' +
        'Your browser does not support the video tag.' +
        '</video>';
      return;
    }
    section.style.display = 'none';
    wrap.innerHTML = '';
  };
  console.log('MGROUP: renderPropertyVideo patched — supports YouTube/Vimeo/MP4');
})();


;/* ── MULTI-PAGE NAV OVERRIDES (site split) ─────────────────────
   Panels are now real pages. Every legacy open/close function now
   navigates, so all existing onclick= call sites keep working. */
function _nav(u,e){ if(e&&e.preventDefault)e.preventDefault(); window.location.href=u; }
function goHome(e){ _nav('index.html',e); }
function goBack(e){ _nav('index.html',e); }
function goCollections(e){ _nav('collections.html',e); }
function goCollAll(e){ _nav('collections.html',e); }
function goRent(e){ _nav('https://rent.mgroupestates.com',e); }
function openInsightsPage(e){ _nav('insights.html',e); }
function closeInsightsPage(e){ _nav('index.html',e); }
function openProcessPage(e){ _nav('how-to-buy.html',e); }
function closeProcessPage(e){ _nav('index.html',e); }
function goContact(e){ _nav('contact.html',e); }
function goWellness(e){ _nav('lifestyle.html',e); }
function closeCollHub(e){ _nav('index.html',e); }

/* per-page init */
document.addEventListener('DOMContentLoaded', function(){
  var page = document.body.getAttribute('data-page') || '';
  if (page === 'collections') {
    try { if (typeof renderGrid === 'function') renderGrid(); } catch(e){ console.warn(e); }
    try { if (typeof loadHubData === 'function') loadHubData(); } catch(e){ console.warn(e); }
    try {
      var coll = new URLSearchParams(location.search).get('coll');
      if (coll && typeof openCollFromHub === 'function') {
        var names = {exclusive:'Exclusive Listings',beachfront:'Beachfront',branded:'Branded Residences',
                     seaview:'Sea View',wellness:'Wellness',lakeview:'Lake View',investment:'Investment',
                     school:'Near Schools',mountain:'Mountain View'};
        openCollFromHub(coll, names[coll] || coll);
      }
    } catch(e){ console.warn(e); }
  }
});

;/* ── services carousel ─────────────────────────────────────── */
function svcSlide(dir){
  var rail=document.getElementById('svcRail'); if(!rail) return;
  var card=rail.querySelector('.svc3-card'); if(!card) return;
  var gap  = parseFloat(getComputedStyle(rail).gap) || 18;
  var step = card.getBoundingClientRect().width + gap;
  var max  = Math.max(0, rail.scrollWidth - rail.clientWidth);
  var at   = rail.scrollLeft;
  /* wrap at the ends so the rail keeps cycling instead of dead-ending
     on the last card — the same behaviour as the Similar rail */
  var next = dir > 0
    ? (at >= max - 4 ? 0 : Math.min(at + step, max))
    : (at <= 4 ? max : Math.max(at - step, 0));
  rail.scrollTo({left:next,behavior:'smooth'});
}

;/* ── Home quick enquiry form ────────────────────────────────────
   Same two destinations as the contact page: a row in Supabase
   (`enquiries`) so nothing is ever lost, plus a real email through
   FormSubmit. Column names must match the table exactly — an earlier
   version posted first_name/last_name/role, which do not exist, and
   every enquiry was silently dropped. */
function sendQuickForm(e){
  e.preventDefault();
  var f=document.getElementById('quickForm'), b=document.getElementById('quickSubmit');
  var name=f.name.value.trim(), email=f.email.value.trim(),
      phone=f.phone.value.trim(), msg=f.message.value.trim();
  if(!name||!email||!msg){ alert('Please fill in your name, email and message.'); return false; }
  b.textContent='Sending\u2026'; b.disabled=true;

  try{
    fetch(SB_URL+'/rest/v1/enquiries',{method:'POST',
      headers:{'apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY,'Content-Type':'application/json'},
      body:JSON.stringify({name:name,email:email,phone:phone,message:msg,
                           enquiry_type:'General',source:'home_quick_form',status:'new'})
    }).then(function(r){ if(!r.ok) r.text().then(function(t){ console.error('Supabase enquiry insert failed:',r.status,t); }); })
      .catch(function(err){ console.error('Supabase enquiry insert error:',err); });
  }catch(err){ console.error(err); }

  var d=new FormData();
  d.append('Name',name); d.append('Email',email); d.append('Phone',phone); d.append('Message',msg);
  d.append('_subject','New Enquiry from '+name+' \u2014 MGROUP Estates (home form)');
  d.append('_captcha','false'); d.append('_template','table');
  fetch('https://formsubmit.co/ajax/contact@mgroupestates.com',{method:'POST',body:d})
    .then(function(r){return r.json();})
    .catch(function(){})
    .finally(function(){
      f.hidden=true;
      var ok=document.getElementById('quickOk');
      if(ok){ ok.hidden=false; ok.scrollIntoView({behavior:'smooth',block:'center'}); }
    });
  return false;
}

;/* ── How to Buy: transfer cost calculator ───────────────────────
   Thai completion costs, in the shape they are actually levied:
     Transfer fee   2%    of appraised value  (customarily split 50/50)
     Specific Business Tax 3.3%  — seller, only if held under 5 years
     Stamp duty     0.5%  — seller, only when SBT does NOT apply
   Withholding tax is deliberately left out: it depends on the seller's
   personal tax position and cannot be derived from the price alone.
   The figure is an estimate — the Land Department bills on its own
   appraised value, not the sale price. */
function calcFees(){
  var priceEl=document.getElementById('calcPrice');
  if(!priceEl) return;
  var raw=priceEl.value.replace(/[^0-9]/g,'');
  if(raw) priceEl.value=Number(raw).toLocaleString('en-US');
  var price=Number(raw||0);
  var out=document.getElementById('calcOut');
  if(!price){ if(out) out.hidden=true; return; }
  out.hidden=false;

  var under5=document.getElementById('calcHold').value==='under5';
  var split=document.getElementById('calcSplit').value;

  var transfer=price*0.02;
  var sbt=under5?price*0.033:0;
  var stamp=under5?0:price*0.005;

  var thb=function(n){return '฿ '+Math.round(n).toLocaleString('en-US');};
  var rows=[
    {l:'Transfer fee',s:'2% — customarily shared',v:thb(transfer),share:'split'},
    under5
      ? {l:'Specific Business Tax',s:'3.3% — seller, held under 5 years',v:thb(sbt),share:'seller'}
      : {l:'Specific Business Tax',s:'Not applicable — held 5 years or more',v:'—',share:'none'},
    under5
      ? {l:'Stamp duty',s:'Not applicable when SBT is charged',v:'—',share:'none'}
      : {l:'Stamp duty',s:'0.5% — seller',v:thb(stamp),share:'seller'}
  ];

  document.getElementById('calcRows').innerHTML=rows.map(function(r){
    return '<div class="calc-row'+(r.share==='none'?' calc-row--none':'')+'">'+
      '<span class="calc-row-label">'+r.l+'<small>'+r.s+'</small></span>'+
      '<span class="calc-row-val">'+r.v+'</span></div>';
  }).join('');

  var total=transfer+sbt+stamp;
  var buyer = split==='buyer' ? total
            : split==='seller' ? 0
            : transfer/2;                 /* 50/50 = buyer takes half the transfer fee only */

  document.getElementById('calcTotal').textContent=thb(total);
  document.getElementById('calcBuyer').textContent=thb(buyer);
}

;/* live counts inside each dropdown option, e.g. "Phuket (17)" */
function updateChipCounts(){
  var props = window.PROPS || (typeof PROPS!=='undefined' ? PROPS : []) || [];
  var put = function(sel, key, values){
    var el = document.getElementById(sel);
    if(!el) return;
    Array.prototype.forEach.call(el.options, function(o){
      var base = o.getAttribute('data-base') || o.textContent.replace(/\s*\(\d+\)$/,'');
      o.setAttribute('data-base', base);
      if(o.value === 'all'){ o.textContent = base + ' (' + props.length + ')'; return; }
      var n = props.filter(function(p){ return p[key] === o.value; }).length;
      o.textContent = base + ' (' + n + ')';
    });
  };
  put('selCity','city');
  put('selType','ptype');
}

;/* Collection filter is a <select> now (was a custom button + menu),
   so it matches the Location / Property Type controls beside it. */
function selectCollFromSelect(el){
  var id = el.value;
  currentColl = id;
  currentBeds = 'all';
  currentBudget = 'all';
  document.querySelectorAll('.filter-chip').forEach(function(c){ c.classList.remove('active'); });
  document.querySelectorAll('.filter-chip:first-of-type').forEach(function(c){ c.classList.add('active'); });
  if (id === 'all' && typeof shuffle === 'function') shuffledAll = shuffle([].concat(PROPS));
  renderGrid();
}

;/* ── property.html: render one listing as a real page ───────────
   The detail used to be an overlay closed with an ✕. It now has its
   own URL so it can be shared, linked and indexed. */
(function(){
  if ((document.body && document.body.getAttribute('data-page')) !== 'property') return;

  function show(id){
    if (typeof openDetail !== 'function') return false;
    /* PROPS is a top-level `let`, so it is not on `window` — read it directly */
    var list = (typeof PROPS !== 'undefined' && PROPS) ? PROPS : [];
    var found = list.some(function(p){ return p.id === id; });
    if (!found) return false;
    openDetail(id);
    var ov = document.getElementById('detOverlay');
    if (ov) ov.classList.add('open');
    document.title = (document.querySelector('.det-title') || {}).textContent
      ? document.querySelector('.det-title').textContent + ' — MGROUP Estates'
      : document.title;
    return true;
  }

  document.addEventListener('DOMContentLoaded', function(){
    var id = parseInt(new URLSearchParams(location.search).get('id'), 10);
    if (!id) { document.getElementById('propMissing').hidden = false; return; }

    /* PROPS arrive from Supabase asynchronously — poll briefly rather
       than racing the fetch, then fall back to the not-found panel. */
    var tries = 0;
    (function attempt(){
      if (show(id)) return;
      if (++tries > 40) {           /* ~6s */
        var ov = document.getElementById('detOverlay');
        if (ov) ov.style.display = 'none';
        document.getElementById('propMissing').hidden = false;
        return;
      }
      setTimeout(attempt, 150);
    })();
  });
})();

;/* ── Property detail: sticky section dropdown ───────────────────
   The section links used to sit in a row that overflowed sideways on
   anything narrower than a desktop, so half the sections were hidden
   behind a scroll nobody noticed. It is one dropdown now: pick a
   section, the page scrolls there. The button always shows the
   section you are currently reading. */
(function(){
  if ((document.body && document.body.getAttribute('data-page')) !== 'property') return;

  var TOP = 112;   /* topbar + the jump bar itself */

  function build(){
    var secs = [].slice.call(document.querySelectorAll('.det-open-section'))
      .filter(function(s){ return getComputedStyle(s).display !== 'none' && s.offsetHeight > 0; });
    var bar = document.getElementById('detJumpInner');
    if (!bar) return;

    var items = [];
    secs.forEach(function(sec, i){
      var t = sec.querySelector('.det-section-title');
      if (!t) return;
      if (!sec.id) sec.id = 'sec-' + String(i + 1).padStart(2, '0');
      items.push({ id: sec.id, label: t.textContent.trim(), el: sec });
    });
    if (!items.length) { bar.innerHTML = ''; return; }

    /* Rebuilding on every mutation would close the menu mid-click, so
       bail out when nothing about the section list actually changed. */
    var sig = items.map(function(o){ return o.id + '|' + o.label; }).join('~');
    if (bar.getAttribute('data-sig') === sig) { spy(items); return; }
    bar.setAttribute('data-sig', sig);

    bar.innerHTML =
      '<div class="det-dd">' +
        '<button type="button" class="det-dd-btn" id="detDdBtn" aria-haspopup="listbox" aria-expanded="false">' +
          '<span class="det-dd-cur" id="detDdCur"></span>' +
          '<svg class="det-dd-chev" viewBox="0 0 24 24" width="14" height="14" fill="none" ' +
            'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
            '<polyline points="6 9 12 15 18 9"></polyline></svg>' +
        '</button>' +
        '<div class="det-dd-menu" id="detDdMenu" role="listbox"></div>' +
      '</div>';

    var menu = document.getElementById('detDdMenu');
    var cur  = document.getElementById('detDdCur');
    var btn  = document.getElementById('detDdBtn');

    items.forEach(function(o){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'det-dd-item';
      b.setAttribute('role', 'option');
      b.setAttribute('data-target', o.id);
      b.textContent = o.label;
      b.addEventListener('click', function(){ close(); jump(o.id); });
      menu.appendChild(b);
    });
    cur.textContent = items[0].label;
    setStep(0, items.length);

    function open(){ bar.classList.add('open');  btn.setAttribute('aria-expanded', 'true');  }
    function close(){ bar.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }

    btn.addEventListener('click', function(e){
      e.stopPropagation();
      bar.classList.contains('open') ? close() : open();
    });
    document.addEventListener('click', function(e){
      if (!bar.contains(e.target)) close();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') close();
    });

    spy(items);
  }

  function setStep(i, total){
    var el = document.getElementById('detDdStep');
    if (el) el.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
  }

  function jump(id){
    var el = document.getElementById(id);
    if (!el) return;
    var y = el.getBoundingClientRect().top + window.pageYOffset - TOP;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }

  /* Scrollspy on a plain scroll listener rather than IntersectionObserver:
     the page already leans on IO for the reveal animation and it is the
     one thing here that silently does nothing when it fails, taking the
     label and the counter with it. Reading positions is cheap enough at
     one rAF per scroll. */
  var spyOff = null;
  function spy(items){
    if (spyOff) { window.removeEventListener('scroll', spyOff); }
    var ticking = false, last = -1;

    function measure(){
      ticking = false;
      var idx = 0;
      for (var i = 0; i < items.length; i++){
        if (items[i].el.getBoundingClientRect().top <= 140) idx = i;
      }
      if (idx === last) return;
      last = idx;
      var cur = document.getElementById('detDdCur');
      if (cur) cur.textContent = items[idx].label;
      setStep(idx, items.length);
      [].forEach.call(document.querySelectorAll('.det-dd-item'), function(b){
        b.classList.toggle('on', b.getAttribute('data-target') === items[idx].id);
      });
    }

    spyOff = function(){
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };
    window.addEventListener('scroll', spyOff, { passive: true });
    measure();
  }

  /* Sections appear as Supabase data lands (video, floor plans, layouts
     each arrive on their own request), so watch for them instead of
     guessing a delay — a fixed timeout kept missing the video tour. */
  document.addEventListener('DOMContentLoaded', function(){
    var t = null;
    var rebuild = function(){ clearTimeout(t); t = setTimeout(build, 250); };
    rebuild();
    if (window.MutationObserver) {
      new MutationObserver(rebuild).observe(document.body, {
        subtree: true, childList: true,
        attributes: true, attributeFilter: ['style', 'class']
      });
    }
    setTimeout(build, 6000);   /* backstop */
  });
})();


;/* ══════════════════════════════════════════════════════════════
   BROCHURE PDF — builds a real .pdf file, one click, no print dialog
   ──────────────────────────────────────────────────────────────
   Text is drawn with jsPDF's vector text API rather than rasterising
   the DOM, so it stays sharp and selectable and the file stays small.
   Only the photos are bitmaps. Falls back to the print dialog if the
   library did not load.
   ══════════════════════════════════════════════════════════════ */

/* jsPDF's built-in fonts are Latin-1 only: ฿, ≈, —, – and ° come out as
   garbage or vanish (7–9% printed as 79%). Fold them to safe equivalents. */
function mgT(v){
  return String(v == null ? '' : v)
    .replace(/฿/g, 'THB ')      /* ฿  */
    .replace(/≈/g, '~')         /* ≈  */
    .replace(/[–—]/g, '-') /* – — */
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/°/g, 'deg')
    .replace(/·/g, '-')
    .replace(/•/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

var MG_BROWN = [51, 41, 31];
var MG_TAUPE = [154, 132, 103];
var MG_MUTED = [107, 90, 71];


/* Gallery thumbs are <div> elements carrying a background-image, not
   <img> tags — querying for images returned nothing and the PDF came
   out with no photos. Read whichever the element actually uses. */

/* ── Right-sized images ─────────────────────────────────────────
   Storage was serving originals: a property page pulled 11 photos at
   full resolution — 5MB, up to 2560x1441 for a card a few hundred
   pixels wide, and the PDF then re-downloaded the same giants. Supabase
   can resize on delivery, so ask for roughly what is actually painted.
   `resize=contain` is not optional: without it only the width is
   applied and the image comes back stretched.
   Non-Supabase URLs (Unsplash fallbacks) pass through untouched. */
function mgImg(url, w, exact){
  var u = String(url || '');
  if (!u) return u;
  var isObj = u.indexOf('/storage/v1/object/public/') !== -1;
  var isRnd = u.indexOf('/storage/v1/render/image/public/') !== -1;
  if (!isObj && !isRnd) return u;                       /* Unsplash etc — leave alone */

  /* Re-ask, never pass through: the PDF reads its photos off the 200px
     thumbnail strip, so keeping an existing width would have printed
     thumbnails. Strip any sizing already on the URL and apply ours. */
  var parts = u.split('?');
  var path  = parts[0].replace('/storage/v1/object/public/', '/storage/v1/render/image/public/');
  var keep  = (parts[1] || '').split('&').filter(function(p){
    return p && !/^(width|height|resize|quality)=/.test(p);
  });
  /* Never ask for more pixels than the screen can show. A phone was
     pulling the 1600px gallery photo for a 375px-wide viewport — four
     times the data for the same picture, which is why images arrived
     late and out of order on a property page. */
  var want = w || 900;
  var px   = want;
  if (!exact) {
    /* `exact` is for the PDF: a brochure is printed, not shown on this
       screen, so the viewport cap must not shrink its photos. */
    var cap = Math.ceil((window.innerWidth || 1440) * (window.devicePixelRatio || 1));
    px = Math.max(200, Math.min(want, cap));
  }

  keep.push('width=' + px, 'resize=contain', 'quality=72');
  return path + '?' + keep.join('&');
}

function mgImgUrl(el){
  if (!el) return null;
  if (el.tagName === 'IMG') return el.currentSrc || el.src || null;
  var bg = getComputedStyle(el).backgroundImage || '';
  var m = bg.match(/url\(["']?([^"')]+)["']?\)/);
  return m ? m[1] : null;
}

function mgLoadImage(url){
  return new Promise(function(resolve){
    if(!url) return resolve(null);
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function(){
      try{
        var cv = document.createElement('canvas');
        var max = 1400;
        var sc = Math.min(1, max / img.naturalWidth);
        cv.width  = Math.round(img.naturalWidth  * sc);
        cv.height = Math.round(img.naturalHeight * sc);
        cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
        resolve({ data: cv.toDataURL('image/jpeg', 0.82), w: cv.width, h: cv.height });
      }catch(e){ resolve(null); }          /* tainted canvas / CORS */
    };
    img.onerror = function(){ resolve(null); };
    img.src = mgImg(url, 1200, true);
  });
}

async function downloadPropertyPDF(){
  var btn = document.querySelector('.pdf-gate-btn');
  var label = btn ? btn.innerHTML : '';
  if (btn){ btn.disabled = true; btn.textContent = 'Preparing…'; }

  try{
    if (!window.jspdf || !window.jspdf.jsPDF) throw new Error('jsPDF unavailable');
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ unit:'mm', format:'a4', compress:true });
    var W = 210, H = 297, M = 16, y = 0;

    var q = function(sel){ var e = document.querySelector(sel); return e ? e.textContent.trim() : ''; };
    var name  = q('.det-title') || 'Property';
    var loc   = q('.det-location');
    var price = q('.det-inline-price-main');
    var usd   = q('.det-inline-price-usd');
    var badge = q('.det-badge');

    /* ── cover image ───────────────────────────────────────── */
    var hero = await mgLoadImage(mgImgUrl(
      document.querySelector('.det-gallery-main img') ||
      document.querySelector('.det-gallery-main')));

    if (hero){
      var ih = Math.min(96, (W * hero.h) / hero.w);
      doc.addImage(hero.data, 'JPEG', 0, 0, W, ih, undefined, 'FAST');
      y = ih + 12;
    } else { y = 24; }

    /* ── title block ───────────────────────────────────────── */
    if (badge){
      doc.setFillColor.apply(doc, MG_BROWN);
      doc.rect(M, y - 5, doc.getTextWidth(mgT(badge)) * 0.36 + 6, 5.6, 'F');
      doc.setFont('helvetica','bold'); doc.setFontSize(6.5); doc.setTextColor(255,255,255);
      doc.text(mgT(badge.toUpperCase()), M + 3, y - 1.2);
      y += 5;
    }
    doc.setFont('times','normal'); doc.setFontSize(26);
    doc.setTextColor.apply(doc, MG_BROWN);
    var nameLines = doc.splitTextToSize(mgT(name), W - M*2);
    doc.text(mgT(nameLines), M, y);
    y += nameLines.length * 9 + 1;

    if (loc){
      doc.setFont('helvetica','normal'); doc.setFontSize(9.5);
      doc.setTextColor.apply(doc, MG_MUTED);
      doc.text(mgT(loc), M, y); y += 8;
    }

    /* ── specs ─────────────────────────────────────────────── */
    var specs = [].slice.call(document.querySelectorAll('.det-spec'))
      .filter(function(s){ return s.offsetHeight > 0; })
      .map(function(s){
        return {
          v: (s.querySelector('.det-spec-val')||{}).textContent || '',
          l: (s.querySelector('.det-spec-lbl')||{}).textContent || ''
        };
      }).filter(function(s){ return s.v && s.v !== '—'; });

    if (specs.length){
      doc.setDrawColor(230, 222, 211); doc.line(M, y, W - M, y); y += 7;
      var cx = M;
      specs.forEach(function(s){
        doc.setFont('helvetica','bold'); doc.setFontSize(12);
        doc.setTextColor.apply(doc, MG_BROWN);
        var vTxt = mgT(s.v);
        doc.text(vTxt, cx, y);
        var vw = doc.getTextWidth(vTxt);            /* measured at 12pt */
        doc.setFont('helvetica','normal'); doc.setFontSize(7);
        doc.setTextColor.apply(doc, MG_TAUPE);
        var lTxt = mgT(s.l).toUpperCase();
        doc.text(lTxt, cx + vw + 2, y);
        cx += vw + doc.getTextWidth(lTxt) + 10;     /* and this at 7pt */
      });
      y += 7;
      doc.setDrawColor(230, 222, 211); doc.line(M, y, W - M, y); y += 10;
    }

    /* ── price ─────────────────────────────────────────────── */
    if (price){
      doc.setFont('helvetica','normal'); doc.setFontSize(7.5);
      doc.setTextColor.apply(doc, MG_TAUPE);
      doc.text(mgT('ASKING PRICE'), M, y); y += 7;
      doc.setFont('helvetica','normal'); doc.setFontSize(19);
      doc.setTextColor.apply(doc, MG_BROWN);
      var priceTxt = mgT(price);
      doc.text(priceTxt, M, y);
      /* measure at the price's own size — reading the width after
         shrinking to 9pt put the USD figure on top of the baht one */
      var priceW = doc.getTextWidth(priceTxt);
      if (usd){
        doc.setFontSize(9); doc.setTextColor.apply(doc, MG_TAUPE);
        doc.text(mgT(usd), M + priceW + 5, y);
      }
      y += 12;
    }

    /* ── section helper ────────────────────────────────────── */
    function head(t){
      if (y > H - 45){ doc.addPage(); y = M + 6; }
      doc.setFont('times','normal'); doc.setFontSize(15);
      doc.setTextColor.apply(doc, MG_BROWN);
      doc.text(mgT(t), M, y); y += 3;
      doc.setDrawColor(230, 222, 211); doc.line(M, y, W - M, y); y += 7;
    }
    function body(txt, size){
      doc.setFont('helvetica','normal'); doc.setFontSize(size || 9.5);
      doc.setTextColor.apply(doc, MG_MUTED);
      var lines = doc.splitTextToSize(mgT(txt), W - M*2);
      lines.forEach(function(ln){
        if (y > H - 22){ doc.addPage(); y = M + 6; }
        doc.text(mgT(ln), M, y); y += 5;
      });
      y += 4;
    }

    /* ── highlights ────────────────────────────────────────── */
    var hls = [].slice.call(document.querySelectorAll('.det-highlight-item')).map(function(i){
      return {
        l: (i.querySelector('.det-hl-label')||{}).textContent || '',
        t: (i.querySelector('.det-hl-text') ||{}).textContent || ''
      };
    });
    if (hls.length){
      head('Key Highlights');
      hls.forEach(function(h){
        if (y > H - 30){ doc.addPage(); y = M + 6; }
        doc.setFont('helvetica','bold'); doc.setFontSize(7.5);
        doc.setTextColor.apply(doc, MG_TAUPE);
        doc.text(mgT(h.l.toUpperCase()), M, y); y += 5;
        doc.setFont('times','normal'); doc.setFontSize(11);
        doc.setTextColor.apply(doc, MG_BROWN);
        var ls = doc.splitTextToSize(mgT(h.t), W - M*2);
        ls.forEach(function(ln){ doc.text(mgT(ln), M, y); y += 5; });
        y += 3;
      });
      y += 2;
    }

    /* ── description ───────────────────────────────────────── */
    var desc = q('#detDesc');
    if (desc){ head('Property Description'); body(desc); }

    /* ── features ──────────────────────────────────────────── */
    var feats = [].slice.call(document.querySelectorAll('.det-feat')).map(function(f){
      return f.textContent.trim();
    }).filter(Boolean);
    if (feats.length){
      head('Features & Amenities');
      doc.setFont('helvetica','normal'); doc.setFontSize(9);
      doc.setTextColor.apply(doc, MG_MUTED);
      var colW = (W - M*2) / 2, col = 0, startY = y;
      feats.forEach(function(ft){
        if (y > H - 22){
          if (col === 0){ col = 1; y = startY; }
          else { doc.addPage(); y = M + 6; startY = y; col = 0; }
        }
        doc.text(mgT('·  ' + ft), M + col * colW, y); y += 5.2;
      });
      y = Math.max(y, startY) + 6;
    }

    /* ── layouts (property_unit_types) ─────────────────────── */
    var units = [].slice.call(document.querySelectorAll('.det-unit-tabs .det-unit-tab, .det-unit-tabs button'))
      .map(function(b){ return b.textContent.trim(); }).filter(Boolean);
    var unitMeta = q('#detUnitMeta');
    if (units.length || unitMeta){
      head('Layouts');
      if (units.length){
        doc.setFont('helvetica','bold'); doc.setFontSize(9);
        doc.setTextColor.apply(doc, MG_BROWN);
        doc.text(mgT(units.join('   /   ')), M, y); y += 6;
      }
      if (unitMeta) body(unitMeta, 9);
    }

    /* ── location & nearby ─────────────────────────────────── */
    var near = [].slice.call(document.querySelectorAll('#detNearby .det-near')).map(function(n){
      return {
        n: (n.querySelector('.det-near-name')||{}).textContent || '',
        d: (n.querySelector('.det-near-dist')||{}).textContent || ''
      };
    }).filter(function(x){ return x.n; });
    if (near.length){
      head('Location & Nearby');
      doc.setFontSize(9);
      near.forEach(function(x){
        if (y > H - 22){ doc.addPage(); y = M + 6; }
        doc.setFont('helvetica','normal'); doc.setTextColor.apply(doc, MG_MUTED);
        doc.text(mgT(x.n), M, y);
        doc.setFont('helvetica','bold'); doc.setTextColor.apply(doc, MG_BROWN);
        doc.text(mgT(x.d), W - M, y, { align:'right' });
        y += 5.4;
      });
      y += 4;
    }

    /* ── gallery grid ──────────────────────────────────────── */
    var thumbs = [].slice.call(
      document.querySelectorAll('.det-thumbs .det-thumb, .det-thumbs img')).slice(0, 8);
    if (thumbs.length){
      var loaded = [];
      for (var i = 0; i < thumbs.length; i++){
        var u = mgImgUrl(thumbs[i]);
        if (!u) continue;
        var im = await mgLoadImage(u);
        if (im) loaded.push(im);
      }
      if (loaded.length){
        doc.addPage(); y = M + 6;
        head('Gallery');
        var gw = (W - M*2 - 6) / 2, gh = gw * 0.66, gx = M;
        loaded.forEach(function(im, i){
          if (y + gh > H - 20){ doc.addPage(); y = M + 6; }
          doc.addImage(im.data, 'JPEG', gx, y, gw, gh, undefined, 'FAST');
          if (i % 2 === 1){ y += gh + 6; gx = M; } else { gx = M + gw + 6; }
        });
      }
    }

    /* ── footer on every page ──────────────────────────────── */
    var pages = doc.getNumberOfPages();
    for (var p = 1; p <= pages; p++){
      doc.setPage(p);
      doc.setDrawColor(235, 229, 220);
      doc.line(M, H - 14, W - M, H - 14);
      doc.setFont('helvetica','normal'); doc.setFontSize(6.8);
      doc.setTextColor.apply(doc, MG_TAUPE);
      doc.text(mgT('M GROUP BUSINESS CO.,LTD  -  63/202 Thepkasattri Road, Kohkaew, Muang, Phuket 83000'), M, H - 9.5);
      doc.text(mgT('contact@mgroupestates.com  ·  mgroupestates.com'), M, H - 6);
      doc.text(mgT(String(p) + ' / ' + pages), W - M - 8, H - 6);
    }

    var safe = name.replace(/[^\w\s—-]/g, '').replace(/\s+/g, ' ').trim();
    doc.save('MGROUP Estates - ' + safe + '.pdf');

  }catch(err){
    console.error('PDF build failed, falling back to print:', err);
    window.print();
  }finally{
    if (btn){ btn.disabled = false; btn.innerHTML = label; }
  }
}

;/* ── Scroll reveal ─────────────────────────────────────────────
   Rise-and-fade as elements enter view, matching tytasset.com's
   restrained motion. Two safety rules matter more than the effect:
   anything already on screen is shown immediately (never animate what
   the visitor is looking at), and a timer force-reveals everything if
   the observer never fires — a hidden page is far worse than a missing
   animation. */
(function(){
  var TARGETS = ['.svc3-card','.inv-card','.dev-logo','.svc3-head',
                 '.home-cta','.quick-form','.pg-hero','.lx-card',
                 '.proc-step','.proc-own-card','.proc-deed-card',
                 '.prop-card','.det-highlight-item','.calc'];

  function showAll(){
    document.querySelectorAll('.mg-reveal').forEach(function(el){ el.classList.add('mg-in'); });
  }

  function arm(){
    if (!('IntersectionObserver' in window)) { showAll(); return; }

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (!e.isIntersecting) return;
        var i = Number(e.target.getAttribute('data-mg-i') || 0);
        e.target.style.animationDelay = Math.min(i, 5) * 70 + 'ms';
        e.target.classList.add('mg-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });

    TARGETS.forEach(function(sel){
      document.querySelectorAll(sel).forEach(function(el, i){
        if (el.classList.contains('mg-reveal')) return;
        var r = el.getBoundingClientRect();
        el.classList.add('mg-reveal');
        el.setAttribute('data-mg-i', i);
        /* already visible → reveal now, don't wait for a scroll that
           may never come on a short page */
        if (r.top < innerHeight * 0.95 && r.bottom > 0) el.classList.add('mg-in');
        else io.observe(el);
      });
    });
  }

  function boot(){
    arm();
    setTimeout(arm, 1200);   /* Supabase cards arrive after first paint */
    setTimeout(arm, 3000);
    setTimeout(showAll, 5000);   /* nothing stays hidden, whatever happens */
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  window.addEventListener('pageshow', function(e){ if (e.persisted) showAll(); });
})();

;/* ── Nearby category buttons, built from the data ───────────────
   The five buttons used to be hard-coded in the HTML, so adding a
   place type meant editing markup. They are generated from whatever
   place_type values the property actually has, in a fixed order. */
var MG_PLACE_LABELS = {
  beach:'Beach', school:'School', hospital:'Hospital', gym:'Gym',
  padel:'Padel', mall:'Shopping', foresta:'Foresta',
  convenience:'7-Eleven', golf:'Golf', airport:'Airport', wellness:'Wellness'
};
var MG_PLACE_ORDER = ['beach','school','hospital','gym','padel','mall',
                      'foresta','convenience','golf','airport','wellness'];

function renderNearbyCats(list){
  var bar = document.getElementById('detNearbyCats');
  if (!bar) return;
  var present = {};
  list.forEach(function(row){ if (row[2]) present[row[2]] = true; });

  /* each category carries its own glyph — the buttons lost them when
     they moved from hard-coded markup to being generated */
  var ICON = {
    all:'grid', beach:'sea', school:'school', hospital:'hospital', gym:'gym',
    padel:'padel', mall:'mall', foresta:'tree', convenience:'store',
    golf:'golf', airport:'jet', wellness:'spa'
  };
  function btn(cat, label, active){
    return '<button class="det-ncat' + (active ? ' active' : '') + '" data-cat="' + cat +
           '" onclick="filterNearby(this,\'' + cat + '\')">' +
           MGI.svg(ICON[cat] || 'star') + '<span>' + label + '</span></button>';
  }

  var html = btn('all', 'All', true);
  MG_PLACE_ORDER.forEach(function(t){
    if (present[t]) html += btn(t, MG_PLACE_LABELS[t] || t, false);
  });
  bar.innerHTML = html;
}

;/* glyph for a nearby row, matching its category button */
function mgNearbyIcon(cat){
  var ICON = {
    beach:'sea', school:'school', hospital:'hospital', gym:'gym', padel:'padel',
    mall:'mall', foresta:'tree', convenience:'store', golf:'golf',
    airport:'jet', wellness:'spa'
  };
  return (typeof MGI === 'undefined') ? '' : MGI.svg(ICON[cat] || 'star');
}


;/* ── Entrance-animation safety net ─────────────────────────────
   The page-open animation is pure CSS and ends visible on its own, but
   an animation that gets cancelled or never starts would leave the
   header at opacity 0 — which is how this site lost its content once
   before. Two seconds in, switch the animations off entirely; the rule
   this class enables can only reveal, never hide. */
(function(){
  var reveal = function(){ document.documentElement.classList.add('mg-entered'); };
  setTimeout(reveal, 3200);   /* after the longest entrance finishes */
  /* bfcache restores skip load events, so arm it on the way back too */
  window.addEventListener('pageshow', function(e){ if (e.persisted) reveal(); });
})();


;/* ── Reveal property sections on scroll ─────────────────────────
   The gallery is exempt: it shows the moment its photo lands. Everything
   below rises in as it comes up the screen.

   State is recomputed on every pass rather than latched. Latching was
   the bug: photos and Supabase sections keep growing the page for
   seconds after load, so a section marked "seen" while it sat at 400px
   was already spent by the time it settled at 900px, and every heading
   arrived pre-revealed. Recomputing is self-correcting whatever the
   layout does. Hysteresis on the two thresholds stops a section
   sitting exactly on the line from flickering.

   Scroll listener rather than IntersectionObserver — the observer does
   not reliably fire here and fails silently when it doesn't. */
(function(){
  if ((document.body && document.body.getAttribute('data-page')) !== 'property') return;

  function arm(){
    var secs = [].slice.call(document.querySelectorAll('.det-open-section'));
    if (secs.length < 2) return false;
    document.documentElement.classList.add('mg-sr');

    var ticking = false;
    function pass(){
      ticking = false;
      var showAt = window.innerHeight * 0.88;
      var hideAt = window.innerHeight * 1.06;
      secs.forEach(function(el){
        if (!el.offsetHeight) return;
        var top = el.getBoundingClientRect().top;
        if (top < showAt) el.classList.add('mg-shown');
        else if (top > hideAt) el.classList.remove('mg-shown');
      });
    }
    function schedule(){
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(pass);
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('pageshow', schedule);
    /* the page keeps growing as photos land; keep re-checking for a while */
    var t = 0, iv = setInterval(function(){ pass(); if (++t > 40) clearInterval(iv); }, 400);
    pass();
    return true;
  }

  var tries = 0;
  (function attempt(){
    if (arm() || ++tries > 60) return;
    setTimeout(attempt, 300);
  })();
})();
