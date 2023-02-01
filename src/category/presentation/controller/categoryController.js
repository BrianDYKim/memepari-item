const utils = require('../../../misc/utils');
const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors');
const { categoryService } = require('../../application');

const categoryController = {
  async findAllCategory(req, res, next) {
    try {
      const foundCategory = await categoryService.findAllCategory();

      if (foundCategory.length === 0) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          400,
          '카테고리가 하나도 없어요! ㅠㅠ'
        );
      }
      const responseBody = utils.buildResponse(foundCategory);
      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = {
  categoryController,
};
