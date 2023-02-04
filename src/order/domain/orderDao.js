const Order = require('./orderSchema');

const orderDao = {
  async create({ totalCount, totalPrice, items }) {
    const newOrder = new Order({ totalCount, totalPrice, items });

    return await newOrder.save();
  },
};

module.exports = orderDao;
