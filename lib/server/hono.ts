import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import prisma from "./prisma";
import { type UserSchema, todoCreateSchema, todoPatchSchema } from "$schemas";
import { zValidator } from '@hono/zod-validator';

const app = new Hono<{ Variables: { user: UserSchema } }>().basePath('/api');

app.use(async (__context__, next) => {
    const session = getCookie(__context__, 'session');

    if (!session) throw __context__.json({ message: 'no' }, 401);

    const user = await prisma.user.findUnique({
        where: { authToken: session }
    });

    if (!user) throw __context__.json({ message: 'no' }, 401);

    __context__.set('user', user);

    await next()
});

app.get('/', async __context__ => {
    return __context__.text('Hello, world!')
})

app.get('/todo', async __context__ => {
    const user = __context__.get('user');

    const todos = await prisma.todo.findMany({
        where: { user: user.id }
    })

    return __context__.json(todos);
});

app.post('/todo', zValidator('form', todoCreateSchema), async __context__ => {
    const data = __context__.req.valid('form');
    const user = __context__.get('user');

    await prisma.todo.create({
        data: {
            title: data.title,
            description: data.description,
            user: user.id
        }
    });

    return __context__.json({ message: 'ok' }, 201);
});
app.patch('/todo/:id', zValidator('json', todoPatchSchema), async __context__ => {
    const data = __context__.req.valid('json');
    const id = __context__.req.param('id')
    const user = __context__.get('user');

    await prisma.todo.update({
        where: { id },
        data
    })

    return __context__.json({ message: 'ok' }, 200);
});
app.delete('/todo/:id', async __context__ => {
    const id = __context__.req.param('id')

    await prisma.todo.delete({
        where: { id },
    })

    return __context__.json({ message: 'ok' }, 200);
});

export default app
