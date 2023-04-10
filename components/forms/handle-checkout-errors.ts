import ERROR_MESSAGES_CHECKOUT from "./errors";

type Data = {
  error: keyof typeof ERROR_MESSAGES_CHECKOUT;
  message: string;
};

const catchError = (response: Data) => {
  const { error } = response;
  const errorMessage = ERROR_MESSAGES_CHECKOUT[error]?.message || ERROR_MESSAGES_CHECKOUT.SERVER_ERROR.message;
  return errorMessage;
};

export default catchError;

