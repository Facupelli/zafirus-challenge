export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const validationErrors = error.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));

    const statusCode = 400;

    return res.status(statusCode).json({
      status: statusCode,
      message: "Invalid input data. Please check the fields.",
      errors: validationErrors,
    });
  }

  next();
};
