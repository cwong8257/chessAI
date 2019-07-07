const express = require('express');
const shortid = require('shortid');

const router = express.Router();

router.post('/human', (req, res) => {
  const gameId = shortid.generate();

  return res.json({
    gameId
  });
});

router.post('/machine', (req, res) => {
  const gameId = shortid.generate();

  return res.json({
    gameId
  });
});

module.exports = router;
