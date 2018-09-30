workbox.routing.registerRoute(
  /https:\/\/jsonplaceholder\.typicode\.com/,
  workbox.strategies.networkFirst()
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);
