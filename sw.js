/* Wild Waypoints – basic offline + runtime caching */
const VERSION = 'ww-pwa-v1';
const APP_SHELL = [
  '/', '/map', '/species', '/plants', '/my-waypoint', '/support',
  '/manifest.webmanifest', '/logo.png', '/icons/waypoint.png',
  '/data/species.json', '/data/plants.json', '/data/dailyTips.json'
];
self.addEventListener('install', (e)=>{ e.waitUntil(caches.open(VERSION).then(c=>c.addAll(APP_SHELL))); self.skipWaiting(); });
self.addEventListener('activate', (e)=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
const OSM='tile.openstreetmap.org', USGS='basemap.nationalmap.gov';
async function swr(req,name){ const c=await caches.open(name); const hit=await c.match(req);
  const net = fetch(req).then(r=>{ if(r.ok) c.put(req,r.clone()); return r; }).catch(()=>hit);
  return hit || net; }
self.addEventListener('fetch',(e)=>{
  const u=new URL(e.request.url);
  if(e.request.mode==='navigate'){ e.respondWith(fetch(e.request).then(r=>{const cl=r.clone(); caches.open(VERSION).then(c=>c.put(e.request,cl)); return r;}).catch(()=>caches.match(e.request))); return; }
  if(u.pathname.startsWith('/data/')){ e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request).then(r=>{ if(r.ok)caches.open(VERSION).then(c=>c.put(e.request,r.clone())); return r; }))); return; }
  if(u.hostname===OSM||u.hostname===USGS){ e.respondWith(swr(e.request,'tiles-cache')); return; }
  e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request)));
});
