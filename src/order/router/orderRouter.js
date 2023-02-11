const { Router } = require('express');
const { orderController, orderMiddleware } = require('../presentation');
const authMiddleware = require('../../auth');

const orderRouter = Router();

orderRouter.get(
  '/user',
  authMiddleware.checkUserRole,
  orderController.findOrdersOfUser
);

orderRouter.get(
  '/admin',
  authMiddleware.checkAdminRole,
  orderController.findAllOrders
);

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
);

orderRouter.put(
  '/status',
  authMiddleware.checkAdminRole,
  orderMiddleware.checkStatus('query'),
  orderController.changeOrderStatus
);

module.exports = {
  orderRouter,
};
