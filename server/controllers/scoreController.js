const Score = require('../models/Score');

const scoresController = {
  getTopScores: async (req, res) => {
    try {
      const { limit } = req.query;
      const parsedLimit = parseInt(limit, 10) || 10; // Default to 10 if limit not provided

      const topScores = await Score.find().sort({ score: -1 }).limit(parsedLimit);

      res.json(topScores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  addScore: async (req, res) => {
    try {
      const { userId, score, level } = req.body;

      // Create a new score
      const newScore = new Score({
        user: userId,
        score: score,
        level: level
      });

      await newScore.save();

      res.status(201).json({ message: 'Score added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getUserScores: async (req, res) => {
    try {
      const userId = req.params.userId;
      let limit = req.query.limit || 10; // Default limit is 10 if not provided

      // Validate and parse the limit to ensure it's a positive integer
      limit = parseInt(limit);
      if (isNaN(limit) || limit <= 0) {
        return res.status(400).json({ error: 'Invalid limit parameter' });
      }

      const userScores = await Score.find({ user: userId }).limit(limit);

      res.json(userScores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = scoresController;
