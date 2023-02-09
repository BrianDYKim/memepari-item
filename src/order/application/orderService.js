const { orderDao } = require('../domain');
const Status = require('../domain/vo/status.vo');

const orderService = {
  async createOrder({
    totalCount,
    totalPrice,
    items,
    userEmail,
    orderBy,
    orderMessage,
    phoneNumber,
  }) {
    const createResult = await orderDao.create({
      totalCount,
      totalPrice,
      items,
      userEmail,
      orderBy,
      orderMessage,
      phoneNumber,
    });

    return entityToDetailResponse(createResult);
  },
  async findOrderById(id) {
    const foundOrder = await orderDao.findById(id);

    return foundOrder ? entityToDetailResponse(foundOrder) : null;
  },
  async deleteOrderById(id) {
    const deletedOrder = await orderDao.deleteById(id);

    return entityToDetailResponse(deletedOrder);
  },
  async cancelOrder(id) {
    const cancelOrderResult = await orderDao.changeStatus(id, Status.CANCELLED);

    return entityToDetailResponse(cancelOrderResult);
  },

  async changeStatus(id, status) {
    const changedOrder = await orderDao.changeStatus(id, status);

    return entityToDetailResponse(changedOrder);
  },

  async findOrdersByEmail(userEmail) {
    const foundOrders = await orderDao.findOrdersByEmail(userEmail);

    const foundOrdersResponse = foundOrders.map(order => entityToSimpleResponse(order));

    return foundOrdersResponse;
  },

  async findAllOrders() {
    const foundOrders = await orderDao.findAllOrders();

    return foundOrders.map(order => entityToSimpleResponse(order));
  }
};

// 자세한 주문 내역을 반환하는 함수
function entityToDetailResponse(order) {
  const {
    id,
    totalCount,
    totalPrice,
    items,
    status,
    userEmail,
    orderBy,
    orderMessage,
    phoneNumber,
    createdAt,
  } = order;

  const responseItems = items.map((item) => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    count: item.count,
  }));

  return {
    id,
    totalCount,
    totalPrice,
    items: responseItems,
    status,
    userEmail,
    orderBy,
    orderMessage,
    phoneNumber,
    orderedAt: getCreatedDate(createdAt),
  };
}

// 리스트 형태의 간단한 주문을 반환해주는 함수
function entityToSimpleResponse(order) {
  const { id, totalCount, totalPrice, items, status, orderBy, createdAt } =
    order;

  const responseItems = items.map((item) => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    count: item.count,
  }));

  return {
    id,
    totalCount,
    totalPrice,
    items: responseItems,
    status,
    orderBy,
    orderedAt: getCreatedDate(createdAt),
  };
}

/**
 * yyyy-mm-dd를 얻는 함수
 * @param {Date} createdAt
 */
function getCreatedDate(createdAt) {
  const month = createdAt.getMonth();
  const date = createdAt.getDate();

  return `${createdAt.getFullYear()}-${zeroPadLeft(month)}-${zeroPadLeft(
    date
  )}`;
}

/**
 * 주어진 숫자가 한자리 숫자일 경우 왼쪽에 한 칸을 0으로 채워주는 함수
 * @param {number} value
 */
function zeroPadLeft(value) {
  return value < 10 ? `0${value}` : `${value}`;
}

module.exports = orderService;
