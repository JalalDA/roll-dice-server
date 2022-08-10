import express from "express";
import authRouter from "./auth.js";
import userRouter from "./user.js";
import gameRouter from "./games.js";
import roundRouter from "./rounds.js";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/games", gameRouter);
router.use("/rounds", roundRouter);

export default router;
