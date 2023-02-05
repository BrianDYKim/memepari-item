const { Router } = require('express');
const { orderController, orderMiddleware } = require('../presentation');

const orderRouter = Router();

orderRouter.post(
  '/',
  orderMiddleware.checkCreatable('body'),
  orderController.createOrder
);
orderRouter.delete(
  '/:id',
  orderMiddleware.checkDeletable('params'),
  orderController.deleteOrder
);

module.exports = {
  orderRouter,
};
