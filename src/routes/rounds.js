import { Router } from "express";
const router = Router();
import { createRound, getAllRound } from "../controllers/rounds.js";

router.post("/add", createRound);
router.post("/", getAllRound);

export default router;
