import { type NextFunction, type Request, type Response } from "express";
import Route from "../../database/models/Route.js";
import createDebug from "debug";
import { type CustomParamsRequest } from "../types.js";

const debug = createDebug("bemount-api:controllers:routeControllers");

export const getRoutes = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const routes = await Route.find().limit(10).exec();
    res.status(200).json(routes);
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
    const indexRouteId = await Route.findById(routeId).exec();

    if (indexRouteId) {
      await Route.findByIdAndDelete(routeId).exec();
      res
        .status(200)
        .json({ message: "The route has been successfully deleted" });
    } else {
      res
        .status(404)
        .json({ message: "The route you want to delete does not exist" });
    }
  } catch (error) {
    error.message = "Error connecting database to remove route";

    next(error);
  }
};
