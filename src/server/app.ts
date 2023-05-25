import cors from "cors";
import express from "express";
import morgan from "morgan";
import {
  generalErrorMiddleware,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares";

const app = express();

const allowedOrigins = [process.env.LOCAL_ORIGIN!];

app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

app.disable("x-powered-by");
app.use(morgan("dev"));

app.use(notFoundError);
app.use(generalErrorMiddleware);

export default app;
