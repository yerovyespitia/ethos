#!/usr/bin/env bun

// Copyright (C) 2017-2026 Smart code 203358507

import path from 'node:path';

const INDEX_CACHE = 7200;
const ASSETS_CACHE = 2629744;
const HTTP_PORT = 8080;

const buildPath = path.resolve(import.meta.dir, 'build');
const indexPath = path.join(buildPath, 'index.html');

const contentTypeByExtension = new Map([
    ['.css', 'text/css; charset=utf-8'],
    ['.html', 'text/html; charset=utf-8'],
    ['.ico', 'image/x-icon'],
    ['.js', 'text/javascript; charset=utf-8'],
    ['.json', 'application/json; charset=utf-8'],
    ['.png', 'image/png'],
    ['.svg', 'image/svg+xml'],
    ['.ttf', 'font/ttf'],
    ['.wasm', 'application/wasm'],
    ['.webp', 'image/webp'],
    ['.woff2', 'font/woff2'],
]);

function getFilePath(url) {
    const pathname = decodeURIComponent(new URL(url).pathname);
    const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const absolutePath = path.resolve(buildPath, relativePath);

    if (!absolutePath.startsWith(buildPath)) {
        return null;
    }

    return absolutePath;
}

function getHeaders(filePath) {
    const extension = path.extname(filePath);
    const headers = new Headers();
    headers.set('cache-control', `public, max-age=${filePath === indexPath ? INDEX_CACHE : ASSETS_CACHE}`);

    const contentType = contentTypeByExtension.get(extension);
    if (contentType) {
        headers.set('content-type', contentType);
    }

    return headers;
}

Bun.serve({
    port: HTTP_PORT,
    async fetch(request) {
        const filePath = getFilePath(request.url);

        if (!filePath) {
            return new Response('<h1>404! Page not found</h1>', {
                status: 404,
                headers: { 'content-type': 'text/html; charset=utf-8' },
            });
        }

        const file = Bun.file(filePath);
        if (!(await file.exists())) {
            return new Response('<h1>404! Page not found</h1>', {
                status: 404,
                headers: { 'content-type': 'text/html; charset=utf-8' },
            });
        }

        return new Response(file, {
            headers: getHeaders(filePath),
        });
    },
});

console.info(`Server listening on port: ${HTTP_PORT}`);
