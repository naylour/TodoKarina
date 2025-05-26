import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getForm } from "./signup.schema";
import { message } from 'sveltekit-superforms';
import prisma from '$server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
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

        const maybeUser = await prisma.user.findUnique({
            where: {
                email: form.data.email
            }
        });


        if (maybeUser) return message(form, 'Такой пользователь уже существует', {
            status: 409
        });

        console.log(form.data)

        const user = await prisma.user.create({
            data: {
                lastName: form.data.lastName,
                firstName: form.data.firstName,

                email: form.data.email,
                password: await Bun.password.hash(form.data.password, {
                    algorithm: 'argon2id',
                }),
            }
        });

        redirect(303, '/signin');
    }
}
