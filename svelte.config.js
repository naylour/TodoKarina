import { resolve } from 'node:path';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from 'svelte-adapter-bun';

/** @type {import('@sveltejs/kit').Config} */
export default {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({
            precompress: true,
            development: false,
            out: './build',
        }),

        files: {
            lib: resolve('./lib'),
            appTemplate: resolve('./template/index.html'),
            errorTemplate: resolve('./template/error.html'),
            assets: resolve('./static'),
            hooks: {
                universal: resolve('./lib/hooks/universal.ts'),
                server: resolve('./lib/hooks/server.ts'),
                client: resolve('./lib/hooks/client.ts'),
            },
            params: resolve('./template/params'),
            routes: resolve('./template/routes'),
            serviceWorker: resolve('./src/service.worker.ts'),
        },
        alias: {
            $styles: resolve('./src/styles'),
            $components: resolve('./src/components'),
            $sections: resolve('./src/sections'),
            $lib: resolve('./lib'),
            $entities: resolve('./src/entities'),
            $stores: resolve('./lib/stores'),
            $uihooks: resolve('./lib/uihooks'),
            $utils: resolve('./lib/utils.ts'),
            $schemas: resolve('./lib/schemas'),
            $server: resolve('./lib/server'),
        },
        prerender: {},
        output: {
            bundleStrategy: 'single',
            preloadStrategy: 'modulepreload',
        },
    },
};
