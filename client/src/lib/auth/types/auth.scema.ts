import z from "zod";
import { zfd } from "zod-form-data";


export const RegisterSchema = zfd.formData({
    firstName: zfd.text(z.string({ message: 'Имя обязательно' }).min(1, { message: 'Имя обязательно' })),
    lastName: zfd.text(z.string({}).min(1, { message: 'Фамилия обязательна' })),
    email: zfd.text(z.email({ message: 'Неверный формат электронной почты' })),
    password: zfd.text(z.string({ message: 'Пароль обязательно' }).min(8, { message: 'Пароль должен быть не менее 8 символов' })),
});


export type RegisterSchema = z.infer<typeof RegisterSchema>;