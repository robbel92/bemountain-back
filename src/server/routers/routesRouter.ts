import { Router } from "express";
import auth from "../middlewares/authMiddleware/authMiddleware.js";
import getRoutes from "../controllers/routeControllers/routeControllers.js";

const routesRouter = Router();

routesRouter.get("/", auth, getRoutes);

export default routesRouter;
