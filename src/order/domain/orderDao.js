const Order = require('./orderSchema');
const Status = require('./vo/status.vo');

const orderDao = {
  async create({ totalCount, totalPrice, items }) {
    const newOrder = new Order({
      totalCount,
      totalPrice,
      items,
      status: Status.READY,
    });

    return await newOrder.save();
  },
};

module.exports = orderDao;
