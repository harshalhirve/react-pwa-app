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

//images
workbox.routing.registerRoute(
  /.*\.(?:png|jpg|jpeg|svg|gif)/g,
  workbox.strategies.networkFirst({
    cacheName: "images"
  })
);

//js, jsx
workbox.routing.registerRoute(
  /\.(?:js|jsx)$/,
  workbox.strategies.networkFirst({
    cacheName: "javascripts"
  })
);

//css
workbox.routing.registerRoute(
  /.*\.css/,
  workbox.strategies.networkFirst({
    cacheName: "css-cache"
  })
);

//google fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.networkFirst({
    cacheName: "google-fonts"
  })
);

//apis
workbox.routing.registerRoute(
  /^https:\/\/jsonplaceholder\.typicode\.com/,
  workbox.strategies.networkFirst({
    cacheName: "posts-data"
  }),
  "GET"
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);
