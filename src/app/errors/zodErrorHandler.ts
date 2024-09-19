import { ZodError, ZodIssue } from "zod";

const zodErrorHandler = (err: ZodError) => {
  let errorMessage = "";
  let errorDetails: any = [];

  const errorSources = err.issues.map((issue: ZodIssue) => {
    errorDetails.push(issue);
    let message = `${issue?.path[issue?.path?.length - 1]} ${
      issue?.message
    } . `;

    return message;
  });

  errorMessage = errorSources.join(" ");

  return {
    success: false,
    message: "Validation Error",
    errorMessage,
    errorDetails,
    stack: null,
  };
};

export default zodErrorHandler;
