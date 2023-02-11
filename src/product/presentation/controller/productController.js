const utils = require('../../../misc/utils');
const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors');
const { productService } = require('../../application');
const { categoryService } = require('../../../category/application');

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

  async createProduct(req, res, next) {
    try {
      const {
        name,
        price,
        description,
        detailDescription,
        author,
        imageUrl,
        category,
      } = req.body;

      const createProductRequest = {
        name,
        price,
        description,
        detailDescription,
        author,
        imageUrl,
        category,
      };

      const createdProductResponse = await productService.createNewProduct(
        createProductRequest
      );

      await categoryService.increaseProductCount(
        createdProductResponse.category
      );

      const responseBody = utils.buildResponse(createdProductResponse);

      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },

  async getProduct(req, res, next) {
    try {
      const { id } = req.query;
      const foundProduct = await productService.findById(id);

      if (!foundProduct) {
        throw new AppError(
          commonErrors.resourceNotFoundError, 
          400, 
          '해당 품목이 존재하지 않습니다'
        );
      }

      const responseBody = utils.buildResponse(foundProduct);

      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const deleteProductResponse = await productService.deleteProductById(id);

      // category 숫자 1개 하락
      await categoryService.decreaseProductCount(deleteProductResponse.category);

      const responseBody = utils.buildResponse(deleteProductResponse);
      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, price, description, detailDescription, imageUrl } =
        req.body;

      const product = await productService.updateProductById(id, {
        name,
        price,
        description,
        detailDescription,
        imageUrl,
      });

      const responseBody = utils.buildResponse(product);
      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },

  async getProductsByCategoryIdWithPagination(req, res, next) {
    try {
      const { categoryId, page, limit } = req.query;

      const { totalPage, totalCount, result } =
        await productService.getProductsByCategoryIdWithPagination(
          categoryId,
          Number(page),
          Number(limit)
        );

      const responseBody = utils.buildPaginationResponse(
        result,
        totalPage,
        totalCount,
        Number(page),
        result.length
      );
      res.status(200).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
