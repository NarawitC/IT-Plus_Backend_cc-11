const { User, Supplier, ShippingOrder } = require('../../models');
const { USER_ROLE } = require('../../config/constants');

const createError = require('../../utils/createError');

exports.createShippingOrder = async (req, res, next) => {
  try {
    const { purchasedOrderId } = req.params;
    const shippingOrder = await ShippingOrder.create({ purchasedOrderId });
    res.status(201).json({
      message: 'Shipping order created successfully',
      shippingOrder,
    });
  } catch (error) {
    next(error);
  }
};
