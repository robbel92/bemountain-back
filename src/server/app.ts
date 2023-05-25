import "./loadEnvironment.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import {
  generalErrorMiddleware,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import pingController from "./controllers/pingController/pingController.js";
import { loginUser } from "./controllers/userControllers/userControllers.js";
import { validate } from "express-validation";
import { loginSchema } from "./schemas/UserSchemas.js";

const app = express();

const allowedOrigins = [process.env.LOCAL_ORIGIN!];

app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

app.disable("x-powered-by");
app.use(morgan("dev"));

app.get("/", pingController);

app.post("/login", validate(loginSchema, {}, { abortEarly: false }), loginUser);

app.use(notFoundError);
app.use(generalErrorMiddleware);

export default app;
