const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors');
const { productService } = require('../../../product/application');
const { orderService } = require('../../application');

const checkCreatable = (from) => async (req, res, next) => {
  const { totalCount, totalPrice, items } = req[from];

  if (items === undefined || items.length === 0) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: 주문할 밈이 없습니다`
      )
    );
  }

  if (
    totalCount === undefined ||
    totalPrice === undefined ||
    totalCount === 0 ||
    totalPrice === 0
  ) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: 주문 정보가 잘못되었습니다.`
      )
    );
  }

  const aggregateResult = await aggregateProductsInfo(items, next);

  if (totalCount !== aggregateResult.count) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        '물품의 총 수량이 맞지않습니다'
      )
    );
  }

  if (totalPrice !== aggregateResult.price) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        '물품의 총 가격이 일치하지 않습니다'
      )
    );
  }

  next();
};

const checkDeletable = (from) => async (req, res, next) => {
  const { id } = req[from];

  if (id === undefined || id.length === 0) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: 올바르지 않은 주문 식별자입니다.`
      )
    );
  }

  const foundOrder = await orderService.findOrderById(id);

  if (!foundOrder) {
    next(
      new AppError(
        commonErrors.resourceNotFoundError,
        400,
        `${from}: 존재하지 않는 주문입니다.`
      )
    );
  }

  next();
};

/**
 *  items의 원소 각각마다 productId로부터 검증을 수행하며 물품의 총 정보를 뽑아와주는 함수
 *  1. productId를 이용해서 product를 가져온다
 *  2. 가져온 product와 item의 name, price를 비교 검증을 수행한다
 */
async function drainProductInfo(item, next) {
  const { productId, name, price, count } = item;

  if (productId === undefined || productId.length === 0) {
    next(new AppError(commonErrors.inputError, 400, 'product의 id가 없습니다'));
  }

  const realProduct = await productService.findById(productId);

  if (!realProduct) {
    return next(
      new AppError(
        commonErrors.resourceNotFoundError,
        400,
        '실제 품목이 존재하지 않습니다'
      )
    );
  }

  if (realProduct.name !== name) {
    return next(
      new AppError(
        commonErrors.inputError,
        400,
        '실제 상품과 이름이 일치하지 않습니다.'
      )
    );
  }

  if (realProduct.price !== price) {
    return next(
      new AppError(
        commonErrors.inputError,
        400,
        '실제 상품과 가격이 일치하지 않습니다.'
      )
    );
  }

  return { price, count };
}

/**
 * 요청에 담긴 items의 정보를 집계해주는 async 함수
 * @param { any[] } items
 * @param { import('express').NextFunction } next
 * @returns result: Promise<{ price: number, count: number }>
 */
async function aggregateProductsInfo(items, next) {
  const drainResult = await Promise.all(
    items.map((item) => drainProductInfo(item, next))
  );

  return drainResult.reduce(
    (acc, currentItem) => {
      const { price, count } = currentItem;

      return {
        price: price * count + acc.price,
        count: count + acc.count,
      };
    },
    {
      price: 0,
      count: 0,
    }
  );
}

module.exports = {
  checkCreatable,
  checkDeletable,
};
