const { Router } = require('express');
const { orderController, orderMiddleware } = require('../presentation');

const orderRouter = Router();

orderRouter.post(
  '/',
  orderMiddleware.checkCreatable('body'),
  orderController.createOrder
);
orderRouter.delete(
  '/',
  orderMiddleware.checkDeletable('param'),
  orderController.deleteOrder
);

module.exports = {
  orderRouter,
};
