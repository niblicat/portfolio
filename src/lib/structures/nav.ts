export enum NavItemKind {
    Content = 0,
    Link = 1,
}

export interface NavContent {
    description?: string;
    href: string;
    name: string;
}

interface CoreNavItem {
    kind: NavItemKind;
    title: string;
}

export interface ContentNavItem extends CoreNavItem {
    contents: NavContent[];
    kind: NavItemKind.Content;
}

export interface LinkNavItem extends CoreNavItem {
    href: string;
    kind: NavItemKind.Link;
}

export type NavItem = ContentNavItem | LinkNavItem;
