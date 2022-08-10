import Users from "../models/UserModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { client } from "../config/redis.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email) return res.status(400).json({ msg: "Insert your email" });
    if (!username) return res.status(400).json({ msg: "Insert your username" });
    if (!password) return res.status(400).json({ msg: "Insert your password" });
    const userInfo = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (userInfo) return res.status(400).json({ msg: "Email is already use" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const result = await Users.create({
      username,
      email,
      password: hashPassword,
    });
    console.log(result);
    res.status(200).json({
      msg: "Register success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Register failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!email) return res.status(400).json({ msg: "Insert your email" });
    if (!password) return res.status(400).json({ msg: "Insert your password" });
    const userInfo = await Users.findAll({
      where: {
        email: email,
      },
    });
    const { id, username } = userInfo[0];
    const match = await bcrypt.compare(password, userInfo[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong email or password" });
    const accessToken = jwt.sign(
      { id, username, email },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "1d",
      }
    );
    await client.set(`token-${email}`, accessToken);
    res.status(200).json({
      msg: "Login success",
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      msg: "Email is not registered",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const bearerToken = req.header("Authorization");
    if (!bearerToken) return res.status(401).json({ msg: "Unauthorized" });
    const token = bearerToken.split(" ")[1];
    const { email } = req;
    const oldToken = await client.get(`token-${email}`);
    if (oldToken !== token)
      return res.status(401).json({ msg: "Unauthorized" });
    await client.del(`token-${email}`);
    res.status(200).json({
      msg: "Logout success",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Unauthorized",
    });
  }
};
