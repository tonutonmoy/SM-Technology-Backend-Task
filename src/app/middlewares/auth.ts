import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

import config from "../config";
import catchAsync from "../config/utlis/catchAsync";
import UserModel from "../../modules/user/user.model";

type TRole = "Admin" | "Trainer"|"Trainee";
const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;

    if (!token) {
      console.log("token pawa jai ni");
      throw {
        success: false,
        statusCode: 400,
        errorMessage: "Unauthorized",
      };
    }

    let decoded;

    try {
      decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
    } catch (err) {
      console.log("decoded hoini");
      throw {
        success: false,
        statusCode: 400,
        errorMessage: "Unauthorized",
      };
    }

    const { _id, email, username, role, iat } = decoded;

    console.log(role, "role");
    console.log(requiredRoles, "requiredRoles");
    //  role checking
    if (requiredRoles && !requiredRoles.includes(role)) {
      console.log("role match korini");
      throw {
        success: false,
        statusCode: 400,
        errorMessage: "Unauthorized",
      };
    }

    // checking  the user is exist
    const user = await UserModel.isUserExistsByCustomId(_id);

    if (!user) {
      console.log("user nei");
      throw {
        success: false,
        statusCode: 400,
        errorMessage: "Unauthorized",
      };
    }
    console.log("all done");
    next();
  });
};

export default auth;
