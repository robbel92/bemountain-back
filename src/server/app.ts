import "./loadEnvironment.js";
import "dotenv/config.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import {
  generalErrorMiddleware,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import pingController from "./controllers/pingController/pingController.js";
import userRouter from "./routers/userRouter.js";
import routesRouter from "./routers/routesRouter.js";

const app = express();

const allowedOrigins = [
  process.env.LOCAL_ORIGIN!,
  process.env.REMOTE_ORIGIN!,
  process.env.LOCAL_ORIGIN_PREVIEW!,
];

app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

app.disable("x-powered-by");
app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/routes", routesRouter);
app.get("/", pingController);
app.use(pingController);
app.use(notFoundError);
app.use(generalErrorMiddleware);

export default app;
