import { getMovieClues } from "../../utils/getMovieClues.js";

import MovieRepository from "../repositories/MovieRepository.js";

class MovieController {
  async showMovieOfDay(req, res) {
    const { title, overview, release_date, clues } =
      await MovieRepository.findMovieOfDay();
    res.status(200).json({ title, overview, release_date, clues });
  }

  async updateMovieOfDay() {
    const oldMovieOfDay = await MovieRepository.findAllMovieOfDay();

    oldMovieOfDay && (await MovieRepository.deleteMovieOfDay(oldMovieOfDay.id));

    const { id, title } = await MovieRepository.findRandomMovie();

    const clues = await getMovieClues(title);

    console.log(clues);

    await MovieRepository.updateWasUsedOnMovieTable({ id });

    await MovieRepository.createMovieOfDay({ id, clues });
  }
}

export default new MovieController();
