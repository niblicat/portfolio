import { readFile } from 'node:fs/promises';
import { getContentDir } from './environment-variables';
import {
    NavItemKind,
    type ContentNavItem,
    type LinkNavItem,
    type NavContent,
    type NavItem
} from '$lib/structures/nav';
import { type ExperienceItem } from '$lib/structures/experience';

export async function getArticle(slug: string): Promise<string> {
    return readFile(`${getContentDir()}/articles/${slug}.md`, 'utf-8');
}

export async function getJson<T>(slug: string): Promise<T> {
    return JSON.parse(await readFile(`${getContentDir()}/${slug}.json`, 'utf-8'));
}

type RawNavItem = {
    title: string;
    href?: string;
    contents?: NavContent[];
};

// TODO: Perform parsing with Zod

export function parseNavItems(navItemsRaw: RawNavItem[]): NavItem[] {
    return navItemsRaw.map((item) => {
        if (item.contents) {
            return {
                title: item.title,
                kind: NavItemKind.Content,
                contents: item.contents
            } as ContentNavItem;
        } else if (item.href) {
            return {
                title: item.title,
                kind: NavItemKind.Link,
                href: item.href
            } as LinkNavItem;
        } else throw new Error('Unexpected Nav Item type!');
    });
}

export function parseExperienceItems(experienceItems: ExperienceItem[]) {
    return experienceItems.map((item) => ({
        ...item,
        start: new Date(new Date(item.start).toLocaleString('en', { timeZone: 'UTC' })),
        end: item.end
            ? new Date(new Date(item.end).toLocaleString('en', { timeZone: 'UTC' }))
            : undefined
    }));
}
