import config from "../../app/config";
import UserModel from "./user.model";


import { TUser } from "./user.interface";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const registerUserToDB = async (data: TUser) => {
  const res = await UserModel.create(data);

  if (!res) {
    throw {
      success: false,
      statusCode: 400,
      message: "Registration failed",
    };
  }
  const payload = {
    _id: res?._id,
    email: res?.email,
    name: res?.name,
    role: res?.role,
  };

  const token = jwtHelpers.generateToken(payload, config.jwt_secret as string, "24h");

  const result = {
    user: {
      _id: res._id,
      username: res?.name,
      email: res?.email,
      role: res?.role,
    },
    token,
  };

  return result;
};

const loginUserToDB = async (data: TUser) => {
  const res = await UserModel.findOne({ email: data?.email });

  if (!res) {
    throw {
      success: false,
      statusCode: 400,
      errorMessage: "User not exist!",
    };
  }

  if (!(await UserModel.isPasswordMatched(data?.password, res?.password))) {
    throw {
      success: false,
      statusCode: 400,
      errorMessage:
        " Your password is wrong! please correct the password and try again!",
    };
  }

  const payload = {
    _id: res._id,
    email: res?.email,
    username: res?.name,
    role: res?.role,
  };
  const token = jwtHelpers.generateToken(payload, config.jwt_secret as string, "24h");
  
  const result = {
    user: {
      _id: res._id,
      username: res?.name,
      email: res?.email,
      role: res?.role,
    },
    token,
  };

  console.log(token, "token ready");

  return result;
};

const getUserToDB = async () => {
  console.log('ksksksks')
  const result = await UserModel.find();
  return result;
};
const UpdateUserToDB = async (email: string, updateData: any) => {
  try {
    // Use the email to find the user and update with the provided data
    const updateResult = await UserModel.updateOne(
      { email },          // Filter to find the document
       updateData  // Update operation
    );

    let result;
    
    if(updateResult?.acknowledged){
       result = await UserModel.findOne({email});
    }

    console.log(updateData)
    console.log(result)
    // Return the result of the update operation
    return result;
  } catch (error) {
    // Handle errors if necessary
    console.error("Error updating user:", error);
    throw error;
  }
};
export const UserServices = {
  registerUserToDB,
  loginUserToDB,
  getUserToDB,
  UpdateUserToDB,
 
};
