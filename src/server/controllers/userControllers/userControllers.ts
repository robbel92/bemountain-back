import { type Response, type NextFunction } from "express";
import { type UserCredentialsRequest } from "../types";
import User from "../../database/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "../../../CustomError/CustomError";

export const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError(
        "Wrong credentials please,check it",
        401
      );

      throw customError;
    }

    const tokenPaylod = {
      sub: user._id.toString(),
      name: user.username,
      exp: "1d",
    };

    const token = jwt.sign(tokenPaylod, process.env.JWT_SECRET!);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
