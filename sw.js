const CACHE_NAME = 'ledger-premium-v2'; 
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.webp',
  './icon-512.webp'
];

// Install Service Worker
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate & Clean Old Caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Old cache deleted:', cache);
            return caches.delete(cache); 
          }
        })
      );
    }).then(() => self.clients.claim())
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