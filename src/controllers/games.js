import Games from "../models/GameModels.js";

export const createGames = async (req, res) => {
  try {
    const { total_player } = req.body;
    const result = await Games.create(
      {
        total_player,
      },
      { returning: true }
    );
    console.log(result);
    return res.status(200).json({
      msg: "Success create games",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Cannot create the game",
      error,
    });
  }
};

export const getHistoryGame = async (req, res) => {
  try {
    const result = await Games.findAll();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
