const utils = require('../../../misc/utils');
const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors');
const { productService } = require('../../application');
const {categoryService} = require('../../../category/application');

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

      const responseBody = utils.buildResponse(createdProductResponse);
      
      const categoryId = category;
      await categoryService.updateProductCount(categoryId);

      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
  async getProduct(req, res, next) {
    try {
      const { id } = req.params;
      const foundProduct = await productService.getProduct(id);
    
      const responseBody = utils.buildResponse(foundProduct)
    
      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },

  async deleteProduct(req, res, next) { 
    try {
      const { id } = req.params; 
      const deleteProduct = await productService.deleteProductById(id);

      const responseBody = utils.buildResponse(deleteProduct);
      
      res.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
