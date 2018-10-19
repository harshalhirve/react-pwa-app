console.log("⚙️ Hello from Service Worker");

//images
workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/g,
  workbox.strategies.cacheFirst({
    cacheName: "images"
  })
);

//js, jsx
workbox.routing.registerRoute(
  /\.(?:js|jsx)$/,
  workbox.strategies.cacheFirst({
    cacheName: "javascripts"
  })
);

//css
workbox.routing.registerRoute(
  /.*\.css/,
  workbox.strategies.cacheFirst({
    cacheName: "css-cache"
  })
);

//google fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.cacheFirst({
    cacheName: "google-fonts"
  })
);

//apis
workbox.routing.registerRoute(
  /^https:\/\/jsonplaceholder\.typicode\.com/,
  workbox.strategies.cacheFirst({
    cacheName: "posts-data"
  }),
  "GET"
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);
