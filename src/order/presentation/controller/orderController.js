const utils = require('../../../misc/utils');
const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors');
const { orderService } = require('../../application');

const orderController = {
  async createOrder(req, res, next) {
    try {
      const { totalCount, totalPrice, items } = req.body;

      const createdOrderResponse = await orderService.createOrder({
        totalCount,
        totalPrice,
        items,
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
};

module.exports = orderController;
