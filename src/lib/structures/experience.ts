interface Image {
    alt: string;
    src: string;
}
export interface ExperienceItem {
    description?: string;
    end?: Date;
    highlights?: string[];
    /** The ID attribute for the experience item. */
    id: string;
    image?: Image;
    location?: string;
    organization: string;
    start: Date;
    title: string;
}
