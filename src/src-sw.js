workbox.routing.registerRoute(
  /https:\/\/jsonplaceholder\.typicode\.com/,
  workbox.strategies.staleWhileRevalidate()
);

workbox.precaching.precacheAndRoute(self.__precacheManifest);
