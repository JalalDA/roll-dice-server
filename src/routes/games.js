import { Router } from "express";
const router = Router();
import { createGames, getHistoryGame } from "../controllers/games.js";

router.post("/add", createGames);
router.get("/all", getHistoryGame);

export default router;
