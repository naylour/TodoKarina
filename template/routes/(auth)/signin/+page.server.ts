import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getForm } from "./signin.schema";
import prisma from '$server/prisma';
import { message } from "sveltekit-superforms";
import { dev } from "$app/environment";

export const load: PageServerLoad = async ({ locals, cookies }) => {
    if (locals.user) redirect(302, '/');

    return {
        form: await getForm()
    }
};


export const actions: Actions = {
    default: async (__event__) => {
        const form = await getForm(__event__);

        if (!form.valid) return fail(400, {
            form
        });

        const user = await prisma.user.findUnique({
            where: { email: form.data.email }
        });

        if (!user) return message(form, 'Такой пользователь не найден', {
            status: 404
        });

        const isPasswordValid = await Bun.password.verify(form.data.password, user.password);

        if (!isPasswordValid) return message(form, 'Неправильная почта или пароль!', {
            status: 401
        });

        const securedUser = await prisma.user.update({
            where: { id: user.id },
            data: { authToken: Bun.randomUUIDv7('hex') }
        });

        __event__.cookies.set('session', securedUser.authToken as string, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: !dev,
            maxAge: 60 * 60 * 24 * 14,
        });


        redirect(302, '/');
    }
}
