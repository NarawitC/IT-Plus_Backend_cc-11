const validator = require('validator');

const {
  Promotion,
  Product,
  OrderItem,
  Order,
  PurchasedOrder,
  ShippingOrder,
  Supplier,
} = require('../../models/index');

const createError = require('../../utils/createError');

exports.getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: PurchasedOrder,
          include: [
            {
              model: ShippingOrder,
            },
          ],
        },
        { model: Supplier },
      ],
    });
    res.status(200).json({
      message: 'Get all orders successfully',
      orders,
    });
  } catch (error) {
    next(error);
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
          include: [
            {
              model: Product,
              include: [
                {
                  model: Promotion,
                },
              ],
            },
          ],
        },
        {
          model: PurchasedOrder,
          include: [
            {
              model: ShippingOrder,
            },
          ],
        },
        { model: Supplier },
      ],
    });
    res.status(200).json({
      message: 'Get order by id successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};
