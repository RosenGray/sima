import z from "zod";


export const RegisterSchema = z.object({
    firstName: z.string().min(1, { message: 'Имя обязательно' }),
    lastName: z.string().min(1, { message: 'Фамилия обязательна' }),
    email: z.string().email({ message: 'Неверный формат электронной почты' }),
    password: z.string({ message: 'Пароль обязательно' }).min(8, { message: 'Пароль должен быть не менее 8 символов' }),
});



export const LoginSchema = z.object({
    email: z.string().email({ message: 'Неверный формат электронной почты' }),
    password: z.string({ message: 'Пароль обязательно' }).min(8, { message: 'Пароль должен быть не менее 8 символов' }),
});

export type UserLogin = z.infer<typeof LoginSchema>;
export type UserRegister = z.infer<typeof RegisterSchema>;