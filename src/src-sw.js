const url = new URL(location.href);
const devMode = url.hostname === "localhost" ? true : false;
workbox.setConfig({ debug: devMode });
if (devMode) {
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
} else {
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.silent);
}

workbox.core.setCacheNameDetails({
  prefix: "react-app"
});

//apis
workbox.routing.registerRoute(
  "https://jsonplaceholder.typicode.com",
  workbox.strategies.networkFirst({
    cacheName: "posts-data"
  }),
  "GET"
);
workbox.routing.registerRoute(
  "https://jsonplaceholder.typicode.com",
  workbox.strategies.networkFirst({
    cacheName: "posts-data"
  }),
  "POST"
);
workbox.routing.registerRoute(
  "https://jsonplaceholder.typicode.com",
  workbox.strategies.networkFirst({
    cacheName: "posts-data"
  }),
  "PATCH"
);
workbox.routing.registerRoute(
  "https://jsonplaceholder.typicode.com",
  workbox.strategies.networkFirst({
    cacheName: "posts-data"
  }),
  "DELETE"
);
workbox.routing.registerRoute(
  "https://jsonplaceholder.typicode.com",
  workbox.strategies.networkFirst({
    cacheName: "posts-data"
  }),
  "PUT"
);

//images
workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/g,
  workbox.strategies.cacheFirst({
    cacheName: "images"
  })
);

//google fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.cacheFirst({
    cacheName: "google-fonts-stylesheets"
  })
);

//js, jsx
workbox.routing.registerRoute(
  /\.(?:js|jsx)$/,
  workbox.strategies.cacheFirst({
    cacheName: "javascripts"
  })
);

//background sync queue
const queue = new workbox.backgroundSync.Queue("myQueueName");
self.addEventListener("fetch", event => {
  const promiseChain = fetch(event.request.clone()).catch(err => {
    return queue.addRequest(event.request);
  });
  event.waitUntil(promiseChain);
});

//cache update broadcast
workbox.routing.registerRoute(
  new RegExp("/api/"),
  workbox.strategies.staleWhileRevalidate({
    plugins: [new workbox.broadcastUpdate.Plugin("api-updates")]
  })
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);
