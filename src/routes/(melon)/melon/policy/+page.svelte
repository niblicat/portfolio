<script lang="ts">
    import Article from '$lib/blocks/article.svelte';
    let { data } = $props();
</script>

<Article class="m-4 mx-auto max-w-4xl" raw={data.article} />
