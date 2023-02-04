const { orderDao } = require('../domain');

const orderService = {
  async createOrder({ totalCount, totalPrice, items }) {
    const createResult = await orderDao.create({
      totalCount,
      totalPrice,
      items,
    });

    return entityToDetailResponse(createResult);
  },
};

function entityToDetailResponse(order) {
  const { totalCount, totalPrice, items } = order;

  const responseItems = items.map((item) => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    count: item.count,
  }));

  return { totalCount, totalPrice, items: responseItems };
}

module.exports = orderService;
