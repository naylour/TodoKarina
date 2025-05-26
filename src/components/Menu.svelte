<script lang="ts" module>
import * as Dropdown from '$components/ui/dropdown-menu';
import { Button } from '$components/ui/button';

import MenuIcon from '@lucide/svelte/icons/menu';
import UserIcon from '@lucide/svelte/icons/user';
import SignOut from './SignOut.svelte';
</script>

<script lang="ts">

</script>

<Dropdown.Root>
    <Dropdown.Trigger>
        {#snippet child({ props })}
            <Button {...props} variant="outline">
                <MenuIcon />
            </Button>
        {/snippet}
    </Dropdown.Trigger>

    <Dropdown.Content align="end">
        <!-- <Dropdown.Group>

        </Dropdown.Group> -->
        <Dropdown.Group>
            <Dropdown.Label>
                Аккаунт
            </Dropdown.Label>
            <Dropdown.Separator />
            <Dropdown.Item>
                {#snippet child({ props })}
                    <a {...props}  href="/profile">
                        <UserIcon />
                        <span>Профиль</span>
                    </a>
                {/snippet}
            </Dropdown.Item>
            <Dropdown.Item >
                <SignOut />
            </Dropdown.Item>
        </Dropdown.Group>
    </Dropdown.Content>
</Dropdown.Root>
