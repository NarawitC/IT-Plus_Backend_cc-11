const { User, Supplier, ShippingOrder } = require('../../models');
const { USER_ROLE } = require('../../config/constants');
const { SHIPPING_ORDER_STATUS } = require('../../config/constants');

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

exports.updateStatusToClient = async (req, res, next) => {
  try {
    const { shippingOrderId } = req.params;
    const { trackingId } = req.body;
    const shippingOrder = await ShippingOrder.findByPk(shippingOrderId);
    if (!shippingOrder) {
      throw createError(404, 'Shipping order not found');
    }
    await shippingOrder.update({
      trackingId,
      status: SHIPPING_ORDER_STATUS.TO_CLIENT,
    });
    res.status(200).json({
      message: 'Shipping order status updated successfully',
      shippingOrder,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateStatusToDelivered = async (req, res, next) => {
  try {
    const { shippingOrderId } = req.params;
    const shippingOrder = await ShippingOrder.findByPk(shippingOrderId);
    if (!shippingOrder) {
      createError(404, 'Shipping order not found');
    }
    await shippingOrder.update({
      status: SHIPPING_ORDER_STATUS.DELIVERED,
    });
    res.status(200).json({
      message: 'Shipping order status updated successfully',
      shippingOrder,
    });
  } catch (error) {
    next(error);
  }
};
