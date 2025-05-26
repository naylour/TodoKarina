<svelte:head>
    <title>Главная</title>
</svelte:head>

<script lang="ts" module>
import type { TodoAddForm } from './todo.schema';
import type { TodoSchema } from '$schemas';

import { Separator } from '$components/ui/separator';
import { Menu, Todo } from '$components';

import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ru';
import { resource } from 'runed';
import api from '$lib/api';

import { TodoCreate } from '$components';

dayjs.locale('ru');
dayjs.extend(LocalizedFormat);
</script>

<script lang="ts">
    const todos = resource([], async (_, __, { signal }) => {
        const response = await api.get<TodoSchema[]>('todo');

        return await response.json()
    }, { once: true });

    const todoCompleted = $derived((todos.current ?? []).filter(todo => todo.isDone)) ;
    const todoIncomplete = $derived((todos.current ?? []).filter(todo => !todo.isDone));
</script>


<main class="pt-8">
    <div class="flex items-center justify-between">
        <h3 class="text-[36px] font-bold">
            {dayjs().format('MMMM DD, YYYY').toString()}
        </h3>

        <Menu />
    </div>
    <p class="text-[14px] font-semibold text-muted-foreground">
        <span>Завершено: {todoCompleted.length}</span>
        <span>Не завершено: {todoIncomplete.length}</span>
    </p>
    <Separator orientation='horizontal' class="my-4" />

    <TodoCreate oncreate={() => todos.refetch()} />

    <section>
        <h4 class="text-[18px] font-bold">Не завершённые</h4>
        <ul class="flex flex-col gap-2 py-3">
            {#each todoIncomplete as todo(todo.id)}
                <li><Todo {todo} onchecked={() => todos.refetch()} /></li>
            {:else}
            Пусто
        {/each}
    </ul>
    </section>
    <section>
        <h4 class="text-[18px] font-bold">Завершённые</h4>
        <ul class="flex flex-col gap-2 py-3">
            {#each todoCompleted as todo(todo.id)}
                <li><Todo {todo} onchecked={() => todos.refetch()} /></li>
            {:else}
            Пусто
        {/each}
    </ul>
    </section>
</main>
