import { z } from "zod";

const passwordValidationSchema = z
  .string({
    required_error: "пароль обязательный",
  })
  .min(8, "8-20 символов")
  .max(20, "8-20 символов")
  .refine(
    (val) => /[a-zA-Z]/.test(val) && /\d/.test(val),
    "одну букву (на английском) и одну цифру"
  );

export const registerSchema = z
  .object({
    firstName: z
      .string({
        required_error: "Имя не может быть пустым",
      })
      .min(1)
      .refine((val) => !/\d/.test(val), "Имя не должно содержать цифры"),
    lastName: z
      .string({
        required_error: "Фамилия не может быть пустой",
      })
      .min(1)
      .refine((val) => !/\d/.test(val), "Фамилия не должна содержать цифры"),
    email: z
      .string({
        required_error: "электронное почта обязательная",
      })
      .email("Введите корректный адрес электронной почты"),
    password: passwordValidationSchema,
    confirmPassword: z.string({
      required_error: "Пожалуйста, подтвердите свой пароль",
    }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Пароли не совпадают",
      path: ["confirmPassword"],
    }
  );

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "электронное почта обязательная",
    })
    .email("Введите корректный адрес электронной почты"),
  password: z.string({
    required_error: "пароль обязательный",
  }),
});

export const resetPasswordSchema = z.object({
  email: z
    .string({
      required_error: "электронное почта обязательная",
    })
    .email("Введите корректный адрес электронной почты"),
});

export const resetPasswordConfirmSchema = z.object({
  token: z.string({
    required_error: "токен обязательный",
  }),
  password: passwordValidationSchema,
  confirmPassword: z.string({
    required_error: "Пожалуйста, подтвердите свой пароль",
  }),
}).refine(
  (data) => {
    return data.password === data.confirmPassword;
  },
  {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  }
);
