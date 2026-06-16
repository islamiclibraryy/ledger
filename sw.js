const CACHE_NAME = 'ledger-premium-v2';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.webp',
  './icon-512.webp'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch Assets (Offline Support)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});