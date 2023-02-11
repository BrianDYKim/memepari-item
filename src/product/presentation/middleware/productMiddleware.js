const { productService } = require('../../application');
const utils = require('../../../misc/utils');
const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors');

const { categoryService } = require('../../../category/application');

const checkCreatable = (from) => async (req, res, next) => {
  const {
    name,
    description,
    detailDescription,
    price,
    author,
    imageUrl,
    category,
  } = req[from];

  // name, description, detailDescription, author, imageUrl, category까지 유효성 검사
  utils.validateStringsWhetherExists(
    { name, description, detailDescription, author, imageUrl, category },
    from,
    next
  );

  // price 유효성 검사
  utils.validateNumbersWhetherExists({ price }, from, next);

  // price이 존재한다면, 0 이하인지 검증
  if (price) {
    utils.validateNumbersIfExists({ price }, from, next);
  }

  // 각각의 string이 주어진 길이보다 긴지 검증
  const validateInfoList = [
    { target: name, length: 30, targetName: 'name' },
    { target: description, length: 100, targetName: 'description' },
    { target: detailDescription, length: 200, targetName: 'detailDescription' },
    { target: author, length: 30, targetName: 'author' },
  ];
  validateInfoList.map((validateInfo) =>
    utils.validateStringLongerThanLength(validateInfo, from, next)
  );

  const foundCategory = await categoryService.findById(category);

  if (!foundCategory) {
    return next(
      new AppError(
        commonErrors.resourceNotFoundError,
        400,
        `${from}: 존재하지 않는 category입니다.`
      )
    );
  }

  const isDupicatedName = await productService.isAlreadyExistProductByName(
    name
  );

  if (isDupicatedName) {
    return next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: 중복된 상품명입니다.`
      )
    );
  }

  next();
};
//실제 존재하는 상품을 대상으로 요청을 했는가?

const checkProductId = (from) => async (req, res, next) => {
  const { id } = req[from];

  utils.validateStringsWhetherExists({ id }, from, next);

  next();
};

const checkDeletable = (from) => async (req, res, next) => {
  const { id } = req[from];

  utils.validateStringsWhetherExists({ id }, from, next);

  const isExistsProduct = await productService.findById(id);

  if (!isExistsProduct) {
    return next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: 상품이 존재하지 않습니다.`
      )
    );
  }

  next();
};

const checkUpdatable = (from) => async (req, res, next) => {
  const { name, price, description, detailDescription, imageUrl } = req[from];
  const { id } = req.params;
  if (
    name === undefined &&
    price === undefined &&
    description === undefined &&
    detailDescription === undefined &&
    imageUrl === undefined
  ) {
    return next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: name, price, description, detailDescription, imageUrl 중 최소 하나는 필요합니다.`
      )
    );
  }

  // 존재하는 string이면 길이 검사를 수행하는 함수 호출
  utils.validateStringsIfExists(
    { name, description, detailDescription, imageUrl },
    from,
    next
  );
  // 존재하는 number이면 0 이하의 값을 가지는지를 검사하는 함수 호출
  utils.validateNumbersIfExists({ price }, from, next);

  const foundProduct = await productService.findById(id);

  if (!foundProduct) {
    return next(
      new AppError(
        commonErrors.resourceNotFoundError,
        400,
        '해당 category가 존재하지 않습니다.'
      )
    );
  }

  const isDuplicatedName = await productService.isAlreadyExistProductByName(name);

  if (isDuplicatedName) {
    return next(
      new AppError(
        commonErrors.resourceDuplicationError, 
        400, 
        '이름이 중복됩니다! 다시 확인해주세요!'
      )
    );
  }

  next();
};

const checkReadableByCategory = (from) => async (req, res, next) => {
  const { page, limit, categoryId } = req[from];

  // categoryId가 유효한지 검사
  utils.validateStringsWhetherExists({ categoryId }, from, next);

  // page, limit에 대햇 유효성 검사
  validateNumberStrings({ page, limit }, from, next);

  // category가 실제로 존재하는지 검사
  const foundCategory = await categoryService.findById(categoryId);

  if (!foundCategory) {
    return next(
      new AppError(
        commonErrors.resourceNotFoundError,
        400,
        `${from}: 존재하지 않는 category입니다.`
      )
    );
  }

  // category에 대응하는 상품이 존재는 하는가?
  if (foundCategory.productCount <= 0) {
    return next(
      new AppError(
        commonErrors.resourceNotFoundError,
        400,
        `${from}: 상품이 존재하지 않습니다`
      )
    );
  }

  next();
};

/**
 * number가 되는 string properties의 유효성을 검사하는 함수
 * @param {Object} validateProperties
 * @param {string} from
 * @param {import('express').NextFunction} next
 */
function validateNumberStrings(validateProperties, from, next) {
  Object.entries(validateProperties).map(([key, value]) => {
    if (value === undefined || Number(value) <= 0) {
      return next(
        new AppError(
          commonErrors.inputError,
          400,
          `${from}: ${key} 정보가 올바르지 않습니다`
        )
      );
    }
  });
}

module.exports = {
  checkCreatable,
  checkProductId,
  checkDeletable,
  checkUpdatable,
  checkReadableByCategory,
};
