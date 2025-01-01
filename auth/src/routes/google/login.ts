// import express, { Request, Response } from "express";
// import { body } from "express-validator";
// import jwt from "jsonwebtoken";
// // import { PasswordManager } from "../services/PasswordManager";
// // import { User } from "../models/User";

// import { BadRequestError, validateRequest } from "@sima-board/common";

// const router = express.Router();

// router.post(
//   "/api/google/signin",
//   [
//     body("email")
//       .isEmail()
//       .withMessage("Электронная почта должна быть действующей"),
//     body("password").trim().notEmpty().withMessage("вы должны указать пароль"),
//   ],
//   validateRequest,
//   async (req: Request, res: Response) => {
//     const { email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (!existingUser) {
//       throw new BadRequestError("Неверные данные");
//     }

//     const passwordsMatch = await PasswordManager.compare(
//       existingUser.password,
//       password
//     );
//     if (!passwordsMatch) {
//       throw new BadRequestError("Неверные данные");
//     }

//     // Generate JWT
//     const userJwt = jwt.sign(
//       {
//         id: existingUser.id,
//         email: existingUser.email,
//       },
//       process.env.JWT_KEY!
//     );

//     // Store it on session object
//     req.session = {
//       jwt: userJwt,
//     };

//     res.status(200).send(existingUser);
//   }
// );

// export default router;
