import Users from "../models/UserModels.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await Users.findAll({
      attributes: ["id", "username", "email"],
    });
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
