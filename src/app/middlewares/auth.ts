import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

import config from "../config";
import catchAsync from "../config/utlis/catchAsync";
import UserModel from "../../modules/user/user.model";

type TRole = "Admin" | "Trainer"|"Trainee";
const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const Btoken = req?.headers?.authorization;
const token = Btoken?.split(' ')[1];

    if (!token) {
      
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
      
      throw {
        success: false,
        statusCode: 400,
        errorMessage: "Unauthorized",
      };
    }

    const { _id, email, username, role, iat } = decoded;

   
    //  role checking
    if (requiredRoles && !requiredRoles.includes(role)) {
      console.log("role match korini");
      throw {
        success: false,
         message: "Unauthorized access.",
         errorDetails: `You must be an ${requiredRoles} to perform this action.`

      };
    }

    // checking  the user is exist
    const user = await UserModel.isUserExistsByCustomId(_id);

    if (!user) {
     
      throw {
        success: false,
        statusCode: 400,
        errorMessage: "Unauthorized",
      };
    }
    
    next();
  });
};

export default auth;
