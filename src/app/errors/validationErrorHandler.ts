import mongoose from "mongoose";

const validationErrorHandler = (err: mongoose.Error.ValidationError) => {
  let errorMessage = "";
  let errorDetails: any = [];
  const errorSources = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      errorDetails.push(value);

      return value?.message;
    }
  );
  errorMessage = errorSources.join(" ");
  return {
    success: false,
    message: "Validation Error",
    errorMessage,
    errorDetails,
    stack: null,
  };
};

export default validationErrorHandler;
