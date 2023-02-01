const utils = require('../../../misc/utils');
const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors');
const { categoryService } = require('../../application');

const categoryController = {
  async findAllCategory(req, res, next) {
    try { 
      const foundCategory = await categoryService.findAllCategory();

      if (foundCategory.lengh === 0) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          400, 
          '밈이 하나도 없네요 ㅠㅠ'
        );
      }
      const responseBody = utils.buildResponse(foundCategory);
      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoryController; 