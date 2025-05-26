<script lang="ts" module>
import SunIcon from '@lucide/svelte/icons/sun';
import MoonIcon from '@lucide/svelte/icons/moon';
import SystemIcon from '@lucide/svelte/icons/sun-moon';

import * as Dropdown from '$components/ui/dropdown-menu';

import { resetMode, setMode, userPrefersMode } from 'mode-watcher';
</script>

<script lang="ts">

</script>

<Dropdown.Root>
    <Dropdown.Trigger>
        {#if userPrefersMode.current == 'dark'}
            <MoonIcon size={30} strokeWidth={1.4} />
        {:else if userPrefersMode.current === 'light'}
            <SunIcon size={30} strokeWidth={1.4} />
        {:else}
            <SystemIcon size={30} strokeWidth={1.4} />
        {/if}
    </Dropdown.Trigger>

    <Dropdown.Content align="end">
        <Dropdown.Label>Сменить тему</Dropdown.Label>
        <Dropdown.Item onclick={() => setMode('light')}>
            <SunIcon />
            Светлая
        </Dropdown.Item>
        <Dropdown.Item onclick={() => setMode('dark')}>
            <MoonIcon />
            Тёмная
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item onclick={() => resetMode()}>
            <SystemIcon />
            Системная
        </Dropdown.Item>
    </Dropdown.Content>
</Dropdown.Root>
