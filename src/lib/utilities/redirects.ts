import { redirect } from '@sveltejs/kit';

/**
 * Performs a relative redirect (303 by default) from the base path source to destination.
 *
 * @param {URL} url The full URL object.
 * @param {string} source The source base path.
 * @param {string} destination The destination base path.
 * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | ({} & number)} [status=303]
 *     The [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages).
 *     Must be in the range 300-308.
 * @returns {never}
 *
 * @example
 * export const load = async ({ url }) => {
 *     // url.pathname is /old/my-cats
 *     relativeRedirect(url, '/old', '/new');
 *     // Redirects to /new/my-cats
 * };
 */
export function relativeRedirect(
    url: URL,
    source: string,
    destination: string,
    status: 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | ({} & number) = 303,
): never {
    if (url) {
        // Will only replace first match
        const redirected = url.pathname.replace(source, destination);

        if (redirected) redirect(status, redirected);
    }

    redirect(status, destination);
}
