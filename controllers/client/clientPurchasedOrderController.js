const {
  Cart,
  CartItem,
  Product,
  Promotion,
  Order,
  PurchasedOrder,
  OrderItem,
  sequelize,
} = require('../../models');
const { Op } = require('sequelize');

exports.createPurchasedOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { paymentAt, transactionId, orderIds } = req.body;
    const bulkData = [];
    orderIds.forEach((orderId) => {
      bulkData.push({ orderId, paymentAt, transactionId });
    });

    const purchasedOrders = await PurchasedOrder.bulkCreate(bulkData, {
      transaction,
    });

    const orderItems = await OrderItem.findAll({
      where: { orderId: { [Op.in]: orderIds } },
    });
    const productIdsAndQuantity = orderItems.map((orderItem) => {
      return { productId: orderItem.productId, quantity: +orderItem.quantity };
    });
    const productIds = productIdsAndQuantity.map((productIdAndQuantity) => {
      return productIdAndQuantity.productId;
    });
    const products = await Product.findAll({
      where: { id: { [Op.in]: productIds } },
    });
    products.forEach((product) => {
      product.stock -= productIdsAndQuantity.find((productIdAndQuantity) => {
        return productIdAndQuantity.productId === product.id;
      }).quantity;
    });
    await Promise.all(products.map((product) => product.save({ transaction })));

    transaction.commit();
    res.status(200).json({
      message: 'Create purchased order successfully',
      purchasedOrders,
    });
  } catch (error) {
    transaction.rollback();
    next(error);
  }
};
