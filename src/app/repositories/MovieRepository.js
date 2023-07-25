import * as db from "../../database/index.js";

class MovieRepository {
  async findRandomMovie() {
    const [row] = await db.query(
      `SELECT * FROM movies WHERE was_used = false ORDER BY RANDOM() LIMIT 1;`
    );
    return row;
  }

  async findAllMovieOfDay() {
    const [row] = await db.query(`
      SELECT * FROM movie_of_day;
    `);
    return row;
  }

  async findMovieOfDay() {
    const [row] = await db.query(`
      SELECT movie_of_day.clues, movies.*
      FROM movie_of_day
      INNER JOIN movies ON movie_of_day.movie_id = movies.id
      LIMIT 1;
    `);
    return row;
  }

  async updateWasUsedOnMovieTable({ id }) {
    const [row] = await db.query(
      `
      UPDATE movies
      SET was_used = true
      WHERE id = $1
      RETURNING *;
    `,
      [id]
    );
    return row;
  }

  async createMovieOfDay({ id, clues }) {
    const [row] = await db.query(
      `
      INSERT INTO movie_of_day(movie_id, clues)
      VALUES($1, $2)
      RETURNING *
    `,
      [id, clues]
    );
    return row;
  }

  async deleteMovieOfDay(id) {
    const deleteOp = await db.query("DELETE FROM movie_of_day WHERE id = $1", [
      id,
    ]);
    return deleteOp;
  }
}

export default new MovieRepository();
