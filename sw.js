self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("love-cache-v1").then(cache =>
      cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./script.js",
        "./sw.js",
        "./images/pic1.jpg",
        "./images/pic2.jpg",
        "./images/pic3.jpg",
        "./images/pic4.jpg",
        "./images/pic5.jpg",
        "./images/pic6.jpg",
        "./images/pic7.jpg",
        "./songs/song1.mp3",
        "./songs/song2.mp3",
        "./songs/song3.mp3",
        "./songs/song4.mp3",
        "./songs/song5.mp3",
        "./songs/song6.mp3",
        "./songs/song7.mp3",
        "./songs/theme1.mp3",
        "./songs/theme2.mp3",
        "./songs/theme3.mp3",
        "./songs/theme4.mp3"
      ])
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
