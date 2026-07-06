import { getJson, parseNavItems } from '$lib/server/content-loading';

export const load = async () => ({ navItems: parseNavItems(await getJson('nav-items')) });
