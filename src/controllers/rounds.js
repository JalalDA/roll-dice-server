import Rounds from "../models/RoundModels.js";

export const createRound = async (req, res) => {
  try {
    const { game_id, player_info } = req.body;
    const result = await Rounds.create(
      {
        game_id,
        player_info,
      },
      { returning: true }
    );
    res.status(200).json({
      msg: "Success play the round",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Cannot play the round",
      error,
    });
  }
};

export const getAllRound = async (req, res) => {
  try {
    const { game_id } = req.body;
    const result = await Rounds.findAll({
      where: {
        game_id: game_id,
      },
    });
    console.log(result);
    res.status(200).json({
      msg: `show all round with game_id ${game_id}`,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Cannot get round",
      error,
    });
  }
};
