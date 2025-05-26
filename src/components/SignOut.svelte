<script lang="ts" module>
import { Button } from '$components/ui/button';
import SignOutIcon from '@lucide/svelte/icons/log-out';
</script>

<form action="/signout" method="POST" class="w-full">
    <Button type="submit" variant="outline" class="w-full">
        <SignOutIcon /> <span>Выйти</span>
    </Button>
</form>
