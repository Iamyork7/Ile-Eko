const CACHE_NAME = 'ile-eko-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/jss1/mathematics/index.html',
  '/jss1/english-studies/index.html',
  '/jss1/basic-science/index.html',
  '/jss1/computer-studies/index.html',
  '/jss1/computer-studies/topics/hardware-components/index.html',
  '/jss1/computer-studies/topics/generations-of-computers/index.html',
  '/jss1/computer-studies/topics/data-and-information/index.html',
  '/jss2/index.html',
  '/jss3/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request).catch(() => {
          // Fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
