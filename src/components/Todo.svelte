<script lang="ts" module>
import type { TodoPatchSchema, TodoSchema } from '$schemas';

import * as Drawer from '$components/ui/drawer';
import { Checkbox } from '$components/ui/checkbox';
import { Label } from '$components/ui/label';
import { Button } from '$components/ui/button';
import { Input } from '$components/ui/input';
import { Textarea } from '$components/ui/textarea';

import TrashIcon from '@lucide/svelte/icons/trash';
import OpenIcon from '@lucide/svelte/icons/panel-bottom-open';
import api from '$lib/api';
import { toast } from 'svelte-sonner';

interface Props {
    todo: TodoSchema;
    onchecked?: () => void;
}
</script>

<script lang="ts">
    const uid = $props.id();
    const { todo, onchecked }: Props = $props();
</script>


<div>
    <div class="flex items-start gap-2">
        <Checkbox checked={todo.isDone} onCheckedChange={async checked => {
            const response = await api.patch(`todo/${todo.id}`, {
                json: {
                    isDone: checked
                }
            });

            if(response.ok) {
                toast.success('Поздравляю!');
                onchecked?.();
            }
        }} />
        <Label for="{uid}-todo-{todo.id}" class="flex items-start justify-between w-full">
            <div class="flex flex-col gap-1">
                <h5 class="text-[18px] font-medium">{ todo.title }</h5>
                <p class="line-clamp-1 text-[14px] font-semibold text-muted-foreground text-start">{todo.description}</p>
            </div>
            <Drawer.Root>
                <Drawer.Trigger>
                    {#snippet child({ props })}
                    <Button {...props} variant="secondary" size="sm">
                        <OpenIcon strokeWidth={1.6} />
                    </Button>
                    {/snippet}
                </Drawer.Trigger>
                <Drawer.Content>
                    <form class="px-4 flex flex-col gap-2" onsubmit={async __event__ => {
            __event__.preventDefault();
            __event__.stopPropagation();

            const formData = new FormData(__event__.currentTarget)

            const data = Object.fromEntries(formData.entries()) as TodoPatchSchema;

            if(data.isDone === 'on') data.isDone = true;
            else data.isDone = false;

            const response = await api.patch(`todo/${todo.id}`, {
                json: data
            });

            if(response.status === 201) {
                toast.success('Успешно!')
                onchecked?.();
                __event__.currentTarget?.reset?.();
            } else toast.error('Какая-та ошибка!');
        }}>
            <div class="flex flex-col gap-2">
                <Label for="{uid}-title">Название</Label>
                <Input id="{uid}-title" name="title" value={todo.title} />
            </div>
            <div class="flex flex-col gap-2">
                <Label for="{uid}-description">Описание</Label>
                <Textarea id="{uid}-description" name="description" value={todo.description} />
            </div>
            <div class="flex items-center gap-2">
                <Checkbox id="{uid}-isDone" name="isDone" checked={todo.isDone} />
                <Label for="{uid}-isDone">Описание</Label>
            </div>
            <Button type="submit">Обновить</Button>
        </form>
                    <Drawer.Footer class="grid grid-cols-2 gap-2">
                        <Button variant="destructive" onclick={async () => {
                            const response = await api.delete(`todo/${todo.id}`);

                            if(response.ok) {
                                toast.success('Успешно!');
                                onchecked?.()
                            }
                        }}>
                            <TrashIcon /> Удалить
                        </Button>
                        <Drawer.Close>Закрыть</Drawer.Close>
                    </Drawer.Footer>
                </Drawer.Content>
            </Drawer.Root>
        </Label>
    </div>
</div>
