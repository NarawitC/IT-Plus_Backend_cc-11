const validator = require('validator');
const fs = require('fs');

const {
  Product,
  OrderItem,
  Order,
  Promotion,
  PurchasedOrder,
  ShippingOrder,
  Client,
  User,
} = require('../../models');

exports.getAllOrder = async (req, res, next) => {
  try {
    const {
      Supplier: { id: supplierId },
    } = req.user;

    const orders = await Order.findAll({
      where: { supplierId },
      include: [
        {
          model: OrderItem,
          include: [{ model: Product }, { model: Promotion }],
        },
        { model: PurchasedOrder, include: [{ model: ShippingOrder }] },
        {
          model: Client,
          include: [{ model: User, attributes: { exclude: ['password'] } }],
        },
      ],
    });

    res.status(200).json({
      message: 'Get all order successfully',
      orders,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id },
      include: [
        {
          model: OrderItem,
          include: [{ model: Product }, { model: Promotion }],
        },
        { model: PurchasedOrder, include: [{ model: ShippingOrder }] },
      ],
    });

    res.status(200).json({
      message: 'Get order successfully',
      order,
    });
  } catch (err) {
    next(err);
  }
};
