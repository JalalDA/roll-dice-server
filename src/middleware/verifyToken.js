import jwt from "jsonwebtoken";
import { client } from "../config/redis.js";

export const verifyToken = (req, res, next) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken) return res.status(401).json({ msg: "Unauthorized" });
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, async (err, paylod) => {
    try {
      if (err && err.name === "TokenExpiredError")
        return res.status(401).json({
          msg: "login again",
        });
      if (!paylod) return res.status(401).json({ msg: "Please login first" });
      const { email } = paylod;
      const cekToken = await client.get(`token-${email}`);
      if (token !== cekToken)
        return res.status(200).json({ msg: "Please login first" });
      req.email = paylod.email;
    } catch (error) {
      console.log(error);
    }
    next();
  });
};
