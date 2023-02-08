const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    totalCount: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        count: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String, 
      required: true
    }, 
    userEmail: {
      type: String, 
      required: true
    }, 
    orderBy: {
      type: String, 
      required: true
    }, 
    orderMessage: {
      type: String
    }, 
    phoneNumber: {
      type: String, 
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model('Order', orderSchema);
