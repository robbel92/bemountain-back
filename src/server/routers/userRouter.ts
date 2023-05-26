import { Router } from "express";
import { loginUser } from "../controllers/userControllers/userControllers";
import { validate } from "express-validation";
import { loginSchema } from "../schemas/UserSchemas";

const userRouter = Router();

userRouter.post(
  "/login",
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
