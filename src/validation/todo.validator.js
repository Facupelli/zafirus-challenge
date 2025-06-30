import Joi from "joi";

export const createTodoSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().optional(),
  limitDate: Joi.date().iso().optional(),
  status: Joi.string()
    .valid("pending", "in_progress", "completed")
    .default("pending")
    .optional(),
});

export const updateTodoSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().allow(""),
  limitDate: Joi.date().iso().allow(null),
  status: Joi.string().valid("pending", "in_progress", "completed"),
}).min(1);
