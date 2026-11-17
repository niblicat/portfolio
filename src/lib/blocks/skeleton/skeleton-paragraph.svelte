<script lang="ts">
    import type { StandardProps } from '$lib/utilities/props';
    import { cn } from '$lib/utils';

    interface Props extends StandardProps {
        /** Class used on skeleton lines. */
        lineClass?: string;
        /** Raw article content as a string. */
        raw?: string;
    }

    let {
        class: className,
        raw,
        lineClass: skeletonClass,
        ref = $bindable(null),
        ...restProps
    }: Props = $props();

    const skeletonLines: { isShort: boolean; key: number }[] = $state(
        (() => {
            // obtain the amount of lines in children
            const length = raw?.toString().split('\n').length ?? 3;

            return Array.from({ length }, (_, i) => ({
                isShort: !(i % 3 === 0 || i % 7 === 0),
                key: i,
            }));
        })(),
    );
</script>

<!--
@component
Skeleton Paragraph displays a skeleton of a paragraph.

To change the amount of lines in the paragraph, pass the raw article
content into the raw attribute.
Otherwise, only 3 lines will be shown.
-->

<div data-slot="skeleton-paragraph" class={className} bind:this={ref} {...restProps}>
    {#each skeletonLines as skeletonLine (skeletonLine.key)}
        <div
            class={cn(
                'animate-gradient from-foreground/30 via-foreground/10 to-foreground/30 my-2 h-4 rounded-lg bg-gradient-to-r bg-size-[200%]',
                `${skeletonLine.isShort ? 'mr-24' : ''}`,
                skeletonClass,
            )}
        ></div>
    {/each}
</div>
