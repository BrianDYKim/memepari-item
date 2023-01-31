const express = require('express');
const router = express.Router();
const { Category } = require('./categorySchema');

router.get('/', (req, res) => {
  res.json('hi');
});

router.get('/category', async (req, res) => {
  const categoryTotal = await Category.find();
  res.json(categoryTotal);
});

module.exports = router;
