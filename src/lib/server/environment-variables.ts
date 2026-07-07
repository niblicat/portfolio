import { env } from '$env/dynamic/private';

/** Root directory from which site content (articles, JSON, images) is loaded. */
export function getContentDir(): string {
    return env.CONTENT_DIR ?? 'content';
}
