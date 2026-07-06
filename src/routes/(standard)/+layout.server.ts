import { getJson } from '$lib/server/content-loading';
import type { NavItem } from '$lib/structures/nav';

export const load = async () => ({ navItems: await getJson<NavItem[]>('nav-items') });
