import {
    NavItemKind,
    type ContentNavItem,
    type LinkNavItem,
    type NavContent,
    type NavItem
} from '$lib/structures/nav';

import { type ExperienceItem } from '$lib/structures/experience';

const imageMap: Record<string, string> = import.meta.glob('$lib/images/*', {
    eager: true,
    import: 'default'
});

// TODO: Use Zod validation instead of manual mapping

type RawNavItem = {
    title: string;
    href?: string;
    contents?: NavContent[];
};

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
        src: imageMap[item.src],
        start: new Date(new Date(item.start).toLocaleString('en', { timeZone: 'UTC' })),
        end: item.end
            ? new Date(new Date(item.end).toLocaleString('en', { timeZone: 'UTC' }))
            : undefined
    }));
}
