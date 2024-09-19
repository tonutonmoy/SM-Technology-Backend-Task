import { Model, Types } from "mongoose";

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: RoleForUser;
  image?: string;
  country?: string;
  city?: string;
  number?: string;
  bio?: string;
}
export type RoleForUser = "Admin" | "Trainee" | "Trainer";

 



export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
