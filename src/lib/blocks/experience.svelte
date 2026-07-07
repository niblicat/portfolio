<script lang="ts">
    import { type ExperienceItem } from '$lib/structures/experience';
    import type { StandardProps } from '$lib/utilities/props';
    import { dateRange } from '$lib/utils';

    interface Props extends StandardProps {
        experienceItems: ExperienceItem[];
    }

    let { class: className, children, experienceItems, ref = $bindable(null) }: Props = $props();

    const convertToRange = (start: Date, end?: Date) =>
        dateRange(start, end, { format: { month: 'long', year: 'numeric' } });
</script>

{#snippet experienceArea(item: ExperienceItem)}
    <div
        class="text-foreground bg-foreground/5 inset-shadow-secondary/50 flex-1 rounded-lg border p-4 inset-shadow-sm"
    >
        <div>
            {item.organization}
        </div>
        <div class="text-foreground/50 mb-2">
            {convertToRange(item.start, item.end)} • {item.location}
        </div>
        <!-- <span>{item.description}</span> -->
        {#if item.highlights}
            <ul class="ml-6 list-disc">
                {#each item.highlights as bullet, i (i)}
                    <li>{bullet}</li>
                {/each}
            </ul>
        {/if}
    </div>
{/snippet}
<!-- This element should fill the remaining space in the row without wrapping to the next line -->

{#snippet experienceListItem(item: ExperienceItem)}
    <li id={item.id} class="mb-4 flex flex-row flex-wrap gap-2">
        <div
            class="before:bg-secondary-foreground/25 after:bg-secondary-foreground/25 flex basis-full justify-center text-center before:m-auto before:h-[2px] before:min-w-2 before:flex-1 before:content-[''] after:m-auto after:h-[2px] after:min-w-2 after:flex-1 after:content-['']"
        >
            <h3 class="mx-4 text-xl font-thin uppercase">
                {item.title}
            </h3>
        </div>
        <span class="xs:w-1/8 flex w-1/4">
            {#if item.image}
                <img
                    class="border-secondary mx-auto my-4 h-12 w-12 rounded-full border-2 object-cover sm:h-16 sm:w-16"
                    src={item.image.src}
                    alt={item.image.alt}
                />
            {:else}
                <span
                    class="border-secondary text-primary-foreground mx-auto my-4 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-gradient-to-br from-primary to-accent text-xl font-thin uppercase sm:h-16 sm:w-16"
                    aria-hidden="true"
                >
                    {item.organization.charAt(0) || '?'}
                </span>
            {/if}
        </span>
        {@render experienceArea(item)}
    </li>
{/snippet}

<div data-slot="experience" id="experience" class={className} bind:this={ref}>
    <h2 class="mx-auto p-4 text-center text-3xl font-thin uppercase lg:text-left">Experience</h2>
    <div class="flex flex-row flex-wrap justify-center gap-4 lg:flex-nowrap">
        <div class="max-w-2xl">
            {@render children?.()}
        </div>
        <ul class="max-w-2xl">
            {#each experienceItems as experienceItem (experienceItem.id)}
                {@render experienceListItem(experienceItem)}
            {/each}
        </ul>
    </div>
</div>
