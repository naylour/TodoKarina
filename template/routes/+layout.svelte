<script lang="ts" module>
import { ModeWatcher } from 'mode-watcher';
import { Toaster } from '$components/ui/sonner';
</script>

<script lang="ts">
    import "$styles/index.css";
    import { onMount } from 'svelte';
    import { dev } from '$app/environment';

    let { children } = $props();

    onMount(async () => {
        if(dev) {
            (await import('eruda')).default.init()
        }
    })
</script>

<Toaster position="top-center" />
<ModeWatcher />
<div class="max-w-dvw min-h-dvh bg-background" data-vaul-drawer-wrapper>
    {@render children()}
</div>
