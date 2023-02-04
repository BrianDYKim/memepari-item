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
};

module.exports = orderController;
