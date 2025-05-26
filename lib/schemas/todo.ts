import { z } from "zod";

export const todoSchema = z.object({
    id: z.string().ulid(),

    title: z.string(),
    description: z.string().nullable(),

    isDone: z.boolean(),
    user: z.string().ulid(),
    updatedAt: z.union([z.string().date(), z.date()])
});

export const todoCreateSchema = todoSchema.omit({
    isDone: true,
    updatedAt: true,
    id: true,
    user: true
});

export const todoPatchSchema = todoSchema.pick({
    isDone: true,
    title: true,
    description: true
}).partial();

export type TodoSchema = z.infer<typeof todoSchema>;
export type TodoCreateSchema = z.infer<typeof todoCreateSchema>;
export type TodoPatchSchema = z.infer<typeof todoPatchSchema>;
