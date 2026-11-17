import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type UserConfig } from 'vite';

export default defineConfig({
    plugins: [tailwindcss(), sveltekit()],
}) satisfies UserConfig;
