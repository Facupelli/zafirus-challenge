import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../validation/auth.validator.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

export default router;
