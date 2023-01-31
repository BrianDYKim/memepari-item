const express = require('express');
const router = express.Router();
const { Product } = require('./ProductSchema');

router.get('/', (req, res) => {
  res.json('hi product');
});

router.get('/product', async (req, res) => {
  const productTotal = await Product.find();
  res.json(productTotal);
});

module.exports = router;
