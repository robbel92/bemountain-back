import chalk from "chalk";
import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "../../../CustomError/CustomError.js";
import { ValidationError } from "express-validation";
import { responseErrorData } from "../../utils/responseData/responseData.js";

const debug = createDebug("bemount-api:middlewares:ErrorMiddlewares");

export const notFoundError = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(chalk.redBright("Not found Error"));

  const error = responseErrorData.endpointNotFound;

  next(error);
};

export const generalErrorMiddleware = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ValidationError) {
    const validationErrorMessages = error.details.body
      ?.map((joiError) => joiError.message)
      .join(" & ")
      .replaceAll('"', "");

    (error as CustomError).publicMessage = validationErrorMessages;

    debug(chalk.redBright(validationErrorMessages));
  }

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.publicMessage : error.message;

  res.status(statusCode).json({ message });
};
