import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../controllers/todo.controller.js";
import { validate } from "../middlewares/validator.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validation/todo.validator.js";

const router = express.Router();

router.use(protect);

router.post("/", validate(createTodoSchema), createTodo);
router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.put("/:id", validate(updateTodoSchema), updateTodo);
router.delete("/:id", deleteTodo);

export default router;
