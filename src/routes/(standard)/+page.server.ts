import { getJson, parseExperienceItems } from '$lib/server/content-loading';
import { type ExperienceItem } from '$lib/structures/experience';
import { type MyOverview } from '$lib/structures/overview';

export const load = async () => ({
    experienceItems: parseExperienceItems(await getJson<ExperienceItem[]>('experience-items')),
    overview: await getJson<MyOverview>('my-overview')
});
