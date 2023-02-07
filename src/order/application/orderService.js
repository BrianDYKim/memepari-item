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
    const deletedOrder = await orderDao.deleteById(id);

    return entityToDetailResponse(deletedOrder);
  },
  async cancelOrder(id) {
    const cancelOrderResult = await orderDao.changeStatus({id, status: Status.CANCELLED});
    
    return entityToDetailResponse(cancelOrderResult);
  },

  async readyOrder(id) {
    const readyOrderResult = await orderDao.changeStatus({id, status: Status.READY});
    
    return entityToDetailResponse(readyOrderResult);
  },

  async deliveryOrder(id) {
    const deliveryOrderResult = await orderDao.changeStatus({id, status: Status.ON_DELIVERY});
    
    return entityToDetailResponse(deliveryOrderResult);
  },

  async arrivedOrder(id) {
    const arrivedOrderReslut = await orderDao.changeStatus({id, status: Status.ARRIVED});
    
    return entityToDetailResponse(arrivedOrderReslut);
  },

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
