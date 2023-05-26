import { Router } from "express";
import { loginUser } from "../controllers/userControllers/userControllers.js";
import { validate } from "express-validation";
import { loginSchema } from "../schemas/UserSchemas.js";

const userRouter = Router();

userRouter.post(
  "/login",
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
