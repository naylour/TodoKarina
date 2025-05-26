<svelte:head>
    <title>Вход</title>
</svelte:head>

<script lang="ts" module>
import * as Form from '$components/ui/form';
import { Input } from '$components/ui/input';
import { Button } from '$components/ui/button';
import { validator } from './signup.schema';
import type { SignUpSchema } from '$schemas';
import { type SuperValidated, superForm } from 'sveltekit-superforms';
import EyeIcon from '@lucide/svelte/icons/eye';
import EyeClosedIcon from '@lucide/svelte/icons/eye-closed';

interface Props {
    data: {
        form: SuperValidated<SignUpSchema>;
    };
}
</script>

<script lang="ts">
    const { data }: Props = $props();

    const form = superForm(data.form, {
        validators: validator,
    });

    const { form: formData, enhance, message } = form;

    let showPasswordState = $state.raw(false);
</script>

<main id="signup" class="w-full p-4">
    <form method="POST" use:enhance class="w-full max-w-[280px] mx-auto flex flex-col gap-1">
        <Form.Field {form} name="lastName">
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label>Фамилия</Form.Label>
                    <Input {...props} bind:value={$formData.lastName} />
                {/snippet}
            </Form.Control>
            <Form.Description>Введите свою фамилию</Form.Description>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="firstName">
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label>Имя</Form.Label>
                    <Input {...props} bind:value={$formData.firstName} />
                {/snippet}
            </Form.Control>
            <Form.Description>Введите своё имя</Form.Description>
            <Form.FieldErrors />
        </Form.Field>
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
        <Form.Field {form} name="passwordConfirm">
            <Form.Control>
                {#snippet children({ props })}
                    <Form.Label>Подтверждение</Form.Label>
                    <Input {...props} type={showPasswordState ? "text" : "password"} bind:value={$formData.passwordConfirm} />
                {/snippet}
            </Form.Control>
            <Form.Description>Подтвердите пароль</Form.Description>
            <Form.FieldErrors />
        </Form.Field>
        <p class="inline-flex gap-2 tex-sm pb-2">
            <span class="text-sm">Уже есть аккаунт?</span> <Button class="inline h-auto p-0 text-sm" variant="link" href="/signin">Войти</Button>
        </p>
        {$message}
        <Button type="submit">Зарегистрироваться</Button>
    </form>
</main>
