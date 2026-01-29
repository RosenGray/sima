import z from "zod";

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

export const RegisterSchema = z
  .object({
    firstName: z
      .string({
        required_error: "Имя обязательно",
      })
      .min(1, { message: "Имя обязательно" }),
    lastName: z
      .string({
        required_error: "Фамилия обязательна",
      })
      .min(1, { message: "Фамилия обязательна" }),
    email: z.string().email({ message: "Неверный формат электронной почты" }),
    password: passwordValidationSchema,
    confirmPassword: z
      .string({
        required_error: "Пожалуйста, подтвердите свой пароль",
      })
      .min(1, { message: "Пожалуйста, подтвердите свой пароль" }),
    acceptMarketing: z.string().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email обязательно",
    })
    .email({ message: "Неверный формат электронной почты" }),
  password: z
    .string({ message: "Пароль обязательно" })
    .min(8, { message: "Пароль должен быть не менее 8 символов" }),
});
export enum UserRole {
  None = 1,
  User,
  Admin,
}

export const SerializedUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  role: z.nativeEnum(UserRole),
  hasPrivateProfessionalPage: z.boolean().optional(),
  isEmailVerified: z.boolean(),
  lastSeenAt: z.string().optional(),
});

export const ResetPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email обязательно",
    })
    .email({ message: "Неверный формат электронной почты" }),
});

export const ResetPasswordConfirmSchema = z
  .object({
    token: z.string({
      required_error: "токен обязательный",
    }),
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

export type UserLogin = z.infer<typeof LoginSchema>;
export type UserRegister = z.infer<typeof RegisterSchema>;
export type SerializedUser = z.infer<typeof SerializedUserSchema>;
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
export type ResetPasswordConfirm = z.infer<typeof ResetPasswordConfirmSchema>;
