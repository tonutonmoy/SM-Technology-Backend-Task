const duplicateErrorHandler = (err: any) => {
  let errorMessage = "";
  let errorDetails: any = [];

  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  errorDetails.push(err);

  errorMessage = `${extractedMessage} is already exists`;

  return {
    success: false,
    message: "Validation Error",
    errorMessage,
    errorDetails,
    stack: null,
  };
};

export default duplicateErrorHandler;
