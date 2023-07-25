import express from "express";

import cors from "./app/middlewares/cors.js";
import errorHandler from "./app/middlewares/errorHandler.js";

import routes from "./routes.js";

import schedule from "node-schedule";

import MovieController from "./app/controllers/MovieController.js";

import env from "dotenv";

env.config();

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandler());

schedule.scheduleJob("0 0 * * *", MovieController.updateMovieOfDay);

app.listen(port, () => console.log("Server started"));
