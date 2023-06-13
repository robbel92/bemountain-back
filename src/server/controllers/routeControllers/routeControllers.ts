import { type NextFunction, type Response } from "express";
import Route from "../../database/models/Route.js";
import createDebug from "debug";
import {
  type CustomRequestQuerys,
  type CustomParamsRequest,
  type CustomRequestAdd,
} from "../types.js";
import { Types } from "mongoose";
import chalk from "chalk";
import CustomError from "../../../CustomError/CustomError.js";

const debug = createDebug("bemount-api:controllers:routeControllers");

export const getRoutes = async (
  req: CustomRequestQuerys,
  res: Response,
  next: NextFunction
) => {
  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);
  const { filter } = req.query;
  const { filterValue } = req.query;

  try {
    if (filter) {
      const routes = await Route.find({ [filter]: filterValue })
        .skip(skip)
        .limit(limit)
        .exec();
      const totalRoutes = await Route.where({
        [filter]: filterValue,
      })
        .countDocuments()
        .exec();

      res.status(200).json({ routes, totalRoutes });
    } else {
      const routes = await Route.find()
        .skip(skip)
        .limit(limit)
        .sort({ _id: -1 })
        .exec();
      const totalRoutes = await Route.where().countDocuments().exec();
      res.status(200).json({ routes, totalRoutes });
    }
  } catch (error) {
    error.message = "Error connecting database to get routes";
    debug(error.message);

    next(error);
  }
};

export const removeRoute = async (
  req: CustomParamsRequest,
  res: Response,
  next: NextFunction
) => {
  const { routeId } = req.params;

  try {
    const route = await Route.findById(routeId).exec();

    if (!route) {
      throw new CustomError("The route you want to delete, doesn't exist", 404);
    }

    await Route.findByIdAndDelete(routeId).exec();

    res
      .status(200)
      .json({ message: "The route has been successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const addRoute = async (
  req: CustomRequestAdd,
  res: Response,
  next: NextFunction
) => {
  const { userId, body } = req;
  try {
    const routeAdded = await Route.create({
      ...body,
      author: new Types.ObjectId(userId),
    });

    res.status(200).json({ route: routeAdded });
  } catch (error: unknown) {
    debug(chalk.redBright((error as Error).message));
    (error as Error).message = "Could not add the desired route";
    next(error);
  }
};

export const getRoute = async (
  req: CustomParamsRequest,
  res: Response,
  next: NextFunction
) => {
  const { routeId } = req.params;

  try {
    const route = await Route.findById(routeId).exec();

    res.status(200).json({ route });
  } catch (error: unknown) {
    debug(chalk.redBright((error as Error).message));
    (error as Error).message = "Could not give the desired route";
    next(error);
  }
};
