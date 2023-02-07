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
    const foundOrder = await Order.findById(id);

    console.log(foundOrder);
    
    return await foundOrder.delete();
  },
  async changeStatus({ id, status }) {
    const targetOrder = await Order.findById(id);

    targetOrder.status = status;

    return await targetOrder.save();
  },

  //order의 id값으로 상태변경 하기
};

module.exports = orderDao;
