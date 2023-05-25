import cors from "cors";
import express from "express";

const app = express();

const allowedOrigins = [process.env.LOCAL_ORIGIN!];

app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

app.disable("x-powered-by");

export default app;
