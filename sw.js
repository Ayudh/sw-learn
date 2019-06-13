const CACHE_NAME = "v1";
const urlsToCache = ["/", "/index.html", "index.js", "pis.png", "styles.css"];

self.addEventListener("install", event => {
  debugger;
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Cache opened");
      return cache.addAll(urlsToCache);
    }).catch(error => {
      console.log('asdf', error);
    })
  );
});

self.addEventListener("fetch", event => {
  console.log('fetch', event.request);
  caches.match(event.request).then(response => {
    if (response) {
      console.log("Cache Hit ", event.request, response);
      return response;
    }

    return fetch(event.request).then(response => {
      if (!response || response.status !== 200 || response.type !== "basic") {
        console.log("Not valid response", event.request);
        return response;
      }
      const responseToCache = response.clone();
      caches.open(CACHE_NAME).then(cache => {
        console.log("Cache put", event.request);
        cache.put(event.request, responseToCache);
      });
      return response;
    });
  });
});

self.addEventListener("activate", event => {
  console.log("Service Worker Activated");
});
