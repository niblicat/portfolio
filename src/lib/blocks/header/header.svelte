<script lang="ts">
    import { isFlexRowWrapped } from '$lib/element-operations';
    import type { StandardProps } from '$lib/utilities/props';
    import { cn } from '$lib/utils';
    import { type Snippet } from 'svelte';

    interface Props extends StandardProps {
        navigation?: Snippet<[boolean]>;
    }

    let {
        navigation,
        class: className,
        ref = $bindable(null),
        children,
        ...restProps
    }: Props = $props();

    let clientWidth = $state(0);

    // true starts the page with drawer, better than showing multiple rows
    let wrapped = $state(true);
    // start with !0 so we can cause potential wrapping, detect it, and then
    // before the DOM updates, we stop the wrapping by showing a smaller navbar
    let lastClientWidth = -5;

    // The below $effect.pre(...) makes sure to set wrapped to false
    // before we evaluate, or else we will be calculating the child sizes
    // using the drawer version of the header
    $effect.pre(() => {
        void clientWidth; // allows us to observe without using

        // only reset wrapped if the page width changed!
        if (clientWidth !== lastClientWidth) {
            wrapped = false;
        }
    });

    $effect(() => {
        void clientWidth; // allows us to observe without using

        if (ref) wrapped = isFlexRowWrapped(ref);
        lastClientWidth = clientWidth;
    });
</script>

<!--
The Header is fixed to the top of the page, anchored to the same position
no matter where you scroll.

Make sure to add padding to the top of the main page content to accomodate
for the initial page appearance, or the top of the page will be hidden by
the header.
-->

<header
    class={cn(
        'bg-primary shadow-primary/50 mx-auto flex h-16 max-w-5xl flex-wrap justify-between gap-4 rounded-lg px-4 py-2 shadow-md sm:px-8',
        className,
    )}
    bind:this={ref}
    bind:clientWidth
    {...restProps}
>
    {@render children?.()}
    {@render navigation?.(wrapped)}
</header>
