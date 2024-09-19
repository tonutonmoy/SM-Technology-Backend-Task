import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";

import bcrypt from "bcrypt";
import config from "../../app/config";

const userSchema = new Schema<TUser, UserModel>({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, default:"not available" },
  country: { type: String , default:"not available"},
  city: { type: String, default:"not available" },
  number: { type: String, default:"not available" },
  bio: { type: String, default:"not available" },
});

userSchema.pre("save", async function (next) {
  const user = this;

  const hashPassword = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  user.password = hashPassword;

  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await UserModel.findOne({ _id: id });
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

const UserModel = model<TUser, UserModel>("User", userSchema);

export default UserModel;
