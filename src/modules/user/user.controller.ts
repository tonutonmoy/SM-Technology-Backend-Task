
import config from "../../app/config";
import catchAsync from "../../app/config/utlis/catchAsync";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { UserServices } from "./user.services";

const registerUser = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserToDB(req?.body);

  res.send({
    statusCode: 201,
    success: true,

    message: "User registered successfully",
    data: result,
  });
});
const createTrainer = catchAsync(async (req, res) => {
  const result = await UserServices.registerUserToDB(req?.body);

  res.send({
    statusCode: 201,
    success: true,

    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  console.log(req.headers.authorization, "h");
  const result = await UserServices.loginUserToDB(req.body);

  res.send({
    statusCode: 200,
    success: true,

    message: "User login successful",
    data: result,
  });
});


const getUser = catchAsync(async (req, res) => {
 
  const result = await UserServices.getUserToDB();

  res.send({
    statusCode: 200,
    success: true,

    message: "User get successful",
    data: result,
  });
});


const updateUser = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization?.split(' ')[1] as string;

  if (!token) {
    throw new Error("Unauthorized Access");
  }
  const { email } = jwtHelpers.verifyToken(
    token,
    config.jwt_secret as string 
  );

 
  const result = await UserServices.UpdateUserToDB(email,req.body);

  res.send({
    statusCode: 201,
    success: true,

    message: "User update successful",
    data: result,
  });
});


const updateTrainer = catchAsync(async (req, res) => {
 

 
  const result = await UserServices.UpdateTrainerToDB(req?.params?.id,req.body);

  res.send({
    statusCode: 201,
    success: true,

    message: "Trainer update successful",
    data: result,
  });
});

const deleteTrainer = catchAsync(async (req, res) => {
 

 const {_id}= req?.body
  const result = await UserServices.DeleteTrainerToDB(_id);

  res.send({
    statusCode: 203,
    success: true,

    message: "Trainer deleted successful",
    data: result,
  });
});

export const USerControllers = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  createTrainer,
  updateTrainer,
  deleteTrainer
};
