export interface OverviewLink {
    label: string;
    href: string;
}

export interface Overview {
    text: string;
    /** Optional link appended to the end of the overview paragraph. */
    link?: OverviewLink;
}

export interface MyOverview {
    headline: string;
    /** Overview paragraph shown beneath the headline. */
    overview: Overview;
    currentRoleParagraphs: string[];
}
