<script lang="ts" module>
import * as Drawer from '$components/ui/drawer';
import { Button } from '$components/ui/button';
import { Input } from '$components/ui/input';
import { Label } from '$components/ui/label';
import { Textarea } from '$components/ui/textarea';

import PlusIcon from '@lucide/svelte/icons/plus';
import api from '$lib/api';
import { toast } from 'svelte-sonner';

interface Props {
    oncreate?: () => void;
}
</script>

<script lang="ts">
    const uid = $props.id();
    const { oncreate }: Props = $props();

    let isOpen = $state.raw(false)
</script>

<Drawer.Root bind:open={isOpen} setBackgroundColorOnScale>
    <Drawer.Trigger class="fixed bottom-4 right-4 rounded-full h-auto aspect-square">
        {#snippet child({ props })}
            <Button {...props} size="lg" >
                <PlusIcon />
            </Button>
        {/snippet}
    </Drawer.Trigger>

    <Drawer.Content>
        <Drawer.Header>
            <Drawer.Title class="text-[28px] font-bold">
                Добавить задачу
            </Drawer.Title>
        </Drawer.Header>

        <form class="px-4 flex flex-col gap-2" onsubmit={async __event__ => {
            __event__.preventDefault();
            __event__.stopPropagation();

            const formData = new FormData(__event__.currentTarget)

            const response = await api.post('todo', {
                body: formData
            });

            if(response.status === 201) {
                toast.success('Успешно!')
                oncreate?.();
                __event__.currentTarget?.reset?.();
                isOpen = false;
            } else toast.error('Какая-та ошибка!');
        }}>
            <div class="flex flex-col gap-2">
                <Label for="{uid}-title">Название</Label>
                <Input id="{uid}-title" name="title" />
            </div>
            <div class="flex flex-col gap-2">
                <Label for="{uid}-description">Описание</Label>
                <Textarea id="{uid}-description" name="description" />
            </div>
            <Button type="submit">Добавить</Button>
        </form>
        <Drawer.Footer>
            <Drawer.Close>Закрыть</Drawer.Close>
        </Drawer.Footer>
    </Drawer.Content>
</Drawer.Root>
