const CACHE_NAME = "codelab-v2";
const urlsToCache = [
    "/",
    "nav.html",
    "index.html",
    "pages/home.html",
    "pages/about.html",
    "pages/contact.html",
    "pages/tutorial.html",
    "css/materialize.min.css",
    "css/style.css",
    "icons/icon-192.png",
    "icons/icon-512.png",
    "images/css.png",
    "images/html.png",
    "images/jquery.png",
    "images/nodejs.png",
    "images/js.png",
    "images/php.png",
    "images/fandi.jpg",
    "images/img3.jpg",
    "images/img6.jpg",
    "images/img7.jpg",
    "images/img8.jpg",
    "js/materialize.min.js",
    "js/nav.js",
    "manifest.json",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&family=Teko:wght@500&display=swap"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

//Menggunakan aset dari cache
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

//Menghapus cache lama
self.addEventListener("active", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWoker: cache" + cacheName + "dihapus");
                        return caches.delete.apply(cacheName);
                    }
                })
            );
        })
    );
});