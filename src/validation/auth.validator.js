import Joi from "joi";

// one uppercase letter, one lowercase letter and one number
const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$";

const passwordSchema = Joi.string()
  .min(8)
  .pattern(new RegExp(passwordRegex), "password complexity")
  .required()
  .messages({
    "string.min": "Password must be at least 8 characters long.",
    "string.pattern.name":
      "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    "any.required": "Password is required.",
  });

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),
  password: passwordSchema,
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required.",
  }),
});
