import { z } from "zod";

export const ContactUsSchema = z.object({
  name: z
    .string({
      required_error: "Имя обязательно",
    })
    .min(1, { message: "Имя обязательно" }),
  email: z
    .string({
      required_error: "Email обязательно",
    })
    .email({ message: "Неверный формат электронной почты" }),
  subject: z.string().optional(),
  message: z
    .string({
      required_error: "Сообщение обязательно",
    })
    .min(10, { message: "Сообщение должно содержать не менее 10 символов" }),
});

export type ContactUsFormData = z.infer<typeof ContactUsSchema>;
