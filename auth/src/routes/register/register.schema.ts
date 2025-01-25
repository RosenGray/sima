import { body } from "express-validator";

export const passwordValidationChain = body("password")
  .trim()
  .notEmpty()
  .withMessage("пароль обязательный")
  .isLength({ min: 8, max: 20 })
  .withMessage("8-20 символов")
  .custom((value) => {
    if (!(/[a-zA-Z]/.test(value) && /\d/.test(value))) {
      throw new Error("одну букву (на английском) и одну цифру");
    }
    return true;
  });

export const registerSchema = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("Имя не может быть пустым")
    .custom((value) => {
      if (/\d/.test(value)) {
        throw new Error("Имя не должно содержать цифры");
      }
      return true;
    }),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Фамилия не может быть пустой")
    .custom((value) => {
      if (/\d/.test(value)) {
        throw new Error("Фамилия не должна содержать цифры");
      }
      return true;
    }),
  body("email")
    .isEmail()
    .withMessage("Введите корректный адрес электронной почты")
    .normalizeEmail(),
  passwordValidationChain,
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Пожалуйста, подтвердите свой пароль")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Пароли не совпадают");
      }
      return true;
    }),
];
