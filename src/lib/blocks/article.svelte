<script lang="ts">
    import type { StandardProps } from '$lib/utilities/props';
    import { cn } from '$lib/utils';
    import { AttributeError } from '$lib/utilities/errors';
    import { SkeletonParagraph } from '$lib/blocks/skeleton';

    interface Props extends StandardProps {
        /** Raw article contents as string. */
        raw?: string;
        /** The tag of the HTML element in which the article
         * should be contained. */
        tag?: string;
    }

    let {
        raw,
        tag = 'div',
        class: className,
        children,
        ref = $bindable(null),
        ...restProps
    }: Props & { [key: string]: unknown } = $props();

    if (raw && children) throw new AttributeError('raw', 'children');

    const convertArticle = async (): Promise<string> => {
        // Doesn't import through normal means, so we'll await it
        const showdown = await import('showdown');
        const { Converter } = showdown.default;

        const converter = new Converter();

        if (raw) {
            return converter.makeHtml(raw);
        }

        throw new Error('Text to convert was not defined.');
    };
</script>

<!--
@component
Articles can be used to display standard HTML article content.
Alternatively, if you pass a markdown-formatted string into the raw attribute,
it will render as HTML. Do not pass in user-generated content without
sanitizing it.

Specifying a value for the raw attribute and providing children will prefer
the raw attribute.
-->

<svelte:element
    this={tag}
    class={cn(
        'prose prose-slate dark:prose-invert bg-foreground/5 inset-shadow-secondary/50 overflow-hidden rounded-lg border p-8 inset-shadow-sm',
        className,
    )}
    bind:this={ref}
    {...restProps}
>
    {#if raw}
        {#await convertArticle()}
            <SkeletonParagraph {raw} />
        {:then article}
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html article}
        {:catch error}
            <h1>Error rendering article</h1>
            <p>{error}</p>
        {/await}
    {:else}
        {@render children?.()}
    {/if}
</svelte:element>
