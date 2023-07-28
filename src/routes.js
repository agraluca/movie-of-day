import { Router } from "express";
import MovieController from "./app/controllers/MovieController.js";
import { protectedUpdateMovieRoute } from "./app/middlewares/protectedRoute.js";

const routes = Router();

routes.get("/movie", MovieController.showMovieOfDay);

routes.put(
  "/movie",
  protectedUpdateMovieRoute,
  MovieController.updateMovieOfDay
);

export default routes;
