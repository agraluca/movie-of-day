import GameRepository from "../repositories/GameRepository.js";

class GameController {
  async gamesPlayed(req, res) {
    const total = await GameRepository.updataGamesPlayed();

    res.status(200).json({ total });
  }
}

export default new GameController();
