import { Router } from "express";
import auth from "../middlewares/authMiddleware/authMiddleware.js";
import {
  addRoute,
  getRoutes,
  removeRoute,
} from "../controllers/routeControllers/routeControllers.js";

const routesRouter = Router();

routesRouter.get("/", auth, getRoutes);
routesRouter.post("/addRoute", auth, addRoute);
routesRouter.delete("/:routeId", auth, removeRoute);

export default routesRouter;
