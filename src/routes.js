import { Router } from "express";
import MovieController from "./app/controllers/MovieController.js";
import { protectedUpdateMovieRoute } from "./app/middlewares/protectedRoute.js";
import GameController from "./app/controllers/GameController.js";

const routes = Router();

routes.get("/movie", MovieController.showMovieOfDay);

routes.post("/checkMovieTitle", MovieController.checkWin);

routes.put(
  "/movie",
  protectedUpdateMovieRoute,
  MovieController.updateMovieOfDay
);

routes.put("/games-played", GameController.gamesPlayed);

export default routes;
