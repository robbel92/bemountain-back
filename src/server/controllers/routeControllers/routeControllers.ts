import { type NextFunction, type Request, type Response } from "express";
import Route from "../../database/models/Route.js";
import createDebug from "debug";

const debug = createDebug("bemount-api:controllers:routeControllers");

const getRoutes = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const routes = await Route.find().limit(10).exec();
    res.status(200).json(routes);
  } catch (error) {
    error.message = "Error connecting database to get routes";
    debug(error.message);

    next(error);
  }
};

export default getRoutes;
