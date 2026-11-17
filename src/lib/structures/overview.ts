export interface OverviewLink {
    href: string;
    label: string;
}

export interface Overview {
    /** Optional link appended to the end of the overview paragraph. */
    link?: OverviewLink;
    text: string;
}

export interface MyOverview {
    currentRoleParagraphs: string[];
    headline: string;
    /** Overview paragraph shown beneath the headline. */
    overview: Overview;
}
