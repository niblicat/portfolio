import { getArticle } from '$lib/server/content-loading';

export const load = async () => ({ article: await getArticle('melon-merge-policy') });
