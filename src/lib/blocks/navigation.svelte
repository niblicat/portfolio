<script lang="ts">
    import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
    import { NavItemKind, type NavContent, type NavItem } from '../structures/nav';
    import { buttonVariants } from '$lib/components/ui/button';

    interface Props {
        navItems: NavItem[];
    }

    let { navItems }: Props = $props();

    let root: HTMLElement | null = $state(null);
    let rootClass = $state('');

    // https://tailwindcss.com/docs/detecting-classes-in-source-files#dynamic-class-names
    const contentSize = $state(300);
    const contentSizeClass = $state('w-[300px]');

    function adjustSpacing(itemID: string): void {
        if (!root) return;

        console.log(itemID);

        const rect = root.getBoundingClientRect();
        const selectedItemElement = document.getElementById(itemID);

        if (!selectedItemElement) return;

        const currentRect = selectedItemElement.getBoundingClientRect();

        const center = (currentRect.left + currentRect.right) / 2;
        const halfContentSize = contentSize / 2;

        const contentLeft = center - halfContentSize;
        // relativeToNavLeft of 0 is the start of the nav menu
        const relativeToNavLeft = contentLeft - rect.left;

        if (relativeToNavLeft < 0) {
            rootClass = '[&_div.absolute]:right-auto [&_div.absolute]:left-0';
        } else if (center + halfContentSize > rect.right) {
            rootClass = '[&_div.absolute]:left-auto [&_div.absolute]:right-0';
        } else {
            // set the position relative centered to the nav item
            rootClass = `[&_div.absolute]:right-auto [&_div.absolute]:left-[${relativeToNavLeft}px]`;
        }
    }
</script>

{#snippet ListLink(content: NavContent)}
    <NavigationMenu.Link href={content.href}>
        <p class="font-medium">{content.name}</p>
        <p class="text-muted-foreground">{content.description}</p>
    </NavigationMenu.Link>
{/snippet}

{#snippet ListContent(contents: NavContent[])}
    <NavigationMenu.Content>
        <ul class="grid {contentSizeClass} gap-4 p-2">
            {#each contents as content (content.name)}
                <li>
                    {@render ListLink(content)}
                </li>
            {/each}
        </ul>
    </NavigationMenu.Content>
{/snippet}

{#snippet ListItem(item: NavItem)}
    <NavigationMenu.Item>
        {#if item.kind === NavItemKind.Content}
            <NavigationMenu.Trigger class={buttonVariants({ variant: 'outline' })}>
                {item.title}
            </NavigationMenu.Trigger>
            {@render ListContent(item.contents)}
        {:else if item.kind === NavItemKind.Link}
            <NavigationMenu.Link>
                {#snippet child()}
                    <a href={item.href} class={buttonVariants({ variant: 'outline' })}
                        >{item.title}</a
                    >
                {/snippet}
            </NavigationMenu.Link>
        {/if}
    </NavigationMenu.Item>
{/snippet}

<NavigationMenu.Root
    onValueChange={adjustSpacing}
    class={rootClass}
    bind:ref={root}
    viewport={true}
>
    <NavigationMenu.List class="flex flex-wrap gap-2">
        {#each navItems as item (item.title)}
            {@render ListItem(item)}
        {/each}
    </NavigationMenu.List>
</NavigationMenu.Root>
