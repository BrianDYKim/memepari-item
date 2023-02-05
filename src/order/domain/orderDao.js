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
  async findById(id) {
    return await Order.findById(id);
  },
  async deleteById(id) {
    return await Order.deleteOne({ id });
  },
  async changeStatus({ id, status }) {
    const targetOrder = await Order.findById(id);

    const changeStatusQuery = { status };

    return await Order.findOneAndUpdate({ id }, changeStatusQuery);
  },
};

module.exports = orderDao;
