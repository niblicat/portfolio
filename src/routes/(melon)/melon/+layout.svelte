<script lang="ts">
    import { MyPage } from '$lib/blocks/mypage';
    import Banner from '$lib/blocks/banner.svelte';
    import * as Header from '$lib/blocks/header';
    import { slide } from 'svelte/transition';
    import Footer from '$lib/blocks/footer.svelte';
    import type { ChildrenProps } from '$lib/utilities/props';

    let { children }: ChildrenProps = $props();

    let width = $state(0);
</script>

<svelte:window bind:innerWidth={width} />

{#snippet logo()}
    <div class="recessed max-h-12 max-w-32 rounded-lg p-1">
        <img
            class="object-contain"
            src="/content/images/merge-logo-2.png"
            alt="Melon Merge 3D logo"
        />
    </div>
{/snippet}

{#snippet header()}
    <div class="pointer-events-none fixed top-0 right-0 left-0 p-4" in:slide>
        <Header.Root class="pointer-events-auto">
            <Header.Logo class="text-2xl font-thin sm:text-3xl md:text-4xl">
                {@render logo()}
            </Header.Logo>
            <!-- This allows the header to react to flex row changes -->
            {#snippet navigation(wrapped: boolean)}
                <Header.Nav useDrawer={wrapped} />
            {/snippet}
        </Header.Root>
    </div>
{/snippet}

<Banner image="/content/images/melon-banner.png" />

<MyPage class="flex min-h-lvh w-full scroll-my-24 flex-col pt-24" mainClass="mx-4 md:mx-8" {header}>
    {@render children()}
    {#snippet footer()}
        <Footer />
    {/snippet}
</MyPage>
