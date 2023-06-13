import { Router } from "express";
import auth from "../middlewares/authMiddleware/authMiddleware.js";
import {
  addRoute,
  getRoute,
  getRoutes,
  modifyRoute,
  removeRoute,
} from "../controllers/routeControllers/routeControllers.js";

const routesRouter = Router();

routesRouter.get("/", auth, getRoutes);
routesRouter.post("/addRoute", auth, addRoute);
routesRouter.put("/modifyRoute", auth, modifyRoute);
routesRouter.get("/:routeId", auth, getRoute);
routesRouter.delete("/:routeId", auth, removeRoute);

export default routesRouter;
