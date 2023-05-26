import { Joi } from "express-validation";
import type { UserLoginStructure } from "../../types";

export const loginSchema = {
  body: Joi.object<UserLoginStructure>({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
