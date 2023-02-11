const express = require('express');

/**
 * @swagger
 *  tags:
 *    name: Category
 *    description: Category 생성, 수정, 읽기 등의 API 모음입니다.
 */
const categoryRouter = express.Router();

const { categoryController, categoryMiddleware } = require('../presentation');
const authMiddleware = require('../../auth')

/**
 * @swagger
 *  /api/v1/categories/:
 *    get:
 *      summary: Get All Categories
 *      tags:
 *        - Category
 *      responses:
 *        "200":
 *          description: 모든 카테고리에 대해서 id, name, productCount, description을 반환한다
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
 *                      $ref: '#/components/schemas/CategoryDetailResponse'
 */
categoryRouter.get('/', categoryController.findAllCategory);

/**
 * @swagger
 *  /api/v1/categories/:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      summary: Create Category (관리자 권한 필요)
 *      tags:
 *        - Category
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateCategoryRequest'
 *      responses:
 *        "200":
 *          description: 모든 카테고리에 대해서 id, name, productCount, description을 반환한다
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: null
 *                  data:
 *                    $ref: '#/components/schemas/CategoryDetailResponse'
 */
categoryRouter.post(
  '/',
  authMiddleware.checkAdminRole, 
  categoryMiddleware.checkCreatable('body'),
  categoryController.createCategory
);

/**
 * @swagger
 *  /api/v1/categories/{name}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      summary: Delete Category (관리자 권한 필요)
 *      parameters:
 *        - in: path
 *          name: name
 *          schema:
 *            type: string
 *          required: true
 *          description: category's name
 *      tags:
 *        - Category
 *      responses:
 *        "200":
 *          description: 삭제 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: null
 *                  data:
 *                    $ref: '#/components/schemas/CategoryDetailResponse'
 */
categoryRouter.delete(
  '/:name',
  authMiddleware.checkAdminRole, 
  categoryMiddleware.checkDeletable('params'),
  categoryController.deleteCategory
);

/**
 * @swagger
 *  /api/v1/categories/{name}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      summary: Update Category (관리자 권한 필요)
 *      parameters:
 *        - in: path
 *          name: name
 *          schema:
 *            type: string
 *          required: true
 *          description: category's name
 *      tags:
 *        - Category
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateCategoryRequest'
 *      responses:
 *        "200":
 *          description: 삭제 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: null
 *                  data:
 *                    $ref: '#/components/schemas/CategoryDetailResponse'
 */
categoryRouter.put(
  '/:name',
  authMiddleware.checkAdminRole, 
  categoryMiddleware.checkUpdatable('params'),
  categoryController.updateCategory
);

module.exports = categoryRouter;
