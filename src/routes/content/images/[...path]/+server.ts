import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import { readFile } from 'node:fs/promises';
import { extname, isAbsolute, relative, resolve } from 'node:path';
import type { RequestHandler } from './$types';

const CONTENT_DIR = env.CONTENT_DIR ?? 'content';

const MIME_TYPES: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
};

const CACHE_CONTROL = 'public, max-age=3600';

export const GET: RequestHandler = async ({ params }) => {
    const path = params.path;

    const type = MIME_TYPES[extname(path).toLowerCase()];
    if (!type) throw error(415, 'Unsupported image type');

    // Resolve within the images directory and reject any path traversal
    const imagesDir = resolve(CONTENT_DIR, 'images');
    const filePath = resolve(imagesDir, path);
    const rel = relative(imagesDir, filePath);
    if (rel.startsWith('..') || isAbsolute(rel)) throw error(403);

    let data: Buffer;
    try {
        data = await readFile(filePath);
    } catch {
        throw error(404);
    }

    return new Response(new Uint8Array(data), {
        headers: {
            'content-type': type,
            'cache-control': CACHE_CONTROL
        }
    });
};
