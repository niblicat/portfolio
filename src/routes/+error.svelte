<script lang="ts">
    import { MyPage } from '$lib/blocks/mypage';
    import { page } from '$app/state';
    import { browser } from '$app/environment';
    import Button from '$lib/components/ui/button/button.svelte';
    import Article from '$lib/blocks/article.svelte';

    const numErrorKey = 'numErrors';
    const numErrors: number =
        (() => {
            if (!browser) return 0; // ssr case

            const val = Number(localStorage.getItem(numErrorKey));

            return isNaN(val) ? 0 : val < 0 ? 0 : val;
        })() + 1;

    const errorMessage = $state(
        (async () => {
            const messages: string[] = [
                'Oops! Looks like something went wrong.',
                "Lookin' a bit empty around here.",
                "Jeez, that's unfortunate.",
                "That doesn't look good.",
                "Uh oh. That's too bad.",
                'What have you done?',
                "Don't do it again!",
                'Stop that!',
                ':(',
                'insert error message here',
                'Sorry.',
                'I give up.'
            ];

            const length = messages.length;

            if (length === 0) return 'Bingus';
            else if (numErrors >= messages.length) return messages[length - 1];
            else if (numErrors < 0) return messages[length - 1];
            else return messages[numErrors - 1];
        })()
    );

    if (browser) {
        localStorage.setItem(numErrorKey, numErrors.toString());
    }
</script>

<svelte:head>
    <title>{page.status} Error</title>
</svelte:head>

<MyPage class="flex min-h-lvh w-full flex-col" mainClass="mx-4 md:mx-8">
    <Article class="m-4 mx-auto max-w-4xl text-center" tag="main">
        <h1>{page.status}: {page.error?.message}</h1>
        {#await errorMessage then message}
            <p>{message}</p>
        {/await}

        {#if numErrors >= 16}
            <p>
                Number of times you've seen this page:
                <span class="text-foreground font-stretch-200%">
                    {numErrors}
                </span>
            </p>
        {/if}

        <img
            class="mx-auto rounded-lg object-contain"
            src="/content/images/molly.jpg"
            alt="A befuzzled muppet cat"
        />

        <Button variant="link" href="/">Home</Button>
    </Article>
</MyPage>
