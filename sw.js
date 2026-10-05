const CACHE="sg-name-style-local-v1";
const ASSETS=["./","./index.html","./css/style.css","./js/config.js","./js/styles.js","./js/storage.js","./js/app.js","./manifest.json"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET")return;
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
   const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res;
 }).catch(()=>caches.match("./index.html"))));
});