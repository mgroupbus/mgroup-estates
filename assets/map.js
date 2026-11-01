/* ══════════════════════════════════════════════════════════════
   PROPERTY MAP
   Every active listing on one map of Phuket, filtered by the same
   collections the rest of the site uses.

   OpenStreetMap through Leaflet rather than the Google Maps JS API:
   that one needs a billing account and a key in the page, and this map
   shows a few dozen pins. Agents still paste a Google Maps link when
   entering a listing — the database pulls the coordinates out of it —
   and every pin links back out to Google for directions.

   A listing with no coordinates yet is not dropped: it is listed beside
   the map as "location on request", because a missing pin should not
   make a property disappear from the page.
   ══════════════════════════════════════════════════════════════ */
(function () {
  if ((document.body && document.body.getAttribute('data-page')) !== 'map') return;

  var SB_URL = 'https://iwipvfkjfsveycppqhxc.supabase.co';
  var SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3aXB2ZmtqZnN2ZXljcHBxaHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NzI5NzYsImV4cCI6MjA5MDM0ODk3Nn0.T_XwpBpNdeqQLjXuulEPwlUvCN9uXHNTj3B7tMxbtFo';

  var PHUKET = [7.9519, 98.3381];
  var map, cluster = [], all = [], colls = [], active = 'all';

  function api(path) {
    return fetch(SB_URL + '/rest/v1/' + path, {
      headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY }
    }).then(function (r) {
      if (!r.ok) throw new Error(r.status + ' ' + path);
      return r.json();
    });
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function propUrl(p) {
    var slug = (p.slug || '').trim();
    if (!slug) {
      slug = (p.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    return slug ? '/property/' + slug + '/' : 'property.html?id=' + p.id;
  }

  function priceOf(p) {
    if (p.price_display) return p.price_display;
    if (p.price_thb) return '฿' + Number(p.price_thb).toLocaleString();
    return 'Price on request';
  }

  function specsOf(p) {
    var bits = [];
    if (p.beds) bits.push(p.beds + ' bed');
    if (p.baths) bits.push(p.baths + ' bath');
    if (p.sqm) bits.push(Number(p.sqm).toLocaleString() + ' sqm');
    return bits.join(' · ');
  }

  /* A pin carrying the price reads at a glance; a generic teardrop does
     not. Sold listings are greyed rather than hidden — people search for
     a building by name after it has sold. */
  function pinFor(p) {
    var label = p.price_thb
      ? '฿' + (p.price_thb >= 1e6
          ? Math.round(p.price_thb / 1e5) / 10 + 'M'
          : Math.round(p.price_thb / 1e3) + 'K')
      : 'POA';
    return L.divIcon({
      className: 'map-pin' + (p.is_sold ? ' map-pin--sold' : ''),
      html: '<span>' + label + '</span>',
      iconSize: [58, 26],
      iconAnchor: [29, 26],
      popupAnchor: [0, -24]
    });
  }

  function popupFor(p) {
    var img = p.hero_image
      ? '<div class="map-pop-img" style="background-image:url(' + esc(mgImgSafe(p.hero_image)) + ')"></div>'
      : '';
    var where = [p.location, p.district, p.city].filter(Boolean).join(', ');
    return '<div class="map-pop">' + img +
      '<div class="map-pop-body">' +
        '<div class="map-pop-name">' + esc(p.name) + '</div>' +
        (where ? '<div class="map-pop-loc">' + esc(where) + '</div>' : '') +
        (specsOf(p) ? '<div class="map-pop-specs">' + esc(specsOf(p)) + '</div>' : '') +
        '<div class="map-pop-price">' + esc(priceOf(p)) + '</div>' +
        '<div class="map-pop-links">' +
          '<a class="map-pop-btn" href="' + propUrl(p) + '">View property</a>' +
          '<a class="map-pop-dir" target="_blank" rel="noopener" href="' +
            'https://www.google.com/maps/dir/?api=1&destination=' + p.lat + ',' + p.lng +
          '">Directions</a>' +
        '</div>' +
      '</div></div>';
  }

  /* app.js owns image sizing, but it loads after this file on this page. */
  function mgImgSafe(u) {
    return (typeof mgImg === 'function') ? mgImg(u, 520) : u;
  }

  function matches(p) {
    return active === 'all' || p.collection_id === active;
  }

  function draw() {
    cluster.forEach(function (m) { map.removeLayer(m); });
    cluster = [];

    var shown = all.filter(matches);
    var pinned = shown.filter(function (p) { return p.lat != null && p.lng != null; });

    pinned.forEach(function (p) {
      var m = L.marker([p.lat, p.lng], { icon: pinFor(p), title: p.name })
        .bindPopup(popupFor(p), { maxWidth: 280 })
        .addTo(map);
      m._mgId = p.id;
      cluster.push(m);
    });

    if (pinned.length) {
      map.fitBounds(L.latLngBounds(pinned.map(function (p) { return [p.lat, p.lng]; })),
                    { padding: [48, 48], maxZoom: 14 });
    } else {
      map.setView(PHUKET, 11);
    }

    drawList(shown, pinned.length);
  }

  function drawList(shown, pinnedCount) {
    var el = document.getElementById('mapList');
    if (!shown.length) {
      el.innerHTML = '<p class="map-empty">No listings in this collection yet.</p>';
    } else {
      el.innerHTML = shown.map(function (p) {
        var located = p.lat != null && p.lng != null;
        return '<button class="map-row' + (located ? '' : ' map-row--nopin') + '"' +
          ' data-id="' + p.id + '"' + (located ? '' : ' disabled') + '>' +
          '<span class="map-row-name">' + esc(p.name) + '</span>' +
          '<span class="map-row-meta">' + esc(specsOf(p) || '—') + '</span>' +
          '<span class="map-row-price">' + esc(priceOf(p)) + '</span>' +
          (located ? '' : '<span class="map-row-flag">Location on request</span>') +
          '</button>';
      }).join('');
    }

    var missing = shown.length - pinnedCount;
    var note = document.getElementById('mapNote');
    note.textContent = pinnedCount
      ? pinnedCount + ' of ' + shown.length + ' shown on the map'
        + (missing ? ' · ' + missing + ' awaiting a location' : '')
      : shown.length + ' listing' + (shown.length === 1 ? '' : 's')
        + ' in this collection — none mapped yet.';
  }

  function drawFilters() {
    var counts = {};
    all.forEach(function (p) {
      counts[p.collection_id] = (counts[p.collection_id] || 0) + 1;
    });
    var used = colls.filter(function (c) { return counts[c.id]; });

    var html = '<button class="map-chip is-on" data-coll="all">All' +
      '<span>' + all.length + '</span></button>';
    html += used.map(function (c) {
      return '<button class="map-chip" data-coll="' + esc(c.id) + '">' +
        esc(c.label) + '<span>' + counts[c.id] + '</span></button>';
    }).join('');
    document.getElementById('mapFilters').innerHTML = html;
  }

  function wire() {
    document.getElementById('mapFilters').addEventListener('click', function (e) {
      var b = e.target.closest('.map-chip');
      if (!b) return;
      active = b.getAttribute('data-coll');
      [].forEach.call(this.querySelectorAll('.map-chip'), function (x) {
        x.classList.toggle('is-on', x === b);
      });
      draw();
    });

    document.getElementById('mapList').addEventListener('click', function (e) {
      var row = e.target.closest('.map-row');
      if (!row || row.disabled) return;
      var id = parseInt(row.getAttribute('data-id'), 10);
      var m = cluster.filter(function (x) { return x._mgId === id; })[0];
      if (!m) return;
      map.setView(m.getLatLng(), 15, { animate: true });
      m.openPopup();
      if (window.innerWidth < 900) {
        document.getElementById('mapCanvas').scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  function boot() {
    map = L.map('mapCanvas', { scrollWheelZoom: false, zoomControl: true })
           .setView(PHUKET, 11);
    /* Plain OpenStreetMap tiles. Carto's light basemap was the nicer
       match for the palette, but it now answers with an "API KEY
       REQUIRED" watermark instead of a map — the request still returns
       200, so it fails looking like it worked. OSM needs no key; the
       colour is toned down in CSS instead, which gets the quiet map
       without depending on anyone's key. */
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    map.on('click', function () { map.scrollWheelZoom.enable(); });

    Promise.all([
      api('property_map?select=*&order=id.asc'),
      api('collections?select=id,label,sort_order&is_active=eq.true&order=sort_order.asc.nullslast')
    ]).then(function (res) {
      all = res[0].filter(function (p) { return p.is_active !== false; });
      colls = res[1];
      drawFilters();
      wire();
      draw();
    }).catch(function (err) {
      console.warn('MGROUP map:', err.message);
      document.getElementById('mapList').innerHTML =
        '<p class="map-empty">Listings could not be loaded just now. ' +
        '<a href="collections.html">Browse the collections</a> instead.</p>';
      document.getElementById('mapNote').textContent = '';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
