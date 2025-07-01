import express from "express";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";
import configurePassport from "./config/passport.js";
import todoRouter from "./routes/todo.route.js";
import authRouter from "./routes/auth.route.js";
import errorHandler from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(passport.initialize());
configurePassport();

app.use("/api/todo", todoRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
