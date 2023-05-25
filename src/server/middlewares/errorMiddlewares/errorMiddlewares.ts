import chalk from "chalk";
import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";

const debug = createDebug("bemount-api:middlewares:ErrorMiddlewares");

export const notFoundError = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(chalk.redBright("Not found Error"));

  const error = new CustomError(
    "Sorry, endpoint not found, please check it",
    404
  );

  next(error);
};

export const generalErrorMiddleware = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.publicMessage : "General Error";

  res.status(statusCode).json({ message });
};
