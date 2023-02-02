const utils = require('../../../misc/utils');
const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors');
const { productService } = require('../../application');

const productController = {
  async findAllProduct(req, res, next) {
    try {
      const foundProducts = await productService.findAllProducts();

      if (foundProducts.length === 0) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          400,
          '밈이 하나도 없네요 ㅠㅠ'
        );
      }

      const responseBody = utils.buildResponse(foundProducts);
      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;

