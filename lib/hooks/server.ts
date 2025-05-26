import type { Handle } from "@sveltejs/kit";
import prisma from '$server/prisma';

export const handle: Handle = async ({ event: __event__, resolve }) => {
    const session = __event__.cookies.get('session');

    if (!session) return await resolve(__event__);

    const user = await prisma.user.findUnique({
        where: { authToken: session },
        omit: {
            password: true,
            authToken: true
        }
    });

    if (user) {
        __event__.locals.user = user;
    }

    return await resolve(__event__);
}
