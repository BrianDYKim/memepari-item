const { Router } = require('express');
const { orderController, orderMiddleware } = require('../presentation');
const authMiddleware = require('../../auth');

const orderRouter = Router();

orderRouter.post(
  '/',
  authMiddleware.checkUserRole, 
  orderMiddleware.checkCreatable('body'),
  orderController.createOrder
);
orderRouter.delete(
  '/:id',
  authMiddleware.checkAdminRole, 
  orderMiddleware.checkDeletable('params'),
  orderController.deleteOrder
);
orderRouter.put(
  '/cancel',
  authMiddleware.checkUserRole, 
  orderMiddleware.checkCancellable('query'), 
  orderController.cancelOrder
)

module.exports = {
  orderRouter,
};
