import { getJson, parseExperienceItems } from '$lib/server/content-loading';
import { type ExperienceItem } from '$lib/structures/experience';

export const load = async () => ({
    experienceItems: parseExperienceItems(await getJson<ExperienceItem[]>('experience-items'))
});
