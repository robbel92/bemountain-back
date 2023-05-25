import cors from "cors";
import express from "express";

const app = express();

const allowedOrigins = [process.env.LOCAL_ORIGIN!];
app.use(cors({ origin: allowedOrigins }));

export default app;
