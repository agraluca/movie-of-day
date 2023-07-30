import MovieRepository from "../repositories/MovieRepository.js";

import { getMovieClues } from "../../utils/getMovieClues.js";

import { normalizeText } from "normalize-text";

class MovieController {
  async showMovieOfDay(req, res) {
    const { title, overview, release_date, clues } =
      await MovieRepository.findMovieOfDay();
    res.status(200).json({ title, overview, release_date, clues });
  }

  async updateMovieOfDay() {
    const { id, title } = await MovieRepository.findRandomMovie();

    const clues = await getMovieClues(title);

    console.log(clues);

    await MovieRepository.updateWasUsedOnMovieTable({ id });

    await MovieRepository.createMovieOfDay({ id, clues });

    return;
  }

  async checkWin(req, res) {
    const { title } = req.body;

    if (!title) res.status(400).json({ message: "Title is required" });

    const { title: movieOfDayTitle } =
      await MovieRepository.findMovieOfDayTitle();

    const pattern = /[^a-zA-Z0-9\s]/g;

    const titleFromUser = normalizeText(title)
      .replaceAll(pattern, "")
      .replaceAll(" ", "");
    const movieTitle = normalizeText(movieOfDayTitle)
      .replaceAll(pattern, "")
      .replaceAll(" ", "");

    if (titleFromUser === movieTitle)
      return res.status(200).json({ hasWon: true });
    return res.status(200).json({ hasWon: false });
  }
}

export default new MovieController();
