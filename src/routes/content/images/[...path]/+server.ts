import { error } from '@sveltejs/kit';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, isAbsolute, relative, resolve } from 'node:path';
import { Readable } from 'node:stream';
import { getContentDir } from '$lib/server/environment-variables';
import type { RequestHandler } from './$types';

const MIME_TYPES: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
};

const CACHE_CONTROL = 'public, max-age=86400';

export const GET: RequestHandler = async ({ params, request }) => {
    const path = params.path;

    const type = MIME_TYPES[extname(path).toLowerCase()];
    if (!type) throw error(415, 'Unsupported image type');

    // Resolve within the images directory and reject any path traversal
    const imagesDir = resolve(getContentDir(), 'images');
    const filePath = resolve(imagesDir, path);
    const rel = relative(imagesDir, filePath);
    if (rel.startsWith('..') || isAbsolute(rel)) throw error(403);

    let stats;
    try {
        stats = await stat(filePath);
    } catch {
        throw error(404);
    }
    if (!stats.isFile()) throw error(404);

    const lastModified = stats.mtime.toUTCString();
    const etag = `W/"${stats.size}-${stats.mtimeMs}"`;

    const ifNoneMatch = request.headers.get('if-none-match');
    const ifModifiedSince = request.headers.get('if-modified-since');
    const notModified =
        ifNoneMatch === etag ||
        (!ifNoneMatch && !!ifModifiedSince && new Date(ifModifiedSince) >= new Date(lastModified));
    if (notModified) {
        return new Response(null, {
            status: 304,
            headers: { etag, 'cache-control': CACHE_CONTROL }
        });
    }

    // Stream the file rather than buffering it into memory
    const body = Readable.toWeb(createReadStream(filePath)) as ReadableStream;

    return new Response(body, {
        headers: {
            'content-type': type,
            'content-length': String(stats.size),
            'cache-control': CACHE_CONTROL,
            etag,
            'last-modified': lastModified
        }
    });
};
