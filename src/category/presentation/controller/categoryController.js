const utils = require('../../../misc/utils');
const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors');
const { categoryService } = require('../../application');

const categoryController = {
  async findAllCategory(req, res, next) {
    try {
      const readCategoryResponseList = await categoryService.findAllCategory();

      if (readCategoryResponseList.length === 0) {
        throw new AppError(
          commonErrors.resourceNotFoundError,
          400,
          '카테고리가 하나도 없어요! ㅠㅠ'
        );
      }
      const responseBody = utils.buildResponse(readCategoryResponseList);
      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  async createCategory(req, res, next) {
    try {
      const { name, description } = req.body;
      const createCategoryRequest = { name, description };
      const createdCategoryResponse = await categoryService.createNewCategory(
        createCategoryRequest
      );

      const responseBody = utils.buildResponse(createdCategoryResponse);

      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },

  async deleteCategory(req, res, next) {
    try {
      const { name } = req.params;
      await categoryService.deleteCategoryByName(name);

      const responseBody = utils.buildResponse('OK');

      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = {
  categoryController,
};
