<script lang="ts">
    import { DarkLight } from '$lib/components/ui/darklight';
    import Drawer from '$lib/blocks/drawer.svelte';
    import Navigation from '$lib/blocks/navigation.svelte';
    import type { StandardProps } from '$lib/utilities/props';
    import { cn } from '$lib/utils';
    import { type Snippet } from 'svelte';
    import type { NavItem } from '$lib/structures/nav';

    interface Props extends StandardProps {
        darkLight?: Snippet;
        drawer?: Snippet;
        navigation?: Snippet;
        navItems?: NavItem[];
        useDrawer?: boolean;
    }

    let {
        drawer,
        children,
        class: className,
        darkLight,
        navigation,
        navItems = [],
        ref = $bindable(null),
        useDrawer = $bindable(false),
        ...restProps
    }: Props = $props();
</script>

<!--
Header Nav adds a navigation bar and drawer to the header. By default, it
provides these for you. However, you can specify a navigation bar and drawer
to use if you desire.

When the viewport's width becomes small, the navigation bar will be
replaced with the drawer.
-->

<!-- Directory and Navigation -->
<div class={cn('flex items-center justify-end gap-2', className)} {...restProps}>
    {@render children?.()}
    {#if useDrawer}
        {#if drawer}
            {@render drawer()}
        {:else}
            <Drawer {navItems} />
        {/if}
    {:else if navigation}
        {@render navigation()}
    {:else}
        <Navigation {navItems} />
    {/if}

    {#if darkLight}
        {@render darkLight()}
    {:else}
        <DarkLight />
    {/if}
</div>
