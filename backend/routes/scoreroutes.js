import express from "express";
import Score from "../models/score.js";

const router = express.Router();

// save score
router.post("/score", async (req, res) => {
  try {
    const { username, game, score } = req.body;

    const newScore = new Score({ username, game, score });
    await newScore.save();

    res.json({ message: "Score saved successfully ✅" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// leaderboard
router.get("/leaderboard/:game", async (req, res) => {
  try {
    const { game } = req.params;
    const topScores = await Score.find({ game })
      .sort({ score: -1 })
      .limit(10);

    res.json(topScores);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
