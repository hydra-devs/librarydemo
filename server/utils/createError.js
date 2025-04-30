export const createError = (msg, status = 500, message = "") => {
  const error = new Error(message);
  error.msg = msg;
  error.status = status;
  return error;
};
