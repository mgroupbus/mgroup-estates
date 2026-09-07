// Kill-switch service worker: stop stale-cache issues during active development.
// Clears all caches, unregisters itself, and reloads open pages fresh from network.
self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){
  e.waitUntil((async function(){
    try{ var keys = await caches.keys(); await Promise.all(keys.map(function(k){ return caches.delete(k); })); }catch(_){}
    try{ await self.registration.unregister(); }catch(_){}
    try{ var cs = await self.clients.matchAll({type:'window'}); cs.forEach(function(c){ c.navigate(c.url); }); }catch(_){}
  })());
});
// Never serve from cache — always go to network.
self.addEventListener('fetch', function(e){ return; });
