
const CACHE_NAME='vocab-trainer-v12.9.3';
const APP_SHELL=['./index.html?v=12.9.3','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME&&caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith((async()=>{const c=await caches.open(CACHE_NAME);const m=await c.match(e.request,{ignoreVary:true,ignoreSearch:false});if(m)return m;
  try{const r=await fetch(e.request);if(r.ok&&new URL(e.request.url).origin===location.origin){c.put(e.request,r.clone());}return r;}catch(err){
    if(e.request.mode==='navigate'){const fb=await c.match('./index.html?v=12.9.3');if(fb)return fb;} throw err;}})());
});
