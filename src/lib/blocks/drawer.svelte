<script lang="ts">
    import Button, { buttonVariants } from '$lib/components/ui/button/button.svelte';
    import * as Drawer from '$lib/components/ui/drawer/index.js';
    import { NavItemKind, type NavItem } from '../structures/nav';
    import { Menu } from '@lucide/svelte';

    interface Props {
        navItems: NavItem[];
    }

    let { navItems }: Props = $props();

    let open = $state(false);
</script>

<Drawer.Root bind:open>
    <Drawer.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
        <Menu />
    </Drawer.Trigger>
    <Drawer.Content>
        <nav class="xs:mx-auto mx-4 mt-4">
            {#each navItems as item (item.title)}
                <div class="py-4 text-2xl font-light font-stretch-200%">
                    {item.title}
                </div>
                <div class="flex flex-wrap justify-around gap-2">
                    {#if item.kind === NavItemKind.Content}
                        <!-- Display a header with buttons -->
                        {#each item.contents as content (content.name)}
                            <Button size="sm" class="min-w-[calc(50%-0.5rem)]" href={content.href}>
                                {content.name}
                            </Button>
                        {/each}
                    {:else if item.kind === NavItemKind.Link}
                        <!-- Display header with singular button -->
                        <!-- TODO: Fix subsequent redirects once ID is set -->
                        <Drawer.Close class="min-w-full">
                            <Button size="sm" class="min-w-full" href={item.href}>
                                {item.title}
                            </Button>
                        </Drawer.Close>
                    {/if}
                </div>
            {/each}
        </nav>
        <Drawer.Footer>
            <Drawer.Close class={buttonVariants({ variant: 'outline' })}>Back</Drawer.Close>
        </Drawer.Footer>
    </Drawer.Content>
</Drawer.Root>
