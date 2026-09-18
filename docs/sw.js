// Palimpsest — service worker.
//
// This origin (robertwalterj.github.io) is shared with Landfall, Halyard and
// the rest, so CacheStorage is SHARED: never use the global caches.match(),
// and never delete a cache that is not ours.
//
// The whole app is one HTML file. Network first, so a new deploy arrives on
// the next open with signal; the cached copy is the offline fallback.

const VERSION = "palimpsest-v1-33fcdd2-202609182303";   // stamped per deploy by make-deploy.mjs
const PREFIX = 'palimpsest-';
const PRECACHE = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await Promise.all(PRECACHE.map((u) => c.add(u).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith(PREFIX) && k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (!new URL(req.url).pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  e.respondWith((async () => {
    const c = await caches.open(VERSION);
    try {
      const res = await fetch(req);
      if (res.ok) c.put(req, res.clone());
      return res;
    } catch {
      return (await c.match(req)) || (req.mode === 'navigate' ? await c.match('index.html') : undefined) || Response.error();
    }
  })());
});
