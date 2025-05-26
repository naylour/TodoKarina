import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),

    lastName: z.string().min(4, 'Минимум 4 символа'),
    firstName: z.string().min(4, 'Минимум 4 символа'),

    authToken: z.string().nullable(),

    email: z.string().email('Укажите правильный формат почты'),
    password: z.string().min(6, 'Минимальная длина пароля - 6 символов'),

    updatedAt: z.union([z.date(), z.string().date()])
});

export const userDTOSchema = userSchema.omit({
    password: true,
    authToken: true
});

export const signinSchema = userSchema.pick({
    email: true,
    password: true
});

export const signupSchema = z.object({
    lastName: z.string().min(4, 'Минимум 4 символа'),
    firstName: z.string().min(4, 'Минимум 4 символа'),

    authToken: z.string().nullable(),

    email: z.string().email('Укажите правильный формат почты'),
    password: z.string().min(6, 'Минимальная длина пароля - 6 символов'),
    passwordConfirm: z.string().min(6, 'Минимальная длина пароля - 6 символов'),

}).refine(data => data.password === data.passwordConfirm, {
    message: 'Пароли не совпадают',
    path: ['passwordConfirm']
})

export type UserSchema = z.infer<typeof userSchema>;
export type UserDTOSchema = z.infer<typeof userDTOSchema>;
export type SignInSchema = z.infer<typeof signinSchema>;
export type SignUpSchema = z.infer<typeof signupSchema>;
