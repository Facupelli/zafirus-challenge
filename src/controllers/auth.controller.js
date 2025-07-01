import * as userService from "../services/user.service.js";
import { hashPassword, comparePassword } from "../utils/password.utils.js";
import { handleResponse } from "../utils/response.utils.js";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/error.utils.js";
import { generateToken } from "../utils/jwt.utils.js";

export const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictError("Email already in use.");
    }

    const passwordHash = await hashPassword(password);
    const newUser = await userService.createUser(email, passwordHash);

    const sanitizedUser = userService.sanitizeUser(newUser);

    handleResponse(res, 201, "User created successfully", sanitizedUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userService.findUserByEmail(email);
    const isMatch = await comparePassword(password, user.password_hash);

    if (!user || !isMatch) {
      throw new UnauthorizedError("Invalid credentials.");
    }

    const token = generateToken(user);

    const sanitizedUser = userService.sanitizeUser(user);

    handleResponse(res, 200, "Login successful", {
      token,
      user: sanitizedUser,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return next(new UnauthorizedError("Invalid credentials."));
    }

    next(error);
  }
};
