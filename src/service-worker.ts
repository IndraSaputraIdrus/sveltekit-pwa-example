/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

import { build, files, version } from "$service-worker";

declare let self: ServiceWorkerGlobalScope;

const CACHE = `cache-${version}`;
const ASSETS = [...build, ...files];

self.addEventListener("install", (event) => {
    async function addFilesToCache() {
        const cache = await caches.open(CACHE);
        await cache.addAll(ASSETS);
    }

    event.waitUntil(addFilesToCache());
});

self.addEventListener("activate", (event) => {
    async function deleteOldCaches() {
        for (const key of await caches.keys()) {
            if (key !== CACHE) {
                await caches.delete(key);
            }
        }
    }

    event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    async function respond() {
        const url = new URL(event.request.url);
        const cache = await caches.open(CACHE);

        if (ASSETS.includes(url.pathname)) {
            const cacheResponse = await cache.match(url.pathname);
            if (cacheResponse) {
                return cacheResponse;
            }
        }

        try {
            const response = await fetch(event.request);
            const isNotExtension = url.protocol === "http:";
            const isSuccess = response.status === 200;

            if (isNotExtension && isSuccess) {
                cache.put(event.request, response.clone());
            }

            return response;
        } catch {
            const cacheResponse = await cache.match(url.pathname);
            if (cacheResponse) {
                return cacheResponse;
            }
        }

        return new Response("Not Found", { status: 404 });
    }

    event.respondWith(respond());
});

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});
