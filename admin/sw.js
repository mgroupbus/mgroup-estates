const C='mgroup-addlisting-v1';
const ASSETS=['add-listing-live.html','manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request;
  // only handle same-origin GET; let Supabase POST/cross-origin pass straight through
  if(req.method!=='GET'||new URL(req.url).origin!==location.origin) return;
  e.respondWith(fetch(req).then(res=>{const cc=res.clone();caches.open(C).then(c=>c.put(req,cc));return res;}).catch(()=>caches.match(req).then(m=>m||caches.match('add-listing-live.html'))));
});
