import "../../loadEnvironment.js";
import createDebug from "debug";
import jwt from "jsonwebtoken";
import chalk from "chalk";
import { type CustomRequest } from "../../controllers/types";
import { type NextFunction, type Response } from "express";
import { responseErrorData } from "../../utils/responseData/responseData.js";

const jwtSecretKey = process.env.JWT_SECRET!;

const debug = createDebug("bemount-api:authMiddleware");

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.includes("Bearer")) {
      debug(chalk.redBright("Missing token or not valid format"));
      const error = responseErrorData.missingToken;
      throw error;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const payload = jwt.verify(token, jwtSecretKey);

    const userId = payload.sub as string;

    req.userId = userId;

    next();
  } catch (error: unknown) {
    const customError =
      (error as Error).name === "JsonWebTokenError"
        ? responseErrorData.notValidToken
        : error;

    next(customError);
  }
};

export default auth;
