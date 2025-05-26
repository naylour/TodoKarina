import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    redirect(302, '/');
};

export const actions: Actions = {
    default: async ({ cookies }) => {
        cookies.delete('session', {
            path: '/'
        });

        redirect(302, '/signin');
    }
}
