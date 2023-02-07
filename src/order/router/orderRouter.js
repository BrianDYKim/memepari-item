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
);

orderRouter.put(
  '/ready',
  authMiddleware.checkUserRole, 
  orderMiddleware.checkStatus('query'), 
  orderController.readyOrder
);

orderRouter.put(
  '/delivery',
  authMiddleware.checkUserRole, 
  orderMiddleware.checkStatus('query'), 
  orderController.deliveryOrder
);

orderRouter.put(
  '/arrived',
  authMiddleware.checkUserRole, 
  orderMiddleware.checkStatus('query'), 
  orderController.arrivedOrder
);

module.exports = {
  orderRouter,
};
