const { productService } = require('../../application')
const { AppError } = require('../../../misc/AppError');
const { commonErrors } = require('../../../misc/commonErrors')

/* 관리자 토큰이 없거나, 관리자 권한이 없으면 안된다
상품 이름이 아예 비어있는 경우는 안된다
가격이 0 이하인 경우 튕겨낸다
제조사 이름은 필수다
이미지도 필수로 필요하다
카테고리는 무조건 등록해야한다 */ 
const checkCreatable = (from) => async (req, res, next) => {
  const { name, price, author, imageUrl, category } = req[from]; 

  if ( name === undefined || name.length === 0 ) {
    next (
      new AppError (
        commonErrors.inputError,
        400,
        `${from}: product의 이름은 필수 값입니다.`
      )
    );
  }
  if ( price === undefined || price.length < 0 ) {
    next ( 
      new AppError (
        commonErrors.inputError,
        400, 
        `${from}: product의 가격은 필수 값입니다.`
      )
    );
  }
  if ( author === undefined || author.length === 0 ){
    next (
      new AppError (
        commonErrors.inputError, 
        400, 
        `${from}: product의 제조사 이름은 필수 값입니다.`
      )
    ); 
  }

  if ( imageUrl === undefined ) {
    next (
      new AppError (
        commonErrors.inputError, 
        400, 
        `${from}: product의 imageUrl은 필수 값입니다.`
      )
    );
  }
// 카테고리가 실제로 존재하는지 확인할 것. 
  if ( category === undefined ) {
    next (
      new AppError (
        commonErrors.inputError,
        400, 
        `${from}: product 카테고리는 필수 값입니다.`
      )
    );
  }

  if (!category) {
    next (
      new AppError (
        commonErrors.inputError,
        400, 
        `${from}: 카테고리가 존재하지 않습니다.`
      )
    );
  }

  // 오타 확인하기 
  if (name.length > 30) {
    next(
      new AppError (
        commonErrors.inputError,
        400,
        `${from}: product의 이름은 30글자 이내로 작성 부탁드립니다.`
      )
    );
  }

  if (author.length > 30) {
    next(
      new AppError (
        commonErrors.inputError,
        400,
        `${from}: 제조사 이름은 30글자 이내로 작성 부탁드립니다.`
      )
    );
  }

  if (price.length < 0) {
    next(
      new AppError(
        commonErrors.inputError, 
        400, 
        `${from}: 가격은 0원 이상이어야 합니다. `
      )
    )
  }

  const isDupicatedName = await productService.isAlreadyExistProductByName (name); 
  if (isDupicatedName) {
    next (
      new AppError (
        commonErrors.inputError, 
        400, 
        `${from}: 중복된 상품명입니다.`
      )
    );
  }
  next();
};



module.exports = {
  checkCreatable,
};
