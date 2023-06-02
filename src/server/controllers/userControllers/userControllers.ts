import "../../loadEnvironment.js";
import { type Response, type NextFunction } from "express";
import { type UserCredentialsRequest } from "../types";
import User from "../../database/models/User.js";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { responseErrorData } from "../../utils/responseData/responseData.js";

export const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const customError = responseErrorData.wrongCredentials;

      throw customError;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: user.name,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
