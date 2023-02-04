const { Router } = require('express');
const orderRouter = Router();

const { orderController, orderMiddleware } = require('../presentation');

module.exports = {
  orderRouter,
};
