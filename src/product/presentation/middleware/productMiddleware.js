const { productService } = require('../../application');
const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors');

const { categoryService } = require('../../../category/application');

/* 관리자 토큰이 없거나, 관리자 권한이 없으면 안된다
상품 이름이 아예 비어있는 경우는 안된다
가격이 0 이하인 경우 튕겨낸다
제조사 이름은 필수다
이미지도 필수로 필요하다
카테고리는 무조건 등록해야한다 */
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

  if (name === undefined || name.length === 0 || name.length > 30) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: product의 이름이 잘못 주어졌습니다 (주어지지 않았거나, 30자를 초과하였습니다)`
      )
    );
  }

  if (price === undefined || price <= 0) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: 가격이 잘못 전달되었습니다`
      )
    );
  }

  if (
    description === undefined ||
    description.length === 0 ||
    description.length > 100
  ) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: 제품 설명은 필수값이며, 1자 이상, 150자 이하로 부탁드립니다.`
      )
    );
  }

  if (
    detailDescription === undefined ||
    detailDescription.length === 0 ||
    detailDescription.length > 200
  ) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: 제품 상세 설명은 필수값이며, 1자 이상, 200자 이하로 부탁드립니다.`
      )
    );
  }

  if (author === undefined || author.length === 0 || author.length > 30) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: 밈의 제작자 이름이 주어지지 않았거나, 혹은 제작자의 이름은 30자 이내로 부탁드립니다.`
      )
    );
  }

  if (imageUrl === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: product의 imageUrl은 필수 값입니다.`
      )
    );
  }
  // 카테고리가 실제로 존재하는지 확인할 것.
  if (category === undefined || category.length === 0) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: product 카테고리는 필수 값입니다.`
      )
    );
  }

  const foundCategory = await categoryService.findById(category);

  console.log(foundCategory);

  if (!foundCategory) {
    next(
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
    next(
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

  if (id === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: 상품의 id 정보가 입력되지 않았습니다.`
      )
    );
  }
  next();
};

const checkDeletable = (from) => async (req, res, next) => {
  const { id } = req[from];

  if (id === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: 상품의 id 정보가 입력되지 않았습니다.`
      )
    );
  }

  next();
};


module.exports = {
  checkCreatable,
  checkProductId,
  checkDeletable,
};
