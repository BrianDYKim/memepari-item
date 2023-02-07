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
  async readyOrder(req, res, next) {
    try {
      const { id } = req.query;

      const readyOrderResult = await orderService.readyOrder(id);

      const responseBody = utils.buildResponse(readyOrderResult);

      res.json(responseBody);
    } catch (error) {
      next(error);
    }
  },

  async deliveryOrder(req, res, next) {
    try {
      const { id } = req.query;

      const deliveryOrderResult = await orderService.deliveryOrder(id);

      const responseBody = utils.buildResponse(deliveryOrderResult);

      res.json(responseBody);
    } catch (error) {
      next(error);
    }
  },

  async arrivedOrder(req, res, next) {
    try {
      const { id } = req.query;

      const arrivedOrderResult = await orderService.arrivedOrder(id);

      const responseBody = utils.buildResponse(arrivedOrderrResult);

      res.json(responseBody);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = orderController;
