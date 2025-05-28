<svelte:head>
    <title>Вход</title>
</svelte:head>

<script lang="ts" module>
import * as Form from '$components/ui/form';
import { Input } from '$components/ui/input';
import { Button } from '$components/ui/button';
import type { SignInSchema } from '$schemas';
import { validator } from './signin.schema';
import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
import EyeIcon from '@lucide/svelte/icons/eye';
import EyeClosedIcon from '@lucide/svelte/icons/eye-closed';

interface Props {
    data: {
        form: SuperValidated<SignInSchema>;
    };
}
</script>

<script lang="ts">
    const { data }: Props = $props();

    const form = superForm(data.form, {
        validators: validator
    });

    const { form: formData, enhance, message } = form;

    let showPasswordState = $state.raw(false);
</script>

<main id="signin" class="w-full p-4">
    <form method="POST" use:enhance class="w-full max-w-[280px] mx-auto flex flex-col gap-1">
        <Form.Field {form} name="email">
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label>Почта</Form.Label>
                    <Input {...props} bind:value={$formData.email} />
                {/snippet}
            </Form.Control>
            <Form.Description>Введите свою почту</Form.Description>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="password">
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label>Пароль</Form.Label>
                    <div class="flex gap-2">
                        <Input {...props} type={showPasswordState ? "text" : "password"} bind:value={$formData.password} />
                        <Button variant="secondary" onclick={() => showPasswordState = !showPasswordState}>
                            {#if showPasswordState}
                                <EyeIcon />
                            {:else}
                                <EyeClosedIcon />
                            {/if}
                        </Button>
                    </div>
                {/snippet}
            </Form.Control>
            <Form.Description>Введите пароль</Form.Description>
            <Form.FieldErrors />
        </Form.Field>
        {#if $message}
            {$message}
        {/if}
        <p class="inline-flex gap-2 tex-sm pb-2">
            <span class="text-sm">Ещё нет аккаунта?</span> <Button class="inline h-auto p-0 text-sm" variant="link" href="/signup">Зарегистрируйтесь</Button>
        </p>
        <Button type="submit">Войти</Button>
    </form>
</main>
