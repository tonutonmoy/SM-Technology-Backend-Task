import mongoose from "mongoose";

const castErrorHandler = (err: mongoose.Error.CastError) => {
  console.log(err);
  let errorMessage = "";
  let errorDetails: any = [];
  let stack = null;

  errorDetails.push(err);
  stack = err.message;
  errorMessage = `${err.value} is not a valid ID!`;

  return {
    success: false,
    message: "Invalid ID",
    errorMessage,
    errorDetails,
    stack,
  };
};

export default castErrorHandler;
