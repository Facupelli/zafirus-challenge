const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  const statusCode = err.statusCode || 500;

  const payload = {
    success: false,
    message: err.message,
  };

  if (process.env.NODE_ENV === "development") {
    payload.stack = err.stack;
  }

  return res.status(statusCode).json(payload);
};

export default errorHandler;
