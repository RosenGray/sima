import { IUserDocument } from "../models/User";
import jwt from "jsonwebtoken";


export const jwtSignUser = (user: IUserDocument) => {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        hasPrivateProfessionalPage: user.hasPrivateProfessionalPage,
      },
      process.env.JWT_KEY!
    );
  };
  

