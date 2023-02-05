const { AppError } = require('../../misc/AppError');
const { commonErrors } = require('../../misc/commonErrors');
const { orderDao } = require('../domain');
const Status = require('../domain/vo/status.vo');

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
  async cancelOrder(id) {
    const cancelOrderResult = await orderDao.changeStatus({id, status: Status.CANCELLED});
    
    return entityToDetailResponse(cancelOrderResult);
  }
};

function entityToDetailResponse(order) {
  const { id, totalCount, totalPrice, items, status } = order;

  const responseItems = items.map((item) => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    count: item.count,
  }));

  return { id, totalCount, totalPrice, items: responseItems, status };
}

module.exports = orderService;
