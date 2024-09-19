import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import zodErrorHandler from "./zodErrorHandler";
import validationErrorHandler from "./validationErrorHandler";
import castErrorHandler from "./castErrorHandler";
import duplicateErrorHandler from "./duplicateErrorHandler";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    const response = zodErrorHandler(err);

    return res.send(response);
  } else if (err?.name === "ValidationError") {
    const response = validationErrorHandler(err);

    return res.send(response);
  } else if (err?.name === "CastError") {
    const response = castErrorHandler(err);

    return res.send(response);
  } else if (err?.code === 11000) {
    const response = duplicateErrorHandler(err);
    return res.send(response);
  }

  res.send(err);
};

export default globalErrorHandler;
