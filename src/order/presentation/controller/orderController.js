const utils = require('../../../misc/utils');
const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors');
const { orderService } = require('../../application');

const orderController = {
  async createOrder(req, res, next) {
    try {
      const {
        totalCount,
        totalPrice,
        items,
        orderBy,
        orderMessage,
        phoneNumber,
      } = req.body;

      const { email } = req.authResult;

      const createdOrderResponse = await orderService.createOrder({
        totalCount,
        totalPrice,
        items,
        userEmail: email,
        orderBy,
        orderMessage,
        phoneNumber,
      });

      const responseBody = utils.buildResponse(createdOrderResponse);

      res.json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;

      const deleteResult = await orderService.deleteOrderById(id);

      const responseBody = utils.buildResponse(deleteResult);

      res.json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  async cancelOrder(req, res, next) {
    try {
      const { id } = req.query;

      const cancelResult = await orderService.cancelOrder(id);

      const responseBody = utils.buildResponse(cancelResult);

      res.json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  async changeOrderStatus(req, res, next) {
    try {
      const { id } = req.query;
      const { status } = req.body;

      const changedOrder = await orderService.changeStatus(id, status);

      const responseBody = utils.buildResponse(changedOrder);
      res.json(responseBody);
    } catch (error) {
      next(error);
    }
  },

  async findOrdersOfUser(req, res, next) {
    try {
      const { email } = req.authResult;

      const foundOrders = await orderService.findOrdersByEmail(email);

      if (foundOrders.length === 0) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          400,
          '주문이 존재하지 않습니다'
        );
      }

      const responseBody = utils.buildResponse(foundOrders);

      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },

  async findAllOrders(req, res, next) {
    try {
      const foundOrders = await orderService.findAllOrders();

      if (foundOrders.length === 0) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          400,
          '주문이 존재하지 않습니다'
        );
      }

      const responseBody = utils.buildResponse(foundOrders);

      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = orderController;
