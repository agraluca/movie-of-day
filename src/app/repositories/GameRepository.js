import * as db from "../../database/index.js";

class GameRepository {
  async updataGamesPlayed() {
    const [row] = await db.query(
      `
      UPDATE games_played
      SET total = total + 1
      RETURNING *;
    `
    );
    return row.total;
  }
}

export default new GameRepository();
