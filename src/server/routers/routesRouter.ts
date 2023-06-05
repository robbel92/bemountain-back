import { Router } from "express";
import auth from "../middlewares/authMiddleware/authMiddleware.js";
import {
  getRoutes,
  removeRoute,
} from "../controllers/routeControllers/routeControllers.js";

const routesRouter = Router();

routesRouter.get("/", auth, getRoutes);
routesRouter.delete("/:routeId", removeRoute);

export default routesRouter;
