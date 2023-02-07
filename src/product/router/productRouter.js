const express = require('express');

const { productController, productMiddleware } = require('../presentation');
const authMiddleware = require('../../auth');

/**
 * @swagger
 *  tags:
 *    name: Product
 *    description: Product 생성, 수정, 읽기 등의 API 모음입니다.
 */
const productRouter = express.Router();

/**
 * @swagger
 *  /api/v1/products/all:
 *    get:
 *      summary: Get all product
 *      tags:
 *        - Product
 *      responses:
 *        "200":
 *          description: 물품에 대한 자세한 정보의 목록을 반환한다
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: null
 *                  data:
 *                    type: array
 *                    items: 
 *                      $ref: '#/components/schemas/ProductDetailResponse'
 */
productRouter.get('/all', productController.findAllProduct);

/**
 * @swagger
 *  /api/v1/products:
 *    get:
 *      summary: Get One product
 *      tags:
 *        - Product
 *      parameters:
 *        - in: query
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: product's id
 *      responses:
 *        "200":
 *          description: 물품에 대한 자세한 정보를 반환한다
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: null
 *                  data:
 *                    type: array
 *                    items: 
 *                      $ref: '#/components/schemas/ProductDetailResponse'
 */
productRouter.get(
  '/',
  productMiddleware.checkProductId('query'),
  productController.getProduct
);

/**
 * @swagger
 *  /api/v1/products/list:
 *    get:
 *      summary: Get product list of specific category what you gave
 *      tags:
 *        - Product
 *      parameters:
 *        - in: query
 *          name: categoryId
 *          schema:
 *            type: string
 *          required: true
 *          description: category's id
 *        - in: query
 *          name: page
 *          schema:
 *            type: number
 *          required: true
 *          description: 조회할 페이지 정보. 1 이상의 정수만 허용합니다.
 *        - in: query
 *          name: limit
 *          schema:
 *            type: number
 *          required: true
 *          description: 한번에 조회할 품목의 개수. 1 이상의 정수만 허용합니다.
 *      responses:
 *        "200":
 *          description: 카테고리별 물품을 페이지네이션 방식으로 반환한다
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: null
 *                  data:
 *                    type: array
 *                    items: 
 *                      $ref: '#/components/schemas/ProductSimpleResponse'
 *                  totalPage:
 *                    type: number
 *                  totalCount:
 *                    type: number
 *                  page:
 *                    type: number
 *                  count: 
 *                    type: number
 */
productRouter.get(
  '/list',
  productMiddleware.checkReadableByCategory('query'),
  productController.getProductsByCategoryIdWithPagination
);

productRouter.post(
  '/',
  authMiddleware.checkAdminRole,
  productMiddleware.checkCreatable('body'),
  productController.createProduct
);

/**
 * @swagger
 *  /api/v1/products/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      summary: Update Product (관리자 권한 필요)
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: product's name
 *      tags:
 *        - Product
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateProductRequest'
 *      responses:
 *        "200":
 *          description: 수정 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: null
 *                  data:
 *                    type: array
 *                    items: 
 *                      $ref: '#/components/schemas/ProductDetailResponse'
 */
productRouter.put(
  '/:id',
  authMiddleware.checkAdminRole,
  productMiddleware.checkUpdatable('body'),
  productController.updateProduct
);

productRouter.delete(
  '/:id',
  authMiddleware.checkAdminRole, 
  productMiddleware.checkDeletable('params'), 
  productController.deleteProduct
);

module.exports = productRouter;
