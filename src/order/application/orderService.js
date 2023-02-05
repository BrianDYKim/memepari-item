const { AppError } = require('../../misc/AppError');
const { commonErrors } = require('../../misc/commonErrors');
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
  async findOrderById(id) {
    const foundOrder = await orderDao.findById(id);

    return foundOrder ? entityToDetailResponse(foundOrder) : null;
  },
  async deleteOrderById(id) {
    const deleteResult = await orderDao.deleteById(id);

    return true;
  },
};

function entityToDetailResponse(order) {
  const { totalCount, totalPrice, items, status } = order;

  const responseItems = items.map((item) => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    count: item.count,
  }));

  return { totalCount, totalPrice, items: responseItems, status };
}

module.exports = orderService;
