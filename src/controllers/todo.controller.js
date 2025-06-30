import * as todosService from "../services/todo.service.js";
import { handleResponse } from "../utils/response.utils.js";

export const createTodo = async (req, res, next) => {
  const todoData = req.body;
  const userId = req.user.id;

  try {
    const newTodo = await todosService.createTodo({
      ...todoData,
      userId,
    });
    handleResponse(res, 201, "Todo created successfully", newTodo);
  } catch (err) {
    next(err);
  }
};

export const getAllTodos = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const todos = await todosService.getAllTodos(userId);
    handleResponse(res, 200, "Todos fetched successfully", todos);
  } catch (err) {
    next(err);
  }
};

export const getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const todo = await todosService.getTodoById(id, userId);

    handleResponse(res, 200, "Todo fetched successfully", todo);
  } catch (err) {
    next(err);
  }
};

export const updateTodo = async (req, res, next) => {
  const todoData = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const updatedTodo = await todosService.updateTodo(
      {
        ...todoData,
        id,
      },
      userId
    );

    handleResponse(res, 200, "Todo updated successfully", updatedTodo);
  } catch (err) {
    next(err);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await todosService.deleteTodo(id, userId);

    handleResponse(res, 204, "Todo deleted successfully");
  } catch (err) {
    next(err);
  }
};
