const Order = require('./orderSchema');
const Status = require('./vo/status.vo');

const orderDao = {
  async create({
    totalCount,
    totalPrice,
    items,
    userEmail,
    orderBy,
    orderMessage,
    phoneNumber,
  }) {
    const newOrder = new Order({
      totalCount,
      totalPrice,
      items,
      status: Status.READY,
      userEmail,
      orderBy,
      orderMessage,
      phoneNumber,
    });

    return await newOrder.save();
  },
  async findById(id) {
    return await Order.findById(id);
  },
  async deleteById(id) {
    const foundOrder = await Order.findById(id);

    console.log(foundOrder);

    return await foundOrder.delete();
  },
  async changeStatus(id, status) {
    const targetOrder = await Order.findById(id);

    targetOrder.status = status;

    return await targetOrder.save();
  },
  async findOrdersByEmail(userEmail) {
    return await Order.find({ userEmail });
  },
  async findAllOrders() {
    return await Order.find({});
  },
};

module.exports = orderDao;
