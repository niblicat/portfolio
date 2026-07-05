import { env } from '$env/dynamic/private';
import { readFile } from 'node:fs/promises';

const CONTENT_DIR = env.CONTENT_DIR ?? 'content';

export async function getArticle(slug: string): Promise<string> {
    return readFile(`${CONTENT_DIR}/articles/${slug}.md`, 'utf-8');
}

export async function getJson<T>(slug: string): Promise<T> {
    return JSON.parse(await readFile(`${CONTENT_DIR}/${slug}.json`, 'utf-8'));
}
