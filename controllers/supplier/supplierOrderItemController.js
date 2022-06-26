const validator = require('validator');
const fs = require('fs');

const {
  Product,
  Category,
  SubCategory,
  OrderItem,
  Order,
  Promotion,
  PurchasedOrder,
  ShippingOrder,
} = require('../../models');
const { Op } = require('sequelize');

exports.getAllOrderItemsBySupplierId = async (req, res, next) => {
  try {
    const {
      Supplier: { id: supplierId },
    } = req.user;
    const allProductIdBySupplierId = await Product.findAll({
      where: { supplierId },
      attributes: ['id'],
    });

    const orderItems = await OrderItem.findAll({
      where: {
        productId: {
          [Op.in]: allProductIdBySupplierId.map((item) => item.id),
        },
      },
      include: [
        {
          model: Order,
          include: [
            { model: PurchasedOrder, include: [{ model: ShippingOrder }] },
          ],
        },
        { model: Product, include: [{ model: Promotion }] },
      ],
    });

    res.status(200).json({
      message: 'Get all product in order by supplier id successfully',
      orderItems,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrderItemsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderItems = await OrderItem.findOne({
      where: { id },
      include: [
        {
          model: Order,
          include: [
            { model: PurchasedOrder, include: [{ model: ShippingOrder }] },
          ],
        },
        { model: Product, include: [{ model: Promotion }] },
      ],
    });

    res.status(200).json({
      message: 'Get order item by id successfully',
      orderItems,
    });
  } catch (error) {
    next(error);
  }
};
