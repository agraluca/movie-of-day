import { Router } from "express";
import MovieController from "./app/controllers/MovieController.js";

const routes = Router();

routes.get("/movie", MovieController.showMovieOfDay);

export default routes;
