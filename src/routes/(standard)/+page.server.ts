import { getJson } from '$lib/server/content-loading';
import { type ExperienceItem } from '$lib/structures/experience';

export const load = async () => ({
    experienceItems: await getJson<ExperienceItem[]>('experience-items')
});
