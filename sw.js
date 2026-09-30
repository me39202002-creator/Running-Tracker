const CACHE_NAME = 'ken-running-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap',
  'https://www.transparenttextures.com/patterns/cream-paper.png'
];

// 安裝並快取靜態資源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 攔截請求：優先讀取快取，沒有快取才發送網路請求 (API 連線用)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // 回傳離線快取畫面
        }
        return fetch(event.request); // 允許 API 繼續連線到 Google
      })
  );
});